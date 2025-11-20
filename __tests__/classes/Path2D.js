import { describe, expect, it } from 'vitest'
import mockWindow from '../../src/window'

const borrowedFromCanvas = [
  'closePath',
  'moveTo',
  'lineTo',
  'bezierCurveTo',
  'quadraticCurveTo',
  'arc',
  'arcTo',
  'ellipse',
  'rect',
]

describe('path2D', () => {
  it('path2D', () => {
    const path = new Path2D()
    expect(path).toBeInstanceOf(Path2D)
  })

  it('should have addPath function', () => {
    const p = new Path2D()
    expect(typeof p.addPath).toBe('function')
  })

  it('should have a callable addPath function', () => {
    const p = new Path2D()
    p.addPath(new Path2D())
    expect(p.addPath).toBeCalled()
  })

  it('should borrow some path functions from CanvasRenderingContext2D', () => {
    const p = new Path2D()
    borrowedFromCanvas.forEach((func) => {
      expect(typeof p[func]).toBe('function')
    })
  })

  it('should throw if addPath is called with no parameters', () => {
    expect(() => new Path2D().addPath()).toThrow(TypeError)
  })

  it('should throw if first argument is not Path2D', () => {
    const p = new Path2D();
    [null, 1, void 0, Number.NaN, Infinity, {}, []].forEach((item) => {
      expect(() => p.addPath(item)).toThrow(TypeError)
    })
  })

  it('path2D different instance', () => {
    const path1 = new Path2D()
    const path2 = new Path2D()
    expect(path1.addPath).not.toBe(path2.addPath)
  })

  it('path2D not override', () => {
    const saved = window.Path2D
    mockWindow(window)
    expect(saved === window.Path2D).toBe(true)
  })

  it('path2D addPath calls _path.push', () => {
    const path1 = new Path2D()
    path1.moveTo(10, 10)
    path1.lineTo(20, 20)
    const path2 = new Path2D()
    path2.moveTo(30, 30)
    path2.lineTo(40, 40)
    expect(path1._path.length).toBe(2)
    path1.addPath(path2)
    expect(path1._path.length).toBe(4)
    expect(path1._path[2]).toBe(path2._path[0])
    expect(path1._path[3]).toBe(path2._path[1])
  })
})
