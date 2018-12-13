"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UIGestureRecognizer_1 = require("./UIGestureRecognizer");
class UIPinchGestureRecognizer extends UIGestureRecognizer_1.UIGestureRecognizer {
    constructor() {
        super(...arguments);
        this.scale = 1.0;
        this.velocity = 0.0;
    }
    handleTouch(touches) {
        super.handleTouch(touches);
    }
}
exports.UIPinchGestureRecognizer = UIPinchGestureRecognizer;
