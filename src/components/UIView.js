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
    transform: ${UIAffineTransformIsIdentity(props._transform) ? "matrix()" : 'matrix(' + props._transform.a + ', ' + props._transform.b + ', ' + props._transform.c + ', ' + props._transform.d + ', ' + props._transform.tx + ', ' + props._transform.ty + ')'};
    `;
    }
    buildAnimation() {
        const props = this.component.properties.props || {};
        if (Object.keys(props.animationValues).length > 0) {
            const animation = wx.createAnimation(props.animationProps);
            for (const animationKey in props.animationValues) {
                const endValue = props.animationValues[animationKey];
                if (animationKey === "alpha") {
                    animation.opacity(endValue);
                }
                else if (animationKey === "frame.x") {
                    animation.left(endValue);
                }
                else if (animationKey === "frame.y") {
                    animation.top(endValue);
                }
                else if (animationKey === "frame.width") {
                    animation.width(endValue);
                }
                else if (animationKey === "frame.height") {
                    animation.height(endValue);
                }
                else if (animationKey === "backgroundColor") {
                    animation.backgroundColor(UIColor.toStyle(props._backgroundColor));
                }
                else if (animationKey === "transform") {
                    animation.matrix(endValue.a, endValue.b, endValue.c, endValue.d, endValue.tx, endValue.ty);
                }
            }
            if (!UIAffineTransformIsIdentity(props._transform)) {
                animation.matrix(props._transform.a, props._transform.b, props._transform.c, props._transform.d, props._transform.tx, props._transform.ty);
            }
            animation.step();
            return animation.export();
        }
        else {
            return undefined;
        }
    }
}
exports.UIViewElement = UIViewElement;
const emptyAnimation = (() => {
    let animation = wx.createAnimation({ duration: 0 });
    animation.step();
    return animation.export();
})();
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
                    var self = this;
                    if (newVal.isDirty !== true && self.el !== undefined) {
                        return;
                    }
                    if (self.el === undefined) {
                        self.el = new UIViewElement(self);
                    }
                    const animation = self.el.buildAnimation();
                    if (animation !== undefined) {
                        self.setData({
                            animation: self.el.buildAnimation(),
                        });
                    }
                    else {
                        self.setData({
                            style: self.el.buildStyle(),
                            animation: self.data.animation !== undefined && self.data.animation !== emptyAnimation ? emptyAnimation : "",
                            subviews: newVal.subviews,
                        });
                    }
                }
            },
        };
        this.data = {
            style: ''
        };
    }
}
exports.UIViewComponent = UIViewComponent;
Component(new UIViewComponent);
// Helpers
class UIColor {
    static toStyle(color) {
        if (color === undefined) {
            return "transparent";
        }
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
