import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import { cloudflare } from "@cloudflare/vite-plugin";

// base: './' keeps asset paths relative so the static build works when served
// from a sub-path (e.g. GitHub Pages) — see Phase 4 deployment task.
// Test config lives in vitest.config.ts.
export default defineConfig({
  plugins: [react(), cloudflare()],
  base: './',
  build: {
    // Keep the picture-clue icons as separate files instead of inlining the
    // small ones as base64 in the JS bundle — they're only fetched when the
    // grid/picker actually shows them, so inlining ~100 SVGs would bloat the
    // initial download for no benefit.
    assetsInlineLimit: (filePath) =>
      filePath.endsWith('.svg') ? false : undefined,
  },
})