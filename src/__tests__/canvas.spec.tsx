import { Canvas } from '@/components/canvas';
import useLayer from '@/hooks/use-layer.hook';
import { LAYER_TYPE, LayerProps } from '@/types';
import { fireEvent, render, renderHook, screen } from '@testing-library/react';

jest.mock('nanoid', () => jest.fn(() => 'mock-id'));

describe('pointer up', () => {
  it('inserts a layer on pointer up in INSERTING mode', async () => {
    const { result } = renderHook(() => useLayer());
    render(<Canvas />);

    const rectangleButton = screen.getByTestId('rectangle-tool-button');
    fireEvent.click(rectangleButton);

    // Simulate pointer up event
    const svg = screen.getByTestId('layers-container');

    fireEvent.pointerUp(svg, {
      pointerType: 'mouse',
      clientX: 100,
      clientY: 100,
    });

    const mockLayer: LayerProps = {
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

    console.log(result.current.layers);
  });
});
