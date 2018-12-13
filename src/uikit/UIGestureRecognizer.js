"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UIPoint_1 = require("./UIPoint");
const EventEmitter_1 = require("../kimi/EventEmitter");
const MagicObject_1 = require("./helpers/MagicObject");
var UIGestureRecognizerState;
(function (UIGestureRecognizerState) {
    UIGestureRecognizerState[UIGestureRecognizerState["possible"] = 0] = "possible";
    UIGestureRecognizerState[UIGestureRecognizerState["began"] = 1] = "began";
    UIGestureRecognizerState[UIGestureRecognizerState["changed"] = 2] = "changed";
    UIGestureRecognizerState[UIGestureRecognizerState["ended"] = 3] = "ended";
    UIGestureRecognizerState[UIGestureRecognizerState["cancelled"] = 4] = "cancelled";
    UIGestureRecognizerState[UIGestureRecognizerState["failed"] = 5] = "failed";
})(UIGestureRecognizerState = exports.UIGestureRecognizerState || (exports.UIGestureRecognizerState = {}));
class UIGestureRecognizer extends EventEmitter_1.EventEmitter {
    constructor() {
        super(...arguments);
        this.state = UIGestureRecognizerState.possible;
        this.enabled = true;
        this.view = undefined;
        this._touches = new MagicObject_1.MagicObject([]);
    }
    requireGestureRecognizerToFail(otherGestureRecognizer) {
    }
    locationInView(view) {
        const touch = this.touches[0];
        if (touch) {
            return touch.locationInView(view);
        }
        return UIPoint_1.UIPointZero;
    }
    numberOfTouches() {
        return this.touches.values.length;
    }
    locationOfTouch(touchIndex, view) {
        const touch = this.touches[touchIndex];
        if (touch) {
            return touch.locationInView(view);
        }
        return UIPoint_1.UIPointZero;
    }
    get touches() {
        return this._touches.get();
    }
    set touches(value) {
        this._touches.set(value);
    }
    handleTouch(touches) { this.touches = touches; }
    handleEvent(name) { }
}
exports.UIGestureRecognizer = UIGestureRecognizer;
