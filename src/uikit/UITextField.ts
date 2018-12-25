import { UIView } from "./UIView";
import { UIColor } from "./UIColor";
import { UIFont } from "./UIFont";
import { UITextAlignment, UIKeyboardType, UIReturnKeyType, UITextFieldViewMode, UIControlState } from "./UIEnums";
import { UIButton } from "./UIButton";
import { UIImageRenderingMode, UIImage } from "./UIImage";

const clearButtonImage = new UIImage({ base64: "iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAC0UExURUxpcY+NlKqqqo+PlI+OlI6Nk4+OlI6Nk4+OlH9/f39//46NlI+PlY6NlY6Nk5+fn4+OlJGOlpCQlY6OlI+OlJGOlI2NkY+Nk4+Ok46Ok1VVVQAAAI+OlJGOlY6OlY+Pk4+Pk4+PlJCOlJCOlY+OlI+Nk46NlI+OlI+PlI6Olo6Ok4+Nk4+Nk46OlI+Nk4+OlJCPlZGQlpKRl5OSmJaVnJWUmpeWnJSSmZCOlJSTmZCOlZOSmb7cF6QAAAAvdFJOUwD+A2X9/Pv+/gIC6Cnz2AjHZmhdul0/cPu+AwHkRkaAcL1/aOXm9/Y+Zvu7/rqAXZkdXwAAAYZJREFUKM91U4d2wjAMVMCOnQBhBMIoe7R0Sk4gQPv//1U5Zpail5fk6eyTdD4D2AgA6uv5LKrVotl8XS8SpyhB0GnoPDNEJst1Iw44dYwAqu10i1IpRKUkbtN29bQ3gHFloyUjLpTUm8rYoSUYPe98jVfh+buXsWVmzsrO5/XCOyKCOfxdpWAO2xvGNGVYECvMiGn8zafl7aTaQ4/81bcRiMLgsMeo1mnM8zW2EhW9xaUpGSEMdcPYJ4Vy26hDoplJZEMmaSIRNrnFVSY4qROY5JIrIna5fjlNy/yZ7m1C5l/Qz2wfytAr12+1+NUkU6SyPkTFn22kDE/ATxltY3Z9BDVy4wlKWzAYQCsl4TJUuwYXd2BkPh7TnhviGWBx09DMjeLdjNItEjKfQ+IVIizDiwjh8CTCUb5eHHadfNNS3DvJZ4Vnnak3RCf8fnkUvsP1w/f/j6wdPDzsH3fY1iaHvzY5OJvYvaN7g40u9ntsTcsc3pi6E15M7a5DMunb69CfJOfr8AsJs0zEPPGMHwAAAABJRU5ErkJggg==", renderingMode: UIImageRenderingMode.alwaysOriginal })

export class UITextField extends UIView {

    clazz = "UITextField"

    constructor() {
        super()
        this.clearButtonView.hidden = true
        this.clearButtonView.setImage(clearButtonImage, UIControlState.normal)
        this.addSubview(this.clearButtonView)
    }

    private _text: string = ""

    public get text(): string {
        return this._text;
    }

    public set text(value: string) {
        this._text = value
        this.markFlagDirty("text")
    }

    textDidChanged() {
        this.reloadExtraContents()
    }

    private _textColor: UIColor | undefined = undefined

    public get textColor(): UIColor | undefined {
        return this._textColor;
    }

    public set textColor(value: UIColor | undefined) {
        this._textColor = value;
        this.markFlagDirty("textStyle")
    }

    private _font: UIFont | undefined = undefined

    public get font(): UIFont | undefined {
        return this._font;
    }

    public set font(value: UIFont | undefined) {
        this._font = value;
        this.markFlagDirty("textStyle")
    }

    private _textAlignment: UITextAlignment = UITextAlignment.left

    public get textAlignment(): UITextAlignment {
        return this._textAlignment;
    }

    public set textAlignment(value: UITextAlignment) {
        this._textAlignment = value;
        this.markFlagDirty("textStyle")
    }

    private _placeholder: string | undefined = undefined

    public get placeholder(): string | undefined {
        return this._placeholder;
    }

