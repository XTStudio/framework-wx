"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UIPoint_1 = require("./UIPoint");
const MagicObject_1 = require("./helpers/MagicObject");
var UITouchPhase;
(function (UITouchPhase) {
    UITouchPhase[UITouchPhase["began"] = 0] = "began";
    UITouchPhase[UITouchPhase["moved"] = 1] = "moved";
    UITouchPhase[UITouchPhase["stationary"] = 2] = "stationary";
    UITouchPhase[UITouchPhase["ended"] = 3] = "ended";
    UITouchPhase[UITouchPhase["cancelled"] = 4] = "cancelled";
})(UITouchPhase = exports.UITouchPhase || (exports.UITouchPhase = {}));
class UITouch {
    constructor() {
        this.identifier = 0;
        this.timestamp = 0.0;
        this.phase = UITouchPhase.cancelled;
        this.tapCount = 0;
        this._window = new MagicObject_1.MagicObject();
        this.windowPoint = undefined;
        this._view = new MagicObject_1.MagicObject();
        this.gestureRecognizers = [];
    }
    get window() {
        return this._window.get();
    }
    set window(value) {
        this._window.set(value);
    }
    get view() {
        return this._view.get();
    }
    set view(value) {
        this._view.set(value);
    }
    locationInView(view) {
        const aView = view || this.view;
        if (aView === undefined) {
            return UIPoint_1.UIPointZero;
        }
        const windowPoint = this.windowPoint || UIPoint_1.UIPointZero;
        return aView.convertPointFromWindow(windowPoint) || UIPoint_1.UIPointZero;
    }
    previousLocationInView(view) {
        return UIPoint_1.UIPointZero;
    }
}
exports.UITouch = UITouch;
class VelocityTracker {
    constructor() {
        this.movements = [];
        this.velocity = { x: 0, y: 0 };
    }
    reset() {
        this.movements = [];
        this.velocity = { x: 0, y: 0 };
    }
    addMovement(touch) {
        this.movements.push(Object.assign({}, touch));
    }
    computeCurrentVelocity() {
        for (let index = this.movements.length - 1; index >= 1; index--) {
            const current = this.movements[index];
            const last = this.movements[index - 1];
            if (!current.windowPoint || !last.windowPoint) {
                continue;
            }
            if (current.phase == UITouchPhase.ended && last.phase == UITouchPhase.moved && current.timestamp - last.timestamp > 0.024) {
                this.velocity = { x: 0, y: 0 };
                break;
            }
            if (current.phase != UITouchPhase.moved || last.phase != UITouchPhase.moved) {
                continue;
            }
            const timeDiff = current.timestamp - last.timestamp;
            if (timeDiff > 0.002) {
                this.velocity = {
                    x: (current.windowPoint.x - last.windowPoint.x) / timeDiff,
                    y: (current.windowPoint.y - last.windowPoint.y) / timeDiff,
                };
                break;
            }
        }
    }
}
exports.VelocityTracker = VelocityTracker;
