import { defineConfig } from 'vitest/config'

// Vitest loads this in preference to vite.config.ts. The current Phase 1
// model/logic tests run in a plain Node environment; when component tests
// arrive (Phase 2+), add the React plugin and a jsdom environment here.
export default defineConfig({
  test: {
    environment: 'node',
  },
})
