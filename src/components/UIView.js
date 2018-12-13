"use strict";
// xt-framework/uiview.js
Object.defineProperty(exports, "__esModule", { value: true });
class UIViewElement {
    constructor(component) {
        this.component = component;
    }
    buildStyle() {
        const props = this.component.properties.props || {};
        return `
    position: absolute;
    left: ${props._frame.x}px;
    top: ${props._frame.y}px;
    width: ${props._frame.width}px;
    height: ${props._frame.height}px; 
    background-color: ${props._backgroundColor !== undefined ? UIColor.toStyle(props._backgroundColor) : 'transparent'};
    opacity: ${props._alpha};
    display: ${props._hidden ? "none" : ""};
    overflow: ${props._clipsToBounds ? "hidden" : ""};
    transform: ${UIAffineTransformIsIdentity(props._transform) ? "" : 'matrix(' + props._transform.a + ', ' + props._transform.b + ', ' + props._transform.c + ', ' + props._transform.d + ', ' + props._transform.tx + ', ' + props._transform.ty + ')'};
    `;
    }
}
exports.UIViewElement = UIViewElement;
class UIViewComponent {
    constructor() {
        this.properties = {
            props: {
                type: Object,
                value: {},
                observer: function (newVal, oldVal) {
                    if (newVal === undefined || newVal === null) {
                        return;
                    }
                    if (newVal.isDirty !== true) {
                        return;
                    }
                    var self = this;
                    if (self.el === undefined) {
                        self.el = new UIViewElement(self);
                    }
                    self.setData({
                        style: self.el.buildStyle(),
                        subviews: newVal.subviews,
                    });
                }
            },
        };
        this.data = {
            style: ''
        };
    }
}
exports.UIViewComponent = UIViewComponent;
Component(new UIViewComponent());
// Helpers
class UIColor {
    static toStyle(color) {
        return 'rgba(' + (color.r * 255).toFixed(0) + ', ' + (color.g * 255).toFixed(0) + ', ' + (color.b * 255).toFixed(0) + ', ' + color.a.toFixed(6) + ')';
    }
}
const UIAffineTransformIdentity = { a: 1.0, b: 0.0, c: 0.0, d: 1.0, tx: 0.0, ty: 0.0 };
const UIAffineTransformEqualToTransform = function (t1, t2) {
    return Math.abs(t1.a - t2.a) < 0.001 &&
        Math.abs(t1.b - t2.b) < 0.001 &&
        Math.abs(t1.c - t2.c) < 0.001 &&
        Math.abs(t1.d - t2.d) < 0.001 &&
        Math.abs(t1.tx - t2.tx) < 0.001 &&
        Math.abs(t1.ty - t2.ty) < 0.001;
};
const UIAffineTransformIsIdentity = function (transform) {
    return UIAffineTransformEqualToTransform(transform, UIAffineTransformIdentity);
};
