"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jquery_1 = __importDefault(require("jquery"));
console.log("I'm in jiashenb v6");
var Foo = /** @class */ (function () {
    function Foo(a) {
        this.a = a;
    }
    return Foo;
}());
var Point = /** @class */ (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    Point.prototype.refresh = function (vel) {
        return new Point(this.x + vel.v_x, this.y + vel.v_y);
    };
    return Point;
}());
var Velocity = /** @class */ (function () {
    function Velocity(v_x, v_y) {
        this.v_x = v_x;
        this.v_y = v_y;
    }
    return Velocity;
}());
var Rect = /** @class */ (function () {
    function Rect(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    Rect.prototype.getTopLeft = function () {
        return new Point(this.x, this.y);
    };
    Rect.prototype.isInside = function (rect) {
        return (this.x >= rect.x) && (this.y >= rect.y) && (this.x + this.width <= rect.x + rect.width) && (this.y + this.height <= rect.y + rect.height);
    };
    Rect.prototype.refresh = function (vel) {
        return new Rect(this.x + vel.v_x, this.y + vel.v_y, this.width, this.height);
    };
    return Rect;
}());
function getRectOfImage(img) {
    return new Rect(img.x, img.y, img.width, img.height);
}
function getRectOfCanvas(canvas) {
    return new Rect(0, 0, canvas.width, canvas.height);
}
var $c = (0, jquery_1.default)("canvas");
var canvas = $c[0];
var ctx = canvas.getContext("2d");
function clearCanvas(context) {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
}
var img = new Image();
img.src = "images/chicken.png";
var w = ctx.canvas.width / 5;
var initRect = new Rect(0, 0, w, w);
var init_vel = new Velocity(8, 0);
var currRect = initRect;
var curr_vel = init_vel;
var isAnimationEnabled = true;
function animate() {
    clearCanvas(ctx);
    ctx.drawImage(img, currRect.x, currRect.y, currRect.width, currRect.height);
    currRect = currRect.refresh(curr_vel);
    var isInCanvas = currRect.isInside(getRectOfCanvas(ctx.canvas));
    if (!isInCanvas) {
        curr_vel.v_x *= -1;
    }
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
    var canvasClickPoint = new Point($event.clientX - canvasRect.x, $event.clientY - canvasRect.y);
    isAnimationEnabled = false;
});
