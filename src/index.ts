import { afterAll, vi } from 'vitest'
// @ts-expect-error: Global jest
global.jest = vi
// @ts-expect-error: Missing files
// eslint-disable-next-line import/first
import getCanvasWindow from 'jest-canvas-mock/lib/window'

const apis = [
  'Path2D',
  'CanvasGradient',
  'CanvasPattern',
  'CanvasRenderingContext2D',
  'DOMMatrix',
  'ImageData',
  'TextMetrics',
  'ImageBitmap',
  'createImageBitmap',
] as const

const canvasWindow = getCanvasWindow({ document: window.document })

apis.forEach((api) => {
  global[api] = canvasWindow[api]
  global.window[api] = canvasWindow[api]
})

afterAll(() => {
  // @ts-expect-error: Global jest
  delete global.jest
  // @ts-expect-error: Global jest
  delete global.window.jest
})

export {}
