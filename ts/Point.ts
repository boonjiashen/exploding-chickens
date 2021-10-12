import { Velocity } from "./Velocity";

export class Point {
  y;
  x;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  refresh(vel: Velocity): Point {
    return new Point(this.x + vel.v_x, this.y + vel.v_y);
  }
}
