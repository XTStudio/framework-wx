"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UIView_1 = require("./UIView");
const UIEnums_1 = require("./UIEnums");
class UILabel extends UIView_1.UIView {
    constructor() {
        super(...arguments);
        this.clazz = "UILabel";
        this._text = undefined;
        this._font = undefined;
        this._textColor = undefined;
        this._textAlignment = UIEnums_1.UITextAlignment.left;
        this._numberOfLines = 1;
    }
    get text() {
        return this._text;
    }
    set text(value) {
        if (this._text === value) {
            return;
        }
        this._text = value;
        this.invalidate();
    }
    get font() {
        return this._font;
    }
    set font(value) {
        if (this._font === value) {
            return;
        }
        this._font = value;
        this.invalidate();
    }
    get textColor() {
        return this._textColor;
    }
    set textColor(value) {
        if (this._textColor === value) {
            return;
        }
        this._textColor = value;
        this.invalidate();
    }
    get textAlignment() {
        return this._textAlignment;
    }
    set textAlignment(value) {
        if (this._textAlignment === value) {
            return;
        }
        this._textAlignment = value;
        this.invalidate();
    }
    get numberOfLines() {
        return this._numberOfLines;
    }
    set numberOfLines(value) {
        if (this._numberOfLines === value) {
            return;
        }
        this._numberOfLines = value;
        this.invalidate();
    }
}
exports.UILabel = UILabel;
