"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UIRect_1 = require("./UIRect");
const UIAffineTransform_1 = require("./UIAffineTransform");
const Matrix_1 = require("./helpers/Matrix");
const UIColor_1 = require("./UIColor");
const UIWindowManager_1 = require("../components/UIWindowManager");
const UITouch_1 = require("./UITouch");
const UIEdgeInsets_1 = require("./UIEdgeInsets");
const MagicObject_1 = require("./helpers/MagicObject");
const UIAnimator_1 = require("./UIAnimator");
const UIViewManager_1 = require("../components/UIViewManager");
const EventEmitter_1 = require("../kimi/EventEmitter");
exports.dirtyItems = [];
class UIView extends EventEmitter_1.EventEmitter {
    constructor() {
        super();
        this.clazz = "UIView";
        this.isDirty = true;
        this.dataOwner = undefined;
        this.dataField = undefined;
        this.animationProps = {};
        this.animationValues = {};
        this._frame = UIRect_1.UIRectZero;
        this.bounds = UIRect_1.UIRectZero;
        this.touchAreaInsets = UIEdgeInsets_1.UIEdgeInsetsZero;
        this._transform = UIAffineTransform_1.UIAffineTransformIdentity;
        // hierarchy
        this.tag = 0;
        this._viewDelegate = new MagicObject_1.MagicObject();
        this._superview = new MagicObject_1.MagicObject();
        this.subviews = [];
        this._clipsToBounds = false;
        this._hidden = false;
        // protected _contentMode: UIViewContentMode = UIViewContentMode.scaleToFill
        this._tintColor = undefined;
        this._alpha = 1.0;
        this._backgroundColor = undefined;
        // GestureRecognizers
        this._userInteractionEnabled = true;
        this._gestureRecognizers = new MagicObject_1.MagicObject([]);
        this.invalidateCallHandler = undefined;
        UIViewManager_1.UIViewManager.shared.addView(this);
        exports.dirtyItems.push(this);
    }
    attach(dataOwner, dataField) {
        if (!(this instanceof UIWindow)) {
            const window = new UIWindow();
            window.attach(dataOwner, dataField, this);
        }
    }
    set frame(value) {
        if (UIRect_1.UIRectEqualToRect(this._frame, value)) {
            return;
        }
        if (UIAnimator_1.UIAnimator.activeAnimator !== undefined) {
            this.animationProps = UIAnimator_1.UIAnimator.activeAnimator.animationProps;
            if (Math.abs(this._frame.x - value.x) > 0.001) {
                this.animationValues["frame.x"] = value.x;
            }
            if (Math.abs(this._frame.y - value.y) > 0.001) {
                this.animationValues["frame.y"] = value.y;
            }
            if (Math.abs(this._frame.width - value.width) > 0.001) {
                this.animationValues["frame.width"] = value.width;
            }
            if (Math.abs(this._frame.height - value.height) > 0.001) {
                this.animationValues["frame.height"] = value.height;
            }
        }
        const boundsChanged = this._frame.width != value.width || this._frame.height != value.height;
        this._frame = value;
        if (boundsChanged) {
            this.bounds = { x: 0, y: 0, width: value.width, height: value.height };
            this.setNeedsLayout(true);
        }
        this.invalidate();
    }
    get frame() {
        return this._frame;
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
        if (UIAffineTransform_1.UIAffineTransformEqualToTransform(this._transform, value)) {
            return;
        }
        if (UIAnimator_1.UIAnimator.activeAnimator !== undefined) {
            this.animationProps = UIAnimator_1.UIAnimator.activeAnimator.animationProps;
            this.animationValues["transform"] = value;
        }
        this._transform = value;
        this.invalidate();
    }
    get viewDelegate() {
        return this._viewDelegate.get();
    }
    set viewDelegate(value) {
        this._viewDelegate.set(value);
    }
    get superview() {
        return this._superview.get();
    }
    set superview(value) {
        this._superview.set(value);
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
        view.invalidate();
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
        view.invalidate();
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
        if (this._clipsToBounds === value) {
            return;
        }
        this._clipsToBounds = value;
        this.invalidate();
    }
    set hidden(value) {
        if (this._hidden === value) {
            return;
        }
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
        if (this._alpha === value) {
            return;
        }
        if (UIAnimator_1.UIAnimator.activeAnimator !== undefined) {
            this.animationProps = UIAnimator_1.UIAnimator.activeAnimator.animationProps;
            this.animationValues["alpha"] = value;
        }
        this._alpha = value;
        this.invalidate();
    }
    get alpha() {
        return this._alpha;
    }
    set backgroundColor(value) {
        if (UIAnimator_1.UIAnimator.activeAnimator !== undefined) {
            this.animationProps = UIAnimator_1.UIAnimator.activeAnimator.animationProps;
            this.animationValues["backgroundColor"] = value;
        }
        this._backgroundColor = value;
        this.invalidate();
    }
    get backgroundColor() {
        return this._backgroundColor;
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
            if (current.superview !== undefined && current.superview.clazz === "UIScrollView") {
                currentPoint.x += -current.superview.contentOffset.x;
                currentPoint.y += -current.superview.contentOffset.y;
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
            if (it.superview !== undefined && it.superview.clazz === "UIScrollView") {
                currentPoint.x -= -it.superview.contentOffset.x;
                currentPoint.y -= -it.superview.contentOffset.y;
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
    get userInteractionEnabled() {
        return this._userInteractionEnabled;
    }
    set userInteractionEnabled(value) {
        if (this._userInteractionEnabled === value) {
            return;
        }
        this._userInteractionEnabled = value;
    }
    get gestureRecognizers() {
        return this._gestureRecognizers.get();
    }
    addGestureRecognizer(gestureRecognizer) {
        this.gestureRecognizers.push(gestureRecognizer);
    }
    removeGestureRecognizer(gestureRecognizer) {
        let index = this.gestureRecognizers.indexOf(gestureRecognizer);
        if (index >= 0) {
            this.gestureRecognizers.splice(index, 1);
        }
    }
    // Touches
    hitTest(point) {
        if (this.userInteractionEnabled && this.alpha > 0.0 && !this.hidden && this.pointInside(point)) {
            for (let index = this.subviews.length - 1; index >= 0; index--) {
                const it = this.subviews[index];
                const convertedPoint = it.convertPointFromView(point, this);
                const testedView = it.hitTest(convertedPoint);
                if (testedView !== undefined) {
                    return testedView;
                }
            }
            return this;
        }
        return undefined;
    }
    touchesBegan(touches) {
        this.gestureRecognizers.filter((it) => it.enabled).forEach((it) => {
            it.handleTouch(touches);
        });
        if (this.superview) {
            this.superview.touchesBegan(touches);
        }
    }
    touchesMoved(touches) {
        this.gestureRecognizers.filter((it) => it.enabled).forEach((it) => {
            it.handleTouch(touches);
        });
        if (this.superview) {
            this.superview.touchesMoved(touches);
        }
    }
    touchesEnded(touches) {
        this.gestureRecognizers.filter((it) => it.enabled).forEach((it) => {
            it.handleTouch(touches);
        });
        if (this.superview) {
            this.superview.touchesEnded(touches);
        }
    }
    touchesCancelled(touches) {
        this.gestureRecognizers.filter((it) => it.enabled).forEach((it) => {
            it.handleTouch(touches);
        });
        if (this.superview) {
            this.superview.touchesCancelled(touches);
        }
    }
    touchesWheel(delta) {
        if (this.superview) {
            this.superview.touchesWheel(delta);
        }
    }
    intrinsicContentSize() {
        return undefined;
    }
    pointInside(point) {
        return point.x >= 0.0 - this.touchAreaInsets.left &&
            point.y >= 0.0 - this.touchAreaInsets.top &&
            point.x <= this.frame.width + this.touchAreaInsets.right &&
            point.y <= this.frame.height + this.touchAreaInsets.bottom;
    }
    static get recognizedGesture() {
        return this._recognizedGesture;
    }
    static set recognizedGesture(value) {
        this._recognizedGesture = value;
        // if (value !== undefined) {
        //     if (value.enabled === false) { return }
        //     UIViewManager.shared.fetchViews().filter(it => it.clazz === "UIScrollView").forEach(it => {
        //         it.scrollDisabledTemporary = true
        //     })
        // }
        // else {
        //     UIViewManager.shared.fetchViews().filter(it => it.clazz === "UIScrollView").forEach(it => {
        //         it.scrollDisabledTemporary = false
        //     })
        // }
    }
    invalidate(dirty = true, force = false) {
        if (dirty) {
            this.isDirty = true;
            exports.dirtyItems.push(this);
        }
        let nextResponder = this.nextResponder();
        if (nextResponder !== undefined) {
            nextResponder.invalidate(true, force);
        }
        else {
            if (force) {
                if (this.dataOwner && this.dataField) {
                    this.dataOwner.setData({
                        [this.dataField]: this
                    });
                }
                exports.dirtyItems.forEach(it => {
                    it.isDirty = false;
                    it.animationProps = {};
                    it.animationValues = {};
                });
                exports.dirtyItems = [];
                return;
            }
            if (this.invalidateCallHandler === undefined) {
                this.invalidateCallHandler = setTimeout(() => {
                    this.invalidateCallHandler = undefined;
                    if (this.dataOwner && this.dataField) {
                        this.dataOwner.setData({
                            [this.dataField]: this
                        });
                    }
                    exports.dirtyItems.forEach(it => {
                        it.isDirty = false;
                        it.animationProps = {};
                        it.animationValues = {};
                    });
                    exports.dirtyItems = [];
                });
            }
        }
    }
}
exports.UIView = UIView;
class UIWindow extends UIView {
    constructor() {
        super();
        this.clazz = "UIWindow";
        // touches
        this.currentTouchesID = [];
        this._touches = new MagicObject_1.MagicObject({});
        this.upCount = new Map();
        this.upTimestamp = new Map();
        UIWindowManager_1.UIWindowManager.shared.addWindow(this);
    }
    attach(dataOwner, dataField, rootView = undefined) {
        if (rootView) {
            this.rootView = rootView;
            this.addSubview(rootView);
            this.layoutSubviews();
        }
        this.dataOwner = dataOwner;
        this.dataField = dataField;
        this.invalidate();
    }
    layoutSubviews() {
        super.layoutSubviews();
        if (this.rootView) {
            this.rootView.frame = this.bounds;
        }
    }
    set frame(_) { }
    get frame() {
        const systemInfo = wx.getSystemInfoSync();
        return {
            x: 0,
            y: 0,
            width: parseInt(systemInfo.windowWidth),
            height: parseInt(systemInfo.windowHeight),
        };
    }
    set bounds(_) { }
    get bounds() {
        const systemInfo = wx.getSystemInfoSync();
        return {
            x: 0,
            y: 0,
            width: parseInt(systemInfo.windowWidth),
            height: parseInt(systemInfo.windowHeight),
        };
    }
    set touches(value) {
        this._touches.set(value);
    }
    get touches() {
        return this._touches.get();
    }
    handleTouchStart(e) {
        const changedTouches = this.standardlizeTouches(e);
        for (let index = 0; index < changedTouches.length; index++) {
            const pointer = changedTouches[index];
            const pointerIdentifier = this.standardlizeTouchIdentifier(pointer);
            this.currentTouchesID.push(pointerIdentifier);
            const point = { x: pointer.pageX, y: pointer.pageY };
            const target = this.hitTest(point);
            if (target) {
                const touch = new UITouch_1.UITouch();
                this.touches[pointerIdentifier] = touch;
                touch.identifier = pointerIdentifier;
                touch.phase = UITouch_1.UITouchPhase.began;
                touch.tapCount = (() => {
                    for (const [key, value] of this.upCount) {
                        const timestamp = this.upTimestamp.get(key) || 0.0;
                        if ((e.timeStamp / 1000) - timestamp < 1.0
                            && Math.abs(key.x - point.x) < 44.0 && Math.abs(key.y - point.y) < 44.0) {
                            return value + 1;
                        }
                    }
                    return 1;
                })();
                touch.timestamp = e.timeStamp / 1000;
                touch.window = this;
                touch.windowPoint = point;
                touch.view = target;
                if (touch.identifier == 0) {
                    exports.sharedVelocityTracker.addMovement(touch);
                }
                touch.view.touchesBegan([touch]);
            }
        }
    }
    handleTouchMove(e) {
        const changedTouches = this.standardlizeTouches(e);
        for (let index = 0; index < changedTouches.length; index++) {
            const pointer = changedTouches[index];
            const pointerIdentifier = this.standardlizeTouchIdentifier(pointer);
            const point = { x: pointer.pageX, y: pointer.pageY };
            const touch = this.touches[pointerIdentifier];
            if (touch === undefined) {
                return false;
            }
            touch.phase = UITouch_1.UITouchPhase.moved;
            touch.timestamp = e.timeStamp / 1000;
            touch.windowPoint = point;
            if (touch.identifier == 0) {
                exports.sharedVelocityTracker.addMovement(touch);
            }
            if (touch.view) {
                touch.view.touchesMoved([touch]);
            }
        }
    }
    handleTouchEnd(e) {
        const changedTouches = this.standardlizeTouches(e);
        for (let index = 0; index < changedTouches.length; index++) {
            const pointer = changedTouches[index];
            const pointerIdentifier = this.standardlizeTouchIdentifier(pointer);
            const point = { x: pointer.pageX, y: pointer.pageY };
            const touch = this.touches[pointerIdentifier];
            if (touch !== undefined) {
                touch.phase = UITouch_1.UITouchPhase.ended;
                touch.timestamp = e.timeStamp / 1000;
                touch.windowPoint = point;
                if (touch.identifier == 0) {
                    exports.sharedVelocityTracker.addMovement(touch);
                }
                if (touch.view) {
                    touch.view.touchesEnded([touch]);
                }
            }
            const idx = this.currentTouchesID.indexOf(pointerIdentifier);
            if (idx >= 0) {
                this.currentTouchesID.splice(idx, 1);
            }
        }
        if (this.currentTouchesID.length == 0) {
            this.upCount.clear();
            this.upTimestamp.clear();
            for (const key in this.touches) {
                if (this.touches.hasOwnProperty(key)) {
                    const it = this.touches[key];
                    if (it.windowPoint) {
                        this.upCount.set(it.windowPoint, it.tapCount);
                        this.upTimestamp.set(it.windowPoint, it.timestamp);
                    }
                }
            }
            this.touches = {};
            exports.sharedVelocityTracker.reset();
            setTimeout(() => {
                UIView.recognizedGesture = undefined;
            }, 0);
        }
    }
    handleTouchCancel(e) {
        const changedTouches = this.standardlizeTouches(e);
        for (let index = 0; index < changedTouches.length; index++) {
            const pointer = changedTouches[index];
            const pointerIdentifier = this.standardlizeTouchIdentifier(pointer);
            const point = { x: pointer.pageX, y: pointer.pageY };
            const touch = this.touches[pointerIdentifier];
            if (touch) {
                touch.phase = UITouch_1.UITouchPhase.cancelled;
                touch.timestamp = e.timeStamp;
                touch.windowPoint = point;
                if (touch.identifier == 0) {
                    exports.sharedVelocityTracker.addMovement(touch);
                }
                if (touch.view) {
                    touch.view.touchesCancelled([touch]);
                }
            }
        }
        this.upCount.clear();
        this.upTimestamp.clear();
        this.touches = {};
    }
    standardlizeTouches(e) {
        if (e.changedTouches) {
            return new Array(e.changedTouches.length)
                .fill(0)
                .map((_, i) => e.changedTouches[i])
                .map(it => {
                if (it.identifier < -100 || it.identifier > 100) {
                    it.identifier_2 = (() => {
                        for (let index = 0; index < e.touches.length; index++) {
                            if (e.touches[index].identifier === it.identifier) {
                                return index;
                            }
                        }
                        return 0;
                    })();
                    return it;
                }
                else {
                    return it;
                }
            });
        }
        else {
            return [];
        }
    }
    standardlizeTouchIdentifier(touch) {
        return typeof touch.identifier_2 === "number" ? touch.identifier_2 : touch.identifier;
    }
}
exports.UIWindow = UIWindow;
exports.sharedVelocityTracker = new UITouch_1.VelocityTracker;
