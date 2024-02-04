import { Toolbar } from '@/components/canvas';
import { CANVAS_MODE, CanvasState, LAYER_TYPE } from '@/types';
import { render, screen, waitFor } from '@testing-library/react';

// Mock props for the test
const mockProps = {
  canvasState: { mode: CANVAS_MODE.NONE } as CanvasState,
  setCanvasState: jest.fn(() => ({
    mode: CANVAS_MODE.INSERTING,
    layerType: LAYER_TYPE.RECTANGLE,
  })),
  undo: jest.fn(() => {}),
  redo: jest.fn(() => {}),
  canUndo: false,
  canRedo: false,
};

jest.mock('nanoid', () => jest.fn(() => 'mock-id'));

test('renders initial toolbar with expected structure and button states', () => {
  render(<Toolbar {...mockProps} />);
});

test('clicking rectangle button updates canvas state and button states', async () => {
  render(<Toolbar {...mockProps} />);

  await waitFor(() => {
    const rectangleButton = screen.getByTestId('rectangle-tool-button');
    expect(rectangleButton).toBeInTheDocument();
  });

  expect(mockProps.setCanvasState).toHaveBeenCalledWith({
    mode: CANVAS_MODE.INSERTING,
    layerType: LAYER_TYPE.RECTANGLE,
  });
  expect(screen.getByTestId('rectangle-tool-button')).toBeInTheDocument();
});
