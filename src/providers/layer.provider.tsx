import { Color, LayerProps } from '@/types';
import React, { Dispatch, SetStateAction, createContext } from 'react';

type LayersContextValue = {
  layers: Record<string, LayerProps>;
  selection: string[];
  setLayers: Dispatch<SetStateAction<Record<string, LayerProps>>>;
  setSelection: Dispatch<SetStateAction<string[]>>;
  pencilDraft: Array<number[]>;
  penColor: Color;
};

type LayersProviderProps = {
  children: React.ReactNode;
  value: LayersContextValue;
};

export const LayersContext = createContext<LayersContextValue>({
  layers: {},
  selection: [],
  setLayers: () => {},
  setSelection: () => {},
  pencilDraft: [],
  penColor: { r: 0, g: 0, b: 0 },
});

export const LayersProvider: React.FC<LayersProviderProps> = ({
  children,
  value,
}) => {
  return (
    <LayersContext.Provider value={value}>{children}</LayersContext.Provider>
  );
};
