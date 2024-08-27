import { Boundary } from "../types/boundaries";

export const isInBoundary = (boundaries: Boundary[], x: number, y: number) => {
  return boundaries.some(({ x1, x2, y1, y2 }) => {
    return x1 <= x && x <= x2 && y1 <= y && y <= y2;
  });
};
