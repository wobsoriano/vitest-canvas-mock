import { MooColor } from 'moo-color'
import { vi } from 'vitest'

export default class CanvasGradient {
  constructor() {
    this.addColorStop = vi.fn(this.addColorStop.bind(this))
  }

  addColorStop(offset, color) {
    const numoffset = Number(offset)
    if (!Number.isFinite(numoffset) || numoffset < 0 || numoffset > 1) {
      throw new DOMException(
        `Failed to execute 'addColorStop' on 'CanvasGradient': The provided value ('${
          numoffset
        }') is outside the range (0.0, 1.0)`,
        'IndexSizeError',
      )
    }
    try {
      // eslint-disable-next-line no-new
      new MooColor(color)
    }
    catch {
      throw new SyntaxError(
        `Failed to execute 'addColorStop' on 'CanvasGradient': The value provided ('${
          color
        }') could not be parsed as a color.`,
      )
    }
  }
}
