"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// xt-framework/uiview.js
const UIRect_1 = require("./UIRect");
const UIColor_1 = require("./UIColor");
const UIAffineTransform_1 = require("./UIAffineTransform");
const Matrix_1 = require("./helpers/Matrix");
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
    background-color: ${props._backgroundColor !== undefined ? UIColor_1.UIColor.toStyle(props._backgroundColor) : 'transparent'};
    opacity: ${props._alpha};
    display: ${props._hidden ? "none" : ""};
    overflow: ${props._clipsToBounds ? "hidden" : ""};
    transform: ${UIAffineTransform_1.UIAffineTransformIsIdentity(props._transform) ? "" : 'matrix(' + props._transform.a + ', ' + props._transform.b + ', ' + props._transform.c + ', ' + props._transform.d + ', ' + props._transform.tx + ', ' + props._transform.ty + ')'};
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
exports.dirtyItems = [];
class UIView {
    constructor() {
        this.clazz = "UIView";
        this.isDirty = true;
        this.dataResponder = undefined;
        this._frame = UIRect_1.UIRectZero;
        this.bounds = UIRect_1.UIRectZero;
        this._transform = UIAffineTransform_1.UIAffineTransformIdentity;
        // hierarchy
        this.tag = 0;
        this.viewDelegate = undefined;
        this._superview = new WeakMap();
        this.subviews = [];
        this._clipsToBounds = false;
        this._hidden = false;
        // protected _contentMode: UIViewContentMode = UIViewContentMode.scaleToFill
        this._tintColor = undefined;
        this._alpha = 1.0;
        this._backgroundColor = undefined;
        this.invalidateCallHandler = undefined;
        exports.dirtyItems.push(this);
    }
    attach(dataResponder) {
        this.dataResponder = dataResponder;
        this.dataResponder();
    }
    set frame(value) {
        const boundsChanged = this._frame.width != value.width || this._frame.height != value.height;
        this._frame = value;
        if (boundsChanged) {
            this.bounds = { x: 0, y: 0, width: value.width, height: value.height };
            this.setNeedsLayout(true);
        }
        this.invalidate();
    }
    get frame() {
        return this.frame;
    }
    get center() {
        return { x: this.frame.x + this.frame.width / 2.0, y: this.frame.y + this.frame.height / 2.0 };
    }
    set center(value) {
        this.frame = { x: value.x - this.frame.width / 2.0, y: value.y - this.frame.height / 2.0, width: this.frame.width, height: this.frame.height };
    }
    get transform() {
        return this._transform;
    }
    set transform(value) {
        this._transform = value;
        this.invalidate();
    }
    get superview() {
        return this._superview.get(this);
    }
    set superview(value) {
        this._superview.set(this, value);
    }
    get window() {
        if (this instanceof UIWindow) {
            return this;
        }
        else if (this.superview) {
            return this.superview.window;
        }
        return undefined;
    }
    get viewController() {
        if (this.viewDelegate !== undefined) {
            return this.viewDelegate;
        }
        else if (this.superview) {
            return this.superview.viewController;
        }
        return undefined;
    }
    removeFromSuperview() {
        if (this.superview !== undefined) {
            const superview = this.superview;
            superview.willRemoveSubview(this);
            this.willMoveToSuperview(undefined);
            superview.subviews = this.superview.subviews.filter(it => it !== this);
            this.superview = undefined;
            superview.invalidate();
            this.didMoveToSuperview();
            this.didRemovedFromWindow();
        }
    }
    didRemovedFromWindow() {
        this.subviews.forEach(it => it.didRemovedFromWindow());
    }
    insertSubviewAtIndex(view, index) {
        if (view.superview !== undefined) {
            view.removeFromSuperview();
        }
        view.willMoveToSuperview(this);
        view.superview = this;
        this.subviews.splice(index, 0, view);
        this.invalidate();
        view.didMoveToSuperview();
        this.didAddSubview(view);
    }
    exchangeSubview(index1, index2) {
        const index2View = this.subviews[index2];
        this.subviews[index2] = this.subviews[index1];
        this.subviews[index1] = index2View;
        this.invalidate();
    }
    addSubview(view) {
        if (view.superview !== undefined) {
            view.removeFromSuperview();
        }
        view.willMoveToSuperview(this);
        if (this.window) {
            view.willMoveToWindow(this.window);
        }
        view.superview = this;
        this.subviews.push(view);
        this.invalidate();
        view.didMoveToSuperview();
        this.didAddSubview(view);
        view.didMoveToWindow();
    }
    insertSubviewBelowSubview(view, belowSubview) {
        let index = this.subviews.indexOf(belowSubview);
        if (index >= 0) {
            this.insertSubviewAtIndex(view, index);
        }
    }
    insertSubviewAboveSubview(view, aboveSubview) {
        let index = this.subviews.indexOf(aboveSubview);
        if (index >= 0) {
            this.insertSubviewAtIndex(view, index + 1);
        }
    }
    bringSubviewToFront(view) {
        let index = this.subviews.indexOf(view);
        if (index >= 0) {
            this.subviews.splice(index, 1);
            this.subviews.push(view);
            this.invalidate();
        }
    }
    sendSubviewToBack(view) {
        let index = this.subviews.indexOf(view);
        if (index >= 0) {
            this.subviews.splice(index, 1);
            this.subviews.unshift(view);
            this.invalidate();
        }
    }
    isDescendantOfView(view) {
        let current = this;
        while (current != undefined) {
            if (current == view) {
                return true;
            }
            current = current.superview;
        }
        return false;
    }
    viewWithTag(tag) {
        for (let index = 0; index < this.subviews.length; index++) {
            let element = this.subviews[index];
            if (element.tag === tag) {
                return element;
            }
            let target = element.viewWithTag(tag);
            if (target !== undefined) {
                return target;
            }
        }
        return undefined;
    }
    // Delegates
    didAddSubview(subview) {
        if (this.viewDelegate) {
            this.viewDelegate.didAddSubview(subview);
        }
    }
    willRemoveSubview(subview) { }
    willMoveToSuperview(newSuperview) { }
    didMoveToSuperview() {
        this.tintColorDidChange();
    }
    willMoveToWindow(window) {
        this.subviews.forEach(it => it.willMoveToWindow(window));
    }
    didMoveToWindow() {
        this.subviews.forEach(it => it.didMoveToWindow());
    }
    setNeedsLayout(layoutSubviews = false) {
        if (!layoutSubviews) {
            return;
        }
        this.layoutIfNeeded();
    }
    layoutIfNeeded() {
        this.layoutSubviews();
    }
    layoutSubviews() {
        if (this.viewDelegate) {
            this.viewDelegate.viewWillLayoutSubviews();
            this.viewDelegate.viewDidLayoutSubviews();
        }
    }
    // Rendering
    setNeedsDisplay() { }
    get clipsToBounds() {
        return this._clipsToBounds;
    }
    set clipsToBounds(value) {
        this._clipsToBounds = value;
        this.invalidate();
    }
    set hidden(value) {
        this._hidden = value;
        this.invalidate();
    }
    get hidden() {
        return this._hidden;
    }
    set tintColor(value) {
        this._tintColor = value;
        this.tintColorDidChange();
    }
    get tintColor() {
        return this._tintColor || (this.superview && this.superview.tintColor) || new UIColor_1.UIColor(0.0, 122.0 / 255.0, 1.0, 1.0);
    }
    tintColorDidChange() {
        this.subviews.forEach(it => it.tintColorDidChange());
    }
    set alpha(value) {
        this._alpha = value;
        this.invalidate();
    }
    get alpha() {
        return this._alpha;
    }
    set backgroundColor(value) {
        this._backgroundColor = value;
        this.invalidate();
    }
    get backgroundColor() {
        return this._backgroundColor;
    }
    invalidate(dirty = true) {
        if (dirty) {
            this.isDirty = true;
            exports.dirtyItems.push(this);
        }
        let nextResponder = this.nextResponder();
        if (nextResponder !== undefined) {
            nextResponder.invalidate(false);
        }
        else {
            if (this.invalidateCallHandler === undefined) {
                this.invalidateCallHandler = setTimeout(() => {
                    this.invalidateCallHandler = undefined;
                    if (this.dataResponder) {
                        this.dataResponder();
                        exports.dirtyItems.forEach(it => it.isDirty = false);
                        exports.dirtyItems = [];
                    }
                });
            }
        }
    }
    convertPointToView(point, toView) {
        const fromPoint = this.convertPointToWindow(point);
        if (!fromPoint) {
            return point;
        }
        if (toView instanceof UIWindow) {
            return fromPoint;
        }
        return toView.convertPointFromWindow(fromPoint) || point;
    }
    convertPointFromView(point, fromView) {
        return fromView.convertPointToView(point, this);
    }
    convertRectToView(rect, toView) {
        let lt = this.convertPointToView({ x: rect.x, y: rect.y }, toView);
        let rt = this.convertPointToView({ x: rect.x + rect.width, y: rect.y }, toView);
        let lb = this.convertPointToView({ x: rect.x, y: rect.y + rect.height }, toView);
        let rb = this.convertPointToView({ x: rect.x + rect.width, y: rect.y + rect.height }, toView);
        return {
            x: Math.min(lt.x, rt.x, lb.x, rb.x),
            y: Math.min(lt.y, rt.y, lb.y, rb.y),
            width: Math.max(lt.x, rt.x, lb.x, rb.x) - Math.min(lt.x, rt.x, lb.x, rb.x),
            height: Math.max(lt.y, rt.y, lb.y, rb.y) - Math.min(lt.y, rt.y, lb.y, rb.y),
        };
    }
    convertRectFromView(rect, fromView) {
        return fromView.convertRectToView(rect, this);
    }
    convertPointToWindow(point) {
        if (this.window === undefined) {
            return undefined;
        }
        var current = this;
        let currentPoint = { x: point.x, y: point.y };
        while (current !== undefined) {
            if (current instanceof UIWindow) {
                break;
            }
            if (!UIAffineTransform_1.UIAffineTransformIsIdentity(current.transform)) {
                const unmatrix = Matrix_1.Matrix.unmatrix(current.transform);
                const matrix2 = new Matrix_1.Matrix();
                matrix2.postTranslate(-(current.frame.width / 2.0), -(current.frame.height / 2.0));
                matrix2.postRotate(unmatrix.degree / (180.0 / Math.PI));
                matrix2.postScale(unmatrix.scale.x, unmatrix.scale.y);
                matrix2.postTranslate(unmatrix.translate.x, unmatrix.translate.y);
                matrix2.postTranslate((current.frame.width / 2.0), (current.frame.height / 2.0));
                const x = currentPoint.x;
                const y = currentPoint.y;
                currentPoint.x = x * matrix2.a + y * matrix2.c + matrix2.tx;
                currentPoint.y = x * matrix2.b + y * matrix2.d + matrix2.ty;
            }
            if (current.superview !== undefined && current.superview.isScrollerView === true) {
                currentPoint.x += -current.superview.domElement.scrollLeft;
                currentPoint.y += -current.superview.domElement.scrollTop;
            }
            currentPoint.x += current.frame.x;
            currentPoint.y += current.frame.y;
            current = current.superview;
        }
        return currentPoint;
    }
    convertPointFromWindow(point) {
        if (this.window == undefined) {
            return undefined;
        }
        var current = this;
        var routes = [];
        while (current !== undefined) {
            if (current instanceof UIWindow) {
                break;
            }
            routes.unshift(current);
            current = current.superview;
        }
        let currentPoint = { x: point.x, y: point.y };
        routes.forEach((it) => {
            if (it.superview !== undefined && it.superview.isScrollerView === true) {
                currentPoint.x -= -it.superview.domElement.scrollLeft;
                currentPoint.y -= -it.superview.domElement.scrollTop;
            }
            currentPoint.x -= it.frame.x;
            currentPoint.y -= it.frame.y;
            if (!UIAffineTransform_1.UIAffineTransformIsIdentity(it.transform)) {
                const unmatrix = Matrix_1.Matrix.unmatrix(it.transform);
                const matrix2 = new Matrix_1.Matrix();
                matrix2.postTranslate(-(it.frame.width / 2.0), -(it.frame.height / 2.0));
                matrix2.postRotate(unmatrix.degree / (180.0 / Math.PI));
                matrix2.postScale(unmatrix.scale.x, unmatrix.scale.y);
                matrix2.postTranslate(unmatrix.translate.x, unmatrix.translate.y);
                matrix2.postTranslate((it.frame.width / 2.0), (it.frame.height / 2.0));
                const id = 1 / ((matrix2.a * matrix2.d) + (matrix2.c * -matrix2.b));
                const x = currentPoint.x;
                const y = currentPoint.y;
                currentPoint.x = (matrix2.d * id * x) + (-matrix2.c * id * y) + (((matrix2.ty * matrix2.c) - (matrix2.tx * matrix2.d)) * id);
                currentPoint.y = (matrix2.a * id * y) + (-matrix2.b * id * x) + (((-matrix2.ty * matrix2.a) + (matrix2.tx * matrix2.b)) * id);
            }
        });
        return currentPoint;
    }
    nextResponder() {
        return this.viewDelegate || this.superview || undefined;
    }
}
exports.UIView = UIView;
class UIWindow extends UIView {
}
exports.UIWindow = UIWindow;
Component(new UIViewComponent());
