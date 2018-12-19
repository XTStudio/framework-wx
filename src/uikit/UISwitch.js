"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UIView_1 = require("./UIView");
const UIColor_1 = require("./UIColor");
const UIAnimator_1 = require("./UIAnimator");
const UILongPressGestureRecognizer_1 = require("./UILongPressGestureRecognizer");
class ThumbView extends UIView_1.UIView {
    pointInside(point) {
        return point.x >= -22.0 && point.y >= -22.0 && point.x <= this.frame.width + 22.0 && point.y <= this.frame.height + 22.0;
    }
}
class UISwitch extends UIView_1.UIView {
    constructor() {
        super();
        this.onTintColor = this.tintColor;
        this.thumbTintColor = UIColor_1.UIColor.white;
        this._isOn = false;
        // Implementation
        this.tintView = new UIView_1.UIView();
        this.thumbView = new ThumbView();
        this.thumbOutLightView = new UIView_1.UIView();
        this._tracking = false;
        this.touchChanged = false;
        this.tintView.userInteractionEnabled = false;
        this.addSubview(this.tintView);
        this.thumbOutLightView.userInteractionEnabled = false;
        this.addSubview(this.thumbOutLightView);
        this.thumbView.layer.shadowColor = new UIColor_1.UIColor(0.0, 0.0, 0.0, 1.0);
        this.thumbView.layer.shadowRadius = 2.0;
        this.thumbView.layer.shadowOffset = { width: 0.0, height: 3.0 };
        this.thumbView.layer.shadowOpacity = 0.2;
        this.addSubview(this.thumbView);
        this.setupTouches();
    }
    get isOn() {
        return this._isOn;
    }
    set isOn(value) {
        this._isOn = value;
        this.layoutSubviews();
    }
    setOn(on, animated) {
        if (animated) {
            UIAnimator_1.UIAnimator.curve(0.20, () => { this.isOn = on; }, undefined);
        }
        else {
            this.isOn = on;
        }
    }
    get tracking() {
        return this._tracking;
    }
    set tracking(value) {
        if (this._tracking == value) {
            return;
        }
        this._tracking = value;
        UIAnimator_1.UIAnimator.linear(0.15, () => {
            if (value) {
                this.thumbOutLightView.transform = { a: 1.6, b: 0.0, c: 0.0, d: 1.6, tx: 0.0, ty: 0.0 };
            }
            else {
                this.thumbOutLightView.transform = { a: 1.0, b: 0.0, c: 0.0, d: 1.0, tx: 0.0, ty: 0.0 };
            }
        }, undefined);
    }
    setupTouches() {
        const longPressGesture = new UILongPressGestureRecognizer_1.UILongPressGestureRecognizer;
        longPressGesture
            .on("began", () => {
            this.touchChanged = false;
            this.tracking = true;
        })
            .on("changed", (sender) => {
            const location = sender.locationInView(this);
            const isOn = location.x > this.bounds.width / 2.0;
            if (this.isOn != isOn) {
                this.touchChanged = true;
                UIAnimator_1.UIAnimator.curve(0.20, () => { this.isOn = isOn; }, undefined);
            }
        })
            .on("ended", (sender) => {
            if (!this.touchChanged) {
                const location = sender.locationInView(this);
                if (this.pointInside(location)) {
                    UIAnimator_1.UIAnimator.curve(0.20, () => { this.isOn = !this.isOn; }, () => {
                        this.emit("valueChanged", this);
                    });
                }
            }
            else {
                this.emit("valueChanged", this);
            }
            this.tracking = false;
        })
            .on("cancelled", () => {
            if (this.touchChanged) {
                this.emit("valueChanged", this);
            }
            this.tracking = false;
        });
        longPressGesture.minimumPressDuration = 0.0;
        this.thumbView.addGestureRecognizer(longPressGesture);
    }
    layoutSubviews() {
        super.layoutSubviews();
        this.tintView.frame = { x: (this.bounds.width - 34.0) / 2.0, y: (this.bounds.height - 14.0) / 2.0, width: 34.0, height: 14.0 };
        this.tintView.layer.cornerRadius = 7.0;
        if (this.isOn) {
            this.thumbView.frame = { x: this.tintView.frame.x + this.tintView.frame.width - 20.0, y: (this.bounds.height - 20.0) / 2.0, width: 20.0, height: 20.0 };
            this.thumbView.layer.cornerRadius = 10.0;
            if (this.onTintColor) {
                this.thumbView.backgroundColor = this.onTintColor;
                this.tintView.backgroundColor = this.onTintColor.colorWithAlphaComponent(0.5);
                this.thumbOutLightView.frame = { x: this.tintView.frame.x + this.tintView.frame.width - 20.0, y: (this.bounds.height - 20.0) / 2.0, width: 20.0, height: 20.0 };
                this.thumbOutLightView.layer.cornerRadius = 10.0;
                this.thumbOutLightView.backgroundColor = this.onTintColor.colorWithAlphaComponent(0.2);
            }
        }
        else {
            this.thumbView.frame = { x: this.tintView.frame.x, y: (this.bounds.height - 20.0) / 2.0, width: 20.0, height: 20.0 };
            this.thumbView.layer.cornerRadius = 10.0;
            this.thumbView.backgroundColor = this.thumbTintColor;
            this.tintView.backgroundColor = new UIColor_1.UIColor(0x84 / 255.0, 0x84 / 255.0, 0x84 / 255.0, 1.0);
            this.thumbOutLightView.frame = { x: this.tintView.frame.x, y: (this.bounds.height - 20.0) / 2.0, width: 20.0, height: 20.0 };
            this.thumbOutLightView.layer.cornerRadius = 10.0;
            this.thumbOutLightView.backgroundColor = new UIColor_1.UIColor(0x84 / 255.0, 0x84 / 255.0, 0x84 / 255.0, 0.2);
        }
    }
    pointInside(point) {
        return point.x >= 0.0 && point.y >= -(44.0 - this.frame.height) / 2.0 && point.x <= this.frame.width && point.y <= this.frame.height + (44.0 - this.frame.height) / 2.0;
    }
}
exports.UISwitch = UISwitch;
