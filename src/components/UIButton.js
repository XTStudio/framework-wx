"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UIView_1 = require("./UIView");
class UIButtonComponent extends UIView_1.UIViewComponent {
    constructor() {
        super(...arguments);
        this.methods = {
            onImageLoaded: function (e) {
                this.setData({
                    imageWidth: e.detail.width / 2,
                    imageHeight: e.detail.width / 2,
                });
            }
        };
    }
}
exports.UIButtonComponent = UIButtonComponent;
Component(new UIButtonComponent);
