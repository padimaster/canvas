export type Color = {
  r: number;
  g: number;
  b: number;
};

export type Camera = {
  x: number;
  y: number;
};

export enum LAYER_TYPE {
  TEXT,
  ELLIPSE,
  STICKY_NOTE,
  RECTANGLE,
  PATH,
}

export type RectangleLayer = {
  type: LAYER_TYPE.RECTANGLE;
  x: number;
  y: number;
  width: number;
  height: number;
  fill: Color;
  value?: string;
};

export type EllipseLayer = {
  type: LAYER_TYPE.ELLIPSE;
  x: number;
  y: number;
  width: number;
  height: number;
  fill: Color;
  value?: string;
};

export type PathLayer = {
  type: LAYER_TYPE.PATH;
  x: number;
  y: number;
  width: number;
  height: number;
  fill: Color;
  points: number[][];
  value?: string;
};

export type TextLayer = {
  type: LAYER_TYPE.TEXT;
  x: number;
  y: number;
  width: number;
  height: number;
  fill: Color;
  value?: string;
};

export type StickyNoteLayer = {
  type: LAYER_TYPE.TEXT;
  x: number;
  y: number;
  width: number;
  height: number;
  fill: Color;
  value?: string;
};

export type Point = {
  x: number;
  y: number;
};

export type XYWH = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export enum SIDE {
  TOP = 1,
  BOTTOM = 2,
  LEFT4,
  RIGHT = 8,
}

export type CanvasState =
  | {
      mode: CANVAS_MODE.NONE;
    }
  | {
      mode: CANVAS_MODE.INSERTING;
      layerType:
        | LAYER_TYPE.ELLIPSE
        | LAYER_TYPE.RECTANGLE
        | LAYER_TYPE.TEXT
        | LAYER_TYPE.STICKY_NOTE;
    }
  | {
      mode: CANVAS_MODE.PRESSING;
      origin: Point;
    }
  | {
      mode: CANVAS_MODE.SELECTION_NET;
      origin: Point;
      current?: Point;
    }
  | {
      mode: CANVAS_MODE.TRASLATING;
      current: Point;
    }
  | {
      mode: CANVAS_MODE.RESIZING;
      initialBounds: XYWH;
      corner: SIDE;
    }
  | {
      mode: CANVAS_MODE.DRAWING;
    };

export enum CANVAS_MODE {
  NONE,
  INSERTING,
  PRESSING,
  SELECTION_NET,
  TRASLATING,
  RESIZING,
  DRAWING,
}

export type Layer =
  | TextLayer
  | StickyNoteLayer
  | RectangleLayer
  | EllipseLayer
  | PathLayer;

export type LayerProps = {
  type: LAYER_TYPE;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: Color;
};
