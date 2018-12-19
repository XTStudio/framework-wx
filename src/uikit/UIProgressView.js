"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UIView_1 = require("./UIView");
const UIAnimator_1 = require("./UIAnimator");
class UIProgressView extends UIView_1.UIView {
    constructor() {
        super();
        this._progress = 0.0;
        this._progressTintColor = undefined;
        this._trackTintColor = undefined;
        // Implementation
        this.trackView = new UIView_1.UIView();
        this.progressView = new UIView_1.UIView();
        this.userInteractionEnabled = false;
        this.progressTintColor = this.tintColor;
        this.trackTintColor = this.tintColor.colorWithAlphaComponent(0.35);
        this.addSubview(this.trackView);
        this.addSubview(this.progressView);
    }
    /**
     * Getter progress
     * @return {number }
     */
    get progress() {
        return this._progress;
    }
    /**
     * Setter progress
     * @param {number } value
     */
    set progress(value) {
        this._progress = value;
        this.layoutIfNeeded();
    }
    setProgress(value, animated) {
        if (animated) {
            UIAnimator_1.UIAnimator.curve(0.30, () => {
                this.progress = value;
                this.layoutIfNeeded();
            }, undefined);
        }
        else {
            this.progress = value;
            this.layoutIfNeeded();
        }
    }
    /**
     * Getter progressTintColor
     * @return {UIColor }
     */
    get progressTintColor() {
        return this._progressTintColor;
    }
    /**
     * Setter progressTintColor
     * @param {UIColor } value
     */
    set progressTintColor(value) {
        this._progressTintColor = value;
        this.progressView.backgroundColor = value;
    }
    /**
     * Getter trackTintColor
     * @return {UIColor }
     */
    get trackTintColor() {
        return this._trackTintColor;
    }
    /**
     * Setter trackTintColor
     * @param {UIColor } value
     */
    set trackTintColor(value) {
        this._trackTintColor = value;
        this.trackView.backgroundColor = value;
    }
    layoutSubviews() {
        super.layoutSubviews();
        this.trackView.frame = this.bounds;
        this.progressView.frame = { x: 0.0, y: 0.0, width: this.bounds.width * this.progress, height: this.bounds.height };
    }
}
exports.UIProgressView = UIProgressView;
