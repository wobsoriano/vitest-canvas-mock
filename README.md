# vitest-canvas-mock

Mock `canvas` when running unit tests with [vitest](https://vitest.dev/).

This is a fork of [jest-canvas-mock](https://github.com/hustcc/jest-canvas-mock), migrated to work with Vitest instead of Jest. All credits goes to the original author.

## Install

```bash
npm install vitest-canvas-mock -D
```

## Usage

1. Create a new setup file that imports `vitest-canvas-mock` or add it to an existing setup file.

```ts
// vitest.setup.ts
import 'vitest-canvas-mock';
```

2. In your `vitest.config.ts` file, create a `setupFiles` array and add that file:

```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    setupFiles: ['./vitest.setup.ts'],
    environment: 'jsdom',
  },
});
```

## Reset

If you reset the vitest mocks (for example, with `vi.resetAllMocks()`), you can call `setupVitestCanvasMock()` to re-create it.

```ts
import { setupVitestCanvasMock } from 'vitest-canvas-mock';

beforeEach(() => {
  vi.resetAllMocks();
  setupVitestCanvasMock();
});
```

This mock strategy implements all the canvas functions and actually verifies the parameters. If a
known condition would cause the browser to throw a `TypeError` or a `DOMException`, it emulates the
error. For instance, the `CanvasRenderingContext2D#arc` function will throw a `TypeError` if the
radius is negative, or if it was not provided with enough parameters.

```ts
// arc throws a TypeError when the argument length is less than 5
expect(() => ctx.arc(1, 2, 3, 4)).toThrow(TypeError);

// when radius is negative, arc throws a dom exception when all parameters are finite
expect(() => ctx.arc(0, 0, -10, 0, Math.PI * 2)).toThrow(DOMException);
```

The function will do `Number` type coercion and verify the inputs exactly like the browser does. So
this is valid input.

```ts
expect(() => ctx.arc('10', '10', '20', '0', '6.14')).not.toThrow();
```

Another part of the strategy is to validate input types. When using the
`CanvasRenderingContext2D#fill` function, if you pass it an invalid `fillRule` it will throw a
`TypeError` just like the browser does.

```ts
expect(() => ctx.fill('invalid!')).toThrow(TypeError);
expect(() => ctx.fill(new Path2D(), 'invalid!')).toThrow(TypeError);
```

We try to follow the ECMAScript specification as closely as possible.

## Snapshots

There are multiple ways to validate canvas state using snapshots. There are currently three methods
attached to the `CanvasRenderingContext2D` class. The first way to use this feature is by using the
`__getEvents` method.

```ts
/**
 * In order to see which functions and properties were used for the test, you can use `__getEvents`
 * to gather this information.
 */
const events = ctx.__getEvents();

expect(events).toMatchSnapshot(); // vitest will assert the events match the snapshot
```

The second way is to inspect the current path associated with the context.

```ts
ctx.beginPath();
ctx.arc(1, 2, 3, 4, 5);
ctx.moveTo(6, 7);
ctx.rect(6, 7, 8, 9);
ctx.closePath();

/**
 * Any method that modifies the current path (and subpath) will be pushed to an event array. When
 * using the `__getPath` method, that array will sliced and usable for snapshots.
 */
const path = ctx.__getPath();
expect(path).toMatchSnapshot();
```

The third way is to inspect all of the successful draw calls submitted to the context.

```ts
ctx.drawImage(img, 0, 0);

/**
 * Every drawImage, fill, stroke, fillText, or strokeText function call will be logged in an event
 * array. This method will return those events here for inspection.
 */
const calls = ctx.__getDrawCalls();
expect(calls).toMatchSnapshot();
```

In some cases it may be useful to clear the events or draw calls that have already been logged.

```ts
// Clear events
ctx.__clearEvents();

// Clear draw calls
ctx.__clearDrawCalls();
```

Finally, it's possible to inspect the clipping region calls by using the `__getClippingRegion`
function.

```ts
const clippingRegion = ctx.__getClippingRegion();
expect(clippingRegion).toMatchSnapshot();
```

The clipping region cannot be cleared because it's based on the stack values and when the `.clip()`
function is called.

## Override default mock return value

You can override the default mock return value in your test to suit your need. For example, to override return value of `toDataURL`:

```ts
canvas.toDataURL.mockReturnValueOnce(
  'data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==',
);
```

## License

MIT
