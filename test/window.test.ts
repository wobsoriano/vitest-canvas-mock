import { describe, expect, it, vi } from 'vitest'

describe('mockWindow', () => {
  it('mocks the passed object', () => {
    expect(window.Path2D).not.toBeNull()
    expect(window.CanvasGradient).not.toBeNull()
    expect(window.CanvasPattern).not.toBeNull()
    expect(window.CanvasRenderingContext2D).not.toBeNull()
    expect(window.DOMMatrix).not.toBeNull()
    expect(window.ImageData).not.toBeNull()
    expect(window.TextMetrics).not.toBeNull()
    expect(window.ImageBitmap).not.toBeNull()
    expect(window.createImageBitmap).not.toBeNull()

    expect(
      vi.isMockFunction(window.HTMLCanvasElement.prototype.getContext),
    ).toBe(true)
    expect(vi.isMockFunction(window.HTMLCanvasElement.prototype.toBlob)).toBe(
      true,
    )
    expect(vi.isMockFunction(window.HTMLCanvasElement.prototype.toDataURL)).toBe(
      true,
    )
  })

  it('mocks without a fully formed passed in window object', () => {
    expect(window.Path2D).not.toBeNull()
    expect(window.CanvasGradient).not.toBeNull()
    expect(window.CanvasPattern).not.toBeNull()
    expect(window.CanvasRenderingContext2D).not.toBeNull()
    expect(window.DOMMatrix).not.toBeNull()
    expect(window.ImageData).not.toBeNull()
    expect(window.TextMetrics).not.toBeNull()
    expect(window.ImageBitmap).not.toBeNull()
    expect(window.createImageBitmap).not.toBeNull()

    expect(vi.isMockFunction(window.HTMLCanvasElement)).toBe(false)
  })
})
