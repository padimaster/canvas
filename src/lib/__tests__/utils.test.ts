import { CANVAS_MODE, Color } from '@/types';
import {
  colorToCSS,
  isSelectionMode,
  pointerEventToCanvasPoint,
} from '../utils';

describe('Utility Functions', () => {
  const sampleColor: Color = { r: 255, g: 0, b: 0 };

  describe('pointerEventToCanvasPoint', () => {
    it('should correctly convert pointer event to canvas point', () => {
      const pointerEventMock = {
        clientX: 50,
        clientY: 70,
      } as React.PointerEvent;

      const cameraMock = {
        x: 10,
        y: 20,
      };

      const result = pointerEventToCanvasPoint(pointerEventMock, cameraMock);

      expect(result).toEqual({
        x: 40, // 50 - 10
        y: 50, // 70 - 20
      });
    });
  });

  describe('colorToCSS', () => {
    it('should correctly convert color to CSS string', () => {
      const result = colorToCSS(sampleColor);

      expect(result).toBe('#ff0000');
    });
  });

  describe('isSelectionMode', () => {
    it('should correctly determine if the mode is a selection mode', () => {
      const selectionModes: CANVAS_MODE[] = [
        CANVAS_MODE.NONE,
        CANVAS_MODE.TRASLATING,
        CANVAS_MODE.RESIZING,
        CANVAS_MODE.SELECTION_NET,
        CANVAS_MODE.PRESSING,
      ];

      const nonSelectionModes: CANVAS_MODE[] = [
        CANVAS_MODE.INSERTING,
        CANVAS_MODE.DRAWING,
      ];

      selectionModes.forEach((mode) => {
        expect(isSelectionMode(mode)).toBeTruthy();
      });

      nonSelectionModes.forEach((mode) => {
        expect(isSelectionMode(mode)).toBeFalsy();
      });
    });
  });
});
