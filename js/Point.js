"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Point = void 0;
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
exports.Point = Point;
