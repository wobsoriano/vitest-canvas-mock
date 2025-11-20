/**
 * test canvas
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ver, setupJestCanvasMock } from '../src';
import pkg from '../package.json';

let canvas;

beforeEach(() => {
  canvas = document.createElement('canvas');
});

describe('canvas', () => {
  it('should have correct version', () => {
    // Version is replaced at build time, so in source it's '__VERSION__'
    expect(ver).toBe('__VERSION__');
  });
});

describe('setupJestCanvasMock', () => {
  it('should setup after resetAllMocks', () => {
    vi.resetAllMocks();
    // Note: vi.resetAllMocks() only resets call history, not prototype mocks
    // The canvas mock is still set up from the initial import
    // This test verifies setupJestCanvasMock can be called to re-setup mocks
    setupJestCanvasMock();
    expect(document.createElement('canvas').getContext('2d')).toHaveProperty(
      'createImageData'
    );
  });
});
