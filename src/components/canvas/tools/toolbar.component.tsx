import { Skeleton } from '@/components/ui/skeleton';
import { CANVAS_MODE, CanvasState } from '@/types';
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
          onClick={() => {
            setCanvasState({ mode: CANVAS_MODE.SELECT });
          }}
          isActive={false}
        />
        <ToolButton
          label="Text"
          icon={Type}
          onClick={() => {}}
          isActive={false}
        />
        <ToolButton
          label="Sticky Note"
          icon={StickyNote}
          onClick={() => {}}
          isActive={false}
        />
        <ToolButton
          label="Rectangle"
          icon={Square}
          onClick={() => {}}
          isActive={false}
        />
        <ToolButton
          label="Ellipse"
          icon={Circle}
          onClick={() => {}}
          isActive={false}
        />
        <ToolButton
          label="Pencil"
          icon={Pencil}
          onClick={() => {}}
          isActive={false}
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
