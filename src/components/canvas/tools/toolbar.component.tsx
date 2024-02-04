import { Skeleton } from '@/components/ui/skeleton';
import { isSelectionMode } from '@/lib/utils';
import { CANVAS_MODE, CanvasState, LAYER_TYPE } from '@/types';
import {
  Circle,
  MousePointer2,
  Pencil,
  Redo2,
  Square,
  StickyNote,
  Type,
  Undo2,
} from 'lucide-react';
import { ToolButton } from '.';

type ToolbarProps = {
  canvasState: CanvasState;
  setCanvasState: (state: CanvasState) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
};

export default function Toolbar({
  canvasState,
  setCanvasState,
  undo,
  redo,
  canUndo,
  canRedo,
}: ToolbarProps) {
  return (
    <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4">
      <div className="bg-white rounded-md p-1.5 flex gap-y-1 flex-col items-center shadow-md">
        <ToolButton
          label="Select"
          icon={MousePointer2}
          onClick={() => setCanvasState({ mode: CANVAS_MODE.NONE })}
          isActive={isSelectionMode(canvasState.mode)}
        />
        <ToolButton
          label="Text"
          icon={Type}
          onClick={() =>
            setCanvasState({
              mode: CANVAS_MODE.INSERTING,
              layerType: LAYER_TYPE.TEXT,
            })
          }
          isActive={
            canvasState.mode === CANVAS_MODE.INSERTING &&
            canvasState.layerType === LAYER_TYPE.TEXT
          }
        />
        <ToolButton
          label="Sticky Note"
          icon={StickyNote}
          onClick={() =>
            setCanvasState({
              mode: CANVAS_MODE.INSERTING,
              layerType: LAYER_TYPE.STICKY_NOTE,
            })
          }
          isActive={
            canvasState.mode === CANVAS_MODE.INSERTING &&
            canvasState.layerType === LAYER_TYPE.STICKY_NOTE
          }
        />
        <ToolButton
          label="Rectangle"
          icon={Square}
          onClick={() =>
            setCanvasState({
              mode: CANVAS_MODE.INSERTING,
              layerType: LAYER_TYPE.RECTANGLE,
            })
          }
          isActive={
            canvasState.mode == CANVAS_MODE.INSERTING &&
            canvasState.layerType === LAYER_TYPE.RECTANGLE
          }
          data-testid="rectangle-tool-button"
        />
        <ToolButton
          label="Ellipse"
          icon={Circle}
          onClick={() =>
            setCanvasState({
              mode: CANVAS_MODE.INSERTING,
              layerType: LAYER_TYPE.ELLIPSE,
            })
          }
          isActive={
            canvasState.mode === CANVAS_MODE.INSERTING &&
            canvasState.layerType === LAYER_TYPE.ELLIPSE
          }
        />
        <ToolButton
          label="DRAWING"
          icon={Pencil}
          onClick={() => setCanvasState({ mode: CANVAS_MODE.DRAWING })}
          isActive={canvasState.mode === CANVAS_MODE.DRAWING}
        />
      </div>
      <div className="bg-white rounded-md p-1.5 flex flex-col items-center shadow-md">
        <ToolButton
          label="Undo"
          icon={Undo2}
          onClick={() => {}}
          isActive={canUndo}
          isDisabled={!canUndo}
        />
        <ToolButton
          label="Redo"
          icon={Redo2}
          onClick={() => {}}
          isActive={canRedo}
          isDisabled={!canRedo}
        />
      </div>
    </div>
  );
}

Toolbar.Skeleton = function ToolbarSkeleton() {
  return (
    <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4">
      <div className="bg-white rounded-md p-1.5 flex gap-y-1 flex-col items-center shadow-md w-[100px]">
        <Skeleton className="w-full h-8 bg-muted-400" />
        <Skeleton className="w-full h-8 bg-muted-400" />
        <Skeleton className="w-full h-8 bg-muted-400" />
      </div>
      <div className="bg-white rounded-md p-1.5 flex flex-col items-center shadow-md w-[100px]">
        <Skeleton className="w-full h-8 bg-muted-400" />
        <Skeleton className="w-full h-8 bg-muted-400" />
      </div>
    </div>
  );
};
