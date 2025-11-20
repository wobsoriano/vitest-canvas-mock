import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: 'src/index.js',
  platform: 'neutral',
  exports: false,
  format: ['esm', 'cjs'],
  dts: false,
})
