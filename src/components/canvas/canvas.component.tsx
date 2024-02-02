'use client';

import { CANVAS_MODE, CanvasState } from '@/types';

import { useState } from 'react';
import Info from './info.component';
import Participants from './participants.component';
import Toolbar from './tools/toolbar.component';

type Props = {
  boardId: string;
};

export default function Canvas({ boardId }: Props) {
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CANVAS_MODE.SELECT,
  });

  const history = [];

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
    </div>
  );
}
