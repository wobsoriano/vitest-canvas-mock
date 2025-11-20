# vitest-canvas-mock

## 1.1.0

### Minor Changes

- bc7dc3a: This project is now established as a direct fork of `jest-canvas-mock`, migrated to work with Vitest.

  ### Changes

  - Updated function name references and documentation to use Vitest terminology
  - Updated type definitions and comments to reference `vitest-canvas-mock` instead of `jest-canvas-mock`
  - No API changes - the function has always been `setupVitestCanvasMock()` in this fork

## 1.0.1

### Patch Changes

- 98d45ea: Export importMockWindow helper

## 1.0.0

### Major Changes

- 844d2fe: - **Breaking**: Peer dependency now requires Vitest 3.x or 4.x (previously allowed any version)
  - Added `setupVitestCanvasMock()` export function for manual setup (similar to jest-canvas-mock's `setupJestCanvasMock()`)
  - Improved test coverage
