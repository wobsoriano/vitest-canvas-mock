/**
 * test canvas
 */

import { beforeEach, describe, expect, it, vi } from 'vitest'
import { setupVitestCanvasMock } from '../src'

beforeEach(() => {
  document.createElement('canvas')
})

describe('setupVitestCanvasMock', () => {
  it('should setup after resetAllMocks', () => {
    vi.resetAllMocks()
    // Note: vi.resetAllMocks() only resets call history, not prototype mocks
    // The canvas mock is still set up from the initial import
    // This test verifies setupVitestCanvasMock can be called to re-setup mocks
    setupVitestCanvasMock()
    expect(document.createElement('canvas').getContext('2d')).toHaveProperty(
      'createImageData',
    )
  })
})
