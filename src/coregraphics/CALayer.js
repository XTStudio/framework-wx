"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UIRect_1 = require("../uikit/UIRect");
const UISize_1 = require("../uikit/UISize");
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
        if (UIRect_1.UIRectEqualToRect(this._frame, value)) {
            return;
        }
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
        if (this.hidden === value) {
            return;
        }
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
        if (this._cornerRadius === value) {
            return;
        }
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
        if (this._borderWidth === value) {
            return;
        }
        this._borderWidth = value;
        this.resetBorder();
    }
    get borderColor() {
        return this._borderColor;
    }
    set borderColor(value) {
        if (this._borderColor === value) {
            return;
        }
        if (this._borderColor !== undefined && value !== undefined) {
            if (this._borderColor.toStyle() === value.toStyle()) {
                return;
            }
        }
        this._borderColor = value;
        this.resetBorder();
    }
    resetBorder() {
        if (this._view.get()) {
            this._view.get().invalidate();
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
        if (this.backgroundColor === value) {
            return;
        }
        if (this.backgroundColor !== undefined && value !== undefined) {
            if (this.backgroundColor.toStyle() === value.toStyle()) {
                return;
            }
        }
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
        if (this.opacity === value) {
            return;
        }
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
        if (this.masksToBounds === value) {
            return;
        }
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
        if (this.shadowColor === value) {
            return;
        }
        if (this.shadowColor !== undefined && value !== undefined) {
            if (this.shadowColor.toStyle() === value.toStyle()) {
                return;
            }
        }
        this._shadowColor = value;
        this.resetShadow();
    }
    get shadowOpacity() {
        return this._shadowOpacity;
    }
    set shadowOpacity(value) {
        if (this.shadowOpacity === value) {
            return;
        }
        this._shadowOpacity = value;
        this.resetShadow();
    }
    get shadowOffset() {
        return this._shadowOffset;
    }
    set shadowOffset(value) {
        if (UISize_1.UISizeEqualToSize(this.shadowOffset, value)) {
            return;
        }
        this._shadowOffset = value;
        this.resetShadow();
    }
    get shadowRadius() {
        return this._shadowRadius;
    }
    set shadowRadius(value) {
        if (this.shadowRadius === value) {
            return;
        }
        this._shadowRadius = value;
        this.resetShadow();
    }
    resetShadow() {
        if (this._view.get()) {
            this._view.get().invalidate();
        }
    }
}
exports.CALayer = CALayer;
