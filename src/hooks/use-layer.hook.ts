import { LayerProps } from '@/types';
import { useState } from 'react';

const useLayer = () => {
  const [layers, setLayers] = useState<Record<string, LayerProps>>({});

  const getLayersID = () => {
    const layersId = Object.keys(layers);
    return layersId;
  };

  const getLayerById = (id: string) => {
    const layer = layers[id];
    return layer;
  };

  const addLayer = (layerId: string, layer: LayerProps) => {
    setLayers((prevLayers) => {
      const updatedLayers = {
        ...prevLayers,
        [layerId]: layer,
      };
      return updatedLayers;
    });
  };

  return {
    layers,
    getLayersID,
    getLayerById,
    addLayer,
  };
};

export default useLayer;
