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

  it('should be callable', () => {
    ctx.reset();
    expect(ctx.reset).toBeCalled();
  });

  it('should reset the transform', () => {
    ctx.setTransform(1, 2, 3, 4, 5, 6);
    ctx.reset();
    expect(ctx.currentTransform).toEqual(new DOMMatrix([1, 0, 0, 1, 0, 0]));
  });

  it('should reset drawing state to defaults', () => {
    ctx.fillStyle = 'blue';
    ctx.lineWidth = 10;
    ctx.font = '12px serif';
    ctx.reset();
    expect(ctx.fillStyle).toBe('#000000');
    expect(ctx.lineWidth).toBe(1);
    expect(ctx.font).toBe('10px sans-serif');
  });

  it('should reset the state stack', () => {
    ctx.save();
    ctx.fillStyle = 'red';
    ctx.reset();
    ctx.restore();
    expect(ctx.fillStyle).toBe('#000000');
  });

  it('should clear the current path', () => {
    ctx.moveTo(1, 2);
    ctx.lineTo(3, 4);
    ctx.reset();
    expect(ctx.__getPath()).toHaveLength(1);
  });

  it('should add an event', () => {
    ctx.reset();
    const events = ctx.__getEvents();
    expect(events[events.length - 1].type).toBe('reset');
  });
});
