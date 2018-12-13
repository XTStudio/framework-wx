"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UIGestureRecognizer_1 = require("./UIGestureRecognizer");
class UIRotationGestureRecognizer extends UIGestureRecognizer_1.UIGestureRecognizer {
    constructor() {
        super(...arguments);
        this.rotation = 1.0;
        this.velocity = 0.0;
    }
}
exports.UIRotationGestureRecognizer = UIRotationGestureRecognizer;
