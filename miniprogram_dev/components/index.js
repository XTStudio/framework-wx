module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 49);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const UUID_1 = __webpack_require__(3);
class UIViewManager {
    constructor() {
        this.views = {};
    }
    static get shared() {
        if (getApp().UIViewManagerManagerShared === undefined) {
            getApp().UIViewManagerManagerShared = new UIViewManager;
        }
        return getApp().UIViewManagerManagerShared;
    }
    addView(view) {
        view.viewID = UUID_1.randomUUID();
        this.views[view.viewID] = view;
    }
    fetchView(viewID) {
        return this.views[viewID];
    }
    fetchViews() {
        return Object.keys(this.views).map(it => this.views[it]);
    }
}
exports.UIViewManager = UIViewManager;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const UIRect_1 = __webpack_require__(9);
const UIAffineTransform_1 = __webpack_require__(23);
const Matrix_1 = __webpack_require__(33);
const UIColor_1 = __webpack_require__(5);
const UITouch_1 = __webpack_require__(10);
const UIEdgeInsets_1 = __webpack_require__(8);
const UIAnimator_1 = __webpack_require__(7);
const UIViewManager_1 = __webpack_require__(0);
const EventEmitter_1 = __webpack_require__(13);
const UIEnums_1 = __webpack_require__(6);
const CALayer_1 = __webpack_require__(18);
const UIComponentManager_1 = __webpack_require__(2);
const Ticker_1 = __webpack_require__(22);
class UIView extends EventEmitter_1.EventEmitter {
    constructor() {
        super();
        this.clazz = "UIView";
        this.viewID = undefined;
        this._layer = undefined;
        this._frame = UIRect_1.UIRectZero;
        this.bounds = UIRect_1.UIRectZero;
        this.touchAreaInsets = UIEdgeInsets_1.UIEdgeInsetsZero;
        this._transform = UIAffineTransform_1.UIAffineTransformIdentity;
        // hierarchy
        this.tag = 0;
        this.superview = undefined;
        this.subviews = [];
        this._clipsToBounds = false;
        this._hidden = false;
        this._contentMode = UIEnums_1.UIViewContentMode.scaleToFill;
        this._tintColor = undefined;
        this._alpha = 1.0;
        this._backgroundColor = undefined;
        this._extraStyles = undefined;
        // GestureRecognizers
        this._userInteractionEnabled = true;
        this.gestureRecognizers = [];
        // Component Data Builder
        this.dirtyFlags = {};
        this.animationProps = {};
        this.animationValues = {};
        UIViewManager_1.UIViewManager.shared.addView(this);
    }
    attach(dataOwner, dataField) {
        if (!(this instanceof UIWindow)) {
            const window = new UIWindow();
            window.attach(dataOwner, dataField, this);
        }
    }
    get layer() {
        if (this._layer === undefined) {
            this._layer = new CALayer_1.CALayer();
            this._layer.view = this;
        }
        return this._layer;
    }
    set frame(value) {
        if (UIRect_1.UIRectEqualToRect(this._frame, value)) {
            return;
        }
        if (UIAnimator_1.UIAnimator.activeAnimator !== undefined) {
            this.flushStyle();
            this.markFlagDirty("animation");
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
        this.markFlagDirty("frameStyle");
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
            this.flushStyle();
            this.markFlagDirty("animation");
            this.animationProps = UIAnimator_1.UIAnimator.activeAnimator.animationProps;
            this.animationValues["transform"] = value;
        }
        this._transform = value;
        this.markFlagDirty("style");
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
            superview.markFlagDirty("subviews");
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
        this.markFlagDirty("subviews");
        view.markFlagDirty("subviews");
        view.didMoveToSuperview();
        this.didAddSubview(view);
    }
    exchangeSubview(index1, index2) {
        const index2View = this.subviews[index2];
        this.subviews[index2] = this.subviews[index1];
        this.subviews[index1] = index2View;
        this.markFlagDirty("subviews");
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
        this.markFlagDirty("subviews");
        view.markFlagDirty("subviews");
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
            this.markFlagDirty("subviews");
        }
    }
    sendSubviewToBack(view) {
        let index = this.subviews.indexOf(view);
        if (index >= 0) {
            this.subviews.splice(index, 1);
            this.subviews.unshift(view);
            this.markFlagDirty("subviews");
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
        this.markFlagDirty("style");
    }
    set hidden(value) {
        if (this._hidden === value) {
            return;
        }
        this._hidden = value;
        this.markFlagDirty("style");
    }
    get hidden() {
        return this._hidden;
    }
    get contentMode() {
        return this._contentMode;
    }
    set contentMode(value) {
        if (this._contentMode === value) {
            return;
        }
        this._contentMode = value;
    }
    set tintColor(value) {
        if (this._tintColor === value) {
            return;
        }
        if (this._tintColor !== undefined && value !== undefined) {
            if (this._tintColor.toStyle() === value.toStyle()) {
                return;
            }
        }
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
            this.flushStyle();
            this.markFlagDirty("animation");
            this.animationProps = UIAnimator_1.UIAnimator.activeAnimator.animationProps;
            this.animationValues["alpha"] = value;
        }
        this._alpha = value;
        this.markFlagDirty("style");
    }
    get alpha() {
        return this._alpha;
    }
    set backgroundColor(value) {
        if (this._backgroundColor === value) {
            return;
        }
        if (this._backgroundColor !== undefined && value !== undefined) {
            if (this._backgroundColor.toStyle() === value.toStyle()) {
                return;
            }
        }
        if (UIAnimator_1.UIAnimator.activeAnimator !== undefined) {
            this.flushStyle();
            this.markFlagDirty("animation");
            this.animationProps = UIAnimator_1.UIAnimator.activeAnimator.animationProps;
            this.animationValues["backgroundColor"] = value;
        }
        this._backgroundColor = value;
        this.markFlagDirty("style");
    }
    get backgroundColor() {
        return this._backgroundColor;
    }
    get extraStyles() {
        return this._extraStyles;
    }
    set extraStyles(value) {
        if (this._extraStyles === value) {
            return;
        }
        this._extraStyles = value;
        this.markFlagDirty("style");
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
                currentPoint.x += -current.superview.contentOffset.x + current.superview.adjustInset.left;
                currentPoint.y += -current.superview.contentOffset.y + current.superview.adjustInset.top;
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
                currentPoint.x -= -it.superview.contentOffset.x + it.superview.adjustInset.left;
                currentPoint.y -= -it.superview.contentOffset.y + it.superview.adjustInset.top;
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
    markFlagDirty(...flags) {
        const viewID = this.viewID;
        if (viewID && UIComponentManager_1.UIComponentManager.shared.fetchComponent(viewID) === undefined) {
            return;
        }
        flags.forEach(it => {
            this.dirtyFlags[it] = true;
        });
        this.invalidate();
    }
    flushStyle() {
        if (this.dirtyFlags["style"] || this.dirtyFlags["frameStyle"]) {
            if (this.viewID) {
                const component = UIComponentManager_1.UIComponentManager.shared.fetchComponent(this.viewID);
                if (component) {
                    component.setData({
                        style: this.buildStyle(),
                        frameStyle: `left: ${this._frame.x}px; top:${this._frame.y};width: ${this._frame.width}px;height: ${this._frame.height}px;`,
                        animation: exports.emptyAnimation,
                    });
                    delete this.dirtyFlags["style"];
                    delete this.dirtyFlags["frameStyle"];
                }
            }
        }
    }
    invalidate() {
        const viewID = this.viewID;
        if (viewID) {
            if (Ticker_1.Ticker.shared.hasTask("setData." + this.clazz + "." + this.viewID)) {
                return;
            }
            Ticker_1.Ticker.shared.addTask("setData." + this.clazz + "." + this.viewID, () => {
                const component = UIComponentManager_1.UIComponentManager.shared.fetchComponent(viewID);
                if (component) {
                    const data = this.buildData();
                    let newData = {};
                    for (const flag in this.dirtyFlags) {
                        if (data[flag] !== undefined) {
                            newData[flag] = data[flag];
                        }
                    }
                    if (!this.dirtyFlags["animation"] && component.data.animation !== exports.emptyAnimation) {
                        newData.animation = exports.emptyAnimation;
                    }
                    component.setData(newData);
                    this.dirtyFlags = {};
                }
            });
        }
    }
    setDataForce(data, callback = undefined) {
        if (this.viewID) {
            const component = UIComponentManager_1.UIComponentManager.shared.fetchComponent(this.viewID);
            if (component) {
                component.setData(data, callback);
            }
            else {
                callback && callback();
            }
        }
        else {
            callback && callback();
        }
    }
    buildData() {
        return {
            viewID: this.viewID,
            style: this.buildStyle(),
            frameStyle: `left:${this._frame.x}px;top:${this._frame.y}px;width: ${this._frame.width}px;height: ${this._frame.height}px;`,
            subviews: this.subviews.map(it => {
                return {
                    clazz: it.clazz,
                    viewID: it.viewID,
                };
            }),
            animation: this.buildAnimation(),
        };
    }
    buildStyle() {
        let styles = `
            position: absolute;
        `;
        if (this.backgroundColor !== undefined) {
            styles += `background-color: ${UIColor_1.UIColor.toStyle(this.backgroundColor)};`;
        }
        if (this.alpha < 1.0) {
            styles += `opacity: ${this.alpha};`;
        }
        if (this.hidden) {
            styles += `display: none;`;
        }
        if (this.clipsToBounds) {
            styles += "overflow: hidden;";
        }
        if (!UIAffineTransform_1.UIAffineTransformIsIdentity(this.transform)) {
            styles += `transform: ${'matrix(' + this.transform.a + ', ' + this.transform.b + ', ' + this.transform.c + ', ' + this.transform.d + ', ' + this.transform.tx + ', ' + this.transform.ty + ')'};`;
        }
        if (this._layer) {
            if (this._layer._cornerRadius > 0) {
                styles += `border-radius: ${this._layer._cornerRadius}px;`;
            }
            if (this._layer.shadowOpacity > 0 && this._layer.shadowColor && this._layer.shadowColor.a > 0) {
                styles += `
                box-shadow: ${this._layer.shadowOffset.width.toString() + "px " + this._layer.shadowOffset.height.toString() + "px " + this._layer.shadowRadius.toString() + "px " + this._layer.shadowColor.colorWithAlphaComponent(this._layer.shadowOpacity).toStyle()};
                `;
            }
            if (this._layer.borderWidth > 0 && this._layer.borderColor) {
                styles += `
                border-width: ${this._layer.borderWidth.toString()}px;
                border-color: ${this._layer.borderColor.toStyle()};
                border-style: solid;
                box-sizing: border-box;
                `;
            }
        }
        if (this.extraStyles) {
            styles += this.extraStyles;
        }
        return styles;
    }
    buildAnimation() {
        if (Object.keys(this.animationValues).length > 0) {
            const animation = wx.createAnimation(this.animationProps);
            for (const animationKey in this.animationValues) {
                const endValue = this.animationValues[animationKey];
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
                    if (this._backgroundColor) {
                        animation.backgroundColor(UIColor_1.UIColor.toStyle(this._backgroundColor));
                    }
                    else {
                        animation.backgroundColor('transparent');
                    }
                }
                else if (animationKey === "transform") {
                    animation.matrix(endValue.a, endValue.b, endValue.c, endValue.d, endValue.tx, endValue.ty);
                }
            }
            if (!UIAffineTransform_1.UIAffineTransformIsIdentity(this._transform)) {
                animation.matrix(this._transform.a, this._transform.b, this._transform.c, this._transform.d, this._transform.tx, this._transform.ty);
            }
            animation.step();
            return animation.export();
        }
        else {
            return exports.emptyAnimation;
        }
    }
}
exports.UIView = UIView;
class UIWindow extends UIView {
    constructor() {
        super(...arguments);
        this.clazz = "UIWindow";
        // touches
        this.currentTouchesID = [];
        this.touches = {};
        this.upCount = new Map();
        this.upTimestamp = new Map();
    }
    attach(dataOwner, dataField, rootView = undefined) {
        if (rootView) {
            this.rootView = rootView;
            this.addSubview(rootView);
            this.layoutSubviews();
        }
        dataOwner.setData({
            [dataField]: {
                clazz: this.clazz,
                viewID: this.viewID,
            }
        });
        this.markFlagDirty("style");
        this.markFlagDirty("subviews");
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
    // Component Data Builder
    buildStyle() {
        let style = super.buildStyle();
        style += `
        width: 100%;
        height: 100%;
        `;
        return style;
    }
}
exports.UIWindow = UIWindow;
exports.sharedVelocityTracker = new UITouch_1.VelocityTracker;
exports.emptyAnimation = (() => {
    let animation = wx.createAnimation({ duration: 0 });
    animation.step();
    return animation.export();
})();


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class UIComponentManager {
    constructor() {
        this.components = {};
    }
    static get keyWindowComponent() {
        return getApp().UIComponentManagerKeyWindowComponent;
    }
    static set keyWindowComponent(value) {
        getApp().UIComponentManagerKeyWindowComponent = value;
    }
    static get shared() {
        if (getApp().UIComponentManagerShared === undefined) {
            getApp().UIComponentManagerShared = new UIComponentManager;
        }
        return getApp().UIComponentManagerShared;
    }
    addComponent(component, viewID) {
        this.components[viewID] = component;
    }
    fetchComponent(viewID) {
        return this.components[viewID];
    }
    deleteComponent(viewID) {
        delete this.components[viewID];
    }
}
exports.UIComponentManager = UIComponentManager;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.randomUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};


