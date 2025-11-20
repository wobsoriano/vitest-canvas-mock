# vitest-canvas-mock

[![npm (tag)](https://img.shields.io/npm/v/vitest-canvas-mock?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/vitest-canvas-mock) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/vitest-canvas-mock?style=flat&colorA=000000&colorB=000000) ![NPM](https://img.shields.io/npm/l/vitest-canvas-mock?style=flat&colorA=000000&colorB=000000)

Mock `canvas` when running unit tests with [vitest](https://vitest.dev/).

This is a fork of [jest-canvas-mock](https://github.com/hustcc/jest-canvas-mock), migrated to work with Vitest instead of Jest. All Jest-specific code has been replaced with Vitest equivalents.

## Install

```bash
npm install vitest-canvas-mock -D
```

## Usage

1. Create a new setup file that imports `vitest-canvas-mock` or add it to an existing setup file.

```ts
// vitest.setup.ts
import 'vitest-canvas-mock'
```

2. In your `vitest.config.ts` file, create a `setupFiles` array and add that file:

```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    setupFiles: ['./vitest.setup.ts'],
    environment: 'jsdom',
  },
})
```

## Mock Strategy

View mock strategy doc [here](https://github.com/hustcc/jest-canvas-mock#mock-strategy).

## Snapshots

View snapshots doc [here](https://github.com/hustcc/jest-canvas-mock#snapshots)

## License

MIT
