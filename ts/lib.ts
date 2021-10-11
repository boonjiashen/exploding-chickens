import $ from "jquery";

console.log("I'm in jiashenb v6")

class Foo {
  a: string;

  constructor(a: string) {
    this.a = a;
  }
}

class Point {
  y;
  x;

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  refresh(vel: Velocity) {
    return new Point(this.x + vel.v_x, this.y + vel.v_y)
  }
}

class Velocity {
  v_x;
  v_y;

  constructor(v_x: number, v_y: number) {
    this.v_x = v_x
    this.v_y = v_y
  }
}

class Rect {
  x;
  y;
  width;
  height;

  constructor(x: number, y: number, width: number, height: number) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
  }

  getTopLeft() {
    return new Point(this.x, this.y)
  }

  isInside(rect: Rect) {
    return (this.x >= rect.x) && (this.y >= rect.y) && (this.x + this.width <= rect.x + rect.width) && (this.y + this.height <= rect.y + rect.height)
  }

  refresh(vel: Velocity) {
    return new Rect(this.x + vel.v_x, this.y + vel.v_y, this.width, this.height)
  }
}

function getRectOfImage(img: any) {
  return new Rect(img.x, img.y, img.width, img.height)
}

function getRectOfCanvas(canvas: any) {
  return new Rect(0, 0, canvas.width, canvas.height)
}

const $c = $("canvas")
const canvas = $c[0] as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

function clearCanvas(context: any) {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height)
}

const img = new Image()
img.src = "images/chicken.png"
const w = ctx.canvas.width / 5
const initRect = new Rect(0, 0, w, w)
const init_vel = new Velocity(8, 0)
var currRect = initRect
var curr_vel = init_vel
var isAnimationEnabled = true;

function animate() {
  clearCanvas(ctx)
  ctx.drawImage(img, currRect.x, currRect.y, currRect.width, currRect.height)
  currRect = currRect.refresh(curr_vel)
  const isInCanvas = currRect.isInside(getRectOfCanvas(ctx.canvas))
  if (!isInCanvas) {
    curr_vel.v_x *= -1
  }
  if (isAnimationEnabled) {
    requestAnimationFrame(animate)
  }
  else {
    clearCanvas(ctx)
  }
}

img.onload = animate

$c.on('click', function($event: any) {
  const canvasRect = this.getBoundingClientRect()
  const canvasClickPoint = new Point(
    $event.clientX - canvasRect.x,
    $event.clientY - canvasRect.y,
  )
  isAnimationEnabled = false
})