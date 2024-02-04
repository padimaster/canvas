import { LayerProps } from '@/types';
import { useState } from 'react';

const useLayer = () => {
  const [layers, setLayers] = useState<Record<string, LayerProps>>({});

  const getLayersID = () => {
    const layersId = Object.keys(layers);
    console.log(layersId);
    return layersId;
  };

  const getLayerById = (id: string) => {
    const layer = layers[id];
    return layer;
  };

  const addLayer = (layerId: string, layer: LayerProps) => {
    console.log(layers);
    setLayers((prevLayers) => ({
      ...prevLayers,
      [layerId]: layer,
    }));
  };

  return {
    layers,
    getLayersID,
    getLayerById,
    addLayer,
  };
};

export default useLayer;
