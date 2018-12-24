import { UIView } from "./UIView";
import { UIFont } from "./UIFont";
import { UIColor } from "./UIColor";
import { UITextAlignment } from "./UIEnums";
import { UIAttributedString } from "./UIAttributedString";

export class UILabel extends UIView {

    clazz = "UILabel"

    private _text: string | undefined = undefined

    public get text(): string | undefined {
        return this._text;
    }

    public set text(value: string | undefined) {
        if (this._text === value) { return }
        this._text = value;
        this.markFlagDirty("text")
        this.markFlagDirty("richText")
    }

    private _attributedText: UIAttributedString | undefined = undefined

    public get attributedText(): UIAttributedString | undefined {
        return this._attributedText
    }

    public set attributedText(value: UIAttributedString | undefined) {
        if (this._attributedText === value) { return }
        this._attributedText = value
        this.markFlagDirty("text")
        this.markFlagDirty("richText")
    }

    private _font: UIFont | undefined = undefined

    public get font(): UIFont | undefined {
        return this._font;
    }

    public set font(value: UIFont | undefined) {
        if (this._font === value) { return }
        this._font = value;
        this.markFlagDirty("textStyle")
    }

    private _textColor: UIColor | undefined = undefined

    public get textColor(): UIColor | undefined {
        return this._textColor;
    }

    public set textColor(value: UIColor | undefined) {
        if (this._textColor === value) { return }
        this._textColor = value;
        this.markFlagDirty("textStyle")
    }

    private _textAlignment: UITextAlignment = UITextAlignment.left

    public get textAlignment(): UITextAlignment {
        return this._textAlignment;
    }

    public set textAlignment(value: UITextAlignment) {
        if (this._textAlignment === value) { return }
        this._textAlignment = value;
        this.markFlagDirty("textStyle")
    }

    private _numberOfLines: number = 1

    public get numberOfLines(): number {
        return this._numberOfLines;
    }

    public set numberOfLines(value: number) {
        if (this._numberOfLines === value) { return }
        this._numberOfLines = value;
        this.markFlagDirty("textStyle")
    }

    // invalidate

    buildExtras() {
        let data = super.buildExtras()
        if (this._attributedText) {
            data.richText = this._attributedText.toHTMLText()
        }
        else {
            data.text = this._text !== undefined ? this._text : ""
        }
        data.textStyle = `
            line-height: 1.0;
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
            ${(() => {
                if (this._numberOfLines === 1) {
                    return `
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: inline-block;
                    white-space: nowrap;
                    `
                }
                else {
                    return `
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    webkit-box-orient: vertical;
                    `
                }
            })()}
        }`
        return data
    }

}