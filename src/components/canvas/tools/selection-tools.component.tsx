'use client';

import { memo, useContext } from 'react';

import { Button } from '@/components/ui/button';
import { getSelectionBounds } from '@/lib/selection.lib';
import { LayersContext } from '@/providers/layer.provider';
import { Camera, Color } from '@/types';
import { Trash2 } from 'lucide-react';
import { Hint } from '../hint.component';
import ColorPicker from './color-picker.component';

type Props = {
  camera: Camera;
  setLastUsedColor: (color: Color) => void;
};

function SelectionTools({ camera, setLastUsedColor }: Props) {
  const { selection, layers, setLayers } = useContext(LayersContext);

  const selectionBounds = getSelectionBounds(selection, layers);

  const setFill = (color: Color) => {
    setLastUsedColor(color);

    for (const layerId of selection) {
      const layer = layers[layerId];
      if (!layer) {
        continue;
      }

      layer.fill = color;
    }
  };

  if (!selectionBounds) {
    return null;
  }

  const x = selectionBounds.width / 2 + selectionBounds.x + camera.x;
  const y = selectionBounds.y + camera.y;

  const deleteLayers = () => {
    for (const layerId of selection) {
      setLayers((prev) => {
        const next = { ...prev };
        delete next[layerId];
        return next;
      });
    }
  };

  return (
    <div
      className="absolute p-3 rounded-xl shadow-sm border flex select-none bg-gray-200"
      style={{
        transform: `translate(
            calc(${x}px - 50%),
            calc(${y - 16}px - 100%)
        )`,
      }}
    >
      <ColorPicker onChange={setFill} />
      <div className="flex items-center border-l border-neutral-200">
        <Hint label="Delete">
          <Button
            size={'icon'}
            onClick={deleteLayers}
            className="text-black hover:text-destructive bg-transparent hover:bg-transparent"
          >
            <Trash2 />
          </Button>
        </Hint>
      </div>
    </div>
  );
}

SelectionTools.displayName = 'SelectionTools';

export default memo(SelectionTools);
