import { describe, expect, it } from 'vitest'

describe('canvas 2D Context Operations', () => {
  describe('drawing operations', () => {
    it('supports rectangle operations', () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')!

      expect(() => {
        ctx.fillRect(10, 10, 50, 50)
        ctx.strokeRect(20, 20, 30, 30)
        ctx.clearRect(15, 15, 40, 40)
      }).not.toThrow()
    })

    it('supports path operations', () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')!

      expect(() => {
        ctx.beginPath()
        ctx.moveTo(10, 10)
        ctx.lineTo(50, 50)
        ctx.quadraticCurveTo(60, 10, 70, 50)
        ctx.bezierCurveTo(80, 10, 90, 50, 100, 50)
        ctx.closePath()
        ctx.fill()
        ctx.stroke()
      }).not.toThrow()
    })

    it('supports arc operations', () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')!

      expect(() => {
        ctx.beginPath()
        ctx.arc(50, 50, 25, 0, Math.PI * 2)
        ctx.arcTo(100, 0, 100, 50, 25)
        ctx.ellipse(75, 75, 20, 10, 0, 0, Math.PI * 2)
        ctx.fill()
      }).not.toThrow()
    })

    it('supports line operations', () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')!

      expect(() => {
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(100, 100)
        ctx.lineWidth = 5
        ctx.lineCap = 'round'
        ctx.lineJoin = 'bevel'
        ctx.stroke()
      }).not.toThrow()
    })
  })

  describe('transformation operations', () => {
    it('supports transformations', () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')!

      expect(() => {
        ctx.save()
        ctx.translate(10, 10)
        ctx.rotate(Math.PI / 4)
        ctx.scale(2, 2)
        ctx.transform(1, 0, 0, 1, 5, 5)
        ctx.setTransform(1, 0, 0, 1, 0, 0)
        ctx.restore()
      }).not.toThrow()
    })

    it('supports DOMMatrix operations', () => {
      const matrix = new DOMMatrix()
      expect(matrix).toBeInstanceOf(DOMMatrix)

      const matrix2 = new DOMMatrix([1, 0, 0, 1, 10, 10])
      expect(matrix2.a).toBe(1)
      expect(matrix2.e).toBe(10)
      expect(matrix2.f).toBe(10)
    })
  })

  describe('clipping operations', () => {
    it('supports clipping regions', () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')!

      expect(() => {
        ctx.beginPath()
        ctx.rect(10, 10, 50, 50)
        ctx.clip()
        ctx.fillRect(0, 0, 100, 100) // Should be clipped
      }).not.toThrow()
    })

    it('supports getting clipping region', () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')!

      ctx.beginPath()
      ctx.rect(10, 10, 50, 50)
      ctx.clip()

      if ('__getClippingRegion' in ctx && typeof (ctx as any).__getClippingRegion === 'function') {
        const clippingRegion = (ctx as any).__getClippingRegion()
        expect(clippingRegion).toBeDefined()
      }
    })
  })

  describe('image operations', () => {
    it('supports drawing images', () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')!
      const img = new Image()

      expect(() => {
        ctx.drawImage(img, 0, 0)
        ctx.drawImage(img, 0, 0, 100, 100)
        ctx.drawImage(img, 0, 0, 50, 50, 10, 10, 50, 50)
      }).not.toThrow()
    })

    it('supports getImageData and putImageData', () => {
      const canvas = document.createElement('canvas')
      canvas.width = 100
      canvas.height = 100
      const ctx = canvas.getContext('2d')!

      ctx.fillRect(10, 10, 50, 50)
      const imageData = ctx.getImageData(0, 0, 100, 100)
      expect(imageData).toBeInstanceOf(ImageData)

      expect(() => {
        ctx.putImageData(imageData, 0, 0)
      }).not.toThrow()
    })

    it('supports createImageBitmap', async () => {
      const canvas = document.createElement('canvas')
      const imageBitmap = await createImageBitmap(canvas)
      expect(imageBitmap).toBeInstanceOf(ImageBitmap)
    })
  })

  describe('compositing operations', () => {
    it('supports global composite operations', () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')!

      expect(() => {
        ctx.globalCompositeOperation = 'source-over'
        ctx.globalCompositeOperation = 'multiply'
        ctx.globalCompositeOperation = 'screen'
        ctx.globalCompositeOperation = 'overlay'
        ctx.fillRect(10, 10, 50, 50)
      }).not.toThrow()
    })

    it('supports global alpha', () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')!

      expect(() => {
        ctx.globalAlpha = 0.5
        ctx.fillRect(10, 10, 50, 50)
        ctx.globalAlpha = 1.0
      }).not.toThrow()
    })
  })

  describe('shadow operations', () => {
    it('supports shadow properties', () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')!

      expect(() => {
        ctx.shadowBlur = 10
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'
        ctx.shadowOffsetX = 5
        ctx.shadowOffsetY = 5
        ctx.fillRect(10, 10, 50, 50)
      }).not.toThrow()
    })
  })

  describe('state management', () => {
    it('supports save and restore', () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')!

      ctx.fillStyle = 'red'
      const redValue = ctx.fillStyle // Capture computed value
      ctx.save()
      ctx.fillStyle = 'blue'
      ctx.restore()
      // fillStyle returns computed color value (e.g., '#ff0000' instead of 'red')
      expect(ctx.fillStyle).toBe(redValue)
    })

    it('supports multiple save/restore levels', () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')!

      ctx.fillStyle = 'red'
      const redValue = ctx.fillStyle
      ctx.save()
      ctx.fillStyle = 'blue'
      const blueValue = ctx.fillStyle
      ctx.save()
      ctx.fillStyle = 'green'
      ctx.restore()
      // fillStyle returns computed color value
      expect(ctx.fillStyle).toBe(blueValue)
      ctx.restore()
      expect(ctx.fillStyle).toBe(redValue)
    })
  })
})

