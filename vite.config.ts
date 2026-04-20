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

export default defineConfig({
  root: path.resolve(__dirname, "client"),
  base: "/",

  plugins: [react(), spaFallback()],

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
