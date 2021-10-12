import $ from "jquery";
import { Point } from "./Point";
import { Rect } from "./Rect";
import { Velocity } from "./Velocity";

console.log("I'm in jiashenb v7")

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