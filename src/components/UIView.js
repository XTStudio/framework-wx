"use strict";
// xt-framework/uiview.js
Object.defineProperty(exports, "__esModule", { value: true });
const emptyAnimation = (() => {
    let animation = wx.createAnimation({ duration: 0 });
    animation.step();
    return animation.export();
})();
class UIViewElement {
    static componentPropsChanged(owner, elementClazz, newProps) {
        if (newProps === undefined || newProps === null) {
            return;
        }
        if (newProps.isDirty !== true && owner.el !== undefined) {
            return;
        }
        if (owner.el === undefined) {
            owner.el = new elementClazz(owner);
        }
        const animation = owner.el.buildAnimation();
        if (animation !== undefined) {
            owner.setData({
                animation: owner.el.buildAnimation(),
            });
        }
        else {
            owner.setData(Object.assign({
                animation: owner.data.animation !== undefined && owner.data.animation !== emptyAnimation ? emptyAnimation : "",
                subviews: newProps.subviews,
            }, owner.el.buildProps()));
        }
    }
    constructor(component) {
        this.component = component;
    }
    getProps() {
        return this.component.properties.props || {};
    }
    buildProps() {
        return {
            style: this.buildStyle(),
        };
    }
    buildStyle() {
        const props = this.getProps();
        let styles = `
            position: absolute;
            left: ${props._frame.x}px;
            top: ${props._frame.y}px;
            width: ${props._frame.width}px;
            height: ${props._frame.height}px; 
        `;
        if (props._backgroundColor !== undefined) {
            styles += `background-color: ${UIColor.toStyle(props._backgroundColor)};`;
        }
        if (props._alpha < 1.0) {
            styles += `opacity: ${props._alpha};`;
        }
        if (props._hidden) {
            styles += `display: none;`;
        }
        if (props._clipsToBounds) {
            styles += "overflow: hidden;";
        }
        if (!UIAffineTransformIsIdentity(props._transform)) {
            styles += `transform: ${'matrix(' + props._transform.a + ', ' + props._transform.b + ', ' + props._transform.c + ', ' + props._transform.d + ', ' + props._transform.tx + ', ' + props._transform.ty + ')'};`;
        }
        if (props._layer) {
            if (props._layer._cornerRadius > 0) {
                styles += `border-radius: ${props._layer._cornerRadius}px;`;
            }
        }
        return styles;
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
class UIViewComponent {
    constructor() {
        this.properties = {
            props: {
                type: Object,
                value: {},
                observer: function (newVal, oldVal) {
                    UIViewElement.componentPropsChanged(this, UIViewElement, newVal);
                }
            },
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
exports.UIColor = UIColor;
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
