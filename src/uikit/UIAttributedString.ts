import { UIRectZero, UIRect } from "./UIRect";
import { UISize } from "./UISize";
import { UIColor } from "./UIColor";
import { UIFont } from "./UIFont";
import { UIRange } from "./UIRange";
import { UILineBreakMode, UITextAlignment } from "./UIEnums";
import { TextMeasurer } from "./helpers/TextMeasurer";

export class UIAttributedStringKey {
    static foregroundColor = "foregroundColor"        // value: UIColor
    static font = "font"                              // value: UIFont
    static backgroundColor = "backgroundColor"        // value: UIColor
    static kern = "kern"                              // value: number
    static strikethroughStyle = "strikethroughStyle"  // value: number
    static underlineStyle = "underlineStyle"          // value: number
    static strokeColor = "strokeColor"                // value: UIColor
    static strokeWidth = "strokeWidth"                // value: number
    static underlineColor = "underlineColor"          // value: UIColor
    static strikethroughColor = "strikethroughColor"  // value: UIColor
    static paragraphStyle = "paragraphStyle"          // value: UIParagraphStyle
}

export class UIParagraphStyle {

    lineSpacing: number = 0.0
    alignment: UITextAlignment = UITextAlignment.left
    lineBreakMode: UILineBreakMode = UILineBreakMode.truncatingTail
    minimumLineHeight: number = 0.0
    maximumLineHeight: number = 0.0
    lineHeightMultiple: number = 0.0

}

class Character {

    constructor(readonly letter: string, public attributes: { [key: string]: any }) { }

}

class SpanElement {

    innerText: string = ""
    style: string = ""

    children: SpanElement[] = []

    appendChild(child: SpanElement) {
        this.children.push(child)
    }

    toHTMLString(): string {
        return `<span style="${this.style}">${this.innerText}${this.children.map(it => it.toHTMLString()).join("")}</span>`
    }

}

export class UIAttributedString {

    charSequences: Character[] = []

    constructor(readonly str: string, readonly attributes: { [key: string]: any }) {
        this.charSequences = Array.from(str).map(it => {
            return new Character(it, { ...attributes })
        })
    }

    measure(inSize: UISize): UIRect {
        return UIRectZero
    }

    measureAsync(inSize: UISize): Promise<UIRect> {
        return TextMeasurer.measureAttributedText(this, inSize)
    }

    mutable(): UIMutableAttributedString {
        const mutableString = new UIMutableAttributedString("", this.attributes)
        mutableString.charSequences = this.charSequences.map(it => {
            return new Character(it.letter, { ...it.attributes })
        })
        return mutableString
    }

    toHTMLText(): string {
        const spanElement = new SpanElement
        let currentElement = new SpanElement
        let currentAttributes = ""
        this.charSequences.forEach(it => {
            const attributes = JSON.stringify(it.attributes)
            if (currentAttributes !== attributes) {
                if (currentElement.innerText.length > 0) {
                    spanElement.appendChild(currentElement)
                }
                currentElement = new SpanElement
                currentAttributes = attributes
                this.setSpanStyle(currentElement, it.attributes, spanElement)
            }
            currentElement.innerText += it.letter
        })
        if (currentElement.innerText.length > 0) {
            spanElement.appendChild(currentElement)
        }
        return spanElement.toHTMLString()
    }