    public set placeholder(value: string | undefined) {
        this._placeholder = value
        this.markFlagDirty("placeholder")
    }

    clearsOnBeginEditing: boolean = false

    private _editing: boolean = false

    public get editing(): boolean {
        return this._editing
    }

    public set editing(value: boolean) {
        if (value && this.val("shouldBeginEditing", this) === false) {
            this.blur()
            return
        }
        else if (!value && this.val("shouldEndEditing", this) === false) {
            this.focus()
            return
        }
        this._editing = value
        if (this.clearsOnBeginEditing) {
            this.text = ""
        }
        this.reloadExtraContents()
        if (value) {
            this.emit("didBeginEditing", this)
        }
        else {
            this.emit("didEndEditing", this)
        }
    }

    private _clearButtonMode: UITextFieldViewMode = UITextFieldViewMode.never

    public get clearButtonMode(): UITextFieldViewMode {
        return this._clearButtonMode;
    }

    public set clearButtonMode(value: UITextFieldViewMode) {
        this._clearButtonMode = value;
        this.reloadExtraContents()
    }

    private _leftView: UIView | undefined = undefined

    public get leftView(): UIView | undefined {
        return this._leftView;
    }

    public set leftView(value: UIView | undefined) {
        if (this._leftView) {
            this._leftView.removeFromSuperview()
        }
        this._leftView = value;
        this.reloadExtraContents()
    }

    private _leftViewMode: UITextFieldViewMode = UITextFieldViewMode.never

    public get leftViewMode(): UITextFieldViewMode {
        return this._leftViewMode;
    }

    public set leftViewMode(value: UITextFieldViewMode) {
        this._leftViewMode = value;
        this.reloadExtraContents()
    }

    private _rightView: UIView | undefined = undefined

    public get rightView(): UIView | undefined {
        return this._rightView;
    }

    public set rightView(value: UIView | undefined) {
        if (this._rightView) {
            this._rightView.removeFromSuperview()
        }
        this._rightView = value;
        this.reloadExtraContents()
    }

    private _rightViewMode: UITextFieldViewMode = UITextFieldViewMode.never

    public get rightViewMode(): UITextFieldViewMode {
        return this._rightViewMode;
    }

    public set rightViewMode(value: UITextFieldViewMode) {
        this._rightViewMode = value;
        this.reloadExtraContents()
    }

    // clearsOnInsertion: boolean = false

    focus(): void {
        if (this.val("shouldBeginEditing", this) === false) {
            return
        }
        this.editing = true
        this.markFlagDirty("requireFocus")
    }

    blur(): void {
        if (this.val("shouldEndEditing", this) === false) {
            return
        }
        this.editing = false
        this.markFlagDirty("requireFocus")
    }

    onReturn(): void {
        this.emit("shouldReturn", this)
    }

    private _keyboardType: UIKeyboardType = UIKeyboardType.default

    public get keyboardType(): UIKeyboardType {
        return this._keyboardType;
    }

    public set keyboardType(value: UIKeyboardType) {
        this._keyboardType = value;
        this.markFlagDirty("keyboardType")
    }

    private _returnKeyType: UIReturnKeyType = UIReturnKeyType.default


    public get returnKeyType(): UIReturnKeyType {
        return this._returnKeyType;
    }

    public set returnKeyType(value: UIReturnKeyType) {
        this._returnKeyType = value;
        this.markFlagDirty("returnKeyType")
    }

    private _secureTextEntry: boolean = false

    public get secureTextEntry(): boolean {
        return this._secureTextEntry;
    }

    public set secureTextEntry(value: boolean) {
        this._secureTextEntry = value;
        this.markFlagDirty("secureTextEntry")
    }

    layoutSubviews() {
        super.layoutSubviews()
        this.reloadExtraContents()
    }

    private clearButtonView = new UIButton().on("touchUpInside", () => {
        if (this.val("shouldClear") !== false) {
            this.text = ""
        }
        this.focus()
    })

    private leftPadding: number = 0
    private rightPadding: number = 0

