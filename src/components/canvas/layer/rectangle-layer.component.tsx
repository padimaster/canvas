import { RectangleLayer } from '@/types';

type Props = {
  id: string;
  layer: RectangleLayer;
  onPointerDown: (
    e: React.PointerEvent<SVGRectElement>,
    layerId: string
  ) => void;
  selectionColor?: string;
};

export default function Rectangle({
  id,
  layer,
  onPointerDown,
  selectionColor,
}: Props) {
  console.log(layer);
  console.log('RectangleLayer component rendered!');
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
      strokeWidth={1}
      fill={'#000'}
      stroke="transparent"
    >
      Rectangle
    </rect>
  );
}