    setSpanStyle(spanElement: SpanElement, attributes: { [key: string]: any }, rootElement: SpanElement) {
        {
            const value = attributes[UIAttributedStringKey.foregroundColor]
            if (value instanceof UIColor) {
                spanElement.style += `color: ${value.toStyle()};`
            }
        }
        {
            const value = attributes[UIAttributedStringKey.font]
            if (value instanceof UIFont) {
                spanElement.style += `
                font-size: ${value.pointSize.toString()}px;
                font-family: ${typeof value.fontName === "string" ? value.fontName : "unset"};
                font-weight: ${typeof value.fontStyle === "string" ? value.fontStyle : "unset"};
                font-style: ${typeof value.fontStyle === "string" ? value.fontStyle : "unset"};
                `
            }
        }
        {
            const value = attributes[UIAttributedStringKey.backgroundColor]
            if (value instanceof UIColor) {
                spanElement.style += `background-color: ${value.toStyle()};`
            }
        }
        {
            const value = attributes[UIAttributedStringKey.kern]
            if (typeof value === "number") {
                spanElement.style += `letter-spacing: ${value}px;`
            }
        }
        {
            const value = attributes[UIAttributedStringKey.strikethroughStyle]
            if (value === 1) {
                spanElement.style += `text-decoration-line: line-through;`
                const colorValue = attributes[UIAttributedStringKey.strikethroughColor]
                if (colorValue instanceof UIColor) {
                    spanElement.style += `text-decoration-color: ${colorValue.toStyle()};`
                }
            }
        }
        {
            const value = attributes[UIAttributedStringKey.underlineStyle]
            if (value === 1) {
                spanElement.style += `text-decoration-line: underline;`
                const colorValue = attributes[UIAttributedStringKey.underlineColor]
                if (colorValue instanceof UIColor) {
                    spanElement.style += `text-decoration-color: ${colorValue.toStyle()};`
                }
            }
        }
        {
            const value = attributes[UIAttributedStringKey.strokeWidth]
            if (typeof value === "number" && value !== 0) {
                spanElement.style += `-webkit-text-stroke-width: ${value}px;`
                const colorValue = attributes[UIAttributedStringKey.strokeColor]
                if (colorValue instanceof UIColor) {
                    spanElement.style += `-webkit-text-stroke-color: ${colorValue.toStyle()};`
                }
            }
        }
        {
            const value = attributes[UIAttributedStringKey.paragraphStyle]
            if (value instanceof UIParagraphStyle) {
                switch (value.alignment) {
                    case UITextAlignment.left:
                        rootElement.style += `text-align: left;`
                        break
                    case UITextAlignment.center:
                        rootElement.style += `text-align: center;`
                        break
                    case UITextAlignment.right:
                        rootElement.style += `text-align: right;`
                        break
                }
                const lineHeight = value.minimumLineHeight || value.maximumLineHeight || 0
                if (lineHeight > 0) {
                    rootElement.style += `line-height: ${lineHeight}px;`
                }
            }
        }
    }

}

export class UIMutableAttributedString extends UIAttributedString {

    constructor(readonly str: string, readonly attributes: { [key: string]: any }) {
        super(str, attributes)
    }

    replaceCharacters(inRange: UIRange, withString: string) {
        const replacingChars = Array.from(withString).map((it, index) => {
            if (index < inRange.length) {
                return new Character(it, this.charSequences[inRange.location + index].attributes)
            }
            else {
                return new Character(it, this.charSequences[inRange.location + inRange.length - 1].attributes)
            }
        })
        const spliceArguments: any[] = replacingChars.slice()
        spliceArguments.unshift(inRange.length)
        spliceArguments.unshift(inRange.location)
        this.charSequences.splice.apply(this.charSequences, spliceArguments as any)
    }

    setAttributes(attributes: { [key: string]: any }, range: UIRange) {
        for (let index = range.location; index < range.location + range.length; index++) {
            this.charSequences[index].attributes = { ...attributes }
        }
    }

    addAttribute(attrName: string, value: any, range: UIRange) {
        for (let index = range.location; index < range.location + range.length; index++) {
            this.charSequences[index].attributes[attrName] = value
        }
    }

    addAttributes(attributes: { [key: string]: any }, range: UIRange) {
        for (let index = range.location; index < range.location + range.length; index++) {
            for (const attrName in attributes) {
                this.charSequences[index].attributes[attrName] = attributes[attrName]
            }
        }
    }

    removeAttribute(attrName: string, range: UIRange) {
        for (let index = range.location; index < range.location + range.length; index++) {
            delete this.charSequences[index].attributes[attrName]
        }
    }

    replaceCharactersWithAttributedString(inRange: UIRange, withAttributedString: UIAttributedString) {
        const spliceArguments: any[] = withAttributedString.charSequences.slice()
        spliceArguments.unshift(inRange.length)
        spliceArguments.unshift(inRange.location)
        this.charSequences.splice.apply(this.charSequences, spliceArguments as any)
    }

    insertAttributedString(attributedString: UIAttributedString, atIndex: number) {
        const spliceArguments: any[] = attributedString.charSequences.slice()
        spliceArguments.unshift(0)
        spliceArguments.unshift(atIndex)
        this.charSequences.splice.apply(this.charSequences, spliceArguments as any)
    }

    appendAttributedString(attributedString: UIAttributedString) {
        attributedString.charSequences.forEach(it => {
            this.charSequences.push(it)
        })
    }

    deleteCharacters(inRange: UIRange) {
        this.charSequences.splice(inRange.location, inRange.length)
    }

    immutable(): UIAttributedString {
        const immutableString = new UIAttributedString("", this.attributes)
        immutableString.charSequences = this.charSequences.map(it => {
            return new Character(it.letter, { ...it.attributes })
        })
        return immutableString
    }

}