// xt-framework/uiview.js

const emptyAnimation = (() => {
    let animation = wx.createAnimation({ duration: 0 })
    animation.step()
    return animation.export()
})()

export class UIViewElement {

    static componentPropsChanged(owner: WeApp.Page, elementClazz: typeof UIViewElement, newProps: any) {
        if (newProps === undefined || newProps === null) { return }
        if (newProps.isDirty !== true && owner.el !== undefined) { return }
        if (owner.el === undefined) {
            owner.el = new elementClazz(owner)
        }
        const animation = owner.el.buildAnimation()
        if (animation !== undefined) {
            owner.setData({
                animation: owner.el.buildAnimation(),
            })
        }
        else {
            owner.setData(Object.assign({
                animation: owner.data.animation !== undefined && owner.data.animation !== emptyAnimation ? emptyAnimation : "",
                subviews: newProps.subviews,
            }, owner.el.buildProps()))
        }
    }

    component: WeApp.Page

    constructor(component: WeApp.Page) {
        this.component = component
    }

    getProps(): any {
        return this.component.properties.props || {}
    }

    buildProps() {
        return {
            style: this.buildStyle(),
        }
    }

    buildStyle() {
        const props = this.getProps()
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
            ${props._extraStyles}
        `
    }

    buildAnimation() {
        const props = this.component.properties.props || {}
        if (Object.keys(props.animationValues).length > 0) {
            const animation = wx.createAnimation(props.animationProps)
            for (const animationKey in props.animationValues) {
                const endValue = props.animationValues[animationKey];
                if (animationKey === "alpha") {
                    animation.opacity(endValue)
                }
                else if (animationKey === "frame.x") {
                    animation.left(endValue)
                }
                else if (animationKey === "frame.y") {
                    animation.top(endValue)
                }
                else if (animationKey === "frame.width") {
                    animation.width(endValue)
                }
                else if (animationKey === "frame.height") {
                    animation.height(endValue)
                }
                else if (animationKey === "backgroundColor") {
                    animation.backgroundColor(UIColor.toStyle(props._backgroundColor))
                }
                else if (animationKey === "transform") {
                    animation.matrix(endValue.a, endValue.b, endValue.c, endValue.d, endValue.tx, endValue.ty)
                }
            }
            if (!UIAffineTransformIsIdentity(props._transform)) {
                animation.matrix(props._transform.a, props._transform.b, props._transform.c, props._transform.d, props._transform.tx, props._transform.ty)
            }
            animation.step()
            return animation.export()
        }
        else {
            return undefined
        }
    }

}

export class UIViewComponent {

    properties = {
        props: {
            type: Object,
            value: {},
            observer: function (newVal: any, oldVal: any) {
                UIViewElement.componentPropsChanged(this as any, UIViewElement, newVal)
            }
        },
    }

}

Component(new UIViewComponent)

// Helpers

export class UIColor {

    static toStyle(color: any): string {
        if (color === undefined) {
            return "transparent"
        }
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