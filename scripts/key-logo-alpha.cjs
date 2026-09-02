/* Derive a real alpha channel for DISHA_Logo.png.

   The supplied file is PNG colorType 2 (RGB, no alpha): whoever exported it
   baked the editor's transparency checkerboard into the pixels, so on the
   site's black canvas it renders as a light checkered box with a purple
   wordmark inside it.

   The art is a saturated purple mark over an unsaturated (gray/white) ground,
   which is exactly the case a saturation key handles cleanly:

     - grayscale pixel  -> ground, alpha 0 (kills white AND both checker tones)
     - saturated pixel  -> mark, alpha from how far it is from white
     - in between       -> an antialiased edge, alpha in proportion

   RGB is then un-premultiplied back off white, so the recovered mark carries
   the original purple rather than a washed-out version of it.

   Zero dependencies: PNG in, PNG out, via node's own zlib.
*/
const fs = require("fs");
const zlib = require("zlib");

const SRC = process.argv[2];
const OUT = process.argv[3];
const SCALE = Number(process.argv[4] || 2); // integer box downsample factor

/* ---------- decode ---------- */
function decode(buf) {
  if (buf.readUInt32BE(0) !== 0x89504e47) throw new Error("not a png");
  let off = 8;
  let ihdr = null;
  const idat = [];
  while (off < buf.length) {
    const len = buf.readUInt32BE(off);
    const type = buf.toString("ascii", off + 4, off + 8);
    const data = buf.subarray(off + 8, off + 8 + len);
    if (type === "IHDR") {
      ihdr = {
        width: data.readUInt32BE(0),
        height: data.readUInt32BE(4),
        depth: data[8],
        color: data[9],
        interlace: data[12],
      };
    } else if (type === "IDAT") idat.push(data);
    else if (type === "IEND") break;
    off += 12 + len;
  }
  if (!ihdr) throw new Error("no IHDR");
  if (ihdr.depth !== 8 || ihdr.color !== 2 || ihdr.interlace !== 0)
    throw new Error(`unsupported: depth=${ihdr.depth} color=${ihdr.color} interlace=${ihdr.interlace}`);

  const raw = zlib.inflateSync(Buffer.concat(idat));
  const { width: w, height: h } = ihdr;
  const bpp = 3;
  const stride = w * bpp;
  const px = Buffer.alloc(h * stride);

  let p = 0;
  for (let y = 0; y < h; y++) {
    const filter = raw[p++];
    const line = raw.subarray(p, p + stride);
    p += stride;
    const cur = px.subarray(y * stride, (y + 1) * stride);
    const prev = y > 0 ? px.subarray((y - 1) * stride, y * stride) : null;

    for (let x = 0; x < stride; x++) {
      const a = x >= bpp ? cur[x - bpp] : 0;
      const b = prev ? prev[x] : 0;
      const c = prev && x >= bpp ? prev[x - bpp] : 0;
      let v = line[x];
      switch (filter) {
        case 0: break;
        case 1: v += a; break;
        case 2: v += b; break;
        case 3: v += (a + b) >> 1; break;
        case 4: {
          const pa = Math.abs(b - c), pb = Math.abs(a - c), pc = Math.abs(a + b - 2 * c);
          v += pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
          break;
        }
        default: throw new Error("bad filter " + filter);
      }
      cur[x] = v & 0xff;
    }
  }
  return { w, h, px };
}

/* ---------- key ---------- */
const SAT_FLOOR = 0.07; // below this a pixel is ground, not mark

function key({ w, h, px }) {
  const out = Buffer.alloc(w * h * 4);
  for (let i = 0, o = 0; i < px.length; i += 3, o += 4) {
    const r = px[i], g = px[i + 1], b = px[i + 2];
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const sat = max === 0 ? 0 : (max - min) / max;

    if (sat < SAT_FLOOR) continue; // leaves RGBA 0,0,0,0

    // Coverage of the mark over white: c = a*P + (1-a)*255 on the min channel.
    // 222 is 255 minus the darkest channel the mark reaches, measured from the
    // source; it makes a solid mark pixel resolve to alpha 1.
    let a = (255 - min) / 222;
    a = Math.max(0, Math.min(1, a));
    if (a <= 0) continue;

    // Un-premultiply off white so the recovered colour is the mark's own.
    out[o] = Math.max(0, Math.min(255, Math.round((r - 255 * (1 - a)) / a)));
    out[o + 1] = Math.max(0, Math.min(255, Math.round((g - 255 * (1 - a)) / a)));
    out[o + 2] = Math.max(0, Math.min(255, Math.round((b - 255 * (1 - a)) / a)));
    out[o + 3] = Math.round(a * 255);
  }
  return { w, h, rgba: out };
}

