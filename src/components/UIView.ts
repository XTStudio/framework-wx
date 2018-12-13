// xt-framework/uiview.js

export class UIViewElement {

    component: WeApp.Page

    constructor(component: WeApp.Page) {
        this.component = component
    }

    buildStyle() {
        const props = this.component.properties.props || {}
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
    `
    }

}

export class UIViewComponent {

    properties = {
        props: {
            type: Object,
            value: {},
            observer: function (newVal: any, oldVal: any) {
                if (newVal === undefined || newVal === null) { return }
                var self: WeApp.Page = this as any
                if (newVal.isDirty !== true && self.el !== undefined) { return }
                if (self.el === undefined) {
                    self.el = new UIViewElement(self)
                }
                self.setData({
                    style: self.el.buildStyle(),
                    subviews: newVal.subviews,
                })
            }
        },
    }

    data = {
        style: ''
    }

}

Component(new UIViewComponent)

// Helpers


class UIColor {

    static toStyle(color: any): string {
        return 'rgba(' + (color.r * 255).toFixed(0) + ', ' + (color.g * 255).toFixed(0) + ', ' + (color.b * 255).toFixed(0) + ', ' + color.a.toFixed(6) + ')'
    }

}

interface UIAffineTransform {
    readonly a: number,
    readonly b: number,
    readonly c: number,
    readonly d: number,
    readonly tx: number,
    readonly ty: number,
}

const UIAffineTransformIdentity: UIAffineTransform = { a: 1.0, b: 0.0, c: 0.0, d: 1.0, tx: 0.0, ty: 0.0 }

const UIAffineTransformEqualToTransform = function (t1: UIAffineTransform, t2: UIAffineTransform): boolean {
    return Math.abs(t1.a - t2.a) < 0.001 &&
        Math.abs(t1.b - t2.b) < 0.001 &&
        Math.abs(t1.c - t2.c) < 0.001 &&
        Math.abs(t1.d - t2.d) < 0.001 &&
        Math.abs(t1.tx - t2.tx) < 0.001 &&
        Math.abs(t1.ty - t2.ty) < 0.001
}

const UIAffineTransformIsIdentity = function (transform: UIAffineTransform) {
    return UIAffineTransformEqualToTransform(transform, UIAffineTransformIdentity)
}