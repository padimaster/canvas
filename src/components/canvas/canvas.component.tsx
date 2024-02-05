'use client';

import { nanoid } from 'nanoid';

import {
  CANVAS_MODE,
  Camera,
  CanvasState,
  Color,
  LAYER_TYPE,
  Point,
  SIDE,
  XYWH,
} from '@/types';

import {
  colorToCSS,
  isSelectionMode,
  pencilPointsTuPathLayer,
  pointerEventToCanvasPoint,
  resizeBounds,
} from '@/lib/utils';
import { LayersProvider } from '@/providers/layer.provider';
import { useCallback, useState } from 'react';
import Info from './info.component';
import { LayerPreview, SelectionBox } from './layer';
import Participants from './participants.component';
import { SelectionTools } from './tools';
import Toolbar from './tools/toolbar.component';

const MAX_LAYERS = 100;

export default function Canvas() {
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CANVAS_MODE.NONE,
  });

  const [layers, setLayers] = useState<Record<string, any>>({});
  const [selection, setSelection] = useState<string[]>([]);
  const [pencilDraft, setPencilDraft] = useState<Array<number[]>>([]);

  const layersId = Object.keys(layers);

  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });
  const [lastUsedColor, setLastUsedColor] = useState<Color>({
    r: 10,
    g: 100,
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

    setLayers((prevLayers) => ({
      ...prevLayers,
      [layerId]: layer,
    }));
  };

  const layersToColors = (layerId: string) => {
    if (!selection.includes(layerId) || !isSelectionMode(canvasState.mode)) {
      return undefined;
    }

    return colorToCSS({ r: 150, g: 150, b: 150 });
  };

  const onLayerPointerDown = (e: React.PointerEvent, layerId: string) => {
    if (
      canvasState.mode === CANVAS_MODE.DRAWING ||
      canvasState.mode === CANVAS_MODE.INSERTING
    ) {
      return;
    }

    e.stopPropagation();

    const current = pointerEventToCanvasPoint(e, camera);

    setSelection([layerId]);

    setCanvasState({
      mode: CANVAS_MODE.TRASLATING,
      current,
    });
  };

  const onResizeHandlerPointerDown = useCallback(
    (corner: SIDE, initialBounds: XYWH) => {
      setCanvasState({
        mode: CANVAS_MODE.RESIZING,
        corner,
        initialBounds,
      });
    },
    []
  );

  const unselectLayers = () => {
    if (selection.length > 0) {
      setSelection([]);
    }
  };

  const resizeSelectedLayer = (point: Point) => {
    if (canvasState.mode !== CANVAS_MODE.RESIZING) {
      return;
    }

    const bounds = resizeBounds(
      canvasState.initialBounds,
      canvasState.corner,
      point
    );

    const selectedLayer = layers[selection[0]];

    if (!selectedLayer) {
      return;
    }

    setLayers((prevLayers) => ({
      ...prevLayers,
      [selection[0]]: {
        ...selectedLayer,
        ...bounds,
      },
    }));
  };

  const translateSelectedLayers = (point: Point) => {
    if (canvasState.mode !== CANVAS_MODE.TRASLATING) {
      return;
    }

    const offset = {
      x: point.x - canvasState.current.x,
      y: point.y - canvasState.current.y,
    };

    for (const layerId of selection) {
      const layer = layers[layerId];

      if (!layer) {
        continue;
      }

      setLayers((prevLayers) => ({
        ...prevLayers,
        [layerId]: {
          ...layer,
          x: layer.x + offset.x,
          y: layer.y + offset.y,
        },
      }));
    }

    setCanvasState({
      mode: CANVAS_MODE.TRASLATING,
      current: point,
    });
  };

  const startDrawing = (point: Point, pressure: number) => {
    const pencilDraft = [[point.x, point.y, pressure]];
    setPencilDraft(pencilDraft);
  };

  const continueDrawing = (point: Point, event: React.PointerEvent) => {
    if (
      canvasState.mode !== CANVAS_MODE.DRAWING ||
      !pencilDraft ||
      event.buttons !== 1
    ) {
      return;
    }

    const isNotMoving =
      pencilDraft.length === 0 &&
      pencilDraft[0] &&
      pencilDraft[0][0] === point.x &&
      pencilDraft[0][1] === point.y;

    if (!isNotMoving) {
      setPencilDraft((prev) => [...prev, [point.x, point.y, event.pressure]]);
    }
  };

  const insertPath = () => {
    if (
      pencilDraft === null ||
      pencilDraft.length < 2 ||
      layersId.length >= MAX_LAYERS
    ) {
      setPencilDraft([]);
      return;
    }

    const id = nanoid();

    setLayers((prev) => ({
      ...prev,
      [id]: pencilPointsTuPathLayer(pencilDraft, lastUsedColor),
    }));

    setPencilDraft([]);
    setCanvasState({ mode: CANVAS_MODE.DRAWING });
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

    if (canvasState.mode === CANVAS_MODE.TRASLATING) {
      translateSelectedLayers(current);
    } else if (canvasState.mode === CANVAS_MODE.RESIZING) {
      resizeSelectedLayer(current);
    } else if (canvasState.mode === CANVAS_MODE.DRAWING) {
      continueDrawing(current, event);
    }
  };

  const onPointerUp: React.PointerEventHandler<SVGSVGElement> = (event) => {
    const point = pointerEventToCanvasPoint(event, camera);

    if (
      canvasState.mode === CANVAS_MODE.NONE ||
      canvasState.mode === CANVAS_MODE.PRESSING
    ) {
      unselectLayers();
      setCanvasState({ mode: CANVAS_MODE.NONE });
    } else if (canvasState.mode === CANVAS_MODE.DRAWING) {
      insertPath();
    } else if (canvasState.mode === CANVAS_MODE.INSERTING) {
      insertLayer(canvasState.layerType, point);
    } else {
      setCanvasState({ mode: CANVAS_MODE.NONE });
    }
  };

  const onPointerDown: React.PointerEventHandler<SVGSVGElement> = (event) => {
    const point = pointerEventToCanvasPoint(event, camera);
    if (canvasState.mode === CANVAS_MODE.INSERTING) {
      return;
    }

    if (canvasState.mode === CANVAS_MODE.DRAWING) {
      startDrawing(point, event.pressure);
      return;
    }

    setCanvasState({ mode: CANVAS_MODE.PRESSING, origin: point });
  };

  return (
    <LayersProvider
      value={{
        layers,
        setLayers,
        selection,
        setSelection,
        penColor: lastUsedColor,
        pencilDraft,
      }}
    >
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
        <SelectionTools
          camera={camera}
          setLastUsedColor={setLastUsedColor}
        ></SelectionTools>
        <svg
          className="h-[100vh] w-[100vw]"
          onWheel={onWheel}
          onPointerUp={onPointerUp}
          onPointerMove={onPointerMove}
          onPointerDown={onPointerDown}
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
                onLayerPointerDown={onLayerPointerDown}
                selectionColor={layersToColors(layerId)}
              />
            ))}
            <SelectionBox
              onResizeHandlerPointerDown={onResizeHandlerPointerDown}
            />
          </g>
        </svg>
      </div>
    </LayersProvider>
  );
}
