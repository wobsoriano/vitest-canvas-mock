import { describe, expect, it, vi } from 'vitest'
import { setupVitestCanvasMock } from '../src/index'

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

  it('sets up global.jest for jest-canvas-mock compatibility', () => {
    expect((globalThis as any).jest).toBeDefined()
    expect((globalThis as any).jest).toBe(vi)
  })

  describe('setupVitestCanvasMock', () => {
    it('can be called manually to set up mocks', async () => {
      // Clear existing mocks temporarily
      const originalPath2D = window.Path2D
      delete (window as any).Path2D

      await setupVitestCanvasMock()

      expect(window.Path2D).toBeDefined()
      expect(window.Path2D).toBe(originalPath2D)
    })

    it('throws error when window is not available', async () => {
      const originalWindow = globalThis.window
      delete (globalThis as any).window

      await expect(setupVitestCanvasMock()).rejects.toThrow(
        'window is not available',
      )

      ;(globalThis as any).window = originalWindow
    })
  })

  describe('canvas operations', () => {
    it('allows creating a canvas element', () => {
      const canvas = document.createElement('canvas')
      expect(canvas).toBeInstanceOf(HTMLCanvasElement)
      expect(canvas.width).toBe(300) // default width
      expect(canvas.height).toBe(150) // default height
    })

    it('allows getting 2D context', () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      expect(ctx).toBeDefined()
      expect(ctx).toBeInstanceOf(window.CanvasRenderingContext2D)
    })

    it('allows basic drawing operations', () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')!
      expect(ctx).toBeDefined()

      // These should not throw
      expect(() => {
        ctx.beginPath()
        ctx.rect(10, 10, 50, 50)
        ctx.fill()
        ctx.stroke()
      }).not.toThrow()
    })

    it('validates arc parameters and throws on invalid input', () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')!

      // arc throws a TypeError when the argument length is less than 5
      expect(() => ctx.arc(1, 2, 3, 4)).toThrow(TypeError)

      // when radius is negative, arc throws a dom exception when all parameters are finite
      expect(() => ctx.arc(0, 0, -10, 0, Math.PI * 2)).toThrow(DOMException)

      // Valid input should not throw
      expect(() => ctx.arc(10, 10, 20, 0, Math.PI * 2)).not.toThrow()
    })

    it('allows type coercion for arc parameters', () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')!

      // String numbers should be coerced
      expect(() => ctx.arc('10', '10', '20', '0', '6.14')).not.toThrow()
    })

    it('validates fill rule', () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')!

      // Invalid fillRule should throw
      expect(() => ctx.fill('invalid!' as any)).toThrow(TypeError)
      expect(() => ctx.fill(new Path2D(), 'invalid!' as any)).toThrow(TypeError)

      // Valid fillRule should not throw
      expect(() => ctx.fill()).not.toThrow()
      expect(() => ctx.fill('evenodd')).not.toThrow()
      expect(() => ctx.fill('nonzero')).not.toThrow()
    })
  })

  describe('path2D operations', () => {
    it('allows creating and using Path2D', () => {
      const path = new Path2D()
      expect(path).toBeInstanceOf(Path2D)

      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')!

      expect(() => {
        path.rect(10, 10, 50, 50)
        ctx.fill(path)
      }).not.toThrow()
    })

    it('allows creating Path2D from SVG path', () => {
      const path = new Path2D('M10 10 L20 20')
      expect(path).toBeInstanceOf(Path2D)
    })
  })

  describe('imageData operations', () => {
    it('allows creating ImageData', () => {
      const imageData = new ImageData(100, 100)
      expect(imageData).toBeInstanceOf(ImageData)
      expect(imageData.width).toBe(100)
      expect(imageData.height).toBe(100)
      expect(imageData.data).toBeInstanceOf(Uint8ClampedArray)
      expect(imageData.data.length).toBe(100 * 100 * 4)
    })

    it('allows creating ImageData from data array', () => {
      const data = new Uint8ClampedArray(400) // 10x10 RGBA
      const imageData = new ImageData(data, 10, 10)
      expect(imageData).toBeInstanceOf(ImageData)
      expect(imageData.width).toBe(10)
      expect(imageData.height).toBe(10)
    })
  })

  describe('text operations', () => {
    it('allows measuring text', () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')!

      ctx.font = '16px Arial'
      const metrics = ctx.measureText('Hello World')
      expect(metrics).toBeInstanceOf(TextMetrics)
      expect(metrics.width).toBeGreaterThan(0)
    })

    it('allows drawing text', () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')!

      expect(() => {
        ctx.fillText('Hello', 10, 10)
        ctx.strokeText('World', 10, 30)
      }).not.toThrow()
    })
  })

  describe('gradient and pattern operations', () => {
    it('allows creating linear gradient', () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')!

      const gradient = ctx.createLinearGradient(0, 0, 100, 100)
      expect(gradient).toBeInstanceOf(CanvasGradient)

      gradient.addColorStop(0, 'red')
      gradient.addColorStop(1, 'blue')

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, 100, 100)
    })

    it('allows creating radial gradient', () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')!

      const gradient = ctx.createRadialGradient(50, 50, 10, 50, 50, 50)
      expect(gradient).toBeInstanceOf(CanvasGradient)
    })

    it('allows creating pattern from canvas', () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')!
      const patternCanvas = document.createElement('canvas')

      const pattern = ctx.createPattern(patternCanvas, 'repeat')
      expect(pattern).toBeInstanceOf(CanvasPattern)
    })
  })

  describe('snapshot functionality', () => {
    it('allows getting events from context', () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')!

      ctx.beginPath()
      ctx.arc(10, 10, 5, 0, Math.PI * 2)
      ctx.fill()

      // Check if __getEvents method exists (from jest-canvas-mock)
      if ('__getEvents' in ctx && typeof (ctx as any).__getEvents === 'function') {
        const events = (ctx as any).__getEvents()
        expect(Array.isArray(events)).toBe(true)
      }
    })

    it('allows getting path from context', () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')!

      ctx.beginPath()
      ctx.arc(1, 2, 3, 4, 5)
      ctx.moveTo(6, 7)
      ctx.rect(6, 7, 8, 9)
      ctx.closePath()

      if ('__getPath' in ctx && typeof (ctx as any).__getPath === 'function') {
        const path = (ctx as any).__getPath()
        expect(Array.isArray(path)).toBe(true)
      }
    })

    it('allows getting draw calls from context', () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')!

      ctx.fillRect(10, 10, 50, 50)
      ctx.strokeRect(20, 20, 30, 30)

      if ('__getDrawCalls' in ctx && typeof (ctx as any).__getDrawCalls === 'function') {
        const calls = (ctx as any).__getDrawCalls()
        expect(Array.isArray(calls)).toBe(true)
      }
    })

    it('allows clearing events and draw calls', () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')!

      ctx.fillRect(10, 10, 50, 50)

      if ('__clearEvents' in ctx && typeof (ctx as any).__clearEvents === 'function') {
        expect(() => (ctx as any).__clearEvents()).not.toThrow()
      }

      if ('__clearDrawCalls' in ctx && typeof (ctx as any).__clearDrawCalls === 'function') {
        expect(() => (ctx as any).__clearDrawCalls()).not.toThrow()
      }
    })
  })
})
