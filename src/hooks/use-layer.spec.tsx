import useLayer from '@/hooks/use-layer.hook';
import { LAYER_TYPE, LayerProps } from '@/types';
import { renderHook } from '@testing-library/react-hooks';
describe('useLayer hook', () => {
  const mockLayer1: LayerProps = {
    type: LAYER_TYPE.RECTANGLE,
    x: 10,
    y: 20,
    fill: {
      r: 0,
      g: 0,
      b: 0,
    },
    height: 50,
    width: 50,
  };

  const mockLayer2: LayerProps = {
    type: LAYER_TYPE.ELLIPSE,
    x: 50,
    y: 30,
    height: 30,
    width: 70,
    fill: {
      r: 1,
      g: 1,
      b: 1,
    },
  };

  it('should initially be empty', () => {
    const { result } = renderHook(() => useLayer());
    expect(result.current.layers).toEqual({});
  });

  it('should add a layer with addLayer', () => {
    const { result } = renderHook(() => useLayer());
    const layerId = 'test-layer1';
    result.current.addLayer(layerId, mockLayer1);
    expect(result.current.layers).toEqual({ [layerId]: mockLayer1 });
  });

  it('should get layer by ID with getLayerById', () => {
    const { result } = renderHook(() => useLayer());
    const layerId = 'test-layer2';
    result.current.addLayer(layerId, mockLayer2);
    expect(result.current.getLayerById(layerId)).toEqual(mockLayer2);
  });

  it('should return undefined for non-existent layer ID', () => {
    const { result } = renderHook(() => useLayer());
    const nonExistentId = 'non-existent';
    expect(result.current.getLayerById(nonExistentId)).toBeUndefined();
  });

  it('should get layer IDs with getLayersID', () => {
    const { result } = renderHook(() => useLayer());
    const layerId1 = 'layer1';
    const layerId2 = 'layer2';
    result.current.addLayer(layerId1, mockLayer1);
    result.current.addLayer(layerId2, mockLayer2);
    expect(result.current.getLayersID()).toEqual([layerId1, layerId2]);
  });
});
