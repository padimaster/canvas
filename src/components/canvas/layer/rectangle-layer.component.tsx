import { colorToCSS } from '@/lib/utils';
import { RectangleLayer } from '@/types';

type Props = {
  id: string;
  layer: RectangleLayer;
  onPointerDown: (
    _e: React.PointerEvent<SVGRectElement>,
    _layerId: string // Prefix the unused argument with an underscore (_)
  ) => void;
  selectionColor?: string;
};

export default function Rectangle({
  id,
  layer,
  onPointerDown,
  selectionColor,
}: Props) {
  const { x, y, width, height, fill } = layer;
  return (
    <rect
      className="drop-shadow-md"
      onPointerDown={(event) => onPointerDown(event, id)}
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
      x={0}
      y={0}
      width={width}
      height={height}
      strokeWidth={2}
      fill={fill ? colorToCSS(fill) : '#000'}
      stroke={selectionColor || 'transparent'}
    >
      Rectangle
    </rect>
  );
}
