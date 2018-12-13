"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UIGestureRecognizer_1 = require("./UIGestureRecognizer");
const UITouch_1 = require("./UITouch");
const UIView_1 = require("./UIView");
class UILongPressGestureRecognizer extends UIGestureRecognizer_1.UIGestureRecognizer {
    constructor() {
        super(...arguments);
        this.numberOfTapsRequired = 1;
        this.numberOfTouchesRequired = 1;
        this.minimumPressDuration = 0.5;
        this.allowableMovement = 10;
        this.beganPoints = {};
    }
    handleTouch(touches) {
        super.handleTouch(touches);
        touches.forEach((it) => {
            if (it.phase == UITouch_1.UITouchPhase.began) {
                if (UIView_1.UIView.recognizedGesture != undefined) {
                    this.beganPoints = {};
                    return;
                }
                if (it.windowPoint) {
                    this.beganPoints[it.identifier] = it.windowPoint;
                }
                if (this.timerTask === undefined && Object.keys(this.beganPoints).length >= this.numberOfTouchesRequired) {
                    this.timerTask = setTimeout(() => {
                        if (UIView_1.UIView.recognizedGesture == undefined && this.state == UIGestureRecognizer_1.UIGestureRecognizerState.possible) {
                            UIView_1.UIView.recognizedGesture = this;
                            this.state = UIGestureRecognizer_1.UIGestureRecognizerState.began;
                            this.handleEvent("began");
                            this.emit("began", this);
                        }
                        else {
                            this.state = UIGestureRecognizer_1.UIGestureRecognizerState.failed;
                        }
                    }, this.minimumPressDuration * 1000);
                }
            }
            else if (it.phase == UITouch_1.UITouchPhase.moved) {
                if (this.state == UIGestureRecognizer_1.UIGestureRecognizerState.possible) {
                    if (it.windowPoint && this.beganPoints[it.identifier]) {
                        const beganPoint = this.beganPoints[it.identifier];
                        if (Math.abs(beganPoint.x - it.windowPoint.x) >= this.allowableMovement || Math.abs(beganPoint.y - it.windowPoint.y) >= this.allowableMovement) {
                            clearTimeout(this.timerTask);
                            this.state = UIGestureRecognizer_1.UIGestureRecognizerState.failed;
                        }
                    }
                }
                else if (this.state == UIGestureRecognizer_1.UIGestureRecognizerState.began || this.state == UIGestureRecognizer_1.UIGestureRecognizerState.changed) {
                    this.state = UIGestureRecognizer_1.UIGestureRecognizerState.changed;
                    this.handleEvent("changed");
                    this.emit("changed", this);
                }
            }
            else if (it.phase == UITouch_1.UITouchPhase.ended) {
                clearTimeout(this.timerTask);
                this.timerTask = undefined;
                if (this.state == UIGestureRecognizer_1.UIGestureRecognizerState.began || this.state == UIGestureRecognizer_1.UIGestureRecognizerState.changed) {
                    this.state = UIGestureRecognizer_1.UIGestureRecognizerState.ended;
                    this.handleEvent("ended");
                    this.emit("ended", this);
                    setTimeout(() => {
                        UIView_1.UIView.recognizedGesture = undefined;
                    }, 0);
                }
                this.state = UIGestureRecognizer_1.UIGestureRecognizerState.possible;
                this.beganPoints = {};
            }
            else if (it.phase == UITouch_1.UITouchPhase.cancelled) {
                clearTimeout(this.timerTask);
                this.timerTask = undefined;
                if (this.state == UIGestureRecognizer_1.UIGestureRecognizerState.began || this.state == UIGestureRecognizer_1.UIGestureRecognizerState.changed) {
                    this.state = UIGestureRecognizer_1.UIGestureRecognizerState.cancelled;
                    this.handleEvent("cancelled");
                    this.emit("cancelled", this);
                    setTimeout(() => {
                        UIView_1.UIView.recognizedGesture = undefined;
                    }, 0);
                }
                this.state = UIGestureRecognizer_1.UIGestureRecognizerState.possible;
                this.beganPoints = {};
            }
        });
    }
}
exports.UILongPressGestureRecognizer = UILongPressGestureRecognizer;
