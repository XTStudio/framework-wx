"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UIView_1 = require("./UIView");
var UIViewContentMode;
(function (UIViewContentMode) {
    UIViewContentMode[UIViewContentMode["scaleToFill"] = 0] = "scaleToFill";
    UIViewContentMode[UIViewContentMode["scaleAspectFit"] = 1] = "scaleAspectFit";
    UIViewContentMode[UIViewContentMode["scaleAspectFill"] = 2] = "scaleAspectFill";
})(UIViewContentMode || (UIViewContentMode = {}));
class UIImageViewElement extends UIView_1.UIViewElement {
    buildProps() {
        let props = this.getProps();
        return Object.assign({}, super.buildProps(), { imageSource: props._image !== undefined ? props._image.imageSource : null, scaleMode: (() => {
                switch (props._contentMode) {
                    case UIViewContentMode.scaleToFill:
                        return "scaleToFill";
                    case UIViewContentMode.scaleAspectFit:
                        return "aspectFit";
                    case UIViewContentMode.scaleAspectFill:
                        return "aspectFill";
                }
                return "scaleToFill";
            })() });
    }
}
exports.UIImageViewElement = UIImageViewElement;
class UIImageViewComponent {
    constructor() {
        this.properties = {
            props: {
                type: Object,
                value: {},
                observer: function (newVal, oldVal) {
                    UIView_1.UIViewElement.componentPropsChanged(this, UIImageViewElement, newVal);
                }
            }
        };
    }
}
exports.UIImageViewComponent = UIImageViewComponent;
Component(new UIImageViewComponent);