/* ---------- downsample (premultiplied, so edges don't fringe) ---------- */
function downsample({ w, h, rgba }, f) {
  if (f <= 1) return { w, h, rgba };
  const nw = Math.floor(w / f);
  const nh = Math.floor(h / f);
  const out = Buffer.alloc(nw * nh * 4);
  for (let y = 0; y < nh; y++) {
    for (let x = 0; x < nw; x++) {
      let sr = 0, sg = 0, sb = 0, sa = 0;
      for (let dy = 0; dy < f; dy++) {
        for (let dx = 0; dx < f; dx++) {
          const i = ((y * f + dy) * w + (x * f + dx)) * 4;
          const a = rgba[i + 3] / 255;
          sr += rgba[i] * a;
          sg += rgba[i + 1] * a;
          sb += rgba[i + 2] * a;
          sa += a;
        }
      }
      const o = (y * nw + x) * 4;
      if (sa > 0) {
        out[o] = Math.round(sr / sa);
        out[o + 1] = Math.round(sg / sa);
        out[o + 2] = Math.round(sb / sa);
        out[o + 3] = Math.round((sa / (f * f)) * 255);
      }
    }
  }
  return { w: nw, h: nh, rgba: out };
}

/* ---------- encode ---------- */
function crc32(buf) {
  let c = ~0;
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i];
    for (let k = 0; k < 8; k++) c = (c >>> 1) ^ (0xedb88320 & -(c & 1));
  }
  return ~c >>> 0;
}
function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, "ascii"), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
}

function encode({ w, h, rgba }) {
  const bpp = 4;
  const stride = w * bpp;
  const raw = Buffer.alloc(h * (stride + 1));
  for (let y = 0; y < h; y++) {
    raw[y * (stride + 1)] = 4; // Paeth throughout — best on flat art
    const cur = rgba.subarray(y * stride, (y + 1) * stride);
    const prev = y > 0 ? rgba.subarray((y - 1) * stride, y * stride) : null;
    const dst = raw.subarray(y * (stride + 1) + 1, (y + 1) * (stride + 1));
    for (let x = 0; x < stride; x++) {
      const a = x >= bpp ? cur[x - bpp] : 0;
      const b = prev ? prev[x] : 0;
      const c = prev && x >= bpp ? prev[x - bpp] : 0;
      const pa = Math.abs(b - c), pb = Math.abs(a - c), pc = Math.abs(a + b - 2 * c);
      const pred = pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
      dst[x] = (cur[x] - pred) & 0xff;
    }
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0);
  ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8;
  ihdr[9] = 6; // RGBA
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("IDAT", zlib.deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

const decoded = decode(fs.readFileSync(SRC));
const keyed = downsample(key(decoded), SCALE);
const png = encode(keyed);
fs.writeFileSync(OUT, png);

// Report a few sample pixels so the result can be sanity-checked without eyes.
const mid = ((keyed.h >> 1) * keyed.w + (keyed.w >> 3)) * 4;
console.log(
  `${SRC} ${decoded.w}x${decoded.h} -> ${OUT} ${keyed.w}x${keyed.h} RGBA`,
  `\n  ${(fs.statSync(SRC).size / 1024).toFixed(0)} kB -> ${(png.length / 1024).toFixed(0)} kB`,
  `\n  corner alpha = ${keyed.rgba[3]}, sample px = rgba(${keyed.rgba[mid]}, ${keyed.rgba[mid + 1]}, ${keyed.rgba[mid + 2]}, ${keyed.rgba[mid + 3]})`,
);
