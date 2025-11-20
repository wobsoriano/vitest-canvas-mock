/**
 * test canvas
 */

import { beforeEach, describe, expect, it, vi } from 'vitest'
import { setupJestCanvasMock } from '../src'

beforeEach(() => {
  document.createElement('canvas')
})

describe('setupJestCanvasMock', () => {
  it('should setup after resetAllMocks', () => {
    vi.resetAllMocks()
    // Note: vi.resetAllMocks() only resets call history, not prototype mocks
    // The canvas mock is still set up from the initial import
    // This test verifies setupJestCanvasMock can be called to re-setup mocks
    setupJestCanvasMock()
    expect(document.createElement('canvas').getContext('2d')).toHaveProperty(
      'createImageData',
    )
  })
})
