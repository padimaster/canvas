import {
  CANVAS_MODE,
  Camera,
  Color,
  LAYER_TYPE,
  PathLayerProps as PathLayer,
  Point,
  SIDE,
  XYWH,
} from '@/types';
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

export function pencilPointsTuPathLayer(
  points: number[][],
  color: Color
): PathLayer {
  if (points.length < 2) {
    throw new Error('At least two points are required to create a path');
  }
  let left = Number.POSITIVE_INFINITY;
  let right = Number.NEGATIVE_INFINITY;
  let top = Number.POSITIVE_INFINITY;
  let bottom = Number.NEGATIVE_INFINITY;

  for (const point of points) {
    const [x, y] = point;

    if (x < left) {
      left = x;
    }

    if (x > right) {
      right = x;
    }

    if (y < top) {
      top = y;
    }

    if (y > bottom) {
      bottom = y;
    }
  }

  return {
    type: LAYER_TYPE.PATH,
    x: left,
    y: top,
    width: right - left,
    height: bottom - top,
    fill: color,
    points: points.map(([x, y, preassure]) => [x - left, y - top, preassure]),
  };
}

export function getSvgPathFromStroke(stroke: number[][]) {
  if (!stroke.length) return '';

  const d = stroke.reduce(
    (acc, [x0, y0], i, arr) => {
      const [x1, y1] = arr[(i + 1) % arr.length];
      acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2);
      return acc;
    },
    ['M', ...stroke[0], 'Q']
  );

  d.push('Z');
  return d.join(' ');
}
