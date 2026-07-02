import { beforeEach, describe, expect, it } from 'vitest';

let canvas;
let ctx;

beforeEach(() => {
  canvas = document.createElement('canvas');
  ctx = canvas.getContext('2d');
  canvas.width = 400;
  canvas.height = 300;
});

describe('reset', () => {
  it('should be a function', () => {
    expect(typeof ctx.reset).toBe('function');
  });

  it('should be callable without throwing', () => {
    expect(() => ctx.reset()).not.toThrow();
  });

  it('should reset the current transform to identity', () => {
    ctx.setTransform(1, 2, 3, 4, 5, 6);
    expect(ctx.currentTransform).toEqual(new DOMMatrix([1, 2, 3, 4, 5, 6]));
    ctx.reset();
    expect(ctx.currentTransform).toEqual(new DOMMatrix([1, 0, 0, 1, 0, 0]));
  });

  it('should reset fillStyle to the default', () => {
    ctx.fillStyle = '#ff0000';
    ctx.reset();
    expect(ctx.fillStyle).toBe('#000000');
  });

  it('should reset strokeStyle to the default', () => {
    ctx.strokeStyle = '#00ff00';
    ctx.reset();
    expect(ctx.strokeStyle).toBe('#000000');
  });

  it('should reset globalAlpha to 1', () => {
    ctx.globalAlpha = 0.5;
    ctx.reset();
    expect(ctx.globalAlpha).toBe(1);
  });

  it('should reset globalCompositeOperation to source-over', () => {
    ctx.globalCompositeOperation = 'multiply';
    ctx.reset();
    expect(ctx.globalCompositeOperation).toBe('source-over');
  });

  it('should reset lineWidth to 1', () => {
    ctx.lineWidth = 5;
    ctx.reset();
    expect(ctx.lineWidth).toBe(1);
  });

  it('should reset lineCap to butt', () => {
    ctx.lineCap = 'round';
    ctx.reset();
    expect(ctx.lineCap).toBe('butt');
  });

  it('should reset lineJoin to miter', () => {
    ctx.lineJoin = 'bevel';
    ctx.reset();
    expect(ctx.lineJoin).toBe('miter');
  });

  it('should reset font to the default', () => {
    ctx.font = '20px Arial';
    ctx.reset();
    expect(ctx.font).toBe('10px sans-serif');
  });

  it('should reset textAlign to start', () => {
    ctx.textAlign = 'center';
    ctx.reset();
    expect(ctx.textAlign).toBe('start');
  });

  it('should reset textBaseline to alphabetic', () => {
    ctx.textBaseline = 'middle';
    ctx.reset();
    expect(ctx.textBaseline).toBe('alphabetic');
  });

  it('should reset shadowColor to transparent', () => {
    ctx.shadowColor = 'rgba(255, 0, 0, 0.5)';
    ctx.reset();
    expect(ctx.shadowColor).toBe('rgba(0, 0, 0, 0)');
  });

  it('should reset shadowBlur to 0', () => {
    ctx.shadowBlur = 7;
    ctx.reset();
    expect(ctx.shadowBlur).toBe(0);
  });

  it('should reset shadowOffsetX to 0', () => {
    ctx.shadowOffsetX = 3;
    ctx.reset();
    expect(ctx.shadowOffsetX).toBe(0);
  });

  it('should reset shadowOffsetY to 0', () => {
    ctx.shadowOffsetY = 4;
    ctx.reset();
    expect(ctx.shadowOffsetY).toBe(0);
  });

  it('should reset filter to none', () => {
    ctx.filter = 'blur(2px)';
    ctx.reset();
    expect(ctx.filter).toBe('none');
  });

  it('should reset imageSmoothingEnabled to true', () => {
    ctx.imageSmoothingEnabled = false;
    ctx.reset();
    expect(ctx.imageSmoothingEnabled).toBe(true);
  });

  it('should reset miterLimit to 10', () => {
    ctx.miterLimit = 3;
    ctx.reset();
    expect(ctx.miterLimit).toBe(10);
  });

  it('should reset lineDashOffset to 0', () => {
    ctx.lineDashOffset = 5;
    ctx.reset();
    expect(ctx.lineDashOffset).toBe(0);
  });

  it('should clear the current path', () => {
    ctx.rect(10, 10, 50, 50);
    const pathBefore = ctx.__getPath();
    expect(pathBefore.length).toBeGreaterThan(1);

    ctx.reset();

    // After reset the path should be reduced back to a single beginPath event.
    expect(ctx.__getPath()).toHaveLength(1);
  });

  it('should push a reset event', () => {
    ctx.reset();
    const events = ctx.__getEvents();
    expect(events).toHaveLength(1);
    expect(events[0].type).toBe('reset');
  });
});
