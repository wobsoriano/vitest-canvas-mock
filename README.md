# vitest-canvas-mock

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

View the original usage [here](https://github.com/hustcc/jest-canvas-mock).

## License

MIT
