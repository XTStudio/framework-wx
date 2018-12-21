"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UIPoint_1 = require("./UIPoint");
const EventEmitter_1 = require("../kimi/EventEmitter");
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
        this.touches = [];
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
    handleTouch(touches) { this.touches = touches; }
    handleEvent(name) { }
}
exports.UIGestureRecognizer = UIGestureRecognizer;
