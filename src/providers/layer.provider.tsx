import { LayerProps } from '@/types';
import React, { Dispatch, SetStateAction, createContext } from 'react';

type LayersContextValue = {
  layers: Record<string, LayerProps>;
  selection: string[];
  setLayers: Dispatch<SetStateAction<Record<string, LayerProps>>>;
  setSelection: Dispatch<SetStateAction<string[]>>;
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
});

export const LayersProvider: React.FC<LayersProviderProps> = ({
  children,
  value,
}) => {
  return (
    <LayersContext.Provider value={value}>{children}</LayersContext.Provider>
  );
};
