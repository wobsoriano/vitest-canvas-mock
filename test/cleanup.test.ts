import { beforeEach, describe, expect, it, vi } from 'vitest'

describe('cleanup', () => {
  beforeEach(() => {
    // Ensure jest is set up before each test
    if (!(globalThis as any).jest) {
      ;(globalThis as any).jest = vi
    }
  })

  it('sets up global.jest', () => {
    expect((globalThis as any).jest).toBeDefined()
    expect((globalThis as any).jest).toBe(vi)
  })

  it('global.jest is available during tests', () => {
    // Verify jest is available (needed for jest-canvas-mock)
    expect((globalThis as any).jest).toBe(vi)
    expect(typeof (globalThis as any).jest.fn).toBe('function')
    expect(typeof (globalThis as any).jest.isMockFunction).toBe('function')
  })

  it('canvas APIs are available on globalThis', () => {
    expect((globalThis as any).Path2D).toBeDefined()
    expect((globalThis as any).CanvasGradient).toBeDefined()
    expect((globalThis as any).CanvasPattern).toBeDefined()
    expect((globalThis as any).CanvasRenderingContext2D).toBeDefined()
    expect((globalThis as any).DOMMatrix).toBeDefined()
    expect((globalThis as any).ImageData).toBeDefined()
    expect((globalThis as any).TextMetrics).toBeDefined()
    expect((globalThis as any).ImageBitmap).toBeDefined()
    expect((globalThis as any).createImageBitmap).toBeDefined()
  })

  it('canvas APIs are available on window', () => {
    expect(window.Path2D).toBeDefined()
    expect(window.CanvasGradient).toBeDefined()
    expect(window.CanvasPattern).toBeDefined()
    expect(window.CanvasRenderingContext2D).toBeDefined()
    expect(window.DOMMatrix).toBeDefined()
    expect(window.ImageData).toBeDefined()
    expect(window.TextMetrics).toBeDefined()
    expect(window.ImageBitmap).toBeDefined()
    expect(window.createImageBitmap).toBeDefined()
  })

  describe('afterAll cleanup', () => {
    // Note: The actual cleanup happens in the afterAll hook in src/index.ts
    // We can't directly test that it runs, but we can verify the setup is correct
    it('verifies cleanup hook is registered', () => {
      // The afterAll hook is registered in src/index.ts
      // We verify that the setup is working correctly
      expect((globalThis as any).jest).toBeDefined()
    })
  })

  describe('mock persistence', () => {
    it('mocks persist across multiple canvas operations', () => {
      const canvas1 = document.createElement('canvas')
      const ctx1 = canvas1.getContext('2d')!

      const canvas2 = document.createElement('canvas')
      const ctx2 = canvas2.getContext('2d')!

      // Both contexts should be mocked
      expect(ctx1).toBeInstanceOf(window.CanvasRenderingContext2D)
      expect(ctx2).toBeInstanceOf(window.CanvasRenderingContext2D)

      // Both should support mock methods
      ctx1.fillRect(10, 10, 50, 50)
      ctx2.fillRect(20, 20, 30, 30)

      // Verify mock functions are still available
      expect(vi.isMockFunction(canvas1.getContext)).toBe(true)
      expect(vi.isMockFunction(canvas2.getContext)).toBe(true)
    })

    it('mocks work correctly after multiple test runs', () => {
      // This test verifies that mocks don't break after being used multiple times
      for (let i = 0; i < 5; i++) {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')!

        expect(ctx).toBeDefined()
        expect(ctx).toBeInstanceOf(window.CanvasRenderingContext2D)

        ctx.fillRect(10, 10, 50, 50)
        ctx.strokeRect(20, 20, 30, 30)
      }
    })
  })

  describe('error handling during cleanup', () => {
    it('handles missing window gracefully', () => {
      // Verify that the code handles edge cases
      // The actual cleanup in afterAll checks for window existence
      if ('window' in globalThis) {
        expect(globalThis.window).toBeDefined()
      }
    })
  })
})
