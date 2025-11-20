import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    include: ['__tests__/**/*.js'],
    setupFiles: ['./vitest.setup.ts'],
  },
})
