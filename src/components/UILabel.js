"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UIView_1 = require("./UIView");
class UILabelElement extends UIView_1.UIViewElement {
    buildProps() {
        const props = this.getProps();
        return Object.assign({}, super.buildProps(), { text: props._text !== undefined ? props._text : "", textStyle: `
            line-height: 1.0;
            color: ${props._textColor !== undefined ? UIView_1.UIColor.toStyle(props._textColor) : "black"};
            font-size: ${props._font !== undefined ? props._font.pointSize : 14}px;
            font-family: ${props._font !== undefined ? props._font.fontName : ""}; 
            font-weight: ${props._font !== undefined ? props._font.fontStyle : ""}; 
            font-style: ${props._font !== undefined ? props._font.fontStyle : ""}; 
            text-align: ${(() => {
                switch (props._textAlignment) {
                    case UITextAlignment.left:
                        return "left";
                    case UITextAlignment.center:
                        return "center";
                    case UITextAlignment.right:
                        return "right";
                }
                return "left";
            })()};
            ${(() => {
                if (props._numberOfLines === 1) {
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
            ` });
    }
}
exports.UILabelElement = UILabelElement;
class UILabelComponent extends UIView_1.UIViewComponent {
}
exports.UILabelComponent = UILabelComponent;
Component(new UILabelComponent());
var UITextAlignment;
(function (UITextAlignment) {
    UITextAlignment[UITextAlignment["left"] = 0] = "left";
    UITextAlignment[UITextAlignment["center"] = 1] = "center";
    UITextAlignment[UITextAlignment["right"] = 2] = "right";
})(UITextAlignment || (UITextAlignment = {}));
