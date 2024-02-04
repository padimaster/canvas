import { colorToCSS } from '@/lib/utils';
import { EllipseLayer } from '@/types';

type Props = {
  id: string;
  layer: EllipseLayer;
  onPointerDown: (
    _e: React.PointerEvent<SVGEllipseElement>,
    _layerId: string // Prefix the unused argument with an underscore (_)
  ) => void;
  selectionColor?: string;
};

export default function Ellipse({
  id,
  layer,
  onPointerDown,
  selectionColor,
}: Props) {
  const { x, y, width, height, fill } = layer;
  return (
    <ellipse
      className="drop-shadow-md"
      onPointerDown={(event: React.PointerEvent<SVGEllipseElement>) =>
        onPointerDown(event, id)
      }
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
      cx={width / 2}
      cy={height / 2}
      rx={width / 2}
      ry={height / 2}
      strokeWidth={1}
      fill={fill ? colorToCSS(fill) : '#000'}
      stroke={selectionColor || 'transparent'}
    >
      Rectangle
    </ellipse>
  );
}
