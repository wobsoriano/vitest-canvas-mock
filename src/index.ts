import { afterAll, vi } from 'vitest'

declare global {
  // eslint-disable-next-line vars-on-top
  var jest: typeof vi | undefined
}

// Set up jest global for jest-canvas-mock compatibility
if (!globalThis.jest) {
  globalThis.jest = vi
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

type CanvasWindow = {
  [K in typeof apis[number]]: any
}

export async function importMockWindow(): Promise<CanvasWindow> {
  try {
    // @ts-expect-error: jest-canvas-mock/lib/window.js type is not available
    const module = await import('jest-canvas-mock/lib/window.js')
    const getCanvasWindow = module.default?.default || module.default || module

    if (typeof getCanvasWindow !== 'function') {
      throw new TypeError('jest-canvas-mock/lib/window.js did not export a function')
    }

    if (!('window' in globalThis) || !globalThis.window) {
      throw new Error('window is not available in this environment')
    }

    const canvasWindow = getCanvasWindow({ document: globalThis.window.document })

    return canvasWindow
  }
  catch (error) {
    throw new Error(
      `Failed to import jest-canvas-mock: ${error instanceof Error ? error.message : String(error)}`,
    )
  }
}

function setupCanvasMocks(canvasWindow: CanvasWindow): void {
  apis.forEach((api) => {
    if (api in canvasWindow) {
      globalThis[api] = canvasWindow[api]
      if ('window' in globalThis && globalThis.window) {
        globalThis.window[api] = canvasWindow[api]
      }
    }
  })
}

export async function setupVitestCanvasMock(): Promise<void> {
  const canvasWindow = await importMockWindow()
  setupCanvasMocks(canvasWindow)
}

// Auto-setup on import if window is available
if ('window' in globalThis) {
  void setupVitestCanvasMock().catch((error) => {
    console.error('[vitest-canvas-mock] Failed to set up canvas mocks:', error)
  })
}

afterAll(() => {
  delete globalThis.jest
  if ('window' in globalThis) {
    delete globalThis.window.jest
  }
})

export {}
