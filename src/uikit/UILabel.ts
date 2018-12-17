import { UIView } from "./UIView";
import { UIFont } from "./UIFont";
import { UIColor } from "./UIColor";
import { UITextAlignment } from "./UIEnums";

export class UILabel extends UIView {

    clazz = "UILabel"

    private _text: string | undefined = undefined

    public get text(): string | undefined {
        return this._text;
    }

    public set text(value: string | undefined) {
        if (this._text === value) { return }
        this._text = value;
        this.invalidate()
    }

    private _font: UIFont | undefined = undefined

    public get font(): UIFont | undefined {
        return this._font;
    }

    public set font(value: UIFont | undefined) {
        if (this._font === value) { return }
        this._font = value;
        this.invalidate()
    }

    private _textColor: UIColor | undefined = undefined

    public get textColor(): UIColor | undefined {
        return this._textColor;
    }

    public set textColor(value: UIColor | undefined) {
        if (this._textColor === value) { return }
        this._textColor = value;
        this.invalidate()
    }

    private _textAlignment: UITextAlignment = UITextAlignment.left

    public get textAlignment(): UITextAlignment {
        return this._textAlignment;
    }

    public set textAlignment(value: UITextAlignment) {
        if (this._textAlignment === value) { return }
        this._textAlignment = value;
        this.invalidate()
    }
    
    private _numberOfLines: number = 1

    public get numberOfLines(): number {
        return this._numberOfLines;
    }

    public set numberOfLines(value: number) {
        if (this._numberOfLines === value) { return }
        this._numberOfLines = value;
        this.invalidate()
    }

}