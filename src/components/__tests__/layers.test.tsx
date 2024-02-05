import { LayerPreview } from '@/components/canvas/layer'; // Replace with the actual path to your component
import { LayersContext } from '@/providers/layer.provider';
import {
  EllipseLayer,
  LAYER_TYPE,
  PathLayerProps,
  RectangleLayer,
} from '@/types';
import { fireEvent, render, screen } from '@testing-library/react';

const mockLayers = {
  pathLayerId: {
    type: LAYER_TYPE.PATH,
    points: [
      [0, 0],
      [1, 1],
      [2, 2],
    ],
  } as PathLayerProps,
  rectangleLayerId: {
    type: LAYER_TYPE.RECTANGLE,
    x: 10,
    y: 20,
    width: 30,
    height: 40,
    fill: { r: 255, g: 0, b: 0 },
  } as RectangleLayer,
  ellipseLayerId: {
    type: LAYER_TYPE.ELLIPSE,
    x: 50,
    y: 60,
    width: 70,
    height: 80,
    fill: { r: 0, g: 255, b: 0 },
  } as EllipseLayer,
};

const onLayerPointerDownMock = jest.fn();

const renderLayerPreview = () => {
  return render(
    <LayersContext.Provider
      value={{
        layers: mockLayers,
        selection: [],
        setLayers: jest.fn(),
        setSelection: jest.fn(),
        pencilDraft: [],
        penColor: { r: 0, g: 0, b: 0 },
      }}
    >
      {Object.keys(mockLayers).map((layerId) => (
        <LayerPreview
          key={layerId}
          id={layerId}
          onLayerPointerDown={onLayerPointerDownMock}
        />
      ))}
    </LayersContext.Provider>
  );
};

describe('LayerPreview', () => {
  it('renders a Path layer correctly', () => {
    renderLayerPreview();
    const pathElement = screen.getByTestId('pathLayerId');
    expect(pathElement).toBeInTheDocument();
    expect(pathElement).toHaveAttribute('d');
  });

  it('renders a Rectangle layer correctly', () => {
    renderLayerPreview();
    const rectangleElement = screen.getByTestId('rectangleLayerId');
    expect(rectangleElement).toBeInTheDocument();
    expect(rectangleElement).toHaveStyle({
      transform: 'translate(10px, 20px)',
    });
  });

  it('renders an Ellipse layer correctly', () => {
    renderLayerPreview();
    const ellipseElement = screen.getByTestId('ellipseLayerId');
    expect(ellipseElement).toBeInTheDocument();

    expect(ellipseElement).toHaveAttribute('cx');
  });

  it('handles onLayerPointerDown callback', () => {
    renderLayerPreview();
    const layerElement = screen.getByTestId('rectangleLayerId');
    fireEvent.pointerDown(layerElement);
    expect(onLayerPointerDownMock).toHaveBeenCalledWith(
      expect.anything(),
      'rectangleLayerId'
    );
  });
});
