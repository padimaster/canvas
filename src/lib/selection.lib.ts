import { LayerProps, XYWH } from '@/types';

const boundingBox = (layers: LayerProps[]): XYWH | null => {
  const first = layers[0];

  if (!first) {
    return null;
  }

  let left = first.x;
  let right = first.x + first.width;
  let top = first.y;
  let bottom = first.y + first.height;

  for (let i = 1; i < layers.length; i++) {
    const { x, y, width, height } = layers[i];

    if (left > x) {
      left = x;
    }

    if (right < x + width) {
      right = x + width;
    }

    if (top > y) {
      top = y;
    }

    if (bottom < y + height) {
      bottom = y + height;
    }
  }

  return {
    x: left,
    y: top,
    width: right - left,
    height: bottom - top,
  };
};

export const getSelectionBounds = (
  selection: string[],
  layers: Record<string, LayerProps>
) => {
  const selectedLayers = selection
    .map((layerId: string) => layers[layerId])
    .filter(Boolean);

  return boundingBox(selectedLayers);
};
