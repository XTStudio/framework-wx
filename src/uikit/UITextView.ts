import { UIView } from "./UIView";
import { UIColor } from "./UIColor";
import { UIFont } from "./UIFont";
import { UITextAlignment, UITextFieldViewMode, UIControlState, UITextAutocapitalizationType, UITextAutocorrectionType, UITextSpellCheckingType, UIKeyboardType, UIReturnKeyType } from "./UIEnums";

export class UITextView extends UIView {

    clazz = "UITextField"

    private _text: string = ""

    public get text(): string {
        return this._text;
    }

    public set text(value: string) {
        this._text = value
        this.markFlagDirty("text")
    }

    textDidChanged() {}

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

    private _editable: boolean = true

    public get editable(): boolean {
        return this._editable
    }

    public set editable(value: boolean) {
        this._editable = value
        
    }

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
        if (value) {
            this.emit("didBeginEditing", this)
        }
        else {
            this.emit("didEndEditing", this)
        }
    }

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

    buildData() {
        let data = super.buildData()
        data.isTextView = true
        data.text = this.text
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
        return data
    }

}