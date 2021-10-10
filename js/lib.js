"use strict";
var Foo = /** @class */ (function () {
    function Foo(a) {
        this.a = a;
    }
    return Foo;
}());
var foo = new Foo("I'm in foo v3");
console.log(foo.a);
