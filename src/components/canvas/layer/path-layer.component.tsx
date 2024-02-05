import { colorToCSS, getSvgPathFromStroke } from '@/lib/utils';
import { PathLayerProps } from '@/types';
import getStroke from 'perfect-freehand';

type Props = {
  layer: PathLayerProps;
  points: number[][];
  selectionColor?: string;
  onPointerDown: (e: React.PointerEvent) => void;
};

export default function PathLayer({
  layer,
  points,
  selectionColor,
  onPointerDown,
}: Props) {
  const { x, y, fill } = layer;
  return (
    <path
      className="drop-shadow-md "
      onPointerDown={onPointerDown}
      d={getSvgPathFromStroke(
        getStroke(points, {
          size: 16,
          thinning: 0.5,
          smoothing: 0.5,
          streamline: 0.5,
        })
      )}
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
      x={0}
      y={0}
      fill={fill ? colorToCSS(fill) : '#000'}
      stroke={selectionColor || '#000'}
      strokeWidth={1}
      data-testid={'pathLayerId'}
    />
  );
}
