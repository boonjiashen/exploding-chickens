import { assert } from "console";
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

/**
 * Gets the coordinates of the i-th frame in a sprint sheet
 * @param sheetDim Dimensions of the sprite sheet, ignores x/y values
 * @param frameDim Dimensions of the frame within the sprite sheet, ignores x/y values
 * @param idx index of the frame to be retrieved
 */
function getSpriteFrame(sheetDim: Rect, frameDim: Rect, idx: number) {
  assert(sheetDim.width % frameDim.width == 0)
  assert(sheetDim.height % frameDim.height == 0)

  const num_frame_x = sheetDim.width / frameDim.width
  const num_frame_y = sheetDim.height / frameDim.height

  assert(idx < num_frame_x * num_frame_y)

  return new Rect(
    (idx % num_frame_x) * frameDim.width,
    Math.floor(idx / num_frame_x) * frameDim.height,
    frameDim.width,
    frameDim.height
  )
}

const $c = $("canvas")
const canvas = $c[0] as HTMLCanvasElement;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d")!;

function clearCanvas(context: any) {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height)
}

const chicken = new Image()
chicken.src = "images/chicken.png"
const w = ctx.canvas.width / 5
const initRect = new Rect(ctx.canvas.width / 2, ctx.canvas.height / 2, w, w)
const init_vel = new Velocity(8, 0)
var currRect = initRect
var curr_vel = init_vel
var isAnimationEnabled = true;

function chooseAtRandom<T>(l: Array<T>): T {
  const index = Math.floor(Math.random() * l.length)
  return l[index]
}

function generateVelocity(): Velocity {
  const speed = 8
  return chooseAtRandom([
    new Velocity(0, speed),
    new Velocity(speed, 0),
    new Velocity(0, -speed),
    new Velocity(-speed, 0),
  ])
}

setInterval(() => {
  curr_vel = generateVelocity()
}, 300);

function animate() {
  clearCanvas(ctx)
  currRect = currRect.refresh(curr_vel)
  ctx.drawImage(chicken, currRect.x, currRect.y, currRect.width, currRect.height)
  // const isInCanvas = currRect.isInside(getRectOfCanvas(ctx.canvas))
  // if (!isInCanvas) {
  //   curr_vel.v_x *= -1
  // }
  if (isAnimationEnabled) {
    requestAnimationFrame(animate)
  }
  else {
    clearCanvas(ctx)
  }
}

chicken.onload = animate

$c.on('click', function($event: any) {
  const canvasRect = this.getBoundingClientRect()
  const canvasClickPoint = new Point(
    $event.clientX - canvasRect.x,
    $event.clientY - canvasRect.y,
  )
  isAnimationEnabled = false
})