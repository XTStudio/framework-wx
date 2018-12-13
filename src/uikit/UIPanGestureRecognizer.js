"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UIGestureRecognizer_1 = require("./UIGestureRecognizer");
const UIView_1 = require("./UIView");
const UITouch_1 = require("./UITouch");
class UIPanGestureRecognizer extends UIGestureRecognizer_1.UIGestureRecognizer {
    constructor() {
        super(...arguments);
        this.lockedDirection = undefined;
        this.firstTouch = undefined;
        this.translationPoint = undefined;
        this.beganPoints = {};
    }
    translationInView(view) {
        if (!this.firstTouch) {
            return { x: 0, y: 0 };
        }
        const windowPoint = this.firstTouch.windowPoint;
        if (!windowPoint) {
            return { x: 0, y: 0 };
        }
        const translationPoint = this.translationPoint;
        if (!translationPoint) {
            return { x: 0, y: 0 };
        }
        return { x: windowPoint.x - translationPoint.x, y: windowPoint.y - translationPoint.y };
    }
    setTranslation(translation, inView) {
        if (!this.firstTouch) {
            return;
        }
        const windowPoint = this.firstTouch.windowPoint;
        if (!windowPoint) {
            return;
        }
        this.translationPoint = { x: windowPoint.x - translation.x, y: windowPoint.y - translation.y };
    }
    velocityInView(view) {
        UIView_1.sharedVelocityTracker.computeCurrentVelocity();
        return UIView_1.sharedVelocityTracker.velocity;
    }
    handleTouch(touches) {
        super.handleTouch(touches);
        touches.forEach((it) => {
            if (it.identifier == 0) {
                this.firstTouch = it;
            }
            if (it.phase == UITouch_1.UITouchPhase.began) {
                if (UIView_1.UIView.recognizedGesture != undefined && UIView_1.UIView.recognizedGesture != this) {
                    this.beganPoints = {};
                    return;
                }
                if (it.windowPoint) {
                    this.beganPoints[it.identifier] = it.windowPoint;
                }
                if (it.identifier == 0) {
                    this.translationPoint = it.windowPoint;
                }
            }
            else if (it.phase == UITouch_1.UITouchPhase.moved) {
                if (this.state == UIGestureRecognizer_1.UIGestureRecognizerState.possible) {
                    if (UIView_1.UIView.recognizedGesture != undefined && UIView_1.UIView.recognizedGesture != this) {
                        this.state = UIGestureRecognizer_1.UIGestureRecognizerState.failed;
                        return;
                    }
                    if (it.windowPoint && this.beganPoints[it.identifier]) {
                        const beganPoint = this.beganPoints[it.identifier];
                        if (this.lockedDirection !== undefined) {
                            if (this.lockedDirection === 1) {
                                if (Math.abs(beganPoint.y - it.windowPoint.y) >= 8.0) {
                                    UIView_1.UIView.recognizedGesture = this;
                                    this.state = UIGestureRecognizer_1.UIGestureRecognizerState.began;
                                    this.handleEvent("began");
                                    this.emit("began", this);
                                }
                            }
                            else if (this.lockedDirection === 2) {
                                if (Math.abs(beganPoint.x - it.windowPoint.x) >= 8.0) {
                                    UIView_1.UIView.recognizedGesture = this;
                                    this.state = UIGestureRecognizer_1.UIGestureRecognizerState.began;
                                    this.handleEvent("began");
                                    this.emit("began", this);
                                }
                            }
                        }
                        else {
                            if (Math.abs(beganPoint.x - it.windowPoint.x) >= 8.0 || Math.abs(beganPoint.y - it.windowPoint.y) >= 8.0) {
                                UIView_1.UIView.recognizedGesture = this;
                                this.state = UIGestureRecognizer_1.UIGestureRecognizerState.began;
                                this.handleEvent("began");
                                this.emit("began", this);
                            }
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
                if (this.state == UIGestureRecognizer_1.UIGestureRecognizerState.began || this.state == UIGestureRecognizer_1.UIGestureRecognizerState.changed) {
                    this.state = UIGestureRecognizer_1.UIGestureRecognizerState.ended;
                    this.handleEvent("ended");
                    this.emit("ended", this);
                    setTimeout(() => {
                        UIView_1.UIView.recognizedGesture = undefined;
                    }, 0);
                }
                if (it.identifier == 0) {
                    this.state = UIGestureRecognizer_1.UIGestureRecognizerState.possible;
                }
            }
            else if (it.phase == UITouch_1.UITouchPhase.cancelled) {
                if (this.state == UIGestureRecognizer_1.UIGestureRecognizerState.began || this.state == UIGestureRecognizer_1.UIGestureRecognizerState.changed) {
                    this.state = UIGestureRecognizer_1.UIGestureRecognizerState.cancelled;
                    this.handleEvent("cancelled");
                    this.emit("cancelled", this);
                    setTimeout(() => {
                        UIView_1.UIView.recognizedGesture = undefined;
                    }, 0);
                }
                this.state = UIGestureRecognizer_1.UIGestureRecognizerState.possible;
            }
        });
    }
}
exports.UIPanGestureRecognizer = UIPanGestureRecognizer;
