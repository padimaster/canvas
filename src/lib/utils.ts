import { CANVAS_MODE, Camera, Color, Point, SIDE, XYWH } from '@/types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function pointerEventToCanvasPoint(
  e: React.PointerEvent,
  camera: Camera
) {
  return {
    x: Math.round(e.clientX) - camera.x,
    y: Math.round(e.clientY) - camera.y,
  };
}

export function colorToCSS(color: Color) {
  const { r, g, b } = color;
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

export const isSelectionMode = (mode: CANVAS_MODE) =>
  mode === CANVAS_MODE.NONE ||
  mode === CANVAS_MODE.TRASLATING ||
  mode === CANVAS_MODE.RESIZING ||
  mode === CANVAS_MODE.SELECTION_NET ||
  mode === CANVAS_MODE.PRESSING;

export function resizeBounds(bounds: XYWH, corner: SIDE, point: Point): XYWH {
  const result = {
    x: bounds.x,
    y: bounds.y,
    width: bounds.width,
    height: bounds.height,
  };

  if ((corner & SIDE.LEFT) === SIDE.LEFT) {
    result.x = Math.min(point.x, bounds.x + bounds.width);
    result.width = Math.abs(bounds.x + bounds.width - point.x);
  }

  if ((corner & SIDE.RIGHT) === SIDE.RIGHT) {
    result.x = Math.min(point.x, bounds.x);
    result.width = Math.abs(point.x - bounds.x);
  }

  if ((corner & SIDE.TOP) === SIDE.TOP) {
    result.y = Math.min(point.y, bounds.y + bounds.height);
    result.height = Math.abs(bounds.y + bounds.height - point.y);
  }

  if ((corner & SIDE.BOTTOM) === SIDE.BOTTOM) {
    result.y = Math.min(point.y, bounds.y);
    result.height = Math.abs(point.y - bounds.y);
  }

  return result;
}
