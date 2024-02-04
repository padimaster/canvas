'use client';

import { getSelectionBounds } from '@/hooks/use-selection-bounds.hook';
import { LayersContext } from '@/providers/layer.provider';
import { SIDE, XYWH } from '@/types';
import { memo, useContext } from 'react';

type Props = {
  onResizeHandlerPointerDown: (corner: SIDE, initialBounds: XYWH) => void;
};

const HANDLE_WIDTH = 8;

function SelectionBox({ onResizeHandlerPointerDown }: Props) {
  const isShowingHandles = true;
  const { selection, layers } = useContext(LayersContext);

  const bounds = getSelectionBounds(selection, layers);
  if (!bounds) return null;
  return (
    <>
      <rect
        className="fill-transparent stroke-blue-500 stroke-1 pointer-events-none"
        style={{
          transform: `translate(${bounds.x}px, ${bounds.y}px)`,
        }}
        width={bounds.width}
        height={bounds.height}
      />
      {isShowingHandles && (
        <>
          <rect
            className="fill-white stroke-1 stroke-blue-500"
            x={0}
            y={0}
            style={{
              cursor: 'nwse-resize',
              width: `${HANDLE_WIDTH}px`,
              height: `${HANDLE_WIDTH}px`,
              transform: `
                translate(
                  ${bounds.x - HANDLE_WIDTH / 2}px,
                  ${bounds.y - HANDLE_WIDTH / 2}px
                )
              `,
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizeHandlerPointerDown(SIDE.TOP + SIDE.LEFT, bounds);
            }}
          />
          <rect
            className="fill-white stroke-1 stroke-blue-500"
            x={0}
            y={0}
            style={{
              cursor: 'ns-resize',
              width: `${HANDLE_WIDTH}px`,
              height: `${HANDLE_WIDTH}px`,
              transform: `
                translate(
                  ${bounds.x + bounds.width / 2 - HANDLE_WIDTH / 2}px, 
                  ${bounds.y - HANDLE_WIDTH / 2}px
                )
              `,
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizeHandlerPointerDown(SIDE.TOP, bounds);
            }}
          />
          <rect
            className="fill-white stroke-1 stroke-blue-500"
            x={0}
            y={0}
            style={{
              cursor: 'nesw-resize',
              width: `${HANDLE_WIDTH}px`,
              height: `${HANDLE_WIDTH}px`,
              transform: `
                translate(
                  ${bounds.x - HANDLE_WIDTH / 2 + bounds.width}px,
                  ${bounds.y - HANDLE_WIDTH / 2}px
                )`,
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizeHandlerPointerDown(SIDE.TOP + SIDE.RIGHT, bounds);
            }}
          />
          <rect
            className="fill-white stroke-1 stroke-blue-500"
            x={0}
            y={0}
            style={{
              cursor: 'ew-resize',
              width: `${HANDLE_WIDTH}px`,
              height: `${HANDLE_WIDTH}px`,
              transform: `
                translate(
                  ${bounds.x - HANDLE_WIDTH / 2 + bounds.width}px, 
                  ${bounds.y + bounds.height / 2 - HANDLE_WIDTH / 2}px
                )`,
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizeHandlerPointerDown(SIDE.RIGHT, bounds);
            }}
          />
          <rect
            className="fill-white stroke-1 stroke-blue-500"
            x={0}
            y={0}
            style={{
              cursor: 'nwse-resize',
              width: `${HANDLE_WIDTH}px`,
              height: `${HANDLE_WIDTH}px`,
              transform: `
                translate(
                  ${bounds.x - HANDLE_WIDTH / 2 + bounds.width}px, 
                  ${bounds.y - HANDLE_WIDTH / 2 + bounds.height}px
                )`,
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizeHandlerPointerDown(SIDE.BOTTOM + SIDE.RIGHT, bounds);
            }}
          />
          <rect
            className="fill-white stroke-1 stroke-blue-500"
            x={0}
            y={0}
            style={{
              cursor: 'ns-resize',
              width: `${HANDLE_WIDTH}px`,
              height: `${HANDLE_WIDTH}px`,
              transform: `
                translate(
                  ${bounds.x + bounds.width / 2 - HANDLE_WIDTH / 2}px,
                  ${bounds.y - HANDLE_WIDTH / 2 + bounds.height}px
                )`,
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizeHandlerPointerDown(SIDE.BOTTOM, bounds);
            }}
          />
          <rect
            className="fill-white stroke-1 stroke-blue-500"
            x={0}
            y={0}
            style={{
              cursor: 'nesw-resize',
              width: `${HANDLE_WIDTH}px`,
              height: `${HANDLE_WIDTH}px`,
              transform: `
                translate(
                  ${bounds.x - HANDLE_WIDTH / 2}px,
                  ${bounds.y - HANDLE_WIDTH / 2 + bounds.height}px
                )`,
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizeHandlerPointerDown(SIDE.BOTTOM + SIDE.LEFT, bounds);
            }}
          />
          <rect
            className="fill-white stroke-1 stroke-blue-500"
            x={0}
            y={0}
            style={{
              cursor: 'ew-resize',
              width: `${HANDLE_WIDTH}px`,
              height: `${HANDLE_WIDTH}px`,
              transform: `
                translate(
                  ${bounds.x - HANDLE_WIDTH / 2}px,
                  ${bounds.y - HANDLE_WIDTH / 2 + bounds.height / 2}px
                )`,
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizeHandlerPointerDown(SIDE.LEFT, bounds);
            }}
          />
        </>
      )}
    </>
  );
}

export default memo(SelectionBox);

SelectionBox.displayName = 'SelectionBox';
