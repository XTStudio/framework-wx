"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UIView_1 = require("./UIView");
const UIColor_1 = require("./UIColor");
const UIEnums_1 = require("./UIEnums");
const UIButton_1 = require("./UIButton");
const UIImage_1 = require("./UIImage");
const clearButtonImage = new UIImage_1.UIImage({ base64: "iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAC0UExURUxpcY+NlKqqqo+PlI+OlI6Nk4+OlI6Nk4+OlH9/f39//46NlI+PlY6NlY6Nk5+fn4+OlJGOlpCQlY6OlI+OlJGOlI2NkY+Nk4+Ok46Ok1VVVQAAAI+OlJGOlY6OlY+Pk4+Pk4+PlJCOlJCOlY+OlI+Nk46NlI+OlI+PlI6Olo6Ok4+Nk4+Nk46OlI+Nk4+OlJCPlZGQlpKRl5OSmJaVnJWUmpeWnJSSmZCOlJSTmZCOlZOSmb7cF6QAAAAvdFJOUwD+A2X9/Pv+/gIC6Cnz2AjHZmhdul0/cPu+AwHkRkaAcL1/aOXm9/Y+Zvu7/rqAXZkdXwAAAYZJREFUKM91U4d2wjAMVMCOnQBhBMIoe7R0Sk4gQPv//1U5Zpail5fk6eyTdD4D2AgA6uv5LKrVotl8XS8SpyhB0GnoPDNEJst1Iw44dYwAqu10i1IpRKUkbtN29bQ3gHFloyUjLpTUm8rYoSUYPe98jVfh+buXsWVmzsrO5/XCOyKCOfxdpWAO2xvGNGVYECvMiGn8zafl7aTaQ4/81bcRiMLgsMeo1mnM8zW2EhW9xaUpGSEMdcPYJ4Vy26hDoplJZEMmaSIRNrnFVSY4qROY5JIrIna5fjlNy/yZ7m1C5l/Qz2wfytAr12+1+NUkU6SyPkTFn22kDE/ATxltY3Z9BDVy4wlKWzAYQCsl4TJUuwYXd2BkPh7TnhviGWBx09DMjeLdjNItEjKfQ+IVIizDiwjh8CTCUb5eHHadfNNS3DvJZ4Vnnak3RCf8fnkUvsP1w/f/j6wdPDzsH3fY1iaHvzY5OJvYvaN7g40u9ntsTcsc3pi6E15M7a5DMunb69CfJOfr8AsJs0zEPPGMHwAAAABJRU5ErkJggg==", renderingMode: UIImage_1.UIImageRenderingMode.alwaysOriginal });
class UITextField extends UIView_1.UIView {
    constructor() {
        super();
        this.clazz = "UITextField";
        this._text = "";
        this._textColor = undefined;
        this._font = undefined;
        this._textAlignment = UIEnums_1.UITextAlignment.left;
        this._placeholder = undefined;
        this.clearsOnBeginEditing = false;
        this._editing = false;
        this._clearButtonMode = UIEnums_1.UITextFieldViewMode.never;
        this._leftView = undefined;
        this._leftViewMode = UIEnums_1.UITextFieldViewMode.never;
        this._rightView = undefined;
        this._rightViewMode = UIEnums_1.UITextFieldViewMode.never;
        this._keyboardType = UIEnums_1.UIKeyboardType.default;
        this._returnKeyType = UIEnums_1.UIReturnKeyType.default;
        this._secureTextEntry = false;
        this.clearButtonView = new UIButton_1.UIButton().on("touchUpInside", () => {
            if (this.val("shouldClear") !== false) {
                this.text = "";
            }
        });
        this.leftPadding = 0;
        this.rightPadding = 0;
        this.clearButtonView.hidden = true;
        this.clearButtonView.setImage(clearButtonImage, UIEnums_1.UIControlState.normal);
        this.addSubview(this.clearButtonView);
    }
    get text() {
        return this._text;
    }
    set text(value) {
        this._text = value;
        this.markFlagDirty("text");
    }
    textDidChanged() {
        this.reloadExtraContents();
    }
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
    get placeholder() {
        return this._placeholder;
    }
    set placeholder(value) {
        this._placeholder = value;
        this.markFlagDirty("placeholder");
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
        if (this.clearsOnBeginEditing) {
            this.text = "";
        }
        this.reloadExtraContents();
        if (value) {
            this.emit("didBeginEditing", this);
        }
        else {
            this.emit("didEndEditing", this);
        }
    }
    get clearButtonMode() {
        return this._clearButtonMode;
    }
    set clearButtonMode(value) {
        this._clearButtonMode = value;
        this.reloadExtraContents();
    }
    get leftView() {
        return this._leftView;
    }
    set leftView(value) {
        if (this._leftView) {
            this._leftView.removeFromSuperview();
        }
        this._leftView = value;
        this.reloadExtraContents();
    }
    get leftViewMode() {
        return this._leftViewMode;
    }
    set leftViewMode(value) {
        this._leftViewMode = value;
        this.reloadExtraContents();
    }
    get rightView() {
        return this._rightView;
    }
    set rightView(value) {
        if (this._rightView) {
            this._rightView.removeFromSuperview();
        }
        this._rightView = value;
        this.reloadExtraContents();
    }
    get rightViewMode() {
        return this._rightViewMode;
    }
    set rightViewMode(value) {
        this._rightViewMode = value;
        this.reloadExtraContents();
    }
    // clearsOnInsertion: boolean = false
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
    onReturn() {
        this.emit("shouldReturn", this);
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
    layoutSubviews() {
        super.layoutSubviews();
        this.reloadExtraContents();
    }
    reloadExtraContents() {
        const displayClearButton = (() => {
            if (this.clearButtonMode == UIEnums_1.UITextFieldViewMode.always) {
                return true;
            }
            else if (!this.editing && this.clearButtonMode == UIEnums_1.UITextFieldViewMode.unlessEditing) {
                return true;
            }
            else if (this.editing && this.clearButtonMode == UIEnums_1.UITextFieldViewMode.whileEditing && this.text && this.text.length > 0) {
                return true;
            }
            return false;
        })();
        const displayRightView = (() => {
            if (displayClearButton) {
                return false;
            }
            if (this.rightView == null) {
                return false;
            }
            if (this.rightViewMode == UIEnums_1.UITextFieldViewMode.always) {
                return true;
            }
            else if (!this.editing && this.rightViewMode == UIEnums_1.UITextFieldViewMode.unlessEditing) {
                return true;
            }
            else if (this.editing && this.rightViewMode == UIEnums_1.UITextFieldViewMode.whileEditing) {
                return true;
            }
            return false;
        })();
        const displayLeftView = (() => {
            if (this.leftView == null) {
                return false;
            }
            if (this.leftViewMode == UIEnums_1.UITextFieldViewMode.always) {
                return true;
            }
            else if (!this.editing && this.leftViewMode == UIEnums_1.UITextFieldViewMode.unlessEditing) {
                return true;
            }
            else if (this.editing && this.leftViewMode == UIEnums_1.UITextFieldViewMode.whileEditing) {
                return true;
            }
            return false;
        })();
        this.clearButtonView.hidden = !displayClearButton;
        this.clearButtonView.frame = { x: this.bounds.width - 36.0, y: (this.bounds.height - 44.0) / 2.0, width: 36.0, height: 44.0 };
        if (displayLeftView) {
            if (this.leftView) {
                this.addSubview(this.leftView);
                this.leftView.frame = { x: 0.0, y: (this.bounds.height - this.leftView.frame.height) / 2.0, width: this.leftView.frame.width, height: this.leftView.frame.height };
            }
        }
        else {
            if (this.leftView) {
                this.leftView.removeFromSuperview();
            }
        }
        if (displayRightView) {
            if (this.rightView) {
                this.addSubview(this.rightView);
                this.rightView.frame = { x: this.bounds.width - this.rightView.frame.width, y: (this.bounds.height - this.rightView.frame.height) / 2.0, width: this.rightView.frame.width, height: this.rightView.frame.height };
            }
        }
        else {
            if (this.rightView) {
                this.rightView.removeFromSuperview();
            }
        }
        this.leftPadding = (displayLeftView && this.leftView !== undefined ? (this.leftView.frame.width + 1) : 0.0);
        this.rightPadding = (displayRightView && this.rightView ? (this.rightView.frame.width + 1) : 0.0) + (displayClearButton ? 36.0 : 0.0);
        this.markFlagDirty("leftPadding");
        this.markFlagDirty("rightPadding");
    }
    buildData() {
        let data = super.buildData();
        data.text = this.text;
        data.placeholder = this.placeholder;
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
        data.leftPadding = this.leftPadding;
        data.rightPadding = this.rightPadding;
        return data;
    }
}
exports.UITextField = UITextField;
