"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UIView_1 = require("./UIView");
const UIColor_1 = require("./UIColor");
const UIEnums_1 = require("./UIEnums");
class UITextView extends UIView_1.UIView {
    constructor() {
        super(...arguments);
        this.clazz = "UITextField";
        this._text = "";
        this._textColor = undefined;
        this._font = undefined;
        this._textAlignment = UIEnums_1.UITextAlignment.left;
        this._editable = true;
        this._editing = false;
        this._keyboardType = UIEnums_1.UIKeyboardType.default;
        this._returnKeyType = UIEnums_1.UIReturnKeyType.default;
        this._secureTextEntry = false;
    }
    get text() {
        return this._text;
    }
    set text(value) {
        this._text = value;
        this.markFlagDirty("text");
    }
    textDidChanged() { }
    get textColor() {
        return this._textColor;
    }
    set textColor(value) {
        this._textColor = value;
        this.markFlagDirty("textStyle");
    }
    get font() {
        return this._font;
    }
    set font(value) {
        this._font = value;
        this.markFlagDirty("textStyle");
    }
    get textAlignment() {
        return this._textAlignment;
    }
    set textAlignment(value) {
        this._textAlignment = value;
        this.markFlagDirty("textStyle");
    }
    get editable() {
        return this._editable;
    }
    set editable(value) {
        this._editable = value;
    }
    get editing() {
        return this._editing;
    }
    set editing(value) {
        if (value && this.val("shouldBeginEditing", this) === false) {
            this.blur();
            return;
        }
        else if (!value && this.val("shouldEndEditing", this) === false) {
            this.focus();
            return;
        }
        this._editing = value;
        if (value) {
            this.emit("didBeginEditing", this);
        }
        else {
            this.emit("didEndEditing", this);
        }
    }
    focus() {
        if (this.val("shouldBeginEditing", this) === false) {
            return;
        }
        this.editing = true;
        this.markFlagDirty("requireFocus");
    }
    blur() {
        if (this.val("shouldEndEditing", this) === false) {
            return;
        }
        this.editing = false;
        this.markFlagDirty("requireFocus");
    }
    get keyboardType() {
        return this._keyboardType;
    }
    set keyboardType(value) {
        this._keyboardType = value;
        this.markFlagDirty("keyboardType");
    }
    get returnKeyType() {
        return this._returnKeyType;
    }
    set returnKeyType(value) {
        this._returnKeyType = value;
        this.markFlagDirty("returnKeyType");
    }
    get secureTextEntry() {
        return this._secureTextEntry;
    }
    set secureTextEntry(value) {
        this._secureTextEntry = value;
        this.markFlagDirty("secureTextEntry");
    }
    buildData() {
        let data = super.buildData();
        data.isTextView = true;
        data.text = this.text;
        data.textStyle = `
        color: ${this._textColor !== undefined ? UIColor_1.UIColor.toStyle(this._textColor) : "black"};
        font-size: ${this._font !== undefined ? this._font.pointSize : 14}px;
        font-family: ${this._font !== undefined ? this._font.fontName : ""}; 
        font-weight: ${this._font !== undefined ? this._font.fontStyle : ""}; 
        font-style: ${this._font !== undefined ? this._font.fontStyle : ""}; 
        text-align: ${(() => {
            switch (this._textAlignment) {
                case UIEnums_1.UITextAlignment.left:
                    return "left";
                case UIEnums_1.UITextAlignment.center:
                    return "center";
                case UIEnums_1.UITextAlignment.right:
                    return "right";
            }
            return "left";
        })()};
        `;
        data.requireFocus = this.editing;
        data.secureTextEntry = this.secureTextEntry;
        data.keyboardType = (() => {
            switch (this.keyboardType) {
                case UIEnums_1.UIKeyboardType.numberPad:
                    return "number";
                case UIEnums_1.UIKeyboardType.decimalPad:
                    return "digit";
            }
            return "text";
        })();
        data.returnKeyType = (() => {
            switch (this.returnKeyType) {
                case UIEnums_1.UIReturnKeyType.default:
                    return "done";
                case UIEnums_1.UIReturnKeyType.done:
                    return "done";
                case UIEnums_1.UIReturnKeyType.go:
                    return "go";
                case UIEnums_1.UIReturnKeyType.next:
                    return "next";
                case UIEnums_1.UIReturnKeyType.send:
                    return "send";
            }
            return "done";
        });
        return data;
    }
}
exports.UITextView = UITextView;
