"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UIView_1 = require("./UIView");
const UIAnimator_1 = require("./UIAnimator");
const UILongPressGestureRecognizer_1 = require("./UILongPressGestureRecognizer");
class ThumbView extends UIView_1.UIView {
    pointInside(point) {
        return point.x >= -22.0 && point.y >= -22.0 && point.x <= this.frame.width + 22.0 && point.y <= this.frame.height + 22.0;
    }
}
class UISlider extends UIView_1.UIView {
    constructor() {
        super();
        this.value = 0.5;
        this.minimumValue = 0.0;
        this.maximumValue = 1.0;
        this._minimumTrackTintColor = undefined;
        this._maximumTrackTintColor = undefined;
        this._thumbTintColor = undefined;
        // Implementation
        this.minimumTrackView = new UIView_1.UIView();
        this.maximumTrackView = new UIView_1.UIView();
        this.thumbView = new ThumbView();
        this.thumbOutLightView = new UIView_1.UIView();
        this._tracking = false;
        this.previousLocation = undefined;
        if (this.tintColor) {
            this.minimumTrackTintColor = this.tintColor;
            this.maximumTrackTintColor = this.tintColor.colorWithAlphaComponent(0.3);
            this.thumbTintColor = this.tintColor;
        }
        this.maximumTrackView.userInteractionEnabled = false;
        this.addSubview(this.maximumTrackView);
        this.minimumTrackView.userInteractionEnabled = false;
        this.addSubview(this.minimumTrackView);
        this.thumbOutLightView.userInteractionEnabled = false;
        this.addSubview(this.thumbOutLightView);
        this.addSubview(this.thumbView);
        this.setupTouches();
    }
    get minimumTrackTintColor() {
        return this._minimumTrackTintColor;
    }
    set minimumTrackTintColor(value) {
        this._minimumTrackTintColor = value;
        this.minimumTrackView.backgroundColor = value;
    }
    get maximumTrackTintColor() {
        return this._maximumTrackTintColor;
    }
    set maximumTrackTintColor(value) {
        this._maximumTrackTintColor = value;
        this.maximumTrackView.backgroundColor = value;
    }
    get thumbTintColor() {
        return this._thumbTintColor;
    }
    set thumbTintColor(value) {
        this._thumbTintColor = value;
        if (value) {
            this.thumbView.backgroundColor = value;
            this.thumbOutLightView.backgroundColor = value.colorWithAlphaComponent(0.2);
        }
    }
    setValue(value, animated) {
        if (animated) {
            this.value = value;
            UIAnimator_1.UIAnimator.curve(0.5, () => { this.layoutSubviews(); }, undefined);
        }
        else {
            this.value = value;
            this.layoutSubviews();
        }
    }
    get tracking() {
        return this._tracking;
    }
    set tracking(value) {
        if (this._tracking === value) {
            return;
        }
        this._tracking = value;
        UIAnimator_1.UIAnimator.linear(0.15, () => {
            if (value) {
                this.thumbView.transform = { a: 1.4, b: 0.0, c: 0.0, d: 1.4, tx: 0.0, ty: 0.0 };
                this.thumbOutLightView.transform = { a: 2.4, b: 0.0, c: 0.0, d: 2.4, tx: 0.0, ty: 0.0 };
            }
            else {
                this.thumbView.transform = { a: 1.0, b: 0.0, c: 0.0, d: 1.0, tx: 0.0, ty: 0.0 };
                this.thumbOutLightView.transform = { a: 1.0, b: 0.0, c: 0.0, d: 1.0, tx: 0.0, ty: 0.0 };
            }
        }, undefined);
    }
    setupTouches() {
        const longPressGesture = new UILongPressGestureRecognizer_1.UILongPressGestureRecognizer();
        longPressGesture.on("began", (sender) => {
            this.previousLocation = sender.locationInView(this);
            this.tracking = true;
        });
        longPressGesture.on("changed", (sender) => {
            const previousLocation = this.previousLocation;
            if (!previousLocation) {
                return;
            }
            const location = sender.locationInView(this);
            const translationX = location.x - previousLocation.x;
            this.previousLocation = location;
            const newValue = this.value + translationX / this.frame.width * (this.maximumValue - this.minimumValue);
            this.value = Math.max(this.minimumValue, Math.min(this.maximumValue, newValue));
            this.emit("valueChanged", this);
            this.layoutSubviews();
        });
        longPressGesture.on("ended", () => {
            this.tracking = false;
        });
        longPressGesture.on("cancelled", () => {
            this.tracking = false;
        });
        longPressGesture.minimumPressDuration = 0.0;
        this.thumbView.addGestureRecognizer(longPressGesture);
    }
    layoutSubviews() {
        super.layoutSubviews();
        const progress = Math.max(0.0, Math.min(1.0, (this.value - this.minimumValue) / (this.maximumValue - this.minimumValue)));
        this.maximumTrackView.frame = { x: 0.0, y: (this.bounds.height - 4.0) / 2.0, width: this.bounds.width, height: 4.0 };
        this.minimumTrackView.frame = { x: 0.0, y: (this.bounds.height - 4.0) / 2.0, width: this.bounds.width * progress, height: 4.0 };
        this.thumbOutLightView.frame = { x: -7.5 + this.bounds.width * progress, y: (this.bounds.height - 15.0) / 2.0, width: 15.0, height: 15.0 };
        this.thumbOutLightView.layer.cornerRadius = 7.5;
        this.thumbView.frame = { x: -7.5 + this.bounds.width * progress, y: (this.bounds.height - 15.0) / 2.0, width: 15.0, height: 15.0 };
        this.thumbView.layer.cornerRadius = 7.5;
    }
    pointInside(point) {
        return point.x >= -22.0 && point.y >= -(44.0 - this.frame.height) / 2.0 && point.x <= this.frame.width + 22.0 && point.y <= this.frame.height + (44.0 - this.frame.height) / 2.0;
    }
}
exports.UISlider = UISlider;
