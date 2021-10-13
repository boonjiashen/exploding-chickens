"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jquery_1 = __importDefault(require("jquery"));
var Point_1 = require("./Point");
var Rect_1 = require("./Rect");
var Velocity_1 = require("./Velocity");
console.log("I'm in jiashenb v7");
function getRectOfImage(img) {
    return new Rect_1.Rect(img.x, img.y, img.width, img.height);
}
function getRectOfCanvas(canvas) {
    return new Rect_1.Rect(0, 0, canvas.width, canvas.height);
}
var $c = (0, jquery_1.default)("canvas");
var canvas = $c[0];
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");
function clearCanvas(context) {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
}
var img = new Image();
img.src = "images/chicken.png";
var w = ctx.canvas.width / 5;
var initRect = new Rect_1.Rect(ctx.canvas.width / 2, ctx.canvas.height / 2, w, w);
var init_vel = new Velocity_1.Velocity(8, 0);
var currRect = initRect;
var curr_vel = init_vel;
var isAnimationEnabled = true;
function chooseAtRandom(l) {
    var index = Math.floor(Math.random() * l.length);
    return l[index];
}
function generateVelocity() {
    var speed = 8;
    return chooseAtRandom([
        new Velocity_1.Velocity(0, speed),
        new Velocity_1.Velocity(speed, 0),
        new Velocity_1.Velocity(0, -speed),
        new Velocity_1.Velocity(-speed, 0),
    ]);
}
setInterval(function () {
    curr_vel = generateVelocity();
}, 300);
function animate() {
    clearCanvas(ctx);
    currRect = currRect.refresh(curr_vel);
    ctx.drawImage(img, currRect.x, currRect.y, currRect.width, currRect.height);
    // const isInCanvas = currRect.isInside(getRectOfCanvas(ctx.canvas))
    // if (!isInCanvas) {
    //   curr_vel.v_x *= -1
    // }
    if (isAnimationEnabled) {
        requestAnimationFrame(animate);
    }
    else {
        clearCanvas(ctx);
    }
}
img.onload = animate;
$c.on('click', function ($event) {
    var canvasRect = this.getBoundingClientRect();
    var canvasClickPoint = new Point_1.Point($event.clientX - canvasRect.x, $event.clientY - canvasRect.y);
    isAnimationEnabled = false;
});
