"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rect = void 0;
var Point_1 = require("./Point");
var Rect = /** @class */ (function () {
    function Rect(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    Rect.prototype.getTopLeft = function () {
        return new Point_1.Point(this.x, this.y);
    };
    Rect.prototype.isInside = function (rect) {
        return (this.x >= rect.x) && (this.y >= rect.y) && (this.x + this.width <= rect.x + rect.width) && (this.y + this.height <= rect.y + rect.height);
    };
    Rect.prototype.refresh = function (vel) {
        return new Rect(this.x + vel.v_x, this.y + vel.v_y, this.width, this.height);
    };
    return Rect;
}());
exports.Rect = Rect;
