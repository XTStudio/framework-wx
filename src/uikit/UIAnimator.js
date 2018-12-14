"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UIAnimator {
    constructor() {
        this.animationProps = {};
    }
    linear(duration, isCurve, animations, completion) {
        if (UIAnimator.nextCompletion !== undefined) {
            UIAnimator.nextCompletion();
            UIAnimator.nextCompletion = undefined;
        }
        this.animationProps = {
            duration: duration * 1000,
            timingFunction: isCurve ? "ease" : "linear"
        };
        UIAnimator.activeAnimator = this;
        animations();
        UIAnimator.activeAnimator = undefined;
        if (completion) {
            UIAnimator.nextCompletion = completion;
            setTimeout(() => {
                if (UIAnimator.nextCompletion !== completion) {
                    return;
                }
                completion();
                UIAnimator.nextCompletion = undefined;
            }, duration * 1000);
        }
    }
    static linear(duration, animations, completion) {
        UIAnimator.shared.linear(duration, false, animations, completion);
    }
    static curve(duration, animations, completion) {
        UIAnimator.shared.linear(duration, true, animations, completion);
    }
    static spring(tension, friction, animations, completion) {
        // not support spring animation for wx
        UIAnimator.shared.linear(0.3, false, animations, completion);
    }
    static bouncy(bounciness, speed, animations, completion) {
        // not support bouncy animation for wx
        UIAnimator.shared.linear(0.3, false, animations, completion);
    }
}
UIAnimator.shared = new UIAnimator;
UIAnimator.activeAnimator = undefined;
UIAnimator.nextCompletion = undefined;
exports.UIAnimator = UIAnimator;
