import type { Vec2 } from "gl-matrix/vec2";

import type { HexCoord } from "./hexMath";
import { coordToPx as _coordToPx } from "./hexUtils";

function coordToPx(point: HexCoord): Vec2 {
  return _coordToPx({ coord: point, size: 1, offset: [0, 0] });
}

export const LayoutHelper = {
  getRightmostPoint(points: Iterable<HexCoord>): HexCoord | undefined {
    let rightmost: HexCoord | undefined;

    for (const point of points) {
      if (
        rightmost === undefined
        || coordToPx(point).x > coordToPx(rightmost).x
      ) {
        rightmost = point;
      }
    }

    return rightmost;
  },

  getLeftmostPoint(points: Iterable<HexCoord>): HexCoord | undefined {
    let leftmost: HexCoord | undefined;

    for (const point of points) {
      if (
        leftmost === undefined
        || coordToPx(point).x < coordToPx(leftmost).x
      ) {
        leftmost = point;
      }
    }

    return leftmost;
  },

  getTopmostPoint(points: Iterable<HexCoord>): HexCoord | undefined {
    let rightmost: HexCoord | undefined;

    for (const point of points) {
      if (rightmost === undefined || point.r < rightmost.r) {
        rightmost = point;
      }
    }

    return rightmost;
  },

  getBottommostPoint(points: Iterable<HexCoord>): HexCoord | undefined {
    let bottommost: HexCoord | undefined;

    for (const point of points) {
      if (bottommost === undefined || point.r > bottommost.r) {
        bottommost = point;
      }
    }

    return bottommost;
  },

  *shiftPoints(
    points: Iterable<HexCoord>,
    shiftedBy: HexCoord,
  ): Generator<HexCoord> {
    for (const point of points) {
      yield {
        q: point.q + shiftedBy.q,
        r: point.r + shiftedBy.r,
      };
    }
  },
};
