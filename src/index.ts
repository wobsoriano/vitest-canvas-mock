import { afterAll, vi } from 'vitest'
// @ts-expect-error: Global jest
global.jest = vi

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

async function importMockWindow() {
  // @ts-expect-error: Missing files
  const getCanvasWindow = await import('jest-canvas-mock/lib/window').then(res => res.default?.default || res.default || res)

  const canvasWindow = getCanvasWindow(window)

  apis.forEach((api) => {
    global[api] = canvasWindow[api]
    global.window[api] = canvasWindow[api]
  })
}

importMockWindow()

afterAll(() => {
  // @ts-expect-error: Global jest
  delete global.jest
  // @ts-expect-error: Global jest
  delete global.window.jest
})

export {}
