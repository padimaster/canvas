'use client';

import useLayer from '@/hooks/useLayer';
import { LAYER_TYPE, RectangleLayer } from '@/types';
import { memo } from 'react';
import Rectangle from './rectangle-layer.component';

type Props = {
  id: string;
  onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void;
  selectionColor?: string;
};

const LayerPreview = memo(function LayerPreview({
  id,
  onLayerPointerDown,
  selectionColor,
}: Props) {
  console.log('LayerPreview component rendered!');
  const { getLayerById, layers } = useLayer();

  if (!id) {
    return null;
  }

  console.log('ID:', id);
  const layer = getLayerById(id);
  console.log(layer);
  console.log(layers);

  if (!layer) {
    return null;
  }
  switch (layer.type) {
    case LAYER_TYPE.RECTANGLE:
      return (
        <Rectangle
          id={id}
          layer={layer as RectangleLayer}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
        />
      );
    case LAYER_TYPE.ELLIPSE:
      return null;
    case LAYER_TYPE.TEXT:
      return null;
    case LAYER_TYPE.STICKY_NOTE:
      return null;
    default:
      console.warn('Unknown layer type');
      return null;
  }
});

LayerPreview.displayName = 'LayerPreview';

export default LayerPreview;
