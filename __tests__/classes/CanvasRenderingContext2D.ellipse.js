import { beforeEach, describe, expect, it } from 'vitest'

let canvas
let ctx

beforeEach(() => {
  canvas = document.createElement('canvas')
  ctx = canvas.getContext('2d')
  canvas.width = 400
  canvas.height = 300
})

describe('ellipse', () => {
  it('should be a function', () => {
    expect(typeof ctx.ellipse === 'function').toBeTruthy()
  })

  it('should be callable', () => {
    ctx.ellipse(1, 2, 3, 4, 5, 6, 7)
    expect(ctx.ellipse).toBeCalled()
  })

  it('shouldn\'t accept parameters less than 7', () => {
    expect(() => ctx.ellipse()).toThrow(TypeError)
    expect(() => ctx.ellipse(1)).toThrow(TypeError)
    expect(() => ctx.ellipse(1, 2)).toThrow(TypeError)
    expect(() => ctx.ellipse(1, 2, 3)).toThrow(TypeError)
    expect(() => ctx.ellipse(1, 2, 3, 4)).toThrow(TypeError)
    expect(() => ctx.ellipse(1, 2, 3, 4, 5)).toThrow(TypeError)
    expect(() => ctx.ellipse(1, 2, 3, 4, 5, 6)).toThrow(TypeError)
  })

  it('should throw when major axis radius is negative', () => {
    const fn = () => ctx.ellipse(1, 2, -1, 4, 5, 6, 7)
    expect(fn).toThrow(DOMException)
    expect(fn).toThrow('The major-axis radius provided (-1) is negative.')
  })

  it('should throw when minor axis radius is negative', () => {
    const fn = () => ctx.ellipse(1, 2, 3, -1, 5, 6, 7)
    expect(fn).toThrow(DOMException)
    expect(fn).toThrow('The minor-axis radius provided (-1) is negative.')
  })

  it('should not throw if any value is `NaN`', () => {
    [
      [Number.NaN, 2, 3, 4, 5, 6, 7],
      [1, Number.NaN, 3, 4, 5, 6, 7],
      [1, 2, Number.NaN, 4, 5, 6, 7],
      [1, 2, 3, Number.NaN, 5, 6, 7],
      [1, 2, 3, 4, Number.NaN, 6, 7],
      [1, 2, 3, 4, 5, Number.NaN, 7],
      [1, 2, 3, 4, 5, 6, Number.NaN],
    ].forEach((e) => {
      expect(() => ctx.ellipse(...e)).not.toThrow()
    })
  })
})
