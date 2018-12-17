import { UIViewElement, UIColor } from "./UIView";

export class UILabelElement extends UIViewElement {

    buildProps() {
        const props = this.getProps()
        return {
            ... super.buildProps(),
            text: props._text !== undefined ? props._text : "",
            textStyle: `
            line-height: 1.0;
            color: ${props._textColor !== undefined ? UIColor.toStyle(props._textColor) : "black"};
            font-size: ${props._font !== undefined ? props._font.pointSize : 14}px;
            font-family: ${props._font !== undefined ? props._font.fontName : ""}; 
            font-weight: ${props._font !== undefined ? props._font.fontStyle : ""}; 
            font-style: ${props._font !== undefined ? props._font.fontStyle : ""}; 
            text-align: ${(() => {
                    switch (props._textAlignment) {
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
                if (props._numberOfLines === 1)  {
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
            `
        }
    }

}

export class UILabelComponent {

    properties = {
        props: {
            type: Object,
            value: {},
            observer: function (newVal: any, oldVal: any) {
                UIViewElement.componentPropsChanged(this as any, UILabelElement, newVal)
            }
        }
    }

}

Component(new UILabelComponent())

enum UITextAlignment {
    left,
    center,
    right,
}