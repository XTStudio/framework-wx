"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        // locationInView(view: UIView | undefined): UIPoint {
        //     const touch = this.touches[0]
        //     if (touch) {
        //         return touch.locationInView(view)
        //     }
        //     return UIPointZero
        // }
        // numberOfTouches(): number {
        //     return this.touches.values.length
        // }
        // locationOfTouch(touchIndex: number, view: UIView | undefined): UIPoint {
        //     const touch = this.touches[touchIndex]
        //     if (touch) {
        //         return touch.locationInView(view)
        //     }
        //     return UIPointZero
        // }
        // private touches: UITouch[] = []
        // handleTouch(touches: UITouch[]) { this.touches = touches }
        // handleEvent(name: String) { }
    }
    requireGestureRecognizerToFail(otherGestureRecognizer) {
    }
}
exports.UIGestureRecognizer = UIGestureRecognizer;
