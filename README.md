# vitest-canvas-mock

[![npm (tag)](https://img.shields.io/npm/v/vitest-canvas-mock?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/vitest-canvas-mock) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/vitest-canvas-mock?style=flat&colorA=000000&colorB=000000) ![NPM](https://img.shields.io/npm/l/vitest-canvas-mock?style=flat&colorA=000000&colorB=000000)

Mock `canvas` when running unit tests with [vitest](https://vitest.dev/). Uses [jest-canvas-mock](https://github.com/hustcc/jest-canvas-mock).

## Install

```bash
npm install vitest-canvas-mock -D
```

## Usage

In your `vitest.config.ts` file, create a `setupFiles` array and add `vitest-canvas-mock`:

```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    setupFiles: ['vitest-canvas-mock'],
    environment: 'jsdom',
    // For this config, check https://github.com/vitest-dev/vitest/issues/740
    threads: false,
    environmentOptions: {
      jsdom: {
        resources: 'usable',
      },
    },
  },
})
```

## Mock Strategy

View mock strategy doc [here](https://github.com/hustcc/jest-canvas-mock#mock-strategy).

## Snapshots

View snapshots doc [here](https://github.com/hustcc/jest-canvas-mock#snapshots)

## License

MIT
