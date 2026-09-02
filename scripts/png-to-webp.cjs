/* PNG → WebP, using the Chrome that is already on this machine.
   ---------------------------------------------------------------------------
   Two of the images under client/public/Images/ are ~1.8 MB PNGs. They are
   photographs, and a photograph in PNG is the wrong format by roughly an order
   of magnitude — but converting one normally means adding sharp or imagemin to
   the dependency tree for a job that runs approximately never.

   Chrome's canvas already encodes WebP. So this drives headless Chrome over
   the DevTools Protocol, draws each PNG to a canvas at its natural size, and
   reads it back as `image/webp`. No dependencies, and the encoder is the same
   libwebp everything else uses.

   The PNGs are NOT deleted: the markup keeps them as the <picture> fallback,
   so a browser without WebP support still gets an image.

   usage: node scripts/png-to-webp.cjs <quality 0-1> <file.png> [more.png ...]
*/
const { spawn } = require("child_process");
const fs = require("fs");
const os = require("os");
const path = require("path");

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const PORT = 9336;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
  const quality = Number(process.argv[2]);
  const files = process.argv.slice(3);
  if (!files.length || !(quality > 0 && quality <= 1)) {
    console.error("usage: node scripts/png-to-webp.cjs <quality 0-1> <file.png> ...");
    process.exit(1);
  }

  const profile = fs.mkdtempSync(path.join(os.tmpdir(), "webp-"));
  const chrome = spawn(
    CHROME,
    [
      "--headless=new",
      `--remote-debugging-port=${PORT}`,
      `--user-data-dir=${profile}`,
      "--no-first-run",
      "--disable-gpu",
      // The images are read as file:// URLs from a file:// page.
      "--allow-file-access-from-files",
      "about:blank",
    ],
    { stdio: "ignore" },
  );

  let target;
  for (let i = 0; i < 60; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/list`);
      const list = await res.json();
      target = list.find((t) => t.type === "page");
      if (target) break;
    } catch {
      /* not up yet */
    }
    await sleep(250);
  }
  if (!target) throw new Error("Chrome did not come up");

  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((r) => (ws.onopen = r));

  let id = 0;
  const pending = new Map();
  ws.onmessage = (e) => {
    const msg = JSON.parse(e.data);
    if (msg.id && pending.has(msg.id)) {
      pending.get(msg.id)(msg);
      pending.delete(msg.id);
    }
  };
  const send = (method, params = {}) =>
    new Promise((resolve) => {
      const n = ++id;
      pending.set(n, resolve);
      ws.send(JSON.stringify({ id: n, method, params }));
    });

  const evaluate = async (expression) => {
    const r = await send("Runtime.evaluate", {
      expression,
      awaitPromise: true,
      returnByValue: true,
    });
    if (r.result?.exceptionDetails) {
      throw new Error(JSON.stringify(r.result.exceptionDetails));
    }
    return r.result?.result?.value;
  };

  await send("Page.enable");
  await send("Runtime.enable");

  /* about:blank cannot read a file:// image even with
     --allow-file-access-from-files — the opaque origin fails the check before
     the flag is consulted. Navigating to a real file:// document first gives
     the page a file origin, and from there the images load and the canvas
     stays untainted. */
  const host = path.join(profile, "host.html");
  fs.writeFileSync(host, "<!doctype html><title>encode</title>");
  await send("Page.navigate", { url: "file:///" + host.split(path.sep).join("/") });
  for (let i = 0; i < 40; i++) {
    if (await evaluate("document.readyState === 'complete'")) break;
    await sleep(150);
  }

  for (const file of files) {
    const abs = path.resolve(file).replace(/\\/g, "/");
    const url = "file:///" + abs;

    const dataUrl = await evaluate(`
      (async () => {
        const img = new Image();
        img.decoding = "sync";
        await new Promise((res, rej) => {
          img.onload = res;
          img.onerror = () => rej(new Error("load failed"));
          img.src = ${JSON.stringify(url)};
        });
        const c = document.createElement("canvas");
        c.width = img.naturalWidth;
        c.height = img.naturalHeight;
        // No white fill: these have alpha, and WebP keeps it.
        c.getContext("2d").drawImage(img, 0, 0);
        return c.toDataURL("image/webp", ${quality});
      })()
    `);

    if (!dataUrl || !dataUrl.startsWith("data:image/webp")) {
      console.error("FAILED (not webp):", file);
      continue;
    }

    const out = file.replace(/\.png$/i, ".webp");
    const buf = Buffer.from(dataUrl.split(",")[1], "base64");
    fs.writeFileSync(out, buf);

    const before = fs.statSync(file).size;
    console.log(
      `${path.basename(file)}  ${(before / 1024).toFixed(0)}KB → ` +
        `${path.basename(out)}  ${(buf.length / 1024).toFixed(0)}KB ` +
        `(${Math.round((1 - buf.length / before) * 100)}% smaller)`,
    );
  }

  ws.close();
  chrome.kill();
  await sleep(200);
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
