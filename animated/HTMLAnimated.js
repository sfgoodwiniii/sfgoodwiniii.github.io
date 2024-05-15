"use strict";
// Create a new objected called MoveableHTMLElement that extends the HTMLElement class
// The constructor takes in an HTML element as a parameter
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoveableHTMLElement = exports.Origin = exports.calc = void 0;
function calc(value) { return "calc(".concat(value, ")"); }
exports.calc = calc;
function sCalc(value) { return value.substring(5, value.length - 1); } // Strip calc function
var Origin;
(function (Origin) {
    Origin[Origin["Absolute"] = 0] = "Absolute";
    Origin[Origin["Relative"] = 1] = "Relative";
    Origin[Origin["Self"] = 2] = "Self";
    Origin[Origin["Centered"] = 3] = "Centered";
    Origin[Origin["Default"] = 4] = "Default";
})(Origin || (exports.Origin = Origin = {}));
// The MoveableHTMLElement class extends the HTMLElement class
var MoveableHTMLElement = /** @class */ (function (_super) {
    __extends(MoveableHTMLElement, _super);
    // The constructor takes in an HTML element as a parameter
    function MoveableHTMLElement(element) {
        var _this = _super.call(this) || this;
        _this.style.left = element.getAttribute("x0");
        _this.style.top = element.getAttribute("y0");
        _this.style.width = element.getAttribute("width");
        _this.style.height = element.getAttribute("height");
        return _this;
    }
    Object.defineProperty(MoveableHTMLElement.prototype, "x0", {
        // Getters and setters for the default position
        get: function () { return this.getAttribute("x0"); },
        set: function (value) { this.setAttribute("x0", value); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MoveableHTMLElement.prototype, "y0", {
        get: function () { return this.getAttribute("y0"); },
        set: function (value) { this.setAttribute("y0", value); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MoveableHTMLElement.prototype, "x", {
        // Getters and setters for the current position
        get: function () { return sCalc(this.style.left); },
        set: function (value) { this.style.left = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MoveableHTMLElement.prototype, "y", {
        get: function () { return sCalc(this.style.top); },
        set: function (value) { this.style.top = value; },
        enumerable: false,
        configurable: true
    });
    // Save the current position as the default position
    MoveableHTMLElement.prototype.savePosition = function () { this.x0 = this.x; this.y0 = this.y; };
    // Select the origin for movement based on the origin parameter
    MoveableHTMLElement.prototype.selectOrigin = function (origin, object) {
        if (object === void 0) { object = null; }
        switch (origin) {
            case Origin.Absolute:
                return { x: "0px", y: "0px" };
            case Origin.Self:
                return { x: this.x, y: this.y };
            case Origin.Centered:
                return { x: "50% - ".concat(this.style.width, "/2"), y: "50% - ".concat(this.style.height, "/2") };
            case Origin.Default:
                return { x: this.x0, y: this.y0 };
            case Origin.Relative:
                if (object == null)
                    throw new Error("Relative origin requires a second object");
                return { x: object.x, y: object.y };
        }
    };
    // Move the card to a new position
    MoveableHTMLElement.prototype.move = function (dx, dy, transition, origin, object) {
        if (object === void 0) { object = null; }
        // Select the origin for movement
        var _origin = this.selectOrigin(origin, object);
        // Move the object
        this.x = calc("".concat(_origin.x, " + ").concat(dx));
        this.y = calc("".concat(_origin.y, " + (").concat(dy, ") * (-1)"));
        this.style.transition = transition;
    };
    return MoveableHTMLElement;
}(HTMLElement));
exports.MoveableHTMLElement = MoveableHTMLElement;
