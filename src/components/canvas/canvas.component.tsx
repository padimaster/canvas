'use client';

import { nanoid } from 'nanoid';

import {
  CANVAS_MODE,
  Camera,
  CanvasState,
  Color,
  LAYER_TYPE,
  Point,
} from '@/types';

import useLayer from '@/hooks/use-layer.hook';
import { pointerEventToCanvasPoint } from '@/lib/utils';
import { useCallback, useState } from 'react';
import Info from './info.component';
import { LayerPreview } from './layer';
import Participants from './participants.component';
import Toolbar from './tools/toolbar.component';

const MAX_LAYERS = 100;

export default function Canvas() {
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CANVAS_MODE.NONE,
  });

  const { layers, getLayersID, addLayer } = useLayer();

  const layersId = getLayersID();

  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });
  const [lastUsedColor, setLastUsedColor] = useState<Color>({
    r: 0,
    g: 0,
    b: 0,
  });

  const insertLayer = (layerType: LAYER_TYPE, position: Point) => {
    const layersSize = Object.keys(layers).length;
    if (layersSize >= MAX_LAYERS) {
      return;
    }

    const layerId = nanoid();

    const layer = {
      type: layerType,
      x: position.x,
      y: position.y,
      color: lastUsedColor,
      height: 100,
      width: 100,
      fill: lastUsedColor,
    };

    addLayer(layerId, layer);
    console.log('Layer added');
    console.log({
      layerId,
      layer,
    });
  };

  const onWheel = useCallback((e: React.WheelEvent) => {
    setCamera((camera) => ({
      x: camera.x - e.deltaX,
      y: camera.y - e.deltaY,
    }));
  }, []);

  const onPointerMove = (event: React.PointerEvent<SVGSVGElement>) => {
    event.preventDefault();

    const current = pointerEventToCanvasPoint(event, camera);
  };

  const onPointerUp: React.PointerEventHandler<SVGSVGElement> = (event) => {
    const point = pointerEventToCanvasPoint(event, camera);
    console.log('Pointer up at:', point);
    if (canvasState.mode === CANVAS_MODE.INSERTING) {
      console.log('Inserting layer');
      insertLayer(canvasState.layerType, point);
    } else {
      setCanvasState({ mode: CANVAS_MODE.NONE });
    }
  };

  return (
    <div className="w-full h-full relative bg-neutral-100 touch-none">
      <Info />
      <Participants />
      <Toolbar
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        canRedo={false}
        canUndo={false}
        redo={() => {}}
        undo={() => {}}
      />
      <svg
        className="h-[100vh] w-[100vw]"
        onWheel={onWheel}
        onPointerUp={onPointerUp}
        onPointerMove={onPointerMove}
        data-testid="layers-container"
      >
        <g
          style={{
            transform: `translate(${camera.x}px, ${camera.y}px)`,
          }}
        >
          {layersId.map((layerId) => (
            <LayerPreview
              key={layerId}
              id={layerId}
              layer={layers[layerId]}
              onLayerPointerDown={() => {}}
              selectionColor={'#000'}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
