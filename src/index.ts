/* eslint-disable no-restricted-globals */
import { afterAll, vi } from 'vitest'

global.jest = vi

declare global {
  // eslint-disable-next-line no-var, vars-on-top
  var jest: typeof vi | undefined
}

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
  const getCanvasWindow = await import('jest-canvas-mock/lib/window.js').then(res => res.default?.default || res.default || res)

  const canvasWindow = getCanvasWindow({ document: window.document })

  apis.forEach((api) => {
    global[api] = canvasWindow[api]
    global.window[api] = canvasWindow[api]
  })
}

if ('window' in global) {
  importMockWindow()
}

afterAll(() => {
  delete global.jest
  if ('window' in global) {
    delete global.window.jest
  }
})

export {}