describe('path2D Operations', () => {
  it('supports all path methods', () => {
    const path = new Path2D()

    expect(() => {
      path.moveTo(10, 10)
      path.lineTo(50, 50)
      path.quadraticCurveTo(60, 10, 70, 50)
      path.bezierCurveTo(80, 10, 90, 50, 100, 50)
      path.arc(50, 50, 25, 0, Math.PI * 2)
      path.arcTo(100, 0, 100, 50, 25)
      path.ellipse(75, 75, 20, 10, 0, 0, Math.PI * 2)
      path.rect(10, 10, 50, 50)
      path.closePath()
    }).not.toThrow()
  })

  it('supports creating Path2D from another Path2D', () => {
    const path1 = new Path2D()
    path1.rect(10, 10, 50, 50)

    const path2 = new Path2D(path1)
    expect(path2).toBeInstanceOf(Path2D)
  })

  it('supports creating Path2D from SVG path string', () => {
    const path = new Path2D('M10 10 L50 50 Z')
    expect(path).toBeInstanceOf(Path2D)
  })

  it('can be used with canvas context', () => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!
    const path = new Path2D()

    path.rect(10, 10, 50, 50)

    expect(() => {
      ctx.fill(path)
      ctx.stroke(path)
      ctx.clip(path)
    }).not.toThrow()
  })
})

describe('imageData Operations', () => {
  it('supports creating ImageData with dimensions', () => {
    const imageData = new ImageData(100, 100)
    expect(imageData.width).toBe(100)
    expect(imageData.height).toBe(100)
    expect(imageData.data.length).toBe(100 * 100 * 4)
  })

  it('supports creating ImageData with data array', () => {
    const data = new Uint8ClampedArray(400) // 10x10 RGBA
    const imageData = new ImageData(data, 10, 10)
    expect(imageData.width).toBe(10)
    expect(imageData.height).toBe(10)
    expect(imageData.data).toBe(data)
  })

  it('supports creating ImageData with data array and optional height', () => {
    const data = new Uint8ClampedArray(400) // 10x10 RGBA
    const imageData = new ImageData(data, 10)
    expect(imageData.width).toBe(10)
    expect(imageData.height).toBe(10)
  })

  it('allows reading and writing pixel data', () => {
    const imageData = new ImageData(10, 10)
    const data = imageData.data

    // Set a pixel to red
    const index = 0
    data[index] = 255 // R
    data[index + 1] = 0 // G
    data[index + 2] = 0 // B
    data[index + 3] = 255 // A

    expect(data[index]).toBe(255)
    expect(data[index + 1]).toBe(0)
    expect(data[index + 2]).toBe(0)
    expect(data[index + 3]).toBe(255)
  })
})

