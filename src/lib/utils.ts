import { CANVAS_MODE, Camera, Color } from '@/types';
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
