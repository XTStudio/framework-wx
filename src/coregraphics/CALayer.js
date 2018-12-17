"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UIRect_1 = require("../uikit/UIRect");
const MagicObject_1 = require("../uikit/helpers/MagicObject");
class CALayer {
    constructor() {
        this._view = new MagicObject_1.MagicObject;
        this._frame = UIRect_1.UIRectZero;
        this._hidden = false;
        this._cornerRadius = 0.0;
        this._borderWidth = 0.0;
        this._borderColor = undefined;
        this.superlayer = undefined;
        this.sublayers = [];
        this._backgroundColor = undefined;
        this._opacity = 1.0;
        this._masksToBounds = false;
        this._shadowColor = undefined;
        this._shadowOpacity = 0.0;
        this._shadowOffset = { width: 0, height: -3 };
        this._shadowRadius = 3.0;
    }
    get view() {
        if (this.superlayer) {
            return this.superlayer._view.get();
        }
        return this._view.get();
    }
    set view(value) {
        this._view.set(value);
    }
    get frame() {
        return this._frame;
    }
    set frame(value) {
        this._frame = value;
    }
    get hidden() {
        if (this._view.get()) {
            return this._view.get().hidden;
        }
        else {
            return this._hidden;
        }
    }
    set hidden(value) {
        this._hidden = value;
        if (this._view.get()) {
            this._view.get().hidden = value;
        }
        else {
        }
    }
    get cornerRadius() {
        return this._cornerRadius;
    }
    set cornerRadius(value) {
        this._cornerRadius = value;
        if (this._view.get()) {
            this._view.get().invalidate();
        }
        else {
        }
    }
    get borderWidth() {
        return this._borderWidth;
    }
    set borderWidth(value) {
        this._borderWidth = value;
        this.resetBorder();
    }
    get borderColor() {
        return this._borderColor;
    }
    set borderColor(value) {
        this._borderColor = value;
        this.resetBorder();
    }
    resetBorder() {
        if (this._view.get()) {
            this._view.get().invalidate();
            // if (this.borderWidth > 0 && this.borderColor) {
            //     this._view.domElement.style.borderWidth = this.borderWidth.toString() + "px"
            //     this._view.domElement.style.borderColor = this.borderColor.toStyle()
            //     this._view.domElement.style.borderStyle = this.borderWidth > 0 ? "solid" : "unset"
            //     this._view.domElement.style.boxSizing = this.borderWidth > 0 ? "border-box" : "unset"
            // }
            // else {
            //     this._view.domElement.style.borderStyle = "unset"
            // }
        }
        else {
        }
    }
    moveBorderElementToFront() {
    }
    removeFromSuperlayer() {
        if (this.superlayer) {
            const idx = this.superlayer.sublayers.indexOf(this);
            if (idx >= 0) {
                this.superlayer.sublayers.splice(idx, 1);
            }
            this.superlayer = undefined;
        }
    }
    addSublayer(layer) {
        if (layer.superlayer !== undefined) {
            layer.removeFromSuperlayer();
        }
        this.sublayers.push(layer);
        layer.superlayer = this;
        this.createSVGElement();
        layer.createSVGElement();
    }
    createSVGElement() {
    }
    get backgroundColor() {
        if (this._view.get()) {
            return this._view.get().backgroundColor;
        }
        else {
            return this._backgroundColor;
        }
    }
    set backgroundColor(value) {
        this._backgroundColor = value;
        if (this._view.get()) {
            this._view.get().backgroundColor = value;
        }
        else {
        }
    }
    get opacity() {
        if (this._view.get()) {
            return this._view.get().alpha;
        }
        else {
            return this._opacity;
        }
    }
    set opacity(value) {
        this._opacity = value;
        if (this._view.get()) {
            this._view.get().alpha = value;
        }
        else {
        }
    }
    get masksToBounds() {
        return this._masksToBounds;
    }
    set masksToBounds(value) {
        this._masksToBounds = value;
        if (this._view.get()) {
            this._view.get().clipsToBounds = value;
        }
        else {
        }
    }
    get shadowColor() {
        return this._shadowColor;
    }
    set shadowColor(value) {
        this._shadowColor = value;
        this.resetShadow();
    }
    get shadowOpacity() {
        return this._shadowOpacity;
    }
    set shadowOpacity(value) {
        this._shadowOpacity = value;
        this.resetShadow();
    }
    get shadowOffset() {
        return this._shadowOffset;
    }
    set shadowOffset(value) {
        this._shadowOffset = value;
        this.resetShadow();
    }
    get shadowRadius() {
        return this._shadowRadius;
    }
    set shadowRadius(value) {
        this._shadowRadius = value;
        this.resetShadow();
    }
    resetShadow() {
        if (this._view.get()) {
            this._view.get().invalidate();
            // if (this.shadowOpacity > 0 && this.shadowColor && this.shadowColor.a > 0) {
            //     if (this._view instanceof UILabel) {
            //         this._view.domElement.style.textShadow = this.shadowOffset.width.toString() + "px " + this.shadowOffset.height.toString() + "px " + this.shadowRadius.toString() + "px " + this.shadowColor.colorWithAlphaComponent(this.shadowOpacity).toStyle()
            //     }
            //     else {
            //         this._view.domElement.style.boxShadow = this.shadowOffset.width.toString() + "px " + this.shadowOffset.height.toString() + "px " + this.shadowRadius.toString() + "px " + this.shadowColor.colorWithAlphaComponent(this.shadowOpacity).toStyle()
            //     }
            // }
            // else {
            //     this._view.domElement.style.textShadow = null
            //     this._view.domElement.style.boxShadow = null
            // }
        }
    }
}
exports.CALayer = CALayer;
