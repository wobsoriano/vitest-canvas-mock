import { vi } from 'vitest'

globalThis.window.Worker = class {
  constructor(stringUrl) {
    this.url = stringUrl
    this.onmessage = () => {}
  }

  postMessage(msg) {
    this.onmessage(msg)
  }
}

globalThis.window.URL.createObjectURL = vi.fn()
