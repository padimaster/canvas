'use client';

import { LayersContext } from '@/providers/layer.provider';
import {
  EllipseLayer,
  LAYER_TYPE,
  PathLayerProps as PathLayer,
  RectangleLayer,
} from '@/types';
import { memo, useContext } from 'react';
import Ellipse from './ellipse-layer.component';
import Path from './path-layer.component';
import Rectangle from './rectangle-layer.component';

type Props = {
  id: string;
  onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void;
  selectionColor?: string;
};

function LayerPreview({ id, onLayerPointerDown, selectionColor }: Props) {
  const { layers } = useContext(LayersContext);
  const layer = layers[id];

  if (!layer) {
    return null;
  }
  switch (layer.type) {
    case LAYER_TYPE.PATH:
      return (
        <Path
          key={id}
          points={layer.points ?? []}
          layer={layer as PathLayer}
          onPointerDown={(e) => onLayerPointerDown(e, id)}
          selectionColor={selectionColor}
        />
      );
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
      return (
        <Ellipse
          id={id}
          layer={layer as EllipseLayer}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
        />
      );
    case LAYER_TYPE.TEXT:
      return null;
    case LAYER_TYPE.STICKY_NOTE:
      return (
        <Rectangle
          id={id}
          layer={layer as RectangleLayer}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
        />
      );
    default:
      console.warn('Unknown layer type');
      return null;
  }
}

const MemoLayerPreview = memo(LayerPreview);

MemoLayerPreview.displayName = 'LayerPreview';

export default MemoLayerPreview;