    reloadExtraContents() {
        const displayClearButton = (() => {
            if (this.clearButtonMode == UITextFieldViewMode.always) {
                return true
            }
            else if (!this.editing && this.clearButtonMode == UITextFieldViewMode.unlessEditing) {
                return true
            }
            else if (this.editing && this.clearButtonMode == UITextFieldViewMode.whileEditing && this.text && this.text.length > 0) {
                return true
            }
            return false
        })()
        const displayRightView = (() => {
            if (displayClearButton) {
                return false
            }
            if (this.rightView == null) { return false }
            if (this.rightViewMode == UITextFieldViewMode.always) {
                return true
            }
            else if (!this.editing && this.rightViewMode == UITextFieldViewMode.unlessEditing) {
                return true
            }
            else if (this.editing && this.rightViewMode == UITextFieldViewMode.whileEditing) {
                return true
            }
            return false
        })()
        const displayLeftView = (() => {
            if (this.leftView == null) { return false }
            if (this.leftViewMode == UITextFieldViewMode.always) {
                return true
            }
            else if (!this.editing && this.leftViewMode == UITextFieldViewMode.unlessEditing) {
                return true
            }
            else if (this.editing && this.leftViewMode == UITextFieldViewMode.whileEditing) {
                return true
            }
            return false
        })()
        this.clearButtonView.hidden = !displayClearButton
        this.clearButtonView.frame = { x: this.bounds.width - 36.0, y: (this.bounds.height - 44.0) / 2.0, width: 36.0, height: 44.0 }
        if (displayLeftView) {
            if (this.leftView) {
                this.addSubview(this.leftView)
                this.leftView.frame = { x: 0.0, y: (this.bounds.height - this.leftView.frame.height) / 2.0, width: this.leftView.frame.width, height: this.leftView.frame.height }
            }
        }
        else {
            if (this.leftView) {
                this.leftView.removeFromSuperview()
            }
        }
        if (displayRightView) {
            if (this.rightView) {
                this.addSubview(this.rightView)
                this.rightView.frame = { x: this.bounds.width - this.rightView.frame.width, y: (this.bounds.height - this.rightView.frame.height) / 2.0, width: this.rightView.frame.width, height: this.rightView.frame.height }
            }
        }
        else {
            if (this.rightView) {
                this.rightView.removeFromSuperview()
            }
        }
        this.leftPadding = (displayLeftView && this.leftView !== undefined ? (this.leftView.frame.width + 1) : 0.0)
        this.rightPadding = (displayRightView && this.rightView ? (this.rightView.frame.width + 1) : 0.0) + (displayClearButton ? 36.0 : 0.0)
        this.markFlagDirty("leftPadding")
        this.markFlagDirty("rightPadding")
    }

    buildData() {
        let data = super.buildData()
        data.text = this.text
        data.placeholder = this.placeholder
        data.textStyle = `
        color: ${this._textColor !== undefined ? UIColor.toStyle(this._textColor) : "black"};
        font-size: ${this._font !== undefined ? this._font.pointSize : 14}px;
        font-family: ${this._font !== undefined ? this._font.fontName : ""}; 
        font-weight: ${this._font !== undefined ? this._font.fontStyle : ""}; 
        font-style: ${this._font !== undefined ? this._font.fontStyle : ""}; 
        text-align: ${(() => {
                switch (this._textAlignment) {
                    case UITextAlignment.left:
                        return "left"
                    case UITextAlignment.center:
                        return "center"
                    case UITextAlignment.right:
                        return "right"
                }
                return "left"
            })()};
        `
        data.requireFocus = this.editing
        data.secureTextEntry = this.secureTextEntry
        data.keyboardType = (() => {
            switch (this.keyboardType) {
                case UIKeyboardType.numberPad:
                    return "number"
                case UIKeyboardType.decimalPad:
                    return "digit"
            }
            return "text"
        })()
        data.returnKeyType = (() => {
            switch (this.returnKeyType) {
                case UIReturnKeyType.default:
                    return "done"
                case UIReturnKeyType.done:
                    return "done"
                case UIReturnKeyType.go:
                    return "go"
                case UIReturnKeyType.next:
                    return "next"
                case UIReturnKeyType.send:
                    return "send"
            }
            return "done"
        })
        data.leftPadding = this.leftPadding
        data.rightPadding = this.rightPadding
        return data
    }

}