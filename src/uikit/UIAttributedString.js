"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UIRect_1 = require("./UIRect");
const UIColor_1 = require("./UIColor");
const UIFont_1 = require("./UIFont");
const UIEnums_1 = require("./UIEnums");
const TextMeasurer_1 = require("./helpers/TextMeasurer");
class UIAttributedStringKey {
}
UIAttributedStringKey.foregroundColor = "foregroundColor"; // value: UIColor
UIAttributedStringKey.font = "font"; // value: UIFont
UIAttributedStringKey.backgroundColor = "backgroundColor"; // value: UIColor
UIAttributedStringKey.kern = "kern"; // value: number
UIAttributedStringKey.strikethroughStyle = "strikethroughStyle"; // value: number
UIAttributedStringKey.underlineStyle = "underlineStyle"; // value: number
UIAttributedStringKey.strokeColor = "strokeColor"; // value: UIColor
UIAttributedStringKey.strokeWidth = "strokeWidth"; // value: number
UIAttributedStringKey.underlineColor = "underlineColor"; // value: UIColor
UIAttributedStringKey.strikethroughColor = "strikethroughColor"; // value: UIColor
UIAttributedStringKey.paragraphStyle = "paragraphStyle"; // value: UIParagraphStyle
exports.UIAttributedStringKey = UIAttributedStringKey;
class UIParagraphStyle {
    constructor() {
        this.lineSpacing = 0.0;
        this.alignment = UIEnums_1.UITextAlignment.left;
        this.lineBreakMode = UIEnums_1.UILineBreakMode.truncatingTail;
        this.minimumLineHeight = 0.0;
        this.maximumLineHeight = 0.0;
        this.lineHeightMultiple = 0.0;
    }
}
exports.UIParagraphStyle = UIParagraphStyle;
class Character {
    constructor(letter, attributes) {
        this.letter = letter;
        this.attributes = attributes;
    }
}
class SpanElement {
    constructor() {
        this.innerText = "";
        this.style = "";
        this.children = [];
    }
    appendChild(child) {
        this.children.push(child);
    }
    toHTMLString() {
        return `<span style="${this.style}">${this.innerText}${this.children.map(it => it.toHTMLString()).join("")}</span>`;
    }
}
class UIAttributedString {
    constructor(str, attributes) {
        this.str = str;
        this.attributes = attributes;
        this.charSequences = [];
        this.charSequences = Array.from(str).map(it => {
            return new Character(it, Object.assign({}, attributes));
        });
    }
    measure(inSize) {
        return UIRect_1.UIRectZero;
    }
    measureAsync(inSize) {
        return TextMeasurer_1.TextMeasurer.measureAttributedText(this, inSize);
    }
    mutable() {
        const mutableString = new UIMutableAttributedString("", this.attributes);
        mutableString.charSequences = this.charSequences.map(it => {
            return new Character(it.letter, Object.assign({}, it.attributes));
        });
        return mutableString;
    }
    toHTMLText() {
        const spanElement = new SpanElement;
        let currentElement = new SpanElement;
        let currentAttributes = "";
        this.charSequences.forEach(it => {
            const attributes = JSON.stringify(it.attributes);
            if (currentAttributes !== attributes) {
                if (currentElement.innerText.length > 0) {
                    spanElement.appendChild(currentElement);
                }
                currentElement = new SpanElement;
                currentAttributes = attributes;
                this.setSpanStyle(currentElement, it.attributes, spanElement);
            }
            currentElement.innerText += it.letter;
        });
        if (currentElement.innerText.length > 0) {
            spanElement.appendChild(currentElement);
        }
        return spanElement.toHTMLString();
    }
    setSpanStyle(spanElement, attributes, rootElement) {
        {
            const value = attributes[UIAttributedStringKey.foregroundColor];
            if (value instanceof UIColor_1.UIColor) {
                spanElement.style += `color: ${value.toStyle()};`;
            }
        }
        {
            const value = attributes[UIAttributedStringKey.font];
            if (value instanceof UIFont_1.UIFont) {
                spanElement.style += `
                font-size: ${value.pointSize.toString()}px;
                font-family: ${typeof value.fontName === "string" ? value.fontName : "unset"};
                font-weight: ${typeof value.fontStyle === "string" ? value.fontStyle : "unset"};
                font-style: ${typeof value.fontStyle === "string" ? value.fontStyle : "unset"};
                `;
            }
        }
        {
            const value = attributes[UIAttributedStringKey.backgroundColor];
            if (value instanceof UIColor_1.UIColor) {
                spanElement.style += `background-color: ${value.toStyle()};`;
            }
        }
        {
            const value = attributes[UIAttributedStringKey.kern];
            if (typeof value === "number") {
                spanElement.style += `letter-spacing: ${value}px;`;
            }
        }
        {
            const value = attributes[UIAttributedStringKey.strikethroughStyle];
            if (value === 1) {
                spanElement.style += `text-decoration-line: line-through;`;
                const colorValue = attributes[UIAttributedStringKey.strikethroughColor];
                if (colorValue instanceof UIColor_1.UIColor) {
                    spanElement.style += `text-decoration-color: ${colorValue.toStyle()};`;
                }
            }
        }
        {
            const value = attributes[UIAttributedStringKey.underlineStyle];
            if (value === 1) {
                spanElement.style += `text-decoration-line: underline;`;
                const colorValue = attributes[UIAttributedStringKey.underlineColor];
                if (colorValue instanceof UIColor_1.UIColor) {
                    spanElement.style += `text-decoration-color: ${colorValue.toStyle()};`;
                }
            }
        }
        {
            const value = attributes[UIAttributedStringKey.strokeWidth];
            if (typeof value === "number" && value !== 0) {
                spanElement.style += `-webkit-text-stroke-width: ${value}px;`;
                const colorValue = attributes[UIAttributedStringKey.strokeColor];
                if (colorValue instanceof UIColor_1.UIColor) {
                    spanElement.style += `-webkit-text-stroke-color: ${colorValue.toStyle()};`;
                }
            }
        }
        {
            const value = attributes[UIAttributedStringKey.paragraphStyle];
            if (value instanceof UIParagraphStyle) {
                switch (value.alignment) {
                    case UIEnums_1.UITextAlignment.left:
                        rootElement.style += `text-align: left;`;
                        break;
                    case UIEnums_1.UITextAlignment.center:
                        rootElement.style += `text-align: center;`;
                        break;
                    case UIEnums_1.UITextAlignment.right:
                        rootElement.style += `text-align: right;`;
                        break;
                }
                const lineHeight = value.minimumLineHeight || value.maximumLineHeight || 0;
                if (lineHeight > 0) {
                    rootElement.style += `line-height: ${lineHeight}px;`;
                }
            }
        }
    }
}
exports.UIAttributedString = UIAttributedString;
class UIMutableAttributedString extends UIAttributedString {
    constructor(str, attributes) {
        super(str, attributes);
        this.str = str;
        this.attributes = attributes;
    }
    replaceCharacters(inRange, withString) {
        const replacingChars = Array.from(withString).map((it, index) => {
            if (index < inRange.length) {
                return new Character(it, this.charSequences[inRange.location + index].attributes);
            }
            else {
                return new Character(it, this.charSequences[inRange.location + inRange.length - 1].attributes);
            }
        });
        const spliceArguments = replacingChars.slice();
        spliceArguments.unshift(inRange.length);
        spliceArguments.unshift(inRange.location);
        this.charSequences.splice.apply(this.charSequences, spliceArguments);
    }
    setAttributes(attributes, range) {
        for (let index = range.location; index < range.location + range.length; index++) {
            this.charSequences[index].attributes = Object.assign({}, attributes);
        }
    }
    addAttribute(attrName, value, range) {
        for (let index = range.location; index < range.location + range.length; index++) {
            this.charSequences[index].attributes[attrName] = value;
        }
    }
    addAttributes(attributes, range) {
        for (let index = range.location; index < range.location + range.length; index++) {
            for (const attrName in attributes) {
                this.charSequences[index].attributes[attrName] = attributes[attrName];
            }
        }
    }
    removeAttribute(attrName, range) {
        for (let index = range.location; index < range.location + range.length; index++) {
            delete this.charSequences[index].attributes[attrName];
        }
    }
    replaceCharactersWithAttributedString(inRange, withAttributedString) {
        const spliceArguments = withAttributedString.charSequences.slice();
        spliceArguments.unshift(inRange.length);
        spliceArguments.unshift(inRange.location);
        this.charSequences.splice.apply(this.charSequences, spliceArguments);
    }
    insertAttributedString(attributedString, atIndex) {
        const spliceArguments = attributedString.charSequences.slice();
        spliceArguments.unshift(0);
        spliceArguments.unshift(atIndex);
        this.charSequences.splice.apply(this.charSequences, spliceArguments);
    }
    appendAttributedString(attributedString) {
        attributedString.charSequences.forEach(it => {
            this.charSequences.push(it);
        });
    }
    deleteCharacters(inRange) {
        this.charSequences.splice(inRange.location, inRange.length);
    }
    immutable() {
        const immutableString = new UIAttributedString("", this.attributes);
        immutableString.charSequences = this.charSequences.map(it => {
            return new Character(it.letter, Object.assign({}, it.attributes));
        });
        return immutableString;
    }
}
exports.UIMutableAttributedString = UIMutableAttributedString;
