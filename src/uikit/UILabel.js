"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UIView_1 = require("./UIView");
const UIColor_1 = require("./UIColor");
const UIEnums_1 = require("./UIEnums");
class UILabel extends UIView_1.UIView {
    constructor() {
        super(...arguments);
        this.clazz = "UILabel";
        this._text = undefined;
        this._attributedText = undefined;
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
        this.markFlagDirty("text", "richText");
    }
    get attributedText() {
        return this._attributedText;
    }
    set attributedText(value) {
        if (this._attributedText === value) {
            return;
        }
        this._attributedText = value;
        this.markFlagDirty("text", "richText");
    }
    get font() {
        return this._font;
    }
    set font(value) {
        if (this._font === value) {
            return;
        }
        this._font = value;
        this.markFlagDirty("textStyle");
    }
    get textColor() {
        return this._textColor;
    }
    set textColor(value) {
        if (this._textColor === value) {
            return;
        }
        this._textColor = value;
        this.markFlagDirty("textStyle");
    }
    get textAlignment() {
        return this._textAlignment;
    }
    set textAlignment(value) {
        if (this._textAlignment === value) {
            return;
        }
        this._textAlignment = value;
        this.markFlagDirty("textStyle");
    }
    get numberOfLines() {
        return this._numberOfLines;
    }
    set numberOfLines(value) {
        if (this._numberOfLines === value) {
            return;
        }
        this._numberOfLines = value;
        this.markFlagDirty("textStyle");
    }
    // invalidate
    buildData() {
        let data = super.buildData();
        if (this.attributedText) {
            data.richText = this.attributedText.toHTMLText();
        }
        else {
            data.text = this._text !== undefined ? this._text : "";
        }
        data.textStyle = `
            line-height: 1.0;
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
            ${(() => {
            if (this._numberOfLines === 1) {
                return `
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: inline-block;
                    white-space: nowrap;
                    `;
            }
            else {
                return `
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    webkit-box-orient: vertical;
                    `;
            }
        })()}
        }`;
        return data;
    }
}
exports.UILabel = UILabel;
