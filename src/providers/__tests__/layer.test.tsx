import { LayersContext, LayersProvider } from '@/providers/layer.provider';
import { LAYER_TYPE, Layer } from '@/types';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';

// Mock child component using the context
const MockChildComponent: React.FC = () => {
  const layersContext = React.useContext(LayersContext);
  return (
    <>
      <div data-testid="layers">{JSON.stringify(layersContext.layers)}</div>
      <div data-testid="selection">
        {JSON.stringify(layersContext.selection)}
      </div>
      <div data-testid="pencilDraft">
        {JSON.stringify(layersContext.pencilDraft)}
      </div>
      <div data-testid="penColor">{JSON.stringify(layersContext.penColor)}</div>
    </>
  );
};

describe('LayersContext', () => {
  const initialContext = {
    layers: {},
    selection: [],
    setLayers: jest.fn(),
    setSelection: jest.fn(),
    pencilDraft: [],
    penColor: { r: 0, g: 0, b: 0 },
  };
  test('renders the context provider with default values', () => {
    render(
      <LayersProvider value={initialContext}>
        <MockChildComponent />
      </LayersProvider>
    );

    // Verify that the default values are rendered
    expect(screen.getByTestId('layers')).toHaveTextContent('{}');
    expect(screen.getByTestId('selection')).toHaveTextContent('[]');
    expect(screen.getByTestId('pencilDraft')).toHaveTextContent('[]');
    expect(screen.getByTestId('penColor')).toHaveTextContent(
      '{"r":0,"g":0,"b":0}'
    );
  });

  test('updates context values when provider values change', () => {
    const layer: Layer = {
      type: LAYER_TYPE.RECTANGLE,
      x: 10,
      y: 20,
      width: 30,
      height: 40,
      fill: { r: 255, g: 0, b: 0 },
    };

    render(
      <LayersProvider
        value={{
          layers: { '1': layer },
          selection: ['1'],
          setLayers: jest.fn(),
          setSelection: jest.fn(),
          pencilDraft: [
            [1, 2],
            [3, 4],
          ],
          penColor: { r: 255, g: 0, b: 0 },
        }}
      >
        <MockChildComponent />
      </LayersProvider>
    );

    // Verify that the updated values are rendered
    // Rectangle layer type equals to 3
    expect(screen.getByTestId('layers')).toHaveTextContent(
      '{"1":{"type":3,"x":10,"y":20,"width":30,"height":40,"fill":{"r":255,"g":0,"b":0}}}'
    );
    expect(screen.getByTestId('selection')).toHaveTextContent('["1"]');
    expect(screen.getByTestId('pencilDraft')).toHaveTextContent(
      '[[1,2],[3,4]]'
    );
    expect(screen.getByTestId('penColor')).toHaveTextContent(
      '{"r":255,"g":0,"b":0}'
    );
  });
});
