import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import fs from "fs";

// Emits dist/404.html as a copy of dist/index.html so that static hosts
// without SPA-rewrite support (e.g. GitHub Pages) fall back to the app
// shell for unknown routes. Covers the case where a mobile browser
// toggling "Request Desktop Site" reloads a nested path.
function spaFallback() {
  return {
    name: "spa-404-fallback",
    closeBundle() {
      const dist = path.resolve(__dirname, "dist");
      const index = path.join(dist, "index.html");
      const notFound = path.join(dist, "404.html");
      if (fs.existsSync(index)) {
        fs.copyFileSync(index, notFound);
      }
    },
  };
}

/* ==========================================================================
   Partner / backer logos — directory as the single source of truth.
   --------------------------------------------------------------------------
   client/public/Logos_Partners/ is scanned at build time and exposed as the
   virtual module `virtual:partner-logos`. Drop a file in, it appears; delete
   one, it goes. No array to maintain, no filename in any component.

   It has to be a virtual module rather than import.meta.glob because the files
   live under /public, which Vite serves verbatim and deliberately excludes
   from the module graph — glob cannot see inside it.

   Only the file list is produced here. Whether a logo is too dark to read on
   black is decided at runtime in the browser, which can decode png/jpg/webp/svg
   alike; doing it here would mean shipping an image-decoding dependency to
   answer a question a <canvas> answers for free.
   ========================================================================== */
const LOGO_DIR = path.resolve(__dirname, "client", "public", "Logos_Partners");
const LOGO_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp", ".svg"]);
const LOGOS_MODULE_ID = "virtual:partner-logos";
const LOGOS_RESOLVED_ID = "\0" + LOGOS_MODULE_ID;

/* Filename → readable organisation name, for alt text.
   "IISc_Master_Seal_Transparent.png" → "IISc"
   "STEM-Logo.webp"                   → "STEM"
   "IN-SPACe_Logo.png"                → "IN-SPACe"      (hyphen preserved)
   Tokens that describe the *file* rather than the organisation are dropped. */
const NAME_NOISE = new Set([
  "logo", "logos", "logotype", "wordmark", "mark", "master", "seal", "emblem",
  "badge", "icon", "transparent", "transparant", "bg", "background", "final",
  "official", "vector", "cmyk", "rgb", "srgb", "hex", "h", "v", "horizontal",
  "vertical", "full", "color", "colour", "colored", "coloured", "white",
  "black", "dark", "light", "small", "large", "lg", "sm", "md", "xl", "copy",
  "new", "old", "v1", "v2", "v3", "1x", "2x", "3x", "300dpi", "hi", "res",
]);

function organisationName(file: string): string {
  const stem = file.replace(/\.[^.]+$/, "");
  // Strip a trailing "-logo" / "_logo" first so "STEM-Logo" keeps "STEM"
  // without splitting hyphenated names like "IN-SPACe" apart.
  const trimmed = stem.replace(/[-_\s]*(logos?|logotype|wordmark)$/i, "");
  const seen = new Set<string>();
  const words: string[] = [];
  for (const raw of trimmed.split(/[_\s]+/)) {
    const token = raw.trim();
    if (!token) continue;
    const key = token.toLowerCase();
    if (NAME_NOISE.has(key)) continue;
    if (seen.has(key)) continue; // the same word repeated in a long export name
    seen.add(key);
    words.push(token);
  }
  return words.join(" ") || stem;
}

function readLogoDir() {
  if (!fs.existsSync(LOGO_DIR)) return [];
  return fs
    .readdirSync(LOGO_DIR, { withFileTypes: true })
    .filter(
      (entry) =>
        entry.isFile() &&
        !entry.name.startsWith(".") &&
        LOGO_EXTENSIONS.has(path.extname(entry.name).toLowerCase()),
    )
    .map((entry) => entry.name)
    // Deterministic: the same directory always yields the same order, so the
    // wall does not reshuffle between builds.
    .sort((a, b) => a.localeCompare(b, "en"))
    .map((file) => ({
      src: `/Logos_Partners/${encodeURIComponent(file)}`,
      name: organisationName(file),
    }));
}

function partnerLogos() {
  return {
    name: "partner-logos",
    resolveId(id: string) {
      return id === LOGOS_MODULE_ID ? LOGOS_RESOLVED_ID : null;
    },
    load(id: string) {
      if (id !== LOGOS_RESOLVED_ID) return null;
      return `export const PARTNER_LOGOS = ${JSON.stringify(readLogoDir())};`;
    },
    configureServer(server: any) {
      // /public is outside the module graph, so adding a file there does not
      // invalidate anything on its own. Watch it and force a reload.
      server.watcher.add(LOGO_DIR);
      const refresh = (file: string) => {
        if (!path.resolve(file).startsWith(LOGO_DIR)) return;
        const mod = server.moduleGraph.getModuleById(LOGOS_RESOLVED_ID);
        if (mod) server.moduleGraph.invalidateModule(mod);
        (server.hot ?? server.ws).send({ type: "full-reload" });
      };
      server.watcher.on("add", refresh);
      server.watcher.on("unlink", refresh);
      server.watcher.on("change", refresh);
    },
  };
}

export default defineConfig({
  root: path.resolve(__dirname, "client"),
  base: "/",

  plugins: [react(), partnerLogos(), spaFallback()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
    },
  },

  // Fallback during `vite preview` so nested routes don't 404 on reload
  preview: {
    port: 5000,
  },

  build: {
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,
  },
});