/***/ }),
/* 4 */,
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class UIColor {
    constructor(r, g, b, a) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
    static hexColor(hexValue) {
        const trimedValue = hexValue.replace('#', '');
        if (trimedValue.length === 6) {
            return new UIColor(parseInt(trimedValue.substr(0, 2), 16) / 255.0, parseInt(trimedValue.substr(2, 2), 16) / 255.0, parseInt(trimedValue.substr(4, 2), 16) / 255.0, 1.0);
        }
        else if (trimedValue.length === 8) {
            return new UIColor(parseInt(trimedValue.substr(2, 2), 16) / 255.0, parseInt(trimedValue.substr(4, 2), 16) / 255.0, parseInt(trimedValue.substr(6, 2), 16) / 255.0, parseInt(trimedValue.substr(0, 2), 16) / 255.0);
        }
        else {
            return UIColor.clear;
        }
    }
    colorWithAlphaComponent(value) {
        return new UIColor(this.r, this.g, this.b, this.a * value);
    }
    toStyle() {
        return 'rgba(' + (this.r * 255).toFixed(0) + ', ' + (this.g * 255).toFixed(0) + ', ' + (this.b * 255).toFixed(0) + ', ' + this.a.toFixed(6) + ')';
    }
    toHEXStyle() {
        let r = Math.round((this.r * 255)).toString(16);
        if (r.length < 2) {
            r = '0' + r;
        }
        let g = Math.round((this.g * 255)).toString(16);
        if (g.length < 2) {
            g = '0' + g;
        }
        let b = Math.round((this.b * 255)).toString(16);
        if (b.length < 2) {
            b = '0' + b;
        }
        return `#${r}${g}${b}`;
    }
    static toStyle(color) {
        return 'rgba(' + (color.r * 255).toFixed(0) + ', ' + (color.g * 255).toFixed(0) + ', ' + (color.b * 255).toFixed(0) + ', ' + color.a.toFixed(6) + ')';
    }
}
UIColor.black = new UIColor(0.0, 0.0, 0.0, 1.0);
UIColor.clear = new UIColor(0.0, 0.0, 0.0, 0.0);
UIColor.gray = new UIColor(0.5, 0.5, 0.5, 1.0);
UIColor.red = new UIColor(1.0, 0.0, 0.0, 1.0);
UIColor.yellow = new UIColor(1.0, 1.0, 0.0, 1.0);
UIColor.green = new UIColor(0.0, 1.0, 0.0, 1.0);
UIColor.blue = new UIColor(0.0, 0.0, 1.0, 1.0);
UIColor.white = new UIColor(1.0, 1.0, 1.0, 1.0);
exports.UIColor = UIColor;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var UIViewContentMode;
(function (UIViewContentMode) {
    UIViewContentMode[UIViewContentMode["scaleToFill"] = 0] = "scaleToFill";
    UIViewContentMode[UIViewContentMode["scaleAspectFit"] = 1] = "scaleAspectFit";
    UIViewContentMode[UIViewContentMode["scaleAspectFill"] = 2] = "scaleAspectFill";
})(UIViewContentMode = exports.UIViewContentMode || (exports.UIViewContentMode = {}));
var UIControlState;
(function (UIControlState) {
    UIControlState[UIControlState["normal"] = 0] = "normal";
    UIControlState[UIControlState["highlighted"] = 1] = "highlighted";
    UIControlState[UIControlState["disabled"] = 2] = "disabled";
    UIControlState[UIControlState["selected"] = 3] = "selected";
})(UIControlState = exports.UIControlState || (exports.UIControlState = {}));
var UIControlContentVerticalAlignment;
(function (UIControlContentVerticalAlignment) {
    UIControlContentVerticalAlignment[UIControlContentVerticalAlignment["center"] = 0] = "center";
    UIControlContentVerticalAlignment[UIControlContentVerticalAlignment["top"] = 1] = "top";
    UIControlContentVerticalAlignment[UIControlContentVerticalAlignment["bottom"] = 2] = "bottom";
    UIControlContentVerticalAlignment[UIControlContentVerticalAlignment["fill"] = 3] = "fill";
})(UIControlContentVerticalAlignment = exports.UIControlContentVerticalAlignment || (exports.UIControlContentVerticalAlignment = {}));
var UIControlContentHorizontalAlignment;
(function (UIControlContentHorizontalAlignment) {
    UIControlContentHorizontalAlignment[UIControlContentHorizontalAlignment["center"] = 0] = "center";
    UIControlContentHorizontalAlignment[UIControlContentHorizontalAlignment["left"] = 1] = "left";
    UIControlContentHorizontalAlignment[UIControlContentHorizontalAlignment["right"] = 2] = "right";
    UIControlContentHorizontalAlignment[UIControlContentHorizontalAlignment["fill"] = 3] = "fill";
})(UIControlContentHorizontalAlignment = exports.UIControlContentHorizontalAlignment || (exports.UIControlContentHorizontalAlignment = {}));
var UITextAlignment;
(function (UITextAlignment) {
    UITextAlignment[UITextAlignment["left"] = 0] = "left";
    UITextAlignment[UITextAlignment["center"] = 1] = "center";
    UITextAlignment[UITextAlignment["right"] = 2] = "right";
})(UITextAlignment = exports.UITextAlignment || (exports.UITextAlignment = {}));
var UILineBreakMode;
(function (UILineBreakMode) {
    UILineBreakMode[UILineBreakMode["wordWrapping"] = 0] = "wordWrapping";
    UILineBreakMode[UILineBreakMode["charWrapping"] = 1] = "charWrapping";
    UILineBreakMode[UILineBreakMode["clipping"] = 2] = "clipping";
    UILineBreakMode[UILineBreakMode["truncatingHead"] = 3] = "truncatingHead";
    UILineBreakMode[UILineBreakMode["truncatingTail"] = 4] = "truncatingTail";
    UILineBreakMode[UILineBreakMode["truncatingMiddle"] = 5] = "truncatingMiddle";
})(UILineBreakMode = exports.UILineBreakMode || (exports.UILineBreakMode = {}));
var UITextFieldViewMode;
(function (UITextFieldViewMode) {
    UITextFieldViewMode[UITextFieldViewMode["never"] = 0] = "never";
    UITextFieldViewMode[UITextFieldViewMode["whileEditing"] = 1] = "whileEditing";
    UITextFieldViewMode[UITextFieldViewMode["unlessEditing"] = 2] = "unlessEditing";
    UITextFieldViewMode[UITextFieldViewMode["always"] = 3] = "always";
})(UITextFieldViewMode = exports.UITextFieldViewMode || (exports.UITextFieldViewMode = {}));
var UITextAutocapitalizationType;
(function (UITextAutocapitalizationType) {
    UITextAutocapitalizationType[UITextAutocapitalizationType["none"] = 0] = "none";
    UITextAutocapitalizationType[UITextAutocapitalizationType["words"] = 1] = "words";
    UITextAutocapitalizationType[UITextAutocapitalizationType["sentences"] = 2] = "sentences";
    UITextAutocapitalizationType[UITextAutocapitalizationType["allCharacters"] = 3] = "allCharacters";
})(UITextAutocapitalizationType = exports.UITextAutocapitalizationType || (exports.UITextAutocapitalizationType = {}));
var UITextAutocorrectionType;
(function (UITextAutocorrectionType) {
    UITextAutocorrectionType[UITextAutocorrectionType["default"] = 0] = "default";
    UITextAutocorrectionType[UITextAutocorrectionType["no"] = 1] = "no";
    UITextAutocorrectionType[UITextAutocorrectionType["yes"] = 2] = "yes";
})(UITextAutocorrectionType = exports.UITextAutocorrectionType || (exports.UITextAutocorrectionType = {}));
var UITextSpellCheckingType;
(function (UITextSpellCheckingType) {
    UITextSpellCheckingType[UITextSpellCheckingType["default"] = 0] = "default";
    UITextSpellCheckingType[UITextSpellCheckingType["no"] = 1] = "no";
    UITextSpellCheckingType[UITextSpellCheckingType["yes"] = 2] = "yes";
})(UITextSpellCheckingType = exports.UITextSpellCheckingType || (exports.UITextSpellCheckingType = {}));
var UIKeyboardType;
(function (UIKeyboardType) {
    UIKeyboardType[UIKeyboardType["default"] = 0] = "default";
    UIKeyboardType[UIKeyboardType["ASCIICapable"] = 1] = "ASCIICapable";
    UIKeyboardType[UIKeyboardType["numbersAndPunctuation"] = 2] = "numbersAndPunctuation";
    UIKeyboardType[UIKeyboardType["numberPad"] = 3] = "numberPad";
    UIKeyboardType[UIKeyboardType["phonePad"] = 4] = "phonePad";
    UIKeyboardType[UIKeyboardType["emailAddress"] = 5] = "emailAddress";
    UIKeyboardType[UIKeyboardType["decimalPad"] = 6] = "decimalPad";
})(UIKeyboardType = exports.UIKeyboardType || (exports.UIKeyboardType = {}));
var UIReturnKeyType;
(function (UIReturnKeyType) {
    UIReturnKeyType[UIReturnKeyType["default"] = 0] = "default";
    UIReturnKeyType[UIReturnKeyType["go"] = 1] = "go";
    UIReturnKeyType[UIReturnKeyType["next"] = 2] = "next";
    UIReturnKeyType[UIReturnKeyType["send"] = 3] = "send";
    UIReturnKeyType[UIReturnKeyType["done"] = 4] = "done";
})(UIReturnKeyType = exports.UIReturnKeyType || (exports.UIReturnKeyType = {}));
var UILayoutConstraintAxis;
(function (UILayoutConstraintAxis) {
    UILayoutConstraintAxis[UILayoutConstraintAxis["horizontal"] = 0] = "horizontal";
    UILayoutConstraintAxis[UILayoutConstraintAxis["vertical"] = 1] = "vertical";
})(UILayoutConstraintAxis = exports.UILayoutConstraintAxis || (exports.UILayoutConstraintAxis = {}));
var UIStackViewDistribution;
(function (UIStackViewDistribution) {
    UIStackViewDistribution[UIStackViewDistribution["fill"] = 0] = "fill";
    UIStackViewDistribution[UIStackViewDistribution["fillEqually"] = 1] = "fillEqually";
    UIStackViewDistribution[UIStackViewDistribution["fillProportionally"] = 2] = "fillProportionally";
    UIStackViewDistribution[UIStackViewDistribution["equalSpacing"] = 3] = "equalSpacing";
    UIStackViewDistribution[UIStackViewDistribution["equalCentering"] = 4] = "equalCentering";
})(UIStackViewDistribution = exports.UIStackViewDistribution || (exports.UIStackViewDistribution = {}));
var UIStackViewAlignment;
(function (UIStackViewAlignment) {
    UIStackViewAlignment[UIStackViewAlignment["fill"] = 0] = "fill";
    UIStackViewAlignment[UIStackViewAlignment["leading"] = 1] = "leading";
    UIStackViewAlignment[UIStackViewAlignment["center"] = 2] = "center";
    UIStackViewAlignment[UIStackViewAlignment["trailing"] = 3] = "trailing";
})(UIStackViewAlignment = exports.UIStackViewAlignment || (exports.UIStackViewAlignment = {}));
var UIStatusBarStyle;
(function (UIStatusBarStyle) {
    UIStatusBarStyle[UIStatusBarStyle["default"] = 0] = "default";
    UIStatusBarStyle[UIStatusBarStyle["lightContent"] = 1] = "lightContent";
})(UIStatusBarStyle = exports.UIStatusBarStyle || (exports.UIStatusBarStyle = {}));


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class UIAnimator {
    constructor() {
        this.animationProps = {};
    }
    linear(duration, isCurve, animations, completion) {
        if (UIAnimator.nextCompletion !== undefined) {
            UIAnimator.nextCompletion();
            UIAnimator.nextCompletion = undefined;
        }
        this.animationProps = {
            duration: duration * 1000,
            timingFunction: isCurve ? "ease" : "linear"
        };
        UIAnimator.activeAnimator = this;
        animations();
        UIAnimator.activeAnimator = undefined;
        if (completion) {
            UIAnimator.nextCompletion = completion;
            setTimeout(() => {
                if (UIAnimator.nextCompletion !== completion) {
                    return;
                }
                completion();
                UIAnimator.nextCompletion = undefined;
            }, duration * 1000);
        }
    }
    static linear(duration, animations, completion) {
        UIAnimator.shared.linear(duration, false, animations, completion);
    }
    static curve(duration, animations, completion) {
        UIAnimator.shared.linear(duration, true, animations, completion);
    }
    static spring(tension, friction, animations, completion) {
        // not support spring animation for wx
        UIAnimator.shared.linear(0.3, false, animations, completion);
    }
    static bouncy(bounciness, speed, animations, completion) {
        // not support bouncy animation for wx
        UIAnimator.shared.linear(0.3, false, animations, completion);
    }
}
UIAnimator.shared = new UIAnimator;
UIAnimator.activeAnimator = undefined;
UIAnimator.nextCompletion = undefined;
exports.UIAnimator = UIAnimator;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.UIEdgeInsetsZero = { top: 0, left: 0, bottom: 0, right: 0 };
exports.UIEdgeInsetsMake = function (top, left, bottom, right) {
    return { top, left, bottom, right };
};
exports.UIEdgeInsetsInsetRect = function (rect, insets) {
    return {
        x: rect.x + insets.left,
        y: rect.y + insets.top,
        width: rect.width - insets.left - insets.right,
        height: rect.height - insets.top - insets.bottom
    };
};
exports.UIEdgeInsetsEqualToEdgeInsets = function (rect1, rect2) {
    return Math.abs(rect1.top - rect2.top) < 0.001 &&
        Math.abs(rect1.left - rect2.left) < 0.001 &&
        Math.abs(rect1.bottom - rect2.bottom) < 0.001 &&
        Math.abs(rect1.right - rect2.right) < 0.001;
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.UIRectZero = { x: 0, y: 0, width: 0, height: 0 };
exports.UIRectMake = function (x, y, width, height) {
    return { x, y, width, height };
};
exports.UIRectEqualToRect = function (a, b) {
    return Math.abs(a.x - b.x) < 0.001 &&
        Math.abs(a.y - b.y) < 0.001 &&
        Math.abs(a.width - b.width) < 0.001 &&
        Math.abs(a.height - b.height) < 0.001;
};
exports.UIRectInset = function (rect, dx, dy) {
    return {
        x: rect.x + dx,
        y: rect.y + dy,
        width: rect.width - 2 * dx,
        height: rect.height - 2 * dy,
    };
};
exports.UIRectOffset = function (rect, dx, dy) {
    return {
        x: rect.x + dx,
        y: rect.y + dy,
        width: rect.width,
        height: rect.height,
    };
};
exports.UIRectContainsPoint = function (rect, point) {
    return point.x >= rect.x && point.x <= rect.x + rect.width && point.y >= rect.y && point.y <= rect.x + rect.height;
};
exports.UIRectContainsRect = function (rect1, rect2) {
    return exports.UIRectContainsPoint(rect1, { x: rect2.x, y: rect2.y }) &&
        exports.UIRectContainsPoint(rect1, { x: rect2.x + rect2.width, y: rect2.y }) &&
        exports.UIRectContainsPoint(rect1, { x: rect2.x, y: rect2.y + rect2.height }) &&
        exports.UIRectContainsPoint(rect1, { x: rect2.x + rect2.width, y: rect2.y + rect2.height });
};
exports.UIRectIntersectsRect = function (a, b) {
    if (a.x + a.width - 0.1 <= b.x ||
        b.x + b.width - 0.1 <= a.x ||
        a.y + a.height - 0.1 <= b.y ||
        b.y + b.height - 0.1 <= a.y) {
        return false;
    }
    return true;
};
exports.UIRectUnion = function (r1, r2) {
    const x = Math.min(r1.x, r2.x);
    const y = Math.min(r1.y, r2.y);
    const width = Math.max(r1.x + r1.width, r2.x + r2.width);
    const height = Math.max(r1.y + r1.height, r2.y + r2.height);
    return { x, y, width, height };
};
exports.UIRectIsEmpty = function (rect) {
    return rect.width == 0.0 || rect.height == 0.0;
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const UIPoint_1 = __webpack_require__(12);
var UITouchPhase;
(function (UITouchPhase) {
    UITouchPhase[UITouchPhase["began"] = 0] = "began";
    UITouchPhase[UITouchPhase["moved"] = 1] = "moved";
    UITouchPhase[UITouchPhase["stationary"] = 2] = "stationary";
    UITouchPhase[UITouchPhase["ended"] = 3] = "ended";
    UITouchPhase[UITouchPhase["cancelled"] = 4] = "cancelled";
})(UITouchPhase = exports.UITouchPhase || (exports.UITouchPhase = {}));
class UITouch {
    constructor() {
        this.identifier = 0;
        this.timestamp = 0.0;
        this.phase = UITouchPhase.cancelled;
        this.tapCount = 0;
        this.window = undefined;
        this.windowPoint = undefined;
        this.view = undefined;
        this.gestureRecognizers = [];
    }
    locationInView(view) {
        const aView = view || this.view;
        if (aView === undefined) {
            return UIPoint_1.UIPointZero;
        }
        const windowPoint = this.windowPoint || UIPoint_1.UIPointZero;
        return aView.convertPointFromWindow(windowPoint) || UIPoint_1.UIPointZero;
    }
    previousLocationInView(view) {
        return UIPoint_1.UIPointZero;
    }
}
exports.UITouch = UITouch;
class VelocityTracker {
    constructor() {
        this.movements = [];
        this.velocity = { x: 0, y: 0 };
    }
    reset() {
        this.movements = [];
        this.velocity = { x: 0, y: 0 };
    }
    addMovement(touch) {
        this.movements.push(Object.assign({}, touch));
    }
    computeCurrentVelocity() {
        for (let index = this.movements.length - 1; index >= 1; index--) {
            const current = this.movements[index];
            const last = this.movements[index - 1];
            if (!current.windowPoint || !last.windowPoint) {
                continue;
            }
            if (current.phase == UITouchPhase.ended && last.phase == UITouchPhase.moved && current.timestamp - last.timestamp > 0.024) {
                this.velocity = { x: 0, y: 0 };
                break;
            }
            if (current.phase != UITouchPhase.moved || last.phase != UITouchPhase.moved) {
                continue;
            }
            const timeDiff = current.timestamp - last.timestamp;
            if (timeDiff > 0.002) {
                this.velocity = {
                    x: (current.windowPoint.x - last.windowPoint.x) / timeDiff,
                    y: (current.windowPoint.y - last.windowPoint.y) / timeDiff,
                };
                break;
            }
        }
    }
}
exports.VelocityTracker = VelocityTracker;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.UISizeZero = { width: 0, height: 0 };
exports.UISizeMake = function (width, height) {
    return { width, height };
};
exports.UISizeEqualToSize = function (a, b) {
    return Math.abs(a.width - b.width) < 0.001 && Math.abs(a.height - b.height) < 0.001;
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.UIPointZero = { x: 0, y: 0 };
exports.UIPointMake = function (x, y) {
    return { x, y };
};
exports.UIPointEqualToPoint = function (point1, point2) {
    return Math.abs(point1.x - point2.x) < 0.001 && Math.abs(point1.y - point2.y) < 0.001;
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const EventEmitterIMP = __webpack_require__(61);
exports.EventEmitter = EventEmitterIMP.EventEmitter;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const UIPoint_1 = __webpack_require__(12);
const EventEmitter_1 = __webpack_require__(13);
var UIGestureRecognizerState;
(function (UIGestureRecognizerState) {
    UIGestureRecognizerState[UIGestureRecognizerState["possible"] = 0] = "possible";
    UIGestureRecognizerState[UIGestureRecognizerState["began"] = 1] = "began";
    UIGestureRecognizerState[UIGestureRecognizerState["changed"] = 2] = "changed";
    UIGestureRecognizerState[UIGestureRecognizerState["ended"] = 3] = "ended";
    UIGestureRecognizerState[UIGestureRecognizerState["cancelled"] = 4] = "cancelled";
    UIGestureRecognizerState[UIGestureRecognizerState["failed"] = 5] = "failed";
})(UIGestureRecognizerState = exports.UIGestureRecognizerState || (exports.UIGestureRecognizerState = {}));
class UIGestureRecognizer extends EventEmitter_1.EventEmitter {
    constructor() {
        super(...arguments);
        this.state = UIGestureRecognizerState.possible;
        this.enabled = true;
        this.view = undefined;
        this.touches = [];
    }
    requireGestureRecognizerToFail(otherGestureRecognizer) {
    }
    locationInView(view) {
        const touch = this.touches[0];
        if (touch) {
            return touch.locationInView(view);
        }
        return UIPoint_1.UIPointZero;
    }
    numberOfTouches() {
        return this.touches.values.length;
    }
    locationOfTouch(touchIndex, view) {
        const touch = this.touches[touchIndex];
        if (touch) {
            return touch.locationInView(view);
        }
        return UIPoint_1.UIPointZero;
    }
    handleTouch(touches) { this.touches = touches; }
    handleEvent(name) { }
}
exports.UIGestureRecognizer = UIGestureRecognizer;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const EventEmitter_1 = __webpack_require__(13);
const UIView_1 = __webpack_require__(1);
const UIEdgeInsets_1 = __webpack_require__(8);
const UIColor_1 = __webpack_require__(5);
const UITabBarItem_1 = __webpack_require__(71);
const UINavigationBar_1 = __webpack_require__(28);
class UIViewController extends EventEmitter_1.EventEmitter {
    constructor() {
        super(...arguments);
        this.clazz = "UIViewController";
        this._title = undefined;
        this._view = undefined;
        this.safeAreaInsets = UIEdgeInsets_1.UIEdgeInsetsZero;
        this.parentViewController = undefined;
        this.childViewControllers = [];
        this.navigationItem = new UINavigationBar_1.UINavigationItem;
        this.hidesBottomBarWhenPushed = true;
        this.tabBarItem = new UITabBarItem_1.UITabBarItem;
    }
    get title() {
        return this._title;
    }
    set title(value) {
        this._title = value;
        if (this.navigationController) {
            this.navigationController.updateBrowserTitle();
        }
    }
    set view(value) {
        if (this._view !== undefined) {
            return;
        }
        this._view = value;
    }
    get view() {
        return this.iView;
    }
    get iView() {
        this.loadViewIfNeed();
        return this._view;
    }
    loadViewIfNeed() {
        if (this._view === undefined) {
            this.loadView();
            if (this._view) {
                this._view.viewDelegate = this;
            }
            this.viewDidLoad();
        }
    }
    attach(dataOwner, dataField) {
        this.iView.attach(dataOwner, dataField);
    }
    loadView() {
        this.view = new UIView_1.UIView;
        this.iView.backgroundColor = UIColor_1.UIColor.white;
    }
    viewDidLoad() {
    }
    viewWillAppear(animated) {
        this.childViewControllers.forEach(it => it.viewWillAppear(animated));
    }
    viewDidAppear(animated) {
        this.childViewControllers.forEach(it => it.viewDidAppear(animated));
    }
    viewWillDisappear(animated) {
        this.childViewControllers.forEach(it => it.viewWillDisappear(animated));
    }
    viewDidDisappear(animated) {
        this.childViewControllers.forEach(it => it.viewDidDisappear(animated));
    }
    viewWillLayoutSubviews() {
        this.emit("viewWillLayoutSubviews", this);
    }
    viewDidLayoutSubviews() { }
    addChildViewController(viewController) {
        if (viewController == this) {
            return;
        }
        if (viewController.parentViewController) {
            if (viewController.parentViewController == this) {
                return;
            }
            viewController.parentViewController.removeFromParentViewController();
        }
        viewController.willMoveToParentViewController(this);
        this.childViewControllers.push(viewController);
        viewController.parentViewController = this;
        viewController.didMoveToParentViewController(this);
    }
    removeFromParentViewController() {
        if (this.parentViewController) {
            const it = this.parentViewController;
            this.willMoveToParentViewController(undefined);
            const idx = it.childViewControllers.indexOf(this);
            if (idx >= 0) {
                it.childViewControllers.splice(idx, 1);
            }
            this.parentViewController = undefined;
            this.didMoveToParentViewController(undefined);
        }
    }
    willMoveToParentViewController(parent) { }
    didMoveToParentViewController(parent) { }
    didAddSubview(subview) { }
    get navigationController() {
        let current = this;
        while (current != undefined) {
            if (current.clazz === "UINavigationController") {
                return current;
            }
            current = current.parentViewController;
        }
        return undefined;
    }
    get tabBarController() {
        var current = this;
        while (current != undefined) {
            if (current.clazz === "UITabBarController") {
                return current;
            }
            current = current.parentViewController;
        }
        return undefined;
    }
    get window() {
        let nextResponder = this.nextResponder();
        while (nextResponder !== undefined) {
            if (nextResponder.clazz === "UIWindow") {
                return nextResponder;
            }
            nextResponder = nextResponder.nextResponder();
        }
    }
    get visibleViewController() {
        if (this.window && this.window.presentedViewControllers.length > 0) {
            return this.window.presentedViewControllers[this.window.presentedViewControllers.length - 1];
        }
        else if (this.window) {
            return this.window.rootViewController;
        }
        return undefined;
    }
    // Helpers
    nextResponder() {
        if (this.parentViewController) {
            return this.parentViewController.view;
        }
        else if (this._view && this._view.superview) {
            return this._view.superview;
        }
        return undefined;
    }
}
exports.UIViewController = UIViewController;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class URL {
    constructor(URLString) {
        this.URLString = URLString;
    }
    static URLWithString(string, baseURL) {
        // if (baseURL !== undefined) {
        // if (windowURL !== undefined) {
        //     return new URL(new windowURL(string, baseURL.absoluteString).href)
        // }
        // }
        return new URL(string);
    }
    static fileURLWithPath(path) {
        throw Error();
    }
    get absoluteString() {
        return this.URLString;
    }
}
exports.URL = URL;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Data {
    constructor(value) {
        this._arrayBuffer = new ArrayBuffer(0);
        if (value instanceof ArrayBuffer) {
            this._arrayBuffer = value.slice(0);
        }
        else if (value !== undefined) {
            if (typeof value.utf8String === "string") {
                if (typeof TextEncoder === "function") {
                    return new Data(new TextEncoder().encode(value.utf8String).buffer);
                }
                else {
                    var trimValue = unescape(encodeURIComponent(value.utf8String));
                    var arrayBuffer = new ArrayBuffer(trimValue.length);
                    var bufferView = new Uint8Array(arrayBuffer);
                    for (var i = 0, count = trimValue.length; i < count; i++) {
                        bufferView[i] = trimValue.charCodeAt(i);
                    }
                    this._arrayBuffer = arrayBuffer;
                }
            }
            else if (value.base64EncodedData instanceof Data) {
                var binaryString = window.atob(new Uint8Array(value.base64EncodedData._arrayBuffer).reduce(function (data, byte) {
                    return data + String.fromCharCode(byte);
                }, ''));
                var len = binaryString.length;
                var bytes = new Uint8Array(len);
                for (var i = 0; i < len; i++) {
                    bytes[i] = binaryString.charCodeAt(i);
                }
                this._arrayBuffer = bytes.buffer;
            }
            else if (typeof value.base64EncodedString === "string") {
                var binaryString = window.atob(value.base64EncodedString);
                var len = binaryString.length;
                var bytes = new Uint8Array(len);
                for (var i = 0; i < len; i++) {
                    bytes[i] = binaryString.charCodeAt(i);
                }
                this._arrayBuffer = bytes.buffer;
            }
        }
    }
    arrayBuffer() {
        return this._arrayBuffer;
    }
    json() {
        const utf8String = this.utf8String();
        if (utf8String !== undefined) {
            try {
                return JSON.parse(utf8String);
            }
            catch (error) {
                return undefined;
            }
        }
        return undefined;
    }
    utf8String() {
        if (typeof TextDecoder === "function") {
            return new TextDecoder().decode(this._arrayBuffer);
        }
        return decodeURIComponent(escape(new Uint8Array(this._arrayBuffer).reduce(function (data, byte) {
            return data + String.fromCharCode(byte);
        }, '')));
    }
    base64EncodedData() {
        return new Data({ utf8String: this.base64EncodedString() });
    }
    base64EncodedString() {
        return window.btoa(new Uint8Array(this._arrayBuffer).reduce(function (data, byte) {
            return data + String.fromCharCode(byte);
        }, ''));
    }
    mutable() {
        return new MutableData(this._arrayBuffer);
    }
}
exports.Data = Data;
class MutableData extends Data {
    appendData(data) {
        this._arrayBuffer = new Uint8Array([
            ...new Uint8Array(this._arrayBuffer),
            ...new Uint8Array(data._arrayBuffer),
        ]).buffer;
    }
    appendArrayBuffer(arrayBuffer) {
        this._arrayBuffer = new Uint8Array([
            ...new Uint8Array(this._arrayBuffer),
            ...new Uint8Array(arrayBuffer),
        ]).buffer;
    }
    setData(data) {
        this._arrayBuffer = data._arrayBuffer.slice(0);
    }
    immutable() {
        return new Data(this._arrayBuffer);
    }
}
exports.MutableData = MutableData;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const UIRect_1 = __webpack_require__(9);
const UISize_1 = __webpack_require__(11);
class CALayer {
    constructor() {
        this._view = undefined;
        this._frame = UIRect_1.UIRectZero;
        this._hidden = false;
        this._cornerRadius = 0.0;
        this._borderWidth = 0.0;
        this._borderColor = undefined;
        this.superlayer = undefined;
        this.sublayers = [];
        this._backgroundColor = undefined;
        this._opacity = 1.0;
        this._masksToBounds = false;
        this._shadowColor = undefined;
        this._shadowOpacity = 0.0;
        this._shadowOffset = { width: 0, height: -3 };
        this._shadowRadius = 3.0;
    }
    get view() {
        if (this.superlayer) {
            return this.superlayer._view;
        }
        return this._view;
    }
    set view(value) {
        this._view = value;
    }
    get frame() {
        return this._frame;
    }
    set frame(value) {
        if (UIRect_1.UIRectEqualToRect(this._frame, value)) {
            return;
        }
        this._frame = value;
    }
    get hidden() {
        if (this._view) {
            return this._view.hidden;
        }
        else {
            return this._hidden;
        }
    }
    set hidden(value) {
        if (this.hidden === value) {
            return;
        }
        this._hidden = value;
        if (this._view) {
            this._view.hidden = value;
        }
        else {
        }
    }
    get cornerRadius() {
        return this._cornerRadius;
    }
    set cornerRadius(value) {
        if (this._cornerRadius === value) {
            return;
        }
        this._cornerRadius = value;
        if (this._view) {
            this._view.invalidate();
        }
        else {
        }
    }
    get borderWidth() {
        return this._borderWidth;
    }
    set borderWidth(value) {
        if (this._borderWidth === value) {
            return;
        }
        this._borderWidth = value;
        this.resetBorder();
    }
    get borderColor() {
        return this._borderColor;
    }
    set borderColor(value) {
        if (this._borderColor === value) {
            return;
        }
        if (this._borderColor !== undefined && value !== undefined) {
            if (this._borderColor.toStyle() === value.toStyle()) {
                return;
            }
        }
        this._borderColor = value;
        this.resetBorder();
    }
    resetBorder() {
        if (this._view) {
            this._view.invalidate();
        }
        else {
        }
    }
    moveBorderElementToFront() {
    }
    removeFromSuperlayer() {
        if (this.superlayer) {
            const idx = this.superlayer.sublayers.indexOf(this);
            if (idx >= 0) {
                this.superlayer.sublayers.splice(idx, 1);
            }
            this.superlayer = undefined;
        }
    }
    addSublayer(layer) {
        if (layer.superlayer !== undefined) {
            layer.removeFromSuperlayer();
        }
        this.sublayers.push(layer);
        layer.superlayer = this;
        this.createSVGElement();
        layer.createSVGElement();
    }
    createSVGElement() {
    }
    get backgroundColor() {
        if (this._view) {
            return this._view.backgroundColor;
        }
        else {
            return this._backgroundColor;
        }
    }
    set backgroundColor(value) {
        if (this.backgroundColor === value) {
            return;
        }
        if (this.backgroundColor !== undefined && value !== undefined) {
            if (this.backgroundColor.toStyle() === value.toStyle()) {
                return;
            }
        }
        this._backgroundColor = value;
        if (this._view) {
            this._view.backgroundColor = value;
        }
        else {
        }
    }
    get opacity() {
        if (this._view) {
            return this._view.alpha;
        }
        else {
            return this._opacity;
        }
    }
    set opacity(value) {
        if (this.opacity === value) {
            return;
        }
        this._opacity = value;
        if (this._view) {
            this._view.alpha = value;
        }
        else {
        }
    }
    get masksToBounds() {
        return this._masksToBounds;
    }
    set masksToBounds(value) {
        if (this.masksToBounds === value) {
            return;
        }
        this._masksToBounds = value;
        if (this._view) {
            this._view.clipsToBounds = value;
        }
        else {
        }
    }
    get shadowColor() {
        return this._shadowColor;
    }
    set shadowColor(value) {
        if (this.shadowColor === value) {
            return;
        }
        if (this.shadowColor !== undefined && value !== undefined) {
            if (this.shadowColor.toStyle() === value.toStyle()) {
                return;
            }
        }
        this._shadowColor = value;
        this.resetShadow();
    }
    get shadowOpacity() {
        return this._shadowOpacity;
    }
    set shadowOpacity(value) {
        if (this.shadowOpacity === value) {
            return;
        }
        this._shadowOpacity = value;
        this.resetShadow();
    }
    get shadowOffset() {
        return this._shadowOffset;
    }
    set shadowOffset(value) {
        if (UISize_1.UISizeEqualToSize(this.shadowOffset, value)) {
            return;
        }
        this._shadowOffset = value;
        this.resetShadow();
    }
    get shadowRadius() {
        return this._shadowRadius;
    }
    set shadowRadius(value) {
        if (this.shadowRadius === value) {
            return;
        }
        this._shadowRadius = value;
        this.resetShadow();
    }
    resetShadow() {
        if (this._view) {
            this._view.invalidate();
        }
    }
}
exports.CALayer = CALayer;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class UIFont {
    constructor(pointSize, fontStyle, fontName) {
        this.pointSize = pointSize;
        this.fontStyle = fontStyle;
        this.fontName = fontName;
        if (fontName === undefined) {
            this.fontName = "-apple-system";
        }
    }
}
exports.UIFont = UIFont;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const UIGestureRecognizer_1 = __webpack_require__(14);
const UITouch_1 = __webpack_require__(10);
const UIView_1 = __webpack_require__(1);
class UILongPressGestureRecognizer extends UIGestureRecognizer_1.UIGestureRecognizer {
    constructor() {
        super(...arguments);
        this.numberOfTapsRequired = 1;
        this.numberOfTouchesRequired = 1;
        this.minimumPressDuration = 0.5;
        this.allowableMovement = 10;
        this.beganPoints = {};
    }
    handleTouch(touches) {
        super.handleTouch(touches);
        touches.forEach((it) => {
            if (it.phase == UITouch_1.UITouchPhase.began) {
                if (UIView_1.UIView.recognizedGesture != undefined) {
                    this.beganPoints = {};
                    return;
                }
                if (it.windowPoint) {
                    this.beganPoints[it.identifier] = it.windowPoint;
                }
                if (this.timerTask === undefined && Object.keys(this.beganPoints).length >= this.numberOfTouchesRequired) {
                    this.timerTask = setTimeout(() => {
                        if (UIView_1.UIView.recognizedGesture == undefined && this.state == UIGestureRecognizer_1.UIGestureRecognizerState.possible) {
                            UIView_1.UIView.recognizedGesture = this;
                            this.state = UIGestureRecognizer_1.UIGestureRecognizerState.began;
                            this.handleEvent("began");
                            this.emit("began", this);
                        }
                        else {
                            this.state = UIGestureRecognizer_1.UIGestureRecognizerState.failed;
                        }
                    }, this.minimumPressDuration * 1000);
                }
            }
            else if (it.phase == UITouch_1.UITouchPhase.moved) {
                if (this.state == UIGestureRecognizer_1.UIGestureRecognizerState.possible) {
                    if (it.windowPoint && this.beganPoints[it.identifier]) {
                        const beganPoint = this.beganPoints[it.identifier];
                        if (Math.abs(beganPoint.x - it.windowPoint.x) >= this.allowableMovement || Math.abs(beganPoint.y - it.windowPoint.y) >= this.allowableMovement) {
                            clearTimeout(this.timerTask);
                            this.state = UIGestureRecognizer_1.UIGestureRecognizerState.failed;
                        }
                    }
                }
                else if (this.state == UIGestureRecognizer_1.UIGestureRecognizerState.began || this.state == UIGestureRecognizer_1.UIGestureRecognizerState.changed) {
                    this.state = UIGestureRecognizer_1.UIGestureRecognizerState.changed;
                    this.handleEvent("changed");
                    this.emit("changed", this);
                }
            }
            else if (it.phase == UITouch_1.UITouchPhase.ended) {
                clearTimeout(this.timerTask);
                this.timerTask = undefined;
                if (this.state == UIGestureRecognizer_1.UIGestureRecognizerState.began || this.state == UIGestureRecognizer_1.UIGestureRecognizerState.changed) {
                    this.state = UIGestureRecognizer_1.UIGestureRecognizerState.ended;
                    this.handleEvent("ended");
                    this.emit("ended", this);
                    setTimeout(() => {
                        UIView_1.UIView.recognizedGesture = undefined;
                    }, 0);
                }
                this.state = UIGestureRecognizer_1.UIGestureRecognizerState.possible;
                this.beganPoints = {};
            }
            else if (it.phase == UITouch_1.UITouchPhase.cancelled) {
                clearTimeout(this.timerTask);
                this.timerTask = undefined;
                if (this.state == UIGestureRecognizer_1.UIGestureRecognizerState.began || this.state == UIGestureRecognizer_1.UIGestureRecognizerState.changed) {
                    this.state = UIGestureRecognizer_1.UIGestureRecognizerState.cancelled;
                    this.handleEvent("cancelled");
                    this.emit("cancelled", this);
                    setTimeout(() => {
                        UIView_1.UIView.recognizedGesture = undefined;
                    }, 0);
                }
                this.state = UIGestureRecognizer_1.UIGestureRecognizerState.possible;
                this.beganPoints = {};
            }
        });
    }
}
exports.UILongPressGestureRecognizer = UILongPressGestureRecognizer;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const UIView_1 = __webpack_require__(1);
const UIPoint_1 = __webpack_require__(12);
const UISize_1 = __webpack_require__(11);
const UIEdgeInsets_1 = __webpack_require__(8);
const UIPanGestureRecognizer_1 = __webpack_require__(36);
const UIRefreshControl_1 = __webpack_require__(37);
const UIFetchMoreControl_1 = __webpack_require__(38);
const isIOS = wx.getSystemInfoSync().platform === "ios";
class UIScrollView extends UIView_1.UIView {
    constructor() {
        super();
        this.clazz = "UIScrollView";
        this._panGesture = new UIPanGestureRecognizer_1.UIPanGestureRecognizer;
        this._contentOffset = UIPoint_1.UIPointZero;
        this._contentSize = UISize_1.UISizeZero;
        this._contentInset = UIEdgeInsets_1.UIEdgeInsetsZero;
        this.adjustInset = UIEdgeInsets_1.UIEdgeInsetsZero;
        this.directionalLockEnabled = false;
        this._bounces = true;
        this._alwaysBounceVertical = false;
        this._alwaysBounceHorizontal = false;
        this._pagingEnabled = false;
        this._scrollEnabled = true;
        this.showsHorizontalScrollIndicator = true; // todo
        this.showsVerticalScrollIndicator = true; // todo
        this.tracking = false;
        this.dragging = false;
        this.decelerating = false;
        this._scrollsToTop = true;
        this._endDraggingVelocity = UIPoint_1.UIPointZero;
        // RefreshControl
        this._refreshControl = undefined;
        this.touchingRefreshControl = false;
        this.touchingRefreshControlBeganWindowY = 0.0;
        this.touchingRefreshOffsetY = 0.0;
        // FetchMoreControl
        this._fetchMoreControl = undefined;
        // Build Data
        this.isContentOffsetScrollAnimated = false;
        this._panGesture.enabled = false;
    }
    get contentOffset() {
        return this._contentOffset;
    }
    set contentOffset(value) {
        this._contentOffset = value;
        this.markFlagDirty("contentOffsetX", "contentOffsetY", "scrollWithAnimation");
        this.isContentOffsetScrollAnimated = false;
    }
    contentOffsetDidChanged() { }
    get contentSize() {
        return this._contentSize;
    }
    set contentSize(value) {
        this._contentSize = value;
        this.markFlagDirty("contentSize", "pagingItems");
    }
    get contentInset() {
        return this._contentInset;
    }
    set contentInset(value) {
        const deltaX = value.left - this._contentInset.left;
        const deltaY = value.top - this._contentInset.top;
        this._contentInset = value;
        this.contentOffset = { x: this.contentOffset.x - deltaX, y: this.contentOffset.y - deltaY };
        this.markFlagDirty("contentInset", "contentSize", "refreshingAnimation");
    }
    get bounces() {
        return this._bounces;
    }
    set bounces(value) {
        this._bounces = value;
    }
    get alwaysBounceVertical() {
        return this._alwaysBounceVertical;
    }
    set alwaysBounceVertical(value) {
        this._alwaysBounceVertical = value;
    }
    get alwaysBounceHorizontal() {
        return this._alwaysBounceHorizontal;
    }
    set alwaysBounceHorizontal(value) {
        this._alwaysBounceHorizontal = value;
    }
    get pagingEnabled() {
        return this._pagingEnabled;
    }
    set pagingEnabled(value) {
        this._pagingEnabled = value;
        this.markFlagDirty("pagingEnabled", "pagingItems");
    }
    get scrollEnabled() {
        return this._scrollEnabled;
    }
    set scrollEnabled(value) {
        this._scrollEnabled = value;
        this.markFlagDirty("direction");
    }
    setContentOffset(contentOffset, animated = false) {
        this.contentOffset = contentOffset;
        this.isContentOffsetScrollAnimated = animated;
    }
    scrollRectToVisible(rect, animated) {
        var targetContentOffset = this.contentOffset;
        if (rect.x < this.contentOffset.x) {
            targetContentOffset = { x: rect.x, y: targetContentOffset.y };
        }
        else if (rect.x + rect.width > this.contentOffset.x + this.bounds.width) {
            targetContentOffset = { x: rect.x + rect.width - this.bounds.width, y: targetContentOffset.y };
        }
        if (rect.y < this.contentOffset.y) {
            targetContentOffset = { x: targetContentOffset.x, y: rect.y };
        }
        else if (rect.y + rect.height > this.contentOffset.y + this.bounds.height) {
            targetContentOffset = { x: targetContentOffset.x, y: rect.y + rect.height - this.bounds.height };
        }
        targetContentOffset = {
            x: Math.max(0.0, Math.min(this.contentSize.width - this.bounds.width, targetContentOffset.x)),
            y: Math.max(0.0, Math.min(this.contentSize.height - this.bounds.height, targetContentOffset.y))
        };
        this.setContentOffset(targetContentOffset, animated);
    }
    get scrollsToTop() {
        return this._scrollsToTop;
    }
    set scrollsToTop(value) {
        this._scrollsToTop = value;
        this.markFlagDirty("scrollsToTop");
    }
    // Delegates
    didScroll() {
        this.emit("didScroll", this);
        this.contentOffsetDidChanged();
    }
    willBeginDragging() {
        UIView_1.UIView.recognizedGesture = this._panGesture;
        this.emit("willBeginDragging", this);
        this.tracking = true;
        this.dragging = true;
    }
    willEndDragging(velocity) {
        this._endDraggingVelocity = velocity;
        this.emit("willEndDragging", this, velocity);
    }
    didEndDragging(decelerate) {
        this.tracking = false;
        this.dragging = false;
        this.emit("didEndDragging", this, decelerate);
    }
    willBeginDecelerating() {
        this.emit("willBeginDecelerating", this);
        this.decelerating = true;
    }
    didEndDecelerating() {
        this.decelerating = false;
        this.emit("didEndDecelerating", this);
    }
    didEndScrollingAnimation() {
        this.emit("didEndScrollingAnimation", this);
    }
    didScrollToTop() {
        this.emit("didScrollToTop", this);
    }
    layoutSubviews() {
        super.layoutSubviews();
        if (this.refreshControl) {
            this.refreshControl.animationView.frame = { x: 0.0, y: 0.0, width: this.bounds.width, height: 44.0 };
        }
        this.markFlagDirty("direction");
    }
    addSubview(view) {
        if (view instanceof UIRefreshControl_1.UIRefreshControl) {
            this.refreshControl = view;
            return;
        }
        if (view instanceof UIFetchMoreControl_1.UIFetchMoreControl) {
            this.fetchMoreControl = view;
            return;
        }
        super.addSubview(view);
    }
    get refreshControl() {
        return this._refreshControl;
    }
    set refreshControl(value) {
        this._refreshControl = value;
        if (value) {
            this.markFlagDirty("refreshControlAnimationView");
            value.animationView.frame = { x: 0, y: 0, width: this.bounds.width, height: 44.0 };
            value.scrollView = this;
        }
    }
    createRefreshEffect(translation) {
        if (this.refreshControl && this.refreshControl.enabled && this.contentSize.width <= this.bounds.width) {
            if (isIOS) {
                if (this.contentOffset.y < -this.contentInset.top) {
                    const progress = Math.max(0.0, Math.min(1.0, (-this.contentInset.top - (this.contentOffset.y)) / (88.0)));
                    this.refreshControl.animationView.alpha = progress;
                }
                else {
                    this.refreshControl.animationView.alpha = 0.0;
                }
            }
            else {
                if (this.contentOffset.y - translation.y < -this.contentInset.top) {
                    const progress = Math.max(0.0, Math.min(1.0, (-this.contentInset.top - (this.contentOffset.y - translation.y)) / (88.0 * 2)));
                    this.refreshControl.animationView.alpha = progress;
                    this.touchingRefreshOffsetY = translation.y / 3.0;
                    this.markFlagDirty("refreshOffset", "refreshingAnimation");
                }
            }
        }
        return undefined;
    }
    touchesBegan(touches) {
        super.touchesBegan(touches);
        this.touchingRefreshControl = this.contentOffset.y <= -this.contentInset.top + 8.0;
        if (this.touchingRefreshControl && touches[0] && touches[0].windowPoint) {
            this.touchingRefreshControlBeganWindowY = touches[0].windowPoint.y;
        }
    }
    touchesMoved(touches) {
        super.touchesMoved(touches);
        if (this.refreshControl && this.refreshControl.enabled && this.touchingRefreshControl && touches[0] && touches[0].windowPoint && this.contentOffset.y <= 0.0) {
            const translateY = touches[0].windowPoint.y - this.touchingRefreshControlBeganWindowY;
            this.createRefreshEffect({ x: 0, y: translateY });
        }
    }
    touchesEnded(touches) {
        super.touchesEnded(touches);
        if (this.refreshControl !== undefined && this.refreshControl.animationView.alpha >= 1.0) {
            this.refreshControl.beginRefreshing_callFromScrollView();
        }
        else if (this.refreshControl !== undefined && this.refreshControl.animationView.alpha > 0.0) {
            this.refreshControl.animationView.alpha = 0.0;
        }
        this.touchingRefreshOffsetY = 0.0;
        this.markFlagDirty("refreshOffset");
    }
    touchesCancelled(touches) {
        super.touchesCancelled(touches);
    }
    get fetchMoreControl() {
        return this._fetchMoreControl;
    }
    set fetchMoreControl(value) {
        this._fetchMoreControl = value;
        if (value) {
            value.scrollView = this;
        }
    }
    createFetchMoreEffect() {
        if (this.fetchMoreControl && this.fetchMoreControl.enabled && this.contentSize.width <= this.bounds.width) {
            if (this.fetchMoreControl.fetching) {
                return true;
            }
            else {
                this.fetchMoreControl.beginFetching();
                return true;
            }
        }
        return false;
    }
    buildData() {
        let data = super.buildData();
        const totalContentSize = {
            width: this.contentSize.width + this.contentInset.left + this.contentInset.right,
            height: this.contentSize.height + this.contentInset.top + this.contentInset.bottom
        };
        if (this.dirtyFlags["contentOffsetX"] || this.dirtyFlags["contentOffsetY"]) {
            data.contentOffsetX = this.contentOffset.x + this.contentInset.left;
            data.contentOffsetY = this.contentOffset.y + this.contentInset.top;
            data.scrollWithAnimation = this.isContentOffsetScrollAnimated;
        }
        data.pagingEnabled = this.pagingEnabled;
        data.pagingItems = (() => {
            if (!this.pagingEnabled) {
                return [];
            }
            if (totalContentSize.width > this.bounds.width) {
                let items = [];
                let count = Math.ceil(totalContentSize.width / this.bounds.width);
                for (let index = 0; index < count; index++) {
                    items.push(0);
                }
                return items;
            }
            else if (totalContentSize.height > this.bounds.height) {
                let items = [];
                let count = Math.ceil(totalContentSize.height / this.bounds.height);
                for (let index = 0; index < count; index++) {
                    items.push(1);
                }
                return items;
            }
            else {
                return [0];
            }
        })();
        data.pagingDuration = 300;
        if (this.dirtyFlags["contentOffsetX"] || this.dirtyFlags["contentOffsetY"]) {
            if (this.pagingEnabled) {
                this.setDataForce({ pagingDuration: this.isContentOffsetScrollAnimated ? 300 : 0 });
                this.setDataForce({
                    pagingCurrentIndex: (totalContentSize.width > this.bounds.width) ?
                        Math.round((this.contentOffset.x + this.contentInset.left) / this.bounds.width) :
                        Math.round((this.contentOffset.y + this.contentInset.top) / this.bounds.height)
                });
                this.setDataForce({ pagingDuration: 300 });
            }
        }
        data.scrollsToTop = this.scrollsToTop;
        data.direction = (() => {
            if (totalContentSize.width > this.bounds.width && totalContentSize.height > this.bounds.height) {
                return "all";
            }
            else if (totalContentSize.width > this.bounds.width) {
                return "horizontal";
            }
            else if (totalContentSize.height > this.bounds.height) {
                return "vertical";
            }
            else {
                return "none";
            }
        })();
        data.contentSize = totalContentSize;
        data.contentInset = this.contentInset;
        if (!this._scrollEnabled) {
            data.direction = "none";
        }
        if (this.refreshControl) {
            data.refreshControlAnimationView = {
                clazz: "UIView",
                viewID: this.refreshControl.animationView.viewID
            };
            data.refreshing = this.refreshControl.refreshing ? 44 : 0;
            if (isIOS) {
                data.refreshingAnimation = wx.createAnimation({ timingFunction: "linear", duration: this.dirtyFlags["refreshing"] ? 300 : 0 }).matrix(1.0, 0.0, 0.0, 1.0, 0.0, this.contentInset.top + (this.refreshControl.refreshing ? 44 : 0)).step().export();
                this.adjustInset = { top: this.refreshControl.refreshing ? 44 : 0, left: 0, bottom: 0, right: 0 };
            }
            else {
                data.refreshOffset = this.refreshControl.refreshing ? 44 : this.touchingRefreshOffsetY;
                this.adjustInset = { top: this.refreshControl.refreshing ? 44 : 0, left: 0, bottom: 0, right: 0 };
            }
        }
        return data;
    }
}
exports.UIScrollView = UIScrollView;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Ticker {
    constructor() {
        this.taskBlocks = {};
        this.timerHandler = undefined;
    }
    static get shared() {
        if (getApp().TickerShared === undefined) {
            getApp().TickerShared = new Ticker;
        }
        return getApp().TickerShared;
    }
    hasTask(taskID) {
        return this.taskBlocks[taskID] !== undefined;
    }
    addTask(taskID, taskBlock) {
        this.taskBlocks[taskID] = taskBlock;
        this.activeTimer();
    }
    run() {
        const currentBlocks = this.taskBlocks;
        this.taskBlocks = {};
        this.timerHandler = undefined;
        if (Object.keys(currentBlocks).length > 0) {
            for (const key in currentBlocks) {
                try {
                    currentBlocks[key]();
                }
                catch (error) { }
            }
        }
    }
    activeTimer() {
        if (this.timerHandler !== undefined) {
            return;
        }
        this.timerHandler = setTimeout(this.run.bind(this), 16);
    }
}
exports.Ticker = Ticker;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Matrix_1 = __webpack_require__(33);
exports.UIAffineTransformIdentity = { a: 1.0, b: 0.0, c: 0.0, d: 1.0, tx: 0.0, ty: 0.0 };
exports.UIAffineTransformMake = function (a, b, c, d, tx, ty) {
    return { a, b, c, d, tx, ty };
};
exports.UIAffineTransformMakeTranslation = function (tx, ty) {
    return exports.UIAffineTransformMake(1.0, 0.0, 0.0, 1.0, tx, ty);
};
exports.UIAffineTransformMakeScale = function (sx, sy) {
    return exports.UIAffineTransformMake(sx, 0.0, 0.0, sy, 0.0, 0.0);
};
exports.UIAffineTransformMakeRotation = function (angle) {
    const mCos = Math.cos(angle);
    const mSin = Math.sin(angle);
    return exports.UIAffineTransformMake(mCos, -mSin, mSin, mCos, 0.0, 0.0);
};
exports.UIAffineTransformTranslate = function (t, tx, ty) {
    const matrix = new Matrix_1.Matrix();
    matrix.setValues(t);
    matrix.postTranslate(tx, ty);
    return matrix.getValues();
};
exports.UIAffineTransformScale = function (t, sx, sy) {
    const matrix = new Matrix_1.Matrix();
    matrix.setValues(t);
    matrix.postScale(sx, sx);
    return matrix.getValues();
};
exports.UIAffineTransformRotate = function (t, angle) {
    const matrix = new Matrix_1.Matrix();
    matrix.setValues(t);
    matrix.postRotate(angle);
    return matrix.getValues();
};
exports.UIAffineTransformInvert = function (t) {
    return {
        a: t.a,
        b: t.c,
        c: t.b,
        d: t.d,
        tx: t.tx,
        ty: t.ty,
    };
};
exports.UIAffineTransformConcat = function (t1, t2) {
    const matrix1 = new Matrix_1.Matrix;
    matrix1.setValues(t1);
    const matrix2 = new Matrix_1.Matrix;
    matrix2.setValues(t2);
    matrix1.concat(matrix2);
    return matrix1.getValues();
};
exports.UIAffineTransformEqualToTransform = function (t1, t2) {
    return Math.abs(t1.a - t2.a) < 0.001 &&
        Math.abs(t1.b - t2.b) < 0.001 &&
        Math.abs(t1.c - t2.c) < 0.001 &&
        Math.abs(t1.d - t2.d) < 0.001 &&
        Math.abs(t1.tx - t2.tx) < 0.001 &&
        Math.abs(t1.ty - t2.ty) < 0.001;
};
exports.UIAffineTransformIsIdentity = function (transform) {
    return exports.UIAffineTransformEqualToTransform(transform, exports.UIAffineTransformIdentity);
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const UITouch_1 = __webpack_require__(10);
const UIGestureRecognizer_1 = __webpack_require__(14);
const UIView_1 = __webpack_require__(1);
class UITapGestureRecognizer extends UIGestureRecognizer_1.UIGestureRecognizer {
    constructor() {
        super(...arguments);
        this.numberOfTapsRequired = 1;
        this.numberOfTouchesRequired = 1;
        this.beganPoints = {};
        this.validPointsCount = 0;
    }
    handleTouch(touches) {
        super.handleTouch(touches);
        touches.forEach(it => {
            if (it.phase == UITouch_1.UITouchPhase.began) {
                if (UIView_1.UIView.recognizedGesture != undefined) {
                    this.beganPoints = {};
                    return;
                }
                if (it.windowPoint) {
                    this.beganPoints[it.identifier] = it.windowPoint;
                }
            }
            else if (it.phase == UITouch_1.UITouchPhase.moved) {
                if (it.windowPoint && this.beganPoints[it.identifier]) {
                    if (Math.abs(this.beganPoints[it.identifier].x - it.windowPoint.x) >= 22.0 || Math.abs(this.beganPoints[it.identifier].y - it.windowPoint.y) >= 22.0) {
                        delete this.beganPoints[it.identifier];
                    }
                }
            }
            else if (it.phase == UITouch_1.UITouchPhase.ended) {
                if (UIView_1.UIView.recognizedGesture != undefined) {
                    this.beganPoints = {};
                    this.state = UIGestureRecognizer_1.UIGestureRecognizerState.possible;
                    this.validPointsCount = 0;
                    return;
                }
                if (it.tapCount >= this.numberOfTapsRequired && this.beganPoints[it.identifier] != undefined) {
                    this.validPointsCount++;
                }
                delete this.beganPoints[it.identifier];
                if (this.validPointsCount >= this.numberOfTouchesRequired) {
                    UIView_1.UIView.recognizedGesture = this;
                    this.state = UIGestureRecognizer_1.UIGestureRecognizerState.ended;
                    this.handleEvent("touch");
                    this.emit("touch", this);
                    setTimeout(() => {
                        UIView_1.UIView.recognizedGesture = undefined;
                    }, 0);
                }
                if (Object.keys(this.beganPoints).length == 0 || this.state == UIGestureRecognizer_1.UIGestureRecognizerState.ended) {
                    this.state = UIGestureRecognizer_1.UIGestureRecognizerState.possible;
                    this.validPointsCount = 0;
                }
            }
        });
    }
}
exports.UITapGestureRecognizer = UITapGestureRecognizer;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const UIView_1 = __webpack_require__(1);
const UIColor_1 = __webpack_require__(5);
const UIEnums_1 = __webpack_require__(6);
class UILabel extends UIView_1.UIView {
    constructor() {
        super(...arguments);
        this.clazz = "UILabel";
        this._text = undefined;
        this._attributedText = undefined;
        this._font = undefined;
        this._textColor = undefined;
        this._textAlignment = UIEnums_1.UITextAlignment.left;
        this._numberOfLines = 1;
    }
    get text() {
        return this._text;
    }
    set text(value) {
        if (this._text === value) {
            return;
        }
        this._text = value;
        this.markFlagDirty("text", "richText");
    }
    get attributedText() {
        return this._attributedText;
    }
    set attributedText(value) {
        if (this._attributedText === value) {
            return;
        }
        this._attributedText = value;
        this.markFlagDirty("text", "richText");
    }
    get font() {
        return this._font;
    }
    set font(value) {
        if (this._font === value) {
            return;
        }
        this._font = value;
        this.markFlagDirty("textStyle");
    }
    get textColor() {
        return this._textColor;
    }
    set textColor(value) {
        if (this._textColor === value) {
            return;
        }
        this._textColor = value;
        this.markFlagDirty("textStyle");
    }
    get textAlignment() {
        return this._textAlignment;
    }
    set textAlignment(value) {
        if (this._textAlignment === value) {
            return;
        }
        this._textAlignment = value;
        this.markFlagDirty("textStyle");
    }
    get numberOfLines() {
        return this._numberOfLines;
    }
    set numberOfLines(value) {
        if (this._numberOfLines === value) {
            return;
        }
        this._numberOfLines = value;
        this.markFlagDirty("textStyle");
    }
    // invalidate
    buildData() {
        let data = super.buildData();
        if (this.attributedText) {
            data.richText = this.attributedText.toHTMLText();
        }
        else {
            data.text = this._text !== undefined ? this._text : "";
        }
        data.textStyle = `
            line-height: 1.0;
            color: ${this._textColor !== undefined ? UIColor_1.UIColor.toStyle(this._textColor) : "black"};
            font-size: ${this._font !== undefined ? this._font.pointSize : 14}px;
            font-family: ${this._font !== undefined ? this._font.fontName : ""}; 
            font-weight: ${this._font !== undefined ? this._font.fontStyle : ""}; 
            font-style: ${this._font !== undefined ? this._font.fontStyle : ""}; 
            text-align: ${(() => {
            switch (this._textAlignment) {
                case UIEnums_1.UITextAlignment.left:
                    return "left";
                case UIEnums_1.UITextAlignment.center:
                    return "center";
                case UIEnums_1.UITextAlignment.right:
                    return "right";
            }
            return "left";
        })()};
            ${(() => {
            if (this._numberOfLines === 1) {
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
        }`;
        return data;
    }
}
exports.UILabel = UILabel;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const UIView_1 = __webpack_require__(1);
const UIEnums_1 = __webpack_require__(6);
class UIImageView extends UIView_1.UIView {
    constructor() {
        super(...arguments);
        this.clazz = "UIImageView";
        this._image = undefined;
        this._contentMode = UIEnums_1.UIViewContentMode.scaleToFill;
    }
    get image() {
        return this._image;
    }
    set image(value) {
        if (this._image === value) {
            return;
        }
        this._image = value;
        this.markFlagDirty("imageSource");
    }
    get contentMode() {
        return this._contentMode;
    }
    set contentMode(value) {
        if (this._contentMode === value) {
            return;
        }
        this._contentMode = value;
        this.markFlagDirty("scaleMode");
    }
    buildData() {
        let data = super.buildData();
        data.imageSource = this._image !== undefined ? this._image.imageSource : null;
        data.scaleMode = (() => {
            switch (this._contentMode) {
                case UIEnums_1.UIViewContentMode.scaleToFill:
                    return "scaleToFill";
                case UIEnums_1.UIViewContentMode.scaleAspectFit:
                    return "aspectFit";
                case UIEnums_1.UIViewContentMode.scaleAspectFill:
                    return "aspectFill";
            }
            return "scaleToFill";
        })();
        return data;
    }
}
exports.UIImageView = UIImageView;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class UIIndexPath {
    constructor(row, section) {
        this.row = row;
        this.section = section;
    }
    mapKey() {
        return `${this.row}-${this.section}`;
    }
}
exports.UIIndexPath = UIIndexPath;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const UIView_1 = __webpack_require__(1);
const UIColor_1 = __webpack_require__(5);
const EventEmitter_1 = __webpack_require__(13);
class UINavigationItem {
    constructor() {
        this.viewController = undefined;
        this.navigationBar = undefined;
        this.leftBarButtonItems = [];
        this.rightBarButtonItems = [];
    }
    setNeedsUpdate() { }
}
exports.UINavigationItem = UINavigationItem;
class UIBarButtonItem extends EventEmitter_1.EventEmitter {
}
exports.UIBarButtonItem = UIBarButtonItem;
class UINavigationBar extends UIView_1.UIView {
    constructor() {
        super();
        this.navigationController = undefined;
        this._barTintColor = undefined;
        this.barTintColor = UIColor_1.UIColor.white;
        this.tintColor = UIColor_1.UIColor.black;
    }
    get barTintColor() {
        return this._barTintColor;
    }
    set barTintColor(value) {
        this._barTintColor = value;
        if (this.navigationController) {
            this.navigationController.updateBrowserBar();
        }
    }
    tintColorDidChange() {
        super.tintColorDidChange();
        if (this.navigationController) {
            this.navigationController.updateBrowserBar();
        }
    }
}
exports.UINavigationBar = UINavigationBar;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const URL_1 = __webpack_require__(16);
const Data_1 = __webpack_require__(17);
class Bundle {
    constructor(type) {
        this.type = type;
        this.resources = {};
    }
    resourcePath(name, type, inDirectory) {
        if (this.type === "native") {
            if (inDirectory !== undefined) {
                return `${inDirectory}/${name}${type !== undefined ? "." + type : ""}`;
            }
            else {
                return `${name}${type !== undefined ? "." + type : ""}`;
            }
        }
        else if (this.type === "js") {
            if (inDirectory !== undefined && this.resources[`${inDirectory}/${name}${type !== undefined ? "." + type : ""}`] !== undefined) {
                return `xt://${inDirectory}/${name}${type !== undefined ? "." + type : ""}`;
            }
            else if (this.resources[`${name}${type !== undefined ? "." + type : ""}`] !== undefined) {
                return `xt://${name}${type !== undefined ? "." + type : ""}`;
            }
        }
    }
    resourceURL(name, type, inDirectory) {
        const path = this.resourcePath(name, type, inDirectory);
        return path !== undefined ? URL_1.URL.URLWithString(path) : undefined;
    }
    addResource(path, base64String) {
        if (this.type === "js") {
            this.resources[path] = new Data_1.Data({ base64EncodedString: base64String });
        }
    }
}
Bundle.native = new Bundle("native");
Bundle.js = new Bundle("js");
exports.Bundle = Bundle;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const URL_1 = __webpack_require__(16);
var URLRequestCachePolicy;
(function (URLRequestCachePolicy) {
    URLRequestCachePolicy[URLRequestCachePolicy["useProtocol"] = 0] = "useProtocol";
    URLRequestCachePolicy[URLRequestCachePolicy["ignoringLocalCache"] = 1] = "ignoringLocalCache";
    URLRequestCachePolicy[URLRequestCachePolicy["returnCacheElseLoad"] = 2] = "returnCacheElseLoad";
    URLRequestCachePolicy[URLRequestCachePolicy["returnCacheDontLoad"] = 3] = "returnCacheDontLoad";
})(URLRequestCachePolicy = exports.URLRequestCachePolicy || (exports.URLRequestCachePolicy = {}));
class URLRequest {
    constructor(aURL, cachePolicy = URLRequestCachePolicy.useProtocol, timeout = 15) {
        this.cachePolicy = cachePolicy;
        this.timeout = timeout;
        this.HTTPMethod = undefined;
        this.allHTTPHeaderFields = undefined;
        this.URL = aURL instanceof URL_1.URL ? aURL : (() => {
            const url = URL_1.URL.URLWithString(aURL);
            if (url === undefined) {
                throw Error("invalid URLString.");
            }
            return url;
        })();
    }
    valueForHTTPHeaderField(field) {
        return undefined;
    }
    mutable() {
        return Object.assign(new MutableURLRequest(this.URL, this.cachePolicy, this.timeout), this);
    }
}
exports.URLRequest = URLRequest;
class MutableURLRequest extends URLRequest {
    constructor() {
        super(...arguments);
        this.HTTPMethod = "GET";
        this.allHTTPHeaderFields = {};
        this.HTTPBody = undefined;
    }
    setValueForHTTPHeaderField(value, field) {
        if (this.allHTTPHeaderFields === undefined) {
            this.allHTTPHeaderFields = {};
        }
        this.allHTTPHeaderFields[field] = value;
    }
    immutable() {
        return Object.assign(new URLRequest(this.URL, this.cachePolicy, this.timeout), this);
    }
}
exports.MutableURLRequest = MutableURLRequest;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class URLResponse {
    constructor() {
        this.URL = undefined;
        this.expectedContentLength = 0;
        this.MIMEType = undefined;
        this.textEncodingName = undefined;
        this.statusCode = 0;
        this.allHeaderFields = {};
    }
}
exports.URLResponse = URLResponse;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class UUID {
    constructor(UUIDString = undefined) {
        this.UUIDString = UUIDString || this.uuidv4();
    }
    uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}
exports.UUID = UUID;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class MatrixAlgorithm {
    constructor() {
        this.props = [];
        this.props[0] = 1;
        this.props[1] = 0;
        this.props[2] = 0;
        this.props[3] = 0;
        this.props[4] = 0;
        this.props[5] = 1;
        this.props[6] = 0;
        this.props[7] = 0;
        this.props[8] = 0;
        this.props[9] = 0;
        this.props[10] = 1;
        this.props[11] = 0;
        this.props[12] = 0;
        this.props[13] = 0;
        this.props[14] = 0;
        this.props[15] = 1;
    }
    rotate(angle) {
        if (angle === 0) {
            return this;
        }
        var mCos = Math.cos(angle);
        var mSin = Math.sin(angle);
        return this._t(mCos, -mSin, 0, 0, mSin, mCos, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    }
    rotateX(angle) {
        if (angle === 0) {
            return this;
        }
        var mCos = Math.cos(angle);
        var mSin = Math.sin(angle);
        return this._t(1, 0, 0, 0, 0, mCos, -mSin, 0, 0, mSin, mCos, 0, 0, 0, 0, 1);
    }
    rotateY(angle) {
        if (angle === 0) {
            return this;
        }
        var mCos = Math.cos(angle);
        var mSin = Math.sin(angle);
        return this._t(mCos, 0, mSin, 0, 0, 1, 0, 0, -mSin, 0, mCos, 0, 0, 0, 0, 1);
    }
    rotateZ(angle) {
        if (angle === 0) {
            return this;
        }
        var mCos = Math.cos(angle);
        var mSin = Math.sin(angle);
        return this._t(mCos, -mSin, 0, 0, mSin, mCos, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    }
    shear(sx, sy) {
        return this._t(1, sy, sx, 1, 0, 0);
    }
    skew(ax, ay) {
        return this.shear(Math.tan(ax), Math.tan(ay));
    }
    skewFromAxis(ax, angle) {
        var mCos = Math.cos(angle);
        var mSin = Math.sin(angle);
        return this._t(mCos, mSin, 0, 0, -mSin, mCos, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        this._t(1, 0, 0, 0, Math.tan(ax), 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        this._t(mCos, -mSin, 0, 0, mSin, mCos, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        //return this._t(mCos, mSin, -mSin, mCos, 0, 0)._t(1, 0, Math.tan(ax), 1, 0, 0)._t(mCos, -mSin, mSin, mCos, 0, 0);
    }
    scale(sx, sy, sz) {
        sz = isNaN(sz) ? 1 : sz;
        if (sx == 1 && sy == 1 && sz == 1) {
            return this;
        }
        return this._t(sx, 0, 0, 0, 0, sy, 0, 0, 0, 0, sz, 0, 0, 0, 0, 1);
    }
    setTransform(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
        this.props[0] = a;
        this.props[1] = b;
        this.props[2] = c;
        this.props[3] = d;
        this.props[4] = e;
        this.props[5] = f;
        this.props[6] = g;
        this.props[7] = h;
        this.props[8] = i;
        this.props[9] = j;
        this.props[10] = k;
        this.props[11] = l;
        this.props[12] = m;
        this.props[13] = n;
        this.props[14] = o;
        this.props[15] = p;
        return this;
    }
    translate(tx, ty, tz) {
        tz = isNaN(tz) ? 0 : tz;
        if (tx !== 0 || ty !== 0 || tz !== 0) {
            return this._t(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, tx, ty, tz, 1);
        }
        return this;
    }
    _t(a2, b2, c2, d2, e2, f2, g2, h2, i2, j2, k2, l2, m2, n2, o2, p2) {
        this.transform(a2, b2, c2, d2, e2, f2, g2, h2, i2, j2, k2, l2, m2, n2, o2, p2);
    }
    transform(a2, b2, c2, d2, e2, f2, g2, h2, i2, j2, k2, l2, m2, n2, o2, p2) {
        if (a2 === 1 && b2 === 0 && c2 === 0 && d2 === 0 && e2 === 0 && f2 === 1 && g2 === 0 && h2 === 0 && i2 === 0 && j2 === 0 && k2 === 1 && l2 === 0) {
            if (m2 !== 0 || n2 !== 0 || o2 !== 0) {
                this.props[12] = this.props[12] * a2 + this.props[13] * e2 + this.props[14] * i2 + this.props[15] * m2;
                this.props[13] = this.props[12] * b2 + this.props[13] * f2 + this.props[14] * j2 + this.props[15] * n2;
                this.props[14] = this.props[12] * c2 + this.props[13] * g2 + this.props[14] * k2 + this.props[15] * o2;
                this.props[15] = this.props[12] * d2 + this.props[13] * h2 + this.props[14] * l2 + this.props[15] * p2;
            }
            return this;
        }
        var a1 = this.props[0];
        var b1 = this.props[1];
        var c1 = this.props[2];
        var d1 = this.props[3];
        var e1 = this.props[4];
        var f1 = this.props[5];
        var g1 = this.props[6];
        var h1 = this.props[7];
        var i1 = this.props[8];
        var j1 = this.props[9];
        var k1 = this.props[10];
        var l1 = this.props[11];
        var m1 = this.props[12];
        var n1 = this.props[13];
        var o1 = this.props[14];
        var p1 = this.props[15];
        /* matrix order (canvas compatible):
         * ace
         * bdf
         * 001
         */
        this.props[0] = a1 * a2 + b1 * e2 + c1 * i2 + d1 * m2;
        this.props[1] = a1 * b2 + b1 * f2 + c1 * j2 + d1 * n2;
        this.props[2] = a1 * c2 + b1 * g2 + c1 * k2 + d1 * o2;
        this.props[3] = a1 * d2 + b1 * h2 + c1 * l2 + d1 * p2;
        this.props[4] = e1 * a2 + f1 * e2 + g1 * i2 + h1 * m2;
        this.props[5] = e1 * b2 + f1 * f2 + g1 * j2 + h1 * n2;
        this.props[6] = e1 * c2 + f1 * g2 + g1 * k2 + h1 * o2;
        this.props[7] = e1 * d2 + f1 * h2 + g1 * l2 + h1 * p2;
        this.props[8] = i1 * a2 + j1 * e2 + k1 * i2 + l1 * m2;
        this.props[9] = i1 * b2 + j1 * f2 + k1 * j2 + l1 * n2;
        this.props[10] = i1 * c2 + j1 * g2 + k1 * k2 + l1 * o2;
        this.props[11] = i1 * d2 + j1 * h2 + k1 * l2 + l1 * p2;
        this.props[12] = m1 * a2 + n1 * e2 + o1 * i2 + p1 * m2;
        this.props[13] = m1 * b2 + n1 * f2 + o1 * j2 + p1 * n2;
        this.props[14] = m1 * c2 + n1 * g2 + o1 * k2 + p1 * o2;
        this.props[15] = m1 * d2 + n1 * h2 + o1 * l2 + p1 * p2;
        return this;
    }
    clone(matr) {
        var i;
        for (i = 0; i < 16; i += 1) {
            matr.props[i] = this.props[i];
        }
    }
    cloneFromProps(props) {
        var i;
        for (i = 0; i < 16; i += 1) {
            this.props[i] = props[i];
        }
    }
    applyToPoint(x, y, z) {
        return {
            x: x * this.props[0] + y * this.props[4] + z * this.props[8] + this.props[12],
            y: x * this.props[1] + y * this.props[5] + z * this.props[9] + this.props[13],
            z: x * this.props[2] + y * this.props[6] + z * this.props[10] + this.props[14]
        };
        /*return {
         x: x * me.a + y * me.c + me.e,
         y: x * me.b + y * me.d + me.f
         };*/
    }
    applyToX(x, y, z) {
        return x * this.props[0] + y * this.props[4] + z * this.props[8] + this.props[12];
    }
    applyToY(x, y, z) {
        return x * this.props[1] + y * this.props[5] + z * this.props[9] + this.props[13];
    }
    applyToZ(x, y, z) {
        return x * this.props[2] + y * this.props[6] + z * this.props[10] + this.props[14];
    }
    applyToPointArray(x, y, z) {
        return [x * this.props[0] + y * this.props[4] + z * this.props[8] + this.props[12], x * this.props[1] + y * this.props[5] + z * this.props[9] + this.props[13], x * this.props[2] + y * this.props[6] + z * this.props[10] + this.props[14]];
    }
    applyToPointStringified(x, y) {
        return (Math.round(x * this.props[0] + y * this.props[4] + this.props[12])) + ',' + (Math.round(x * this.props[1] + y * this.props[5] + this.props[13]));
    }
}
exports.MatrixAlgorithm = MatrixAlgorithm;
class Matrix {
    constructor(a = 1.0, b = 0.0, c = 0.0, d = 1.0, tx = 0.0, ty = 0.0) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.tx = tx;
        this.ty = ty;
    }
    static unmatrix(matrix) {
        var A = matrix.a;
        var B = matrix.b;
        var C = matrix.c;
        var D = matrix.d;
        if (A * D == B * C) {
            return { scale: { x: 1.0, y: 1.0 }, degree: 0.0, translate: { x: 0.0, y: 0.0 } };
        }
        // step (3)
        var scaleX = Math.sqrt(A * A + B * B);
        A /= scaleX;
        B /= scaleX;
        // step (4)
        var skew = A * C + B * D;
        C -= A * skew;
        D -= B * skew;
        // step (5)
        var scaleY = Math.sqrt(C * C + D * D);
        C /= scaleY;
        D /= scaleY;
        skew /= scaleY;
        // step (6)
        if (A * D < B * C) {
            A = -A;
            B = -B;
            skew = -skew;
            scaleX = -scaleX;
        }
        return { scale: { x: scaleX, y: scaleY }, degree: Math.atan2(B, A) / (Math.PI / 180), translate: { x: matrix.tx, y: matrix.ty } };
    }
    setValues(values) {
        this.a = values.a;
        this.b = values.b;
        this.c = values.c;
        this.d = values.d;
        this.tx = values.tx;
        this.ty = values.ty;
    }
    getValues() {
        return {
            a: this.a,
            b: this.b,
            c: this.c,
            d: this.d,
            tx: this.tx,
            ty: this.ty,
        };
    }
    isIdentity() {
        return this.a == 1 && this.b == 0 && this.c == 0 && this.d == 1 && this.tx == 0 && this.ty == 0;
    }
    setScale(x, y) {
        const obj = new MatrixAlgorithm();
        const unMatrix = Matrix.unmatrix(this);
        obj.rotate(-(unMatrix.degree * Math.PI / 180));
        obj.scale((x || unMatrix.scale.x), (y || unMatrix.scale.y), 1.0);
        obj.translate(unMatrix.translate.x, unMatrix.translate.y, 0.0);
        this.a = obj.props[0];
        this.b = obj.props[1];
        this.c = obj.props[4];
        this.d = obj.props[5];
        this.tx = obj.props[12];
        this.ty = obj.props[13];
    }
    postScale(x, y) {
        const obj = new MatrixAlgorithm();
        const unMatrix = Matrix.unmatrix(this);
        obj.rotate(-(unMatrix.degree * Math.PI / 180));
        obj.scale(unMatrix.scale.x, unMatrix.scale.y, 1.0);
        obj.translate(unMatrix.translate.x, unMatrix.translate.y, 0.0);
        obj.scale((x || 1.0), (y || 1.0), 1.0);
        this.a = obj.props[0];
        this.b = obj.props[1];
        this.c = obj.props[4];
        this.d = obj.props[5];
        this.tx = obj.props[12];
        this.ty = obj.props[13];
    }
    setTranslate(x, y) {
        const obj = new MatrixAlgorithm();
        const unMatrix = Matrix.unmatrix(this);
        obj.rotate(-(unMatrix.degree * Math.PI / 180));
        obj.scale(unMatrix.scale.x, unMatrix.scale.y, 1.0);
        obj.translate(x || unMatrix.translate.x, y || unMatrix.translate.y, 0.0);
        this.a = obj.props[0];
        this.b = obj.props[1];
        this.c = obj.props[4];
        this.d = obj.props[5];
        this.tx = obj.props[12];
        this.ty = obj.props[13];
    }
    postTranslate(x, y) {
        const obj = new MatrixAlgorithm();
        const unMatrix = Matrix.unmatrix(this);
        obj.rotate(-(unMatrix.degree * Math.PI / 180));
        obj.scale(unMatrix.scale.x, unMatrix.scale.y, 1.0);
        obj.translate(unMatrix.translate.x, unMatrix.translate.y, 0.0);
        obj.translate((x || 0.0), (y || 0.0), 0.0);
        this.a = obj.props[0];
        this.b = obj.props[1];
        this.c = obj.props[4];
        this.d = obj.props[5];
        this.tx = obj.props[12];
        this.ty = obj.props[13];
    }
    setRotate(angle) {
        const obj = new MatrixAlgorithm();
        const unMatrix = Matrix.unmatrix(this);
        obj.rotate(-angle || -(unMatrix.degree * Math.PI / 180));
        obj.scale(unMatrix.scale.x, unMatrix.scale.y, 1.0);
        obj.translate(unMatrix.translate.x, unMatrix.translate.y, 0.0);
        this.a = obj.props[0];
        this.b = obj.props[1];
        this.c = obj.props[4];
        this.d = obj.props[5];
        this.tx = obj.props[12];
        this.ty = obj.props[13];
    }
    postRotate(angle) {
        const obj = new MatrixAlgorithm();
        const unMatrix = Matrix.unmatrix(this);
        obj.rotate(-(unMatrix.degree * Math.PI / 180));
        obj.scale(unMatrix.scale.x, unMatrix.scale.y, 1.0);
        obj.translate(unMatrix.translate.x, unMatrix.translate.y, 0.0);
        obj.rotate(-angle);
        this.a = obj.props[0];
        this.b = obj.props[1];
        this.c = obj.props[4];
        this.d = obj.props[5];
        this.tx = obj.props[12];
        this.ty = obj.props[13];
    }
    preConcat(preMatrix) {
        const obj = new MatrixAlgorithm();
        obj.props[0] = preMatrix.a;
        obj.props[1] = preMatrix.b;
        obj.props[4] = preMatrix.c;
        obj.props[5] = preMatrix.d;
        obj.props[12] = preMatrix.tx;
        obj.props[13] = preMatrix.ty;
        obj.transform(this.a, this.b, 0, 0, this.c, this.d, 0, 0, 0, 0, 1, 0, this.tx, this.ty, 0, 1);
        this.a = obj.props[0];
        this.b = obj.props[1];
        this.c = obj.props[4];
        this.d = obj.props[5];
        this.tx = obj.props[12];
        this.ty = obj.props[13];
    }
    concat(postMatrix) {
        const obj = new MatrixAlgorithm();
        obj.props[0] = this.a;
        obj.props[1] = this.b;
        obj.props[4] = this.c;
        obj.props[5] = this.d;
        obj.props[12] = this.tx;
        obj.props[13] = this.ty;
        obj.transform(postMatrix.a, postMatrix.b, 0, 0, postMatrix.c, postMatrix.d, 0, 0, 0, 0, 1, 0, postMatrix.tx, postMatrix.ty, 0, 1);
        this.a = obj.props[0];
        this.b = obj.props[1];
        this.c = obj.props[4];
        this.d = obj.props[5];
        this.tx = obj.props[12];
        this.ty = obj.props[13];
    }
}
exports.Matrix = Matrix;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const UIView_1 = __webpack_require__(1);
const UIFont_1 = __webpack_require__(19);
const UIEnums_1 = __webpack_require__(6);
const UIColor_1 = __webpack_require__(5);
const UIEdgeInsets_1 = __webpack_require__(8);
const UITapGestureRecognizer_1 = __webpack_require__(24);
const UILongPressGestureRecognizer_1 = __webpack_require__(20);
const UILabel_1 = __webpack_require__(25);
const UIImageView_1 = __webpack_require__(26);
class UIButton extends UIView_1.UIView {
    constructor(isCustom = false) {
        super();
        this.isCustom = isCustom;
        this.clazz = "UIButton";
        this.titleLabel = new UILabel_1.UILabel;
        this.imageView = new UIImageView_1.UIImageView;
        this._enabled = true;
        this._selected = false;
        this._highlighted = false;
        this.contentAlpha = 1.0;
        this._tracking = false;
        this._touchInside = false;
        this._contentVerticalAlignment = UIEnums_1.UIControlContentVerticalAlignment.center;
        this._contentHorizontalAlignment = UIEnums_1.UIControlContentHorizontalAlignment.center;
        // setAttributedTitle(title: UIAttributedString | undefined, state: number) {
        //     if (this.statedAttributedTitles[state] === title) { return }
        //     if (title) {
        //         this.statedAttributedTitles[state] = title
        //     }
        //     else {
        //         delete this.statedAttributedTitles[state]
        //     }
        //     this.reloadContents()
        // }
        this._contentEdgeInsets = UIEdgeInsets_1.UIEdgeInsetsZero;
        this._titleEdgeInsets = UIEdgeInsets_1.UIEdgeInsetsZero;
        this._imageEdgeInsets = UIEdgeInsets_1.UIEdgeInsetsZero;
        // implements
        this.statedTitles = {};
        // private statedAttributedTitles: { [key: number]: UIAttributedString } = {}
        this.statedTitleColors = {};
        this.statedImages = {};
        this.titleLabel.font = new UIFont_1.UIFont(17.0);
        this.setupTouches();
    }
    get enabled() {
        return this._enabled;
    }
    set enabled(value) {
        if (this._enabled === value) {
            return;
        }
        this._enabled = value;
        this.gestureRecognizers.forEach(it => {
            it.enabled = value;
        });
        this.reloadContents();
    }
    get selected() {
        return this._selected;
    }
    set selected(value) {
        if (this._selected === value) {
            return;
        }
        this._selected = value;
        this.reloadContents();
    }
    get highlighted() {
        return this._highlighted;
    }
    set highlighted(value) {
        if (this._highlighted === value) {
            return;
        }
        this._highlighted = value;
        this.reloadContents();
        this.markFlagDirty("contentAlphaAnimation");
    }
    get tracking() {
        return this._tracking;
    }
    set tracking(value) {
        if (this._tracking === value) {
            return;
        }
        this._tracking = value;
        this.reloadContents();
    }
    get touchInside() {
        return this._touchInside;
    }
    set touchInside(value) {
        if (this._touchInside === value) {
            return;
        }
        this._touchInside = value;
        this.reloadContents();
    }
    get contentVerticalAlignment() {
        return this._contentVerticalAlignment;
    }
    set contentVerticalAlignment(value) {
        if (this._contentVerticalAlignment === value) {
            return;
        }
        this._contentVerticalAlignment = value;
        this.reloadContents();
    }
    get contentHorizontalAlignment() {
        return this._contentHorizontalAlignment;
    }
    set contentHorizontalAlignment(value) {
        if (this._contentHorizontalAlignment === value) {
            return;
        }
        this._contentHorizontalAlignment = value;
        this.reloadContents();
    }
    setTitle(title, state) {
        if (this.statedTitles[state] === title) {
            return;
        }
        if (title) {
            this.statedTitles[state] = title;
        }
        else {
            delete this.statedTitles[state];
        }
        this.reloadContents();
    }
    setTitleColor(color, state) {
        if (this.statedTitleColors[state] === color) {
            return;
        }
        if (color) {
            this.statedTitleColors[state] = color;
        }
        else {
            delete this.statedTitleColors[state];
        }
        this.reloadContents();
    }
    setTitleFont(font) {
        this.titleLabel.font = font;
        this.markFlagDirty("textStyle");
    }
    setImage(image, state) {
        if (this.statedImages[state] === image) {
            return;
        }
        if (image) {
            this.statedImages[state] = image;
        }
        else {
            delete this.statedImages[state];
        }
        this.reloadContents();
    }
    get contentEdgeInsets() {
        return this._contentEdgeInsets;
    }
    set contentEdgeInsets(value) {
        if (UIEdgeInsets_1.UIEdgeInsetsEqualToEdgeInsets(this._contentEdgeInsets, value)) {
            return;
        }
        this._contentEdgeInsets = value;
        this.markFlagDirty("titleMargin");
        this.markFlagDirty("imageMargin");
    }
    get titleEdgeInsets() {
        return this._titleEdgeInsets;
    }
    set titleEdgeInsets(value) {
        if (UIEdgeInsets_1.UIEdgeInsetsEqualToEdgeInsets(this._titleEdgeInsets, value)) {
            return;
        }
        this._titleEdgeInsets = value;
        this.markFlagDirty("titleMargin");
    }
    get imageEdgeInsets() {
        return this._imageEdgeInsets;
    }
    set imageEdgeInsets(value) {
        if (UIEdgeInsets_1.UIEdgeInsetsEqualToEdgeInsets(this._imageEdgeInsets, value)) {
            return;
        }
        this._imageEdgeInsets = value;
        this.markFlagDirty("imageMargin");
    }
    setupTouches() {
        this.addGestureRecognizer(new UITapGestureRecognizer_1.UITapGestureRecognizer().on("touch", () => {
            this.emit("touchUpInside", this);
        }));
        const longPressGesture = new UILongPressGestureRecognizer_1.UILongPressGestureRecognizer();
        longPressGesture.on("began", () => {
            this.tracking = true;
            this.highlighted = true;
            this.emit("touchDown", this);
        });
        longPressGesture.on("changed", (sender) => {
            const location = sender.locationInView(undefined);
            const inside = this.highlightedPointInside(location);
            if (this.touchInside != inside) {
                if (inside) {
                    this.emit("touchDragEnter", this);
                }
                else {
                    this.emit("touchDragExit", this);
                }
            }
            this.touchInside = inside;
            this.highlighted = this.touchInside;
            if (inside) {
                this.emit("touchDragInside", this);
            }
            else {
                this.emit("touchDragOutside", this);
            }
        });
        longPressGesture.on("ended", (sender) => {
            this.highlighted = false;
            this.tracking = false;
            const location = sender.locationInView(undefined);
            const inside = this.highlightedPointInside(location);
            if (inside) {
                this.emit("touchUpInside", this);
            }
            else {
                this.emit("touchUpOutside", this);
            }
        });
        longPressGesture.on("cancelled", () => {
            this.highlighted = false;
            this.tracking = false;
            this.emit("touchCancel", this);
        });
        longPressGesture.minimumPressDuration = 0.05;
        this.addGestureRecognizer(longPressGesture);
    }
    tintColorDidChange() {
        super.tintColorDidChange();
        this.reloadContents();
    }
    reloadContents() {
        if (this.titleLabel.text !== this.titleForState(this.currentState())) {
            this.titleLabel.text = this.titleForState(this.currentState());
            this.markFlagDirty("text");
        }
        if (this.titleLabel.textColor !== this.titleColorForState(this.currentState())) {
            this.titleLabel.textColor = this.titleColorForState(this.currentState());
            this.markFlagDirty("textStyle");
        }
        if (this.imageView.image !== this.imageForState(this.currentState())) {
            this.imageView.image = this.imageForState(this.currentState());
            this.markFlagDirty("imageSource");
        }
        if (!this.isCustom) {
            this.contentAlpha = this.highlighted ? 0.3 : 1.0;
            this.markFlagDirty("contentAlphaAnimation");
        }
    }
    currentState() {
        var state = UIEnums_1.UIControlState.normal;
        if (!this.enabled) {
            state = state | UIEnums_1.UIControlState.disabled;
        }
        if (this.selected) {
            state = state | UIEnums_1.UIControlState.selected;
        }
        if (this.highlighted) {
            state = state | UIEnums_1.UIControlState.highlighted;
        }
        return state;
    }
    imageForState(state) {
        if (this.statedImages[state] !== undefined) {
            return this.statedImages[state];
        }
        return this.statedImages[0];
    }
    titleForState(state) {
        if (this.statedTitles[state] !== undefined) {
            return this.statedTitles[state];
        }
        return this.statedTitles[0];
    }
    // private attributedTitleForState(state: number): UIAttributedString | undefined {
    //     if (this.statedAttributedTitles[state] !== undefined) {
    //         return this.statedAttributedTitles[state]
    //     }
    //     return this.statedAttributedTitles[0]
    // }
    titleColorForState(state) {
        if (this.statedTitleColors[state] !== undefined) {
            return this.statedTitleColors[state];
        }
        if (this.statedTitleColors[0] !== undefined) {
            return this.statedTitleColors[0];
        }
        if (state == UIEnums_1.UIControlState.disabled) {
            return UIColor_1.UIColor.gray.colorWithAlphaComponent(0.75);
        }
        else {
            return this.tintColor || UIColor_1.UIColor.black;
        }
    }
    highlightedPointInside(point) {
        return point.x >= -22.0 && point.y >= -22.0 && point.x <= this.frame.width + 22.0 && point.y <= this.frame.height + 22.0;
    }
    buildData() {
        let data = super.buildData();
        data.text = this.titleLabel.text || "";
        data.textStyle = `
            color: ${this.titleLabel.textColor !== undefined ? UIColor_1.UIColor.toStyle(this.titleLabel.textColor) : "black"};
            font-size: ${this.titleLabel.font !== undefined ? this.titleLabel.font.pointSize : 14}px;
            font-family: ${this.titleLabel.font !== undefined ? this.titleLabel.font.fontName : ""}; 
            font-weight: ${this.titleLabel.font !== undefined ? this.titleLabel.font.fontStyle : ""}; 
            font-style: ${this.titleLabel.font !== undefined ? this.titleLabel.font.fontStyle : ""}; 
            `;
        data.textHeight = this.bounds.height;
        data.imageSource = this.imageView.image ? this.imageView.image.imageSource : null;
        if (this.dirtyFlags["contentAlphaAnimation"]) {
            data.contentAlphaAnimation = wx.createAnimation({ duration: 100, timingFunction: "linear" }).opacity(this.contentAlpha).step().export();
        }
        data.imageMargin = {
            top: this.imageEdgeInsets.top + this.contentEdgeInsets.top,
            left: this.imageEdgeInsets.left + this.contentEdgeInsets.left,
            bottom: this.imageEdgeInsets.bottom + this.contentEdgeInsets.bottom,
            right: this.imageEdgeInsets.right + this.contentEdgeInsets.right,
        };
        data.titleMargin = {
            top: this.titleEdgeInsets.top + this.contentEdgeInsets.top,
            left: this.titleEdgeInsets.left + this.contentEdgeInsets.left,
            bottom: this.titleEdgeInsets.bottom + this.contentEdgeInsets.bottom,
            right: this.titleEdgeInsets.right + this.contentEdgeInsets.right,
        };
        return data;
    }
    buildStyle() {
        let style = super.buildStyle();
        style += `
        line-height: ${this.frame.height}px;
        `;
        return style;
    }
    layoutSubviews() {
        super.layoutSubviews();
        this.markFlagDirty("textHeight");
    }
}
exports.UIButton = UIButton;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const UIView_1 = __webpack_require__(1);
const UIScrollView_1 = __webpack_require__(21);
const UIRect_1 = __webpack_require__(9);
const UIIndexPath_1 = __webpack_require__(27);
const UISize_1 = __webpack_require__(11);
const UIAffineTransform_1 = __webpack_require__(23);
const UIPoint_1 = __webpack_require__(12);
const UIAnimator_1 = __webpack_require__(7);
const EventEmitter_1 = __webpack_require__(13);
const UITouch_1 = __webpack_require__(10);
var ItemType;
(function (ItemType) {
    ItemType[ItemType["cell"] = 0] = "cell";
    ItemType[ItemType["supplementaryView"] = 1] = "supplementaryView";
    ItemType[ItemType["decorationView"] = 2] = "decorationView";
})(ItemType = exports.ItemType || (exports.ItemType = {}));
exports.UICollectionElementKindCell = "UICollectionElementKindCell";
let itemKeyCache = {};
class UICollectionViewItemKey {
    constructor(type = ItemType.cell, indexPath, identifier) {
        this.type = type;
        this.indexPath = indexPath;
        this.identifier = identifier;
    }
    static collectionItemKeyForCellWithIndexPath(indexPath) {
        const hashKey = `${0},${indexPath.mapKey()},UICollectionElementKindCell`;
        if (itemKeyCache[hashKey] !== undefined) {
            return itemKeyCache[hashKey];
        }
        else {
            let value = new UICollectionViewItemKey(ItemType.cell, indexPath, exports.UICollectionElementKindCell);
            itemKeyCache[hashKey] = value;
            return value;
        }
    }
    static collectionItemKeyForLayoutAttributes(layoutAttributes) {
        const hashKey = `${layoutAttributes.representedElementCategory},${layoutAttributes.indexPath.mapKey()},${layoutAttributes.representedElementKind}`;
        if (itemKeyCache[hashKey] !== undefined) {
            return itemKeyCache[hashKey];
        }
        else {
            let value = new UICollectionViewItemKey(layoutAttributes.representedElementCategory, layoutAttributes.indexPath, layoutAttributes.representedElementKind);
            itemKeyCache[hashKey] = value;
            return value;
        }
    }
}
exports.UICollectionViewItemKey = UICollectionViewItemKey;
class UICollectionViewLayoutAttributes {
    constructor(indexPath, elementKind = "", representedElementCategory = ItemType.cell) {
        this.indexPath = indexPath;
        this.elementKind = elementKind;
        this.representedElementCategory = representedElementCategory;
        this.frame = UIRect_1.UIRectZero;
        this.center = UIPoint_1.UIPointZero;
        this.size = UISize_1.UISizeZero;
        this.transform = UIAffineTransform_1.UIAffineTransformIdentity;
        this.alpha = 1.0;
        this.zIndex = 0;
        this.hidden = false;
        this.representedElementKind = this.elementKind;
    }
    isDecorationView() {
        return this.representedElementCategory === ItemType.decorationView;
    }
    isSupplementaryView() {
        return this.representedElementCategory === ItemType.supplementaryView;
    }
    isCell() {
        return this.representedElementCategory === ItemType.cell;
    }
    static layoutAttributesForCellWithIndexPath(indexPath) {
        return new UICollectionViewLayoutAttributes(indexPath, exports.UICollectionElementKindCell, ItemType.cell);
    }
    static layoutAttributesForSupplementaryViewOfKind(elementKind, indexPath) {
        return new UICollectionViewLayoutAttributes(indexPath, elementKind, ItemType.supplementaryView);
    }
    static layoutAttributesForDecorationViewOfKind(elementKind, indexPath) {
        return new UICollectionViewLayoutAttributes(indexPath, elementKind, ItemType.decorationView);
    }
}
exports.UICollectionViewLayoutAttributes = UICollectionViewLayoutAttributes;
class UICollectionViewLayout extends EventEmitter_1.EventEmitter {
    constructor() {
        super(...arguments);
        this.layoutAttributesClass = UICollectionViewLayoutAttributes;
        this.collectionView = undefined;
    }
    prepareLayout() { }
    invalidateLayout() {
        if (this.collectionView && this.collectionView._collectionViewData) {
            this.collectionView._collectionViewData.invalidate();
        }
        if (this.collectionView) {
            this.collectionView.setNeedsLayout(true);
        }
    }
    layoutAttributesForElementsInRect(rect) {
        return [];
    }
    layoutAttributesForItemAtIndexPath(indexPath) {
        return undefined;
    }
    layoutAttributesForSupplementaryViewOfKind(kind, indexPath) {
        return undefined;
    }
    layoutAttributesForDecorationViewOfKind(kind, indexPath) {
        return undefined;
    }
    collectionViewContentSize() {
        return UISize_1.UISizeZero;
    }
}
exports.UICollectionViewLayout = UICollectionViewLayout;
class UICollectionView extends UIScrollView_1.UIScrollView {
    constructor(collectionViewLayout) {
        super();
        this.collectionViewLayout = collectionViewLayout;
        this.allowsSelection = true;
        this.allowsMultipleSelection = false;
        // Implementations
        this._allVisibleViewsDict = new Map();
        this._indexPathsForSelectedItems = [];
        this._indexPathsForHighlightedItems = [];
        this._registeredCells = {};
        this._collectionViewData = new UICollectionViewData(this, this.collectionViewLayout);
        this._cellReuseQueues = {};
        this._supplementaryViewReuseQueues = {};
        this._decorationViewReuseQueues = {};
        this.firstTouchPoint = undefined;
        this.firstTouchCell = undefined;
        collectionViewLayout.collectionView = this;
    }
    register(initializer, reuseIdentifier) {
        this._registeredCells[reuseIdentifier] = initializer;
    }
    dequeueReusableCell(reuseIdentifier, indexPath) {
        if (this._cellReuseQueues[reuseIdentifier] && this._cellReuseQueues[reuseIdentifier].length > 0) {
            const cell = this._cellReuseQueues[reuseIdentifier][0];
            if (cell instanceof UICollectionViewCell) {
                this._cellReuseQueues[reuseIdentifier].splice(0, 1);
                return cell;
            }
        }
        const initializer = this._registeredCells[reuseIdentifier];
        if (!initializer) {
            return new UICollectionViewCell();
        }
        const cell = initializer(undefined);
        cell.reuseIdentifier = reuseIdentifier;
        cell.collectionView = this;
        return cell;
    }
    allCells() {
        let result = [];
        this._allVisibleViewsDict.forEach(it => {
            if (it instanceof UICollectionViewCell) {
                result.push(it);
            }
        });
        return result;
    }
    visibleCells() {
        return this.allCells().filter(it => UIRect_1.UIRectIntersectsRect(this.visibleBoundRects, it.frame));
    }
    reloadData() {
        if (this.fetchMoreControl && this.fetchMoreControl.fetching) {
            this.invalidateLayout();
            this.setNeedsLayout(true);
            return;
        }
        this.invalidateLayout();
        this._allVisibleViewsDict.forEach(it => {
            it.hidden = true;
        });
        this._allVisibleViewsDict.clear();
        this._indexPathsForSelectedItems.forEach((it) => {
            const cell = this.cellForItemAtIndexPath(it);
            if (cell) {
                cell.selected = false;
                cell.highlighted = false;
            }
        });
        this._indexPathsForSelectedItems = [];
        this._indexPathsForHighlightedItems = [];
        this.setNeedsLayout(true);
    }
    selectItem(indexPath, animated) {
        if (!this.allowsMultipleSelection) {
            this._indexPathsForSelectedItems.forEach(indexPath => {
                this._allVisibleViewsDict.forEach(it => {
                    if (it instanceof UICollectionViewCell && it.currentIndexPath && it.currentIndexPath.mapKey() === indexPath.mapKey()) {
                        it.selected = false;
                        this.emit("didDeselectItem", it.currentIndexPath, it);
                    }
                });
            });
            this._indexPathsForSelectedItems = [];
        }
        this._indexPathsForSelectedItems.push(indexPath);
        if (animated) {
            UIAnimator_1.UIAnimator.linear(0.5, () => {
                this._allVisibleViewsDict.forEach(it => {
                    if (it instanceof UICollectionViewCell && it.currentIndexPath && it.currentIndexPath.mapKey() === indexPath.mapKey()) {
                        it.selected = true;
                    }
                });
            }, undefined);
        }
        else {
            this._allVisibleViewsDict.forEach(it => {
                if (it instanceof UICollectionViewCell && it.currentIndexPath && it.currentIndexPath.mapKey() === indexPath.mapKey()) {
                    it.selected = true;
                }
            });
        }
    }
    deselectItem(indexPath, animated) {
        {
            const idx = this._indexPathsForSelectedItems.map(it => it.mapKey()).indexOf(indexPath.mapKey());
            if (idx >= 0) {
                this._indexPathsForSelectedItems.splice(idx, 1);
            }
        }
        if (animated) {
            UIAnimator_1.UIAnimator.linear(0.5, () => {
                this._allVisibleViewsDict.forEach(it => {
                    if (it instanceof UICollectionViewCell && it.currentIndexPath && it.currentIndexPath.mapKey() === indexPath.mapKey()) {
                        it.selected = false;
                    }
                });
            }, undefined);
        }
        else {
            this._allVisibleViewsDict.forEach(it => {
                if (it instanceof UICollectionViewCell && it.currentIndexPath && it.currentIndexPath.mapKey() === indexPath.mapKey()) {
                    it.selected = false;
                }
            });
        }
    }
    // Query Grid
    numberOfSections() {
        return this._collectionViewData.numberOfSections();
    }
    numberOfItemsInSection(section) {
        return this._collectionViewData.numberOfItemsInSection(section);
    }
    layoutAttributesForItemAtIndexPath(indexPath) {
        return this.collectionViewLayout.layoutAttributesForItemAtIndexPath(indexPath);
    }
    layoutAttributesForSupplementaryElementOfKind(kind, indexPath) {
        return this.collectionViewLayout.layoutAttributesForSupplementaryViewOfKind(kind, indexPath);
    }
    indexPathForItemAtPoint(point) {
        const targets = this.collectionViewLayout.layoutAttributesForElementsInRect({ x: point.x, y: point.y, width: 1.0, height: 1.0 });
        return targets[targets.length - 1].indexPath;
    }
    indexPathForCell(cell) {
        const keys = this._allVisibleViewsDict.keys();
        while (true) {
            const element = keys.next();
            if (element.done) {
                break;
            }
            if (this._allVisibleViewsDict.get(element.value) === cell) {
                return element.value.indexPath;
            }
        }
        return undefined;
    }
    cellForItemAtIndexPath(indexPath) {
        const keys = this._allVisibleViewsDict.keys();
        while (true) {
            const element = keys.next();
            if (element.done) {
                break;
            }
            if (element.value.indexPath.mapKey() === indexPath.mapKey()) {
                const cell = this._allVisibleViewsDict.get(element.value);
                if (cell instanceof UICollectionViewCell) {
                    return cell;
                }
            }
        }
        return undefined;
    }
    indexPathsForVisibleItems() {
        return this.visibleCells().filter(it => it.layoutAttributes !== undefined).map(it => it.layoutAttributes.indexPath);
    }
    indexPathsForSelectedItems() {
        return this._indexPathsForSelectedItems;
    }
    get visibleBoundRects() {
        return { x: 0.0, y: 0.0, width: Math.max(this.bounds.width, this.contentSize.width), height: Math.max(this.bounds.height, this.contentSize.height) };
    }
    layoutSubviews() {
        super.layoutSubviews();
        this.layoutCollectionViews();
    }
    // Private
    layoutCollectionViews() {
        this._collectionViewData.validateLayoutInRect(this.visibleBoundRects);
        const contentRect = this._collectionViewData.collectionViewContentRect();
        this.contentSize = contentRect;
        this._collectionViewData.validateLayoutInRect(this.visibleBoundRects);
        this.updateVisibleCellsNow(true);
    }
    invalidateLayout() {
        this.collectionViewLayout.invalidateLayout();
        this._collectionViewData.invalidate();
    }
    updateVisibleCellsNow(now = false) {
        const layoutAttributesArray = this._collectionViewData.layoutAttributesForElementsInRect(this.visibleBoundRects);
        if (layoutAttributesArray.length === 0) {
            return;
        }
        const itemKeysToAddDict = new Map();
        layoutAttributesArray.forEach(layoutAttributes => {
            const itemKey = UICollectionViewItemKey.collectionItemKeyForLayoutAttributes(layoutAttributes);
            itemKeysToAddDict.set(itemKey, layoutAttributes);
            var view = this._allVisibleViewsDict.get(itemKey);
            if (view instanceof UICollectionReusableView) {
                if (view instanceof UICollectionViewCell) {
                    if (this.fetchMoreControl &&
                        this.fetchMoreControl.fetching &&
                        view.currentIndexPath &&
                        view.currentIndexPath.mapKey() === itemKey.indexPath.mapKey()) {
                        return;
                    }
                    view.currentIndexPath = itemKey.indexPath;
                    view.highlighted = this._indexPathsForHighlightedItems.map(it => it.mapKey()).indexOf(itemKey.indexPath.mapKey()) >= 0;
                    view.selected = this._indexPathsForSelectedItems.map(it => it.mapKey()).indexOf(itemKey.indexPath.mapKey()) >= 0;
                }
                view.applyLayoutAttributes(layoutAttributes);
            }
            else {
                switch (itemKey.type) {
                    case ItemType.cell: {
                        view = this.createPreparedCellForItemAtIndexPath(itemKey.indexPath, layoutAttributes);
                        if (view instanceof UICollectionViewCell) {
                            view.currentIndexPath = itemKey.indexPath;
                            view.highlighted = this._indexPathsForHighlightedItems.map(it => it.mapKey()).indexOf(itemKey.indexPath.mapKey()) >= 0;
                            view.selected = this._indexPathsForSelectedItems.map(it => it.mapKey()).indexOf(itemKey.indexPath.mapKey()) >= 0;
                        }
                        break;
                    }
                    case ItemType.supplementaryView: {
                        view = this.createPreparedSupplementaryViewForElementOfKind(layoutAttributes.representedElementKind, layoutAttributes.indexPath, layoutAttributes);
                        break;
                    }
                    case ItemType.decorationView: {
                        view = undefined;
                    }
                }
                if (view instanceof UICollectionReusableView) {
                    this._allVisibleViewsDict.set(itemKey, view);
                    this.addControlledSubview(view);
                    view.applyLayoutAttributes(layoutAttributes);
                }
            }
        });
        const allVisibleItemKeys = (() => {
            let keys = [];
            let keySet = this._allVisibleViewsDict.keys();
            while (true) {
                const key = keySet.next();
                if (key.done) {
                    break;
                }
                keys.push(key.value);
            }
            return keys;
        })();
        itemKeysToAddDict.forEach((_, it) => {
            const idx = allVisibleItemKeys.indexOf(it);
            if (idx >= 0) {
                allVisibleItemKeys.splice(idx, 1);
            }
        });
        allVisibleItemKeys.forEach(itemKey => {
            const reusableView = this._allVisibleViewsDict.get(itemKey);
            if (reusableView) {
                reusableView.hidden = true;
                this._allVisibleViewsDict.delete(itemKey);
                switch (itemKey.type) {
                    case ItemType.cell: {
                        this.reuseCell(reusableView);
                        break;
                    }
                    case ItemType.supplementaryView: {
                        this.reuseSupplementaryView(reusableView);
                        break;
                    }
                    case ItemType.decorationView: {
                        this.reuseDecorationView(reusableView);
                        break;
                    }
                }
            }
        });
    }
    createPreparedCellForItemAtIndexPath(indexPath, layoutAttributes) {
        const cell = this.__cellForItemAtIndexPath(this, indexPath);
        return cell;
    }
    createPreparedSupplementaryViewForElementOfKind(kind, indexPath, layoutAttributes) {
        const view = this.__viewForSupplementaryElementOfKind(this, kind, indexPath);
        if (view) {
            view.applyLayoutAttributes(layoutAttributes);
        }
        return view;
    }
    addControlledSubview(subview) {
        if (subview.superview === undefined) {
            this.addSubview(subview);
        }
        subview.hidden = false;
    }
    queueReusableView(reusableView, queue, identifier) {
        reusableView.hidden = true;
        reusableView.prepareForReuse();
        if (queue[identifier] === undefined) {
            queue[identifier] = [];
        }
        const reusableViews = queue[identifier] || [];
        reusableViews.push(reusableView);
    }
    reuseCell(cell) {
        const reuseIdentifier = cell.reuseIdentifier;
        if (reuseIdentifier === undefined) {
            return;
        }
        this.queueReusableView(cell, this._cellReuseQueues, reuseIdentifier);
    }
    reuseSupplementaryView(supplementaryView) {
        const layoutAttributes = supplementaryView.layoutAttributes;
        const reuseIdentifier = supplementaryView.reuseIdentifier;
        if (layoutAttributes === undefined || reuseIdentifier === undefined) {
            return;
        }
        const kindAndIdentifier = "${layoutAttributes.elementKind}/$reuseIdentifier";
        this.queueReusableView(supplementaryView, this._supplementaryViewReuseQueues, kindAndIdentifier);
    }
    reuseDecorationView(decorationView) {
        const reuseIdentifier = decorationView.reuseIdentifier;
        if (reuseIdentifier === undefined) {
            return;
        }
        this.queueReusableView(decorationView, this._decorationViewReuseQueues, reuseIdentifier);
    }
    // Touches
    touchesBegan(touches) {
        super.touchesBegan(touches);
        const firstTouch = touches[0];
        if (!firstTouch) {
            return;
        }
        this.handleTouch(UITouch_1.UITouchPhase.began, firstTouch);
    }
    touchesMoved(touches) {
        super.touchesMoved(touches);
        const firstTouch = touches[0];
        if (!firstTouch) {
            return;
        }
        this.handleTouch(UITouch_1.UITouchPhase.moved, firstTouch);
    }
    touchesEnded(touches) {
        super.touchesEnded(touches);
        const firstTouch = touches[0];
        if (!firstTouch) {
            return;
        }
        this.handleTouch(UITouch_1.UITouchPhase.ended, firstTouch);
    }
    touchesCancelled(touches) {
        super.touchesCancelled(touches);
        const firstTouch = touches[0];
        if (!firstTouch) {
            return;
        }
        this.handleTouch(UITouch_1.UITouchPhase.cancelled, firstTouch);
    }
    handleTouch(phase, currentTouch) {
        if (!this.allowsSelection) {
            return;
        }
        switch (phase) {
            case UITouch_1.UITouchPhase.began: {
                if (!this.tracking) {
                    var hitTestView = currentTouch.view;
                    var cellShouldHighlighted = true;
                    while (hitTestView !== undefined) {
                        if (hitTestView instanceof UICollectionViewCell) {
                            break;
                        }
                        if (hitTestView.gestureRecognizers.length > 0) {
                            cellShouldHighlighted = false;
                        }
                        hitTestView = hitTestView.superview;
                    }
                    if (cellShouldHighlighted) {
                        this.firstTouchPoint = currentTouch.windowPoint;
                        if (hitTestView instanceof UICollectionViewCell) {
                            this.firstTouchCell = hitTestView;
                            setTimeout(() => {
                                if (this.firstTouchPoint === undefined || !(hitTestView instanceof UICollectionViewCell)) {
                                    return;
                                }
                                if (hitTestView.currentIndexPath) {
                                    this._indexPathsForHighlightedItems.push(hitTestView.currentIndexPath);
                                }
                                hitTestView.highlighted = true;
                            }, 150);
                        }
                    }
                }
                break;
            }
            case UITouch_1.UITouchPhase.moved: {
                if (this.firstTouchPoint && currentTouch.windowPoint) {
                    if (UIView_1.UIView.recognizedGesture !== undefined || Math.abs(currentTouch.windowPoint.y - this.firstTouchPoint.y) > 8) {
                        this._indexPathsForHighlightedItems = [];
                        this._allVisibleViewsDict.forEach(it => {
                            if (it instanceof UICollectionViewCell) {
                                it.highlighted = false;
                            }
                        });
                        this.firstTouchPoint = undefined;
                        this.firstTouchCell = undefined;
                    }
                }
                break;
            }
            case UITouch_1.UITouchPhase.ended: {
                if (this.firstTouchCell) {
                    const cell = this.firstTouchCell;
                    this._indexPathsForHighlightedItems = [];
                    if (!this.allowsMultipleSelection) {
                        this._indexPathsForSelectedItems.forEach(indexPath => {
                            this._allVisibleViewsDict.forEach((it, key) => {
                                if (key.indexPath && key.indexPath.mapKey() === indexPath.mapKey()) {
                                    if (it instanceof UICollectionViewCell) {
                                        it.selected = false;
                                        this.emit("didDeselectItem", it.currentIndexPath, it);
                                    }
                                }
                            });
                        });
                        this._indexPathsForSelectedItems = [];
                    }
                    this.firstTouchPoint = undefined;
                    this.firstTouchCell = undefined;
                    this._indexPathsForHighlightedItems = [];
                    this._allVisibleViewsDict.forEach(it => {
                        if (it instanceof UICollectionViewCell) {
                            it.highlighted = false;
                        }
                    });
                    if (cell.currentIndexPath) {
                        const idx = this._indexPathsForSelectedItems.map(it => it.mapKey()).indexOf(cell.currentIndexPath.mapKey());
                        if (idx >= 0) {
                            this._indexPathsForSelectedItems.splice(idx, 1);
                        }
                        else {
                            this._indexPathsForSelectedItems.push(cell.currentIndexPath);
                        }
                    }
                    cell.selected = !cell.selected;
                    if (cell.selected) {
                        this.emit("didSelectItem", cell.currentIndexPath, cell);
                    }
                    else {
                        this.emit("didDeselectItem", cell.currentIndexPath, cell);
                    }
                }
                else {
                    this.firstTouchPoint = undefined;
                    this.firstTouchCell = undefined;
                    this._indexPathsForHighlightedItems = [];
                    this._allVisibleViewsDict.forEach(it => {
                        if (it instanceof UICollectionViewCell) {
                            it.highlighted = false;
                        }
                    });
                }
                break;
            }
            case UITouch_1.UITouchPhase.cancelled: {
                this.firstTouchPoint = undefined;
                this.firstTouchCell = undefined;
                this._indexPathsForHighlightedItems = [];
                this._allVisibleViewsDict.forEach(it => {
                    if (it instanceof UICollectionViewCell) {
                        it.highlighted = false;
                    }
                });
                break;
            }
        }
    }
    // DataSource & Delegate
    __cellForItemAtIndexPath(collectionView, indexPath) {
        return collectionView.val("cellForItem", indexPath) || new UICollectionViewCell();
    }
    __viewForSupplementaryElementOfKind(collectionView, kind, indexPath) {
        return undefined;
    }
    __numberOfSections(collectionView) {
        const value = collectionView.val("numberOfSections");
        return typeof value === "number" ? value : 1;
    }
    __numberOfItemsInSection(collectionView, inSection) {
        const value = collectionView.val("numberOfItems", inSection);
        return typeof value === "number" ? value : 0;
    }
}
exports.UICollectionView = UICollectionView;
class UICollectionReusableView extends UIView_1.UIView {
    constructor() {
        super(...arguments);
        this.collectionView = undefined;
        this.layoutAttributes = undefined;
        this.reuseIdentifier = undefined;
    }
    prepareForReuse() {
        this.layoutAttributes = undefined;
    }
    applyLayoutAttributes(layoutAttributes) {
        if (layoutAttributes !== this.layoutAttributes) {
            this.layoutAttributes = layoutAttributes;
            this.frame = layoutAttributes.frame;
            this.transform = layoutAttributes.transform;
        }
    }
}
exports.UICollectionReusableView = UICollectionReusableView;
class UICollectionViewCell extends UICollectionReusableView {
    constructor() {
        super();
        this._selected = false;
        this._highlighted = false;
        this.contentView = new UIView_1.UIView;
        this.currentIndexPath = undefined;
        this.addSubview(this.contentView);
    }
    get selected() {
        return this._selected;
    }
    set selected(value) {
        this._selected = value;
        this.emit("selected", this, value);
    }
    get highlighted() {
        return this._highlighted;
    }
    set highlighted(value) {
        this._highlighted = value;
        this.emit("highlighted", this, value);
    }
    prepareForReuse() {
        super.prepareForReuse();
        this.selected = false;
        this.highlighted = false;
    }
    layoutSubviews() {
        super.layoutSubviews();
        this.contentView.frame = this.bounds;
    }
}
exports.UICollectionViewCell = UICollectionViewCell;
class UICollectionViewData {
    constructor(collectionView, layout) {
        this.collectionView = collectionView;
        this.layout = layout;
        this.layoutIsPrepared = false;
        this.itemCountsAreValid = false;
        this._numSections = 0;
        this._numItems = 0;
        this._sectionItemCounts = [];
        this.validLayoutRect = undefined;
        this.contentSize = UISize_1.UISizeZero;
        this.cachedLayoutAttributes = [];
    }
    validateLayoutInRect(rect) {
        this.validateItemCounts();
        this.prepareToLoadData();
        if (this.validLayoutRect === undefined || !UIRect_1.UIRectEqualToRect(this.validLayoutRect, rect)) {
            this.validLayoutRect = rect;
            this.cachedLayoutAttributes = this.layout.layoutAttributesForElementsInRect(rect).filter(it => {
                return it.isCell() || it.isDecorationView() || it.isSupplementaryView();
            });
        }
    }
    rectForItemAtIndexPath(indexPath) {
        return UIRect_1.UIRectZero;
    }
    globalIndexForItemAtIndexPath(indexPath) {
        return this.numberOfItemsBeforeSection(indexPath.section) + indexPath.row;
    }
    indexPathForItemAtGlobalIndex(index) {
        this.validateItemCounts();
        var section = 0;
        var countItems = 0;
        for (let i = 0; i < this._numSections; i++) {
            const section = i;
            const countIncludingThisSection = countItems + this._sectionItemCounts[section];
            if (countIncludingThisSection > index) {
                break;
            }
            countItems = countIncludingThisSection;
        }
        const item = index - countItems;
        return new UIIndexPath_1.UIIndexPath(item, section);
    }
    layoutAttributesForElementsInRect(rect) {
        this.validateLayoutInRect(rect);
        return this.cachedLayoutAttributes;
    }
    invalidate() {
        this.itemCountsAreValid = false;
        this.layoutIsPrepared = false;
        this.validLayoutRect = undefined;
    }
    numberOfItemsBeforeSection(section) {
        this.validateItemCounts();
        var returnCount = 0;
        for (let i = 0; i < section; i++) {
            returnCount += this._sectionItemCounts[i];
        }
        return returnCount;
    }
    numberOfItemsInSection(section) {
        this.validateItemCounts();
        if (section >= this._numSections || section < 0) {
            return 0;
        }
        return this._sectionItemCounts[section];
    }
    numberOfItems() {
        this.validateItemCounts();
        return this._numItems;
    }
    numberOfSections() {
        this.validateItemCounts();
        return this._numSections;
    }
    collectionViewContentRect() {
        return { x: 0.0, y: 0.0, width: this.contentSize.width, height: this.contentSize.height };
    }
    updateItemCounts() {
        const collectionView = this.collectionView;
        this._numSections = collectionView.__numberOfSections(collectionView);
        if (this._numSections <= 0) {
            this._numItems = 0;
            this._sectionItemCounts = [];
            this.itemCountsAreValid = true;
            return;
        }
        this._numItems = 0;
        const sectionItemCounts = [];
        for (let index = 0; index < this._numSections; index++) {
            const cellCount = collectionView.__numberOfItemsInSection(collectionView, index);
            sectionItemCounts.push(cellCount);
            this._numItems += cellCount;
        }
        this._sectionItemCounts = sectionItemCounts;
        this.itemCountsAreValid = true;
    }
    validateItemCounts() {
        if (!this.itemCountsAreValid) {
            this.updateItemCounts();
        }
    }
    prepareToLoadData() {
        if (!this.layoutIsPrepared) {
            this.layout.prepareLayout();
            this.contentSize = this.layout.collectionViewContentSize();
            this.layoutIsPrepared = true;
        }
    }
}
exports.UICollectionViewData = UICollectionViewData;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const UIGestureRecognizer_1 = __webpack_require__(14);
const UIView_1 = __webpack_require__(1);
const UITouch_1 = __webpack_require__(10);
class UIPanGestureRecognizer extends UIGestureRecognizer_1.UIGestureRecognizer {
    constructor() {
        super(...arguments);
        this.lockedDirection = undefined;
        this.firstTouch = undefined;
        this.translationPoint = undefined;
        this.beganPoints = {};
    }
    translationInView(view) {
        if (!this.firstTouch) {
            return { x: 0, y: 0 };
        }
        const windowPoint = this.firstTouch.windowPoint;
        if (!windowPoint) {
            return { x: 0, y: 0 };
        }
        const translationPoint = this.translationPoint;
        if (!translationPoint) {
            return { x: 0, y: 0 };
        }
        return { x: windowPoint.x - translationPoint.x, y: windowPoint.y - translationPoint.y };
    }
    setTranslation(translation, inView) {
        if (!this.firstTouch) {
            return;
        }
        const windowPoint = this.firstTouch.windowPoint;
        if (!windowPoint) {
            return;
        }
        this.translationPoint = { x: windowPoint.x - translation.x, y: windowPoint.y - translation.y };
    }
    velocityInView(view) {
        UIView_1.sharedVelocityTracker.computeCurrentVelocity();
        return UIView_1.sharedVelocityTracker.velocity;
    }
    handleTouch(touches) {
        super.handleTouch(touches);
        touches.forEach((it) => {
            if (it.identifier == 0) {
                this.firstTouch = it;
            }
            if (it.phase == UITouch_1.UITouchPhase.began) {
                if (UIView_1.UIView.recognizedGesture != undefined && UIView_1.UIView.recognizedGesture != this) {
                    this.beganPoints = {};
                    return;
                }
                if (it.windowPoint) {
                    this.beganPoints[it.identifier] = it.windowPoint;
                }
                if (it.identifier == 0) {
                    this.translationPoint = it.windowPoint;
                }
            }
            else if (it.phase == UITouch_1.UITouchPhase.moved) {
                if (this.state == UIGestureRecognizer_1.UIGestureRecognizerState.possible) {
                    if (UIView_1.UIView.recognizedGesture != undefined && UIView_1.UIView.recognizedGesture != this) {
                        this.state = UIGestureRecognizer_1.UIGestureRecognizerState.failed;
                        return;
                    }
                    if (it.windowPoint && this.beganPoints[it.identifier]) {
                        const beganPoint = this.beganPoints[it.identifier];
                        if (this.lockedDirection !== undefined) {
                            if (this.lockedDirection === 1) {
                                if (Math.abs(beganPoint.y - it.windowPoint.y) >= 8.0) {
                                    UIView_1.UIView.recognizedGesture = this;
                                    this.state = UIGestureRecognizer_1.UIGestureRecognizerState.began;
                                    this.handleEvent("began");
                                    this.emit("began", this);
                                }
                            }
                            else if (this.lockedDirection === 2) {
                                if (Math.abs(beganPoint.x - it.windowPoint.x) >= 8.0) {
                                    UIView_1.UIView.recognizedGesture = this;
                                    this.state = UIGestureRecognizer_1.UIGestureRecognizerState.began;
                                    this.handleEvent("began");
                                    this.emit("began", this);
                                }
                            }
                        }
                        else {
                            if (Math.abs(beganPoint.x - it.windowPoint.x) >= 8.0 || Math.abs(beganPoint.y - it.windowPoint.y) >= 8.0) {
                                UIView_1.UIView.recognizedGesture = this;
                                this.state = UIGestureRecognizer_1.UIGestureRecognizerState.began;
                                this.handleEvent("began");
                                this.emit("began", this);
                            }
                        }
                    }
                }
                else if (this.state == UIGestureRecognizer_1.UIGestureRecognizerState.began || this.state == UIGestureRecognizer_1.UIGestureRecognizerState.changed) {
                    this.state = UIGestureRecognizer_1.UIGestureRecognizerState.changed;
                    this.handleEvent("changed");
                    this.emit("changed", this);
                }
            }
            else if (it.phase == UITouch_1.UITouchPhase.ended) {
                if (this.state == UIGestureRecognizer_1.UIGestureRecognizerState.began || this.state == UIGestureRecognizer_1.UIGestureRecognizerState.changed) {
                    this.state = UIGestureRecognizer_1.UIGestureRecognizerState.ended;
                    this.handleEvent("ended");
                    this.emit("ended", this);
                    setTimeout(() => {
                        UIView_1.UIView.recognizedGesture = undefined;
                    }, 0);
                }
                if (it.identifier == 0) {
                    this.state = UIGestureRecognizer_1.UIGestureRecognizerState.possible;
                }
            }
            else if (it.phase == UITouch_1.UITouchPhase.cancelled) {
                if (this.state == UIGestureRecognizer_1.UIGestureRecognizerState.began || this.state == UIGestureRecognizer_1.UIGestureRecognizerState.changed) {
                    this.state = UIGestureRecognizer_1.UIGestureRecognizerState.cancelled;
                    this.handleEvent("cancelled");
                    this.emit("cancelled", this);
                    setTimeout(() => {
                        UIView_1.UIView.recognizedGesture = undefined;
                    }, 0);
                }
                this.state = UIGestureRecognizer_1.UIGestureRecognizerState.possible;
            }
        });
    }
}
exports.UIPanGestureRecognizer = UIPanGestureRecognizer;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const UIView_1 = __webpack_require__(1);
const UIColor_1 = __webpack_require__(5);
class UIRefreshAnimationView extends UIView_1.UIView {
    constructor() {
        super();
        this.leftDot = new UIView_1.UIView;
        this.midDot = new UIView_1.UIView;
        this.rightDot = new UIView_1.UIView;
        this.currentIdx = 0;
        this.leftDot.alpha = 0.5;
        this.leftDot.layer.cornerRadius = 4.0;
        this.midDot.alpha = 0.5;
        this.midDot.layer.cornerRadius = 4.0;
        this.rightDot.alpha = 0.5;
        this.rightDot.layer.cornerRadius = 4.0;
        this.addSubview(this.leftDot);
        this.addSubview(this.midDot);
        this.addSubview(this.rightDot);
    }
    layoutSubviews() {
        super.layoutSubviews();
        this.leftDot.frame = { x: this.bounds.width / 2.0 - 4.0 - 20, y: this.bounds.height / 2.0 - 4.0, width: 8.0, height: 8.0 };
        this.midDot.frame = { x: this.bounds.width / 2.0 - 4.0, y: this.bounds.height / 2.0 - 4.0, width: 8.0, height: 8.0 };
        this.rightDot.frame = { x: this.bounds.width / 2.0 + 4.0 + 12, y: this.bounds.height / 2.0 - 4.0, width: 8.0, height: 8.0 };
    }
    startAnimation() {
        this.stopAnimation();
        this.currentIdx = 0;
        this.doAnimation();
        this.intervalHandler = setInterval(() => {
            this.currentIdx = this.currentIdx + 1;
            if (this.currentIdx == 3) {
                this.currentIdx = 0;
            }
            this.doAnimation();
        }, 1250 / 3);
    }
    doAnimation() {
        this.leftDot.alpha = this.currentIdx == 0 ? 1.0 : 0.5;
        this.midDot.alpha = this.currentIdx == 1 ? 1.0 : 0.5;
        this.rightDot.alpha = this.currentIdx == 2 ? 1.0 : 0.5;
    }
    stopAnimation() {
        this.leftDot.alpha = 0.5;
        this.midDot.alpha = 0.5;
        this.rightDot.alpha = 0.5;
        clearInterval(this.intervalHandler);
    }
    tintColorDidChange() {
        super.tintColorDidChange();
        this.leftDot.backgroundColor = this.tintColor;
        this.midDot.backgroundColor = this.tintColor;
        this.rightDot.backgroundColor = this.tintColor;
    }
}
class UIRefreshControl extends UIView_1.UIView {
    constructor() {
        super();
        this.animationView = new UIRefreshAnimationView();
        this.scrollView = undefined;
        this.enabled = true;
        this.refreshing = false;
        this.animationView.alpha = 0.0;
        this.tintColor = UIColor_1.UIColor.gray;
    }
    tintColorDidChange() {
        super.tintColorDidChange();
        this.animationView.tintColor = this.tintColor;
    }
    beginRefreshing_callFromScrollView() {
        if (this.scrollView === undefined) {
            return;
        }
        this.refreshing = true;
        this.scrollView.touchingRefreshOffsetY = 0.0;
        this.scrollView.markFlagDirty("refreshOffset", "refreshing", "refreshingAnimation");
        this.animationView.startAnimation();
        this.emit("refresh", this);
    }
    beginRefreshing() {
        if (this.scrollView === undefined) {
            return;
        }
        this.refreshing = true;
        this.scrollView.touchingRefreshOffsetY = 0.0;
        this.scrollView.markFlagDirty("refreshOffset", "refreshing", "refreshingAnimation");
        this.animationView.startAnimation();
        setTimeout(() => {
            this.animationView.alpha = 1.0;
            this.emit("refresh", this);
        }, 750);
    }
    endRefreshing() {
        if (this.scrollView === undefined) {
            return;
        }
        this.animationView.alpha = 0.0;
        this.animationView.stopAnimation();
        this.refreshing = false;
        this.scrollView.touchingRefreshOffsetY = 0.0;
        this.scrollView.markFlagDirty("refreshOffset", "refreshing", "refreshingAnimation");
    }
}
exports.UIRefreshControl = UIRefreshControl;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const UIView_1 = __webpack_require__(1);
const UIColor_1 = __webpack_require__(5);
class UIFetchMoreControl extends UIView_1.UIView {
    constructor() {
        super();
        this.scrollView = undefined;
        this.enabled = true;
        this.fetching = false;
        this.tintColor = UIColor_1.UIColor.gray;
    }
    tintColorDidChange() {
        super.tintColorDidChange();
    }
    beginFetching() {
        this.fetching = true;
        setTimeout(() => {
            this.emit("fetch", this);
        }, 250);
    }
    endFetching() {
        if (this.scrollView) {
            const it = this.scrollView;
            if (it.contentOffset.y > it.contentSize.height + it.contentInset.bottom - it.bounds.height) {
                it.setContentOffset({ x: 0.0, y: it.contentSize.height + it.contentInset.bottom - it.bounds.height }, true);
            }
        }
        this.fetching = false;
    }
}
exports.UIFetchMoreControl = UIFetchMoreControl;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const UISize_1 = __webpack_require__(11);
const EventEmitter_1 = __webpack_require__(13);
var UIImageRenderingMode;
(function (UIImageRenderingMode) {
    UIImageRenderingMode[UIImageRenderingMode["automatic"] = 0] = "automatic";
    UIImageRenderingMode[UIImageRenderingMode["alwaysOriginal"] = 1] = "alwaysOriginal";
    UIImageRenderingMode[UIImageRenderingMode["alwaysTemplate"] = 2] = "alwaysTemplate";
})(UIImageRenderingMode = exports.UIImageRenderingMode || (exports.UIImageRenderingMode = {}));
class UIImage extends EventEmitter_1.EventEmitter {
    constructor(options, cloner = undefined) {
        super();
        this.options = options;
        this.imageSource = undefined;
        this.renderingMode = UIImageRenderingMode.alwaysOriginal;
        this.loaded = false;
        this.size = UISize_1.UISizeZero;
        this.scale = 1.0;
        if (options.base64) {
            this.imageSource = "data:image/png;base64," + options.base64;
        }
        else if (options.data) {
            this.imageSource = "data:image/png;base64," + options.data.base64EncodedString();
        }
        else if (options.name) {
            this.imageSource = `/assets/images/${options.name}@2x.png`;
        }
        if (options.renderingMode !== undefined) {
            this.renderingMode = options.renderingMode;
        }
    }
    static fromURL(url) {
        const image = new UIImage({});
        image.imageSource = url;
        return image;
    }
    static scaleFromName(name) {
        if (name.indexOf("@2x") > 0) {
            return 2.0;
        }
        else if (name.indexOf("@3x") > 0) {
            return 3.0;
        }
        else if (name.indexOf("@4x") > 0) {
            return 4.0;
        }
        return 1.0;
    }
    fetchSize() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.loaded) {
                return this.size;
            }
            else {
                return yield new Promise((resolver, rejector) => {
                    this.on("load", () => {
                        resolver(this.size);
                    });
                });
            }
        });
    }
}
exports.UIImage = UIImage;


/***/ }),
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

// Foundation
Object.assign(module.exports, __webpack_require__(29))
Object.assign(module.exports, __webpack_require__(17))
Object.assign(module.exports, __webpack_require__(50))
Object.assign(module.exports, __webpack_require__(51))
Object.assign(module.exports, __webpack_require__(52))
Object.assign(module.exports, __webpack_require__(16))
Object.assign(module.exports, __webpack_require__(30))
Object.assign(module.exports, __webpack_require__(31))
Object.assign(module.exports, __webpack_require__(53))
Object.assign(module.exports, __webpack_require__(54))
Object.assign(module.exports, __webpack_require__(32))
// CoreGraphics
Object.assign(module.exports, __webpack_require__(55))
Object.assign(module.exports, __webpack_require__(56))
Object.assign(module.exports, __webpack_require__(18))
Object.assign(module.exports, __webpack_require__(57))
// KIMI
Object.assign(module.exports, __webpack_require__(58))
// UIKit
Object.assign(module.exports, __webpack_require__(59))
Object.assign(module.exports, __webpack_require__(60))
Object.assign(module.exports, __webpack_require__(62))
Object.assign(module.exports, __webpack_require__(23))
Object.assign(module.exports, __webpack_require__(7));
Object.assign(module.exports, __webpack_require__(63));
Object.assign(module.exports, __webpack_require__(65));
Object.assign(module.exports, __webpack_require__(34));
Object.assign(module.exports, __webpack_require__(35));
Object.assign(module.exports, __webpack_require__(67));
Object.assign(module.exports, __webpack_require__(5))
Object.assign(module.exports, __webpack_require__(68))
Object.assign(module.exports, __webpack_require__(69))
Object.assign(module.exports, __webpack_require__(8))
Object.assign(module.exports, __webpack_require__(6))
Object.assign(module.exports, __webpack_require__(38))
Object.assign(module.exports, __webpack_require__(19))
Object.assign(module.exports, __webpack_require__(14))
Object.assign(module.exports, __webpack_require__(39))
Object.assign(module.exports, __webpack_require__(26))
Object.assign(module.exports, __webpack_require__(25))
Object.assign(module.exports, __webpack_require__(20))
Object.assign(module.exports, __webpack_require__(28))
Object.assign(module.exports, __webpack_require__(70))
Object.assign(module.exports, __webpack_require__(72))
Object.assign(module.exports, __webpack_require__(73))
Object.assign(module.exports, __webpack_require__(36))
Object.assign(module.exports, __webpack_require__(74))
Object.assign(module.exports, __webpack_require__(12))
Object.assign(module.exports, __webpack_require__(75))
Object.assign(module.exports, __webpack_require__(9))
Object.assign(module.exports, __webpack_require__(37))
Object.assign(module.exports, __webpack_require__(76))
Object.assign(module.exports, __webpack_require__(77))
Object.assign(module.exports, __webpack_require__(21))
Object.assign(module.exports, __webpack_require__(11))
Object.assign(module.exports, __webpack_require__(78))
Object.assign(module.exports, __webpack_require__(79))
Object.assign(module.exports, __webpack_require__(80))
Object.assign(module.exports, __webpack_require__(81))
Object.assign(module.exports, __webpack_require__(24))
Object.assign(module.exports, __webpack_require__(83))
Object.assign(module.exports, __webpack_require__(84))
Object.assign(module.exports, __webpack_require__(85))
Object.assign(module.exports, __webpack_require__(10))
Object.assign(module.exports, __webpack_require__(1))
Object.assign(module.exports, __webpack_require__(15))
Object.assign(module.exports, __webpack_require__(86))

Component({
    properties: {
        view: {
            type: Object,
            value: undefined,
            observer: function (view) {
                if (view === undefined || view === null) { return }
                if (typeof this.data.clazz !== "string" || typeof this.data.view !== view) {
                    this.setData({
                        viewID: view.viewID,
                        clazz: view.clazz,
                    })
                }
            }
        },
    },
    data: {
        view: undefined,
        clazz: "UIView",
    },
    methods: {

    }
})


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class DispatchQueue {
    constructor(identifier) { }
    async(asyncBlock) {
        setTimeout(asyncBlock, 0);
    }
    asyncAfter(delayInSeconds, asyncBlock) {
        setTimeout(asyncBlock, delayInSeconds * 1000);
    }
    isolate(isolateBlock, ...args) {
        setTimeout(() => {
            isolateBlock.apply(undefined, args);
        }, 0);
    }
}
DispatchQueue.main = new DispatchQueue;
DispatchQueue.global = new DispatchQueue;
exports.DispatchQueue = DispatchQueue;


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Data_1 = __webpack_require__(17);
const Bundle_1 = __webpack_require__(29);
const fs = wx.getFileSystemManager();
class FileManager {
    constructor() {
        this.tmpFiles = {};
    }
    subpaths(atPath, deepSearch) {
        if (atPath.indexOf("xt://") === 0) {
            return Object.keys(Bundle_1.Bundle.js.resources).filter(it => {
                return it.indexOf(atPath.replace("xt://", "")) === 0;
            });
        }
        else if (atPath.indexOf("tmp://") === 0) {
            return Object.keys(this.tmpFiles).filter(it => {
                return it.indexOf(atPath) === 0;
            });
        }
        return [];
    }
    createDirectory(atPath, withIntermediateDirectories) {
        if (withIntermediateDirectories) {
            try {
                let currentPath = FileManager.wxPath;
                atPath.replace(FileManager.wxPath, "").split('/').filter(it => it.length > 0).forEach((it, idx) => {
                    currentPath += '/' + it;
                    try {
                        if (fs.accessSync(currentPath)) {
                            const stat = fs.statSync(currentPath);
                            if (stat.isDirectory() || stat.isFile()) {
                                return;
                            }
                        }
                    }
                    catch (error) {
                        fs.mkdirSync(currentPath, false);
                    }
                });
            }
            catch (error) {
                return error;
            }
        }
        else {
            try {
                fs.mkdirSync(atPath, false);
            }
            catch (error) {
                return error;
            }
        }
    }
    createFile(atPath, data) {
        if (atPath.indexOf("xt://") === 0) {
            return Error("readonly");
        }
        else if (atPath.indexOf("tmp://") === 0) {
            this.tmpFiles[atPath] = data;
            return undefined;
        }
        else {
            try {
                fs.writeFileSync(atPath, data.arrayBuffer());
            }
            catch (error) {
                return error;
            }
        }
    }
    readFile(atPath) {
        if (atPath.indexOf("xt://") === 0) {
            return Bundle_1.Bundle.js.resources[atPath.replace("xt://", "")];
        }
        else if (atPath.indexOf("tmp://") === 0) {
            return this.tmpFiles[atPath];
        }
        else {
            try {
                return new Data_1.Data(fs.readFileSync(atPath));
            }
            catch (error) { }
        }
        return undefined;
    }
    removeItem(atPath) {
        if (atPath.indexOf("xt://") === 0) {
            delete Bundle_1.Bundle.js.resources[atPath.replace("xt://", "")];
            return undefined;
        }
        else if (atPath.indexOf("tmp://") === 0) {
            delete this.tmpFiles[atPath];
            return undefined;
        }
        else {
            try {
                if (fs.statSync(atPath).isDirectory()) {
                    fs.rmdirSync(atPath);
                }
                else {
                    fs.unlinkSync(atPath);
                }
            }
            catch (error) {
                return error;
            }
        }
    }
    copyItem(atPath, toPath) {
        if (toPath.indexOf("xt://") === 0) {
            return Error("readonly");
        }
        else if (toPath.indexOf("tmp://") === 0) {
            const data = this.readFile(atPath);
            if (data) {
                this.createFile(toPath, data);
            }
            else {
                return Error("file not found.");
            }
        }
        else {
            try {
                fs.copyFileSync(atPath, toPath);
            }
            catch (error) {
                return error;
            }
        }
    }
    moveItem(atPath, toPath) {
        if (toPath.indexOf("xt://") === 0) {
            return Error("readonly");
        }
        else if (toPath.indexOf("tmp://") === 0) {
            const data = this.readFile(atPath);
            if (data) {
                this.createFile(toPath, data);
                this.removeItem(atPath);
            }
            else {
                return Error("file not found.");
            }
        }
        else {
            try {
                {
                    let error = this.copyItem(atPath, toPath);
                    if (error instanceof Error) {
                        throw error;
                    }
                }
                {
                    let error = this.removeItem(atPath);
                    if (error instanceof Error) {
                        throw error;
                    }
                }
            }
            catch (error) {
                return error;
            }
        }
    }
    fileExists(atPath) {
        if (atPath.indexOf("xt://") === 0) {
            return Bundle_1.Bundle.js.resources[atPath.replace("xt://", "")] instanceof Data_1.Data;
        }
        else if (atPath.indexOf("tmp://") === 0) {
            return this.tmpFiles[atPath] !== undefined;
        }
        else {
            try {
                return fs.statSync(atPath).isFile();
            }
            catch (error) {
                return false;
            }
        }
    }
    dirExists(atPath) {
        try {
            return fs.statSync(atPath).isDirectory();
        }
        catch (error) {
            return false;
        }
    }
}
FileManager.wxPath = wx.env.USER_DATA_PATH;
FileManager.defaultManager = new FileManager;
FileManager.documentDirectory = `${FileManager.wxPath}/document/`;
FileManager.libraryDirectory = `${FileManager.wxPath}/library/`;
FileManager.cacheDirectory = `${FileManager.wxPath}/cache/`;
FileManager.temporaryDirectory = "tmp://tmp/";
FileManager.jsBundleDirectory = "xt://";
exports.FileManager = FileManager;


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Timer {
    constructor(timeInterval, block, repeats) {
        this.repeats = repeats;
        this.cancelled = false;
        if (repeats) {
            this.handler = setInterval(() => {
                if (!this.cancelled && block) {
                    block();
                }
            }, timeInterval * 1000);
        }
        else {
            this.handler = setTimeout(() => {
                if (!this.cancelled && block) {
                    block();
                }
            }, timeInterval * 1000);
        }
    }
    static sleep(timeInterval) {
        return new Promise((resolver) => {
            new Timer(timeInterval, () => {
                resolver();
            }, false);
        });
    }
    invalidate() {
        this.cancelled = true;
        if (this.repeats) {
            clearInterval(this.handler);
        }
        else {
            clearTimeout(this.handler);
        }
    }
}
exports.Timer = Timer;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const URLRequest_1 = __webpack_require__(30);
const URL_1 = __webpack_require__(16);
const Data_1 = __webpack_require__(17);
const URLResponse_1 = __webpack_require__(31);
class URLSession {
    fetch(request) {
        return new Promise((resolver, rejector) => {
            this.dataTask(request, (data, response, error) => {
                if (error && data !== undefined) {
                    rejector(error);
                }
                else {
                    resolver(data);
                }
            }).resume();
        });
    }
    dataTask(req, complete) {
        if (req instanceof URLRequest_1.URLRequest) {
            return new URLSessionTask(req, complete);
        }
        else if (req instanceof URL_1.URL) {
            return new URLSessionTask(new URLRequest_1.URLRequest(req), complete);
        }
        else {
            const currentURL = URL_1.URL.URLWithString(req);
            if (currentURL !== undefined) {
                return new URLSessionTask(new URLRequest_1.URLRequest(currentURL), complete);
            }
            else {
                throw Error("invalid url.");
            }
        }
    }
}
URLSession.shared = new URLSession;
exports.URLSession = URLSession;
var URLSessionTaskState;
(function (URLSessionTaskState) {
    URLSessionTaskState[URLSessionTaskState["running"] = 0] = "running";
    URLSessionTaskState[URLSessionTaskState["suspended"] = 1] = "suspended";
    URLSessionTaskState[URLSessionTaskState["cancelling"] = 2] = "cancelling";
    URLSessionTaskState[URLSessionTaskState["completed"] = 3] = "completed";
})(URLSessionTaskState = exports.URLSessionTaskState || (exports.URLSessionTaskState = {}));
class URLSessionTask {
    constructor(request, complete) {
        this.request = request;
        this.complete = complete;
        this.state = URLSessionTaskState.suspended;
        this.countOfBytesExpectedToReceive = 0;
        this.countOfBytesReceived = 0;
        this.countOfBytesExpectedToSend = 0;
        this.countOfBytesSent = 0;
        this._taskHandler = undefined;
    }
    resume() {
        this._taskHandler = wx.request({
            url: this.request.URL.absoluteString,
            data: this.request.HTTPBody,
            header: this.request.allHTTPHeaderFields,
            method: this.request.HTTPMethod || "GET",
            dataType: "",
            responseType: "arraybuffer",
            success: (response) => {
                if (this.complete) {
                    if (response) {
                        const res = new URLResponse_1.URLResponse();
                        res.statusCode = response.statusCode;
                        res.allHeaderFields = response.header || {};
                        this.complete(response.data instanceof ArrayBuffer ? new Data_1.Data(response.data) : undefined, res, undefined);
                    }
                }
            },
            fail: (e) => {
                if (this.complete) {
                    this.complete(undefined, undefined, e || Error("unknown error"));
                }
            }
        });
    }
    cancel() {
        if (this._taskHandler) {
            this._taskHandler.abort();
        }
        this.state = URLSessionTaskState.cancelling;
    }
}
exports.URLSessionTask = URLSessionTask;


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class UserDefaults {
    constructor(suiteName = undefined) {
        this.suiteName = suiteName;
    }
    valueForKey(forKey) {
        const value = wx.getStorageSync(this.buildKey(forKey));
        if (value !== undefined && typeof value === "string") {
            try {
                return JSON.parse(value).value;
            }
            catch (error) { }
        }
        return undefined;
    }
    setValue(value, forKey) {
        if (value === undefined) {
            wx.removeStorageSync(this.buildKey(forKey));
        }
        else {
            wx.setStorageSync(this.buildKey(forKey), JSON.stringify({ value: value }));
        }
    }
    reset() {
        const storageInfo = wx.getStorageInfoSync();
        storageInfo.keys.forEach(key => {
            if (typeof key === "string" && key.indexOf(`com.xt.${(this.suiteName || "standard")}.`) === 0) {
                wx.removeStorageSync(key);
            }
        });
    }
    buildKey(aKey) {
        return `com.xt.${(this.suiteName || "standard")}.${aKey}`;
    }
}
UserDefaults.standard = new UserDefaults;
exports.UserDefaults = UserDefaults;


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class CADisplayLink {
    constructor(vsyncBlock) {
        this.vsyncBlock = vsyncBlock;
    }
    active() {
        console.log("微信小程序暂时不支持 CADisplayLink。");
    }
    invalidate() { }
}
exports.CADisplayLink = CADisplayLink;


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const CALayer_1 = __webpack_require__(18);
class CAGradientLayer extends CALayer_1.CALayer {
    constructor() {
        super();
        console.log("微信小程序暂时不支持 CAGradientLayer");
    }
}
exports.CAGradientLayer = CAGradientLayer;


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const CALayer_1 = __webpack_require__(18);
var CAShapeFillRule;
(function (CAShapeFillRule) {
    CAShapeFillRule[CAShapeFillRule["nonZero"] = 0] = "nonZero";
    CAShapeFillRule[CAShapeFillRule["evenOdd"] = 1] = "evenOdd";
})(CAShapeFillRule = exports.CAShapeFillRule || (exports.CAShapeFillRule = {}));
var CAShapeLineCap;
(function (CAShapeLineCap) {
    CAShapeLineCap[CAShapeLineCap["butt"] = 0] = "butt";
    CAShapeLineCap[CAShapeLineCap["round"] = 1] = "round";
    CAShapeLineCap[CAShapeLineCap["square"] = 2] = "square";
})(CAShapeLineCap = exports.CAShapeLineCap || (exports.CAShapeLineCap = {}));
var CAShapeLineJoin;
(function (CAShapeLineJoin) {
    CAShapeLineJoin[CAShapeLineJoin["miter"] = 0] = "miter";
    CAShapeLineJoin[CAShapeLineJoin["round"] = 1] = "round";
    CAShapeLineJoin[CAShapeLineJoin["bevel"] = 2] = "bevel";
})(CAShapeLineJoin = exports.CAShapeLineJoin || (exports.CAShapeLineJoin = {}));
class CAShapeLayer extends CALayer_1.CALayer {
    constructor() {
        super();
        console.log("微信小程序暂时不支持 CAShapeLayer");
    }
}
exports.CAShapeLayer = CAShapeLayer;


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class KMCore {
}
KMCore.version = "0.7.0";
KMCore.hostVersion = wx.getSystemInfoSync().SDKVersion;
exports.KMCore = KMCore;


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var UIAlertActionStyle;
(function (UIAlertActionStyle) {
    UIAlertActionStyle[UIAlertActionStyle["normal"] = 0] = "normal";
    UIAlertActionStyle[UIAlertActionStyle["danger"] = 1] = "danger";
    UIAlertActionStyle[UIAlertActionStyle["cancel"] = 2] = "cancel";
})(UIAlertActionStyle || (UIAlertActionStyle = {}));
class UIAlertAction {
    constructor(title, style, callback) {
        this.title = title;
        this.style = style;
        this.callback = callback;
    }
}
class UIActionSheet {
    constructor() {
        this.message = "";
        this.actions = [];
    }
    addRegularAction(title, actionBlock) {
        this.actions.push(new UIAlertAction(title, UIAlertActionStyle.normal, actionBlock));
    }
    addDangerAction(title, actionBlock) {
        this.actions.push(new UIAlertAction(title, UIAlertActionStyle.danger, actionBlock));
    }
    addCancelAction(title, actionBlock) {
        this.actions.push(new UIAlertAction(title, UIAlertActionStyle.cancel, actionBlock));
    }
    show() {
        wx.showActionSheet({
            itemList: this.actions.filter(it => it.style !== UIAlertActionStyle.cancel).map(it => {
                return it.title;
            }),
            itemColor: this.actions.filter(it => it.style === UIAlertActionStyle.danger).length > 0 ? "#ff0000" : "#000000",
            success: (response) => {
                if (response && this.actions[response.tapIndex]) {
                    const callback = this.actions[response.tapIndex].callback;
                    if (callback) {
                        callback();
                    }
                }
            },
            fail: () => {
                this.actions.forEach(it => {
                    if (it.style === UIAlertActionStyle.cancel && it.callback) {
                        it.callback();
                    }
                });
            }
        });
    }
}
exports.UIActionSheet = UIActionSheet;


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const UIView_1 = __webpack_require__(1);
class UIActivityIndicatorView extends UIView_1.UIView {
    constructor() {
        super();
        this.clazz = "UIActivityIndicatorView";
        this.color = undefined;
        this._largeStyle = false;
        this.animating = false;
        {
            const size = this.largeStyle ? 88 : 36;
            this.frame = { x: this.frame.x, y: this.frame.y, width: size, height: size };
        }
    }
    get largeStyle() {
        return this._largeStyle;
    }
    set largeStyle(value) {
        this._largeStyle = value;
        this.invalidate();
    }
    startAnimating() {
        this.animating = true;
        this.invalidate();
    }
    stopAnimating() {
        this.animating = false;
        this.invalidate();
    }
    layoutSubviews() {
        super.layoutSubviews();
        this.invalidate();
    }
    buildData() {
        let data = super.buildData();
        data.sizeScale = this.largeStyle ? 3.0 : 1.5;
        data.lineHeight = this.bounds.height;
        data.animating = this.animating;
        return data;
    }
}
exports.UIActivityIndicatorView = UIActivityIndicatorView;


/***/ }),
/* 61 */
/***/ (function(module, exports) {

/*!
 * EventEmitter v5.2.4 - git.io/ee
 * Unlicense - http://unlicense.org/
 * Oliver Caldwell - http://oli.me.uk/
 * @preserve
 */

; (function (exports) {
    'use strict';

    /**
     * Class for managing events.
     * Can be extended to provide event functionality in other classes.
     *
     * @class EventEmitter Manages event registering and emitting.
     */
    function EventEmitter() { }

    // Shortcuts to improve speed and size
    var proto = EventEmitter.prototype;
    var originalGlobalValue = exports.EventEmitter;

    /**
     * Finds the index of the listener for the event in its storage array.
     *
     * @param {Function[]} listeners Array of listeners to search through.
     * @param {Function} listener Method to look for.
     * @return {Number} Index of the specified listener, -1 if not found
     * @api private
     */
    function indexOfListener(listeners, listener) {
        var i = listeners.length;
        while (i--) {
            if (listeners[i].listener === listener) {
                return i;
            }
        }

        return -1;
    }

    /**
     * Alias a method while keeping the context correct, to allow for overwriting of target method.
     *
     * @param {String} name The name of the target method.
     * @return {Function} The aliased method
     * @api private
     */
    function alias(name) {
        return function aliasClosure() {
            return this[name].apply(this, arguments);
        };
    }

    /**
     * Returns the listener array for the specified event.
     * Will initialise the event object and listener arrays if required.
     * Will return an object if you use a regex search. The object contains keys for each matched event. So /ba[rz]/ might return an object containing bar and baz. But only if you have either defined them with defineEvent or added some listeners to them.
     * Each property in the object response is an array of listener functions.
     *
     * @param {String|RegExp} evt Name of the event to return the listeners from.
     * @return {Function[]|Object} All listener functions for the event.
     */
    proto.getListeners = function getListeners(evt) {
        var events = this._getEvents();
        var response;
        var key;

        // Return a concatenated array of all matching events if
        // the selector is a regular expression.
        if (evt instanceof RegExp) {
            response = {};
            for (key in events) {
                if (events.hasOwnProperty(key) && evt.test(key)) {
                    response[key] = events[key];
                }
            }
        }
        else {
            response = events[evt] || (events[evt] = []);
        }

        return response;
    };

    /**
     * Takes a list of listener objects and flattens it into a list of listener functions.
     *
     * @param {Object[]} listeners Raw listener objects.
     * @return {Function[]} Just the listener functions.
     */
    proto.flattenListeners = function flattenListeners(listeners) {
        var flatListeners = [];
        var i;

        for (i = 0; i < listeners.length; i += 1) {
            flatListeners.push(listeners[i].listener);
        }

        return flatListeners;
    };

    /**
     * Fetches the requested listeners via getListeners but will always return the results inside an object. This is mainly for internal use but others may find it useful.
     *
     * @param {String|RegExp} evt Name of the event to return the listeners from.
     * @return {Object} All listener functions for an event in an object.
     */
    proto.getListenersAsObject = function getListenersAsObject(evt) {
        var listeners = this.getListeners(evt);
        var response;

        if (listeners instanceof Array) {
            response = {};
            response[evt] = listeners;
        }

        return response || listeners;
    };

    function isValidListener(listener) {
        if (typeof listener === 'function' || listener instanceof RegExp) {
            return true
        } else if (listener && typeof listener === 'object') {
            return isValidListener(listener.listener)
        } else {
            return false
        }
    }

    /**
     * Adds a listener function to the specified event.
     * The listener will not be added if it is a duplicate.
     * If the listener returns true then it will be removed after it is called.
     * If you pass a regular expression as the event name then the listener will be added to all events that match it.
     *
     * @param {String|RegExp} evt Name of the event to attach the listener to.
     * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.addListener = function addListener(evt, listener) {
        if (!isValidListener(listener)) {
            throw new TypeError('listener must be a function');
        }

        var listeners = this.getListenersAsObject(evt);
        var listenerIsWrapped = typeof listener === 'object';
        var key;

        for (key in listeners) {
            if (listeners.hasOwnProperty(key) && indexOfListener(listeners[key], listener) === -1) {
                listeners[key].push(listenerIsWrapped ? listener : {
                    listener: listener,
                    once: false
                });
            }
        }
        return this;
    };

    /**
     * Alias of addListener
     */
    proto.on = alias('addListener');

    /**
     * Semi-alias of addListener. It will add a listener that will be
     * automatically removed after its first execution.
     *
     * @param {String|RegExp} evt Name of the event to attach the listener to.
     * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.addOnceListener = function addOnceListener(evt, listener) {
        return this.addListener(evt, {
            listener: listener,
            once: true
        });
    };

    /**
     * Alias of addOnceListener.
     */
    proto.once = alias('addOnceListener');

    /**
     * Defines an event name. This is required if you want to use a regex to add a listener to multiple events at once. If you don't do this then how do you expect it to know what event to add to? Should it just add to every possible match for a regex? No. That is scary and bad.
     * You need to tell it what event names should be matched by a regex.
     *
     * @param {String} evt Name of the event to create.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.defineEvent = function defineEvent(evt) {
        this.getListeners(evt);
        return this;
    };

    /**
     * Uses defineEvent to define multiple events.
     *
     * @param {String[]} evts An array of event names to define.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.defineEvents = function defineEvents(evts) {
        for (var i = 0; i < evts.length; i += 1) {
            this.defineEvent(evts[i]);
        }
        return this;
    };

    /**
     * Removes a listener function from the specified event.
     * When passed a regular expression as the event name, it will remove the listener from all events that match it.
     *
     * @param {String|RegExp} evt Name of the event to remove the listener from.
     * @param {Function} listener Method to remove from the event.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.removeListener = function removeListener(evt, listener) {
        var listeners = this.getListenersAsObject(evt);
        var index;
        var key;

        for (key in listeners) {
            if (listeners.hasOwnProperty(key)) {
                index = indexOfListener(listeners[key], listener);

                if (index !== -1) {
                    listeners[key].splice(index, 1);
                }
            }
        }

        return this;
    };

    /**
     * Alias of removeListener
     */
    proto.off = alias('removeListener');

    /**
     * Adds listeners in bulk using the manipulateListeners method.
     * If you pass an object as the first argument you can add to multiple events at once. The object should contain key value pairs of events and listeners or listener arrays. You can also pass it an event name and an array of listeners to be added.
     * You can also pass it a regular expression to add the array of listeners to all events that match it.
     * Yeah, this function does quite a bit. That's probably a bad thing.
     *
     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add to multiple events at once.
     * @param {Function[]} [listeners] An optional array of listener functions to add.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.addListeners = function addListeners(evt, listeners) {
        // Pass through to manipulateListeners
        return this.manipulateListeners(false, evt, listeners);
    };

    /**
     * Removes listeners in bulk using the manipulateListeners method.
     * If you pass an object as the first argument you can remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
     * You can also pass it an event name and an array of listeners to be removed.
     * You can also pass it a regular expression to remove the listeners from all events that match it.
     *
     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to remove from multiple events at once.
     * @param {Function[]} [listeners] An optional array of listener functions to remove.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.removeListeners = function removeListeners(evt, listeners) {
        // Pass through to manipulateListeners
        return this.manipulateListeners(true, evt, listeners);
    };

    /**
     * Edits listeners in bulk. The addListeners and removeListeners methods both use this to do their job. You should really use those instead, this is a little lower level.
     * The first argument will determine if the listeners are removed (true) or added (false).
     * If you pass an object as the second argument you can add/remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
     * You can also pass it an event name and an array of listeners to be added/removed.
     * You can also pass it a regular expression to manipulate the listeners of all events that match it.
     *
     * @param {Boolean} remove True if you want to remove listeners, false if you want to add.
     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add/remove from multiple events at once.
     * @param {Function[]} [listeners] An optional array of listener functions to add/remove.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.manipulateListeners = function manipulateListeners(remove, evt, listeners) {
        var i;
        var value;
        var single = remove ? this.removeListener : this.addListener;
        var multiple = remove ? this.removeListeners : this.addListeners;

        // If evt is an object then pass each of its properties to this method
        if (typeof evt === 'object' && !(evt instanceof RegExp)) {
            for (i in evt) {
                if (evt.hasOwnProperty(i) && (value = evt[i])) {
                    // Pass the single listener straight through to the singular method
                    if (typeof value === 'function') {
                        single.call(this, i, value);
                    }
                    else {
                        // Otherwise pass back to the multiple function
                        multiple.call(this, i, value);
                    }
                }
            }
        }
        else {
            // So evt must be a string
            // And listeners must be an array of listeners
            // Loop over it and pass each one to the multiple method
            i = listeners.length;
            while (i--) {
                single.call(this, evt, listeners[i]);
            }
        }

        return this;
    };

    /**
     * Removes all listeners from a specified event.
     * If you do not specify an event then all listeners will be removed.
     * That means every event will be emptied.
     * You can also pass a regex to remove all events that match it.
     *
     * @param {String|RegExp} [evt] Optional name of the event to remove all listeners for. Will remove from every event if not passed.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.removeEvent = function removeEvent(evt) {
        var type = typeof evt;
        var events = this._getEvents();
        var key;

        // Remove different things depending on the state of evt
        if (type === 'string') {
            // Remove all listeners for the specified event
            delete events[evt];
        }
        else if (evt instanceof RegExp) {
            // Remove all events matching the regex.
            for (key in events) {
                if (events.hasOwnProperty(key) && evt.test(key)) {
                    delete events[key];
                }
            }
        }
        else {
            // Remove all listeners in all events
            delete this._events;
        }

        return this;
    };

    /**
     * Alias of removeEvent.
     *
     * Added to mirror the node API.
     */
    proto.removeAllListeners = alias('removeEvent');

    /**
     * Emits an event of your choice.
     * When emitted, every listener attached to that event will be executed.
     * If you pass the optional argument array then those arguments will be passed to every listener upon execution.
     * Because it uses `apply`, your array of arguments will be passed as if you wrote them out separately.
     * So they will not arrive within the array on the other side, they will be separate.
     * You can also pass a regular expression to emit to all events that match it.
     *
     * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
     * @param {Array} [args] Optional array of arguments to be passed to each listener.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.emitEvent = function emitEvent(evt, args) {
        try {
            var listenersMap = this.getListenersAsObject(evt);
            var listeners;
            var listener;
            var i;
            var key;
            var response;

            for (key in listenersMap) {
                if (listenersMap.hasOwnProperty(key)) {
                    listeners = listenersMap[key].slice(0);

                    for (i = 0; i < listeners.length; i++) {
                        // If the listener returns true then it shall be removed from the event
                        // The function is executed either with a basic call or an apply if there is an args array
                        listener = listeners[i];

                        if (listener.once === true) {
                            this.removeListener(evt, listener.listener);
                        }

                        response = listener.listener.apply(this, args || []);

                        if (response === this._getOnceReturnValue()) {
                            this.removeListener(evt, listener.listener);
                        }
                    }
                }
            }
        } catch (error) {
            console.error(error)
        }

        return this;
    };

    proto.val = function emitEventWithReturnValue(evt) {
        try {
            var args = Array.prototype.slice.call(arguments, 1);
            var listenersMap = this.getListenersAsObject(evt);
            var listeners;
            var listener;
            var i;
            var key;
            for (key in listenersMap) {
                if (listenersMap.hasOwnProperty(key)) {
                    listeners = listenersMap[key].slice(0);
                    for (i = 0; i < listeners.length; i++) {
                        listener = listeners[i];
                        if (listener.once === true) {
                            this.removeListener(evt, listener.listener);
                        }
                        return listener.listener.apply(this, args || []);
                    }
                }
            }
        } catch (error) {
            console.error(error)
        }
        return undefined;
    };

    /**
     * Alias of emitEvent
     */
    proto.trigger = alias('emitEvent');

    /**
     * Subtly different from emitEvent in that it will pass its arguments on to the listeners, as opposed to taking a single array of arguments to pass on.
     * As with emitEvent, you can pass a regex in place of the event name to emit to all events that match it.
     *
     * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
     * @param {...*} Optional additional arguments to be passed to each listener.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.emit = function emit(evt) {
        var args = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(evt, args);
    };

    /**
     * Sets the current value to check against when executing listeners. If a
     * listeners return value matches the one set here then it will be removed
     * after execution. This value defaults to true.
     *
     * @param {*} value The new value to check for when executing listeners.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.setOnceReturnValue = function setOnceReturnValue(value) {
        this._onceReturnValue = value;
        return this;
    };

    /**
     * Fetches the current value to check against when executing listeners. If
     * the listeners return value matches this one then it should be removed
     * automatically. It will return true by default.
     *
     * @return {*|Boolean} The current value to check for or the default, true.
     * @api private
     */
    proto._getOnceReturnValue = function _getOnceReturnValue() {
        if (this.hasOwnProperty('_onceReturnValue')) {
            return this._onceReturnValue;
        }
        else {
            return true;
        }
    };

    /**
     * Fetches the events object and creates one if required.
     *
     * @return {Object} The events storage object.
     * @api private
     */
    proto._getEvents = function _getEvents() {
        return this._events || (this._events = {});
    };

    module.exports = {
        EventEmitter: EventEmitter
    }

}(this || {}));

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class UIAlert {
    constructor(message, buttonText = "OK") {
        this.message = message;
        this.buttonText = buttonText;
    }
    show(callback) {
        wx.showModal({
            title: "",
            content: this.message,
            showCancel: false,
            confirmText: this.buttonText,
            success(res) {
                if (callback) {
                    if (res.confirm) {
                        callback();
                    }
                    else if (res.cancel) {
                        callback();
                    }
                }
            }
        });
    }
}
exports.UIAlert = UIAlert;


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const UIRect_1 = __webpack_require__(9);
const UIColor_1 = __webpack_require__(5);
const UIFont_1 = __webpack_require__(19);
const UIEnums_1 = __webpack_require__(6);
const TextMeasurer_1 = __webpack_require__(64);
class UIAttributedStringKey {
}
UIAttributedStringKey.foregroundColor = "foregroundColor"; // value: UIColor
UIAttributedStringKey.font = "font"; // value: UIFont
UIAttributedStringKey.backgroundColor = "backgroundColor"; // value: UIColor
UIAttributedStringKey.kern = "kern"; // value: number
UIAttributedStringKey.strikethroughStyle = "strikethroughStyle"; // value: number
UIAttributedStringKey.underlineStyle = "underlineStyle"; // value: number
UIAttributedStringKey.strokeColor = "strokeColor"; // value: UIColor
UIAttributedStringKey.strokeWidth = "strokeWidth"; // value: number
UIAttributedStringKey.underlineColor = "underlineColor"; // value: UIColor
UIAttributedStringKey.strikethroughColor = "strikethroughColor"; // value: UIColor
UIAttributedStringKey.paragraphStyle = "paragraphStyle"; // value: UIParagraphStyle
exports.UIAttributedStringKey = UIAttributedStringKey;
class UIParagraphStyle {
    constructor() {
        this.lineSpacing = 0.0;
        this.alignment = UIEnums_1.UITextAlignment.left;
        this.lineBreakMode = UIEnums_1.UILineBreakMode.truncatingTail;
        this.minimumLineHeight = 0.0;
        this.maximumLineHeight = 0.0;
        this.lineHeightMultiple = 0.0;
    }
}
exports.UIParagraphStyle = UIParagraphStyle;
class Character {
    constructor(letter, attributes) {
        this.letter = letter;
        this.attributes = attributes;
    }
}
class SpanElement {
    constructor() {
        this.innerText = "";
        this.style = "";
        this.children = [];
    }
    appendChild(child) {
        this.children.push(child);
    }
    toHTMLString() {
        return `<span style="${this.style}">${this.innerText}${this.children.map(it => it.toHTMLString()).join("")}</span>`;
    }
}
class UIAttributedString {
    constructor(str, attributes) {
        this.str = str;
        this.attributes = attributes;
        this.charSequences = [];
        this.charSequences = Array.from(str).map(it => {
            return new Character(it, Object.assign({}, attributes));
        });
    }
    measure(inSize) {
        return UIRect_1.UIRectZero;
    }
    measureAsync(inSize) {
        return TextMeasurer_1.TextMeasurer.measureAttributedText(this, inSize);
    }
    mutable() {
        const mutableString = new UIMutableAttributedString("", this.attributes);
        mutableString.charSequences = this.charSequences.map(it => {
            return new Character(it.letter, Object.assign({}, it.attributes));
        });
        return mutableString;
    }
    toHTMLText() {
        const spanElement = new SpanElement;
        let currentElement = new SpanElement;
        let currentAttributes = "";
        this.charSequences.forEach(it => {
            const attributes = JSON.stringify(it.attributes);
            if (currentAttributes !== attributes) {
                if (currentElement.innerText.length > 0) {
                    spanElement.appendChild(currentElement);
                }
                currentElement = new SpanElement;
                currentAttributes = attributes;
                this.setSpanStyle(currentElement, it.attributes, spanElement);
            }
            currentElement.innerText += it.letter;
        });
        if (currentElement.innerText.length > 0) {
            spanElement.appendChild(currentElement);
        }
        return spanElement.toHTMLString();
    }
    setSpanStyle(spanElement, attributes, rootElement) {
        {
            const value = attributes[UIAttributedStringKey.foregroundColor];
            if (value instanceof UIColor_1.UIColor) {
                spanElement.style += `color: ${value.toStyle()};`;
            }
        }
        {
            const value = attributes[UIAttributedStringKey.font];
            if (value instanceof UIFont_1.UIFont) {
                spanElement.style += `
                font-size: ${value.pointSize.toString()}px;
                font-family: ${typeof value.fontName === "string" ? value.fontName : "unset"};
                font-weight: ${typeof value.fontStyle === "string" ? value.fontStyle : "unset"};
                font-style: ${typeof value.fontStyle === "string" ? value.fontStyle : "unset"};
                `;
            }
        }
        {
            const value = attributes[UIAttributedStringKey.backgroundColor];
            if (value instanceof UIColor_1.UIColor) {
                spanElement.style += `background-color: ${value.toStyle()};`;
            }
        }
        {
            const value = attributes[UIAttributedStringKey.kern];
            if (typeof value === "number") {
                spanElement.style += `letter-spacing: ${value}px;`;
            }
        }
        {
            const value = attributes[UIAttributedStringKey.strikethroughStyle];
            if (value === 1) {
                spanElement.style += `text-decoration-line: line-through;`;
                const colorValue = attributes[UIAttributedStringKey.strikethroughColor];
                if (colorValue instanceof UIColor_1.UIColor) {
                    spanElement.style += `text-decoration-color: ${colorValue.toStyle()};`;
                }
            }
        }
        {
            const value = attributes[UIAttributedStringKey.underlineStyle];
            if (value === 1) {
                spanElement.style += `text-decoration-line: underline;`;
                const colorValue = attributes[UIAttributedStringKey.underlineColor];
                if (colorValue instanceof UIColor_1.UIColor) {
                    spanElement.style += `text-decoration-color: ${colorValue.toStyle()};`;
                }
            }
        }
        {
            const value = attributes[UIAttributedStringKey.strokeWidth];
            if (typeof value === "number" && value !== 0) {
                spanElement.style += `-webkit-text-stroke-width: ${value}px;`;
                const colorValue = attributes[UIAttributedStringKey.strokeColor];
                if (colorValue instanceof UIColor_1.UIColor) {
                    spanElement.style += `-webkit-text-stroke-color: ${colorValue.toStyle()};`;
                }
            }
        }
        {
            const value = attributes[UIAttributedStringKey.paragraphStyle];
            if (value instanceof UIParagraphStyle) {
                switch (value.alignment) {
                    case UIEnums_1.UITextAlignment.left:
                        rootElement.style += `text-align: left;`;
                        break;
                    case UIEnums_1.UITextAlignment.center:
                        rootElement.style += `text-align: center;`;
                        break;
                    case UIEnums_1.UITextAlignment.right:
                        rootElement.style += `text-align: right;`;
                        break;
                }
                const lineHeight = value.minimumLineHeight || value.maximumLineHeight || 0;
                if (lineHeight > 0) {
                    rootElement.style += `line-height: ${lineHeight}px;`;
                }
            }
        }
    }
}
exports.UIAttributedString = UIAttributedString;
class UIMutableAttributedString extends UIAttributedString {
    constructor(str, attributes) {
        super(str, attributes);
        this.str = str;
        this.attributes = attributes;
    }
    replaceCharacters(inRange, withString) {
        const replacingChars = Array.from(withString).map((it, index) => {
            if (index < inRange.length) {
                return new Character(it, this.charSequences[inRange.location + index].attributes);
            }
            else {
                return new Character(it, this.charSequences[inRange.location + inRange.length - 1].attributes);
            }
        });
        const spliceArguments = replacingChars.slice();
        spliceArguments.unshift(inRange.length);
        spliceArguments.unshift(inRange.location);
        this.charSequences.splice.apply(this.charSequences, spliceArguments);
    }
    setAttributes(attributes, range) {
        for (let index = range.location; index < range.location + range.length; index++) {
            this.charSequences[index].attributes = Object.assign({}, attributes);
        }
    }
    addAttribute(attrName, value, range) {
        for (let index = range.location; index < range.location + range.length; index++) {
            this.charSequences[index].attributes[attrName] = value;
        }
    }
    addAttributes(attributes, range) {
        for (let index = range.location; index < range.location + range.length; index++) {
            for (const attrName in attributes) {
                this.charSequences[index].attributes[attrName] = attributes[attrName];
            }
        }
    }
    removeAttribute(attrName, range) {
        for (let index = range.location; index < range.location + range.length; index++) {
            delete this.charSequences[index].attributes[attrName];
        }
    }
    replaceCharactersWithAttributedString(inRange, withAttributedString) {
        const spliceArguments = withAttributedString.charSequences.slice();
        spliceArguments.unshift(inRange.length);
        spliceArguments.unshift(inRange.location);
        this.charSequences.splice.apply(this.charSequences, spliceArguments);
    }
    insertAttributedString(attributedString, atIndex) {
        const spliceArguments = attributedString.charSequences.slice();
        spliceArguments.unshift(0);
        spliceArguments.unshift(atIndex);
        this.charSequences.splice.apply(this.charSequences, spliceArguments);
    }
    appendAttributedString(attributedString) {
        attributedString.charSequences.forEach(it => {
            this.charSequences.push(it);
        });
    }
    deleteCharacters(inRange) {
        this.charSequences.splice(inRange.location, inRange.length);
    }
    immutable() {
        const immutableString = new UIAttributedString("", this.attributes);
        immutableString.charSequences = this.charSequences.map(it => {
            return new Character(it.letter, Object.assign({}, it.attributes));
        });
        return immutableString;
    }
}
exports.UIMutableAttributedString = UIMutableAttributedString;


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const UIComponentManager_1 = __webpack_require__(2);
class TextMeasurer {
    static measureAttributedText(text, inSize) {
        return new Promise((resolver, rejector) => {
            let measureBlock = () => {
                const keyWindowComponent = UIComponentManager_1.UIComponentManager.keyWindowComponent;
                if (keyWindowComponent) {
                    keyWindowComponent.setData({
                        measuringText: '',
                        measuringTextStyle: `
                        width: ${inSize.width}px;
                        height: ${inSize.height}px;
                    }`,
                        measuringRichText: text.toHTMLText(),
                    }, () => {
                        const q = wx.createSelectorQuery().in(keyWindowComponent);
                        q.select('#_text_measurer').boundingClientRect(function (res) {
                            if (res) {
                                resolver({ x: 0, y: 0, width: res.width, height: res.height });
                            }
                            else {
                                rejector(Error("TextMeasurer error."));
                            }
                        });
                        q.exec();
                    });
                    return true;
                }
                return false;
            };
            if (!measureBlock()) {
                let intervalHandler = undefined;
                let retryCount = 0;
                intervalHandler = setInterval(() => {
                    retryCount++;
                    if (!measureBlock() && retryCount >= 10) {
                        clearInterval(intervalHandler);
                        rejector && rejector(Error("UIWindow not ready."));
                    }
                    else {
                        clearInterval(intervalHandler);
                    }
                }, 100);
            }
        });
    }
    static measureText(text, params) {
        return new Promise((resolver, rejector) => {
            const keyWindowComponent = UIComponentManager_1.UIComponentManager.keyWindowComponent;
            if (keyWindowComponent) {
                keyWindowComponent.setData({
                    measuringRichText: "",
                    measuringText: text,
                    measuringTextStyle: `
                    font-size: ${params.font !== undefined ? params.font.pointSize : 14}px;
                    font-family: ${params.font !== undefined ? params.font.fontName : ""}; 
                    font-weight: ${params.font !== undefined ? params.font.fontStyle : ""}; 
                    font-style: ${params.font !== undefined ? params.font.fontStyle : ""}; 
                    ${(() => {
                        if (params.numberOfLines === 1) {
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
                    })()};
                    width: ${params.inRect.width}px;
                    height: ${params.inRect.height}px;
                }`,
                }, () => {
                    const q = wx.createSelectorQuery().in(keyWindowComponent);
                    q.select('#_text_measurer').boundingClientRect(function (res) {
                        if (res) {
                            resolver({ x: 0, y: 0, width: res.width, height: res.height });
                        }
                        else {
                            rejector(Error("TextMeasurer error."));
                        }
                    });
                    q.exec();
                });
            }
        });
    }
}
exports.TextMeasurer = TextMeasurer;


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const d3 = __webpack_require__(66);
class UIBezierPath {
    constructor() {
        this.d3Paths = [d3.path()];
    }
    activePath() {
        return this.d3Paths[this.d3Paths.length - 1];
    }
    moveTo(toPoint) {
        this.activePath().moveTo(toPoint.x, toPoint.y);
    }
    addLineTo(toPoint) {
        this.activePath().lineTo(toPoint.x, toPoint.y);
    }
    addArcTo(toCenter, radius, startAngle, endAngle, closewise) {
        this.activePath().moveTo(toCenter.x + radius, toCenter.y);
        this.activePath().arc(toCenter.x, toCenter.y, radius, startAngle, endAngle, closewise);
    }
    addCurveTo(toPoint, controlPoint1, controlPoint2) {
        this.activePath().bezierCurveTo(controlPoint1.x, controlPoint1.y, controlPoint2.x, controlPoint2.y, toPoint.x, toPoint.y);
    }
    addQuadCurveTo(toPoint, controlPoint) {
        this.activePath().quadraticCurveTo(controlPoint.x, controlPoint.y, toPoint.x, toPoint.y);
    }
    closePath() {
        this.activePath().closePath();
    }
    removeAllPoints() {
        this.d3Paths = [d3.path()];
    }
    appendPath(path) {
        path.d3Paths.forEach(it => {
            this.d3Paths.push(it);
        });
    }
}
exports.UIBezierPath = UIBezierPath;


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

// https://d3js.org/d3-path/ v1.0.7 Copyright 2018 Mike Bostock
!function(t,i){ true?i(exports):undefined}(this,function(t){"use strict";var i=Math.PI,s=2*i,h=s-1e-6;function _(){this._x0=this._y0=this._x1=this._y1=null,this._=""}function e(){return new _}_.prototype=e.prototype={constructor:_,moveTo:function(t,i){this._+="M"+(this._x0=this._x1=+t)+","+(this._y0=this._y1=+i)},closePath:function(){null!==this._x1&&(this._x1=this._x0,this._y1=this._y0,this._+="Z")},lineTo:function(t,i){this._+="L"+(this._x1=+t)+","+(this._y1=+i)},quadraticCurveTo:function(t,i,s,h){this._+="Q"+ +t+","+ +i+","+(this._x1=+s)+","+(this._y1=+h)},bezierCurveTo:function(t,i,s,h,_,e){this._+="C"+ +t+","+ +i+","+ +s+","+ +h+","+(this._x1=+_)+","+(this._y1=+e)},arcTo:function(t,s,h,_,e){t=+t,s=+s,h=+h,_=+_,e=+e;var n=this._x1,o=this._y1,r=h-t,a=_-s,u=n-t,c=o-s,f=u*u+c*c;if(e<0)throw new Error("negative radius: "+e);if(null===this._x1)this._+="M"+(this._x1=t)+","+(this._y1=s);else if(f>1e-6)if(Math.abs(c*r-a*u)>1e-6&&e){var x=h-n,y=_-o,M=r*r+a*a,l=x*x+y*y,d=Math.sqrt(M),p=Math.sqrt(f),v=e*Math.tan((i-Math.acos((M+f-l)/(2*d*p)))/2),b=v/p,w=v/d;Math.abs(b-1)>1e-6&&(this._+="L"+(t+b*u)+","+(s+b*c)),this._+="A"+e+","+e+",0,0,"+ +(c*x>u*y)+","+(this._x1=t+w*r)+","+(this._y1=s+w*a)}else this._+="L"+(this._x1=t)+","+(this._y1=s);else;},arc:function(t,_,e,n,o,r){t=+t,_=+_;var a=(e=+e)*Math.cos(n),u=e*Math.sin(n),c=t+a,f=_+u,x=1^r,y=r?n-o:o-n;if(e<0)throw new Error("negative radius: "+e);null===this._x1?this._+="M"+c+","+f:(Math.abs(this._x1-c)>1e-6||Math.abs(this._y1-f)>1e-6)&&(this._+="L"+c+","+f),e&&(y<0&&(y=y%s+s),y>h?this._+="A"+e+","+e+",0,1,"+x+","+(t-a)+","+(_-u)+"A"+e+","+e+",0,1,"+x+","+(this._x1=c)+","+(this._y1=f):y>1e-6&&(this._+="A"+e+","+e+",0,"+ +(y>=i)+","+x+","+(this._x1=t+e*Math.cos(o))+","+(this._y1=_+e*Math.sin(o))))},rect:function(t,i,s,h){this._+="M"+(this._x0=this._x1=+t)+","+(this._y0=this._y1=+i)+"h"+ +s+"v"+ +h+"h"+-s+"Z"},toString:function(){return this._}},t.path=e,Object.defineProperty(t,"__esModule",{value:!0})});


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const UISize_1 = __webpack_require__(11);
const UIRect_1 = __webpack_require__(9);
const UIEdgeInsets_1 = __webpack_require__(8);
const UICollectionView_1 = __webpack_require__(35);
const UIIndexPath_1 = __webpack_require__(27);
var UICollectionViewScrollDirection;
(function (UICollectionViewScrollDirection) {
    UICollectionViewScrollDirection[UICollectionViewScrollDirection["vertical"] = 0] = "vertical";
    UICollectionViewScrollDirection[UICollectionViewScrollDirection["horizontal"] = 1] = "horizontal";
})(UICollectionViewScrollDirection = exports.UICollectionViewScrollDirection || (exports.UICollectionViewScrollDirection = {}));
const UIFlowLayoutCommonRowHorizontalAlignmentKey = "UIFlowLayoutCommonRowHorizontalAlignmentKey";
const UIFlowLayoutLastRowHorizontalAlignmentKey = "UIFlowLayoutLastRowHorizontalAlignmentKey";
const UIFlowLayoutRowVerticalAlignmentKey = "UIFlowLayoutRowVerticalAlignmentKey";
const UICollectionElementKindSectionHeader = "UICollectionElementKindSectionHeader";
const UICollectionElementKindSectionFooter = "UICollectionElementKindSectionFooter";
var UIFlowLayoutHorizontalAlignment;
(function (UIFlowLayoutHorizontalAlignment) {
    UIFlowLayoutHorizontalAlignment[UIFlowLayoutHorizontalAlignment["left"] = 0] = "left";
    UIFlowLayoutHorizontalAlignment[UIFlowLayoutHorizontalAlignment["center"] = 1] = "center";
    UIFlowLayoutHorizontalAlignment[UIFlowLayoutHorizontalAlignment["right"] = 2] = "right";
    UIFlowLayoutHorizontalAlignment[UIFlowLayoutHorizontalAlignment["justify"] = 3] = "justify";
})(UIFlowLayoutHorizontalAlignment = exports.UIFlowLayoutHorizontalAlignment || (exports.UIFlowLayoutHorizontalAlignment = {}));
class UIGridLayoutInfo {
    constructor() {
        this.sections = [];
        this.rowAlignmentOptions = {};
        this.usesFloatingHeaderFooter = false;
        this.dimension = 0.0;
        this.horizontal = false;
        this.leftToRight = false;
        this.contentSize = UISize_1.UISizeZero;
        this._isValid = false;
    }
    frameForItemAtIndexPath(indexPath) {
        const section = this.sections[indexPath.section];
        let itemFrame;
        if (section.fixedItemSize) {
            itemFrame = { x: 0.0, y: 0.0, width: section.itemSize.width, height: section.itemSize.height };
        }
        else {
            itemFrame = section.items[indexPath.row].itemFrame;
        }
        return itemFrame;
    }
    addSection() {
        const section = new UIGridLayoutSection();
        section.rowAlignmentOptions = this.rowAlignmentOptions;
        section.layoutInfo = this;
        this.sections.push(section);
        this.invalidate(false);
        return section;
    }
    invalidate(arg) {
        this._isValid = false;
    }
    snapshot() {
        const layoutInfo = new UIGridLayoutInfo();
        layoutInfo.sections = this.sections.slice(0);
        layoutInfo.rowAlignmentOptions = this.rowAlignmentOptions;
        layoutInfo.usesFloatingHeaderFooter = this.usesFloatingHeaderFooter;
        layoutInfo.dimension = this.dimension;
        layoutInfo.horizontal = this.horizontal;
        layoutInfo.leftToRight = this.leftToRight;
        layoutInfo.contentSize = Object.assign({}, this.contentSize);
        return layoutInfo;
    }
}
class UIGridLayoutSection {
    constructor() {
        this.items = [];
        this.rows = [];
        this.fixedItemSize = false;
        this.itemSize = UISize_1.UISizeZero;
        this._itemsCount = 0;
        this.verticalInterstice = 0.0;
        this.horizontalInterstice = 0.0;
        this.sectionMargins = UIEdgeInsets_1.UIEdgeInsetsZero;
        this.frame = UIRect_1.UIRectZero;
        this.headerFrame = UIRect_1.UIRectZero;
        this.footerFrame = UIRect_1.UIRectZero;
        this.headerDimension = 0.0;
        this.footerDimension = 0.0;
        this.layoutInfo = undefined;
        this.rowAlignmentOptions = {};
        this.otherMargin = 0.0;
        this.beginMargin = 0.0;
        this.endMargin = 0.0;
        this.actualGap = 0.0;
        this.lastRowBeginMargin = 0.0;
        this.lastRowEndMargin = 0.0;
        this.lastRowActualGap = 0.0;
        this.lastRowIncomplete = false;
        this.itemsByRowCount = 0;
        this.indexOfImcompleteRow = 0;
        this._isValid = false;
    }
    get itemsCount() {
        return this.fixedItemSize ? this._itemsCount : this.items.length;
    }
    set itemsCount(value) {
        this._itemsCount = value;
    }
    recomputeFromIndex(index) {
        this.invalidate();
        this.computeLayout();
    }
    invalidate() {
        this._isValid = false;
        this.rows = [];
    }
    computeLayout() {
        if (!this._isValid) {
            const layoutInfo = this.layoutInfo;
            if (layoutInfo === undefined) {
                return;
            }
            const sectionSize = { width: 0.0, height: 0.0 };
            var rowIndex = 0;
            var itemIndex = 0;
            var itemsByRowCount = 0;
            var dimensionLeft = 0.0;
            var row = undefined;
            const headerFooterDimension = layoutInfo.dimension;
            var dimension = headerFooterDimension;
            if (layoutInfo.horizontal) {
                dimension -= this.sectionMargins.top + this.sectionMargins.bottom;
                this.headerFrame = { x: sectionSize.width, y: 0.0, width: this.headerDimension, height: headerFooterDimension };
                sectionSize.width += this.headerDimension + this.sectionMargins.right;
            }
            else {
                dimension -= this.sectionMargins.left + this.sectionMargins.right;
                this.headerFrame = { x: 0.0, y: sectionSize.height, width: headerFooterDimension, height: this.headerDimension };
                sectionSize.height += this.headerDimension + this.sectionMargins.top;
            }
            const spacing = layoutInfo.horizontal ? this.verticalInterstice : this.horizontalInterstice;
            while (itemIndex <= this.itemsCount) {
                const finishCycle = itemIndex >= this.itemsCount;
                var item = undefined;
                if (!finishCycle) {
                    item = this.fixedItemSize ? undefined : this.items[itemIndex];
                }
                const itemSize = this.fixedItemSize ? this.itemSize : (item && item.itemFrame ? { width: item.itemFrame.width, height: item.itemFrame.height } : { width: 0, height: 0 });
                var itemDimension = layoutInfo.horizontal ? itemSize.height : itemSize.width;
                if (itemsByRowCount > 0) {
                    itemDimension += spacing;
                }
                if (dimensionLeft < itemDimension || finishCycle) {
                    if (row) {
                        this.itemsByRowCount = Math.max(itemsByRowCount, this.itemsByRowCount);
                        row.itemCount = itemsByRowCount;
                        if (!finishCycle) {
                            this.indexOfImcompleteRow = rowIndex;
                        }
                        row.layoutRow();
                        if (layoutInfo.horizontal) {
                            row.rowFrame = { x: sectionSize.width, y: this.sectionMargins.top, width: row.rowSize.width, height: row.rowSize.height };
                            sectionSize.height = Math.max(row.rowSize.height, sectionSize.height);
                            sectionSize.width += row.rowSize.width + (finishCycle ? 0.0 : this.horizontalInterstice);
                        }
                        else {
                            row.rowFrame = { x: this.sectionMargins.left, y: sectionSize.height, width: row.rowSize.width, height: row.rowSize.height };
                            sectionSize.height += row.rowSize.height + (finishCycle ? 0.0 : this.verticalInterstice);
                            sectionSize.width = Math.max(row.rowSize.width, sectionSize.width);
                        }
                    }
                    if (!finishCycle) {
                        if (row) {
                            row.complete = true;
                        }
                        row = this.addRow();
                        row.fixedItemSize = this.fixedItemSize;
                        row.index = rowIndex;
                        this.indexOfImcompleteRow = rowIndex;
                        rowIndex++;
                        if (itemsByRowCount > 0) {
                            itemDimension -= spacing;
                        }
                        dimensionLeft = dimension - itemDimension;
                        itemsByRowCount = 0;
                    }
                }
                else {
                    dimensionLeft -= itemDimension;
                }
                if (item && row) {
                    row.addItem(item);
                }
                itemIndex++;
                itemsByRowCount++;
            }
            if (layoutInfo.horizontal) {
                sectionSize.width += this.sectionMargins.right;
                this.footerFrame = { x: sectionSize.width, y: 0.0, width: this.footerDimension, height: headerFooterDimension };
                sectionSize.width += this.footerDimension;
            }
            else {
                sectionSize.height += this.sectionMargins.bottom;
                this.footerFrame = { x: 0.0, y: sectionSize.height, width: headerFooterDimension, height: this.footerDimension };
                sectionSize.height += this.footerDimension;
            }
            this.frame = { x: 0.0, y: 0.0, width: sectionSize.width, height: sectionSize.height };
            this._isValid = true;
        }
    }
    addItem() {
        const item = new UIGridLayoutItem();
        item.section = this;
        this.items.push(item);
        return item;
    }
    addRow() {
        const item = new UIGridLayoutRow();
        item.section = this;
        this.rows.push(item);
        return item;
    }
    snapshot() {
        const snapshotSection = new UIGridLayoutSection();
        snapshotSection.items = this.items.slice(0);
        snapshotSection.rows = this.rows.slice(0);
        snapshotSection.verticalInterstice = this.verticalInterstice;
        snapshotSection.horizontalInterstice = this.horizontalInterstice;
        snapshotSection.sectionMargins = this.sectionMargins;
        snapshotSection.frame = this.frame;
        snapshotSection.headerFrame = this.headerFrame;
        snapshotSection.footerFrame = this.footerFrame;
        snapshotSection.headerDimension = this.headerDimension;
        snapshotSection.footerDimension = this.footerDimension;
        snapshotSection.layoutInfo = this.layoutInfo;
        snapshotSection.rowAlignmentOptions = this.rowAlignmentOptions;
        snapshotSection.fixedItemSize = this.fixedItemSize;
        snapshotSection.itemSize = this.itemSize;
        snapshotSection.itemsCount = this.itemsCount;
        snapshotSection.otherMargin = this.otherMargin;
        snapshotSection.beginMargin = this.beginMargin;
        snapshotSection.endMargin = this.endMargin;
        snapshotSection.actualGap = this.actualGap;
        snapshotSection.lastRowBeginMargin = this.lastRowBeginMargin;
        snapshotSection.lastRowEndMargin = this.lastRowEndMargin;
        snapshotSection.lastRowActualGap = this.lastRowActualGap;
        snapshotSection.lastRowIncomplete = this.lastRowIncomplete;
        snapshotSection.itemsByRowCount = this.itemsByRowCount;
        snapshotSection.indexOfImcompleteRow = this.indexOfImcompleteRow;
        return snapshotSection;
    }
}
class UIGridLayoutItem {
    constructor() {
        this.section = undefined;
        this.rowObject = undefined;
        this.itemFrame = { x: 0.0, y: 0.0, width: 0.0, height: 0.0 };
    }
}
class UIGridLayoutRow {
    constructor() {
        this.section = undefined;
        this.items = [];
        this.rowSize = UISize_1.UISizeZero;
        this.rowFrame = { x: 0.0, y: 0.0, width: 0.0, height: 0.0 };
        this.index = 0;
        this.complete = false;
        this.fixedItemSize = false;
        this._itemCount = 0;
        this._isValid = false;
    }
    get itemCount() {
        return this.fixedItemSize ? this._itemCount : this.items.length;
    }
    set itemCount(value) {
        this._itemCount = value;
    }
    addItem(item) {
        this.items.push(item);
        item.rowObject = this;
        this.invalidate();
    }
    layoutRow() {
        this.layoutRowAndGenerateRectArray(false);
    }
    itemRects() {
        return this.layoutRowAndGenerateRectArray(true) || [];
    }
    invalidate() {
        this._isValid = false;
        this.rowSize = UISize_1.UISizeZero;
        this.rowFrame = { x: 0.0, y: 0.0, width: 0.0, height: 0.0 };
    }
    snapshot() {
        const snapshotRow = new UIGridLayoutRow();
        snapshotRow.section = this.section;
        snapshotRow.items = this.items;
        snapshotRow.rowSize = Object.assign({}, this.rowSize);
        snapshotRow.rowFrame = Object.assign({}, this.rowFrame);
        snapshotRow.index = this.index;
        snapshotRow.complete = this.complete;
        snapshotRow.fixedItemSize = this.fixedItemSize;
        snapshotRow.itemCount = this.itemCount;
        return snapshotRow;
    }
    layoutRowAndGenerateRectArray(generateRectArray) {
        const rects = generateRectArray ? [] : undefined;
        if (!this._isValid || generateRectArray) {
            const section = this.section;
            if (section === undefined) {
                return undefined;
            }
            const isHorizontal = section.layoutInfo && section.layoutInfo.horizontal ? true : false;
            const isLastRow = section.indexOfImcompleteRow == this.index;
            const horizontalAlignment = section.rowAlignmentOptions[isLastRow ? UIFlowLayoutLastRowHorizontalAlignmentKey : UIFlowLayoutCommonRowHorizontalAlignmentKey];
            if (horizontalAlignment === undefined) {
                return undefined;
            }
            var leftOverSpace = section.layoutInfo && section.layoutInfo.dimension || 0.0;
            if (isHorizontal) {
                leftOverSpace -= section.sectionMargins.top + section.sectionMargins.bottom;
            }
            else {
                leftOverSpace -= section.sectionMargins.left + section.sectionMargins.right;
            }
            var usedItemCount = 0;
            var itemIndex = 0;
            const spacing = isHorizontal ? section.verticalInterstice : section.horizontalInterstice;
            while (itemIndex < this.itemCount || isLastRow) {
                var nextItemSize;
                if (!this.fixedItemSize) {
                    const item = this.items[Math.min(itemIndex, this.itemCount - 1)];
                    nextItemSize = isHorizontal ? item.itemFrame.height : item.itemFrame.width;
                }
                else {
                    nextItemSize = isHorizontal ? section.itemSize.height : section.itemSize.width;
                }
                if (itemIndex > 0) {
                    nextItemSize += spacing;
                }
                if (leftOverSpace < nextItemSize) {
                    break;
                }
                leftOverSpace -= nextItemSize;
                itemIndex++;
                usedItemCount = itemIndex;
            }
            var itemOffset = { x: 0, y: 0 };
            if (horizontalAlignment == UIFlowLayoutHorizontalAlignment.right) {
                itemOffset.x += leftOverSpace;
            }
            else if (horizontalAlignment == UIFlowLayoutHorizontalAlignment.center ||
                (horizontalAlignment == UIFlowLayoutHorizontalAlignment.justify && usedItemCount == 1)) {
                itemOffset.x += leftOverSpace / 2.0;
            }
            const interSpacing = usedItemCount <= 1 ? 0.0 : leftOverSpace / (usedItemCount - 1);
            var frame = { x: 0.0, y: 0.0, width: 0.0, height: 0.0 };
            var itemFrame = { x: 0.0, y: 0.0, width: section.itemSize.width, height: section.itemSize.height };
            for (let itemIndex = 0; itemIndex < this.itemCount; itemIndex++) {
                var item = undefined;
                if (!this.fixedItemSize) {
                    item = this.items[itemIndex];
                    itemFrame = Object.assign({}, item.itemFrame);
                }
                if (isHorizontal) {
                    itemFrame.y = itemOffset.y;
                    itemOffset.y += itemFrame.height + section.verticalInterstice;
                    if (horizontalAlignment == UIFlowLayoutHorizontalAlignment.justify) {
                        itemOffset.y += interSpacing;
                    }
                }
                else {
                    itemFrame.x = itemOffset.x;
                    itemOffset.x += itemFrame.width + section.horizontalInterstice;
                    if (horizontalAlignment == UIFlowLayoutHorizontalAlignment.justify) {
                        itemOffset.x += interSpacing;
                    }
                }
                const iFrame = { x: itemFrame.x, y: itemFrame.y, width: itemFrame.width, height: itemFrame.height };
                if (item) {
                    item.itemFrame = iFrame;
                }
                if (rects) {
                    rects.push(iFrame);
                }
                frame = UIRect_1.UIRectUnion(frame, iFrame);
            }
            this.rowSize = { width: frame.width, height: frame.height };
            this._isValid = true;
        }
        return rects;
    }
}
class UICollectionViewFlowLayout extends UICollectionView_1.UICollectionViewLayout {
    constructor() {
        super(...arguments);
        this._data = undefined;
        this.minimumLineSpacing = 10.0;
        this.minimumInteritemSpacing = 10.0;
        this.itemSize = { width: 50.0, height: 50.0 };
        this.headerReferenceSize = UISize_1.UISizeZero;
        this.footerReferenceSize = UISize_1.UISizeZero;
        this._sectionInset = UIEdgeInsets_1.UIEdgeInsetsZero;
        this.scrollDirection = UICollectionViewScrollDirection.vertical;
        this.rowAlignmentOptions = {
            [UIFlowLayoutCommonRowHorizontalAlignmentKey]: UIFlowLayoutHorizontalAlignment.justify,
            [UIFlowLayoutLastRowHorizontalAlignmentKey]: UIFlowLayoutHorizontalAlignment.justify,
            [UIFlowLayoutRowVerticalAlignmentKey]: 1,
        };
        this._visibleBounds = UIRect_1.UIRectZero;
        this.rectCache = [];
    }
    get sectionInset() {
        return this._sectionInset;
    }
    set sectionInset(value) {
        this._sectionInset = value;
        this.invalidateLayout();
    }
    prepareLayout() {
        super.prepareLayout();
        const data = new UIGridLayoutInfo();
        data.horizontal = this.scrollDirection == UICollectionViewScrollDirection.horizontal;
        this._visibleBounds = this.collectionView ? this.collectionView.visibleBoundRects : UIRect_1.UIRectZero;
        data.dimension = data.horizontal ? this._visibleBounds.height : this._visibleBounds.width;
        data.rowAlignmentOptions = this.rowAlignmentOptions;
        this._data = data;
        this.fetchItemsInfo();
    }
    layoutAttributesForElementsInRect(rect) {
        if (this._data == undefined) {
            this.prepareLayout();
        }
        const layoutAttributesArray = [];
        const _data = this._data;
        if (_data === undefined) {
            return [];
        }
        _data.sections.forEach((section, sectionIndex) => {
            if (true) {
                const rectCache = this.rectCache;
                const normalizedHeaderFrame = { x: section.headerFrame.x + section.frame.x, y: section.headerFrame.y + section.frame.y, width: section.headerFrame.width, height: section.headerFrame.height };
                if (!UIRect_1.UIRectIsEmpty(normalizedHeaderFrame) && UIRect_1.UIRectIntersectsRect(normalizedHeaderFrame, rect)) {
                    const layoutAttributes = new this.layoutAttributesClass(new UIIndexPath_1.UIIndexPath(0, sectionIndex), UICollectionElementKindSectionHeader, UICollectionView_1.ItemType.supplementaryView);
                    layoutAttributes.frame = normalizedHeaderFrame;
                    layoutAttributesArray.push(layoutAttributes);
                }
                var itemRects = rectCache[sectionIndex];
                if (itemRects === undefined && section.fixedItemSize && section.rows.length > 0) {
                    itemRects = section.rows[0].itemRects();
                    if (itemRects != undefined) {
                        rectCache[sectionIndex] = itemRects;
                    }
                }
                section.rows.forEach(row => {
                    const normalizedRowFrame = { x: row.rowFrame.x + section.frame.x, y: row.rowFrame.y + section.frame.y, width: row.rowFrame.width, height: row.rowFrame.height };
                    if (UIRect_1.UIRectIntersectsRect(normalizedRowFrame, rect)) {
                        for (let itemIndex = 0; itemIndex < row.itemCount; itemIndex++) {
                            let layoutAttributes;
                            let sectionItemIndex;
                            let itemFrame;
                            if (row.fixedItemSize) {
                                itemFrame = itemRects[itemIndex] || UIRect_1.UIRectZero;
                                sectionItemIndex = row.index * section.itemsByRowCount + itemIndex;
                            }
                            else {
                                const item = row.items[itemIndex];
                                sectionItemIndex = section.items.indexOf(item);
                                itemFrame = item.itemFrame;
                            }
                            const normalizedItemFrame = { x: normalizedRowFrame.x + itemFrame.x, y: normalizedRowFrame.y + itemFrame.y, width: itemFrame.width, height: itemFrame.height };
                            if (UIRect_1.UIRectIntersectsRect(normalizedItemFrame, rect)) {
                                layoutAttributes = new this.layoutAttributesClass(new UIIndexPath_1.UIIndexPath(sectionItemIndex, sectionIndex), UICollectionView_1.UICollectionElementKindCell, UICollectionView_1.ItemType.cell);
                                layoutAttributes.frame = normalizedItemFrame;
                                layoutAttributesArray.push(layoutAttributes);
                            }
                        }
                    }
                });
                const normalizedFooterFrame = { x: section.footerFrame.x + section.frame.x, y: section.footerFrame.y + section.frame.y, width: section.footerFrame.width, height: section.footerFrame.height };
                if (!UIRect_1.UIRectIsEmpty(normalizedFooterFrame) && UIRect_1.UIRectIntersectsRect(normalizedFooterFrame, rect)) {
                    const layoutAttributes = new this.layoutAttributesClass(new UIIndexPath_1.UIIndexPath(0, sectionIndex), UICollectionElementKindSectionFooter, UICollectionView_1.ItemType.supplementaryView);
                    layoutAttributes.frame = normalizedFooterFrame;
                    layoutAttributesArray.push(layoutAttributes);
                }
            }
        });
        return layoutAttributesArray;
    }
    layoutAttributesForItemAtIndexPath(indexPath) {
        if (this._data === undefined) {
            this.prepareLayout();
        }
        const _data = this._data;
        if (_data === undefined) {
            return undefined;
        }
        const section = _data.sections[indexPath.section];
        var row = undefined;
        var itemFrame = { x: 0.0, y: 0.0, width: 0.0, height: 0.0 };
        if (section.fixedItemSize && section.itemsByRowCount > 0 && indexPath.row / section.itemsByRowCount < section.rows.length) {
            row = section.rows[(indexPath.row / section.itemsByRowCount)];
            const itemIndex = (indexPath.row % section.itemsByRowCount);
            const itemRects = row.itemRects();
            itemFrame = itemRects[itemIndex];
        }
        else if (indexPath.row < section.items.length) {
            const item = section.items[indexPath.row];
            row = item.rowObject;
            itemFrame = item.itemFrame;
        }
        const layoutAttributes = new this.layoutAttributesClass(indexPath, UICollectionView_1.UICollectionElementKindCell, UICollectionView_1.ItemType.cell);
        if (row) {
            const normalizedRowFrame = { x: row.rowFrame.x + section.frame.x, y: row.rowFrame.y + section.frame.y, width: row.rowFrame.width, height: row.rowFrame.height };
            layoutAttributes.frame = { x: normalizedRowFrame.x + itemFrame.x, y: normalizedRowFrame.y + itemFrame.y, width: itemFrame.width, height: itemFrame.height };
        }
        return layoutAttributes;
    }
    layoutAttributesForSupplementaryViewOfKind(kind, indexPath) {
        if (this._data === undefined) {
            this.prepareLayout();
        }
        const _data = this._data;
        if (_data === undefined) {
            return undefined;
        }
        const sectionIndex = indexPath.section;
        var layoutAttributes = undefined;
        if (sectionIndex < _data.sections.length) {
            const section = _data.sections[sectionIndex];
            var normalizedFrame = { x: 0.0, y: 0.0, width: 0.0, height: 0.0 };
            if (kind == UICollectionElementKindSectionHeader) {
                normalizedFrame = section.headerFrame;
            }
            else if (kind == UICollectionElementKindSectionFooter) {
                normalizedFrame = section.footerFrame;
            }
            if (!UIRect_1.UIRectIsEmpty(normalizedFrame)) {
                normalizedFrame = { x: normalizedFrame.x + section.frame.x, y: normalizedFrame.y + section.frame.y, width: normalizedFrame.width, height: normalizedFrame.height };
                layoutAttributes = new this.layoutAttributesClass(new UIIndexPath_1.UIIndexPath(0, sectionIndex), kind, UICollectionView_1.ItemType.supplementaryView);
                layoutAttributes.frame = normalizedFrame;
            }
        }
        return layoutAttributes;
    }
    layoutAttributesForDecorationViewOfKind(kind, indexPath) {
        return undefined;
    }
    collectionViewContentSize() {
        if (this._data === undefined) {
            this.prepareLayout();
        }
        const _data = this._data;
        if (_data === undefined) {
            return super.collectionViewContentSize();
        }
        return _data.contentSize;
    }
    invalidateLayout() {
        super.invalidateLayout();
        this.rectCache = [];
        this._data = undefined;
    }
    __sizeForItem(indexPath) {
        return this.val("sizeForItem", indexPath) || this.itemSize;
    }
    __insetForSection(inSection) {
        return this.val("insetForSection", inSection) || this.sectionInset;
    }
    __minimumLineSpacing(inSection) {
        const value = this.val("minimumLineSpacing", inSection);
        return typeof value === "number" ? value : this.minimumLineSpacing;
    }
    __minimumInteritemSpacing(inSection) {
        const value = this.val("minimumInteritemSpacing", inSection);
        return typeof value === "number" ? value : this.minimumInteritemSpacing;
    }
    __referenceSizeForHeader(inSection) {
        return this.headerReferenceSize;
    }
    __referenceSizeForFooter(inSection) {
        return this.footerReferenceSize;
    }
    fetchItemsInfo() {
        this.getSizingInfos();
        this.updateItemsLayout();
    }
    getSizingInfos() {
        const _data = this._data;
        if (_data === undefined) {
            return;
        }
        const collectionView = this.collectionView;
        if (collectionView === undefined) {
            return;
        }
        const numberOfSections = collectionView.numberOfSections();
        for (let section = 0; section < numberOfSections; section++) {
            const layoutSection = _data.addSection();
            layoutSection.verticalInterstice = _data.horizontal ? this.__minimumInteritemSpacing(section) : this.__minimumLineSpacing(section);
            layoutSection.horizontalInterstice = !_data.horizontal ? this.__minimumInteritemSpacing(section) : this.__minimumLineSpacing(section);
            layoutSection.sectionMargins = this.__insetForSection(section);
            layoutSection.headerDimension = _data.horizontal ? this.__referenceSizeForHeader(section).width : this.__referenceSizeForHeader(section).height;
            layoutSection.footerDimension = _data.horizontal ? this.__referenceSizeForFooter(section).width : this.__referenceSizeForFooter(section).height;
            const numberOfItems = collectionView.numberOfItemsInSection(section);
            for (let item = 0; item < numberOfItems; item++) {
                const indexPath = new UIIndexPath_1.UIIndexPath(item, section);
                const itemSize = this.__sizeForItem(indexPath);
                const layoutItem = layoutSection.addItem();
                layoutItem.itemFrame = { x: 0.0, y: 0.0, width: itemSize.width, height: itemSize.height };
            }
        }
    }
    updateItemsLayout() {
        const _data = this._data;
        if (_data === undefined) {
            return;
        }
        var contentSize = { width: 0, height: 0 };
        _data.sections.forEach((section) => {
            section.computeLayout();
            const sectionFrame = Object.assign({}, section.frame);
            if (_data.horizontal) {
                sectionFrame.x += contentSize.width;
                contentSize.width += section.frame.width + section.frame.x;
                contentSize.height = Math.max(contentSize.height, sectionFrame.height + section.frame.y + section.sectionMargins.top + section.sectionMargins.bottom);
            }
            else {
                sectionFrame.y += contentSize.height;
                contentSize.height += sectionFrame.height + section.frame.y;
                contentSize.width = Math.max(contentSize.width, sectionFrame.width + section.frame.x + section.sectionMargins.left + section.sectionMargins.right);
            }
            section.frame = { x: sectionFrame.x, y: sectionFrame.y, width: sectionFrame.width, height: sectionFrame.height };
        });
        _data.contentSize = { width: contentSize.width, height: contentSize.height };
    }
}
exports.UICollectionViewFlowLayout = UICollectionViewFlowLayout;


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class UIConfirm {
    constructor(message) {
        this.message = message;
        this.confirmTitle = "Yes";
        this.cancelTitle = "No";
    }
    show(completed, cancelled) {
        wx.showModal({
            title: "",
            content: this.message,
            cancelText: this.cancelTitle,
            confirmText: this.confirmTitle,
            success(res) {
                if (res.confirm) {
                    if (completed) {
                        completed();
                    }
                }
                else if (res.cancel) {
                    if (cancelled) {
                        cancelled();
                    }
                }
            }
        });
    }
}
exports.UIConfirm = UIConfirm;


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const UUID_1 = __webpack_require__(32);
class UIDevice {
    constructor() {
        this.name = "Browser";
        this.model = "Browser";
        this.systemName = "WeChat";
        this.systemVersion = "1.0.0";
        const systemInfo = wx.getSystemInfoSync();
        this.name = systemInfo.brand;
        this.model = systemInfo.model;
        this.systemName = "WeChat";
        this.systemVersion = systemInfo.SDKVersion;
        const idfv = wx.getStorageSync("com.xt.identifierForVendor");
        if (typeof idfv === "string" && idfv.length > 0) {
            this.identifierForVendor = new UUID_1.UUID(idfv);
        }
        else {
            this.identifierForVendor = new UUID_1.UUID();
            wx.setStorageSync("com.xt.identifierForVendor", this.identifierForVendor.UUIDString);
        }
    }
}
UIDevice.current = new UIDevice;
exports.UIDevice = UIDevice;


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const UIViewController_1 = __webpack_require__(15);
class UINavigationBarViewController extends UIViewController_1.UIViewController {
    constructor() {
        super();
        this.clazz = "UINavigationBarViewController";
        console.warn("暂时不支持 UINavigationBarViewController 在小程序中使用。");
    }
}
exports.UINavigationBarViewController = UINavigationBarViewController;


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const UIEdgeInsets_1 = __webpack_require__(8);
class UITabBarItem {
    constructor() {
        this._title = undefined;
        this._image = undefined;
        this._selectedImage = undefined;
        this._imageInsets = UIEdgeInsets_1.UIEdgeInsetsZero;
        // Implementation
        this.barButton = undefined;
    }
    get title() {
        return this._title;
    }
    set title(value) {
        this._title = value;
        if (this.barButton) {
            this.barButton.setNeedUpdate();
        }
    }
    get image() {
        return this._image;
    }
    set image(value) {
        this._image = value;
        if (this.barButton) {
            this.barButton.setNeedUpdate();
        }
    }
    get selectedImage() {
        return this._selectedImage;
    }
    set selectedImage(value) {
        this._selectedImage = value;
        if (this.barButton) {
            this.barButton.setNeedUpdate();
        }
    }
    get imageInsets() {
        return this._imageInsets;
    }
    set imageInsets(value) {
        this._imageInsets = value;
        if (this.barButton) {
            this.barButton.setNeedUpdate();
        }
    }
}
exports.UITabBarItem = UITabBarItem;


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const UIViewController_1 = __webpack_require__(15);
const UINavigationBar_1 = __webpack_require__(28);
const UIAnimator_1 = __webpack_require__(7);
const UIColor_1 = __webpack_require__(5);
class UINavigationController extends UIViewController_1.UIViewController {
    constructor(rootViewController) {
        super();
        this.rootViewController = rootViewController;
        this.clazz = "UINavigationController";
        this.navigationBar = new UINavigationBar_1.UINavigationBar;
        this.attachBlock = undefined;
    }
    attach(dataOwner, dataField) {
        let idx = dataOwner.options && parseInt(dataOwner.options.idx);
        if (isNaN(idx)) {
            idx = 0;
        }
        this.attachBlock = () => {
            if (idx < this.childViewControllers.length) {
                this.childViewControllers[idx].iView.attach(dataOwner, dataField);
            }
        };
        this.attachBlock();
        this.loadViewIfNeed();
        dataOwner.onShow = this._onShow.bind(this);
        this.updateBrowserTitle();
        this.updateBrowserBar();
    }
    _onShow() {
        const currentIdx = getCurrentPages().length - 1;
        if (currentIdx < this.childViewControllers.length) {
            this.popToViewController(this.childViewControllers[currentIdx]);
        }
    }
    viewDidLoad() {
        if (this.rootViewController) {
            this.pushViewController(this.rootViewController, false);
        }
        this.navigationBar.navigationController = this;
        super.viewDidLoad();
        this.updateBrowserBar();
    }
    pushViewController(viewController, animated = true) {
        this.addChildViewController(viewController);
        if (this.childViewControllers.length === 1) {
            if (this.attachBlock) {
                this.attachBlock();
            }
            else if (this.childViewControllers[0].iView.superview === undefined) {
                this.view.addSubview(this.childViewControllers[0].iView);
            }
        }
        else {
            if (this.tabBarController) {
                this.tabBarController.activedNavigationController = this;
            }
            wx.navigateTo({ url: "index?idx=" + (this.childViewControllers.length - 1) });
        }
        this.updateBrowserTitle();
        this.updateBrowserBar();
    }
    popViewController(animated = true) {
        const fromViewController = this.childViewControllers[this.childViewControllers.length - 1];
        const toViewController = this.childViewControllers[this.childViewControllers.length - 2];
        fromViewController.viewWillDisappear(animated);
        toViewController.viewWillAppear(animated);
        wx.navigateBack();
        fromViewController.removeFromParentViewController();
        fromViewController.iView.removeFromSuperview();
        fromViewController.viewDidDisappear(true);
        toViewController.viewDidAppear(true);
        this.updateBrowserTitle();
        this.updateBrowserBar();
        return fromViewController;
    }
    popToViewController(viewController, animated = true) {
        if (this.childViewControllers.indexOf(viewController) < 0) {
            return [];
        }
        const targetIndex = this.childViewControllers.indexOf(viewController);
        const fromViewControllers = this.childViewControllers.filter((_, index) => {
            return index > targetIndex;
        });
        if (fromViewControllers.length == 0) {
            return [];
        }
        const toViewController = viewController;
        toViewController.iView.hidden = false;
        fromViewControllers.forEach(it => { it.viewWillDisappear(animated); });
        toViewController.viewWillAppear(animated);
        if (getCurrentPages().length !== this.childViewControllers.length - fromViewControllers.length) {
            wx.navigateBack({ delta: fromViewControllers.length });
        }
        fromViewControllers.forEach(it => { it.removeFromParentViewController(); });
        fromViewControllers.forEach(it => { it.iView.removeFromSuperview(); });
        fromViewControllers.forEach(it => { it.viewDidDisappear(false); });
        toViewController.viewDidAppear(false);
        this.updateBrowserTitle();
        this.updateBrowserBar();
        return fromViewControllers;
    }
    popToRootViewController(animated = true) {
        const rootViewController = this.childViewControllers[0];
        if (rootViewController === undefined) {
            return [];
        }
        return this.popToViewController(rootViewController, animated);
    }
    viewWillLayoutSubviews() {
        super.viewWillLayoutSubviews();
        if (this.childViewControllers[0]) {
            this.childViewControllers[0].iView.frame = this.view.bounds;
        }
    }
    updateBrowserTitle() {
        if (this.tabBarController && this.tabBarController.selectedViewController !== this) {
            return;
        }
        if (this.parentViewController === undefined && this.window === undefined && this.attachBlock === undefined) {
            return;
        }
        if (this.childViewControllers.length > 0) {
            const title = this.childViewControllers[this.childViewControllers.length - 1].title;
            if (title) {
                wx.setNavigationBarTitle({ title });
            }
        }
    }
    updateBrowserBar() {
        if (this.tabBarController && this.tabBarController.selectedViewController !== this) {
            return;
        }
        if (this.parentViewController === undefined && this.window === undefined && this.attachBlock === undefined) {
            return;
        }
        if (this.navigationBar.barTintColor) {
            wx.setNavigationBarColor({
                backgroundColor: this.navigationBar.barTintColor.toHEXStyle(),
                frontColor: this.navigationBar.tintColor.toStyle() === UIColor_1.UIColor.white.toStyle() ? '#ffffff' : '#000000',
                animation: {
                    duration: UIAnimator_1.UIAnimator.activeAnimator ? UIAnimator_1.UIAnimator.activeAnimator.animationProps.duration : 0.0,
                    timingFunc: UIAnimator_1.UIAnimator.activeAnimator ? UIAnimator_1.UIAnimator.activeAnimator.animationProps.timingFunction : undefined,
                },
            });
        }
        else {
            wx.setNavigationBarColor({
                backgroundColor: '#ffffff',
                frontColor: this.navigationBar.tintColor.toStyle() === UIColor_1.UIColor.white.toStyle() ? '#ffffff' : '#000000',
                animation: {
                    duration: UIAnimator_1.UIAnimator.activeAnimator ? UIAnimator_1.UIAnimator.activeAnimator.animationProps.duration : 0.0,
                    timingFunc: UIAnimator_1.UIAnimator.activeAnimator ? UIAnimator_1.UIAnimator.activeAnimator.animationProps.timingFunction : undefined,
                },
            });
        }
    }
}
exports.UINavigationController = UINavigationController;


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const UIViewController_1 = __webpack_require__(15);
const UIScrollView_1 = __webpack_require__(21);
const UIPoint_1 = __webpack_require__(12);
const UIAnimator_1 = __webpack_require__(7);
class UIPageViewController extends UIViewController_1.UIViewController {
    constructor(isVertical = false) {
        super();
        this.isVertical = isVertical;
        this.loops = false;
        this._pageItems = undefined;
        this._currentPage = undefined;
        // Implementation
        this.scrollView = new UIScrollView_1.UIScrollView()
            .on("didScroll", () => {
            this.scrollView.subviews.forEach(it => it.hidden = false);
        })
            .on("didEndScrollingAnimation", () => {
            this.changeContents();
        });
    }
    get pageItems() {
        return this._pageItems;
    }
    set pageItems(value) {
        this._pageItems = value;
        if (value && value.length > 0) {
            this.currentPage = value[0];
            this.resetContents();
        }
    }
    get currentPage() {
        return this._currentPage;
    }
    set currentPage(value) {
        this._currentPage = value;
        if (value) {
            if (value.parentViewController != this) {
                this.addChildViewController(value);
            }
        }
        this.resetContents();
    }
    scrollToNextPage(animated = true) {
        if (this.isVertical == true) {
            if (this.scrollView.contentInset.bottom > 0.0) {
                this.scrollView.setContentOffset({ x: 0.0, y: this.scrollView.contentInset.bottom }, animated);
                if (animated == false) {
                    this.changeContents();
                }
            }
        }
        else {
            if (this.scrollView.contentInset.right > 0.0) {
                this.scrollView.setContentOffset({ x: this.scrollView.contentInset.right, y: 0.0 }, animated);
                if (animated == false) {
                    this.changeContents();
                }
            }
        }
    }
    scrollToPreviousPage(animated = true) {
        if (this.isVertical == true) {
            if (this.scrollView.contentInset.top > 0.0) {
                this.scrollView.setContentOffset({ x: 0.0, y: -this.scrollView.contentInset.top }, animated);
                if (animated == false) {
                    this.changeContents();
                }
            }
        }
        else {
            if (this.scrollView.contentInset.left > 0.0) {
                this.scrollView.setContentOffset({ x: -this.scrollView.contentInset.left, y: 0.0 }, animated);
                if (animated == false) {
                    this.changeContents();
                }
            }
        }
    }
    beforeViewController(currentPage) {
        if (this.pageItems !== undefined) {
            const currentIndex = this.pageItems.indexOf(currentPage);
            if (currentIndex >= 0) {
                if (currentIndex > 0) {
                    return this.pageItems[currentIndex - 1];
                }
                else if (this.loops && this.pageItems.length > 1) {
                    return this.pageItems[this.pageItems.length - 1];
                }
            }
            else {
                return undefined;
            }
        }
        return this.val("beforeViewController", currentPage);
    }
    afterViewController(currentPage) {
        if (this.pageItems !== undefined) {
            const currentIndex = this.pageItems.indexOf(currentPage);
            if (currentIndex >= 0) {
                if (currentIndex + 1 < this.pageItems.length) {
                    return this.pageItems[currentIndex + 1];
                }
                else if (this.loops && this.pageItems.length > 1) {
                    return this.pageItems[0];
                }
            }
            else {
                return undefined;
            }
        }
        return this.val("afterViewController", currentPage);
    }
    didFinishAnimating(currentPage, previousPage) {
        this.emit("didFinishAnimating", currentPage, previousPage);
    }
    viewDidLoad() {
        this.scrollView.pagingEnabled = true;
        this.scrollView.bounces = false;
        this.scrollView.showsHorizontalScrollIndicator = false;
        this.scrollView.showsVerticalScrollIndicator = false;
        this.iView.addSubview(this.scrollView);
        super.viewDidLoad();
    }
    viewWillLayoutSubviews() {
        this.scrollView.frame = this.iView.bounds;
        this.scrollView.contentSize = { width: this.iView.bounds.width, height: this.iView.bounds.height };
        this.resetContents();
        super.viewWillLayoutSubviews();
    }
    changeContents() {
        if (this.isVertical == true) {
            if (Math.abs(this.scrollView.contentOffset.y - (-this.scrollView.bounds.height)) < 4.0) {
                const currentPage = this.currentPage;
                if (currentPage === undefined) {
                    return;
                }
                const beforePage = this.beforeViewController(currentPage);
                if (beforePage === undefined) {
                    return;
                }
                this.currentPage = beforePage;
                this.resetContents();
                this.didFinishAnimating(beforePage, currentPage);
            }
            else if (Math.abs(this.scrollView.contentOffset.y - this.scrollView.bounds.height) < 4.0) {
                const currentPage = this.currentPage;
                if (currentPage === undefined) {
                    return;
                }
                const afterPage = this.afterViewController(currentPage);
                if (afterPage === undefined) {
                    return;
                }
                this.currentPage = afterPage;
                this.resetContents();
                this.didFinishAnimating(afterPage, currentPage);
            }
        }
        else {
            if (Math.abs(this.scrollView.contentOffset.x - (-this.scrollView.bounds.width)) < 4.0) {
                const currentPage = this.currentPage;
                if (currentPage === undefined) {
                    return;
                }
                const beforePage = this.beforeViewController(currentPage);
                if (beforePage === undefined) {
                    return;
                }
                this.currentPage = beforePage;
                this.resetContents();
                this.didFinishAnimating(beforePage, currentPage);
            }
            else if (Math.abs(this.scrollView.contentOffset.x - this.scrollView.bounds.width) < 4.0) {
                const currentPage = this.currentPage;
                if (currentPage === undefined) {
                    return;
                }
                const afterPage = this.afterViewController(currentPage);
                if (afterPage === undefined) {
                    return;
                }
                this.currentPage = afterPage;
                this.resetContents();
                this.didFinishAnimating(afterPage, currentPage);
            }
        }
    }
    resetContents() {
        this.scrollView.alpha = 0.0;
        this.scrollView.setDataForce({ alpha: 0.0 }, () => {
            setTimeout(() => {
                const currentPage = this.currentPage;
                if (currentPage === undefined) {
                    return;
                }
                const beforePage = this.beforeViewController(currentPage);
                const afterPage = this.afterViewController(currentPage);
                this.scrollView.subviews.forEach(it => {
                    if (it != currentPage.iView && (beforePage === undefined || it != beforePage.iView) && (afterPage === undefined || it != afterPage.iView)) {
                        it.removeFromSuperview();
                    }
                });
                currentPage.iView.frame = this.iView.bounds;
                this.scrollView.addSubview(currentPage.iView);
                if (beforePage) {
                    this.addChildViewController(beforePage);
                    beforePage.iView.alpha = 0.0;
                    beforePage.iView.setDataForce({ alpha: 0.0 });
                    this.scrollView.addSubview(beforePage.iView);
                    if (this.isVertical == true) {
                        beforePage.iView.frame = { x: 0.0, y: -this.iView.bounds.height, width: this.iView.bounds.width, height: this.iView.bounds.height };
                    }
                    else {
                        beforePage.iView.frame = { x: -this.iView.bounds.width, y: 0.0, width: this.iView.bounds.width, height: this.iView.bounds.height };
                    }
                }
                if (afterPage) {
                    this.addChildViewController(afterPage);
                    afterPage.iView.alpha = 0.0;
                    afterPage.iView.setDataForce({ alpha: 0.0 });
                    this.scrollView.addSubview(afterPage.iView);
                    if (this.isVertical == true) {
                        afterPage.iView.frame = { x: 0.0, y: this.iView.bounds.height, width: this.iView.bounds.width, height: this.iView.bounds.height };
                    }
                    else {
                        afterPage.iView.frame = { x: this.iView.bounds.width, y: 0.0, width: this.iView.bounds.width, height: this.iView.bounds.height };
                    }
                }
                if (this.isVertical == true) {
                    this.scrollView.contentInset = {
                        top: beforePage !== undefined ? Math.ceil(this.iView.bounds.height) : 0.0,
                        left: 0.0,
                        bottom: afterPage !== undefined ? Math.ceil(this.iView.bounds.height) : 0.0,
                        right: 0.0
                    };
                }
                else {
                    this.scrollView.contentInset = {
                        top: 0.0,
                        left: beforePage !== undefined ? Math.ceil(this.iView.bounds.width) : 0.0,
                        bottom: 0.0,
                        right: afterPage !== undefined ? Math.ceil(this.iView.bounds.width) : 0.0
                    };
                }
                this.scrollView.contentOffset = UIPoint_1.UIPointZero;
                setTimeout(() => {
                    UIAnimator_1.UIAnimator.linear(0.30, () => {
                        currentPage.iView.alpha = 1.0;
                        this.scrollView.alpha = 1.0;
                    }, undefined);
                }, 50);
                this.childViewControllers.forEach(it => {
                    if (it !== this.currentPage && it !== beforePage && it !== afterPage) {
                        it.iView.removeFromSuperview();
                        it.removeFromParentViewController();
                    }
                    it.iView.hidden = it !== this.currentPage;
                });
                this.scrollView.markFlagDirty("pagingItems");
            }, 50);
        });
    }
}
exports.UIPageViewController = UIPageViewController;


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const UIGestureRecognizer_1 = __webpack_require__(14);
class UIPinchGestureRecognizer extends UIGestureRecognizer_1.UIGestureRecognizer {
    constructor() {
        super(...arguments);
        this.scale = 1.0;
        this.velocity = 0.0;
    }
    handleTouch(touches) {
        super.handleTouch(touches);
    }
}
exports.UIPinchGestureRecognizer = UIPinchGestureRecognizer;


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const UIView_1 = __webpack_require__(1);
const UIAnimator_1 = __webpack_require__(7);
class UIProgressView extends UIView_1.UIView {
    constructor() {
        super();
        this._progress = 0.0;
        this._progressTintColor = undefined;
        this._trackTintColor = undefined;
        // Implementation
        this.trackView = new UIView_1.UIView();
        this.progressView = new UIView_1.UIView();
        this.userInteractionEnabled = false;
        this.progressTintColor = this.tintColor;
        this.trackTintColor = this.tintColor.colorWithAlphaComponent(0.35);
        this.addSubview(this.trackView);
        this.addSubview(this.progressView);
    }
    /**
     * Getter progress
     * @return {number }
     */
    get progress() {
        return this._progress;
    }
    /**
     * Setter progress
     * @param {number } value
     */
    set progress(value) {
        this._progress = value;
        this.layoutIfNeeded();
    }
    setProgress(value, animated) {
        if (animated) {
            UIAnimator_1.UIAnimator.curve(0.30, () => {
                this.progress = value;
                this.layoutIfNeeded();
            }, undefined);
        }
        else {
            this.progress = value;
            this.layoutIfNeeded();
        }
    }
    /**
     * Getter progressTintColor
     * @return {UIColor }
     */
    get progressTintColor() {
        return this._progressTintColor;
    }
    /**
     * Setter progressTintColor
     * @param {UIColor } value
     */
    set progressTintColor(value) {
        this._progressTintColor = value;
        this.progressView.backgroundColor = value;
    }
    /**
     * Getter trackTintColor
     * @return {UIColor }
     */
    get trackTintColor() {
        return this._trackTintColor;
    }
    /**
     * Setter trackTintColor
     * @param {UIColor } value
     */
    set trackTintColor(value) {
        this._trackTintColor = value;
        this.trackView.backgroundColor = value;
    }
    layoutSubviews() {
        super.layoutSubviews();
        this.trackView.frame = this.bounds;
        this.progressView.frame = { x: 0.0, y: 0.0, width: this.bounds.width * this.progress, height: this.bounds.height };
    }
}
exports.UIProgressView = UIProgressView;


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const UIGestureRecognizer_1 = __webpack_require__(14);
class UIRotationGestureRecognizer extends UIGestureRecognizer_1.UIGestureRecognizer {
    constructor() {
        super(...arguments);
        this.rotation = 1.0;
        this.velocity = 0.0;
    }
}
exports.UIRotationGestureRecognizer = UIRotationGestureRecognizer;


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class UIScreen {
    constructor() {
        this.bounds = { x: 0, y: 0, width: parseInt(wx.getSystemInfoSync().screenWidth), height: parseInt(wx.getSystemInfoSync().screenHeight) };
        this.scale = parseInt(wx.getSystemInfoSync().pixelRatio);
    }
}
UIScreen.main = new UIScreen;
exports.UIScreen = UIScreen;


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const UIView_1 = __webpack_require__(1);
const UIAnimator_1 = __webpack_require__(7);
const UILongPressGestureRecognizer_1 = __webpack_require__(20);
class ThumbView extends UIView_1.UIView {
    pointInside(point) {
        return point.x >= -22.0 && point.y >= -22.0 && point.x <= this.frame.width + 22.0 && point.y <= this.frame.height + 22.0;
    }
}
class UISlider extends UIView_1.UIView {
    constructor() {
        super();
        this.value = 0.5;
        this.minimumValue = 0.0;
        this.maximumValue = 1.0;
        this._minimumTrackTintColor = undefined;
        this._maximumTrackTintColor = undefined;
        this._thumbTintColor = undefined;
        // Implementation
        this.minimumTrackView = new UIView_1.UIView();
        this.maximumTrackView = new UIView_1.UIView();
        this.thumbView = new ThumbView();
        this.thumbOutLightView = new UIView_1.UIView();
        this._tracking = false;
        this.previousLocation = undefined;
        if (this.tintColor) {
            this.minimumTrackTintColor = this.tintColor;
            this.maximumTrackTintColor = this.tintColor.colorWithAlphaComponent(0.3);
            this.thumbTintColor = this.tintColor;
        }
        this.maximumTrackView.userInteractionEnabled = false;
        this.addSubview(this.maximumTrackView);
        this.minimumTrackView.userInteractionEnabled = false;
        this.addSubview(this.minimumTrackView);
        this.thumbOutLightView.userInteractionEnabled = false;
        this.addSubview(this.thumbOutLightView);
        this.addSubview(this.thumbView);
        this.setupTouches();
    }
    get minimumTrackTintColor() {
        return this._minimumTrackTintColor;
    }
    set minimumTrackTintColor(value) {
        this._minimumTrackTintColor = value;
        this.minimumTrackView.backgroundColor = value;
    }
    get maximumTrackTintColor() {
        return this._maximumTrackTintColor;
    }
    set maximumTrackTintColor(value) {
        this._maximumTrackTintColor = value;
        this.maximumTrackView.backgroundColor = value;
    }
    get thumbTintColor() {
        return this._thumbTintColor;
    }
    set thumbTintColor(value) {
        this._thumbTintColor = value;
        if (value) {
            this.thumbView.backgroundColor = value;
            this.thumbOutLightView.backgroundColor = value.colorWithAlphaComponent(0.2);
        }
    }
    setValue(value, animated) {
        if (animated) {
            this.value = value;
            UIAnimator_1.UIAnimator.curve(0.5, () => { this.layoutSubviews(); }, undefined);
        }
        else {
            this.value = value;
            this.layoutSubviews();
        }
    }
    get tracking() {
        return this._tracking;
    }
    set tracking(value) {
        if (this._tracking === value) {
            return;
        }
        this._tracking = value;
        UIAnimator_1.UIAnimator.linear(0.15, () => {
            if (value) {
                this.thumbView.transform = { a: 1.4, b: 0.0, c: 0.0, d: 1.4, tx: 0.0, ty: 0.0 };
                this.thumbOutLightView.transform = { a: 2.4, b: 0.0, c: 0.0, d: 2.4, tx: 0.0, ty: 0.0 };
            }
            else {
                this.thumbView.transform = { a: 1.0, b: 0.0, c: 0.0, d: 1.0, tx: 0.0, ty: 0.0 };
                this.thumbOutLightView.transform = { a: 1.0, b: 0.0, c: 0.0, d: 1.0, tx: 0.0, ty: 0.0 };
            }
        }, undefined);
    }
    setupTouches() {
        const longPressGesture = new UILongPressGestureRecognizer_1.UILongPressGestureRecognizer();
        longPressGesture.on("began", (sender) => {
            this.previousLocation = sender.locationInView(this);
            this.tracking = true;
        });
        longPressGesture.on("changed", (sender) => {
            const previousLocation = this.previousLocation;
            if (!previousLocation) {
                return;
            }
            const location = sender.locationInView(this);
            if (location.x < 0.0 || location.x > this.bounds.width) {
                return;
            }
            const translationX = location.x - previousLocation.x;
            this.previousLocation = location;
            const newValue = this.value + translationX / this.frame.width * (this.maximumValue - this.minimumValue);
            this.value = Math.max(this.minimumValue, Math.min(this.maximumValue, newValue));
            this.emit("valueChanged", this);
            this.layoutSubviews();
        });
        longPressGesture.on("ended", () => {
            this.tracking = false;
        });
        longPressGesture.on("cancelled", () => {
            this.tracking = false;
        });
        longPressGesture.minimumPressDuration = 0.0;
        this.thumbView.addGestureRecognizer(longPressGesture);
    }
    layoutSubviews() {
        super.layoutSubviews();
        const progress = Math.max(0.0, Math.min(1.0, (this.value - this.minimumValue) / (this.maximumValue - this.minimumValue)));
        this.maximumTrackView.frame = { x: 0.0, y: (this.bounds.height - 4.0) / 2.0, width: this.bounds.width, height: 4.0 };
        this.minimumTrackView.frame = { x: 0.0, y: (this.bounds.height - 4.0) / 2.0, width: this.bounds.width * progress, height: 4.0 };
        this.thumbOutLightView.frame = { x: -7.5 + this.bounds.width * progress, y: (this.bounds.height - 15.0) / 2.0, width: 15.0, height: 15.0 };
        this.thumbOutLightView.layer.cornerRadius = 7.5;
        this.thumbView.frame = { x: -7.5 + this.bounds.width * progress, y: (this.bounds.height - 15.0) / 2.0, width: 15.0, height: 15.0 };
        this.thumbView.layer.cornerRadius = 7.5;
    }
    pointInside(point) {
        return point.x >= -22.0 && point.y >= -(44.0 - this.frame.height) / 2.0 && point.x <= this.frame.width + 22.0 && point.y <= this.frame.height + (44.0 - this.frame.height) / 2.0;
    }
}
exports.UISlider = UISlider;


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const UIEnums_1 = __webpack_require__(6);
const UIView_1 = __webpack_require__(1);
class UIStackView extends UIView_1.UIView {
    constructor(arrangedSubviews = undefined) {
        super();
        this.arrangedSubviews = [];
        this._axis = UIEnums_1.UILayoutConstraintAxis.horizontal;
        this._distribution = UIEnums_1.UIStackViewDistribution.fill;
        this._alignment = UIEnums_1.UIStackViewAlignment.fill;
        this._spacing = 0.0;
        // Implementation
        this.allLayoutWidths = new Map();
        this.allLayoutHeights = new Map();
        this.arrangedSubviews = arrangedSubviews || [];
        this.arrangedSubviews.forEach(it => {
            this.addSubview(it);
        });
        setTimeout(() => {
            this._layoutArrangeSubviews();
        }, 0);
    }
    addArrangedSubview(view) {
        this.arrangedSubviews.push(view);
        this.addSubview(view);
        this._layoutArrangeSubviews();
    }
    removeArrangedSubview(view) {
        const idx = this.arrangedSubviews.indexOf(view);
        if (idx >= 0) {
            this.arrangedSubviews.splice(idx, 1);
            view.removeFromSuperview();
            this._layoutArrangeSubviews();
        }
    }
    insertArrangedSubview(view, atIndex) {
        this.arrangedSubviews.splice(atIndex, 0, view);
        this.addSubview(view);
        this._layoutArrangeSubviews();
    }
    layoutArrangedSubview(subview, size) {
        this.allLayoutWidths.delete(subview);
        this.allLayoutHeights.delete(subview);
        if (size) {
            if (size.width !== undefined) {
                this.allLayoutWidths.set(subview, size.width);
            }
            if (size.height !== undefined) {
                this.allLayoutHeights.set(subview, size.height);
            }
        }
        this._layoutArrangeSubviews();
    }
    get axis() {
        return this._axis;
    }
    set axis(value) {
        this._axis = value;
        this._layoutArrangeSubviews();
    }
    get distribution() {
        return this._distribution;
    }
    set distribution(value) {
        this._distribution = value;
        this._layoutArrangeSubviews();
    }
    get alignment() {
        return this._alignment;
    }
    set alignment(value) {
        this._alignment = value;
        this._layoutArrangeSubviews();
    }
    get spacing() {
        return this._spacing;
    }
    set spacing(value) {
        this._spacing = value;
        this._layoutArrangeSubviews();
    }
    layoutSubviews() {
        super.layoutSubviews();
        this._layoutArrangeSubviews();
    }
    _layoutArrangeSubviews() {
        if (this.arrangedSubviews.length == 0) {
            return;
        }
        let x = [];
        let y = [];
        let width = [];
        let height = [];
        let axisLocation;
        let axisLength;
        let alignLocation;
        let alignLength;
        let axisValues;
        let alignValues;
        let boundsAxisLength;
        let boundsAlignLength;
        if (this.axis == UIEnums_1.UILayoutConstraintAxis.horizontal) {
            axisLocation = x;
            axisLength = width;
            alignLocation = y;
            alignLength = height;
            axisValues = this.allLayoutWidths;
            alignValues = this.allLayoutHeights;
            boundsAxisLength = this.bounds.width;
            boundsAlignLength = this.bounds.height;
        }
        else {
            axisLocation = y;
            axisLength = height;
            alignLocation = x;
            alignLength = width;
            axisValues = this.allLayoutHeights;
            alignValues = this.allLayoutWidths;
            boundsAxisLength = this.bounds.height;
            boundsAlignLength = this.bounds.width;
        }
        switch (this.distribution) {
            case UIEnums_1.UIStackViewDistribution.fill: {
                let axisValuesSum = 0;
                axisValues.forEach(it => {
                    axisValuesSum += it;
                });
                var leftSpace = boundsAxisLength - axisValuesSum;
                var location = 0.0;
                this.arrangedSubviews.forEach((view, index) => {
                    var space = 0.0;
                    const target = axisValues.get(view);
                    if (target !== undefined) {
                        space = target;
                    }
                    else {
                        space = leftSpace;
                        leftSpace = 0.0;
                    }
                    axisLocation.push(location);
                    axisLength.push(space);
                    location += space;
                });
                break;
            }
            case UIEnums_1.UIStackViewDistribution.fillEqually: {
                this.arrangedSubviews.forEach((_, index) => {
                    axisLocation.push(boundsAxisLength / this.arrangedSubviews.length * index);
                    axisLength.push(boundsAxisLength / this.arrangedSubviews.length);
                });
                break;
            }
            case UIEnums_1.UIStackViewDistribution.fillProportionally: {
                if (this.arrangedSubviews.length == 1) {
                    axisLocation.push(0.0);
                    axisLength.push(this.bounds.width);
                }
                else {
                    const everyWidth = (boundsAxisLength - ((this.arrangedSubviews.length - 1) * this.spacing)) / this.arrangedSubviews.length;
                    this.arrangedSubviews.forEach((_, index) => {
                        axisLocation.push((everyWidth + this.spacing) * index);
                        axisLength.push(everyWidth);
                    });
                }
                break;
            }
            case UIEnums_1.UIStackViewDistribution.equalSpacing: {
                if (this.arrangedSubviews.length == 1) {
                    axisLocation.push(0.0);
                    axisLength.push(boundsAxisLength);
                }
                else {
                    let axisValuesSum = 0;
                    axisValues.forEach(it => {
                        axisValuesSum += it;
                    });
                    const spacing = (boundsAxisLength - axisValuesSum) / (this.arrangedSubviews.length - 1);
                    var location = 0.0;
                    this.arrangedSubviews.forEach(view => {
                        axisLocation.push(location);
                        var space = axisValues.get(view) || 0.0;
                        axisLength.push(space);
                        location += space + spacing;
                    });
                }
                break;
            }
            case UIEnums_1.UIStackViewDistribution.equalCentering: {
                if (this.arrangedSubviews.length > 2) {
                    const firstViewCenterX = (axisValues.get(this.arrangedSubviews[0]) || 0.0) / 2.0;
                    const lastViewCenterX = boundsAxisLength - (axisValues.get(this.arrangedSubviews[this.arrangedSubviews.length - 1]) || 0.0) / 2.0;
                    const everyCenterSpace = (lastViewCenterX - firstViewCenterX) / (this.arrangedSubviews.length - 1);
                    var location = 0.0;
                    this.arrangedSubviews.forEach((it, index) => {
                        var space = axisValues.get(it) || 0.0;
                        axisLength.push(space);
                        if (index > 0) {
                            location -= space / 2.0;
                        }
                        axisLocation.push(location);
                        location += space / 2.0 + everyCenterSpace;
                    });
                }
                else if (this.arrangedSubviews.length == 2) {
                    var leftSpace = boundsAxisLength;
                    var location = 0.0;
                    axisLocation.push(location);
                    const firstSpace = axisValues.get(this.arrangedSubviews[0]) || 0.0;
                    axisLength.push(firstSpace);
                    leftSpace -= firstSpace;
                    location += firstSpace;
                    const secondSpace = axisValues.get(this.arrangedSubviews[1]) !== undefined ? axisValues.get(this.arrangedSubviews[1]) : leftSpace;
                    axisLocation.push(boundsAxisLength - (secondSpace || 0.0));
                    axisLength.push(secondSpace || 0.0);
                }
                else if (this.arrangedSubviews.length == 1) {
                    axisLocation.push(0.0);
                    axisLength.push(boundsAxisLength);
                }
                break;
            }
        }
        switch (this.alignment) {
            case UIEnums_1.UIStackViewAlignment.fill: {
                this.arrangedSubviews.forEach(_ => {
                    alignLocation.push(0.0);
                    alignLength.push(boundsAlignLength);
                });
                break;
            }
            case UIEnums_1.UIStackViewAlignment.leading: {
                this.arrangedSubviews.forEach(it => {
                    alignLocation.push(0.0);
                    alignLength.push(alignValues.get(it) || 0.0);
                });
                break;
            }
            case UIEnums_1.UIStackViewAlignment.center: {
                this.arrangedSubviews.forEach(it => {
                    const space = alignValues.get(it) || 0.0;
                    alignLocation.push((boundsAlignLength - space) / 2.0);
                    alignLength.push(space);
                });
                break;
            }
            case UIEnums_1.UIStackViewAlignment.trailing: {
                this.arrangedSubviews.forEach(it => {
                    const space = alignValues.get(it) || 0.0;
                    alignLocation.push(boundsAlignLength - space);
                    alignLength.push(space);
                });
                break;
            }
        }
        if (this.axis == UIEnums_1.UILayoutConstraintAxis.horizontal) {
            this.arrangedSubviews.forEach((view, index) => {
                view.frame = { x: axisLocation[index], y: alignLocation[index], width: axisLength[index], height: alignLength[index] };
            });
        }
        else {
            this.arrangedSubviews.forEach((view, index) => {
                view.frame = { x: alignLocation[index], y: axisLocation[index], width: alignLength[index], height: axisLength[index] };
            });
        }
    }
}
exports.UIStackView = UIStackView;


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const UIView_1 = __webpack_require__(1);
const UIColor_1 = __webpack_require__(5);
const UIAnimator_1 = __webpack_require__(7);
const UILongPressGestureRecognizer_1 = __webpack_require__(20);
class ThumbView extends UIView_1.UIView {
    pointInside(point) {
        return point.x >= -22.0 && point.y >= -22.0 && point.x <= this.frame.width + 22.0 && point.y <= this.frame.height + 22.0;
    }
}
class UISwitch extends UIView_1.UIView {
    constructor() {
        super();
        this.onTintColor = this.tintColor;
        this.thumbTintColor = UIColor_1.UIColor.white;
        this._isOn = false;
        // Implementation
        this.tintView = new UIView_1.UIView();
        this.thumbView = new ThumbView();
        this.thumbOutLightView = new UIView_1.UIView();
        this._tracking = false;
        this.touchChanged = false;
        this.tintView.userInteractionEnabled = false;
        this.addSubview(this.tintView);
        this.thumbOutLightView.userInteractionEnabled = false;
        this.addSubview(this.thumbOutLightView);
        this.thumbView.layer.shadowColor = new UIColor_1.UIColor(0.0, 0.0, 0.0, 1.0);
        this.thumbView.layer.shadowRadius = 2.0;
        this.thumbView.layer.shadowOffset = { width: 0.0, height: 3.0 };
        this.thumbView.layer.shadowOpacity = 0.2;
        this.addSubview(this.thumbView);
        this.setupTouches();
    }
    get isOn() {
        return this._isOn;
    }
    set isOn(value) {
        this._isOn = value;
        this.layoutSubviews();
    }
    setOn(on, animated) {
        if (animated) {
            UIAnimator_1.UIAnimator.curve(0.20, () => { this.isOn = on; }, undefined);
        }
        else {
            this.isOn = on;
        }
    }
    get tracking() {
        return this._tracking;
    }
    set tracking(value) {
        if (this._tracking == value) {
            return;
        }
        this._tracking = value;
        UIAnimator_1.UIAnimator.linear(0.15, () => {
            if (value) {
                this.thumbOutLightView.transform = { a: 1.6, b: 0.0, c: 0.0, d: 1.6, tx: 0.0, ty: 0.0 };
            }
            else {
                this.thumbOutLightView.transform = { a: 1.0, b: 0.0, c: 0.0, d: 1.0, tx: 0.0, ty: 0.0 };
            }
        }, undefined);
    }
    setupTouches() {
        const longPressGesture = new UILongPressGestureRecognizer_1.UILongPressGestureRecognizer;
        longPressGesture
            .on("began", () => {
            this.touchChanged = false;
            this.tracking = true;
        })
            .on("changed", (sender) => {
            const location = sender.locationInView(this);
            const isOn = location.x > this.bounds.width / 2.0;
            if (this.isOn != isOn) {
                this.touchChanged = true;
                UIAnimator_1.UIAnimator.curve(0.20, () => { this.isOn = isOn; }, undefined);
            }
        })
            .on("ended", (sender) => {
            if (!this.touchChanged) {
                const location = sender.locationInView(this);
                if (this.pointInside(location)) {
                    UIAnimator_1.UIAnimator.curve(0.20, () => { this.isOn = !this.isOn; }, () => {
                        this.emit("valueChanged", this);
                    });
                }
            }
            else {
                this.emit("valueChanged", this);
            }
            this.tracking = false;
        })
            .on("cancelled", () => {
            if (this.touchChanged) {
                this.emit("valueChanged", this);
            }
            this.tracking = false;
        });
        longPressGesture.minimumPressDuration = 0.0;
        this.thumbView.addGestureRecognizer(longPressGesture);
    }
    layoutSubviews() {
        super.layoutSubviews();
        this.tintView.frame = { x: (this.bounds.width - 34.0) / 2.0, y: (this.bounds.height - 14.0) / 2.0, width: 34.0, height: 14.0 };
        this.tintView.layer.cornerRadius = 7.0;
        if (this.isOn) {
            this.thumbView.frame = { x: this.tintView.frame.x + this.tintView.frame.width - 20.0, y: (this.bounds.height - 20.0) / 2.0, width: 20.0, height: 20.0 };
            this.thumbView.layer.cornerRadius = 10.0;
            if (this.onTintColor) {
                this.thumbView.backgroundColor = this.onTintColor;
                this.tintView.backgroundColor = this.onTintColor.colorWithAlphaComponent(0.5);
                this.thumbOutLightView.frame = { x: this.tintView.frame.x + this.tintView.frame.width - 20.0, y: (this.bounds.height - 20.0) / 2.0, width: 20.0, height: 20.0 };
                this.thumbOutLightView.layer.cornerRadius = 10.0;
                this.thumbOutLightView.backgroundColor = this.onTintColor.colorWithAlphaComponent(0.2);
            }
        }
        else {
            this.thumbView.frame = { x: this.tintView.frame.x, y: (this.bounds.height - 20.0) / 2.0, width: 20.0, height: 20.0 };
            this.thumbView.layer.cornerRadius = 10.0;
            this.thumbView.backgroundColor = this.thumbTintColor;
            this.tintView.backgroundColor = new UIColor_1.UIColor(0x84 / 255.0, 0x84 / 255.0, 0x84 / 255.0, 1.0);
            this.thumbOutLightView.frame = { x: this.tintView.frame.x, y: (this.bounds.height - 20.0) / 2.0, width: 20.0, height: 20.0 };
            this.thumbOutLightView.layer.cornerRadius = 10.0;
            this.thumbOutLightView.backgroundColor = new UIColor_1.UIColor(0x84 / 255.0, 0x84 / 255.0, 0x84 / 255.0, 0.2);
        }
    }
    pointInside(point) {
        return point.x >= 0.0 && point.y >= -(44.0 - this.frame.height) / 2.0 && point.x <= this.frame.width && point.y <= this.frame.height + (44.0 - this.frame.height) / 2.0;
    }
}
exports.UISwitch = UISwitch;


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const UIViewController_1 = __webpack_require__(15);
const UITabBar_1 = __webpack_require__(82);
class UITabBarController extends UIViewController_1.UIViewController {
    constructor() {
        super(...arguments);
        this.clazz = "UITabBarController";
        this.itemControllers = [];
        this._selectedIndex = -1;
        this.tabBar = new UITabBar_1.UITabBar;
        this.activedNavigationController = undefined;
    }
    attach(dataOwner, dataField) {
        if (this.activedNavigationController !== undefined) {
            this.activedNavigationController.attach(dataOwner, dataField);
            return;
        }
        this.iView.attach(dataOwner, dataField);
        dataOwner.onShow = () => {
            if (this.activedNavigationController) {
                this.activedNavigationController.popToRootViewController();
                this.activedNavigationController = undefined;
            }
        };
    }
    get selectedIndex() {
        return this._selectedIndex;
    }
    set selectedIndex(value) {
        if (this._selectedIndex == value) {
            this.emit("onSelectedViewController", this, true);
            return;
        }
        if (value < 0) {
            this._selectedIndex = value;
            return;
        }
        const oldIndex = this._selectedIndex;
        if (this.itemControllers[value]) {
            const it = this.itemControllers[value];
            if (it.parentViewController === undefined) {
                this.addChildViewController(it);
                this.iView.insertSubviewAtIndex(it.iView, 0);
                this.viewWillLayoutSubviews();
            }
        }
        if (this.itemControllers[oldIndex]) {
            this.itemControllers[oldIndex].viewWillDisappear(false);
        }
        if (this.itemControllers[value]) {
            this.itemControllers[value].viewWillAppear(false);
        }
        this._selectedIndex = value;
        this.childViewControllers.forEach(it => {
            it.iView.hidden = this.itemControllers.indexOf(it) != value;
        });
        this.tabBar.setSelectedIndex(value);
        if (this.itemControllers[oldIndex]) {
            this.itemControllers[oldIndex].viewDidDisappear(false);
        }
        if (this.itemControllers[value]) {
            this.itemControllers[value].viewDidAppear(false);
        }
        this.emit("onSelectedViewController", this, false);
        this.updateBrowserTitle();
        this.updateBrowserBar();
    }
    get selectedViewController() {
        return this.itemControllers[this.selectedIndex];
    }
    set selectedViewController(value) {
        this.selectedIndex = Math.max(0, this.itemControllers.indexOf(value));
    }
    setViewControllers(viewControllers, animated = false) {
        this.childViewControllers.forEach(it => {
            it.removeFromParentViewController();
            it.iView.removeFromSuperview();
        });
        this.itemControllers = viewControllers;
        viewControllers.forEach((it, index) => {
            if (index == 0) {
                this.addChildViewController(it);
                this.iView.addSubview(it.iView);
            }
        });
        this.iView.bringSubviewToFront(this.tabBar);
        this.tabBar.resetItems();
        this.selectedIndex = 0;
        this.viewWillLayoutSubviews();
        this.updateBrowserTitle();
        this.updateBrowserBar();
    }
    // Implementation
    get barFrame() {
        if (this.tabBar.hidden) {
            return { x: 0.0, y: this.iView.bounds.height, width: this.iView.bounds.width, height: 0.0 };
        }
        return { x: 0.0, y: this.iView.bounds.height - this.tabBar.barHeight, width: this.iView.bounds.width, height: this.tabBar.barHeight };
    }
    get contentFrame() {
        return { x: 0.0, y: 0.0, width: this.iView.bounds.width, height: this.iView.bounds.height - this.barFrame.height };
    }
    get navigationControllerFrame() {
        return { x: 0.0, y: 0.0, width: this.iView.bounds.width, height: this.iView.bounds.height - this.barFrame.height };
    }
    // private get hidesBottomBarContentFrame(): UIRect {
    //     return { x: 0.0, y: 0.0, width: this.iView.bounds.width, height: this.iView.bounds.height }
    // }
    viewDidLoad() {
        this.tabBar.tabBarController = this;
        this.iView.addSubview(this.tabBar);
        super.viewDidLoad();
    }
    viewWillLayoutSubviews() {
        this.tabBar.frame = this.barFrame;
        this.childViewControllers.forEach(it => {
            if (it.clazz === "UINavigationController") {
                it.iView.frame = this.navigationControllerFrame;
            }
            else {
                it.iView.frame = this.contentFrame;
            }
        });
        super.viewWillLayoutSubviews();
    }
    updateBrowserTitle() {
        if (this.selectedViewController) {
            if (this.selectedViewController.clazz === "UINavigationController") {
                this.selectedViewController.updateBrowserTitle();
            }
            else {
                wx.setNavigationBarTitle({
                    title: this.selectedViewController.title
                });
            }
        }
    }
    updateBrowserBar() {
        if (this.selectedViewController) {
            if (this.selectedViewController.clazz === "UINavigationController") {
                this.selectedViewController.updateBrowserBar();
            }
            else {
                wx.setNavigationBarColor({
                    backgroundColor: "#ffffff",
                    frontColor: "#000000",
                });
            }
        }
    }
}
exports.UITabBarController = UITabBarController;


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const UIView_1 = __webpack_require__(1);
const UIColor_1 = __webpack_require__(5);
const UIImageView_1 = __webpack_require__(26);
const UILabel_1 = __webpack_require__(25);
const UIFont_1 = __webpack_require__(19);
const UIEnums_1 = __webpack_require__(6);
const UITapGestureRecognizer_1 = __webpack_require__(24);
const UIEdgeInsets_1 = __webpack_require__(8);
class UITabBar extends UIView_1.UIView {
    constructor() {
        super();
        this.translucent = false;
        this.barHeight = 50.0;
        this._barTintColor = undefined;
        this.unselectedItemTintColor = new UIColor_1.UIColor(0x73 / 255.0, 0x73 / 255.0, 0x73 / 255.0, 1.0);
        // Implementation
        this.tabBarController = undefined;
        this.barButtons = [];
        this.barTintColor = UIColor_1.UIColor.white;
        this.tintColor = UIColor_1.UIColor.black;
        this.extraStyles = `
        border-top: solid;
        border-top-width: 1rpx;
        border-top-color: rgba(152, 150, 155, 0.5);
        `;
    }
    get hidden() {
        return this._hidden;
    }
    set hidden(value) {
        this._hidden = value;
        this.invalidate();
        if (this.tabBarController) {
            this.tabBarController.iView.setNeedsDisplay();
        }
    }
    get barTintColor() {
        return this._barTintColor;
    }
    set barTintColor(value) {
        this._barTintColor = value;
        this.backgroundColor = value;
    }
    resetItems() {
        this.barButtons.forEach(it => {
            it.removeFromSuperview();
            if (it.barItem) {
                it.barItem.barButton = undefined;
                it.barItem = undefined;
            }
        });
        if (this.tabBarController) {
            this.barButtons = this.tabBarController.itemControllers.map((it) => {
                const tabBarButton = new UITabBarButton;
                tabBarButton.barItem = it.tabBarItem;
                it.tabBarItem.barButton = tabBarButton;
                return tabBarButton;
            });
            this.barButtons.forEach((it, index) => {
                it.addGestureRecognizer(new UITapGestureRecognizer_1.UITapGestureRecognizer().on("touch", () => {
                    if (this.tabBarController) {
                        this.tabBarController.selectedIndex = index;
                    }
                }));
                this.addSubview(it);
            });
        }
        this.setNeedsLayout(true);
    }
    setSelectedIndex(selectedIndex) {
        this.barButtons.forEach((barButton, index) => {
            barButton.itemSelected = index == selectedIndex;
            barButton.tintColor = index == selectedIndex ? this.tintColor : this.unselectedItemTintColor;
        });
    }
    layoutSubviews() {
        super.layoutSubviews();
        if (this.barButtons.length > 0) {
            const eachWidth = this.bounds.width / this.barButtons.length;
            this.barButtons.forEach((barButton, index) => {
                barButton.frame = { x: index * eachWidth, y: 0.0, width: eachWidth, height: this.bounds.height };
            });
        }
    }
}
exports.UITabBar = UITabBar;
class UITabBarButton extends UIView_1.UIView {
    constructor() {
        super();
        this._barItem = undefined;
        this._itemSelected = false;
        this.iconImageView = new UIImageView_1.UIImageView;
        this.titleLabel = new UILabel_1.UILabel;
        this.iconImageView.contentMode = UIEnums_1.UIViewContentMode.scaleAspectFit;
        this.addSubview(this.iconImageView);
        this.titleLabel.font = new UIFont_1.UIFont(11.0);
        this.titleLabel.textAlignment = UIEnums_1.UITextAlignment.center;
        this.addSubview(this.titleLabel);
    }
    get barItem() {
        return this._barItem;
    }
    set barItem(value) {
        this._barItem = value;
        this.setNeedUpdate();
    }
    get itemSelected() {
        return this._itemSelected;
    }
    set itemSelected(value) {
        this._itemSelected = value;
        this.setNeedUpdate();
    }
    setNeedUpdate() {
        if (this.barItem) {
            this.iconImageView.image = this.itemSelected ? (this.barItem.selectedImage || this.barItem.image) : this.barItem.image;
            if (this.iconImageView.image && this.iconImageView.image.size.width === 0) {
                this.iconImageView.image.on("load", () => {
                    this.setNeedsLayout(true);
                });
            }
            this.titleLabel.text = this.barItem.title;
        }
        this.setNeedsLayout(true);
    }
    tintColorDidChange() {
        super.tintColorDidChange();
        this.titleLabel.textColor = this.tintColor;
    }
    layoutSubviews() {
        super.layoutSubviews();
        const iconSize = { width: 26, height: 26 };
        const titleSize = { width: 120, height: 18 };
        const imageInsets = this.barItem ? this.barItem.imageInsets : UIEdgeInsets_1.UIEdgeInsetsZero;
        this.iconImageView.frame = {
            x: imageInsets.left + (this.bounds.width - iconSize.width) / 2.0 - imageInsets.right,
            y: imageInsets.top + (this.bounds.height - (iconSize.height + titleSize.height)) / 2.0,
            width: iconSize.width,
            height: iconSize.height
        };
        this.titleLabel.frame = {
            x: 0.0,
            y: this.iconImageView.frame.y + this.iconImageView.frame.height + imageInsets.bottom,
            width: this.bounds.width,
            height: titleSize.height
        };
    }
}
exports.UITabBarButton = UITabBarButton;


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const UIView_1 = __webpack_require__(1);
const UIScrollView_1 = __webpack_require__(21);
const UIColor_1 = __webpack_require__(5);
const UIIndexPath_1 = __webpack_require__(27);
const UIRect_1 = __webpack_require__(9);
const UIAnimator_1 = __webpack_require__(7);
const UITouch_1 = __webpack_require__(10);
// @Reference https://github.com/BigZaphod/Chameleon/blob/master/UIKit/Classes/UITableView.m
class UITableView extends UIScrollView_1.UIScrollView {
    constructor() {
        super();
        this.rowHeight = 44.0;
        this._tableHeaderView = undefined;
        this._tableFooterView = undefined;
        this.separatorColor = new UIColor_1.UIColor(0xbc / 255.0, 0xba / 255.0, 0xc1 / 255.0, 0.75);
        this.separatorInset = { top: 0, left: 15, bottom: 0, right: 0 };
        this.allowsSelection = true;
        this.allowsMultipleSelection = false;
        this._registeredCells = {};
        this._reusableCells = [];
        this._cachedCells = {};
        this._selectedRows = [];
        this._highlightedRow = undefined;
        this._sections = [];
        this.firstTouchPoint = undefined;
        this.firstTouchCell = undefined;
        this.alwaysBounceVertical = true;
    }
    get tableHeaderView() {
        return this._tableHeaderView;
    }
    set tableHeaderView(value) {
        if (this._tableHeaderView) {
            this._tableHeaderView.removeFromSuperview();
        }
        this._tableHeaderView = value;
        this._setContentSize();
        if (value) {
            this.addSubview(value);
        }
        this._layoutTableView();
    }
    get tableFooterView() {
        return this._tableFooterView;
    }
    set tableFooterView(value) {
        if (this._tableFooterView) {
            this._tableFooterView.removeFromSuperview();
        }
        this._tableFooterView = value;
        this._setContentSize();
        if (value) {
            this.addSubview(value);
        }
        this._layoutTableView();
    }
    register(initializer, reuseIdentifier) {
        this._registeredCells[reuseIdentifier] = initializer;
    }
    dequeueReusableCell(reuseIdentifier, indexPath) {
        for (let index = 0; index < this._reusableCells.length; index++) {
            if (this._reusableCells[index].reuseIdentifier == reuseIdentifier) {
                const cell = this._reusableCells[index];
                this._reusableCells.splice(index, 1);
                return cell;
            }
        }
        const cell = this._registeredCells[reuseIdentifier] ? this._registeredCells[reuseIdentifier]() : new UITableViewCell();
        cell.reuseIdentifier = reuseIdentifier;
        return cell;
    }
    reloadData() {
        if (this.fetchMoreControl && this.fetchMoreControl.fetching) {
            this._updateSectionsCache();
            this._setContentSize();
            this._layoutTableView();
            return;
        }
        Object.keys(this._cachedCells).forEach(it => {
            this._cachedCells[it].removeFromSuperview();
        });
        this._reusableCells.forEach(it => it.removeFromSuperview());
        this._reusableCells = [];
        this._cachedCells = {};
        this._updateSectionsCache();
        this._setContentSize();
        this._layoutTableView();
    }
    selectRow(indexPath, animated) {
        if (!this.allowsMultipleSelection) {
            this._selectedRows.forEach(indexPathKey => {
                const values = Object.keys(this._cachedCells).map(it => this._cachedCells[it]);
                for (let index = 0; index < values.length; index++) {
                    const element = values[index];
                    if (element.currentIndexPath && element.currentIndexPath.mapKey() === indexPathKey) {
                        element.selected = false;
                        element.emit("selected", element, false, false);
                        break;
                    }
                }
            });
            this._selectedRows = [];
        }
        this._selectedRows.push(indexPath.mapKey());
        const values = Object.keys(this._cachedCells).map(it => this._cachedCells[it]);
        for (let index = 0; index < values.length; index++) {
            const element = values[index];
            if (element.currentIndexPath && element.currentIndexPath.mapKey() === indexPath.mapKey()) {
                if (animated) {
                    UIAnimator_1.UIAnimator.linear(0.30, () => {
                        element.selected = true;
                    }, undefined);
                }
                else {
                    element.selected = true;
                }
                element.emit("selected", element, true, animated);
                break;
            }
        }
    }
    deselectRow(indexPath, animated) {
        const idx = this._selectedRows.indexOf(indexPath.mapKey());
        if (idx >= 0) {
            this._selectedRows.splice(idx, 1);
        }
        const values = Object.keys(this._cachedCells).map(it => this._cachedCells[it]);
        for (let index = 0; index < values.length; index++) {
            const element = values[index];
            if (element.currentIndexPath && element.currentIndexPath.mapKey() === indexPath.mapKey()) {
                if (animated) {
                    UIAnimator_1.UIAnimator.linear(0.30, () => {
                        element.selected = false;
                    }, undefined);
                }
                else {
                    element.selected = false;
                }
                element.emit("selected", element, false, false);
                break;
            }
        }
    }
    // DataSource & Delegate
    numberOfSections() {
        const value = this.val("numberOfSections");
        return typeof value === "number" ? value : 1;
    }
    numberOfRows(inSection) {
        const value = this.val("numberOfRows", inSection);
        return typeof value === "number" ? value : 0;
    }
    heightForRow(indexPath) {
        const value = this.val("heightForRow", indexPath);
        return typeof value === "number" ? value : this.rowHeight;
    }
    cellForRow(indexPath) {
        const value = this.val("cellForRow", indexPath);
        return value || new UITableViewCell();
    }
    viewForHeader(inSection) {
        return this.val("viewForHeader", inSection);
    }
    heightForHeader(inSection) {
        const value = this.val("heightForHeader", inSection);
        return typeof value === "number" ? value : 0.0;
    }
    viewForFooter(inSection) {
        return this.val("viewForFooter", inSection);
    }
    heightForFooter(inSection) {
        const value = this.val("heightForFooter", inSection);
        return typeof value === "number" ? value : 0.0;
    }
    didSelectRow(indexPath) {
    }
    didDeselectRow(indexPath) {
    }
    contentOffsetDidChanged() {
        this.touchesMoved([]);
    }
    layoutSubviews() {
        super.layoutSubviews();
        this._layoutTableView();
    }
    _updateSectionsCache() {
        this._sections.forEach((it) => {
            it.headerView && it.headerView.removeFromSuperview();
            it.footerView && it.footerView.removeFromSuperview();
        });
        this._sections = [];
        const numberOfSections = this.numberOfSections();
        for (let section = 0; section < numberOfSections; section++) {
            const numberOfRowsInSection = this.numberOfRows(section);
            const sectionRecord = new UITableViewSection();
            const rowHeights = Array(numberOfRowsInSection).fill(0).map((_, row) => {
                return this.heightForRow(new UIIndexPath_1.UIIndexPath(row, section));
            });
            const totalRowsHeight = rowHeights.length > 0 ? rowHeights.reduce((a, b) => a + b) : 0.0;
            const headerView = this.viewForHeader(section);
            if (headerView) {
                this.addSubview(headerView);
                sectionRecord.headerView = headerView;
                sectionRecord.headerHeight = this.heightForHeader(section);
            }
            else {
                sectionRecord.headerHeight = 0.0;
            }
            const footerView = this.viewForFooter(section);
            if (footerView) {
                this.addSubview(footerView);
                sectionRecord.footerView = footerView;
                sectionRecord.footerHeight = this.heightForFooter(section);
            }
            else {
                sectionRecord.footerHeight = 0.0;
            }
            sectionRecord.rowsHeight = totalRowsHeight;
            sectionRecord.setNumberOfRows(numberOfRowsInSection, rowHeights);
            this._sections.push(sectionRecord);
        }
    }
    _updateSectionsCacheIfNeeded() {
        if (this._sections.length == 0) {
            this._updateSectionsCache();
        }
    }
    _setContentSize() {
        this._updateSectionsCacheIfNeeded();
        const headerHeight = this.tableHeaderView ? this.tableHeaderView.frame.height : 0.0;
        const sectionsHeight = this._sections.length > 0 ? this._sections.map(it => it.sectionHeight()).reduce((a, b) => a + b) : 0.0;
        const footerHeight = this.tableFooterView ? this.tableFooterView.frame.height : 0.0;
        this.contentSize = {
            width: 0.0,
            height: headerHeight + sectionsHeight + footerHeight
        };
    }
    _layoutTableView() {
        const boundsSize = { width: this.bounds.width, height: this.bounds.height };
        let contentOffsetY = 0.0;
        let visibleBounds = { x: 0.0, y: contentOffsetY, width: boundsSize.width, height: this.contentSize.height };
        var tableHeight = 0.0;
        if (this.tableHeaderView) {
            this.tableHeaderView.frame = { x: 0.0, y: 0.0, width: boundsSize.width, height: this.tableHeaderView.frame.height };
            tableHeight += this.tableHeaderView.frame.height;
        }
        const numberOfSections = this._sections.length;
        for (let section = 0; section < numberOfSections; section++) {
            const sectionRect = this._rectForSection(section);
            tableHeight += sectionRect.height;
            if (UIRect_1.UIRectIntersectsRect(sectionRect, visibleBounds)) {
                const headerRect = this._rectForHeaderInSection(section);
                const footerRect = this._rectForFooterInSection(section);
                const sectionRecord = this._sections[section];
                const numberOfRows = sectionRecord.numberOfRows;
                if (sectionRecord.headerView) {
                    sectionRecord.headerView.frame = headerRect;
                }
                if (sectionRecord.footerView) {
                    sectionRecord.footerView.frame = footerRect;
                }
                var startIndex;
                var left = 0;
                var right = Math.max(0, sectionRecord.numberOfRows - 1);
                while (true) {
                    if (Math.abs(right - left) <= 1) {
                        startIndex = left;
                        break;
                    }
                    const mid = Math.ceil((right + left) / 2.0);
                    const indexPath = new UIIndexPath_1.UIIndexPath(mid, section);
                    const rowRect = this._rectForRowAtIndexPath(indexPath);
                    if (rowRect.y <= contentOffsetY && rowRect.y + rowRect.height >= contentOffsetY) {
                        startIndex = mid;
                        break;
                    }
                    else if (rowRect.y + rowRect.height < contentOffsetY) {
                        left = mid;
                    }
                    else if (rowRect.y > contentOffsetY) {
                        right = mid;
                    }
                }
                var renderCount = 0;
                for (let row = startIndex; row < numberOfRows; row++) {
                    renderCount++;
                    const indexPath = new UIIndexPath_1.UIIndexPath(row, section);
                    const rowRect = this._rectForRowAtIndexPath(indexPath);
                    if (UIRect_1.UIRectIntersectsRect(rowRect, visibleBounds) && rowRect.height > 0) {
                        var cell = this._cachedCells[indexPath.mapKey()] || this.cellForRow(indexPath);
                        if (this.fetchMoreControl &&
                            this.fetchMoreControl.fetching &&
                            cell.currentIndexPath &&
                            cell.currentIndexPath.mapKey() === indexPath.mapKey()) {
                            cell.setSeparator(row === numberOfRows - 1, this.separatorColor, this.separatorInset);
                            continue;
                        }
                        cell.currentIndexPath = indexPath;
                        cell.currentSectionRecord = sectionRecord;
                        this._cachedCells[indexPath.mapKey()] = cell;
                        cell.highlighted = this._highlightedRow == indexPath.mapKey();
                        cell.emit("highlighted", cell, cell.highlighted, false);
                        cell.selected = this._selectedRows.indexOf(indexPath.mapKey()) >= 0;
                        cell.emit("selected", cell, cell.selected, false);
                        cell.frame = rowRect;
                        cell.backgroundColor = this.backgroundColor;
                        if (cell.superview == undefined) {
                            this.addSubview(cell);
                        }
                        cell.setSeparator(row === numberOfRows - 1, this.separatorColor, this.separatorInset);
                    }
                    else if (renderCount > 100) {
                        break;
                    }
                }
            }
        }
        if (this.tableFooterView) {
            this.tableFooterView.frame = { x: 0.0, y: tableHeight, width: boundsSize.width, height: this.tableFooterView.frame.height };
        }
    }
    _rectForSection(section) {
        this._updateSectionsCacheIfNeeded();
        return this._UIRectFromVerticalOffset(this._offsetForSection(section), this._sections[section].sectionHeight());
    }
    _rectForHeaderInSection(section) {
        this._updateSectionsCacheIfNeeded();
        return this._UIRectFromVerticalOffset(this._offsetForSection(section), this._sections[section].headerHeight);
    }
    _rectForFooterInSection(section) {
        this._updateSectionsCacheIfNeeded();
        const sectionRecord = this._sections[section];
        var offset = this._offsetForSection(section);
        offset += sectionRecord.headerHeight;
        offset += sectionRecord.rowsHeight;
        return this._UIRectFromVerticalOffset(offset, this._sections[section].footerHeight);
    }
    _rectForRowAtIndexPath(indexPath) {
        this._updateSectionsCacheIfNeeded();
        if (indexPath.section < this._sections.length) {
            const sectionRecord = this._sections[indexPath.section];
            if (indexPath.row < sectionRecord.numberOfRows) {
                var offset = this._offsetForSection(indexPath.section);
                offset += sectionRecord.headerHeight;
                offset += sectionRecord.rowOriginYs[indexPath.row];
                return this._UIRectFromVerticalOffset(offset, sectionRecord.rowHeights[indexPath.row]);
            }
        }
        return UIRect_1.UIRectZero;
    }
    _offsetForSection(section) {
        let offset = this.tableHeaderView ? this.tableHeaderView.frame.height : 0.0;
        for (let it = 0; it < section; it++) {
            offset += this._sections[it].sectionHeight();
        }
        return offset;
    }
    _cellForRow(indexPath) {
        return this._cachedCells[indexPath.mapKey()];
    }
    _UIRectFromVerticalOffset(offset, height) {
        return { x: 0.0, y: offset, width: this.bounds.width, height: height };
    }
    // Touches
    touchesBegan(touches) {
        super.touchesBegan(touches);
        const firstTouch = touches[0];
        if (firstTouch === undefined) {
            return;
        }
        this.handleTouch(UITouch_1.UITouchPhase.began, firstTouch);
    }
    touchesMoved(touches) {
        super.touchesMoved(touches);
        this.handleTouch(UITouch_1.UITouchPhase.moved, undefined);
    }
    touchesEnded(touches) {
        super.touchesEnded(touches);
        const firstTouch = touches[0];
        if (firstTouch === undefined) {
            return;
        }
        this.handleTouch(UITouch_1.UITouchPhase.ended, firstTouch);
    }
    touchesCancelled(touches) {
        super.touchesCancelled(touches);
        const firstTouch = touches[0];
        if (firstTouch === undefined) {
            return;
        }
        this.handleTouch(UITouch_1.UITouchPhase.cancelled, firstTouch);
    }
    handleTouch(phase, currentTouch) {
        if (!this.allowsSelection) {
            return;
        }
        switch (phase) {
            case UITouch_1.UITouchPhase.began: {
                if (!this.tracking) {
                    var hitTestView = currentTouch.view;
                    var cellShouldHighlighted = true;
                    while (hitTestView !== undefined) {
                        if (hitTestView instanceof UITableViewCell) {
                            break;
                        }
                        if (hitTestView.gestureRecognizers.length > 0) {
                            cellShouldHighlighted = false;
                        }
                        hitTestView = hitTestView.superview;
                    }
                    if (cellShouldHighlighted) {
                        this.firstTouchPoint = currentTouch.windowPoint;
                        if (hitTestView instanceof UITableViewCell) {
                            this.firstTouchCell = hitTestView;
                            setTimeout(() => {
                                if (!(hitTestView instanceof UITableViewCell) || this.firstTouchPoint === undefined) {
                                    return;
                                }
                                if (hitTestView.currentIndexPath) {
                                    this._highlightedRow = hitTestView.currentIndexPath.mapKey();
                                }
                                hitTestView.highlighted = true;
                                hitTestView.emit("highlighted", hitTestView, true, false);
                            }, 150);
                        }
                    }
                }
                break;
            }
            case UITouch_1.UITouchPhase.moved: {
                if (this.firstTouchPoint !== undefined) {
                    this._highlightedRow = undefined;
                    Object.keys(this._cachedCells).map(it => this._cachedCells[it]).forEach((it) => {
                        it.highlighted = false;
                        it.emit("highlighted", it, true, false);
                    });
                    this.firstTouchPoint = undefined;
                    this.firstTouchCell = undefined;
                }
                break;
            }
            case UITouch_1.UITouchPhase.ended: {
                setTimeout(() => {
                    if (this.firstTouchCell) {
                        const cell = this.firstTouchCell;
                        this._highlightedRow = undefined;
                        if (!this.allowsMultipleSelection) {
                            this._selectedRows.forEach((indexPathKey) => {
                                Object.keys(this._cachedCells).map(it => this._cachedCells[it]).forEach((it) => {
                                    if (it.currentIndexPath && it.currentIndexPath.mapKey() === indexPathKey) {
                                        it.selected = false;
                                        it.emit("selected", it, false, false);
                                        this.emit("didDeselectRow", it.currentIndexPath, it);
                                    }
                                });
                            });
                            this._selectedRows = [];
                        }
                        this.firstTouchPoint = undefined;
                        this.firstTouchCell = undefined;
                        this._highlightedRow = undefined;
                        Object.keys(this._cachedCells).map(it => this._cachedCells[it]).forEach((it) => {
                            it.highlighted = false;
                            it.emit("highlighted", it, false, false);
                        });
                        if (cell.currentIndexPath) {
                            const it = cell.currentIndexPath.mapKey();
                            const idx = this._selectedRows.indexOf(it);
                            if (idx >= 0) {
                                this._selectedRows.splice(idx, 1);
                            }
                            else {
                                this._selectedRows.push(it);
                            }
                        }
                        cell.selected = !cell.selected;
                        cell.emit("selected", cell, cell.selected, false);
                        if (cell.selected) {
                            if (cell.currentIndexPath) {
                                this.didSelectRow(cell.currentIndexPath);
                            }
                            this.emit("didSelectRow", cell.currentIndexPath, cell);
                        }
                        else {
                            if (cell.currentIndexPath) {
                                this.didDeselectRow(cell.currentIndexPath);
                            }
                            this.emit("didDeselectRow", cell.currentIndexPath, cell);
                        }
                    }
                    else {
                        this.firstTouchPoint = undefined;
                        this.firstTouchCell = undefined;
                        this._highlightedRow = undefined;
                        Object.keys(this._cachedCells).map(it => this._cachedCells[it]).forEach((it) => {
                            it.highlighted = false;
                            it.emit("highlighted", it, false, false);
                        });
                    }
                }, 50);
                break;
            }
            case UITouch_1.UITouchPhase.cancelled: {
                this.firstTouchPoint = undefined;
                this.firstTouchCell = undefined;
                this._highlightedRow = undefined;
                Object.keys(this._cachedCells).map(it => this._cachedCells[it]).forEach((it) => {
                    it.highlighted = false;
                    it.emit("highlighted", it, false, false);
                });
                break;
            }
        }
    }
}
exports.UITableView = UITableView;
class UITableViewSection {
    constructor() {
        this.rowsHeight = 0.0;
        this.headerHeight = 0.0;
        this.footerHeight = 0.0;
        this.numberOfRows = 0;
        this.rowHeights = [];
        this.rowOriginYs = [];
        this.headerView = undefined;
        this.footerView = undefined;
    }
    sectionHeight() {
        return this.headerHeight + this.rowsHeight + this.footerHeight;
    }
    setNumberOfRows(rows, rowHeights) {
        this.numberOfRows = rows;
        this.rowHeights = rowHeights;
        this.rowOriginYs = [];
        let currentY = 0.0;
        for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
            this.rowOriginYs.push(currentY);
            currentY += rowHeights[rowIndex];
        }
    }
}
class UITableViewCell extends UIView_1.UIView {
    constructor() {
        super();
        this.selectionView = new UIView_1.UIView();
        this.contentView = new UIView_1.UIView();
        this.reuseIdentifier = undefined;
        this.hasSelectionStyle = true;
        this._selected = false;
        this._highlighted = false;
        this.currentIndexPath = undefined;
        this.currentSectionRecord = undefined;
        this.restoringContentViewBackgroundColor = undefined;
        this.separatorStyle = undefined;
        this.selectionView.alpha = 0.0;
        this.selectionView.backgroundColor = new UIColor_1.UIColor(0xd0 / 255.0, 0xd0 / 255.0, 0xd0 / 255.0, 1.0);
        this.contentView.backgroundColor = UIColor_1.UIColor.white;
        this.addSubview(this.selectionView);
        this.addSubview(this.contentView);
        // this.domElement.appendChild(this.separatorElement)
    }
    get selected() {
        return this._selected;
    }
    set selected(value) {
        this._selected = value;
        this.onStateChanged();
    }
    get highlighted() {
        return this._highlighted;
    }
    set highlighted(value) {
        this._highlighted = value;
        this.onStateChanged();
    }
    onStateChanged() {
        if (this.hasSelectionStyle) {
            if (this.selected || this.highlighted) {
                if (this.restoringContentViewBackgroundColor == undefined) {
                    this.restoringContentViewBackgroundColor = this.contentView.backgroundColor;
                }
                this.selectionView.alpha = 1.0;
                this.contentView.backgroundColor = UIColor_1.UIColor.clear;
            }
            else {
                this.selectionView.alpha = 0.0;
                if (this.restoringContentViewBackgroundColor != undefined) {
                    this.contentView.backgroundColor = this.restoringContentViewBackgroundColor;
                    this.restoringContentViewBackgroundColor = undefined;
                }
            }
        }
    }
    setSeparator(hidden, color, insets) {
        if (hidden || color === undefined) {
            this.separatorStyle = undefined;
        }
        else {
            this.separatorStyle = `
            position: absolute;
            left: ${insets.left}px;
            right: ${insets.right}px;
            bottom: 0rpx;
            border-bottom-width: 1rpx;
            border-bottom-color: ${color.toStyle()};
            border-bottom-style: solid;
            `;
        }
        this.markFlagDirty("hasDecorView", "decorStyle");
    }
    buildData() {
        let data = super.buildData();
        data.hasDecorView = this.separatorStyle !== undefined;
        if (this.separatorStyle) {
            data.decorStyle = this.separatorStyle;
        }
        return data;
    }
    layoutSubviews() {
        super.layoutSubviews();
        this.selectionView.frame = this.bounds;
        this.contentView.frame = this.bounds;
    }
}
exports.UITableViewCell = UITableViewCell;


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const UIView_1 = __webpack_require__(1);
const UIColor_1 = __webpack_require__(5);
const UIEnums_1 = __webpack_require__(6);
const UIButton_1 = __webpack_require__(34);
const UIImage_1 = __webpack_require__(39);
const clearButtonImage = new UIImage_1.UIImage({ base64: "iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAC0UExURUxpcY+NlKqqqo+PlI+OlI6Nk4+OlI6Nk4+OlH9/f39//46NlI+PlY6NlY6Nk5+fn4+OlJGOlpCQlY6OlI+OlJGOlI2NkY+Nk4+Ok46Ok1VVVQAAAI+OlJGOlY6OlY+Pk4+Pk4+PlJCOlJCOlY+OlI+Nk46NlI+OlI+PlI6Olo6Ok4+Nk4+Nk46OlI+Nk4+OlJCPlZGQlpKRl5OSmJaVnJWUmpeWnJSSmZCOlJSTmZCOlZOSmb7cF6QAAAAvdFJOUwD+A2X9/Pv+/gIC6Cnz2AjHZmhdul0/cPu+AwHkRkaAcL1/aOXm9/Y+Zvu7/rqAXZkdXwAAAYZJREFUKM91U4d2wjAMVMCOnQBhBMIoe7R0Sk4gQPv//1U5Zpail5fk6eyTdD4D2AgA6uv5LKrVotl8XS8SpyhB0GnoPDNEJst1Iw44dYwAqu10i1IpRKUkbtN29bQ3gHFloyUjLpTUm8rYoSUYPe98jVfh+buXsWVmzsrO5/XCOyKCOfxdpWAO2xvGNGVYECvMiGn8zafl7aTaQ4/81bcRiMLgsMeo1mnM8zW2EhW9xaUpGSEMdcPYJ4Vy26hDoplJZEMmaSIRNrnFVSY4qROY5JIrIna5fjlNy/yZ7m1C5l/Qz2wfytAr12+1+NUkU6SyPkTFn22kDE/ATxltY3Z9BDVy4wlKWzAYQCsl4TJUuwYXd2BkPh7TnhviGWBx09DMjeLdjNItEjKfQ+IVIizDiwjh8CTCUb5eHHadfNNS3DvJZ4Vnnak3RCf8fnkUvsP1w/f/j6wdPDzsH3fY1iaHvzY5OJvYvaN7g40u9ntsTcsc3pi6E15M7a5DMunb69CfJOfr8AsJs0zEPPGMHwAAAABJRU5ErkJggg==", renderingMode: UIImage_1.UIImageRenderingMode.alwaysOriginal });
class UITextField extends UIView_1.UIView {
    constructor() {
        super();
        this.clazz = "UITextField";
        this._text = "";
        this._textColor = undefined;
        this._font = undefined;
        this._textAlignment = UIEnums_1.UITextAlignment.left;
        this._placeholder = undefined;
        this.clearsOnBeginEditing = false;
        this._editing = false;
        this._clearButtonMode = UIEnums_1.UITextFieldViewMode.never;
        this._leftView = undefined;
        this._leftViewMode = UIEnums_1.UITextFieldViewMode.never;
        this._rightView = undefined;
        this._rightViewMode = UIEnums_1.UITextFieldViewMode.never;
        this._keyboardType = UIEnums_1.UIKeyboardType.default;
        this._returnKeyType = UIEnums_1.UIReturnKeyType.default;
        this._secureTextEntry = false;
        this.clearButtonView = new UIButton_1.UIButton().on("touchUpInside", () => {
            if (this.val("shouldClear") !== false) {
                this.text = "";
            }
            this.focus();
        });
        this.leftPadding = 0;
        this.rightPadding = 0;
        this.clearButtonView.hidden = true;
        this.clearButtonView.setImage(clearButtonImage, UIEnums_1.UIControlState.normal);
        this.addSubview(this.clearButtonView);
    }
    get text() {
        return this._text;
    }
    set text(value) {
        this._text = value;
        this.markFlagDirty("text");
    }
    textDidChanged() {
        this.reloadExtraContents();
    }
    get textColor() {
        return this._textColor;
    }
    set textColor(value) {
        this._textColor = value;
        this.markFlagDirty("textStyle");
    }
    get font() {
        return this._font;
    }
    set font(value) {
        this._font = value;
        this.markFlagDirty("textStyle");
    }
    get textAlignment() {
        return this._textAlignment;
    }
    set textAlignment(value) {
        this._textAlignment = value;
        this.markFlagDirty("textStyle");
    }
    get placeholder() {
        return this._placeholder;
    }
    set placeholder(value) {
        this._placeholder = value;
        this.markFlagDirty("placeholder");
    }
    get editing() {
        return this._editing;
    }
    set editing(value) {
        if (value && this.val("shouldBeginEditing", this) === false) {
            this.blur();
            return;
        }
        else if (!value && this.val("shouldEndEditing", this) === false) {
            this.focus();
            return;
        }
        this._editing = value;
        if (this.clearsOnBeginEditing) {
            this.text = "";
        }
        this.reloadExtraContents();
        if (value) {
            this.emit("didBeginEditing", this);
        }
        else {
            this.emit("didEndEditing", this);
        }
    }
    get clearButtonMode() {
        return this._clearButtonMode;
    }
    set clearButtonMode(value) {
        this._clearButtonMode = value;
        this.reloadExtraContents();
    }
    get leftView() {
        return this._leftView;
    }
    set leftView(value) {
        if (this._leftView) {
            this._leftView.removeFromSuperview();
        }
        this._leftView = value;
        this.reloadExtraContents();
    }
    get leftViewMode() {
        return this._leftViewMode;
    }
    set leftViewMode(value) {
        this._leftViewMode = value;
        this.reloadExtraContents();
    }
    get rightView() {
        return this._rightView;
    }
    set rightView(value) {
        if (this._rightView) {
            this._rightView.removeFromSuperview();
        }
        this._rightView = value;
        this.reloadExtraContents();
    }
    get rightViewMode() {
        return this._rightViewMode;
    }
    set rightViewMode(value) {
        this._rightViewMode = value;
        this.reloadExtraContents();
    }
    // clearsOnInsertion: boolean = false
    focus() {
        if (this.val("shouldBeginEditing", this) === false) {
            return;
        }
        this.editing = true;
        this.markFlagDirty("requireFocus");
    }
    blur() {
        if (this.val("shouldEndEditing", this) === false) {
            return;
        }
        this.editing = false;
        this.markFlagDirty("requireFocus");
    }
    onReturn() {
        this.emit("shouldReturn", this);
    }
    get keyboardType() {
        return this._keyboardType;
    }
    set keyboardType(value) {
        this._keyboardType = value;
        this.markFlagDirty("keyboardType");
    }
    get returnKeyType() {
        return this._returnKeyType;
    }
    set returnKeyType(value) {
        this._returnKeyType = value;
        this.markFlagDirty("returnKeyType");
    }
    get secureTextEntry() {
        return this._secureTextEntry;
    }
    set secureTextEntry(value) {
        this._secureTextEntry = value;
        this.markFlagDirty("secureTextEntry");
    }
    layoutSubviews() {
        super.layoutSubviews();
        this.reloadExtraContents();
    }
    reloadExtraContents() {
        const displayClearButton = (() => {
            if (this.clearButtonMode == UIEnums_1.UITextFieldViewMode.always) {
                return true;
            }
            else if (!this.editing && this.clearButtonMode == UIEnums_1.UITextFieldViewMode.unlessEditing) {
                return true;
            }
            else if (this.editing && this.clearButtonMode == UIEnums_1.UITextFieldViewMode.whileEditing && this.text && this.text.length > 0) {
                return true;
            }
            return false;
        })();
        const displayRightView = (() => {
            if (displayClearButton) {
                return false;
            }
            if (this.rightView == null) {
                return false;
            }
            if (this.rightViewMode == UIEnums_1.UITextFieldViewMode.always) {
                return true;
            }
            else if (!this.editing && this.rightViewMode == UIEnums_1.UITextFieldViewMode.unlessEditing) {
                return true;
            }
            else if (this.editing && this.rightViewMode == UIEnums_1.UITextFieldViewMode.whileEditing) {
                return true;
            }
            return false;
        })();
        const displayLeftView = (() => {
            if (this.leftView == null) {
                return false;
            }
            if (this.leftViewMode == UIEnums_1.UITextFieldViewMode.always) {
                return true;
            }
            else if (!this.editing && this.leftViewMode == UIEnums_1.UITextFieldViewMode.unlessEditing) {
                return true;
            }
            else if (this.editing && this.leftViewMode == UIEnums_1.UITextFieldViewMode.whileEditing) {
                return true;
            }
            return false;
        })();
        this.clearButtonView.hidden = !displayClearButton;
        this.clearButtonView.frame = { x: this.bounds.width - 36.0, y: (this.bounds.height - 44.0) / 2.0, width: 36.0, height: 44.0 };
        if (displayLeftView) {
            if (this.leftView) {
                this.addSubview(this.leftView);
                this.leftView.frame = { x: 0.0, y: (this.bounds.height - this.leftView.frame.height) / 2.0, width: this.leftView.frame.width, height: this.leftView.frame.height };
            }
        }
        else {
            if (this.leftView) {
                this.leftView.removeFromSuperview();
            }
        }
        if (displayRightView) {
            if (this.rightView) {
                this.addSubview(this.rightView);
                this.rightView.frame = { x: this.bounds.width - this.rightView.frame.width, y: (this.bounds.height - this.rightView.frame.height) / 2.0, width: this.rightView.frame.width, height: this.rightView.frame.height };
            }
        }
        else {
            if (this.rightView) {
                this.rightView.removeFromSuperview();
            }
        }
        this.leftPadding = (displayLeftView && this.leftView !== undefined ? (this.leftView.frame.width + 1) : 0.0);
        this.rightPadding = (displayRightView && this.rightView ? (this.rightView.frame.width + 1) : 0.0) + (displayClearButton ? 36.0 : 0.0);
        this.markFlagDirty("leftPadding");
        this.markFlagDirty("rightPadding");
    }
    buildData() {
        let data = super.buildData();
        data.text = this.text;
        data.placeholder = this.placeholder;
        data.textStyle = `
        color: ${this._textColor !== undefined ? UIColor_1.UIColor.toStyle(this._textColor) : "black"};
        font-size: ${this._font !== undefined ? this._font.pointSize : 14}px;
        font-family: ${this._font !== undefined ? this._font.fontName : ""}; 
        font-weight: ${this._font !== undefined ? this._font.fontStyle : ""}; 
        font-style: ${this._font !== undefined ? this._font.fontStyle : ""}; 
        text-align: ${(() => {
            switch (this._textAlignment) {
                case UIEnums_1.UITextAlignment.left:
                    return "left";
                case UIEnums_1.UITextAlignment.center:
                    return "center";
                case UIEnums_1.UITextAlignment.right:
                    return "right";
            }
            return "left";
        })()};
        `;
        data.requireFocus = this.editing;
        data.secureTextEntry = this.secureTextEntry;
        data.keyboardType = (() => {
            switch (this.keyboardType) {
                case UIEnums_1.UIKeyboardType.numberPad:
                    return "number";
                case UIEnums_1.UIKeyboardType.decimalPad:
                    return "digit";
            }
            return "text";
        })();
        data.returnKeyType = (() => {
            switch (this.returnKeyType) {
                case UIEnums_1.UIReturnKeyType.default:
                    return "done";
                case UIEnums_1.UIReturnKeyType.done:
                    return "done";
                case UIEnums_1.UIReturnKeyType.go:
                    return "go";
                case UIEnums_1.UIReturnKeyType.next:
                    return "next";
                case UIEnums_1.UIReturnKeyType.send:
                    return "send";
            }
            return "done";
        });
        data.leftPadding = this.leftPadding;
        data.rightPadding = this.rightPadding;
        return data;
    }
}
exports.UITextField = UITextField;


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const UIView_1 = __webpack_require__(1);
const UIColor_1 = __webpack_require__(5);
const UIEnums_1 = __webpack_require__(6);
class UITextView extends UIView_1.UIView {
    constructor() {
        super(...arguments);
        this.clazz = "UITextField";
        this._text = "";
        this._textColor = undefined;
        this._font = undefined;
        this._textAlignment = UIEnums_1.UITextAlignment.left;
        this._editable = true;
        this._editing = false;
        this._keyboardType = UIEnums_1.UIKeyboardType.default;
        this._returnKeyType = UIEnums_1.UIReturnKeyType.default;
        this._secureTextEntry = false;
    }
    get text() {
        return this._text;
    }
    set text(value) {
        this._text = value;
        this.markFlagDirty("text");
    }
    textDidChanged() { }
    get textColor() {
        return this._textColor;
    }
    set textColor(value) {
        this._textColor = value;
        this.markFlagDirty("textStyle");
    }
    get font() {
        return this._font;
    }
    set font(value) {
        this._font = value;
        this.markFlagDirty("textStyle");
    }
    get textAlignment() {
        return this._textAlignment;
    }
    set textAlignment(value) {
        this._textAlignment = value;
        this.markFlagDirty("textStyle");
    }
    get editable() {
        return this._editable;
    }
    set editable(value) {
        this._editable = value;
    }
    get editing() {
        return this._editing;
    }
    set editing(value) {
        if (value && this.val("shouldBeginEditing", this) === false) {
            this.blur();
            return;
        }
        else if (!value && this.val("shouldEndEditing", this) === false) {
            this.focus();
            return;
        }
        this._editing = value;
        if (value) {
            this.emit("didBeginEditing", this);
        }
        else {
            this.emit("didEndEditing", this);
        }
    }
    focus() {
        if (this.val("shouldBeginEditing", this) === false) {
            return;
        }
        this.editing = true;
        this.markFlagDirty("requireFocus");
    }
    blur() {
        if (this.val("shouldEndEditing", this) === false) {
            return;
        }
        this.editing = false;
        this.markFlagDirty("requireFocus");
    }
    get keyboardType() {
        return this._keyboardType;
    }
    set keyboardType(value) {
        this._keyboardType = value;
        this.markFlagDirty("keyboardType");
    }
    get returnKeyType() {
        return this._returnKeyType;
    }
    set returnKeyType(value) {
        this._returnKeyType = value;
        this.markFlagDirty("returnKeyType");
    }
    get secureTextEntry() {
        return this._secureTextEntry;
    }
    set secureTextEntry(value) {
        this._secureTextEntry = value;
        this.markFlagDirty("secureTextEntry");
    }
    buildData() {
        let data = super.buildData();
        data.isTextView = true;
        data.text = this.text;
        data.textStyle = `
        color: ${this._textColor !== undefined ? UIColor_1.UIColor.toStyle(this._textColor) : "black"};
        font-size: ${this._font !== undefined ? this._font.pointSize : 14}px;
        font-family: ${this._font !== undefined ? this._font.fontName : ""}; 
        font-weight: ${this._font !== undefined ? this._font.fontStyle : ""}; 
        font-style: ${this._font !== undefined ? this._font.fontStyle : ""}; 
        text-align: ${(() => {
            switch (this._textAlignment) {
                case UIEnums_1.UITextAlignment.left:
                    return "left";
                case UIEnums_1.UITextAlignment.center:
                    return "center";
                case UIEnums_1.UITextAlignment.right:
                    return "right";
            }
            return "left";
        })()};
        `;
        data.requireFocus = this.editing;
        data.secureTextEntry = this.secureTextEntry;
        data.keyboardType = (() => {
            switch (this.keyboardType) {
                case UIEnums_1.UIKeyboardType.numberPad:
                    return "number";
                case UIEnums_1.UIKeyboardType.decimalPad:
                    return "digit";
            }
            return "text";
        })();
        data.returnKeyType = (() => {
            switch (this.returnKeyType) {
                case UIEnums_1.UIReturnKeyType.default:
                    return "done";
                case UIEnums_1.UIReturnKeyType.done:
                    return "done";
                case UIEnums_1.UIReturnKeyType.go:
                    return "go";
                case UIEnums_1.UIReturnKeyType.next:
                    return "next";
                case UIEnums_1.UIReturnKeyType.send:
                    return "send";
            }
            return "done";
        });
        return data;
    }
}
exports.UITextView = UITextView;


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const UIView_1 = __webpack_require__(1);
class UIWebView extends UIView_1.UIView {
    constructor() {
        super(...arguments);
        this.clazz = "UIWebView";
        this.title = undefined;
        this.URL = undefined;
        this.loading = false;
    }
    loadRequest(request) {
        this.URL = request.URL;
        this.markFlagDirty("src");
    }
    loadHTMLString(HTMLString, baseURL) {
        console.warn("小程序内不支持加载 HTMLString。");
    }
    goBack() {
        console.warn("暂不支持该方法");
    }
    goForward() {
        console.warn("暂不支持该方法");
    }
    reload() {
        console.warn("暂不支持该方法");
    }
    stopLoading() {
        console.warn("暂不支持该方法");
    }
    evaluateJavaScript(script, completed) {
        console.warn("暂不支持该方法");
    }
    buildData() {
        let data = super.buildData();
        if (this.URL) {
            data.src = this.URL.absoluteString;
        }
        return data;
    }
}
exports.UIWebView = UIWebView;


/***/ })
/******/ ]);