describe('gradient Operations', () => {
  it('supports linear gradients', () => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!

    const gradient = ctx.createLinearGradient(0, 0, 100, 100)
    expect(gradient).toBeInstanceOf(CanvasGradient)

    gradient.addColorStop(0, 'red')
    gradient.addColorStop(0.5, 'yellow')
    gradient.addColorStop(1, 'blue')

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 100, 100)
  })

  it('supports radial gradients', () => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!

    const gradient = ctx.createRadialGradient(50, 50, 10, 50, 50, 50)
    expect(gradient).toBeInstanceOf(CanvasGradient)

    gradient.addColorStop(0, 'white')
    gradient.addColorStop(1, 'black')

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 100, 100)
  })
})

describe('pattern Operations', () => {
  it('supports creating patterns from canvas', () => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!
    const patternCanvas = document.createElement('canvas')
    const patternCtx = patternCanvas.getContext('2d')!

    patternCtx.fillRect(0, 0, 10, 10)

    const pattern = ctx.createPattern(patternCanvas, 'repeat')
    expect(pattern).toBeInstanceOf(CanvasPattern)

    ctx.fillStyle = pattern!
    ctx.fillRect(0, 0, 100, 100)
  })

  it('supports different repeat modes', () => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!
    const patternCanvas = document.createElement('canvas')

    expect(ctx.createPattern(patternCanvas, 'repeat')).toBeInstanceOf(CanvasPattern)
    expect(ctx.createPattern(patternCanvas, 'repeat-x')).toBeInstanceOf(CanvasPattern)
    expect(ctx.createPattern(patternCanvas, 'repeat-y')).toBeInstanceOf(CanvasPattern)
    expect(ctx.createPattern(patternCanvas, 'no-repeat')).toBeInstanceOf(CanvasPattern)
  })
})

describe('text Rendering Operations', () => {
  it('supports text drawing', () => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!

    ctx.font = '16px Arial'
    ctx.fillStyle = 'black'
    ctx.strokeStyle = 'red'

    expect(() => {
      ctx.fillText('Hello World', 10, 20)
      ctx.strokeText('Hello World', 10, 40)
    }).not.toThrow()
  })

  it('supports text alignment', () => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!

    ctx.textAlign = 'left'
    ctx.textAlign = 'center'
    ctx.textAlign = 'right'
    ctx.textAlign = 'start'
    ctx.textAlign = 'end'

    ctx.fillText('Test', 50, 50)
  })

  it('supports text baseline', () => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!

    ctx.textBaseline = 'top'
    ctx.textBaseline = 'middle'
    ctx.textBaseline = 'bottom'
    ctx.textBaseline = 'alphabetic'
    ctx.textBaseline = 'hanging'

    ctx.fillText('Test', 10, 50)
  })

  it('supports text metrics', () => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!

    ctx.font = '16px Arial'
    const metrics = ctx.measureText('Hello World')

    expect(metrics).toBeInstanceOf(TextMetrics)
    expect(metrics.width).toBeGreaterThan(0)
    expect(typeof metrics.actualBoundingBoxAscent).toBe('number')
    expect(typeof metrics.actualBoundingBoxDescent).toBe('number')
  })

  it('supports text direction', () => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!

    ctx.direction = 'ltr'
    ctx.direction = 'rtl'
    ctx.direction = 'inherit'

    ctx.fillText('Test', 10, 50)
  })
})
