"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UITouch_1 = require("./UITouch");
const UIGestureRecognizer_1 = require("./UIGestureRecognizer");
const UIView_1 = require("./UIView");
class UITapGestureRecognizer extends UIGestureRecognizer_1.UIGestureRecognizer {
    constructor() {
        super(...arguments);
        this.numberOfTapsRequired = 1;
        this.numberOfTouchesRequired = 1;
        this.beganPoints = {};
        this.validPointsCount = 0;
    }
    handleTouch(touches) {
        super.handleTouch(touches);
        touches.forEach(it => {
            if (it.phase == UITouch_1.UITouchPhase.began) {
                if (UIView_1.UIView.recognizedGesture != undefined) {
                    this.beganPoints = {};
                    return;
                }
                if (it.windowPoint) {
                    this.beganPoints[it.identifier] = it.windowPoint;
                }
            }
            else if (it.phase == UITouch_1.UITouchPhase.moved) {
                if (it.windowPoint && this.beganPoints[it.identifier]) {
                    if (Math.abs(this.beganPoints[it.identifier].x - it.windowPoint.x) >= 22.0 || Math.abs(this.beganPoints[it.identifier].y - it.windowPoint.y) >= 22.0) {
                        delete this.beganPoints[it.identifier];
                    }
                }
            }
            else if (it.phase == UITouch_1.UITouchPhase.ended) {
                if (UIView_1.UIView.recognizedGesture != undefined) {
                    this.beganPoints = {};
                    this.state = UIGestureRecognizer_1.UIGestureRecognizerState.possible;
                    this.validPointsCount = 0;
                    return;
                }
                if (it.tapCount >= this.numberOfTapsRequired && this.beganPoints[it.identifier] != undefined) {
                    this.validPointsCount++;
                }
                delete this.beganPoints[it.identifier];
                if (this.validPointsCount >= this.numberOfTouchesRequired) {
                    UIView_1.UIView.recognizedGesture = this;
                    this.state = UIGestureRecognizer_1.UIGestureRecognizerState.ended;
                    this.handleEvent("touch");
                    this.emit("touch", this);
                    setTimeout(() => {
                        UIView_1.UIView.recognizedGesture = undefined;
                    }, 0);
                }
                if (Object.keys(this.beganPoints).length == 0 || this.state == UIGestureRecognizer_1.UIGestureRecognizerState.ended) {
                    this.state = UIGestureRecognizer_1.UIGestureRecognizerState.possible;
                    this.validPointsCount = 0;
                }
            }
        });
    }
}
exports.UITapGestureRecognizer = UITapGestureRecognizer;
