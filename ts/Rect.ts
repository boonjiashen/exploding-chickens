import { Point } from "./Point";
import { Velocity } from "./Velocity";

export class Rect {
  x;
  y;
  width;
  height;

  constructor(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  getTopLeft(): Point {
    return new Point(this.x, this.y);
  }

  isInside(rect: Rect): boolean {
    return (this.x >= rect.x) && (this.y >= rect.y) && (this.x + this.width <= rect.x + rect.width) && (this.y + this.height <= rect.y + rect.height);
  }

  refresh(vel: Velocity): Rect {
    return new Rect(this.x + vel.v_x, this.y + vel.v_y, this.width, this.height);
  }
}
