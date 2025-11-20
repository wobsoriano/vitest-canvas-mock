# vitest-canvas-mock

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

## Reset

If you reset the vitest mocks (for example, with `vi.resetAllMocks()`), you can call `setupVitestCanvasMock()` to re-create it.

```ts
import { setupVitestCanvasMock } from 'vitest-canvas-mock'

beforeEach(() => {
  vi.resetAllMocks()
  setupVitestCanvasMock()
})
```

## Mock Strategy

View mock strategy doc [here](https://github.com/hustcc/jest-canvas-mock#mock-strategy).

## Snapshots

View snapshots doc [here](https://github.com/hustcc/jest-canvas-mock#snapshots)

## License

MIT
