import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' keeps asset paths relative so the static build works when served
// from a sub-path (e.g. GitHub Pages) — see Phase 4 deployment task.
// Test config lives in vitest.config.ts.
export default defineConfig({
  plugins: [react()],
  base: './',
})
