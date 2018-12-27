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
/******/ 	return __webpack_require__(__webpack_require__.s = 47);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var UUID_1 = __webpack_require__(3);

var UIViewManager = function () {
    function UIViewManager() {
        _classCallCheck(this, UIViewManager);

        this.views = {};
    }

    UIViewManager.prototype.addView = function addView(view) {
        view.viewID = UUID_1.randomUUID();
        this.views[view.viewID] = view;
    };

    UIViewManager.prototype.fetchView = function fetchView(viewID) {
        return this.views[viewID];
    };

    UIViewManager.prototype.fetchViews = function fetchViews() {
        var _this = this;

        return Object.keys(this.views).map(function (it) {
            return _this.views[it];
        });
    };

    _createClass(UIViewManager, null, [{
        key: "shared",
        get: function get() {
            if (getApp().UIViewManagerManagerShared === undefined) {
                getApp().UIViewManagerManagerShared = new UIViewManager();
            }
            return getApp().UIViewManagerManagerShared;
        }
    }]);

    return UIViewManager;
}();

exports.UIViewManager = UIViewManager;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var UIRect_1 = __webpack_require__(9);
var UIAffineTransform_1 = __webpack_require__(22);
var Matrix_1 = __webpack_require__(32);
var UIColor_1 = __webpack_require__(5);
var UITouch_1 = __webpack_require__(10);
var UIEdgeInsets_1 = __webpack_require__(8);
var UIAnimator_1 = __webpack_require__(7);
var UIViewManager_1 = __webpack_require__(0);
var EventEmitter_1 = __webpack_require__(12);
var UIEnums_1 = __webpack_require__(6);
var CALayer_1 = __webpack_require__(56);
var UIComponentManager_1 = __webpack_require__(2);
var Ticker_1 = __webpack_require__(21);

var UIView = function (_EventEmitter_1$Event) {
    _inherits(UIView, _EventEmitter_1$Event);

    function UIView() {
        _classCallCheck(this, UIView);

        var _this = _possibleConstructorReturn(this, _EventEmitter_1$Event.call(this));

        _this.clazz = "UIView";
        _this.viewID = undefined;
        _this._layer = undefined;
        _this._frame = UIRect_1.UIRectZero;
        _this.bounds = UIRect_1.UIRectZero;
        _this.touchAreaInsets = UIEdgeInsets_1.UIEdgeInsetsZero;
        _this._transform = UIAffineTransform_1.UIAffineTransformIdentity;
        // hierarchy
        _this.tag = 0;
        _this.superview = undefined;
        _this.subviews = [];
        _this._clipsToBounds = false;
        _this._hidden = false;
        _this._contentMode = UIEnums_1.UIViewContentMode.scaleToFill;
        _this._tintColor = undefined;
        _this._alpha = 1.0;
        _this._backgroundColor = undefined;
        _this._extraStyles = undefined;
        // GestureRecognizers
        _this._userInteractionEnabled = true;
        _this.gestureRecognizers = [];
        // Component Data Builder
        _this.dirtyFlags = {};
        _this.animationProps = {};
        _this.animationValues = {};
        UIViewManager_1.UIViewManager.shared.addView(_this);
        return _this;
    }

    UIView.prototype.attach = function attach(dataOwner, dataField) {
        if (!(this instanceof UIWindow)) {
            var window = new UIWindow();
            window.attach(dataOwner, dataField, this);
        }
    };

    UIView.prototype.removeFromSuperview = function removeFromSuperview() {
        var _this2 = this;

        if (this.superview !== undefined) {
            var superview = this.superview;
            superview.willRemoveSubview(this);
            this.willMoveToSuperview(undefined);
            superview.subviews = this.superview.subviews.filter(function (it) {
                return it !== _this2;
            });
            this.superview = undefined;
            superview.markFlagDirty("subviews");
            this.didMoveToSuperview();
            this.didRemovedFromWindow();
        }
    };

    UIView.prototype.didRemovedFromWindow = function didRemovedFromWindow() {
        this.subviews.forEach(function (it) {
            return it.didRemovedFromWindow();
        });
    };

    UIView.prototype.insertSubviewAtIndex = function insertSubviewAtIndex(view, index) {
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
    };

    UIView.prototype.exchangeSubview = function exchangeSubview(index1, index2) {
        var index2View = this.subviews[index2];
        this.subviews[index2] = this.subviews[index1];
        this.subviews[index1] = index2View;
        this.markFlagDirty("subviews");
    };

    UIView.prototype.addSubview = function addSubview(view) {
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
    };

    UIView.prototype.insertSubviewBelowSubview = function insertSubviewBelowSubview(view, belowSubview) {
        var index = this.subviews.indexOf(belowSubview);
        if (index >= 0) {
            this.insertSubviewAtIndex(view, index);
        }
    };

    UIView.prototype.insertSubviewAboveSubview = function insertSubviewAboveSubview(view, aboveSubview) {
        var index = this.subviews.indexOf(aboveSubview);
        if (index >= 0) {
            this.insertSubviewAtIndex(view, index + 1);
        }
    };

    UIView.prototype.bringSubviewToFront = function bringSubviewToFront(view) {
        var index = this.subviews.indexOf(view);
        if (index >= 0) {
            this.subviews.splice(index, 1);
            this.subviews.push(view);
            this.markFlagDirty("subviews");
        }
    };

    UIView.prototype.sendSubviewToBack = function sendSubviewToBack(view) {
        var index = this.subviews.indexOf(view);
        if (index >= 0) {
            this.subviews.splice(index, 1);
            this.subviews.unshift(view);
            this.markFlagDirty("subviews");
        }
    };

    UIView.prototype.isDescendantOfView = function isDescendantOfView(view) {
        var current = this;
        while (current != undefined) {
            if (current == view) {
                return true;
            }
            current = current.superview;
        }
        return false;
    };

    UIView.prototype.viewWithTag = function viewWithTag(tag) {
        for (var index = 0; index < this.subviews.length; index++) {
            var element = this.subviews[index];
            if (element.tag === tag) {
                return element;
            }
            var target = element.viewWithTag(tag);
            if (target !== undefined) {
                return target;
            }
        }
        return undefined;
    };
    // Delegates


    UIView.prototype.didAddSubview = function didAddSubview(subview) {
        if (this.viewDelegate) {
            this.viewDelegate.didAddSubview(subview);
        }
    };

    UIView.prototype.willRemoveSubview = function willRemoveSubview(subview) {};

    UIView.prototype.willMoveToSuperview = function willMoveToSuperview(newSuperview) {};

    UIView.prototype.didMoveToSuperview = function didMoveToSuperview() {
        this.tintColorDidChange();
    };

    UIView.prototype.willMoveToWindow = function willMoveToWindow(window) {
        this.subviews.forEach(function (it) {
            return it.willMoveToWindow(window);
        });
    };

    UIView.prototype.didMoveToWindow = function didMoveToWindow() {
        this.subviews.forEach(function (it) {
            return it.didMoveToWindow();
        });
    };

    UIView.prototype.setNeedsLayout = function setNeedsLayout() {
        var layoutSubviews = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        if (!layoutSubviews) {
            return;
        }
        this.layoutIfNeeded();
    };

    UIView.prototype.layoutIfNeeded = function layoutIfNeeded() {
        this.layoutSubviews();
    };

    UIView.prototype.layoutSubviews = function layoutSubviews() {
        if (this.viewDelegate) {
            this.viewDelegate.viewWillLayoutSubviews();
            this.viewDelegate.viewDidLayoutSubviews();
        }
    };
    // Rendering


    UIView.prototype.setNeedsDisplay = function setNeedsDisplay() {};

    UIView.prototype.tintColorDidChange = function tintColorDidChange() {
        this.subviews.forEach(function (it) {
            return it.tintColorDidChange();
        });
    };

    UIView.prototype.convertPointToView = function convertPointToView(point, toView) {
        var fromPoint = this.convertPointToWindow(point);
        if (!fromPoint) {
            return point;
        }
        if (toView instanceof UIWindow) {
            return fromPoint;
        }
        return toView.convertPointFromWindow(fromPoint) || point;
    };

    UIView.prototype.convertPointFromView = function convertPointFromView(point, fromView) {
        return fromView.convertPointToView(point, this);
    };

    UIView.prototype.convertRectToView = function convertRectToView(rect, toView) {
        var lt = this.convertPointToView({ x: rect.x, y: rect.y }, toView);
        var rt = this.convertPointToView({ x: rect.x + rect.width, y: rect.y }, toView);
        var lb = this.convertPointToView({ x: rect.x, y: rect.y + rect.height }, toView);
        var rb = this.convertPointToView({ x: rect.x + rect.width, y: rect.y + rect.height }, toView);
        return {
            x: Math.min(lt.x, rt.x, lb.x, rb.x),
            y: Math.min(lt.y, rt.y, lb.y, rb.y),
            width: Math.max(lt.x, rt.x, lb.x, rb.x) - Math.min(lt.x, rt.x, lb.x, rb.x),
            height: Math.max(lt.y, rt.y, lb.y, rb.y) - Math.min(lt.y, rt.y, lb.y, rb.y)
        };
    };

    UIView.prototype.convertRectFromView = function convertRectFromView(rect, fromView) {
        return fromView.convertRectToView(rect, this);
    };

    UIView.prototype.convertPointToWindow = function convertPointToWindow(point) {
        if (this.window === undefined) {
            return undefined;
        }
        var current = this;
        var currentPoint = { x: point.x, y: point.y };
        while (current !== undefined) {
            if (current instanceof UIWindow) {
                break;
            }
            if (!UIAffineTransform_1.UIAffineTransformIsIdentity(current.transform)) {
                var unmatrix = Matrix_1.Matrix.unmatrix(current.transform);
                var matrix2 = new Matrix_1.Matrix();
                matrix2.postTranslate(-(current.frame.width / 2.0), -(current.frame.height / 2.0));
                matrix2.postRotate(unmatrix.degree / (180.0 / Math.PI));
                matrix2.postScale(unmatrix.scale.x, unmatrix.scale.y);
                matrix2.postTranslate(unmatrix.translate.x, unmatrix.translate.y);
                matrix2.postTranslate(current.frame.width / 2.0, current.frame.height / 2.0);
                var x = currentPoint.x;
                var y = currentPoint.y;
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
    };

    UIView.prototype.convertPointFromWindow = function convertPointFromWindow(point) {
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
        var currentPoint = { x: point.x, y: point.y };
        routes.forEach(function (it) {
            if (it.superview !== undefined && it.superview.clazz === "UIScrollView") {
                currentPoint.x -= -it.superview.contentOffset.x + it.superview.adjustInset.left;
                currentPoint.y -= -it.superview.contentOffset.y + it.superview.adjustInset.top;
            }
            currentPoint.x -= it.frame.x;
            currentPoint.y -= it.frame.y;
            if (!UIAffineTransform_1.UIAffineTransformIsIdentity(it.transform)) {
                var unmatrix = Matrix_1.Matrix.unmatrix(it.transform);
                var matrix2 = new Matrix_1.Matrix();
                matrix2.postTranslate(-(it.frame.width / 2.0), -(it.frame.height / 2.0));
                matrix2.postRotate(unmatrix.degree / (180.0 / Math.PI));
                matrix2.postScale(unmatrix.scale.x, unmatrix.scale.y);
                matrix2.postTranslate(unmatrix.translate.x, unmatrix.translate.y);
                matrix2.postTranslate(it.frame.width / 2.0, it.frame.height / 2.0);
                var id = 1 / (matrix2.a * matrix2.d + matrix2.c * -matrix2.b);
                var x = currentPoint.x;
                var y = currentPoint.y;
                currentPoint.x = matrix2.d * id * x + -matrix2.c * id * y + (matrix2.ty * matrix2.c - matrix2.tx * matrix2.d) * id;
                currentPoint.y = matrix2.a * id * y + -matrix2.b * id * x + (-matrix2.ty * matrix2.a + matrix2.tx * matrix2.b) * id;
            }
        });
        return currentPoint;
    };

    UIView.prototype.nextResponder = function nextResponder() {
        return this.viewDelegate || this.superview || undefined;
    };

    UIView.prototype.addGestureRecognizer = function addGestureRecognizer(gestureRecognizer) {
        this.gestureRecognizers.push(gestureRecognizer);
    };

    UIView.prototype.removeGestureRecognizer = function removeGestureRecognizer(gestureRecognizer) {
        var index = this.gestureRecognizers.indexOf(gestureRecognizer);
        if (index >= 0) {
            this.gestureRecognizers.splice(index, 1);
        }
    };
    // Touches


    UIView.prototype.hitTest = function hitTest(point) {
        if (this.userInteractionEnabled && this.alpha > 0.0 && !this.hidden && this.pointInside(point)) {
            for (var index = this.subviews.length - 1; index >= 0; index--) {
                var it = this.subviews[index];
                var convertedPoint = it.convertPointFromView(point, this);
                var testedView = it.hitTest(convertedPoint);
                if (testedView !== undefined) {
                    return testedView;
                }
            }
            return this;
        }
        return undefined;
    };

    UIView.prototype.touchesBegan = function touchesBegan(touches) {
        this.gestureRecognizers.filter(function (it) {
            return it.enabled;
        }).forEach(function (it) {
            it.handleTouch(touches);
        });
        if (this.superview) {
            this.superview.touchesBegan(touches);
        }
    };

    UIView.prototype.touchesMoved = function touchesMoved(touches) {
        this.gestureRecognizers.filter(function (it) {
            return it.enabled;
        }).forEach(function (it) {
            it.handleTouch(touches);
        });
        if (this.superview) {
            this.superview.touchesMoved(touches);
        }
    };

    UIView.prototype.touchesEnded = function touchesEnded(touches) {
        this.gestureRecognizers.filter(function (it) {
            return it.enabled;
        }).forEach(function (it) {
            it.handleTouch(touches);
        });
        if (this.superview) {
            this.superview.touchesEnded(touches);
        }
    };

    UIView.prototype.touchesCancelled = function touchesCancelled(touches) {
        this.gestureRecognizers.filter(function (it) {
            return it.enabled;
        }).forEach(function (it) {
            it.handleTouch(touches);
        });
        if (this.superview) {
            this.superview.touchesCancelled(touches);
        }
    };

    UIView.prototype.touchesWheel = function touchesWheel(delta) {
        if (this.superview) {
            this.superview.touchesWheel(delta);
        }
    };

    UIView.prototype.intrinsicContentSize = function intrinsicContentSize() {
        return undefined;
    };

    UIView.prototype.pointInside = function pointInside(point) {
        return point.x >= 0.0 - this.touchAreaInsets.left && point.y >= 0.0 - this.touchAreaInsets.top && point.x <= this.frame.width + this.touchAreaInsets.right && point.y <= this.frame.height + this.touchAreaInsets.bottom;
    };

    UIView.prototype.markFlagDirty = function markFlagDirty() {
        var _this3 = this;

        var viewID = this.viewID;
        if (viewID && UIComponentManager_1.UIComponentManager.shared.fetchComponent(viewID) === undefined) {
            return;
        }

        for (var _len = arguments.length, flags = Array(_len), _key = 0; _key < _len; _key++) {
            flags[_key] = arguments[_key];
        }

        flags.forEach(function (it) {
            _this3.dirtyFlags[it] = true;
        });
        this.invalidate();
    };

    UIView.prototype.flushStyle = function flushStyle() {
        if (this.dirtyFlags["style"] || this.dirtyFlags["frameStyle"]) {
            if (this.viewID) {
                var component = UIComponentManager_1.UIComponentManager.shared.fetchComponent(this.viewID);
                if (component) {
                    component.setData({
                        style: this.buildStyle(),
                        frameStyle: "left: " + this._frame.x + "px; top:" + this._frame.y + ";width: " + this._frame.width + "px;height: " + this._frame.height + "px;",
                        animation: exports.emptyAnimation
                    });
                    delete this.dirtyFlags["style"];
                    delete this.dirtyFlags["frameStyle"];
                }
            }
        }
    };

    UIView.prototype.invalidate = function invalidate() {
        var _this4 = this;

        var viewID = this.viewID;
        if (viewID) {
            if (Ticker_1.Ticker.shared.hasTask("setData." + this.clazz + "." + this.viewID)) {
                return;
            }
            Ticker_1.Ticker.shared.addTask("setData." + this.clazz + "." + this.viewID, function () {
                var component = UIComponentManager_1.UIComponentManager.shared.fetchComponent(viewID);
                if (component) {
                    var data = _this4.buildData();
                    var newData = {};
                    for (var flag in _this4.dirtyFlags) {
                        if (data[flag] !== undefined) {
                            newData[flag] = data[flag];
                        }
                    }
                    if (!_this4.dirtyFlags["animation"] && component.data.animation !== exports.emptyAnimation) {
                        newData.animation = exports.emptyAnimation;
                    }
                    component.setData(newData);
                    _this4.dirtyFlags = {};
                }
            });
        }
    };

    UIView.prototype.setDataForce = function setDataForce(data) {
        var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

        if (this.viewID) {
            var component = UIComponentManager_1.UIComponentManager.shared.fetchComponent(this.viewID);
            if (component) {
                component.setData(data, callback);
            } else {
                callback && callback();
            }
        } else {
            callback && callback();
        }
    };

    UIView.prototype.buildData = function buildData() {
        return {
            viewID: this.viewID,
            style: this.buildStyle(),
            frameStyle: "left:" + this._frame.x + "px;top:" + this._frame.y + "px;width: " + this._frame.width + "px;height: " + this._frame.height + "px;",
            subviews: this.subviews.map(function (it) {
                return {
                    clazz: it.clazz,
                    viewID: it.viewID
                };
            }),
            animation: this.buildAnimation()
        };
    };

    UIView.prototype.buildStyle = function buildStyle() {
        var styles = "\n            position: absolute;\n        ";
        if (this.backgroundColor !== undefined) {
            styles += "background-color: " + UIColor_1.UIColor.toStyle(this.backgroundColor) + ";";
        }
        if (this.alpha < 1.0) {
            styles += "opacity: " + this.alpha + ";";
        }
        if (this.hidden) {
            styles += "display: none;";
        }
        if (this.clipsToBounds) {
            styles += "overflow: hidden;";
        }
        if (!UIAffineTransform_1.UIAffineTransformIsIdentity(this.transform)) {
            styles += "transform: " + ('matrix(' + this.transform.a + ', ' + this.transform.b + ', ' + this.transform.c + ', ' + this.transform.d + ', ' + this.transform.tx + ', ' + this.transform.ty + ')') + ";";
        }
        if (this._layer) {
            if (this._layer._cornerRadius > 0) {
                styles += "border-radius: " + this._layer._cornerRadius + "px;";
            }
            if (this._layer.shadowOpacity > 0 && this._layer.shadowColor && this._layer.shadowColor.a > 0) {
                styles += "\n                box-shadow: " + (this._layer.shadowOffset.width.toString() + "px " + this._layer.shadowOffset.height.toString() + "px " + this._layer.shadowRadius.toString() + "px " + this._layer.shadowColor.colorWithAlphaComponent(this._layer.shadowOpacity).toStyle()) + ";\n                ";
            }
            if (this._layer.borderWidth > 0 && this._layer.borderColor) {
                styles += "\n                border-width: " + this._layer.borderWidth.toString() + "px;\n                border-color: " + this._layer.borderColor.toStyle() + ";\n                border-style: solid;\n                box-sizing: border-box;\n                ";
            }
        }
        if (this.extraStyles) {
            styles += this.extraStyles;
        }
        return styles;
    };

    UIView.prototype.buildAnimation = function buildAnimation() {
        if (Object.keys(this.animationValues).length > 0) {
            var animation = wx.createAnimation(this.animationProps);
            for (var animationKey in this.animationValues) {
                var endValue = this.animationValues[animationKey];
                if (animationKey === "alpha") {
                    animation.opacity(endValue);
                } else if (animationKey === "frame.x") {
                    animation.left(endValue);
                } else if (animationKey === "frame.y") {
                    animation.top(endValue);
                } else if (animationKey === "frame.width") {
                    animation.width(endValue);
                } else if (animationKey === "frame.height") {
                    animation.height(endValue);
                } else if (animationKey === "backgroundColor") {
                    if (this._backgroundColor) {
                        animation.backgroundColor(UIColor_1.UIColor.toStyle(this._backgroundColor));
                    } else {
                        animation.backgroundColor('transparent');
                    }
                } else if (animationKey === "transform") {
                    animation.matrix(endValue.a, endValue.b, endValue.c, endValue.d, endValue.tx, endValue.ty);
                }
            }
            if (!UIAffineTransform_1.UIAffineTransformIsIdentity(this._transform)) {
                animation.matrix(this._transform.a, this._transform.b, this._transform.c, this._transform.d, this._transform.tx, this._transform.ty);
            }
            animation.step();
            return animation.export();
        } else {
            return exports.emptyAnimation;
        }
    };

    _createClass(UIView, [{
        key: "layer",
        get: function get() {
            if (this._layer === undefined) {
                this._layer = new CALayer_1.CALayer();
                this._layer.view = this;
            }
            return this._layer;
        }
    }, {
        key: "frame",
        set: function set(value) {
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
            var boundsChanged = this._frame.width != value.width || this._frame.height != value.height;
            this._frame = value;
            if (boundsChanged) {
                this.bounds = { x: 0, y: 0, width: value.width, height: value.height };
                this.setNeedsLayout(true);
            }
            this.markFlagDirty("frameStyle");
        },
        get: function get() {
            return this._frame;
        }
    }, {
        key: "center",
        get: function get() {
            return { x: this.frame.x + this.frame.width / 2.0, y: this.frame.y + this.frame.height / 2.0 };
        },
        set: function set(value) {
            this.frame = { x: value.x - this.frame.width / 2.0, y: value.y - this.frame.height / 2.0, width: this.frame.width, height: this.frame.height };
        }
    }, {
        key: "transform",
        get: function get() {
            return this._transform;
        },
        set: function set(value) {
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
    }, {
        key: "window",
        get: function get() {
            if (this instanceof UIWindow) {
                return this;
            } else if (this.superview) {
                return this.superview.window;
            }
            return undefined;
        }
    }, {
        key: "viewController",
        get: function get() {
            if (this.viewDelegate !== undefined) {
                return this.viewDelegate;
            } else if (this.superview) {
                return this.superview.viewController;
            }
            return undefined;
        }
    }, {
        key: "clipsToBounds",
        get: function get() {
            return this._clipsToBounds;
        },
        set: function set(value) {
            if (this._clipsToBounds === value) {
                return;
            }
            this._clipsToBounds = value;
            this.markFlagDirty("style");
        }
    }, {
        key: "hidden",
        set: function set(value) {
            if (this._hidden === value) {
                return;
            }
            this._hidden = value;
            this.markFlagDirty("style");
        },
        get: function get() {
            return this._hidden;
        }
    }, {
        key: "contentMode",
        get: function get() {
            return this._contentMode;
        },
        set: function set(value) {
            if (this._contentMode === value) {
                return;
            }
            this._contentMode = value;
        }
    }, {
        key: "tintColor",
        set: function set(value) {
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
        },
        get: function get() {
            return this._tintColor || this.superview && this.superview.tintColor || new UIColor_1.UIColor(0.0, 122.0 / 255.0, 1.0, 1.0);
        }
    }, {
        key: "alpha",
        set: function set(value) {
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
        },
        get: function get() {
            return this._alpha;
        }
    }, {
        key: "backgroundColor",
        set: function set(value) {
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
        },
        get: function get() {
            return this._backgroundColor;
        }
    }, {
        key: "extraStyles",
        get: function get() {
            return this._extraStyles;
        },
        set: function set(value) {
            if (this._extraStyles === value) {
                return;
            }
            this._extraStyles = value;
            this.markFlagDirty("style");
        }
    }, {
        key: "userInteractionEnabled",
        get: function get() {
            return this._userInteractionEnabled;
        },
        set: function set(value) {
            if (this._userInteractionEnabled === value) {
                return;
            }
            this._userInteractionEnabled = value;
        }
    }], [{
        key: "recognizedGesture",
        get: function get() {
            return this._recognizedGesture;
        },
        set: function set(value) {
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
    }]);

    return UIView;
}(EventEmitter_1.EventEmitter);

exports.UIView = UIView;

var UIWindow = function (_UIView) {
    _inherits(UIWindow, _UIView);

    function UIWindow() {
        _classCallCheck(this, UIWindow);

        var _this5 = _possibleConstructorReturn(this, _UIView.apply(this, arguments));

        _this5.clazz = "UIWindow";
        // touches
        _this5.currentTouchesID = [];
        _this5.touches = {};
        _this5.upCount = new Map();
        _this5.upTimestamp = new Map();
        return _this5;
    }

    UIWindow.prototype.attach = function attach(dataOwner, dataField) {
        var _dataOwner$setData;

        var rootView = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

        if (rootView) {
            this.rootView = rootView;
            this.addSubview(rootView);
            this.layoutSubviews();
        }
        dataOwner.setData((_dataOwner$setData = {}, _dataOwner$setData[dataField] = {
            clazz: this.clazz,
            viewID: this.viewID
        }, _dataOwner$setData));
        this.markFlagDirty("style");
        this.markFlagDirty("subviews");
    };

    UIWindow.prototype.layoutSubviews = function layoutSubviews() {
        _UIView.prototype.layoutSubviews.call(this);
        if (this.rootView) {
            this.rootView.frame = this.bounds;
        }
    };

    UIWindow.prototype.handleTouchStart = function handleTouchStart(e) {
        var _this6 = this;

        var changedTouches = this.standardlizeTouches(e);

        var _loop = function _loop(index) {
            var pointer = changedTouches[index];
            var pointerIdentifier = _this6.standardlizeTouchIdentifier(pointer);
            _this6.currentTouchesID.push(pointerIdentifier);
            var point = { x: pointer.pageX, y: pointer.pageY };
            var target = _this6.hitTest(point);
            if (target) {
                var touch = new UITouch_1.UITouch();
                _this6.touches[pointerIdentifier] = touch;
                touch.identifier = pointerIdentifier;
                touch.phase = UITouch_1.UITouchPhase.began;
                touch.tapCount = function () {
                    for (var _iterator = _this6.upCount, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
                        var _ref2;

                        if (_isArray) {
                            if (_i >= _iterator.length) break;
                            _ref2 = _iterator[_i++];
                        } else {
                            _i = _iterator.next();
                            if (_i.done) break;
                            _ref2 = _i.value;
                        }

                        var _ref = _ref2;
                        var key = _ref[0];
                        var value = _ref[1];

                        var timestamp = _this6.upTimestamp.get(key) || 0.0;
                        if (e.timeStamp / 1000 - timestamp < 1.0 && Math.abs(key.x - point.x) < 44.0 && Math.abs(key.y - point.y) < 44.0) {
                            return value + 1;
                        }
                    }
                    return 1;
                }();
                touch.timestamp = e.timeStamp / 1000;
                touch.window = _this6;
                touch.windowPoint = point;
                touch.view = target;
                if (touch.identifier == 0) {
                    exports.sharedVelocityTracker.addMovement(touch);
                }
                touch.view.touchesBegan([touch]);
            }
        };

        for (var index = 0; index < changedTouches.length; index++) {
            _loop(index);
        }
    };

    UIWindow.prototype.handleTouchMove = function handleTouchMove(e) {
        var changedTouches = this.standardlizeTouches(e);
        for (var index = 0; index < changedTouches.length; index++) {
            var pointer = changedTouches[index];
            var _pointerIdentifier = this.standardlizeTouchIdentifier(pointer);
            var _point = { x: pointer.pageX, y: pointer.pageY };
            var touch = this.touches[_pointerIdentifier];
            if (touch === undefined) {
                return false;
            }
            touch.phase = UITouch_1.UITouchPhase.moved;
            touch.timestamp = e.timeStamp / 1000;
            touch.windowPoint = _point;
            if (touch.identifier == 0) {
                exports.sharedVelocityTracker.addMovement(touch);
            }
            if (touch.view) {
                touch.view.touchesMoved([touch]);
            }
        }
    };

    UIWindow.prototype.handleTouchEnd = function handleTouchEnd(e) {
        var changedTouches = this.standardlizeTouches(e);
        for (var index = 0; index < changedTouches.length; index++) {
            var pointer = changedTouches[index];
            var _pointerIdentifier2 = this.standardlizeTouchIdentifier(pointer);
            var _point2 = { x: pointer.pageX, y: pointer.pageY };
            var touch = this.touches[_pointerIdentifier2];
            if (touch !== undefined) {
                touch.phase = UITouch_1.UITouchPhase.ended;
                touch.timestamp = e.timeStamp / 1000;
                touch.windowPoint = _point2;
                if (touch.identifier == 0) {
                    exports.sharedVelocityTracker.addMovement(touch);
                }
                if (touch.view) {
                    touch.view.touchesEnded([touch]);
                }
            }
            var idx = this.currentTouchesID.indexOf(_pointerIdentifier2);
            if (idx >= 0) {
                this.currentTouchesID.splice(idx, 1);
            }
        }
        if (this.currentTouchesID.length == 0) {
            this.upCount.clear();
            this.upTimestamp.clear();
            for (var key in this.touches) {
                if (this.touches.hasOwnProperty(key)) {
                    var it = this.touches[key];
                    if (it.windowPoint) {
                        this.upCount.set(it.windowPoint, it.tapCount);
                        this.upTimestamp.set(it.windowPoint, it.timestamp);
                    }
                }
            }
            this.touches = {};
            exports.sharedVelocityTracker.reset();
            setTimeout(function () {
                UIView.recognizedGesture = undefined;
            }, 0);
        }
    };

    UIWindow.prototype.handleTouchCancel = function handleTouchCancel(e) {
        var changedTouches = this.standardlizeTouches(e);
        for (var index = 0; index < changedTouches.length; index++) {
            var pointer = changedTouches[index];
            var _pointerIdentifier3 = this.standardlizeTouchIdentifier(pointer);
            var _point3 = { x: pointer.pageX, y: pointer.pageY };
            var touch = this.touches[_pointerIdentifier3];
            if (touch) {
                touch.phase = UITouch_1.UITouchPhase.cancelled;
                touch.timestamp = e.timeStamp;
                touch.windowPoint = _point3;
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
    };

    UIWindow.prototype.standardlizeTouches = function standardlizeTouches(e) {
        if (e.changedTouches) {
            return new Array(e.changedTouches.length).fill(0).map(function (_, i) {
                return e.changedTouches[i];
            }).map(function (it) {
                if (it.identifier < -100 || it.identifier > 100) {
                    it.identifier_2 = function () {
                        for (var index = 0; index < e.touches.length; index++) {
                            if (e.touches[index].identifier === it.identifier) {
                                return index;
                            }
                        }
                        return 0;
                    }();
                    return it;
                } else {
                    return it;
                }
            });
        } else {
            return [];
        }
    };

    UIWindow.prototype.standardlizeTouchIdentifier = function standardlizeTouchIdentifier(touch) {
        return typeof touch.identifier_2 === "number" ? touch.identifier_2 : touch.identifier;
    };
    // Component Data Builder


    UIWindow.prototype.buildStyle = function buildStyle() {
        var style = _UIView.prototype.buildStyle.call(this);
        style += "\n        width: 100%;\n        height: 100%;\n        ";
        return style;
    };

    _createClass(UIWindow, [{
        key: "frame",
        set: function set(_) {},
        get: function get() {
            var systemInfo = wx.getSystemInfoSync();
            return {
                x: 0,
                y: 0,
                width: parseInt(systemInfo.windowWidth),
                height: parseInt(systemInfo.windowHeight)
            };
        }
    }, {
        key: "bounds",
        set: function set(_) {},
        get: function get() {
            var systemInfo = wx.getSystemInfoSync();
            return {
                x: 0,
                y: 0,
                width: parseInt(systemInfo.windowWidth),
                height: parseInt(systemInfo.windowHeight)
            };
        }
    }]);

    return UIWindow;
}(UIView);

exports.UIWindow = UIWindow;
exports.sharedVelocityTracker = new UITouch_1.VelocityTracker();
exports.emptyAnimation = function () {
    var animation = wx.createAnimation({ duration: 0 });
    animation.step();
    return animation.export();
}();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });

var UIComponentManager = function () {
    function UIComponentManager() {
        _classCallCheck(this, UIComponentManager);

        this.components = {};
    }

    UIComponentManager.prototype.addComponent = function addComponent(component, viewID) {
        this.components[viewID] = component;
    };

    UIComponentManager.prototype.fetchComponent = function fetchComponent(viewID) {
        return this.components[viewID];
    };

    UIComponentManager.prototype.deleteComponent = function deleteComponent(viewID) {
        delete this.components[viewID];
    };

    _createClass(UIComponentManager, null, [{
        key: "keyWindowComponent",
        get: function get() {
            return getApp().UIComponentManagerKeyWindowComponent;
        },
        set: function set(value) {
            getApp().UIComponentManagerKeyWindowComponent = value;
        }
    }, {
        key: "shared",
        get: function get() {
            if (getApp().UIComponentManagerShared === undefined) {
                getApp().UIComponentManagerShared = new UIComponentManager();
            }
            return getApp().UIComponentManagerShared;
        }
    }]);

    return UIComponentManager;
}();

exports.UIComponentManager = UIComponentManager;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
exports.randomUUID = function () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : r & 0x3 | 0x8;
        return v.toString(16);
    });
};

/***/ }),
/* 4 */,
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });

var UIColor = function () {
    function UIColor(r, g, b, a) {
        _classCallCheck(this, UIColor);

        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }

    UIColor.hexColor = function hexColor(hexValue) {
        var trimedValue = hexValue.replace('#', '');
        if (trimedValue.length === 6) {
            return new UIColor(parseInt(trimedValue.substr(0, 2), 16) / 255.0, parseInt(trimedValue.substr(2, 2), 16) / 255.0, parseInt(trimedValue.substr(4, 2), 16) / 255.0, 1.0);
        } else if (trimedValue.length === 8) {
            return new UIColor(parseInt(trimedValue.substr(2, 2), 16) / 255.0, parseInt(trimedValue.substr(4, 2), 16) / 255.0, parseInt(trimedValue.substr(6, 2), 16) / 255.0, parseInt(trimedValue.substr(0, 2), 16) / 255.0);
        } else {
            return UIColor.clear;
        }
    };

    UIColor.prototype.colorWithAlphaComponent = function colorWithAlphaComponent(value) {
        return new UIColor(this.r, this.g, this.b, this.a * value);
    };

    UIColor.prototype.toStyle = function toStyle() {
        return 'rgba(' + (this.r * 255).toFixed(0) + ', ' + (this.g * 255).toFixed(0) + ', ' + (this.b * 255).toFixed(0) + ', ' + this.a.toFixed(6) + ')';
    };

    UIColor.prototype.toHEXStyle = function toHEXStyle() {
        var r = Math.round(this.r * 255).toString(16);
        if (r.length < 2) {
            r = '0' + r;
        }
        var g = Math.round(this.g * 255).toString(16);
        if (g.length < 2) {
            g = '0' + g;
        }
        var b = Math.round(this.b * 255).toString(16);
        if (b.length < 2) {
            b = '0' + b;
        }
        return "#" + r + g + b;
    };

    UIColor.toStyle = function toStyle(color) {
        return 'rgba(' + (color.r * 255).toFixed(0) + ', ' + (color.g * 255).toFixed(0) + ', ' + (color.b * 255).toFixed(0) + ', ' + color.a.toFixed(6) + ')';
    };

    return UIColor;
}();

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


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });

var UIAnimator = function () {
    function UIAnimator() {
        _classCallCheck(this, UIAnimator);

        this.animationProps = {};
    }

    UIAnimator.prototype.linear = function linear(duration, isCurve, animations, completion) {
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
            setTimeout(function () {
                if (UIAnimator.nextCompletion !== completion) {
                    return;
                }
                completion();
                UIAnimator.nextCompletion = undefined;
            }, duration * 1000);
        }
    };

    UIAnimator.linear = function linear(duration, animations, completion) {
        UIAnimator.shared.linear(duration, false, animations, completion);
    };

    UIAnimator.curve = function curve(duration, animations, completion) {
        UIAnimator.shared.linear(duration, true, animations, completion);
    };

    UIAnimator.spring = function spring(tension, friction, animations, completion) {
        // not support spring animation for wx
        UIAnimator.shared.linear(0.3, false, animations, completion);
    };

    UIAnimator.bouncy = function bouncy(bounciness, speed, animations, completion) {
        // not support bouncy animation for wx
        UIAnimator.shared.linear(0.3, false, animations, completion);
    };

    return UIAnimator;
}();

UIAnimator.shared = new UIAnimator();
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
    return { top: top, left: left, bottom: bottom, right: right };
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
    return Math.abs(rect1.top - rect2.top) < 0.001 && Math.abs(rect1.left - rect2.left) < 0.001 && Math.abs(rect1.bottom - rect2.bottom) < 0.001 && Math.abs(rect1.right - rect2.right) < 0.001;
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
exports.UIRectZero = { x: 0, y: 0, width: 0, height: 0 };
exports.UIRectMake = function (x, y, width, height) {
    return { x: x, y: y, width: width, height: height };
};
exports.UIRectEqualToRect = function (a, b) {
    return Math.abs(a.x - b.x) < 0.001 && Math.abs(a.y - b.y) < 0.001 && Math.abs(a.width - b.width) < 0.001 && Math.abs(a.height - b.height) < 0.001;
};
exports.UIRectInset = function (rect, dx, dy) {
    return {
        x: rect.x + dx,
        y: rect.y + dy,
        width: rect.width - 2 * dx,
        height: rect.height - 2 * dy
    };
};
exports.UIRectOffset = function (rect, dx, dy) {
    return {
        x: rect.x + dx,
        y: rect.y + dy,
        width: rect.width,
        height: rect.height
    };
};
exports.UIRectContainsPoint = function (rect, point) {
    return point.x >= rect.x && point.x <= rect.x + rect.width && point.y >= rect.y && point.y <= rect.x + rect.height;
};
exports.UIRectContainsRect = function (rect1, rect2) {
    return exports.UIRectContainsPoint(rect1, { x: rect2.x, y: rect2.y }) && exports.UIRectContainsPoint(rect1, { x: rect2.x + rect2.width, y: rect2.y }) && exports.UIRectContainsPoint(rect1, { x: rect2.x, y: rect2.y + rect2.height }) && exports.UIRectContainsPoint(rect1, { x: rect2.x + rect2.width, y: rect2.y + rect2.height });
};
exports.UIRectIntersectsRect = function (a, b) {
    if (a.x + a.width - 0.1 <= b.x || b.x + b.width - 0.1 <= a.x || a.y + a.height - 0.1 <= b.y || b.y + b.height - 0.1 <= a.y) {
        return false;
    }
    return true;
};
exports.UIRectUnion = function (r1, r2) {
    var x = Math.min(r1.x, r2.x);
    var y = Math.min(r1.y, r2.y);
    var width = Math.max(r1.x + r1.width, r2.x + r2.width);
    var height = Math.max(r1.y + r1.height, r2.y + r2.height);
    return { x: x, y: y, width: width, height: height };
};
exports.UIRectIsEmpty = function (rect) {
    return rect.width == 0.0 || rect.height == 0.0;
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var UIPoint_1 = __webpack_require__(11);
var UITouchPhase;
(function (UITouchPhase) {
    UITouchPhase[UITouchPhase["began"] = 0] = "began";
    UITouchPhase[UITouchPhase["moved"] = 1] = "moved";
    UITouchPhase[UITouchPhase["stationary"] = 2] = "stationary";
    UITouchPhase[UITouchPhase["ended"] = 3] = "ended";
    UITouchPhase[UITouchPhase["cancelled"] = 4] = "cancelled";
})(UITouchPhase = exports.UITouchPhase || (exports.UITouchPhase = {}));

var UITouch = function () {
    function UITouch() {
        _classCallCheck(this, UITouch);

        this.identifier = 0;
        this.timestamp = 0.0;
        this.phase = UITouchPhase.cancelled;
        this.tapCount = 0;
        this.window = undefined;
        this.windowPoint = undefined;
        this.view = undefined;
        this.gestureRecognizers = [];
    }

    UITouch.prototype.locationInView = function locationInView(view) {
        var aView = view || this.view;
        if (aView === undefined) {
            return UIPoint_1.UIPointZero;
        }
        var windowPoint = this.windowPoint || UIPoint_1.UIPointZero;
        return aView.convertPointFromWindow(windowPoint) || UIPoint_1.UIPointZero;
    };

    UITouch.prototype.previousLocationInView = function previousLocationInView(view) {
        return UIPoint_1.UIPointZero;
    };

    return UITouch;
}();

exports.UITouch = UITouch;

var VelocityTracker = function () {
    function VelocityTracker() {
        _classCallCheck(this, VelocityTracker);

        this.movements = [];
        this.velocity = { x: 0, y: 0 };
    }

    VelocityTracker.prototype.reset = function reset() {
        this.movements = [];
        this.velocity = { x: 0, y: 0 };
    };

    VelocityTracker.prototype.addMovement = function addMovement(touch) {
        this.movements.push(Object.assign({}, touch));
    };

    VelocityTracker.prototype.computeCurrentVelocity = function computeCurrentVelocity() {
        for (var index = this.movements.length - 1; index >= 1; index--) {
            var current = this.movements[index];
            var last = this.movements[index - 1];
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
            var timeDiff = current.timestamp - last.timestamp;
            if (timeDiff > 0.002) {
                this.velocity = {
                    x: (current.windowPoint.x - last.windowPoint.x) / timeDiff,
                    y: (current.windowPoint.y - last.windowPoint.y) / timeDiff
                };
                break;
            }
        }
    };

    return VelocityTracker;
}();

exports.VelocityTracker = VelocityTracker;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
exports.UIPointZero = { x: 0, y: 0 };
exports.UIPointMake = function (x, y) {
    return { x: x, y: y };
};
exports.UIPointEqualToPoint = function (point1, point2) {
    return Math.abs(point1.x - point2.x) < 0.001 && Math.abs(point1.y - point2.y) < 0.001;
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var EventEmitterIMP = __webpack_require__(55);
exports.EventEmitter = EventEmitterIMP.EventEmitter;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
exports.UISizeZero = { width: 0, height: 0 };
exports.UISizeMake = function (width, height) {
    return { width: width, height: height };
};
exports.UISizeEqualToSize = function (a, b) {
    return Math.abs(a.width - b.width) < 0.001 && Math.abs(a.height - b.height) < 0.001;
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var UIPoint_1 = __webpack_require__(11);
var EventEmitter_1 = __webpack_require__(12);
var UIGestureRecognizerState;
(function (UIGestureRecognizerState) {
    UIGestureRecognizerState[UIGestureRecognizerState["possible"] = 0] = "possible";
    UIGestureRecognizerState[UIGestureRecognizerState["began"] = 1] = "began";
    UIGestureRecognizerState[UIGestureRecognizerState["changed"] = 2] = "changed";
    UIGestureRecognizerState[UIGestureRecognizerState["ended"] = 3] = "ended";
    UIGestureRecognizerState[UIGestureRecognizerState["cancelled"] = 4] = "cancelled";
    UIGestureRecognizerState[UIGestureRecognizerState["failed"] = 5] = "failed";
})(UIGestureRecognizerState = exports.UIGestureRecognizerState || (exports.UIGestureRecognizerState = {}));

var UIGestureRecognizer = function (_EventEmitter_1$Event) {
    _inherits(UIGestureRecognizer, _EventEmitter_1$Event);

    function UIGestureRecognizer() {
        _classCallCheck(this, UIGestureRecognizer);

        var _this = _possibleConstructorReturn(this, _EventEmitter_1$Event.apply(this, arguments));

        _this.state = UIGestureRecognizerState.possible;
        _this.enabled = true;
        _this.view = undefined;
        _this.touches = [];
        return _this;
    }

    UIGestureRecognizer.prototype.requireGestureRecognizerToFail = function requireGestureRecognizerToFail(otherGestureRecognizer) {};

    UIGestureRecognizer.prototype.locationInView = function locationInView(view) {
        var touch = this.touches[0];
        if (touch) {
            return touch.locationInView(view);
        }
        return UIPoint_1.UIPointZero;
    };

    UIGestureRecognizer.prototype.numberOfTouches = function numberOfTouches() {
        return this.touches.values.length;
    };

    UIGestureRecognizer.prototype.locationOfTouch = function locationOfTouch(touchIndex, view) {
        var touch = this.touches[touchIndex];
        if (touch) {
            return touch.locationInView(view);
        }
        return UIPoint_1.UIPointZero;
    };

    UIGestureRecognizer.prototype.handleTouch = function handleTouch(touches) {
        this.touches = touches;
    };

    UIGestureRecognizer.prototype.handleEvent = function handleEvent(name) {};

    return UIGestureRecognizer;
}(EventEmitter_1.EventEmitter);

exports.UIGestureRecognizer = UIGestureRecognizer;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var EventEmitter_1 = __webpack_require__(12);
var UIView_1 = __webpack_require__(1);
var UIEdgeInsets_1 = __webpack_require__(8);
var UIColor_1 = __webpack_require__(5);
var UITabBarItem_1 = __webpack_require__(64);
var UINavigationBar_1 = __webpack_require__(27);

var UIViewController = function (_EventEmitter_1$Event) {
    _inherits(UIViewController, _EventEmitter_1$Event);

    function UIViewController() {
        _classCallCheck(this, UIViewController);

        var _this = _possibleConstructorReturn(this, _EventEmitter_1$Event.apply(this, arguments));

        _this.clazz = "UIViewController";
        _this._title = undefined;
        _this._view = undefined;
        _this.safeAreaInsets = UIEdgeInsets_1.UIEdgeInsetsZero;
        _this.parentViewController = undefined;
        _this.childViewControllers = [];
        _this.navigationItem = new UINavigationBar_1.UINavigationItem();
        _this.hidesBottomBarWhenPushed = true;
        _this.tabBarItem = new UITabBarItem_1.UITabBarItem();
        return _this;
    }

    UIViewController.prototype.loadViewIfNeed = function loadViewIfNeed() {
        if (this._view === undefined) {
            this.loadView();
            if (this._view) {
                this._view.viewDelegate = this;
            }
            this.viewDidLoad();
        }
    };

    UIViewController.prototype.attach = function attach(dataOwner, dataField) {
        this.iView.attach(dataOwner, dataField);
    };

    UIViewController.prototype.loadView = function loadView() {
        this.view = new UIView_1.UIView();
        this.iView.backgroundColor = UIColor_1.UIColor.white;
    };

    UIViewController.prototype.viewDidLoad = function viewDidLoad() {};

    UIViewController.prototype.viewWillAppear = function viewWillAppear(animated) {
        this.childViewControllers.forEach(function (it) {
            return it.viewWillAppear(animated);
        });
    };

    UIViewController.prototype.viewDidAppear = function viewDidAppear(animated) {
        this.childViewControllers.forEach(function (it) {
            return it.viewDidAppear(animated);
        });
    };

    UIViewController.prototype.viewWillDisappear = function viewWillDisappear(animated) {
        this.childViewControllers.forEach(function (it) {
            return it.viewWillDisappear(animated);
        });
    };

    UIViewController.prototype.viewDidDisappear = function viewDidDisappear(animated) {
        this.childViewControllers.forEach(function (it) {
            return it.viewDidDisappear(animated);
        });
    };

    UIViewController.prototype.viewWillLayoutSubviews = function viewWillLayoutSubviews() {
        this.emit("viewWillLayoutSubviews", this);
    };

    UIViewController.prototype.viewDidLayoutSubviews = function viewDidLayoutSubviews() {};

    UIViewController.prototype.addChildViewController = function addChildViewController(viewController) {
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
    };

    UIViewController.prototype.removeFromParentViewController = function removeFromParentViewController() {
        if (this.parentViewController) {
            var it = this.parentViewController;
            this.willMoveToParentViewController(undefined);
            var idx = it.childViewControllers.indexOf(this);
            if (idx >= 0) {
                it.childViewControllers.splice(idx, 1);
            }
            this.parentViewController = undefined;
            this.didMoveToParentViewController(undefined);
        }
    };

    UIViewController.prototype.willMoveToParentViewController = function willMoveToParentViewController(parent) {};

    UIViewController.prototype.didMoveToParentViewController = function didMoveToParentViewController(parent) {};

    UIViewController.prototype.didAddSubview = function didAddSubview(subview) {};

    // Helpers
    UIViewController.prototype.nextResponder = function nextResponder() {
        if (this.parentViewController) {
            return this.parentViewController.view;
        } else if (this._view && this._view.superview) {
            return this._view.superview;
        }
        return undefined;
    };

    _createClass(UIViewController, [{
        key: "title",
        get: function get() {
            return this._title;
        },
        set: function set(value) {
            this._title = value;
            if (this.navigationController) {
                this.navigationController.updateBrowserTitle();
            }
        }
    }, {
        key: "view",
        set: function set(value) {
            if (this._view !== undefined) {
                return;
            }
            this._view = value;
        },
        get: function get() {
            return this.iView;
        }
    }, {
        key: "iView",
        get: function get() {
            this.loadViewIfNeed();
            return this._view;
        }
    }, {
        key: "navigationController",
        get: function get() {
            var current = this;
            while (current != undefined) {
                if (current.clazz === "UINavigationController") {
                    return current;
                }
                current = current.parentViewController;
            }
            return undefined;
        }
    }, {
        key: "tabBarController",
        get: function get() {
            var current = this;
            while (current != undefined) {
                if (current.clazz === "UITabBarController") {
                    return current;
                }
                current = current.parentViewController;
            }
            return undefined;
        }
    }, {
        key: "window",
        get: function get() {
            var nextResponder = this.nextResponder();
            while (nextResponder !== undefined) {
                if (nextResponder.clazz === "UIWindow") {
                    return nextResponder;
                }
                nextResponder = nextResponder.nextResponder();
            }
        }
    }, {
        key: "visibleViewController",
        get: function get() {
            if (this.window && this.window.presentedViewControllers.length > 0) {
                return this.window.presentedViewControllers[this.window.presentedViewControllers.length - 1];
            } else if (this.window) {
                return this.window.rootViewController;
            }
            return undefined;
        }
    }]);

    return UIViewController;
}(EventEmitter_1.EventEmitter);

exports.UIViewController = UIViewController;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });

var URL = function () {
    function URL(URLString) {
        _classCallCheck(this, URL);

        this.URLString = URLString;
    }

    URL.URLWithString = function URLWithString(string, baseURL) {
        // if (baseURL !== undefined) {
        // if (windowURL !== undefined) {
        //     return new URL(new windowURL(string, baseURL.absoluteString).href)
        // }
        // }
        return new URL(string);
    };

    URL.fileURLWithPath = function fileURLWithPath(path) {
        throw Error();
    };

    _createClass(URL, [{
        key: "absoluteString",
        get: function get() {
            return this.URLString;
        }
    }]);

    return URL;
}();

exports.URL = URL;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });

var Data = function () {
    function Data(value) {
        _classCallCheck(this, Data);

        this._arrayBuffer = new ArrayBuffer(0);
        if (value instanceof ArrayBuffer) {
            this._arrayBuffer = value.slice(0);
        } else if (value !== undefined) {
            if (typeof value.utf8String === "string") {
                if (typeof TextEncoder === "function") {
                    return new Data(new TextEncoder().encode(value.utf8String).buffer);
                } else {
                    var trimValue = unescape(encodeURIComponent(value.utf8String));
                    var arrayBuffer = new ArrayBuffer(trimValue.length);
                    var bufferView = new Uint8Array(arrayBuffer);
                    for (var i = 0, count = trimValue.length; i < count; i++) {
                        bufferView[i] = trimValue.charCodeAt(i);
                    }
                    this._arrayBuffer = arrayBuffer;
                }
            } else if (value.base64EncodedData instanceof Data) {
                var binaryString = window.atob(new Uint8Array(value.base64EncodedData._arrayBuffer).reduce(function (data, byte) {
                    return data + String.fromCharCode(byte);
                }, ''));
                var len = binaryString.length;
                var bytes = new Uint8Array(len);
                for (var i = 0; i < len; i++) {
                    bytes[i] = binaryString.charCodeAt(i);
                }
                this._arrayBuffer = bytes.buffer;
            } else if (typeof value.base64EncodedString === "string") {
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

    Data.prototype.arrayBuffer = function arrayBuffer() {
        return this._arrayBuffer;
    };

    Data.prototype.json = function json() {
        var utf8String = this.utf8String();
        if (utf8String !== undefined) {
            try {
                return JSON.parse(utf8String);
            } catch (error) {
                return undefined;
            }
        }
        return undefined;
    };

    Data.prototype.utf8String = function utf8String() {
        if (typeof TextDecoder === "function") {
            return new TextDecoder().decode(this._arrayBuffer);
        }
        return decodeURIComponent(escape(new Uint8Array(this._arrayBuffer).reduce(function (data, byte) {
            return data + String.fromCharCode(byte);
        }, '')));
    };

    Data.prototype.base64EncodedData = function base64EncodedData() {
        return new Data({ utf8String: this.base64EncodedString() });
    };

    Data.prototype.base64EncodedString = function base64EncodedString() {
        return window.btoa(new Uint8Array(this._arrayBuffer).reduce(function (data, byte) {
            return data + String.fromCharCode(byte);
        }, ''));
    };

    Data.prototype.mutable = function mutable() {
        return new MutableData(this._arrayBuffer);
    };

    return Data;
}();

exports.Data = Data;

var MutableData = function (_Data) {
    _inherits(MutableData, _Data);

    function MutableData() {
        _classCallCheck(this, MutableData);

        return _possibleConstructorReturn(this, _Data.apply(this, arguments));
    }

    MutableData.prototype.appendData = function appendData(data) {
        this._arrayBuffer = new Uint8Array([].concat(new Uint8Array(this._arrayBuffer), new Uint8Array(data._arrayBuffer))).buffer;
    };

    MutableData.prototype.appendArrayBuffer = function appendArrayBuffer(arrayBuffer) {
        this._arrayBuffer = new Uint8Array([].concat(new Uint8Array(this._arrayBuffer), new Uint8Array(arrayBuffer))).buffer;
    };

    MutableData.prototype.setData = function setData(data) {
        this._arrayBuffer = data._arrayBuffer.slice(0);
    };

    MutableData.prototype.immutable = function immutable() {
        return new Data(this._arrayBuffer);
    };

    return MutableData;
}(Data);

exports.MutableData = MutableData;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });

var UIFont = function UIFont(pointSize, fontStyle, fontName) {
    _classCallCheck(this, UIFont);

    this.pointSize = pointSize;
    this.fontStyle = fontStyle;
    this.fontName = fontName;
    if (fontName === undefined) {
        this.fontName = "-apple-system";
    }
};

exports.UIFont = UIFont;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var UIGestureRecognizer_1 = __webpack_require__(14);
var UITouch_1 = __webpack_require__(10);
var UIView_1 = __webpack_require__(1);

var UILongPressGestureRecognizer = function (_UIGestureRecognizer_) {
    _inherits(UILongPressGestureRecognizer, _UIGestureRecognizer_);

    function UILongPressGestureRecognizer() {
        _classCallCheck(this, UILongPressGestureRecognizer);

        var _this = _possibleConstructorReturn(this, _UIGestureRecognizer_.apply(this, arguments));

        _this.numberOfTapsRequired = 1;
        _this.numberOfTouchesRequired = 1;
        _this.minimumPressDuration = 0.5;
        _this.allowableMovement = 10;
        _this.beganPoints = {};
        return _this;
    }

    UILongPressGestureRecognizer.prototype.handleTouch = function handleTouch(touches) {
        var _this2 = this;

        _UIGestureRecognizer_.prototype.handleTouch.call(this, touches);
        touches.forEach(function (it) {
            if (it.phase == UITouch_1.UITouchPhase.began) {
                if (UIView_1.UIView.recognizedGesture != undefined) {
                    _this2.beganPoints = {};
                    return;
                }
                if (it.windowPoint) {
                    _this2.beganPoints[it.identifier] = it.windowPoint;
                }
                if (_this2.timerTask === undefined && Object.keys(_this2.beganPoints).length >= _this2.numberOfTouchesRequired) {
                    _this2.timerTask = setTimeout(function () {
                        if (UIView_1.UIView.recognizedGesture == undefined && _this2.state == UIGestureRecognizer_1.UIGestureRecognizerState.possible) {
                            UIView_1.UIView.recognizedGesture = _this2;
                            _this2.state = UIGestureRecognizer_1.UIGestureRecognizerState.began;
                            _this2.handleEvent("began");
                            _this2.emit("began", _this2);
                        } else {
                            _this2.state = UIGestureRecognizer_1.UIGestureRecognizerState.failed;
                        }
                    }, _this2.minimumPressDuration * 1000);
                }
            } else if (it.phase == UITouch_1.UITouchPhase.moved) {
                if (_this2.state == UIGestureRecognizer_1.UIGestureRecognizerState.possible) {
                    if (it.windowPoint && _this2.beganPoints[it.identifier]) {
                        var beganPoint = _this2.beganPoints[it.identifier];
                        if (Math.abs(beganPoint.x - it.windowPoint.x) >= _this2.allowableMovement || Math.abs(beganPoint.y - it.windowPoint.y) >= _this2.allowableMovement) {
                            clearTimeout(_this2.timerTask);
                            _this2.state = UIGestureRecognizer_1.UIGestureRecognizerState.failed;
                        }
                    }
                } else if (_this2.state == UIGestureRecognizer_1.UIGestureRecognizerState.began || _this2.state == UIGestureRecognizer_1.UIGestureRecognizerState.changed) {
                    _this2.state = UIGestureRecognizer_1.UIGestureRecognizerState.changed;
                    _this2.handleEvent("changed");
                    _this2.emit("changed", _this2);
                }
            } else if (it.phase == UITouch_1.UITouchPhase.ended) {
                clearTimeout(_this2.timerTask);
                _this2.timerTask = undefined;
                if (_this2.state == UIGestureRecognizer_1.UIGestureRecognizerState.began || _this2.state == UIGestureRecognizer_1.UIGestureRecognizerState.changed) {
                    _this2.state = UIGestureRecognizer_1.UIGestureRecognizerState.ended;
                    _this2.handleEvent("ended");
                    _this2.emit("ended", _this2);
                    setTimeout(function () {
                        UIView_1.UIView.recognizedGesture = undefined;
                    }, 0);
                }
                _this2.state = UIGestureRecognizer_1.UIGestureRecognizerState.possible;
                _this2.beganPoints = {};
            } else if (it.phase == UITouch_1.UITouchPhase.cancelled) {
                clearTimeout(_this2.timerTask);
                _this2.timerTask = undefined;
                if (_this2.state == UIGestureRecognizer_1.UIGestureRecognizerState.began || _this2.state == UIGestureRecognizer_1.UIGestureRecognizerState.changed) {
                    _this2.state = UIGestureRecognizer_1.UIGestureRecognizerState.cancelled;
                    _this2.handleEvent("cancelled");
                    _this2.emit("cancelled", _this2);
                    setTimeout(function () {
                        UIView_1.UIView.recognizedGesture = undefined;
                    }, 0);
                }
                _this2.state = UIGestureRecognizer_1.UIGestureRecognizerState.possible;
                _this2.beganPoints = {};
            }
        });
    };

    return UILongPressGestureRecognizer;
}(UIGestureRecognizer_1.UIGestureRecognizer);

exports.UILongPressGestureRecognizer = UILongPressGestureRecognizer;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var UIView_1 = __webpack_require__(1);
var UIPoint_1 = __webpack_require__(11);
var UISize_1 = __webpack_require__(13);
var UIEdgeInsets_1 = __webpack_require__(8);
var UIPanGestureRecognizer_1 = __webpack_require__(35);
var UIRefreshControl_1 = __webpack_require__(36);
var UIFetchMoreControl_1 = __webpack_require__(37);
var isIOS = wx.getSystemInfoSync().platform === "ios";

var UIScrollView = function (_UIView_1$UIView) {
    _inherits(UIScrollView, _UIView_1$UIView);

    function UIScrollView() {
        _classCallCheck(this, UIScrollView);

        var _this = _possibleConstructorReturn(this, _UIView_1$UIView.call(this));

        _this.clazz = "UIScrollView";
        _this._panGesture = new UIPanGestureRecognizer_1.UIPanGestureRecognizer();
        _this._contentOffset = UIPoint_1.UIPointZero;
        _this._contentSize = UISize_1.UISizeZero;
        _this._contentInset = UIEdgeInsets_1.UIEdgeInsetsZero;
        _this.adjustInset = UIEdgeInsets_1.UIEdgeInsetsZero;
        _this.directionalLockEnabled = false;
        _this._bounces = true;
        _this._alwaysBounceVertical = false;
        _this._alwaysBounceHorizontal = false;
        _this._pagingEnabled = false;
        _this._scrollEnabled = true;
        _this.showsHorizontalScrollIndicator = true; // todo
        _this.showsVerticalScrollIndicator = true; // todo
        _this.tracking = false;
        _this.dragging = false;
        _this.decelerating = false;
        _this._scrollsToTop = true;
        _this._endDraggingVelocity = UIPoint_1.UIPointZero;
        // RefreshControl
        _this._refreshControl = undefined;
        _this.touchingRefreshControl = false;
        _this.touchingRefreshControlBeganWindowY = 0.0;
        _this.touchingRefreshOffsetY = 0.0;
        // FetchMoreControl
        _this._fetchMoreControl = undefined;
        // Build Data
        _this.isContentOffsetScrollAnimated = false;
        _this._panGesture.enabled = false;
        return _this;
    }

    UIScrollView.prototype.contentOffsetDidChanged = function contentOffsetDidChanged() {};

    UIScrollView.prototype.setContentOffset = function setContentOffset(contentOffset) {
        var animated = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        this.contentOffset = contentOffset;
        this.isContentOffsetScrollAnimated = animated;
    };

    UIScrollView.prototype.scrollRectToVisible = function scrollRectToVisible(rect, animated) {
        var targetContentOffset = this.contentOffset;
        if (rect.x < this.contentOffset.x) {
            targetContentOffset = { x: rect.x, y: targetContentOffset.y };
        } else if (rect.x + rect.width > this.contentOffset.x + this.bounds.width) {
            targetContentOffset = { x: rect.x + rect.width - this.bounds.width, y: targetContentOffset.y };
        }
        if (rect.y < this.contentOffset.y) {
            targetContentOffset = { x: targetContentOffset.x, y: rect.y };
        } else if (rect.y + rect.height > this.contentOffset.y + this.bounds.height) {
            targetContentOffset = { x: targetContentOffset.x, y: rect.y + rect.height - this.bounds.height };
        }
        targetContentOffset = {
            x: Math.max(0.0, Math.min(this.contentSize.width - this.bounds.width, targetContentOffset.x)),
            y: Math.max(0.0, Math.min(this.contentSize.height - this.bounds.height, targetContentOffset.y))
        };
        this.setContentOffset(targetContentOffset, animated);
    };

    // Delegates
    UIScrollView.prototype.didScroll = function didScroll() {
        this.emit("didScroll", this);
        this.contentOffsetDidChanged();
    };

    UIScrollView.prototype.willBeginDragging = function willBeginDragging() {
        UIView_1.UIView.recognizedGesture = this._panGesture;
        this.emit("willBeginDragging", this);
        this.tracking = true;
        this.dragging = true;
    };

    UIScrollView.prototype.willEndDragging = function willEndDragging(velocity) {
        this._endDraggingVelocity = velocity;
        this.emit("willEndDragging", this, velocity);
    };

    UIScrollView.prototype.didEndDragging = function didEndDragging(decelerate) {
        this.tracking = false;
        this.dragging = false;
        this.emit("didEndDragging", this, decelerate);
    };

    UIScrollView.prototype.willBeginDecelerating = function willBeginDecelerating() {
        this.emit("willBeginDecelerating", this);
        this.decelerating = true;
    };

    UIScrollView.prototype.didEndDecelerating = function didEndDecelerating() {
        this.decelerating = false;
        this.emit("didEndDecelerating", this);
    };

    UIScrollView.prototype.didEndScrollingAnimation = function didEndScrollingAnimation() {
        this.emit("didEndScrollingAnimation", this);
    };

    UIScrollView.prototype.didScrollToTop = function didScrollToTop() {
        this.emit("didScrollToTop", this);
    };

    UIScrollView.prototype.layoutSubviews = function layoutSubviews() {
        _UIView_1$UIView.prototype.layoutSubviews.call(this);
        if (this.refreshControl) {
            this.refreshControl.animationView.frame = { x: 0.0, y: 0.0, width: this.bounds.width, height: 44.0 };
        }
        this.markFlagDirty("direction");
    };

    UIScrollView.prototype.addSubview = function addSubview(view) {
        if (view instanceof UIRefreshControl_1.UIRefreshControl) {
            this.refreshControl = view;
            return;
        }
        if (view instanceof UIFetchMoreControl_1.UIFetchMoreControl) {
            this.fetchMoreControl = view;
            return;
        }
        _UIView_1$UIView.prototype.addSubview.call(this, view);
    };

    UIScrollView.prototype.createRefreshEffect = function createRefreshEffect(translation) {
        if (this.refreshControl && this.refreshControl.enabled && this.contentSize.width <= this.bounds.width) {
            if (isIOS) {
                if (this.contentOffset.y < -this.contentInset.top) {
                    var progress = Math.max(0.0, Math.min(1.0, (-this.contentInset.top - this.contentOffset.y) / 88.0));
                    this.refreshControl.animationView.alpha = progress;
                } else {
                    this.refreshControl.animationView.alpha = 0.0;
                }
            } else {
                if (this.contentOffset.y - translation.y < -this.contentInset.top) {
                    var _progress = Math.max(0.0, Math.min(1.0, (-this.contentInset.top - (this.contentOffset.y - translation.y)) / (88.0 * 2)));
                    this.refreshControl.animationView.alpha = _progress;
                    this.touchingRefreshOffsetY = translation.y / 3.0;
                    this.markFlagDirty("refreshOffset", "refreshingAnimation");
                }
            }
        }
        return undefined;
    };

    UIScrollView.prototype.touchesBegan = function touchesBegan(touches) {
        _UIView_1$UIView.prototype.touchesBegan.call(this, touches);
        this.touchingRefreshControl = this.contentOffset.y <= -this.contentInset.top + 8.0;
        if (this.touchingRefreshControl && touches[0] && touches[0].windowPoint) {
            this.touchingRefreshControlBeganWindowY = touches[0].windowPoint.y;
        }
    };

    UIScrollView.prototype.touchesMoved = function touchesMoved(touches) {
        _UIView_1$UIView.prototype.touchesMoved.call(this, touches);
        if (this.refreshControl && this.refreshControl.enabled && this.touchingRefreshControl && touches[0] && touches[0].windowPoint && this.contentOffset.y <= 0.0) {
            var translateY = touches[0].windowPoint.y - this.touchingRefreshControlBeganWindowY;
            this.createRefreshEffect({ x: 0, y: translateY });
        }
    };

    UIScrollView.prototype.touchesEnded = function touchesEnded(touches) {
        _UIView_1$UIView.prototype.touchesEnded.call(this, touches);
        if (this.refreshControl !== undefined && this.refreshControl.animationView.alpha >= 1.0) {
            this.refreshControl.beginRefreshing_callFromScrollView();
        } else if (this.refreshControl !== undefined && this.refreshControl.animationView.alpha > 0.0) {
            this.refreshControl.animationView.alpha = 0.0;
        }
        this.touchingRefreshOffsetY = 0.0;
        this.markFlagDirty("refreshOffset");
    };

    UIScrollView.prototype.touchesCancelled = function touchesCancelled(touches) {
        _UIView_1$UIView.prototype.touchesCancelled.call(this, touches);
    };

    UIScrollView.prototype.createFetchMoreEffect = function createFetchMoreEffect() {
        if (this.fetchMoreControl && this.fetchMoreControl.enabled && this.contentSize.width <= this.bounds.width) {
            if (this.fetchMoreControl.fetching) {
                return true;
            } else {
                this.fetchMoreControl.beginFetching();
                return true;
            }
        }
        return false;
    };

    UIScrollView.prototype.buildData = function buildData() {
        var _this2 = this;

        var data = _UIView_1$UIView.prototype.buildData.call(this);
        var totalContentSize = {
            width: this.contentSize.width + this.contentInset.left + this.contentInset.right,
            height: this.contentSize.height + this.contentInset.top + this.contentInset.bottom
        };
        if (this.dirtyFlags["contentOffsetX"] || this.dirtyFlags["contentOffsetY"]) {
            data.contentOffsetX = this.contentOffset.x + this.contentInset.left;
            data.contentOffsetY = this.contentOffset.y + this.contentInset.top;
            data.scrollWithAnimation = this.isContentOffsetScrollAnimated;
        }
        data.pagingEnabled = this.pagingEnabled;
        data.pagingItems = function () {
            if (!_this2.pagingEnabled) {
                return [];
            }
            if (totalContentSize.width > _this2.bounds.width) {
                var items = [];
                var count = Math.ceil(totalContentSize.width / _this2.bounds.width);
                for (var index = 0; index < count; index++) {
                    items.push(0);
                }
                return items;
            } else if (totalContentSize.height > _this2.bounds.height) {
                var _items = [];
                var _count = Math.ceil(totalContentSize.height / _this2.bounds.height);
                for (var _index = 0; _index < _count; _index++) {
                    _items.push(1);
                }
                return _items;
            } else {
                return [0];
            }
        }();
        data.pagingDuration = 300;
        if (this.dirtyFlags["contentOffsetX"] || this.dirtyFlags["contentOffsetY"]) {
            if (this.pagingEnabled) {
                this.setDataForce({ pagingDuration: this.isContentOffsetScrollAnimated ? 300 : 0 });
                this.setDataForce({
                    pagingCurrentIndex: totalContentSize.width > this.bounds.width ? Math.round((this.contentOffset.x + this.contentInset.left) / this.bounds.width) : Math.round((this.contentOffset.y + this.contentInset.top) / this.bounds.height)
                });
                this.setDataForce({ pagingDuration: 300 });
            }
        }
        data.scrollsToTop = this.scrollsToTop;
        data.direction = function () {
            if (totalContentSize.width > _this2.bounds.width && totalContentSize.height > _this2.bounds.height) {
                return "all";
            } else if (totalContentSize.width > _this2.bounds.width) {
                return "horizontal";
            } else if (totalContentSize.height > _this2.bounds.height) {
                return "vertical";
            } else {
                return "none";
            }
        }();
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
            } else {
                data.refreshOffset = this.refreshControl.refreshing ? 44 : this.touchingRefreshOffsetY;
                this.adjustInset = { top: this.refreshControl.refreshing ? 44 : 0, left: 0, bottom: 0, right: 0 };
            }
        }
        return data;
    };

    _createClass(UIScrollView, [{
        key: "contentOffset",
        get: function get() {
            return this._contentOffset;
        },
        set: function set(value) {
            this._contentOffset = value;
            this.markFlagDirty("contentOffsetX", "contentOffsetY", "scrollWithAnimation");
            this.isContentOffsetScrollAnimated = false;
        }
    }, {
        key: "contentSize",
        get: function get() {
            return this._contentSize;
        },
        set: function set(value) {
            this._contentSize = value;
            this.markFlagDirty("contentSize", "pagingItems");
        }
    }, {
        key: "contentInset",
        get: function get() {
            return this._contentInset;
        },
        set: function set(value) {
            var deltaX = value.left - this._contentInset.left;
            var deltaY = value.top - this._contentInset.top;
            this._contentInset = value;
            this.contentOffset = { x: this.contentOffset.x - deltaX, y: this.contentOffset.y - deltaY };
            this.markFlagDirty("contentInset", "contentSize", "refreshingAnimation");
        }
    }, {
        key: "bounces",
        get: function get() {
            return this._bounces;
        },
        set: function set(value) {
            this._bounces = value;
        }
    }, {
        key: "alwaysBounceVertical",
        get: function get() {
            return this._alwaysBounceVertical;
        },
        set: function set(value) {
            this._alwaysBounceVertical = value;
        }
    }, {
        key: "alwaysBounceHorizontal",
        get: function get() {
            return this._alwaysBounceHorizontal;
        },
        set: function set(value) {
            this._alwaysBounceHorizontal = value;
        }
    }, {
        key: "pagingEnabled",
        get: function get() {
            return this._pagingEnabled;
        },
        set: function set(value) {
            this._pagingEnabled = value;
            this.markFlagDirty("pagingEnabled", "pagingItems");
        }
    }, {
        key: "scrollEnabled",
        get: function get() {
            return this._scrollEnabled;
        },
        set: function set(value) {
            this._scrollEnabled = value;
            this.markFlagDirty("direction");
        }
    }, {
        key: "scrollsToTop",
        get: function get() {
            return this._scrollsToTop;
        },
        set: function set(value) {
            this._scrollsToTop = value;
            this.markFlagDirty("scrollsToTop");
        }
    }, {
        key: "refreshControl",
        get: function get() {
            return this._refreshControl;
        },
        set: function set(value) {
            this._refreshControl = value;
            if (value) {
                this.markFlagDirty("refreshControlAnimationView");
                value.animationView.frame = { x: 0, y: 0, width: this.bounds.width, height: 44.0 };
                value.scrollView = this;
            }
        }
    }, {
        key: "fetchMoreControl",
        get: function get() {
            return this._fetchMoreControl;
        },
        set: function set(value) {
            this._fetchMoreControl = value;
            if (value) {
                value.scrollView = this;
            }
        }
    }]);

    return UIScrollView;
}(UIView_1.UIView);

exports.UIScrollView = UIScrollView;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });

var Ticker = function () {
    function Ticker() {
        _classCallCheck(this, Ticker);

        this.taskBlocks = {};
        this.timerHandler = undefined;
    }

    Ticker.prototype.hasTask = function hasTask(taskID) {
        return this.taskBlocks[taskID] !== undefined;
    };

    Ticker.prototype.addTask = function addTask(taskID, taskBlock) {
        this.taskBlocks[taskID] = taskBlock;
        this.activeTimer();
    };

    Ticker.prototype.run = function run() {
        var currentBlocks = this.taskBlocks;
        this.taskBlocks = {};
        this.timerHandler = undefined;
        if (Object.keys(currentBlocks).length > 0) {
            for (var key in currentBlocks) {
                try {
                    currentBlocks[key]();
                } catch (error) {}
            }
        }
    };

    Ticker.prototype.activeTimer = function activeTimer() {
        if (this.timerHandler !== undefined) {
            return;
        }
        this.timerHandler = setTimeout(this.run.bind(this), 16);
    };

    _createClass(Ticker, null, [{
        key: "shared",
        get: function get() {
            if (getApp().TickerShared === undefined) {
                getApp().TickerShared = new Ticker();
            }
            return getApp().TickerShared;
        }
    }]);

    return Ticker;
}();

exports.Ticker = Ticker;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var Matrix_1 = __webpack_require__(32);
exports.UIAffineTransformIdentity = { a: 1.0, b: 0.0, c: 0.0, d: 1.0, tx: 0.0, ty: 0.0 };
exports.UIAffineTransformMake = function (a, b, c, d, tx, ty) {
    return { a: a, b: b, c: c, d: d, tx: tx, ty: ty };
};
exports.UIAffineTransformMakeTranslation = function (tx, ty) {
    return exports.UIAffineTransformMake(1.0, 0.0, 0.0, 1.0, tx, ty);
};
exports.UIAffineTransformMakeScale = function (sx, sy) {
    return exports.UIAffineTransformMake(sx, 0.0, 0.0, sy, 0.0, 0.0);
};
exports.UIAffineTransformMakeRotation = function (angle) {
    var mCos = Math.cos(angle);
    var mSin = Math.sin(angle);
    return exports.UIAffineTransformMake(mCos, -mSin, mSin, mCos, 0.0, 0.0);
};
exports.UIAffineTransformTranslate = function (t, tx, ty) {
    var matrix = new Matrix_1.Matrix();
    matrix.setValues(t);
    matrix.postTranslate(tx, ty);
    return matrix.getValues();
};
exports.UIAffineTransformScale = function (t, sx, sy) {
    var matrix = new Matrix_1.Matrix();
    matrix.setValues(t);
    matrix.postScale(sx, sx);
    return matrix.getValues();
};
exports.UIAffineTransformRotate = function (t, angle) {
    var matrix = new Matrix_1.Matrix();
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
        ty: t.ty
    };
};
exports.UIAffineTransformConcat = function (t1, t2) {
    var matrix1 = new Matrix_1.Matrix();
    matrix1.setValues(t1);
    var matrix2 = new Matrix_1.Matrix();
    matrix2.setValues(t2);
    matrix1.concat(matrix2);
    return matrix1.getValues();
};
exports.UIAffineTransformEqualToTransform = function (t1, t2) {
    return Math.abs(t1.a - t2.a) < 0.001 && Math.abs(t1.b - t2.b) < 0.001 && Math.abs(t1.c - t2.c) < 0.001 && Math.abs(t1.d - t2.d) < 0.001 && Math.abs(t1.tx - t2.tx) < 0.001 && Math.abs(t1.ty - t2.ty) < 0.001;
};
exports.UIAffineTransformIsIdentity = function (transform) {
    return exports.UIAffineTransformEqualToTransform(transform, exports.UIAffineTransformIdentity);
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var UITouch_1 = __webpack_require__(10);
var UIGestureRecognizer_1 = __webpack_require__(14);
var UIView_1 = __webpack_require__(1);

var UITapGestureRecognizer = function (_UIGestureRecognizer_) {
    _inherits(UITapGestureRecognizer, _UIGestureRecognizer_);

    function UITapGestureRecognizer() {
        _classCallCheck(this, UITapGestureRecognizer);

        var _this = _possibleConstructorReturn(this, _UIGestureRecognizer_.apply(this, arguments));

        _this.numberOfTapsRequired = 1;
        _this.numberOfTouchesRequired = 1;
        _this.beganPoints = {};
        _this.validPointsCount = 0;
        return _this;
    }

    UITapGestureRecognizer.prototype.handleTouch = function handleTouch(touches) {
        var _this2 = this;

        _UIGestureRecognizer_.prototype.handleTouch.call(this, touches);
        touches.forEach(function (it) {
            if (it.phase == UITouch_1.UITouchPhase.began) {
                if (UIView_1.UIView.recognizedGesture != undefined) {
                    _this2.beganPoints = {};
                    return;
                }
                if (it.windowPoint) {
                    _this2.beganPoints[it.identifier] = it.windowPoint;
                }
            } else if (it.phase == UITouch_1.UITouchPhase.moved) {
                if (it.windowPoint && _this2.beganPoints[it.identifier]) {
                    if (Math.abs(_this2.beganPoints[it.identifier].x - it.windowPoint.x) >= 22.0 || Math.abs(_this2.beganPoints[it.identifier].y - it.windowPoint.y) >= 22.0) {
                        delete _this2.beganPoints[it.identifier];
                    }
                }
            } else if (it.phase == UITouch_1.UITouchPhase.ended) {
                if (UIView_1.UIView.recognizedGesture != undefined) {
                    _this2.beganPoints = {};
                    _this2.state = UIGestureRecognizer_1.UIGestureRecognizerState.possible;
                    _this2.validPointsCount = 0;
                    return;
                }
                if (it.tapCount >= _this2.numberOfTapsRequired && _this2.beganPoints[it.identifier] != undefined) {
                    _this2.validPointsCount++;
                }
                delete _this2.beganPoints[it.identifier];
                if (_this2.validPointsCount >= _this2.numberOfTouchesRequired) {
                    UIView_1.UIView.recognizedGesture = _this2;
                    _this2.state = UIGestureRecognizer_1.UIGestureRecognizerState.ended;
                    _this2.handleEvent("touch");
                    _this2.emit("touch", _this2);
                    setTimeout(function () {
                        UIView_1.UIView.recognizedGesture = undefined;
                    }, 0);
                }
                if (Object.keys(_this2.beganPoints).length == 0 || _this2.state == UIGestureRecognizer_1.UIGestureRecognizerState.ended) {
                    _this2.state = UIGestureRecognizer_1.UIGestureRecognizerState.possible;
                    _this2.validPointsCount = 0;
                }
            }
        });
    };

    return UITapGestureRecognizer;
}(UIGestureRecognizer_1.UIGestureRecognizer);

exports.UITapGestureRecognizer = UITapGestureRecognizer;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var UIView_1 = __webpack_require__(1);
var UIColor_1 = __webpack_require__(5);
var UIEnums_1 = __webpack_require__(6);

var UILabel = function (_UIView_1$UIView) {
    _inherits(UILabel, _UIView_1$UIView);

    function UILabel() {
        _classCallCheck(this, UILabel);

        var _this = _possibleConstructorReturn(this, _UIView_1$UIView.apply(this, arguments));

        _this.clazz = "UILabel";
        _this._text = undefined;
        _this._attributedText = undefined;
        _this._font = undefined;
        _this._textColor = undefined;
        _this._textAlignment = UIEnums_1.UITextAlignment.left;
        _this._numberOfLines = 1;
        return _this;
    }

    // invalidate
    UILabel.prototype.buildData = function buildData() {
        var _this2 = this;

        var data = _UIView_1$UIView.prototype.buildData.call(this);
        if (this.attributedText) {
            data.richText = this.attributedText.toHTMLText();
        } else {
            data.text = this._text !== undefined ? this._text : "";
        }
        data.textStyle = "\n            line-height: 1.0;\n            color: " + (this._textColor !== undefined ? UIColor_1.UIColor.toStyle(this._textColor) : "black") + ";\n            font-size: " + (this._font !== undefined ? this._font.pointSize : 14) + "px;\n            font-family: " + (this._font !== undefined ? this._font.fontName : "") + "; \n            font-weight: " + (this._font !== undefined ? this._font.fontStyle : "") + "; \n            font-style: " + (this._font !== undefined ? this._font.fontStyle : "") + "; \n            text-align: " + function () {
            switch (_this2._textAlignment) {
                case UIEnums_1.UITextAlignment.left:
                    return "left";
                case UIEnums_1.UITextAlignment.center:
                    return "center";
                case UIEnums_1.UITextAlignment.right:
                    return "right";
            }
            return "left";
        }() + ";\n            " + function () {
            if (_this2._numberOfLines === 1) {
                return "\n                    overflow: hidden;\n                    text-overflow: ellipsis;\n                    display: inline-block;\n                    white-space: nowrap;\n                    ";
            } else {
                return "\n                    overflow: hidden;\n                    text-overflow: ellipsis;\n                    display: -webkit-box;\n                    webkit-box-orient: vertical;\n                    ";
            }
        }() + "\n        }";
        return data;
    };

    _createClass(UILabel, [{
        key: "text",
        get: function get() {
            return this._text;
        },
        set: function set(value) {
            if (this._text === value) {
                return;
            }
            this._text = value;
            this.markFlagDirty("text", "richText");
        }
    }, {
        key: "attributedText",
        get: function get() {
            return this._attributedText;
        },
        set: function set(value) {
            if (this._attributedText === value) {
                return;
            }
            this._attributedText = value;
            this.markFlagDirty("text", "richText");
        }
    }, {
        key: "font",
        get: function get() {
            return this._font;
        },
        set: function set(value) {
            if (this._font === value) {
                return;
            }
            this._font = value;
            this.markFlagDirty("textStyle");
        }
    }, {
        key: "textColor",
        get: function get() {
            return this._textColor;
        },
        set: function set(value) {
            if (this._textColor === value) {
                return;
            }
            this._textColor = value;
            this.markFlagDirty("textStyle");
        }
    }, {
        key: "textAlignment",
        get: function get() {
            return this._textAlignment;
        },
        set: function set(value) {
            if (this._textAlignment === value) {
                return;
            }
            this._textAlignment = value;
            this.markFlagDirty("textStyle");
        }
    }, {
        key: "numberOfLines",
        get: function get() {
            return this._numberOfLines;
        },
        set: function set(value) {
            if (this._numberOfLines === value) {
                return;
            }
            this._numberOfLines = value;
            this.markFlagDirty("textStyle");
        }
    }]);

    return UILabel;
}(UIView_1.UIView);

exports.UILabel = UILabel;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var UIView_1 = __webpack_require__(1);
var UIEnums_1 = __webpack_require__(6);

var UIImageView = function (_UIView_1$UIView) {
    _inherits(UIImageView, _UIView_1$UIView);

    function UIImageView() {
        _classCallCheck(this, UIImageView);

        var _this = _possibleConstructorReturn(this, _UIView_1$UIView.apply(this, arguments));

        _this.clazz = "UIImageView";
        _this._image = undefined;
        _this._contentMode = UIEnums_1.UIViewContentMode.scaleToFill;
        return _this;
    }

    UIImageView.prototype.buildData = function buildData() {
        var _this2 = this;

        var data = _UIView_1$UIView.prototype.buildData.call(this);
        data.imageSource = this._image !== undefined ? this._image.imageSource : null;
        data.scaleMode = function () {
            switch (_this2._contentMode) {
                case UIEnums_1.UIViewContentMode.scaleToFill:
                    return "scaleToFill";
                case UIEnums_1.UIViewContentMode.scaleAspectFit:
                    return "aspectFit";
                case UIEnums_1.UIViewContentMode.scaleAspectFill:
                    return "aspectFill";
            }
            return "scaleToFill";
        }();
        return data;
    };

    _createClass(UIImageView, [{
        key: "image",
        get: function get() {
            return this._image;
        },
        set: function set(value) {
            if (this._image === value) {
                return;
            }
            this._image = value;
            this.markFlagDirty("imageSource");
        }
    }, {
        key: "contentMode",
        get: function get() {
            return this._contentMode;
        },
        set: function set(value) {
            if (this._contentMode === value) {
                return;
            }
            this._contentMode = value;
            this.markFlagDirty("scaleMode");
        }
    }]);

    return UIImageView;
}(UIView_1.UIView);

exports.UIImageView = UIImageView;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });

var UIIndexPath = function () {
    function UIIndexPath(row, section) {
        _classCallCheck(this, UIIndexPath);

        this.row = row;
        this.section = section;
    }

    UIIndexPath.prototype.mapKey = function mapKey() {
        return this.row + "-" + this.section;
    };

    return UIIndexPath;
}();

exports.UIIndexPath = UIIndexPath;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var UIView_1 = __webpack_require__(1);
var UIColor_1 = __webpack_require__(5);
var EventEmitter_1 = __webpack_require__(12);

var UINavigationItem = function () {
    function UINavigationItem() {
        _classCallCheck(this, UINavigationItem);

        this.viewController = undefined;
        this.navigationBar = undefined;
        this.leftBarButtonItems = [];
        this.rightBarButtonItems = [];
    }

    UINavigationItem.prototype.setNeedsUpdate = function setNeedsUpdate() {};

    return UINavigationItem;
}();

exports.UINavigationItem = UINavigationItem;

var UIBarButtonItem = function (_EventEmitter_1$Event) {
    _inherits(UIBarButtonItem, _EventEmitter_1$Event);

    function UIBarButtonItem() {
        _classCallCheck(this, UIBarButtonItem);

        return _possibleConstructorReturn(this, _EventEmitter_1$Event.apply(this, arguments));
    }

    return UIBarButtonItem;
}(EventEmitter_1.EventEmitter);

exports.UIBarButtonItem = UIBarButtonItem;

var UINavigationBar = function (_UIView_1$UIView) {
    _inherits(UINavigationBar, _UIView_1$UIView);

    function UINavigationBar() {
        _classCallCheck(this, UINavigationBar);

        var _this2 = _possibleConstructorReturn(this, _UIView_1$UIView.call(this));

        _this2.navigationController = undefined;
        _this2._barTintColor = undefined;
        _this2.barTintColor = UIColor_1.UIColor.white;
        _this2.tintColor = UIColor_1.UIColor.black;
        return _this2;
    }

    UINavigationBar.prototype.tintColorDidChange = function tintColorDidChange() {
        _UIView_1$UIView.prototype.tintColorDidChange.call(this);
        if (this.navigationController) {
            this.navigationController.updateBrowserBar();
        }
    };

    _createClass(UINavigationBar, [{
        key: "barTintColor",
        get: function get() {
            return this._barTintColor;
        },
        set: function set(value) {
            this._barTintColor = value;
            if (this.navigationController) {
                this.navigationController.updateBrowserBar();
            }
        }
    }]);

    return UINavigationBar;
}(UIView_1.UIView);

exports.UINavigationBar = UINavigationBar;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var URL_1 = __webpack_require__(16);
var Data_1 = __webpack_require__(17);

var Bundle = function () {
    function Bundle(type) {
        _classCallCheck(this, Bundle);

        this.type = type;
        this.resources = {};
    }

    Bundle.prototype.resourcePath = function resourcePath(name, type, inDirectory) {
        if (this.type === "native") {
            if (inDirectory !== undefined) {
                return inDirectory + "/" + name + (type !== undefined ? "." + type : "");
            } else {
                return "" + name + (type !== undefined ? "." + type : "");
            }
        } else if (this.type === "js") {
            if (inDirectory !== undefined && this.resources[inDirectory + "/" + name + (type !== undefined ? "." + type : "")] !== undefined) {
                return "xt://" + inDirectory + "/" + name + (type !== undefined ? "." + type : "");
            } else if (this.resources["" + name + (type !== undefined ? "." + type : "")] !== undefined) {
                return "xt://" + name + (type !== undefined ? "." + type : "");
            }
        }
    };

    Bundle.prototype.resourceURL = function resourceURL(name, type, inDirectory) {
        var path = this.resourcePath(name, type, inDirectory);
        return path !== undefined ? URL_1.URL.URLWithString(path) : undefined;
    };

    Bundle.prototype.addResource = function addResource(path, base64String) {
        if (this.type === "js") {
            this.resources[path] = new Data_1.Data({ base64EncodedString: base64String });
        }
    };

    return Bundle;
}();

Bundle.native = new Bundle("native");
Bundle.js = new Bundle("js");
exports.Bundle = Bundle;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var URL_1 = __webpack_require__(16);
var URLRequestCachePolicy;
(function (URLRequestCachePolicy) {
    URLRequestCachePolicy[URLRequestCachePolicy["useProtocol"] = 0] = "useProtocol";
    URLRequestCachePolicy[URLRequestCachePolicy["ignoringLocalCache"] = 1] = "ignoringLocalCache";
    URLRequestCachePolicy[URLRequestCachePolicy["returnCacheElseLoad"] = 2] = "returnCacheElseLoad";
    URLRequestCachePolicy[URLRequestCachePolicy["returnCacheDontLoad"] = 3] = "returnCacheDontLoad";
})(URLRequestCachePolicy = exports.URLRequestCachePolicy || (exports.URLRequestCachePolicy = {}));

var URLRequest = function () {
    function URLRequest(aURL) {
        var cachePolicy = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : URLRequestCachePolicy.useProtocol;
        var timeout = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 15;

        _classCallCheck(this, URLRequest);

        this.cachePolicy = cachePolicy;
        this.timeout = timeout;
        this.HTTPMethod = undefined;
        this.allHTTPHeaderFields = undefined;
        this.URL = aURL instanceof URL_1.URL ? aURL : function () {
            var url = URL_1.URL.URLWithString(aURL);
            if (url === undefined) {
                throw Error("invalid URLString.");
            }
            return url;
        }();
    }

    URLRequest.prototype.valueForHTTPHeaderField = function valueForHTTPHeaderField(field) {
        return undefined;
    };

    URLRequest.prototype.mutable = function mutable() {
        return Object.assign(new MutableURLRequest(this.URL, this.cachePolicy, this.timeout), this);
    };

    return URLRequest;
}();

exports.URLRequest = URLRequest;

var MutableURLRequest = function (_URLRequest) {
    _inherits(MutableURLRequest, _URLRequest);

    function MutableURLRequest() {
        _classCallCheck(this, MutableURLRequest);

        var _this = _possibleConstructorReturn(this, _URLRequest.apply(this, arguments));

        _this.HTTPMethod = "GET";
        _this.allHTTPHeaderFields = {};
        _this.HTTPBody = undefined;
        return _this;
    }

    MutableURLRequest.prototype.setValueForHTTPHeaderField = function setValueForHTTPHeaderField(value, field) {
        if (this.allHTTPHeaderFields === undefined) {
            this.allHTTPHeaderFields = {};
        }
        this.allHTTPHeaderFields[field] = value;
    };

    MutableURLRequest.prototype.immutable = function immutable() {
        return Object.assign(new URLRequest(this.URL, this.cachePolicy, this.timeout), this);
    };

    return MutableURLRequest;
}(URLRequest);

exports.MutableURLRequest = MutableURLRequest;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });

var URLResponse = function URLResponse() {
    _classCallCheck(this, URLResponse);

    this.URL = undefined;
    this.expectedContentLength = 0;
    this.MIMEType = undefined;
    this.textEncodingName = undefined;
    this.statusCode = 0;
    this.allHeaderFields = {};
};

exports.URLResponse = URLResponse;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });

var UUID = function () {
    function UUID() {
        var UUIDString = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

        _classCallCheck(this, UUID);

        this.UUIDString = UUIDString || this.uuidv4();
    }

    UUID.prototype.uuidv4 = function uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : r & 0x3 | 0x8;
            return v.toString(16);
        });
    };

    return UUID;
}();

exports.UUID = UUID;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });

var MatrixAlgorithm = function () {
    function MatrixAlgorithm() {
        _classCallCheck(this, MatrixAlgorithm);

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

    MatrixAlgorithm.prototype.rotate = function rotate(angle) {
        if (angle === 0) {
            return this;
        }
        var mCos = Math.cos(angle);
        var mSin = Math.sin(angle);
        return this._t(mCos, -mSin, 0, 0, mSin, mCos, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    };

    MatrixAlgorithm.prototype.rotateX = function rotateX(angle) {
        if (angle === 0) {
            return this;
        }
        var mCos = Math.cos(angle);
        var mSin = Math.sin(angle);
        return this._t(1, 0, 0, 0, 0, mCos, -mSin, 0, 0, mSin, mCos, 0, 0, 0, 0, 1);
    };

    MatrixAlgorithm.prototype.rotateY = function rotateY(angle) {
        if (angle === 0) {
            return this;
        }
        var mCos = Math.cos(angle);
        var mSin = Math.sin(angle);
        return this._t(mCos, 0, mSin, 0, 0, 1, 0, 0, -mSin, 0, mCos, 0, 0, 0, 0, 1);
    };

    MatrixAlgorithm.prototype.rotateZ = function rotateZ(angle) {
        if (angle === 0) {
            return this;
        }
        var mCos = Math.cos(angle);
        var mSin = Math.sin(angle);
        return this._t(mCos, -mSin, 0, 0, mSin, mCos, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    };

    MatrixAlgorithm.prototype.shear = function shear(sx, sy) {
        return this._t(1, sy, sx, 1, 0, 0);
    };

    MatrixAlgorithm.prototype.skew = function skew(ax, ay) {
        return this.shear(Math.tan(ax), Math.tan(ay));
    };

    MatrixAlgorithm.prototype.skewFromAxis = function skewFromAxis(ax, angle) {
        var mCos = Math.cos(angle);
        var mSin = Math.sin(angle);
        return this._t(mCos, mSin, 0, 0, -mSin, mCos, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        this._t(1, 0, 0, 0, Math.tan(ax), 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        this._t(mCos, -mSin, 0, 0, mSin, mCos, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        //return this._t(mCos, mSin, -mSin, mCos, 0, 0)._t(1, 0, Math.tan(ax), 1, 0, 0)._t(mCos, -mSin, mSin, mCos, 0, 0);
    };

    MatrixAlgorithm.prototype.scale = function scale(sx, sy, sz) {
        sz = isNaN(sz) ? 1 : sz;
        if (sx == 1 && sy == 1 && sz == 1) {
            return this;
        }
        return this._t(sx, 0, 0, 0, 0, sy, 0, 0, 0, 0, sz, 0, 0, 0, 0, 1);
    };

    MatrixAlgorithm.prototype.setTransform = function setTransform(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
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
    };

    MatrixAlgorithm.prototype.translate = function translate(tx, ty, tz) {
        tz = isNaN(tz) ? 0 : tz;
        if (tx !== 0 || ty !== 0 || tz !== 0) {
            return this._t(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, tx, ty, tz, 1);
        }
        return this;
    };

    MatrixAlgorithm.prototype._t = function _t(a2, b2, c2, d2, e2, f2, g2, h2, i2, j2, k2, l2, m2, n2, o2, p2) {
        this.transform(a2, b2, c2, d2, e2, f2, g2, h2, i2, j2, k2, l2, m2, n2, o2, p2);
    };

    MatrixAlgorithm.prototype.transform = function transform(a2, b2, c2, d2, e2, f2, g2, h2, i2, j2, k2, l2, m2, n2, o2, p2) {
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
    };

    MatrixAlgorithm.prototype.clone = function clone(matr) {
        var i;
        for (i = 0; i < 16; i += 1) {
            matr.props[i] = this.props[i];
        }
    };

    MatrixAlgorithm.prototype.cloneFromProps = function cloneFromProps(props) {
        var i;
        for (i = 0; i < 16; i += 1) {
            this.props[i] = props[i];
        }
    };

    MatrixAlgorithm.prototype.applyToPoint = function applyToPoint(x, y, z) {
        return {
            x: x * this.props[0] + y * this.props[4] + z * this.props[8] + this.props[12],
            y: x * this.props[1] + y * this.props[5] + z * this.props[9] + this.props[13],
            z: x * this.props[2] + y * this.props[6] + z * this.props[10] + this.props[14]
        };
        /*return {
         x: x * me.a + y * me.c + me.e,
         y: x * me.b + y * me.d + me.f
         };*/
    };

    MatrixAlgorithm.prototype.applyToX = function applyToX(x, y, z) {
        return x * this.props[0] + y * this.props[4] + z * this.props[8] + this.props[12];
    };

    MatrixAlgorithm.prototype.applyToY = function applyToY(x, y, z) {
        return x * this.props[1] + y * this.props[5] + z * this.props[9] + this.props[13];
    };

    MatrixAlgorithm.prototype.applyToZ = function applyToZ(x, y, z) {
        return x * this.props[2] + y * this.props[6] + z * this.props[10] + this.props[14];
    };

    MatrixAlgorithm.prototype.applyToPointArray = function applyToPointArray(x, y, z) {
        return [x * this.props[0] + y * this.props[4] + z * this.props[8] + this.props[12], x * this.props[1] + y * this.props[5] + z * this.props[9] + this.props[13], x * this.props[2] + y * this.props[6] + z * this.props[10] + this.props[14]];
    };

    MatrixAlgorithm.prototype.applyToPointStringified = function applyToPointStringified(x, y) {
        return Math.round(x * this.props[0] + y * this.props[4] + this.props[12]) + ',' + Math.round(x * this.props[1] + y * this.props[5] + this.props[13]);
    };

    return MatrixAlgorithm;
}();

exports.MatrixAlgorithm = MatrixAlgorithm;

var Matrix = function () {
    function Matrix() {
        var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1.0;
        var b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.0;
        var c = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.0;
        var d = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1.0;
        var tx = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0.0;
        var ty = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0.0;

        _classCallCheck(this, Matrix);

        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.tx = tx;
        this.ty = ty;
    }

    Matrix.unmatrix = function unmatrix(matrix) {
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
    };

    Matrix.prototype.setValues = function setValues(values) {
        this.a = values.a;
        this.b = values.b;
        this.c = values.c;
        this.d = values.d;
        this.tx = values.tx;
        this.ty = values.ty;
    };

    Matrix.prototype.getValues = function getValues() {
        return {
            a: this.a,
            b: this.b,
            c: this.c,
            d: this.d,
            tx: this.tx,
            ty: this.ty
        };
    };

    Matrix.prototype.isIdentity = function isIdentity() {
        return this.a == 1 && this.b == 0 && this.c == 0 && this.d == 1 && this.tx == 0 && this.ty == 0;
    };

    Matrix.prototype.setScale = function setScale(x, y) {
        var obj = new MatrixAlgorithm();
        var unMatrix = Matrix.unmatrix(this);
        obj.rotate(-(unMatrix.degree * Math.PI / 180));
        obj.scale(x || unMatrix.scale.x, y || unMatrix.scale.y, 1.0);
        obj.translate(unMatrix.translate.x, unMatrix.translate.y, 0.0);
        this.a = obj.props[0];
        this.b = obj.props[1];
        this.c = obj.props[4];
        this.d = obj.props[5];
        this.tx = obj.props[12];
        this.ty = obj.props[13];
    };

    Matrix.prototype.postScale = function postScale(x, y) {
        var obj = new MatrixAlgorithm();
        var unMatrix = Matrix.unmatrix(this);
        obj.rotate(-(unMatrix.degree * Math.PI / 180));
        obj.scale(unMatrix.scale.x, unMatrix.scale.y, 1.0);
        obj.translate(unMatrix.translate.x, unMatrix.translate.y, 0.0);
        obj.scale(x || 1.0, y || 1.0, 1.0);
        this.a = obj.props[0];
        this.b = obj.props[1];
        this.c = obj.props[4];
        this.d = obj.props[5];
        this.tx = obj.props[12];
        this.ty = obj.props[13];
    };

    Matrix.prototype.setTranslate = function setTranslate(x, y) {
        var obj = new MatrixAlgorithm();
        var unMatrix = Matrix.unmatrix(this);
        obj.rotate(-(unMatrix.degree * Math.PI / 180));
        obj.scale(unMatrix.scale.x, unMatrix.scale.y, 1.0);
        obj.translate(x || unMatrix.translate.x, y || unMatrix.translate.y, 0.0);
        this.a = obj.props[0];
        this.b = obj.props[1];
        this.c = obj.props[4];
        this.d = obj.props[5];
        this.tx = obj.props[12];
        this.ty = obj.props[13];
    };

    Matrix.prototype.postTranslate = function postTranslate(x, y) {
        var obj = new MatrixAlgorithm();
        var unMatrix = Matrix.unmatrix(this);
        obj.rotate(-(unMatrix.degree * Math.PI / 180));
        obj.scale(unMatrix.scale.x, unMatrix.scale.y, 1.0);
        obj.translate(unMatrix.translate.x, unMatrix.translate.y, 0.0);
        obj.translate(x || 0.0, y || 0.0, 0.0);
        this.a = obj.props[0];
        this.b = obj.props[1];
        this.c = obj.props[4];
        this.d = obj.props[5];
        this.tx = obj.props[12];
        this.ty = obj.props[13];
    };

    Matrix.prototype.setRotate = function setRotate(angle) {
        var obj = new MatrixAlgorithm();
        var unMatrix = Matrix.unmatrix(this);
        obj.rotate(-angle || -(unMatrix.degree * Math.PI / 180));
        obj.scale(unMatrix.scale.x, unMatrix.scale.y, 1.0);
        obj.translate(unMatrix.translate.x, unMatrix.translate.y, 0.0);
        this.a = obj.props[0];
        this.b = obj.props[1];
        this.c = obj.props[4];
        this.d = obj.props[5];
        this.tx = obj.props[12];
        this.ty = obj.props[13];
    };

    Matrix.prototype.postRotate = function postRotate(angle) {
        var obj = new MatrixAlgorithm();
        var unMatrix = Matrix.unmatrix(this);
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
    };

    Matrix.prototype.preConcat = function preConcat(preMatrix) {
        var obj = new MatrixAlgorithm();
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
    };

    Matrix.prototype.concat = function concat(postMatrix) {
        var obj = new MatrixAlgorithm();
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
    };

    return Matrix;
}();

exports.Matrix = Matrix;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var UIView_1 = __webpack_require__(1);
var UIFont_1 = __webpack_require__(18);
var UIEnums_1 = __webpack_require__(6);
var UIColor_1 = __webpack_require__(5);
var UIEdgeInsets_1 = __webpack_require__(8);
var UITapGestureRecognizer_1 = __webpack_require__(23);
var UILongPressGestureRecognizer_1 = __webpack_require__(19);
var UILabel_1 = __webpack_require__(24);
var UIImageView_1 = __webpack_require__(25);

var UIButton = function (_UIView_1$UIView) {
    _inherits(UIButton, _UIView_1$UIView);

    function UIButton() {
        var isCustom = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        _classCallCheck(this, UIButton);

        var _this = _possibleConstructorReturn(this, _UIView_1$UIView.call(this));

        _this.isCustom = isCustom;
        _this.clazz = "UIButton";
        _this.titleLabel = new UILabel_1.UILabel();
        _this.imageView = new UIImageView_1.UIImageView();
        _this._enabled = true;
        _this._selected = false;
        _this._highlighted = false;
        _this.contentAlpha = 1.0;
        _this._tracking = false;
        _this._touchInside = false;
        _this._contentVerticalAlignment = UIEnums_1.UIControlContentVerticalAlignment.center;
        _this._contentHorizontalAlignment = UIEnums_1.UIControlContentHorizontalAlignment.center;
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
        _this._contentEdgeInsets = UIEdgeInsets_1.UIEdgeInsetsZero;
        _this._titleEdgeInsets = UIEdgeInsets_1.UIEdgeInsetsZero;
        _this._imageEdgeInsets = UIEdgeInsets_1.UIEdgeInsetsZero;
        // implements
        _this.statedTitles = {};
        // private statedAttributedTitles: { [key: number]: UIAttributedString } = {}
        _this.statedTitleColors = {};
        _this.statedImages = {};
        _this.titleLabel.font = new UIFont_1.UIFont(17.0);
        _this.setupTouches();
        return _this;
    }

    UIButton.prototype.setTitle = function setTitle(title, state) {
        if (this.statedTitles[state] === title) {
            return;
        }
        if (title) {
            this.statedTitles[state] = title;
        } else {
            delete this.statedTitles[state];
        }
        this.reloadContents();
    };

    UIButton.prototype.setTitleColor = function setTitleColor(color, state) {
        if (this.statedTitleColors[state] === color) {
            return;
        }
        if (color) {
            this.statedTitleColors[state] = color;
        } else {
            delete this.statedTitleColors[state];
        }
        this.reloadContents();
    };

    UIButton.prototype.setTitleFont = function setTitleFont(font) {
        this.titleLabel.font = font;
        this.markFlagDirty("textStyle");
    };

    UIButton.prototype.setImage = function setImage(image, state) {
        if (this.statedImages[state] === image) {
            return;
        }
        if (image) {
            this.statedImages[state] = image;
        } else {
            delete this.statedImages[state];
        }
        this.reloadContents();
    };

    UIButton.prototype.setupTouches = function setupTouches() {
        var _this2 = this;

        this.addGestureRecognizer(new UITapGestureRecognizer_1.UITapGestureRecognizer().on("touch", function () {
            _this2.emit("touchUpInside", _this2);
        }));
        var longPressGesture = new UILongPressGestureRecognizer_1.UILongPressGestureRecognizer();
        longPressGesture.on("began", function () {
            _this2.tracking = true;
            _this2.highlighted = true;
            _this2.emit("touchDown", _this2);
        });
        longPressGesture.on("changed", function (sender) {
            var location = sender.locationInView(undefined);
            var inside = _this2.highlightedPointInside(location);
            if (_this2.touchInside != inside) {
                if (inside) {
                    _this2.emit("touchDragEnter", _this2);
                } else {
                    _this2.emit("touchDragExit", _this2);
                }
            }
            _this2.touchInside = inside;
            _this2.highlighted = _this2.touchInside;
            if (inside) {
                _this2.emit("touchDragInside", _this2);
            } else {
                _this2.emit("touchDragOutside", _this2);
            }
        });
        longPressGesture.on("ended", function (sender) {
            _this2.highlighted = false;
            _this2.tracking = false;
            var location = sender.locationInView(undefined);
            var inside = _this2.highlightedPointInside(location);
            if (inside) {
                _this2.emit("touchUpInside", _this2);
            } else {
                _this2.emit("touchUpOutside", _this2);
            }
        });
        longPressGesture.on("cancelled", function () {
            _this2.highlighted = false;
            _this2.tracking = false;
            _this2.emit("touchCancel", _this2);
        });
        longPressGesture.minimumPressDuration = 0.05;
        this.addGestureRecognizer(longPressGesture);
    };

    UIButton.prototype.tintColorDidChange = function tintColorDidChange() {
        _UIView_1$UIView.prototype.tintColorDidChange.call(this);
        this.reloadContents();
    };

    UIButton.prototype.reloadContents = function reloadContents() {
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
    };

    UIButton.prototype.currentState = function currentState() {
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
    };

    UIButton.prototype.imageForState = function imageForState(state) {
        if (this.statedImages[state] !== undefined) {
            return this.statedImages[state];
        }
        return this.statedImages[0];
    };

    UIButton.prototype.titleForState = function titleForState(state) {
        if (this.statedTitles[state] !== undefined) {
            return this.statedTitles[state];
        }
        return this.statedTitles[0];
    };
    // private attributedTitleForState(state: number): UIAttributedString | undefined {
    //     if (this.statedAttributedTitles[state] !== undefined) {
    //         return this.statedAttributedTitles[state]
    //     }
    //     return this.statedAttributedTitles[0]
    // }


    UIButton.prototype.titleColorForState = function titleColorForState(state) {
        if (this.statedTitleColors[state] !== undefined) {
            return this.statedTitleColors[state];
        }
        if (this.statedTitleColors[0] !== undefined) {
            return this.statedTitleColors[0];
        }
        if (state == UIEnums_1.UIControlState.disabled) {
            return UIColor_1.UIColor.gray.colorWithAlphaComponent(0.75);
        } else {
            return this.tintColor || UIColor_1.UIColor.black;
        }
    };

    UIButton.prototype.highlightedPointInside = function highlightedPointInside(point) {
        return point.x >= -22.0 && point.y >= -22.0 && point.x <= this.frame.width + 22.0 && point.y <= this.frame.height + 22.0;
    };

    UIButton.prototype.buildData = function buildData() {
        var data = _UIView_1$UIView.prototype.buildData.call(this);
        data.text = this.titleLabel.text || "";
        data.textStyle = "\n            color: " + (this.titleLabel.textColor !== undefined ? UIColor_1.UIColor.toStyle(this.titleLabel.textColor) : "black") + ";\n            font-size: " + (this.titleLabel.font !== undefined ? this.titleLabel.font.pointSize : 14) + "px;\n            font-family: " + (this.titleLabel.font !== undefined ? this.titleLabel.font.fontName : "") + "; \n            font-weight: " + (this.titleLabel.font !== undefined ? this.titleLabel.font.fontStyle : "") + "; \n            font-style: " + (this.titleLabel.font !== undefined ? this.titleLabel.font.fontStyle : "") + "; \n            ";
        data.textHeight = this.bounds.height;
        data.imageSource = this.imageView.image ? this.imageView.image.imageSource : null;
        if (this.dirtyFlags["contentAlphaAnimation"]) {
            data.contentAlphaAnimation = wx.createAnimation({ duration: 100, timingFunction: "linear" }).opacity(this.contentAlpha).step().export();
        }
        data.imageMargin = {
            top: this.imageEdgeInsets.top + this.contentEdgeInsets.top,
            left: this.imageEdgeInsets.left + this.contentEdgeInsets.left,
            bottom: this.imageEdgeInsets.bottom + this.contentEdgeInsets.bottom,
            right: this.imageEdgeInsets.right + this.contentEdgeInsets.right
        };
        data.titleMargin = {
            top: this.titleEdgeInsets.top + this.contentEdgeInsets.top,
            left: this.titleEdgeInsets.left + this.contentEdgeInsets.left,
            bottom: this.titleEdgeInsets.bottom + this.contentEdgeInsets.bottom,
            right: this.titleEdgeInsets.right + this.contentEdgeInsets.right
        };
        return data;
    };

    UIButton.prototype.buildStyle = function buildStyle() {
        var style = _UIView_1$UIView.prototype.buildStyle.call(this);
        style += "\n        line-height: " + this.frame.height + "px;\n        ";
        return style;
    };

    UIButton.prototype.layoutSubviews = function layoutSubviews() {
        _UIView_1$UIView.prototype.layoutSubviews.call(this);
        this.markFlagDirty("textHeight");
    };

    _createClass(UIButton, [{
        key: "enabled",
        get: function get() {
            return this._enabled;
        },
        set: function set(value) {
            if (this._enabled === value) {
                return;
            }
            this._enabled = value;
            this.gestureRecognizers.forEach(function (it) {
                it.enabled = value;
            });
            this.reloadContents();
        }
    }, {
        key: "selected",
        get: function get() {
            return this._selected;
        },
        set: function set(value) {
            if (this._selected === value) {
                return;
            }
            this._selected = value;
            this.reloadContents();
        }
    }, {
        key: "highlighted",
        get: function get() {
            return this._highlighted;
        },
        set: function set(value) {
            if (this._highlighted === value) {
                return;
            }
            this._highlighted = value;
            this.reloadContents();
            this.markFlagDirty("contentAlphaAnimation");
        }
    }, {
        key: "tracking",
        get: function get() {
            return this._tracking;
        },
        set: function set(value) {
            if (this._tracking === value) {
                return;
            }
            this._tracking = value;
            this.reloadContents();
        }
    }, {
        key: "touchInside",
        get: function get() {
            return this._touchInside;
        },
        set: function set(value) {
            if (this._touchInside === value) {
                return;
            }
            this._touchInside = value;
            this.reloadContents();
        }
    }, {
        key: "contentVerticalAlignment",
        get: function get() {
            return this._contentVerticalAlignment;
        },
        set: function set(value) {
            if (this._contentVerticalAlignment === value) {
                return;
            }
            this._contentVerticalAlignment = value;
            this.reloadContents();
        }
    }, {
        key: "contentHorizontalAlignment",
        get: function get() {
            return this._contentHorizontalAlignment;
        },
        set: function set(value) {
            if (this._contentHorizontalAlignment === value) {
                return;
            }
            this._contentHorizontalAlignment = value;
            this.reloadContents();
        }
    }, {
        key: "contentEdgeInsets",
        get: function get() {
            return this._contentEdgeInsets;
        },
        set: function set(value) {
            if (UIEdgeInsets_1.UIEdgeInsetsEqualToEdgeInsets(this._contentEdgeInsets, value)) {
                return;
            }
            this._contentEdgeInsets = value;
            this.markFlagDirty("titleMargin");
            this.markFlagDirty("imageMargin");
        }
    }, {
        key: "titleEdgeInsets",
        get: function get() {
            return this._titleEdgeInsets;
        },
        set: function set(value) {
            if (UIEdgeInsets_1.UIEdgeInsetsEqualToEdgeInsets(this._titleEdgeInsets, value)) {
                return;
            }
            this._titleEdgeInsets = value;
            this.markFlagDirty("titleMargin");
        }
    }, {
        key: "imageEdgeInsets",
        get: function get() {
            return this._imageEdgeInsets;
        },
        set: function set(value) {
            if (UIEdgeInsets_1.UIEdgeInsetsEqualToEdgeInsets(this._imageEdgeInsets, value)) {
                return;
            }
            this._imageEdgeInsets = value;
            this.markFlagDirty("imageMargin");
        }
    }]);

    return UIButton;
}(UIView_1.UIView);

exports.UIButton = UIButton;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var UIView_1 = __webpack_require__(1);
var UIScrollView_1 = __webpack_require__(20);
var UIRect_1 = __webpack_require__(9);
var UIIndexPath_1 = __webpack_require__(26);
var UISize_1 = __webpack_require__(13);
var UIAffineTransform_1 = __webpack_require__(22);
var UIPoint_1 = __webpack_require__(11);
var UIAnimator_1 = __webpack_require__(7);
var EventEmitter_1 = __webpack_require__(12);
var UITouch_1 = __webpack_require__(10);
var ItemType;
(function (ItemType) {
    ItemType[ItemType["cell"] = 0] = "cell";
    ItemType[ItemType["supplementaryView"] = 1] = "supplementaryView";
    ItemType[ItemType["decorationView"] = 2] = "decorationView";
})(ItemType = exports.ItemType || (exports.ItemType = {}));
exports.UICollectionElementKindCell = "UICollectionElementKindCell";
var itemKeyCache = {};

var UICollectionViewItemKey = function () {
    function UICollectionViewItemKey() {
        var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ItemType.cell;
        var indexPath = arguments[1];
        var identifier = arguments[2];

        _classCallCheck(this, UICollectionViewItemKey);

        this.type = type;
        this.indexPath = indexPath;
        this.identifier = identifier;
    }

    UICollectionViewItemKey.collectionItemKeyForCellWithIndexPath = function collectionItemKeyForCellWithIndexPath(indexPath) {
        var hashKey = 0 + "," + indexPath.mapKey() + ",UICollectionElementKindCell";
        if (itemKeyCache[hashKey] !== undefined) {
            return itemKeyCache[hashKey];
        } else {
            var value = new UICollectionViewItemKey(ItemType.cell, indexPath, exports.UICollectionElementKindCell);
            itemKeyCache[hashKey] = value;
            return value;
        }
    };

    UICollectionViewItemKey.collectionItemKeyForLayoutAttributes = function collectionItemKeyForLayoutAttributes(layoutAttributes) {
        var hashKey = layoutAttributes.representedElementCategory + "," + layoutAttributes.indexPath.mapKey() + "," + layoutAttributes.representedElementKind;
        if (itemKeyCache[hashKey] !== undefined) {
            return itemKeyCache[hashKey];
        } else {
            var value = new UICollectionViewItemKey(layoutAttributes.representedElementCategory, layoutAttributes.indexPath, layoutAttributes.representedElementKind);
            itemKeyCache[hashKey] = value;
            return value;
        }
    };

    return UICollectionViewItemKey;
}();

exports.UICollectionViewItemKey = UICollectionViewItemKey;

var UICollectionViewLayoutAttributes = function () {
    function UICollectionViewLayoutAttributes(indexPath) {
        var elementKind = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
        var representedElementCategory = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ItemType.cell;

        _classCallCheck(this, UICollectionViewLayoutAttributes);

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

    UICollectionViewLayoutAttributes.prototype.isDecorationView = function isDecorationView() {
        return this.representedElementCategory === ItemType.decorationView;
    };

    UICollectionViewLayoutAttributes.prototype.isSupplementaryView = function isSupplementaryView() {
        return this.representedElementCategory === ItemType.supplementaryView;
    };

    UICollectionViewLayoutAttributes.prototype.isCell = function isCell() {
        return this.representedElementCategory === ItemType.cell;
    };

    UICollectionViewLayoutAttributes.layoutAttributesForCellWithIndexPath = function layoutAttributesForCellWithIndexPath(indexPath) {
        return new UICollectionViewLayoutAttributes(indexPath, exports.UICollectionElementKindCell, ItemType.cell);
    };

    UICollectionViewLayoutAttributes.layoutAttributesForSupplementaryViewOfKind = function layoutAttributesForSupplementaryViewOfKind(elementKind, indexPath) {
        return new UICollectionViewLayoutAttributes(indexPath, elementKind, ItemType.supplementaryView);
    };

    UICollectionViewLayoutAttributes.layoutAttributesForDecorationViewOfKind = function layoutAttributesForDecorationViewOfKind(elementKind, indexPath) {
        return new UICollectionViewLayoutAttributes(indexPath, elementKind, ItemType.decorationView);
    };

    return UICollectionViewLayoutAttributes;
}();

exports.UICollectionViewLayoutAttributes = UICollectionViewLayoutAttributes;

var UICollectionViewLayout = function (_EventEmitter_1$Event) {
    _inherits(UICollectionViewLayout, _EventEmitter_1$Event);

    function UICollectionViewLayout() {
        _classCallCheck(this, UICollectionViewLayout);

        var _this = _possibleConstructorReturn(this, _EventEmitter_1$Event.apply(this, arguments));

        _this.layoutAttributesClass = UICollectionViewLayoutAttributes;
        _this.collectionView = undefined;
        return _this;
    }

    UICollectionViewLayout.prototype.prepareLayout = function prepareLayout() {};

    UICollectionViewLayout.prototype.invalidateLayout = function invalidateLayout() {
        if (this.collectionView && this.collectionView._collectionViewData) {
            this.collectionView._collectionViewData.invalidate();
        }
        if (this.collectionView) {
            this.collectionView.setNeedsLayout(true);
        }
    };

    UICollectionViewLayout.prototype.layoutAttributesForElementsInRect = function layoutAttributesForElementsInRect(rect) {
        return [];
    };

    UICollectionViewLayout.prototype.layoutAttributesForItemAtIndexPath = function layoutAttributesForItemAtIndexPath(indexPath) {
        return undefined;
    };

    UICollectionViewLayout.prototype.layoutAttributesForSupplementaryViewOfKind = function layoutAttributesForSupplementaryViewOfKind(kind, indexPath) {
        return undefined;
    };

    UICollectionViewLayout.prototype.layoutAttributesForDecorationViewOfKind = function layoutAttributesForDecorationViewOfKind(kind, indexPath) {
        return undefined;
    };

    UICollectionViewLayout.prototype.collectionViewContentSize = function collectionViewContentSize() {
        return UISize_1.UISizeZero;
    };

    return UICollectionViewLayout;
}(EventEmitter_1.EventEmitter);

exports.UICollectionViewLayout = UICollectionViewLayout;

var UICollectionView = function (_UIScrollView_1$UIScr) {
    _inherits(UICollectionView, _UIScrollView_1$UIScr);

    function UICollectionView(collectionViewLayout) {
        _classCallCheck(this, UICollectionView);

        var _this2 = _possibleConstructorReturn(this, _UIScrollView_1$UIScr.call(this));

        _this2.collectionViewLayout = collectionViewLayout;
        _this2.allowsSelection = true;
        _this2.allowsMultipleSelection = false;
        // Implementations
        _this2._allVisibleViewsDict = new Map();
        _this2._indexPathsForSelectedItems = [];
        _this2._indexPathsForHighlightedItems = [];
        _this2._registeredCells = {};
        _this2._collectionViewData = new UICollectionViewData(_this2, _this2.collectionViewLayout);
        _this2._cellReuseQueues = {};
        _this2._supplementaryViewReuseQueues = {};
        _this2._decorationViewReuseQueues = {};
        _this2.firstTouchPoint = undefined;
        _this2.firstTouchCell = undefined;
        collectionViewLayout.collectionView = _this2;
        return _this2;
    }

    UICollectionView.prototype.register = function register(initializer, reuseIdentifier) {
        this._registeredCells[reuseIdentifier] = initializer;
    };

    UICollectionView.prototype.dequeueReusableCell = function dequeueReusableCell(reuseIdentifier, indexPath) {
        if (this._cellReuseQueues[reuseIdentifier] && this._cellReuseQueues[reuseIdentifier].length > 0) {
            var _cell = this._cellReuseQueues[reuseIdentifier][0];
            if (_cell instanceof UICollectionViewCell) {
                this._cellReuseQueues[reuseIdentifier].splice(0, 1);
                return _cell;
            }
        }
        var initializer = this._registeredCells[reuseIdentifier];
        if (!initializer) {
            return new UICollectionViewCell();
        }
        var cell = initializer(undefined);
        cell.reuseIdentifier = reuseIdentifier;
        cell.collectionView = this;
        return cell;
    };

    UICollectionView.prototype.allCells = function allCells() {
        var result = [];
        this._allVisibleViewsDict.forEach(function (it) {
            if (it instanceof UICollectionViewCell) {
                result.push(it);
            }
        });
        return result;
    };

    UICollectionView.prototype.visibleCells = function visibleCells() {
        var _this3 = this;

        return this.allCells().filter(function (it) {
            return UIRect_1.UIRectIntersectsRect(_this3.visibleBoundRects, it.frame);
        });
    };

    UICollectionView.prototype.reloadData = function reloadData() {
        var _this4 = this;

        if (this.fetchMoreControl && this.fetchMoreControl.fetching) {
            this.invalidateLayout();
            this.setNeedsLayout(true);
            return;
        }
        this.invalidateLayout();
        this._allVisibleViewsDict.forEach(function (it) {
            it.hidden = true;
        });
        this._allVisibleViewsDict.clear();
        this._indexPathsForSelectedItems.forEach(function (it) {
            var cell = _this4.cellForItemAtIndexPath(it);
            if (cell) {
                cell.selected = false;
                cell.highlighted = false;
            }
        });
        this._indexPathsForSelectedItems = [];
        this._indexPathsForHighlightedItems = [];
        this.setNeedsLayout(true);
    };

    UICollectionView.prototype.selectItem = function selectItem(indexPath, animated) {
        var _this5 = this;

        if (!this.allowsMultipleSelection) {
            this._indexPathsForSelectedItems.forEach(function (indexPath) {
                _this5._allVisibleViewsDict.forEach(function (it) {
                    if (it instanceof UICollectionViewCell && it.currentIndexPath && it.currentIndexPath.mapKey() === indexPath.mapKey()) {
                        it.selected = false;
                        _this5.emit("didDeselectItem", it.currentIndexPath, it);
                    }
                });
            });
            this._indexPathsForSelectedItems = [];
        }
        this._indexPathsForSelectedItems.push(indexPath);
        if (animated) {
            UIAnimator_1.UIAnimator.linear(0.5, function () {
                _this5._allVisibleViewsDict.forEach(function (it) {
                    if (it instanceof UICollectionViewCell && it.currentIndexPath && it.currentIndexPath.mapKey() === indexPath.mapKey()) {
                        it.selected = true;
                    }
                });
            }, undefined);
        } else {
            this._allVisibleViewsDict.forEach(function (it) {
                if (it instanceof UICollectionViewCell && it.currentIndexPath && it.currentIndexPath.mapKey() === indexPath.mapKey()) {
                    it.selected = true;
                }
            });
        }
    };

    UICollectionView.prototype.deselectItem = function deselectItem(indexPath, animated) {
        var _this6 = this;

        {
            var idx = this._indexPathsForSelectedItems.map(function (it) {
                return it.mapKey();
            }).indexOf(indexPath.mapKey());
            if (idx >= 0) {
                this._indexPathsForSelectedItems.splice(idx, 1);
            }
        }
        if (animated) {
            UIAnimator_1.UIAnimator.linear(0.5, function () {
                _this6._allVisibleViewsDict.forEach(function (it) {
                    if (it instanceof UICollectionViewCell && it.currentIndexPath && it.currentIndexPath.mapKey() === indexPath.mapKey()) {
                        it.selected = false;
                    }
                });
            }, undefined);
        } else {
            this._allVisibleViewsDict.forEach(function (it) {
                if (it instanceof UICollectionViewCell && it.currentIndexPath && it.currentIndexPath.mapKey() === indexPath.mapKey()) {
                    it.selected = false;
                }
            });
        }
    };
    // Query Grid


    UICollectionView.prototype.numberOfSections = function numberOfSections() {
        return this._collectionViewData.numberOfSections();
    };

    UICollectionView.prototype.numberOfItemsInSection = function numberOfItemsInSection(section) {
        return this._collectionViewData.numberOfItemsInSection(section);
    };

    UICollectionView.prototype.layoutAttributesForItemAtIndexPath = function layoutAttributesForItemAtIndexPath(indexPath) {
        return this.collectionViewLayout.layoutAttributesForItemAtIndexPath(indexPath);
    };

    UICollectionView.prototype.layoutAttributesForSupplementaryElementOfKind = function layoutAttributesForSupplementaryElementOfKind(kind, indexPath) {
        return this.collectionViewLayout.layoutAttributesForSupplementaryViewOfKind(kind, indexPath);
    };

    UICollectionView.prototype.indexPathForItemAtPoint = function indexPathForItemAtPoint(point) {
        var targets = this.collectionViewLayout.layoutAttributesForElementsInRect({ x: point.x, y: point.y, width: 1.0, height: 1.0 });
        return targets[targets.length - 1].indexPath;
    };

    UICollectionView.prototype.indexPathForCell = function indexPathForCell(cell) {
        var keys = this._allVisibleViewsDict.keys();
        while (true) {
            var element = keys.next();
            if (element.done) {
                break;
            }
            if (this._allVisibleViewsDict.get(element.value) === cell) {
                return element.value.indexPath;
            }
        }
        return undefined;
    };

    UICollectionView.prototype.cellForItemAtIndexPath = function cellForItemAtIndexPath(indexPath) {
        var keys = this._allVisibleViewsDict.keys();
        while (true) {
            var element = keys.next();
            if (element.done) {
                break;
            }
            if (element.value.indexPath.mapKey() === indexPath.mapKey()) {
                var cell = this._allVisibleViewsDict.get(element.value);
                if (cell instanceof UICollectionViewCell) {
                    return cell;
                }
            }
        }
        return undefined;
    };

    UICollectionView.prototype.indexPathsForVisibleItems = function indexPathsForVisibleItems() {
        return this.visibleCells().filter(function (it) {
            return it.layoutAttributes !== undefined;
        }).map(function (it) {
            return it.layoutAttributes.indexPath;
        });
    };

    UICollectionView.prototype.indexPathsForSelectedItems = function indexPathsForSelectedItems() {
        return this._indexPathsForSelectedItems;
    };

    UICollectionView.prototype.layoutSubviews = function layoutSubviews() {
        _UIScrollView_1$UIScr.prototype.layoutSubviews.call(this);
        this.layoutCollectionViews();
    };
    // Private


    UICollectionView.prototype.layoutCollectionViews = function layoutCollectionViews() {
        this._collectionViewData.validateLayoutInRect(this.visibleBoundRects);
        var contentRect = this._collectionViewData.collectionViewContentRect();
        this.contentSize = contentRect;
        this._collectionViewData.validateLayoutInRect(this.visibleBoundRects);
        this.updateVisibleCellsNow(true);
    };

    UICollectionView.prototype.invalidateLayout = function invalidateLayout() {
        this.collectionViewLayout.invalidateLayout();
        this._collectionViewData.invalidate();
    };

    UICollectionView.prototype.updateVisibleCellsNow = function updateVisibleCellsNow() {
        var _this7 = this;

        var now = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        var layoutAttributesArray = this._collectionViewData.layoutAttributesForElementsInRect(this.visibleBoundRects);
        if (layoutAttributesArray.length === 0) {
            return;
        }
        var itemKeysToAddDict = new Map();
        layoutAttributesArray.forEach(function (layoutAttributes) {
            var itemKey = UICollectionViewItemKey.collectionItemKeyForLayoutAttributes(layoutAttributes);
            itemKeysToAddDict.set(itemKey, layoutAttributes);
            var view = _this7._allVisibleViewsDict.get(itemKey);
            if (view instanceof UICollectionReusableView) {
                if (view instanceof UICollectionViewCell) {
                    if (_this7.fetchMoreControl && _this7.fetchMoreControl.fetching && view.currentIndexPath && view.currentIndexPath.mapKey() === itemKey.indexPath.mapKey()) {
                        return;
                    }
                    view.currentIndexPath = itemKey.indexPath;
                    view.highlighted = _this7._indexPathsForHighlightedItems.map(function (it) {
                        return it.mapKey();
                    }).indexOf(itemKey.indexPath.mapKey()) >= 0;
                    view.selected = _this7._indexPathsForSelectedItems.map(function (it) {
                        return it.mapKey();
                    }).indexOf(itemKey.indexPath.mapKey()) >= 0;
                }
                view.applyLayoutAttributes(layoutAttributes);
            } else {
                switch (itemKey.type) {
                    case ItemType.cell:
                        {
                            view = _this7.createPreparedCellForItemAtIndexPath(itemKey.indexPath, layoutAttributes);
                            if (view instanceof UICollectionViewCell) {
                                view.currentIndexPath = itemKey.indexPath;
                                view.highlighted = _this7._indexPathsForHighlightedItems.map(function (it) {
                                    return it.mapKey();
                                }).indexOf(itemKey.indexPath.mapKey()) >= 0;
                                view.selected = _this7._indexPathsForSelectedItems.map(function (it) {
                                    return it.mapKey();
                                }).indexOf(itemKey.indexPath.mapKey()) >= 0;
                            }
                            break;
                        }
                    case ItemType.supplementaryView:
                        {
                            view = _this7.createPreparedSupplementaryViewForElementOfKind(layoutAttributes.representedElementKind, layoutAttributes.indexPath, layoutAttributes);
                            break;
                        }
                    case ItemType.decorationView:
                        {
                            view = undefined;
                        }
                }
                if (view instanceof UICollectionReusableView) {
                    _this7._allVisibleViewsDict.set(itemKey, view);
                    _this7.addControlledSubview(view);
                    view.applyLayoutAttributes(layoutAttributes);
                }
            }
        });
        var allVisibleItemKeys = function () {
            var keys = [];
            var keySet = _this7._allVisibleViewsDict.keys();
            while (true) {
                var key = keySet.next();
                if (key.done) {
                    break;
                }
                keys.push(key.value);
            }
            return keys;
        }();
        itemKeysToAddDict.forEach(function (_, it) {
            var idx = allVisibleItemKeys.indexOf(it);
            if (idx >= 0) {
                allVisibleItemKeys.splice(idx, 1);
            }
        });
        allVisibleItemKeys.forEach(function (itemKey) {
            var reusableView = _this7._allVisibleViewsDict.get(itemKey);
            if (reusableView) {
                reusableView.hidden = true;
                _this7._allVisibleViewsDict.delete(itemKey);
                switch (itemKey.type) {
                    case ItemType.cell:
                        {
                            _this7.reuseCell(reusableView);
                            break;
                        }
                    case ItemType.supplementaryView:
                        {
                            _this7.reuseSupplementaryView(reusableView);
                            break;
                        }
                    case ItemType.decorationView:
                        {
                            _this7.reuseDecorationView(reusableView);
                            break;
                        }
                }
            }
        });
    };

    UICollectionView.prototype.createPreparedCellForItemAtIndexPath = function createPreparedCellForItemAtIndexPath(indexPath, layoutAttributes) {
        var cell = this.__cellForItemAtIndexPath(this, indexPath);
        return cell;
    };

    UICollectionView.prototype.createPreparedSupplementaryViewForElementOfKind = function createPreparedSupplementaryViewForElementOfKind(kind, indexPath, layoutAttributes) {
        var view = this.__viewForSupplementaryElementOfKind(this, kind, indexPath);
        if (view) {
            view.applyLayoutAttributes(layoutAttributes);
        }
        return view;
    };

    UICollectionView.prototype.addControlledSubview = function addControlledSubview(subview) {
        if (subview.superview === undefined) {
            this.addSubview(subview);
        }
        subview.hidden = false;
    };

    UICollectionView.prototype.queueReusableView = function queueReusableView(reusableView, queue, identifier) {
        reusableView.hidden = true;
        reusableView.prepareForReuse();
        if (queue[identifier] === undefined) {
            queue[identifier] = [];
        }
        var reusableViews = queue[identifier] || [];
        reusableViews.push(reusableView);
    };

    UICollectionView.prototype.reuseCell = function reuseCell(cell) {
        var reuseIdentifier = cell.reuseIdentifier;
        if (reuseIdentifier === undefined) {
            return;
        }
        this.queueReusableView(cell, this._cellReuseQueues, reuseIdentifier);
    };

    UICollectionView.prototype.reuseSupplementaryView = function reuseSupplementaryView(supplementaryView) {
        var layoutAttributes = supplementaryView.layoutAttributes;
        var reuseIdentifier = supplementaryView.reuseIdentifier;
        if (layoutAttributes === undefined || reuseIdentifier === undefined) {
            return;
        }
        var kindAndIdentifier = "${layoutAttributes.elementKind}/$reuseIdentifier";
        this.queueReusableView(supplementaryView, this._supplementaryViewReuseQueues, kindAndIdentifier);
    };

    UICollectionView.prototype.reuseDecorationView = function reuseDecorationView(decorationView) {
        var reuseIdentifier = decorationView.reuseIdentifier;
        if (reuseIdentifier === undefined) {
            return;
        }
        this.queueReusableView(decorationView, this._decorationViewReuseQueues, reuseIdentifier);
    };
    // Touches


    UICollectionView.prototype.touchesBegan = function touchesBegan(touches) {
        _UIScrollView_1$UIScr.prototype.touchesBegan.call(this, touches);
        var firstTouch = touches[0];
        if (!firstTouch) {
            return;
        }
        this.handleTouch(UITouch_1.UITouchPhase.began, firstTouch);
    };

    UICollectionView.prototype.touchesMoved = function touchesMoved(touches) {
        _UIScrollView_1$UIScr.prototype.touchesMoved.call(this, touches);
        var firstTouch = touches[0];
        if (!firstTouch) {
            return;
        }
        this.handleTouch(UITouch_1.UITouchPhase.moved, firstTouch);
    };

    UICollectionView.prototype.touchesEnded = function touchesEnded(touches) {
        _UIScrollView_1$UIScr.prototype.touchesEnded.call(this, touches);
        var firstTouch = touches[0];
        if (!firstTouch) {
            return;
        }
        this.handleTouch(UITouch_1.UITouchPhase.ended, firstTouch);
    };

    UICollectionView.prototype.touchesCancelled = function touchesCancelled(touches) {
        _UIScrollView_1$UIScr.prototype.touchesCancelled.call(this, touches);
        var firstTouch = touches[0];
        if (!firstTouch) {
            return;
        }
        this.handleTouch(UITouch_1.UITouchPhase.cancelled, firstTouch);
    };

    UICollectionView.prototype.handleTouch = function handleTouch(phase, currentTouch) {
        var _this8 = this;

        if (!this.allowsSelection) {
            return;
        }
        switch (phase) {
            case UITouch_1.UITouchPhase.began:
                {
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
                                setTimeout(function () {
                                    if (_this8.firstTouchPoint === undefined || !(hitTestView instanceof UICollectionViewCell)) {
                                        return;
                                    }
                                    if (hitTestView.currentIndexPath) {
                                        _this8._indexPathsForHighlightedItems.push(hitTestView.currentIndexPath);
                                    }
                                    hitTestView.highlighted = true;
                                }, 150);
                            }
                        }
                    }
                    break;
                }
            case UITouch_1.UITouchPhase.moved:
                {
                    if (this.firstTouchPoint && currentTouch.windowPoint) {
                        if (UIView_1.UIView.recognizedGesture !== undefined || Math.abs(currentTouch.windowPoint.y - this.firstTouchPoint.y) > 8) {
                            this._indexPathsForHighlightedItems = [];
                            this._allVisibleViewsDict.forEach(function (it) {
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
            case UITouch_1.UITouchPhase.ended:
                {
                    if (this.firstTouchCell) {
                        var cell = this.firstTouchCell;
                        this._indexPathsForHighlightedItems = [];
                        if (!this.allowsMultipleSelection) {
                            this._indexPathsForSelectedItems.forEach(function (indexPath) {
                                _this8._allVisibleViewsDict.forEach(function (it, key) {
                                    if (key.indexPath && key.indexPath.mapKey() === indexPath.mapKey()) {
                                        if (it instanceof UICollectionViewCell) {
                                            it.selected = false;
                                            _this8.emit("didDeselectItem", it.currentIndexPath, it);
                                        }
                                    }
                                });
                            });
                            this._indexPathsForSelectedItems = [];
                        }
                        this.firstTouchPoint = undefined;
                        this.firstTouchCell = undefined;
                        this._indexPathsForHighlightedItems = [];
                        this._allVisibleViewsDict.forEach(function (it) {
                            if (it instanceof UICollectionViewCell) {
                                it.highlighted = false;
                            }
                        });
                        if (cell.currentIndexPath) {
                            var idx = this._indexPathsForSelectedItems.map(function (it) {
                                return it.mapKey();
                            }).indexOf(cell.currentIndexPath.mapKey());
                            if (idx >= 0) {
                                this._indexPathsForSelectedItems.splice(idx, 1);
                            } else {
                                this._indexPathsForSelectedItems.push(cell.currentIndexPath);
                            }
                        }
                        cell.selected = !cell.selected;
                        if (cell.selected) {
                            this.emit("didSelectItem", cell.currentIndexPath, cell);
                        } else {
                            this.emit("didDeselectItem", cell.currentIndexPath, cell);
                        }
                    } else {
                        this.firstTouchPoint = undefined;
                        this.firstTouchCell = undefined;
                        this._indexPathsForHighlightedItems = [];
                        this._allVisibleViewsDict.forEach(function (it) {
                            if (it instanceof UICollectionViewCell) {
                                it.highlighted = false;
                            }
                        });
                    }
                    break;
                }
            case UITouch_1.UITouchPhase.cancelled:
                {
                    this.firstTouchPoint = undefined;
                    this.firstTouchCell = undefined;
                    this._indexPathsForHighlightedItems = [];
                    this._allVisibleViewsDict.forEach(function (it) {
                        if (it instanceof UICollectionViewCell) {
                            it.highlighted = false;
                        }
                    });
                    break;
                }
        }
    };
    // DataSource & Delegate


    UICollectionView.prototype.__cellForItemAtIndexPath = function __cellForItemAtIndexPath(collectionView, indexPath) {
        return collectionView.val("cellForItem", indexPath) || new UICollectionViewCell();
    };

    UICollectionView.prototype.__viewForSupplementaryElementOfKind = function __viewForSupplementaryElementOfKind(collectionView, kind, indexPath) {
        return undefined;
    };

    UICollectionView.prototype.__numberOfSections = function __numberOfSections(collectionView) {
        var value = collectionView.val("numberOfSections");
        return typeof value === "number" ? value : 1;
    };

    UICollectionView.prototype.__numberOfItemsInSection = function __numberOfItemsInSection(collectionView, inSection) {
        var value = collectionView.val("numberOfItems", inSection);
        return typeof value === "number" ? value : 0;
    };

    _createClass(UICollectionView, [{
        key: "visibleBoundRects",
        get: function get() {
            return { x: 0.0, y: 0.0, width: Math.max(this.bounds.width, this.contentSize.width), height: Math.max(this.bounds.height, this.contentSize.height) };
        }
    }]);

    return UICollectionView;
}(UIScrollView_1.UIScrollView);

exports.UICollectionView = UICollectionView;

var UICollectionReusableView = function (_UIView_1$UIView) {
    _inherits(UICollectionReusableView, _UIView_1$UIView);

    function UICollectionReusableView() {
        _classCallCheck(this, UICollectionReusableView);

        var _this9 = _possibleConstructorReturn(this, _UIView_1$UIView.apply(this, arguments));

        _this9.collectionView = undefined;
        _this9.layoutAttributes = undefined;
        _this9.reuseIdentifier = undefined;
        return _this9;
    }

    UICollectionReusableView.prototype.prepareForReuse = function prepareForReuse() {
        this.layoutAttributes = undefined;
    };

    UICollectionReusableView.prototype.applyLayoutAttributes = function applyLayoutAttributes(layoutAttributes) {
        if (layoutAttributes !== this.layoutAttributes) {
            this.layoutAttributes = layoutAttributes;
            this.frame = layoutAttributes.frame;
            this.transform = layoutAttributes.transform;
        }
    };

    return UICollectionReusableView;
}(UIView_1.UIView);

exports.UICollectionReusableView = UICollectionReusableView;

var UICollectionViewCell = function (_UICollectionReusable) {
    _inherits(UICollectionViewCell, _UICollectionReusable);

    function UICollectionViewCell() {
        _classCallCheck(this, UICollectionViewCell);

        var _this10 = _possibleConstructorReturn(this, _UICollectionReusable.call(this));

        _this10._selected = false;
        _this10._highlighted = false;
        _this10.contentView = new UIView_1.UIView();
        _this10.currentIndexPath = undefined;
        _this10.addSubview(_this10.contentView);
        return _this10;
    }

    UICollectionViewCell.prototype.prepareForReuse = function prepareForReuse() {
        _UICollectionReusable.prototype.prepareForReuse.call(this);
        this.selected = false;
        this.highlighted = false;
    };

    UICollectionViewCell.prototype.layoutSubviews = function layoutSubviews() {
        _UICollectionReusable.prototype.layoutSubviews.call(this);
        this.contentView.frame = this.bounds;
    };

    _createClass(UICollectionViewCell, [{
        key: "selected",
        get: function get() {
            return this._selected;
        },
        set: function set(value) {
            this._selected = value;
            this.emit("selected", this, value);
        }
    }, {
        key: "highlighted",
        get: function get() {
            return this._highlighted;
        },
        set: function set(value) {
            this._highlighted = value;
            this.emit("highlighted", this, value);
        }
    }]);

    return UICollectionViewCell;
}(UICollectionReusableView);

exports.UICollectionViewCell = UICollectionViewCell;

var UICollectionViewData = function () {
    function UICollectionViewData(collectionView, layout) {
        _classCallCheck(this, UICollectionViewData);

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

    UICollectionViewData.prototype.validateLayoutInRect = function validateLayoutInRect(rect) {
        this.validateItemCounts();
        this.prepareToLoadData();
        if (this.validLayoutRect === undefined || !UIRect_1.UIRectEqualToRect(this.validLayoutRect, rect)) {
            this.validLayoutRect = rect;
            this.cachedLayoutAttributes = this.layout.layoutAttributesForElementsInRect(rect).filter(function (it) {
                return it.isCell() || it.isDecorationView() || it.isSupplementaryView();
            });
        }
    };

    UICollectionViewData.prototype.rectForItemAtIndexPath = function rectForItemAtIndexPath(indexPath) {
        return UIRect_1.UIRectZero;
    };

    UICollectionViewData.prototype.globalIndexForItemAtIndexPath = function globalIndexForItemAtIndexPath(indexPath) {
        return this.numberOfItemsBeforeSection(indexPath.section) + indexPath.row;
    };

    UICollectionViewData.prototype.indexPathForItemAtGlobalIndex = function indexPathForItemAtGlobalIndex(index) {
        this.validateItemCounts();
        var section = 0;
        var countItems = 0;
        for (var i = 0; i < this._numSections; i++) {
            var _section = i;
            var countIncludingThisSection = countItems + this._sectionItemCounts[_section];
            if (countIncludingThisSection > index) {
                break;
            }
            countItems = countIncludingThisSection;
        }
        var item = index - countItems;
        return new UIIndexPath_1.UIIndexPath(item, section);
    };

    UICollectionViewData.prototype.layoutAttributesForElementsInRect = function layoutAttributesForElementsInRect(rect) {
        this.validateLayoutInRect(rect);
        return this.cachedLayoutAttributes;
    };

    UICollectionViewData.prototype.invalidate = function invalidate() {
        this.itemCountsAreValid = false;
        this.layoutIsPrepared = false;
        this.validLayoutRect = undefined;
    };

    UICollectionViewData.prototype.numberOfItemsBeforeSection = function numberOfItemsBeforeSection(section) {
        this.validateItemCounts();
        var returnCount = 0;
        for (var i = 0; i < section; i++) {
            returnCount += this._sectionItemCounts[i];
        }
        return returnCount;
    };

    UICollectionViewData.prototype.numberOfItemsInSection = function numberOfItemsInSection(section) {
        this.validateItemCounts();
        if (section >= this._numSections || section < 0) {
            return 0;
        }
        return this._sectionItemCounts[section];
    };

    UICollectionViewData.prototype.numberOfItems = function numberOfItems() {
        this.validateItemCounts();
        return this._numItems;
    };

    UICollectionViewData.prototype.numberOfSections = function numberOfSections() {
        this.validateItemCounts();
        return this._numSections;
    };

    UICollectionViewData.prototype.collectionViewContentRect = function collectionViewContentRect() {
        return { x: 0.0, y: 0.0, width: this.contentSize.width, height: this.contentSize.height };
    };

    UICollectionViewData.prototype.updateItemCounts = function updateItemCounts() {
        var collectionView = this.collectionView;
        this._numSections = collectionView.__numberOfSections(collectionView);
        if (this._numSections <= 0) {
            this._numItems = 0;
            this._sectionItemCounts = [];
            this.itemCountsAreValid = true;
            return;
        }
        this._numItems = 0;
        var sectionItemCounts = [];
        for (var index = 0; index < this._numSections; index++) {
            var cellCount = collectionView.__numberOfItemsInSection(collectionView, index);
            sectionItemCounts.push(cellCount);
            this._numItems += cellCount;
        }
        this._sectionItemCounts = sectionItemCounts;
        this.itemCountsAreValid = true;
    };

    UICollectionViewData.prototype.validateItemCounts = function validateItemCounts() {
        if (!this.itemCountsAreValid) {
            this.updateItemCounts();
        }
    };

    UICollectionViewData.prototype.prepareToLoadData = function prepareToLoadData() {
        if (!this.layoutIsPrepared) {
            this.layout.prepareLayout();
            this.contentSize = this.layout.collectionViewContentSize();
            this.layoutIsPrepared = true;
        }
    };

    return UICollectionViewData;
}();

exports.UICollectionViewData = UICollectionViewData;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var UIGestureRecognizer_1 = __webpack_require__(14);
var UIView_1 = __webpack_require__(1);
var UITouch_1 = __webpack_require__(10);

var UIPanGestureRecognizer = function (_UIGestureRecognizer_) {
    _inherits(UIPanGestureRecognizer, _UIGestureRecognizer_);

    function UIPanGestureRecognizer() {
        _classCallCheck(this, UIPanGestureRecognizer);

        var _this = _possibleConstructorReturn(this, _UIGestureRecognizer_.apply(this, arguments));

        _this.lockedDirection = undefined;
        _this.firstTouch = undefined;
        _this.translationPoint = undefined;
        _this.beganPoints = {};
        return _this;
    }

    UIPanGestureRecognizer.prototype.translationInView = function translationInView(view) {
        if (!this.firstTouch) {
            return { x: 0, y: 0 };
        }
        var windowPoint = this.firstTouch.windowPoint;
        if (!windowPoint) {
            return { x: 0, y: 0 };
        }
        var translationPoint = this.translationPoint;
        if (!translationPoint) {
            return { x: 0, y: 0 };
        }
        return { x: windowPoint.x - translationPoint.x, y: windowPoint.y - translationPoint.y };
    };

    UIPanGestureRecognizer.prototype.setTranslation = function setTranslation(translation, inView) {
        if (!this.firstTouch) {
            return;
        }
        var windowPoint = this.firstTouch.windowPoint;
        if (!windowPoint) {
            return;
        }
        this.translationPoint = { x: windowPoint.x - translation.x, y: windowPoint.y - translation.y };
    };

    UIPanGestureRecognizer.prototype.velocityInView = function velocityInView(view) {
        UIView_1.sharedVelocityTracker.computeCurrentVelocity();
        return UIView_1.sharedVelocityTracker.velocity;
    };

    UIPanGestureRecognizer.prototype.handleTouch = function handleTouch(touches) {
        var _this2 = this;

        _UIGestureRecognizer_.prototype.handleTouch.call(this, touches);
        touches.forEach(function (it) {
            if (it.identifier == 0) {
                _this2.firstTouch = it;
            }
            if (it.phase == UITouch_1.UITouchPhase.began) {
                if (UIView_1.UIView.recognizedGesture != undefined && UIView_1.UIView.recognizedGesture != _this2) {
                    _this2.beganPoints = {};
                    return;
                }
                if (it.windowPoint) {
                    _this2.beganPoints[it.identifier] = it.windowPoint;
                }
                if (it.identifier == 0) {
                    _this2.translationPoint = it.windowPoint;
                }
            } else if (it.phase == UITouch_1.UITouchPhase.moved) {
                if (_this2.state == UIGestureRecognizer_1.UIGestureRecognizerState.possible) {
                    if (UIView_1.UIView.recognizedGesture != undefined && UIView_1.UIView.recognizedGesture != _this2) {
                        _this2.state = UIGestureRecognizer_1.UIGestureRecognizerState.failed;
                        return;
                    }
                    if (it.windowPoint && _this2.beganPoints[it.identifier]) {
                        var beganPoint = _this2.beganPoints[it.identifier];
                        if (_this2.lockedDirection !== undefined) {
                            if (_this2.lockedDirection === 1) {
                                if (Math.abs(beganPoint.y - it.windowPoint.y) >= 8.0) {
                                    UIView_1.UIView.recognizedGesture = _this2;
                                    _this2.state = UIGestureRecognizer_1.UIGestureRecognizerState.began;
                                    _this2.handleEvent("began");
                                    _this2.emit("began", _this2);
                                }
                            } else if (_this2.lockedDirection === 2) {
                                if (Math.abs(beganPoint.x - it.windowPoint.x) >= 8.0) {
                                    UIView_1.UIView.recognizedGesture = _this2;
                                    _this2.state = UIGestureRecognizer_1.UIGestureRecognizerState.began;
                                    _this2.handleEvent("began");
                                    _this2.emit("began", _this2);
                                }
                            }
                        } else {
                            if (Math.abs(beganPoint.x - it.windowPoint.x) >= 8.0 || Math.abs(beganPoint.y - it.windowPoint.y) >= 8.0) {
                                UIView_1.UIView.recognizedGesture = _this2;
                                _this2.state = UIGestureRecognizer_1.UIGestureRecognizerState.began;
                                _this2.handleEvent("began");
                                _this2.emit("began", _this2);
                            }
                        }
                    }
                } else if (_this2.state == UIGestureRecognizer_1.UIGestureRecognizerState.began || _this2.state == UIGestureRecognizer_1.UIGestureRecognizerState.changed) {
                    _this2.state = UIGestureRecognizer_1.UIGestureRecognizerState.changed;
                    _this2.handleEvent("changed");
                    _this2.emit("changed", _this2);
                }
            } else if (it.phase == UITouch_1.UITouchPhase.ended) {
                if (_this2.state == UIGestureRecognizer_1.UIGestureRecognizerState.began || _this2.state == UIGestureRecognizer_1.UIGestureRecognizerState.changed) {
                    _this2.state = UIGestureRecognizer_1.UIGestureRecognizerState.ended;
                    _this2.handleEvent("ended");
                    _this2.emit("ended", _this2);
                    setTimeout(function () {
                        UIView_1.UIView.recognizedGesture = undefined;
                    }, 0);
                }
                if (it.identifier == 0) {
                    _this2.state = UIGestureRecognizer_1.UIGestureRecognizerState.possible;
                }
            } else if (it.phase == UITouch_1.UITouchPhase.cancelled) {
                if (_this2.state == UIGestureRecognizer_1.UIGestureRecognizerState.began || _this2.state == UIGestureRecognizer_1.UIGestureRecognizerState.changed) {
                    _this2.state = UIGestureRecognizer_1.UIGestureRecognizerState.cancelled;
                    _this2.handleEvent("cancelled");
                    _this2.emit("cancelled", _this2);
                    setTimeout(function () {
                        UIView_1.UIView.recognizedGesture = undefined;
                    }, 0);
                }
                _this2.state = UIGestureRecognizer_1.UIGestureRecognizerState.possible;
            }
        });
    };

    return UIPanGestureRecognizer;
}(UIGestureRecognizer_1.UIGestureRecognizer);

exports.UIPanGestureRecognizer = UIPanGestureRecognizer;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var UIView_1 = __webpack_require__(1);
var UIColor_1 = __webpack_require__(5);

var UIRefreshAnimationView = function (_UIView_1$UIView) {
    _inherits(UIRefreshAnimationView, _UIView_1$UIView);

    function UIRefreshAnimationView() {
        _classCallCheck(this, UIRefreshAnimationView);

        var _this = _possibleConstructorReturn(this, _UIView_1$UIView.call(this));

        _this.leftDot = new UIView_1.UIView();
        _this.midDot = new UIView_1.UIView();
        _this.rightDot = new UIView_1.UIView();
        _this.currentIdx = 0;
        _this.leftDot.alpha = 0.5;
        _this.leftDot.layer.cornerRadius = 4.0;
        _this.midDot.alpha = 0.5;
        _this.midDot.layer.cornerRadius = 4.0;
        _this.rightDot.alpha = 0.5;
        _this.rightDot.layer.cornerRadius = 4.0;
        _this.addSubview(_this.leftDot);
        _this.addSubview(_this.midDot);
        _this.addSubview(_this.rightDot);
        return _this;
    }

    UIRefreshAnimationView.prototype.layoutSubviews = function layoutSubviews() {
        _UIView_1$UIView.prototype.layoutSubviews.call(this);
        this.leftDot.frame = { x: this.bounds.width / 2.0 - 4.0 - 20, y: this.bounds.height / 2.0 - 4.0, width: 8.0, height: 8.0 };
        this.midDot.frame = { x: this.bounds.width / 2.0 - 4.0, y: this.bounds.height / 2.0 - 4.0, width: 8.0, height: 8.0 };
        this.rightDot.frame = { x: this.bounds.width / 2.0 + 4.0 + 12, y: this.bounds.height / 2.0 - 4.0, width: 8.0, height: 8.0 };
    };

    UIRefreshAnimationView.prototype.startAnimation = function startAnimation() {
        var _this2 = this;

        this.stopAnimation();
        this.currentIdx = 0;
        this.doAnimation();
        this.intervalHandler = setInterval(function () {
            _this2.currentIdx = _this2.currentIdx + 1;
            if (_this2.currentIdx == 3) {
                _this2.currentIdx = 0;
            }
            _this2.doAnimation();
        }, 1250 / 3);
    };

    UIRefreshAnimationView.prototype.doAnimation = function doAnimation() {
        this.leftDot.alpha = this.currentIdx == 0 ? 1.0 : 0.5;
        this.midDot.alpha = this.currentIdx == 1 ? 1.0 : 0.5;
        this.rightDot.alpha = this.currentIdx == 2 ? 1.0 : 0.5;
    };

    UIRefreshAnimationView.prototype.stopAnimation = function stopAnimation() {
        this.leftDot.alpha = 0.5;
        this.midDot.alpha = 0.5;
        this.rightDot.alpha = 0.5;
        clearInterval(this.intervalHandler);
    };

    UIRefreshAnimationView.prototype.tintColorDidChange = function tintColorDidChange() {
        _UIView_1$UIView.prototype.tintColorDidChange.call(this);
        this.leftDot.backgroundColor = this.tintColor;
        this.midDot.backgroundColor = this.tintColor;
        this.rightDot.backgroundColor = this.tintColor;
    };

    return UIRefreshAnimationView;
}(UIView_1.UIView);

var UIRefreshControl = function (_UIView_1$UIView2) {
    _inherits(UIRefreshControl, _UIView_1$UIView2);

    function UIRefreshControl() {
        _classCallCheck(this, UIRefreshControl);

        var _this3 = _possibleConstructorReturn(this, _UIView_1$UIView2.call(this));

        _this3.animationView = new UIRefreshAnimationView();
        _this3.scrollView = undefined;
        _this3.enabled = true;
        _this3.refreshing = false;
        _this3.animationView.alpha = 0.0;
        _this3.tintColor = UIColor_1.UIColor.gray;
        return _this3;
    }

    UIRefreshControl.prototype.tintColorDidChange = function tintColorDidChange() {
        _UIView_1$UIView2.prototype.tintColorDidChange.call(this);
        this.animationView.tintColor = this.tintColor;
    };

    UIRefreshControl.prototype.beginRefreshing_callFromScrollView = function beginRefreshing_callFromScrollView() {
        if (this.scrollView === undefined) {
            return;
        }
        this.refreshing = true;
        this.scrollView.touchingRefreshOffsetY = 0.0;
        this.scrollView.markFlagDirty("refreshOffset", "refreshing", "refreshingAnimation");
        this.animationView.startAnimation();
        this.emit("refresh", this);
    };

    UIRefreshControl.prototype.beginRefreshing = function beginRefreshing() {
        var _this4 = this;

        if (this.scrollView === undefined) {
            return;
        }
        this.refreshing = true;
        this.scrollView.touchingRefreshOffsetY = 0.0;
        this.scrollView.markFlagDirty("refreshOffset", "refreshing", "refreshingAnimation");
        this.animationView.startAnimation();
        setTimeout(function () {
            _this4.animationView.alpha = 1.0;
            _this4.emit("refresh", _this4);
        }, 750);
    };

    UIRefreshControl.prototype.endRefreshing = function endRefreshing() {
        if (this.scrollView === undefined) {
            return;
        }
        this.animationView.alpha = 0.0;
        this.animationView.stopAnimation();
        this.refreshing = false;
        this.scrollView.touchingRefreshOffsetY = 0.0;
        this.scrollView.markFlagDirty("refreshOffset", "refreshing", "refreshingAnimation");
    };

    return UIRefreshControl;
}(UIView_1.UIView);

exports.UIRefreshControl = UIRefreshControl;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var UIView_1 = __webpack_require__(1);
var UIColor_1 = __webpack_require__(5);

var UIFetchMoreControl = function (_UIView_1$UIView) {
    _inherits(UIFetchMoreControl, _UIView_1$UIView);

    function UIFetchMoreControl() {
        _classCallCheck(this, UIFetchMoreControl);

        var _this = _possibleConstructorReturn(this, _UIView_1$UIView.call(this));

        _this.scrollView = undefined;
        _this.enabled = true;
        _this.fetching = false;
        _this.tintColor = UIColor_1.UIColor.gray;
        return _this;
    }

    UIFetchMoreControl.prototype.tintColorDidChange = function tintColorDidChange() {
        _UIView_1$UIView.prototype.tintColorDidChange.call(this);
    };

    UIFetchMoreControl.prototype.beginFetching = function beginFetching() {
        var _this2 = this;

        this.fetching = true;
        setTimeout(function () {
            _this2.emit("fetch", _this2);
        }, 250);
    };

    UIFetchMoreControl.prototype.endFetching = function endFetching() {
        if (this.scrollView) {
            var it = this.scrollView;
            if (it.contentOffset.y > it.contentSize.height + it.contentInset.bottom - it.bounds.height) {
                it.setContentOffset({ x: 0.0, y: it.contentSize.height + it.contentInset.bottom - it.bounds.height }, true);
            }
        }
        this.fetching = false;
    };

    return UIFetchMoreControl;
}(UIView_1.UIView);

exports.UIFetchMoreControl = UIFetchMoreControl;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
var UISize_1 = __webpack_require__(13);
var EventEmitter_1 = __webpack_require__(12);
var UIImageRenderingMode;
(function (UIImageRenderingMode) {
    UIImageRenderingMode[UIImageRenderingMode["automatic"] = 0] = "automatic";
    UIImageRenderingMode[UIImageRenderingMode["alwaysOriginal"] = 1] = "alwaysOriginal";
    UIImageRenderingMode[UIImageRenderingMode["alwaysTemplate"] = 2] = "alwaysTemplate";
})(UIImageRenderingMode = exports.UIImageRenderingMode || (exports.UIImageRenderingMode = {}));

var UIImage = function (_EventEmitter_1$Event) {
    _inherits(UIImage, _EventEmitter_1$Event);

    function UIImage(options) {
        var cloner = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

        _classCallCheck(this, UIImage);

        var _this = _possibleConstructorReturn(this, _EventEmitter_1$Event.call(this));

        _this.options = options;
        _this.imageSource = undefined;
        _this.renderingMode = UIImageRenderingMode.alwaysOriginal;
        _this.loaded = false;
        _this.size = UISize_1.UISizeZero;
        _this.scale = 1.0;
        if (options.base64) {
            _this.imageSource = "data:image/png;base64," + options.base64;
        } else if (options.data) {
            _this.imageSource = "data:image/png;base64," + options.data.base64EncodedString();
        } else if (options.name) {
            _this.imageSource = "/assets/images/" + options.name + "@2x.png";
        }
        if (options.renderingMode !== undefined) {
            _this.renderingMode = options.renderingMode;
        }
        return _this;
    }

    UIImage.fromURL = function fromURL(url) {
        var image = new UIImage({});
        image.imageSource = url;
        return image;
    };

    UIImage.scaleFromName = function scaleFromName(name) {
        if (name.indexOf("@2x") > 0) {
            return 2.0;
        } else if (name.indexOf("@3x") > 0) {
            return 3.0;
        } else if (name.indexOf("@4x") > 0) {
            return 4.0;
        }
        return 1.0;
    };

    UIImage.prototype.fetchSize = function fetchSize() {
        return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            var _this2 = this;

            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            if (!this.loaded) {
                                _context.next = 4;
                                break;
                            }

                            return _context.abrupt("return", this.size);

                        case 4:
                            _context.next = 6;
                            return new Promise(function (resolver, rejector) {
                                _this2.on("load", function () {
                                    resolver(_this2.size);
                                });
                            });

                        case 6:
                            return _context.abrupt("return", _context.sent);

                        case 7:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));
    };

    return UIImage;
}(EventEmitter_1.EventEmitter);

exports.UIImage = UIImage;

/***/ }),
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.assign(module.exports, __webpack_require__(28));
Object.assign(module.exports, __webpack_require__(17));
Object.assign(module.exports, __webpack_require__(48));
Object.assign(module.exports, __webpack_require__(49));
Object.assign(module.exports, __webpack_require__(50));
Object.assign(module.exports, __webpack_require__(16));
Object.assign(module.exports, __webpack_require__(29));
Object.assign(module.exports, __webpack_require__(30));
Object.assign(module.exports, __webpack_require__(51));
Object.assign(module.exports, __webpack_require__(52));
Object.assign(module.exports, __webpack_require__(31));
Object.assign(module.exports, __webpack_require__(53));
Object.assign(module.exports, __webpack_require__(54));
Object.assign(module.exports, __webpack_require__(57));
Object.assign(module.exports, __webpack_require__(22));
Object.assign(module.exports, __webpack_require__(7));
Object.assign(module.exports, __webpack_require__(58));
Object.assign(module.exports, __webpack_require__(33));
Object.assign(module.exports, __webpack_require__(34));
Object.assign(module.exports, __webpack_require__(60));
Object.assign(module.exports, __webpack_require__(5));
Object.assign(module.exports, __webpack_require__(61));
Object.assign(module.exports, __webpack_require__(62));
Object.assign(module.exports, __webpack_require__(8));
Object.assign(module.exports, __webpack_require__(6));
Object.assign(module.exports, __webpack_require__(37));
Object.assign(module.exports, __webpack_require__(18));
Object.assign(module.exports, __webpack_require__(14));
Object.assign(module.exports, __webpack_require__(38));
Object.assign(module.exports, __webpack_require__(25));
Object.assign(module.exports, __webpack_require__(24));
Object.assign(module.exports, __webpack_require__(19));
Object.assign(module.exports, __webpack_require__(27));
Object.assign(module.exports, __webpack_require__(63));
Object.assign(module.exports, __webpack_require__(65));
Object.assign(module.exports, __webpack_require__(66));
Object.assign(module.exports, __webpack_require__(35));
Object.assign(module.exports, __webpack_require__(67));
Object.assign(module.exports, __webpack_require__(11));
Object.assign(module.exports, __webpack_require__(68));
Object.assign(module.exports, __webpack_require__(9));
Object.assign(module.exports, __webpack_require__(36));
Object.assign(module.exports, __webpack_require__(69));
Object.assign(module.exports, __webpack_require__(70));
Object.assign(module.exports, __webpack_require__(20));
Object.assign(module.exports, __webpack_require__(13));
Object.assign(module.exports, __webpack_require__(71));
Object.assign(module.exports, __webpack_require__(72));
Object.assign(module.exports, __webpack_require__(73));
Object.assign(module.exports, __webpack_require__(74));
Object.assign(module.exports, __webpack_require__(23));
Object.assign(module.exports, __webpack_require__(76));
Object.assign(module.exports, __webpack_require__(77));
Object.assign(module.exports, __webpack_require__(78));
Object.assign(module.exports, __webpack_require__(10));
Object.assign(module.exports, __webpack_require__(1));
Object.assign(module.exports, __webpack_require__(15));
Object.assign(module.exports, __webpack_require__(79));
Component({
    properties: {
        view: {
            type: Object,
            value: undefined,
            observer: function observer(view) {
                if (view === undefined || view === null) {
                    return;
                }
                if (typeof this.data.clazz !== "string" || _typeof(this.data.view) !== view) {
                    this.setData({
                        viewID: view.viewID,
                        clazz: view.clazz
                    });
                }
            }
        }
    },
    data: {
        view: undefined,
        clazz: "UIView"
    },
    methods: {}
});

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });

var DispatchQueue = function () {
    function DispatchQueue(identifier) {
        _classCallCheck(this, DispatchQueue);
    }

    DispatchQueue.prototype.async = function async(asyncBlock) {
        setTimeout(asyncBlock, 0);
    };

    DispatchQueue.prototype.asyncAfter = function asyncAfter(delayInSeconds, asyncBlock) {
        setTimeout(asyncBlock, delayInSeconds * 1000);
    };

    DispatchQueue.prototype.isolate = function isolate(isolateBlock) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
        }

        setTimeout(function () {
            isolateBlock.apply(undefined, args);
        }, 0);
    };

    return DispatchQueue;
}();

DispatchQueue.main = new DispatchQueue();
DispatchQueue.global = new DispatchQueue();
exports.DispatchQueue = DispatchQueue;

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var Data_1 = __webpack_require__(17);
var Bundle_1 = __webpack_require__(28);
var fs = wx.getFileSystemManager();

var FileManager = function () {
    function FileManager() {
        _classCallCheck(this, FileManager);

        this.tmpFiles = {};
    }

    FileManager.prototype.subpaths = function subpaths(atPath, deepSearch) {
        if (atPath.indexOf("xt://") === 0) {
            return Object.keys(Bundle_1.Bundle.js.resources).filter(function (it) {
                return it.indexOf(atPath.replace("xt://", "")) === 0;
            });
        } else if (atPath.indexOf("tmp://") === 0) {
            return Object.keys(this.tmpFiles).filter(function (it) {
                return it.indexOf(atPath) === 0;
            });
        }
        return [];
    };

    FileManager.prototype.createDirectory = function createDirectory(atPath, withIntermediateDirectories) {
        if (withIntermediateDirectories) {
            try {
                var currentPath = FileManager.wxPath;
                atPath.replace(FileManager.wxPath, "").split('/').filter(function (it) {
                    return it.length > 0;
                }).forEach(function (it, idx) {
                    currentPath += '/' + it;
                    try {
                        if (fs.accessSync(currentPath)) {
                            var stat = fs.statSync(currentPath);
                            if (stat.isDirectory() || stat.isFile()) {
                                return;
                            }
                        }
                    } catch (error) {
                        fs.mkdirSync(currentPath, false);
                    }
                });
            } catch (error) {
                return error;
            }
        } else {
            try {
                fs.mkdirSync(atPath, false);
            } catch (error) {
                return error;
            }
        }
    };

    FileManager.prototype.createFile = function createFile(atPath, data) {
        if (atPath.indexOf("xt://") === 0) {
            return Error("readonly");
        } else if (atPath.indexOf("tmp://") === 0) {
            this.tmpFiles[atPath] = data;
            return undefined;
        } else {
            try {
                fs.writeFileSync(atPath, data.arrayBuffer());
            } catch (error) {
                return error;
            }
        }
    };

    FileManager.prototype.readFile = function readFile(atPath) {
        if (atPath.indexOf("xt://") === 0) {
            return Bundle_1.Bundle.js.resources[atPath.replace("xt://", "")];
        } else if (atPath.indexOf("tmp://") === 0) {
            return this.tmpFiles[atPath];
        } else {
            try {
                return new Data_1.Data(fs.readFileSync(atPath));
            } catch (error) {}
        }
        return undefined;
    };

    FileManager.prototype.removeItem = function removeItem(atPath) {
        if (atPath.indexOf("xt://") === 0) {
            delete Bundle_1.Bundle.js.resources[atPath.replace("xt://", "")];
            return undefined;
        } else if (atPath.indexOf("tmp://") === 0) {
            delete this.tmpFiles[atPath];
            return undefined;
        } else {
            try {
                if (fs.statSync(atPath).isDirectory()) {
                    fs.rmdirSync(atPath);
                } else {
                    fs.unlinkSync(atPath);
                }
            } catch (error) {
                return error;
            }
        }
    };

    FileManager.prototype.copyItem = function copyItem(atPath, toPath) {
        if (toPath.indexOf("xt://") === 0) {
            return Error("readonly");
        } else if (toPath.indexOf("tmp://") === 0) {
            var data = this.readFile(atPath);
            if (data) {
                this.createFile(toPath, data);
            } else {
                return Error("file not found.");
            }
        } else {
            try {
                fs.copyFileSync(atPath, toPath);
            } catch (error) {
                return error;
            }
        }
    };

    FileManager.prototype.moveItem = function moveItem(atPath, toPath) {
        if (toPath.indexOf("xt://") === 0) {
            return Error("readonly");
        } else if (toPath.indexOf("tmp://") === 0) {
            var data = this.readFile(atPath);
            if (data) {
                this.createFile(toPath, data);
                this.removeItem(atPath);
            } else {
                return Error("file not found.");
            }
        } else {
            try {
                {
                    var error = this.copyItem(atPath, toPath);
                    if (error instanceof Error) {
                        throw error;
                    }
                }
                {
                    var _error = this.removeItem(atPath);
                    if (_error instanceof Error) {
                        throw _error;
                    }
                }
            } catch (error) {
                return error;
            }
        }
    };

    FileManager.prototype.fileExists = function fileExists(atPath) {
        if (atPath.indexOf("xt://") === 0) {
            return Bundle_1.Bundle.js.resources[atPath.replace("xt://", "")] instanceof Data_1.Data;
        } else if (atPath.indexOf("tmp://") === 0) {
            return this.tmpFiles[atPath] !== undefined;
        } else {
            try {
                return fs.statSync(atPath).isFile();
            } catch (error) {
                return false;
            }
        }
    };

    FileManager.prototype.dirExists = function dirExists(atPath) {
        try {
            return fs.statSync(atPath).isDirectory();
        } catch (error) {
            return false;
        }
    };

    return FileManager;
}();

FileManager.wxPath = wx.env.USER_DATA_PATH;
FileManager.defaultManager = new FileManager();
FileManager.documentDirectory = FileManager.wxPath + "/document/";
FileManager.libraryDirectory = FileManager.wxPath + "/library/";
FileManager.cacheDirectory = FileManager.wxPath + "/cache/";
FileManager.temporaryDirectory = "tmp://tmp/";
FileManager.jsBundleDirectory = "xt://";
exports.FileManager = FileManager;

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });

var Timer = function () {
    function Timer(timeInterval, block, repeats) {
        var _this = this;

        _classCallCheck(this, Timer);

        this.repeats = repeats;
        this.cancelled = false;
        if (repeats) {
            this.handler = setInterval(function () {
                if (!_this.cancelled && block) {
                    block();
                }
            }, timeInterval * 1000);
        } else {
            this.handler = setTimeout(function () {
                if (!_this.cancelled && block) {
                    block();
                }
            }, timeInterval * 1000);
        }
    }

    Timer.sleep = function sleep(timeInterval) {
        return new Promise(function (resolver) {
            new Timer(timeInterval, function () {
                resolver();
            }, false);
        });
    };

    Timer.prototype.invalidate = function invalidate() {
        this.cancelled = true;
        if (this.repeats) {
            clearInterval(this.handler);
        } else {
            clearTimeout(this.handler);
        }
    };

    return Timer;
}();

exports.Timer = Timer;

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var URLRequest_1 = __webpack_require__(29);
var URL_1 = __webpack_require__(16);
var Data_1 = __webpack_require__(17);
var URLResponse_1 = __webpack_require__(30);

var URLSession = function () {
    function URLSession() {
        _classCallCheck(this, URLSession);
    }

    URLSession.prototype.fetch = function fetch(request) {
        var _this = this;

        return new Promise(function (resolver, rejector) {
            _this.dataTask(request, function (data, response, error) {
                if (error && data !== undefined) {
                    rejector(error);
                } else {
                    resolver(data);
                }
            }).resume();
        });
    };

    URLSession.prototype.dataTask = function dataTask(req, complete) {
        if (req instanceof URLRequest_1.URLRequest) {
            return new URLSessionTask(req, complete);
        } else if (req instanceof URL_1.URL) {
            return new URLSessionTask(new URLRequest_1.URLRequest(req), complete);
        } else {
            var currentURL = URL_1.URL.URLWithString(req);
            if (currentURL !== undefined) {
                return new URLSessionTask(new URLRequest_1.URLRequest(currentURL), complete);
            } else {
                throw Error("invalid url.");
            }
        }
    };

    return URLSession;
}();

URLSession.shared = new URLSession();
exports.URLSession = URLSession;
var URLSessionTaskState;
(function (URLSessionTaskState) {
    URLSessionTaskState[URLSessionTaskState["running"] = 0] = "running";
    URLSessionTaskState[URLSessionTaskState["suspended"] = 1] = "suspended";
    URLSessionTaskState[URLSessionTaskState["cancelling"] = 2] = "cancelling";
    URLSessionTaskState[URLSessionTaskState["completed"] = 3] = "completed";
})(URLSessionTaskState = exports.URLSessionTaskState || (exports.URLSessionTaskState = {}));

var URLSessionTask = function () {
    function URLSessionTask(request, complete) {
        _classCallCheck(this, URLSessionTask);

        this.request = request;
        this.complete = complete;
        this.state = URLSessionTaskState.suspended;
        this.countOfBytesExpectedToReceive = 0;
        this.countOfBytesReceived = 0;
        this.countOfBytesExpectedToSend = 0;
        this.countOfBytesSent = 0;
        this._taskHandler = undefined;
    }

    URLSessionTask.prototype.resume = function resume() {
        var _this2 = this;

        this._taskHandler = wx.request({
            url: this.request.URL.absoluteString,
            data: this.request.HTTPBody,
            header: this.request.allHTTPHeaderFields,
            method: this.request.HTTPMethod || "GET",
            dataType: "",
            responseType: "arraybuffer",
            success: function success(response) {
                if (_this2.complete) {
                    if (response) {
                        var res = new URLResponse_1.URLResponse();
                        res.statusCode = response.statusCode;
                        res.allHeaderFields = response.header || {};
                        _this2.complete(response.data instanceof ArrayBuffer ? new Data_1.Data(response.data) : undefined, res, undefined);
                    }
                }
            },
            fail: function fail(e) {
                if (_this2.complete) {
                    _this2.complete(undefined, undefined, e || Error("unknown error"));
                }
            }
        });
    };

    URLSessionTask.prototype.cancel = function cancel() {
        if (this._taskHandler) {
            this._taskHandler.abort();
        }
        this.state = URLSessionTaskState.cancelling;
    };

    return URLSessionTask;
}();

exports.URLSessionTask = URLSessionTask;

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });

var UserDefaults = function () {
    function UserDefaults() {
        var suiteName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

        _classCallCheck(this, UserDefaults);

        this.suiteName = suiteName;
    }

    UserDefaults.prototype.valueForKey = function valueForKey(forKey) {
        var value = wx.getStorageSync(this.buildKey(forKey));
        if (value !== undefined && typeof value === "string") {
            try {
                return JSON.parse(value).value;
            } catch (error) {}
        }
        return undefined;
    };

    UserDefaults.prototype.setValue = function setValue(value, forKey) {
        if (value === undefined) {
            wx.removeStorageSync(this.buildKey(forKey));
        } else {
            wx.setStorageSync(this.buildKey(forKey), JSON.stringify({ value: value }));
        }
    };

    UserDefaults.prototype.reset = function reset() {
        var _this = this;

        var storageInfo = wx.getStorageInfoSync();
        storageInfo.keys.forEach(function (key) {
            if (typeof key === "string" && key.indexOf("com.xt." + (_this.suiteName || "standard") + ".") === 0) {
                wx.removeStorageSync(key);
            }
        });
    };

    UserDefaults.prototype.buildKey = function buildKey(aKey) {
        return "com.xt." + (this.suiteName || "standard") + "." + aKey;
    };

    return UserDefaults;
}();

UserDefaults.standard = new UserDefaults();
exports.UserDefaults = UserDefaults;

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var UIAlertActionStyle;
(function (UIAlertActionStyle) {
    UIAlertActionStyle[UIAlertActionStyle["normal"] = 0] = "normal";
    UIAlertActionStyle[UIAlertActionStyle["danger"] = 1] = "danger";
    UIAlertActionStyle[UIAlertActionStyle["cancel"] = 2] = "cancel";
})(UIAlertActionStyle || (UIAlertActionStyle = {}));

var UIAlertAction = function UIAlertAction(title, style, callback) {
    _classCallCheck(this, UIAlertAction);

    this.title = title;
    this.style = style;
    this.callback = callback;
};

var UIActionSheet = function () {
    function UIActionSheet() {
        _classCallCheck(this, UIActionSheet);

        this.message = "";
        this.actions = [];
    }

    UIActionSheet.prototype.addRegularAction = function addRegularAction(title, actionBlock) {
        this.actions.push(new UIAlertAction(title, UIAlertActionStyle.normal, actionBlock));
    };

    UIActionSheet.prototype.addDangerAction = function addDangerAction(title, actionBlock) {
        this.actions.push(new UIAlertAction(title, UIAlertActionStyle.danger, actionBlock));
    };

    UIActionSheet.prototype.addCancelAction = function addCancelAction(title, actionBlock) {
        this.actions.push(new UIAlertAction(title, UIAlertActionStyle.cancel, actionBlock));
    };

    UIActionSheet.prototype.show = function show() {
        var _this = this;

        wx.showActionSheet({
            itemList: this.actions.filter(function (it) {
                return it.style !== UIAlertActionStyle.cancel;
            }).map(function (it) {
                return it.title;
            }),
            itemColor: this.actions.filter(function (it) {
                return it.style === UIAlertActionStyle.danger;
            }).length > 0 ? "#ff0000" : "#000000",
            success: function success(response) {
                if (response && _this.actions[response.tapIndex]) {
                    var callback = _this.actions[response.tapIndex].callback;
                    if (callback) {
                        callback();
                    }
                }
            },
            fail: function fail() {
                _this.actions.forEach(function (it) {
                    if (it.style === UIAlertActionStyle.cancel && it.callback) {
                        it.callback();
                    }
                });
            }
        });
    };

    return UIActionSheet;
}();

exports.UIActionSheet = UIActionSheet;

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var UIView_1 = __webpack_require__(1);

var UIActivityIndicatorView = function (_UIView_1$UIView) {
    _inherits(UIActivityIndicatorView, _UIView_1$UIView);

    function UIActivityIndicatorView() {
        _classCallCheck(this, UIActivityIndicatorView);

        var _this = _possibleConstructorReturn(this, _UIView_1$UIView.call(this));

        _this.clazz = "UIActivityIndicatorView";
        _this.color = undefined;
        _this._largeStyle = false;
        _this.animating = false;
        {
            var size = _this.largeStyle ? 88 : 36;
            _this.frame = { x: _this.frame.x, y: _this.frame.y, width: size, height: size };
        }
        return _this;
    }

    UIActivityIndicatorView.prototype.startAnimating = function startAnimating() {
        this.animating = true;
        this.invalidate();
    };

    UIActivityIndicatorView.prototype.stopAnimating = function stopAnimating() {
        this.animating = false;
        this.invalidate();
    };

    UIActivityIndicatorView.prototype.layoutSubviews = function layoutSubviews() {
        _UIView_1$UIView.prototype.layoutSubviews.call(this);
        this.invalidate();
    };

    UIActivityIndicatorView.prototype.buildData = function buildData() {
        var data = _UIView_1$UIView.prototype.buildData.call(this);
        data.sizeScale = this.largeStyle ? 3.0 : 1.5;
        data.lineHeight = this.bounds.height;
        data.animating = this.animating;
        return data;
    };

    _createClass(UIActivityIndicatorView, [{
        key: "largeStyle",
        get: function get() {
            return this._largeStyle;
        },
        set: function set(value) {
            this._largeStyle = value;
            this.invalidate();
        }
    }]);

    return UIActivityIndicatorView;
}(UIView_1.UIView);

exports.UIActivityIndicatorView = UIActivityIndicatorView;

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * EventEmitter v5.2.4 - git.io/ee
 * Unlicense - http://unlicense.org/
 * Oliver Caldwell - http://oli.me.uk/
 * @preserve
 */

;(function (exports) {
    'use strict';

    /**
     * Class for managing events.
     * Can be extended to provide event functionality in other classes.
     *
     * @class EventEmitter Manages event registering and emitting.
     */

    function EventEmitter() {}

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
        } else {
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
            return true;
        } else if (listener && (typeof listener === 'undefined' ? 'undefined' : _typeof(listener)) === 'object') {
            return isValidListener(listener.listener);
        } else {
            return false;
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
        var listenerIsWrapped = (typeof listener === 'undefined' ? 'undefined' : _typeof(listener)) === 'object';
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
        if ((typeof evt === 'undefined' ? 'undefined' : _typeof(evt)) === 'object' && !(evt instanceof RegExp)) {
            for (i in evt) {
                if (evt.hasOwnProperty(i) && (value = evt[i])) {
                    // Pass the single listener straight through to the singular method
                    if (typeof value === 'function') {
                        single.call(this, i, value);
                    } else {
                        // Otherwise pass back to the multiple function
                        multiple.call(this, i, value);
                    }
                }
            }
        } else {
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
        var type = typeof evt === 'undefined' ? 'undefined' : _typeof(evt);
        var events = this._getEvents();
        var key;

        // Remove different things depending on the state of evt
        if (type === 'string') {
            // Remove all listeners for the specified event
            delete events[evt];
        } else if (evt instanceof RegExp) {
            // Remove all events matching the regex.
            for (key in events) {
                if (events.hasOwnProperty(key) && evt.test(key)) {
                    delete events[key];
                }
            }
        } else {
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
            console.error(error);
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
            console.error(error);
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
        } else {
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
    };
})(undefined || {});

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var UIRect_1 = __webpack_require__(9);
var UISize_1 = __webpack_require__(13);

var CALayer = function () {
    function CALayer() {
        _classCallCheck(this, CALayer);

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

    CALayer.prototype.resetBorder = function resetBorder() {
        if (this._view) {
            this._view.invalidate();
        } else {}
    };

    CALayer.prototype.moveBorderElementToFront = function moveBorderElementToFront() {};

    CALayer.prototype.removeFromSuperlayer = function removeFromSuperlayer() {
        if (this.superlayer) {
            var idx = this.superlayer.sublayers.indexOf(this);
            if (idx >= 0) {
                this.superlayer.sublayers.splice(idx, 1);
            }
            this.superlayer = undefined;
        }
    };

    CALayer.prototype.addSublayer = function addSublayer(layer) {
        if (layer.superlayer !== undefined) {
            layer.removeFromSuperlayer();
        }
        this.sublayers.push(layer);
        layer.superlayer = this;
        this.createSVGElement();
        layer.createSVGElement();
    };

    CALayer.prototype.createSVGElement = function createSVGElement() {};

    CALayer.prototype.resetShadow = function resetShadow() {
        if (this._view) {
            this._view.invalidate();
        }
    };

    _createClass(CALayer, [{
        key: "view",
        get: function get() {
            if (this.superlayer) {
                return this.superlayer._view;
            }
            return this._view;
        },
        set: function set(value) {
            this._view = value;
        }
    }, {
        key: "frame",
        get: function get() {
            return this._frame;
        },
        set: function set(value) {
            if (UIRect_1.UIRectEqualToRect(this._frame, value)) {
                return;
            }
            this._frame = value;
        }
    }, {
        key: "hidden",
        get: function get() {
            if (this._view) {
                return this._view.hidden;
            } else {
                return this._hidden;
            }
        },
        set: function set(value) {
            if (this.hidden === value) {
                return;
            }
            this._hidden = value;
            if (this._view) {
                this._view.hidden = value;
            } else {}
        }
    }, {
        key: "cornerRadius",
        get: function get() {
            return this._cornerRadius;
        },
        set: function set(value) {
            if (this._cornerRadius === value) {
                return;
            }
            this._cornerRadius = value;
            if (this._view) {
                this._view.invalidate();
            } else {}
        }
    }, {
        key: "borderWidth",
        get: function get() {
            return this._borderWidth;
        },
        set: function set(value) {
            if (this._borderWidth === value) {
                return;
            }
            this._borderWidth = value;
            this.resetBorder();
        }
    }, {
        key: "borderColor",
        get: function get() {
            return this._borderColor;
        },
        set: function set(value) {
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
    }, {
        key: "backgroundColor",
        get: function get() {
            if (this._view) {
                return this._view.backgroundColor;
            } else {
                return this._backgroundColor;
            }
        },
        set: function set(value) {
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
            } else {}
        }
    }, {
        key: "opacity",
        get: function get() {
            if (this._view) {
                return this._view.alpha;
            } else {
                return this._opacity;
            }
        },
        set: function set(value) {
            if (this.opacity === value) {
                return;
            }
            this._opacity = value;
            if (this._view) {
                this._view.alpha = value;
            } else {}
        }
    }, {
        key: "masksToBounds",
        get: function get() {
            return this._masksToBounds;
        },
        set: function set(value) {
            if (this.masksToBounds === value) {
                return;
            }
            this._masksToBounds = value;
            if (this._view) {
                this._view.clipsToBounds = value;
            } else {}
        }
    }, {
        key: "shadowColor",
        get: function get() {
            return this._shadowColor;
        },
        set: function set(value) {
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
    }, {
        key: "shadowOpacity",
        get: function get() {
            return this._shadowOpacity;
        },
        set: function set(value) {
            if (this.shadowOpacity === value) {
                return;
            }
            this._shadowOpacity = value;
            this.resetShadow();
        }
    }, {
        key: "shadowOffset",
        get: function get() {
            return this._shadowOffset;
        },
        set: function set(value) {
            if (UISize_1.UISizeEqualToSize(this.shadowOffset, value)) {
                return;
            }
            this._shadowOffset = value;
            this.resetShadow();
        }
    }, {
        key: "shadowRadius",
        get: function get() {
            return this._shadowRadius;
        },
        set: function set(value) {
            if (this.shadowRadius === value) {
                return;
            }
            this._shadowRadius = value;
            this.resetShadow();
        }
    }]);

    return CALayer;
}();

exports.CALayer = CALayer;

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });

var UIAlert = function () {
    function UIAlert(message) {
        var buttonText = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "OK";

        _classCallCheck(this, UIAlert);

        this.message = message;
        this.buttonText = buttonText;
    }

    UIAlert.prototype.show = function show(callback) {
        wx.showModal({
            title: "",
            content: this.message,
            showCancel: false,
            confirmText: this.buttonText,
            success: function success(res) {
                if (callback) {
                    if (res.confirm) {
                        callback();
                    } else if (res.cancel) {
                        callback();
                    }
                }
            }
        });
    };

    return UIAlert;
}();

exports.UIAlert = UIAlert;

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var UIRect_1 = __webpack_require__(9);
var UIColor_1 = __webpack_require__(5);
var UIFont_1 = __webpack_require__(18);
var UIEnums_1 = __webpack_require__(6);
var TextMeasurer_1 = __webpack_require__(59);

var UIAttributedStringKey = function UIAttributedStringKey() {
    _classCallCheck(this, UIAttributedStringKey);
};

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

var UIParagraphStyle = function UIParagraphStyle() {
    _classCallCheck(this, UIParagraphStyle);

    this.lineSpacing = 0.0;
    this.alignment = UIEnums_1.UITextAlignment.left;
    this.lineBreakMode = UIEnums_1.UILineBreakMode.truncatingTail;
    this.minimumLineHeight = 0.0;
    this.maximumLineHeight = 0.0;
    this.lineHeightMultiple = 0.0;
};

exports.UIParagraphStyle = UIParagraphStyle;

var Character = function Character(letter, attributes) {
    _classCallCheck(this, Character);

    this.letter = letter;
    this.attributes = attributes;
};

var SpanElement = function () {
    function SpanElement() {
        _classCallCheck(this, SpanElement);

        this.innerText = "";
        this.style = "";
        this.children = [];
    }

    SpanElement.prototype.appendChild = function appendChild(child) {
        this.children.push(child);
    };

    SpanElement.prototype.toHTMLString = function toHTMLString() {
        return "<span style=\"" + this.style + "\">" + this.innerText + this.children.map(function (it) {
            return it.toHTMLString();
        }).join("") + "</span>";
    };

    return SpanElement;
}();

var UIAttributedString = function () {
    function UIAttributedString(str, attributes) {
        _classCallCheck(this, UIAttributedString);

        this.str = str;
        this.attributes = attributes;
        this.charSequences = [];
        this.charSequences = Array.from(str).map(function (it) {
            return new Character(it, Object.assign({}, attributes));
        });
    }

    UIAttributedString.prototype.measure = function measure(inSize) {
        return UIRect_1.UIRectZero;
    };

    UIAttributedString.prototype.measureAsync = function measureAsync(inSize) {
        return TextMeasurer_1.TextMeasurer.measureAttributedText(this, inSize);
    };

    UIAttributedString.prototype.mutable = function mutable() {
        var mutableString = new UIMutableAttributedString("", this.attributes);
        mutableString.charSequences = this.charSequences.map(function (it) {
            return new Character(it.letter, Object.assign({}, it.attributes));
        });
        return mutableString;
    };

    UIAttributedString.prototype.toHTMLText = function toHTMLText() {
        var _this = this;

        var spanElement = new SpanElement();
        var currentElement = new SpanElement();
        var currentAttributes = "";
        this.charSequences.forEach(function (it) {
            var attributes = JSON.stringify(it.attributes);
            if (currentAttributes !== attributes) {
                if (currentElement.innerText.length > 0) {
                    spanElement.appendChild(currentElement);
                }
                currentElement = new SpanElement();
                currentAttributes = attributes;
                _this.setSpanStyle(currentElement, it.attributes, spanElement);
            }
            currentElement.innerText += it.letter;
        });
        if (currentElement.innerText.length > 0) {
            spanElement.appendChild(currentElement);
        }
        return spanElement.toHTMLString();
    };

    UIAttributedString.prototype.setSpanStyle = function setSpanStyle(spanElement, attributes, rootElement) {
        {
            var value = attributes[UIAttributedStringKey.foregroundColor];
            if (value instanceof UIColor_1.UIColor) {
                spanElement.style += "color: " + value.toStyle() + ";";
            }
        }
        {
            var _value = attributes[UIAttributedStringKey.font];
            if (_value instanceof UIFont_1.UIFont) {
                spanElement.style += "\n                font-size: " + _value.pointSize.toString() + "px;\n                font-family: " + (typeof _value.fontName === "string" ? _value.fontName : "unset") + ";\n                font-weight: " + (typeof _value.fontStyle === "string" ? _value.fontStyle : "unset") + ";\n                font-style: " + (typeof _value.fontStyle === "string" ? _value.fontStyle : "unset") + ";\n                ";
            }
        }
        {
            var _value2 = attributes[UIAttributedStringKey.backgroundColor];
            if (_value2 instanceof UIColor_1.UIColor) {
                spanElement.style += "background-color: " + _value2.toStyle() + ";";
            }
        }
        {
            var _value3 = attributes[UIAttributedStringKey.kern];
            if (typeof _value3 === "number") {
                spanElement.style += "letter-spacing: " + _value3 + "px;";
            }
        }
        {
            var _value4 = attributes[UIAttributedStringKey.strikethroughStyle];
            if (_value4 === 1) {
                spanElement.style += "text-decoration-line: line-through;";
                var colorValue = attributes[UIAttributedStringKey.strikethroughColor];
                if (colorValue instanceof UIColor_1.UIColor) {
                    spanElement.style += "text-decoration-color: " + colorValue.toStyle() + ";";
                }
            }
        }
        {
            var _value5 = attributes[UIAttributedStringKey.underlineStyle];
            if (_value5 === 1) {
                spanElement.style += "text-decoration-line: underline;";
                var _colorValue = attributes[UIAttributedStringKey.underlineColor];
                if (_colorValue instanceof UIColor_1.UIColor) {
                    spanElement.style += "text-decoration-color: " + _colorValue.toStyle() + ";";
                }
            }
        }
        {
            var _value6 = attributes[UIAttributedStringKey.strokeWidth];
            if (typeof _value6 === "number" && _value6 !== 0) {
                spanElement.style += "-webkit-text-stroke-width: " + _value6 + "px;";
                var _colorValue2 = attributes[UIAttributedStringKey.strokeColor];
                if (_colorValue2 instanceof UIColor_1.UIColor) {
                    spanElement.style += "-webkit-text-stroke-color: " + _colorValue2.toStyle() + ";";
                }
            }
        }
        {
            var _value7 = attributes[UIAttributedStringKey.paragraphStyle];
            if (_value7 instanceof UIParagraphStyle) {
                switch (_value7.alignment) {
                    case UIEnums_1.UITextAlignment.left:
                        rootElement.style += "text-align: left;";
                        break;
                    case UIEnums_1.UITextAlignment.center:
                        rootElement.style += "text-align: center;";
                        break;
                    case UIEnums_1.UITextAlignment.right:
                        rootElement.style += "text-align: right;";
                        break;
                }
                var lineHeight = _value7.minimumLineHeight || _value7.maximumLineHeight || 0;
                if (lineHeight > 0) {
                    rootElement.style += "line-height: " + lineHeight + "px;";
                }
            }
        }
    };

    return UIAttributedString;
}();

exports.UIAttributedString = UIAttributedString;

var UIMutableAttributedString = function (_UIAttributedString) {
    _inherits(UIMutableAttributedString, _UIAttributedString);

    function UIMutableAttributedString(str, attributes) {
        _classCallCheck(this, UIMutableAttributedString);

        var _this2 = _possibleConstructorReturn(this, _UIAttributedString.call(this, str, attributes));

        _this2.str = str;
        _this2.attributes = attributes;
        return _this2;
    }

    UIMutableAttributedString.prototype.replaceCharacters = function replaceCharacters(inRange, withString) {
        var _this3 = this;

        var replacingChars = Array.from(withString).map(function (it, index) {
            if (index < inRange.length) {
                return new Character(it, _this3.charSequences[inRange.location + index].attributes);
            } else {
                return new Character(it, _this3.charSequences[inRange.location + inRange.length - 1].attributes);
            }
        });
        var spliceArguments = replacingChars.slice();
        spliceArguments.unshift(inRange.length);
        spliceArguments.unshift(inRange.location);
        this.charSequences.splice.apply(this.charSequences, spliceArguments);
    };

    UIMutableAttributedString.prototype.setAttributes = function setAttributes(attributes, range) {
        for (var index = range.location; index < range.location + range.length; index++) {
            this.charSequences[index].attributes = Object.assign({}, attributes);
        }
    };

    UIMutableAttributedString.prototype.addAttribute = function addAttribute(attrName, value, range) {
        for (var index = range.location; index < range.location + range.length; index++) {
            this.charSequences[index].attributes[attrName] = value;
        }
    };

    UIMutableAttributedString.prototype.addAttributes = function addAttributes(attributes, range) {
        for (var index = range.location; index < range.location + range.length; index++) {
            for (var attrName in attributes) {
                this.charSequences[index].attributes[attrName] = attributes[attrName];
            }
        }
    };

    UIMutableAttributedString.prototype.removeAttribute = function removeAttribute(attrName, range) {
        for (var index = range.location; index < range.location + range.length; index++) {
            delete this.charSequences[index].attributes[attrName];
        }
    };

    UIMutableAttributedString.prototype.replaceCharactersWithAttributedString = function replaceCharactersWithAttributedString(inRange, withAttributedString) {
        var spliceArguments = withAttributedString.charSequences.slice();
        spliceArguments.unshift(inRange.length);
        spliceArguments.unshift(inRange.location);
        this.charSequences.splice.apply(this.charSequences, spliceArguments);
    };

    UIMutableAttributedString.prototype.insertAttributedString = function insertAttributedString(attributedString, atIndex) {
        var spliceArguments = attributedString.charSequences.slice();
        spliceArguments.unshift(0);
        spliceArguments.unshift(atIndex);
        this.charSequences.splice.apply(this.charSequences, spliceArguments);
    };

    UIMutableAttributedString.prototype.appendAttributedString = function appendAttributedString(attributedString) {
        var _this4 = this;

        attributedString.charSequences.forEach(function (it) {
            _this4.charSequences.push(it);
        });
    };

    UIMutableAttributedString.prototype.deleteCharacters = function deleteCharacters(inRange) {
        this.charSequences.splice(inRange.location, inRange.length);
    };

    UIMutableAttributedString.prototype.immutable = function immutable() {
        var immutableString = new UIAttributedString("", this.attributes);
        immutableString.charSequences = this.charSequences.map(function (it) {
            return new Character(it.letter, Object.assign({}, it.attributes));
        });
        return immutableString;
    };

    return UIMutableAttributedString;
}(UIAttributedString);

exports.UIMutableAttributedString = UIMutableAttributedString;

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var UIComponentManager_1 = __webpack_require__(2);

var TextMeasurer = function () {
    function TextMeasurer() {
        _classCallCheck(this, TextMeasurer);
    }

    TextMeasurer.measureAttributedText = function measureAttributedText(text, inSize) {
        return new Promise(function (resolver, rejector) {
            var measureBlock = function measureBlock() {
                var keyWindowComponent = UIComponentManager_1.UIComponentManager.keyWindowComponent;
                if (keyWindowComponent) {
                    keyWindowComponent.setData({
                        measuringText: '',
                        measuringTextStyle: "\n                        width: " + inSize.width + "px;\n                        height: " + inSize.height + "px;\n                    }",
                        measuringRichText: text.toHTMLText()
                    }, function () {
                        var q = wx.createSelectorQuery().in(keyWindowComponent);
                        q.select('#_text_measurer').boundingClientRect(function (res) {
                            if (res) {
                                resolver({ x: 0, y: 0, width: res.width, height: res.height });
                            } else {
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
                var intervalHandler = undefined;
                var retryCount = 0;
                intervalHandler = setInterval(function () {
                    retryCount++;
                    if (!measureBlock() && retryCount >= 10) {
                        clearInterval(intervalHandler);
                        rejector && rejector(Error("UIWindow not ready."));
                    } else {
                        clearInterval(intervalHandler);
                    }
                }, 100);
            }
        });
    };

    TextMeasurer.measureText = function measureText(text, params) {
        return new Promise(function (resolver, rejector) {
            var keyWindowComponent = UIComponentManager_1.UIComponentManager.keyWindowComponent;
            if (keyWindowComponent) {
                keyWindowComponent.setData({
                    measuringRichText: "",
                    measuringText: text,
                    measuringTextStyle: "\n                    font-size: " + (params.font !== undefined ? params.font.pointSize : 14) + "px;\n                    font-family: " + (params.font !== undefined ? params.font.fontName : "") + "; \n                    font-weight: " + (params.font !== undefined ? params.font.fontStyle : "") + "; \n                    font-style: " + (params.font !== undefined ? params.font.fontStyle : "") + "; \n                    " + function () {
                        if (params.numberOfLines === 1) {
                            return "\n                            overflow: hidden;\n                            text-overflow: ellipsis;\n                            display: inline-block;\n                            white-space: nowrap;\n                            ";
                        } else {
                            return "\n                            overflow: hidden;\n                            text-overflow: ellipsis;\n                            display: -webkit-box;\n                            webkit-box-orient: vertical;\n                            ";
                        }
                    }() + ";\n                    width: " + params.inRect.width + "px;\n                    height: " + params.inRect.height + "px;\n                }"
                }, function () {
                    var q = wx.createSelectorQuery().in(keyWindowComponent);
                    q.select('#_text_measurer').boundingClientRect(function (res) {
                        if (res) {
                            resolver({ x: 0, y: 0, width: res.width, height: res.height });
                        } else {
                            rejector(Error("TextMeasurer error."));
                        }
                    });
                    q.exec();
                });
            }
        });
    };

    return TextMeasurer;
}();

exports.TextMeasurer = TextMeasurer;

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var UISize_1 = __webpack_require__(13);
var UIRect_1 = __webpack_require__(9);
var UIEdgeInsets_1 = __webpack_require__(8);
var UICollectionView_1 = __webpack_require__(34);
var UIIndexPath_1 = __webpack_require__(26);
var UICollectionViewScrollDirection;
(function (UICollectionViewScrollDirection) {
    UICollectionViewScrollDirection[UICollectionViewScrollDirection["vertical"] = 0] = "vertical";
    UICollectionViewScrollDirection[UICollectionViewScrollDirection["horizontal"] = 1] = "horizontal";
})(UICollectionViewScrollDirection = exports.UICollectionViewScrollDirection || (exports.UICollectionViewScrollDirection = {}));
var UIFlowLayoutCommonRowHorizontalAlignmentKey = "UIFlowLayoutCommonRowHorizontalAlignmentKey";
var UIFlowLayoutLastRowHorizontalAlignmentKey = "UIFlowLayoutLastRowHorizontalAlignmentKey";
var UIFlowLayoutRowVerticalAlignmentKey = "UIFlowLayoutRowVerticalAlignmentKey";
var UICollectionElementKindSectionHeader = "UICollectionElementKindSectionHeader";
var UICollectionElementKindSectionFooter = "UICollectionElementKindSectionFooter";
var UIFlowLayoutHorizontalAlignment;
(function (UIFlowLayoutHorizontalAlignment) {
    UIFlowLayoutHorizontalAlignment[UIFlowLayoutHorizontalAlignment["left"] = 0] = "left";
    UIFlowLayoutHorizontalAlignment[UIFlowLayoutHorizontalAlignment["center"] = 1] = "center";
    UIFlowLayoutHorizontalAlignment[UIFlowLayoutHorizontalAlignment["right"] = 2] = "right";
    UIFlowLayoutHorizontalAlignment[UIFlowLayoutHorizontalAlignment["justify"] = 3] = "justify";
})(UIFlowLayoutHorizontalAlignment = exports.UIFlowLayoutHorizontalAlignment || (exports.UIFlowLayoutHorizontalAlignment = {}));

var UIGridLayoutInfo = function () {
    function UIGridLayoutInfo() {
        _classCallCheck(this, UIGridLayoutInfo);

        this.sections = [];
        this.rowAlignmentOptions = {};
        this.usesFloatingHeaderFooter = false;
        this.dimension = 0.0;
        this.horizontal = false;
        this.leftToRight = false;
        this.contentSize = UISize_1.UISizeZero;
        this._isValid = false;
    }

    UIGridLayoutInfo.prototype.frameForItemAtIndexPath = function frameForItemAtIndexPath(indexPath) {
        var section = this.sections[indexPath.section];
        var itemFrame = void 0;
        if (section.fixedItemSize) {
            itemFrame = { x: 0.0, y: 0.0, width: section.itemSize.width, height: section.itemSize.height };
        } else {
            itemFrame = section.items[indexPath.row].itemFrame;
        }
        return itemFrame;
    };

    UIGridLayoutInfo.prototype.addSection = function addSection() {
        var section = new UIGridLayoutSection();
        section.rowAlignmentOptions = this.rowAlignmentOptions;
        section.layoutInfo = this;
        this.sections.push(section);
        this.invalidate(false);
        return section;
    };

    UIGridLayoutInfo.prototype.invalidate = function invalidate(arg) {
        this._isValid = false;
    };

    UIGridLayoutInfo.prototype.snapshot = function snapshot() {
        var layoutInfo = new UIGridLayoutInfo();
        layoutInfo.sections = this.sections.slice(0);
        layoutInfo.rowAlignmentOptions = this.rowAlignmentOptions;
        layoutInfo.usesFloatingHeaderFooter = this.usesFloatingHeaderFooter;
        layoutInfo.dimension = this.dimension;
        layoutInfo.horizontal = this.horizontal;
        layoutInfo.leftToRight = this.leftToRight;
        layoutInfo.contentSize = Object.assign({}, this.contentSize);
        return layoutInfo;
    };

    return UIGridLayoutInfo;
}();

var UIGridLayoutSection = function () {
    function UIGridLayoutSection() {
        _classCallCheck(this, UIGridLayoutSection);

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

    UIGridLayoutSection.prototype.recomputeFromIndex = function recomputeFromIndex(index) {
        this.invalidate();
        this.computeLayout();
    };

    UIGridLayoutSection.prototype.invalidate = function invalidate() {
        this._isValid = false;
        this.rows = [];
    };

    UIGridLayoutSection.prototype.computeLayout = function computeLayout() {
        if (!this._isValid) {
            var layoutInfo = this.layoutInfo;
            if (layoutInfo === undefined) {
                return;
            }
            var sectionSize = { width: 0.0, height: 0.0 };
            var rowIndex = 0;
            var itemIndex = 0;
            var itemsByRowCount = 0;
            var dimensionLeft = 0.0;
            var row = undefined;
            var headerFooterDimension = layoutInfo.dimension;
            var dimension = headerFooterDimension;
            if (layoutInfo.horizontal) {
                dimension -= this.sectionMargins.top + this.sectionMargins.bottom;
                this.headerFrame = { x: sectionSize.width, y: 0.0, width: this.headerDimension, height: headerFooterDimension };
                sectionSize.width += this.headerDimension + this.sectionMargins.right;
            } else {
                dimension -= this.sectionMargins.left + this.sectionMargins.right;
                this.headerFrame = { x: 0.0, y: sectionSize.height, width: headerFooterDimension, height: this.headerDimension };
                sectionSize.height += this.headerDimension + this.sectionMargins.top;
            }
            var spacing = layoutInfo.horizontal ? this.verticalInterstice : this.horizontalInterstice;
            while (itemIndex <= this.itemsCount) {
                var finishCycle = itemIndex >= this.itemsCount;
                var item = undefined;
                if (!finishCycle) {
                    item = this.fixedItemSize ? undefined : this.items[itemIndex];
                }
                var itemSize = this.fixedItemSize ? this.itemSize : item && item.itemFrame ? { width: item.itemFrame.width, height: item.itemFrame.height } : { width: 0, height: 0 };
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
                        } else {
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
                } else {
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
            } else {
                sectionSize.height += this.sectionMargins.bottom;
                this.footerFrame = { x: 0.0, y: sectionSize.height, width: headerFooterDimension, height: this.footerDimension };
                sectionSize.height += this.footerDimension;
            }
            this.frame = { x: 0.0, y: 0.0, width: sectionSize.width, height: sectionSize.height };
            this._isValid = true;
        }
    };

    UIGridLayoutSection.prototype.addItem = function addItem() {
        var item = new UIGridLayoutItem();
        item.section = this;
        this.items.push(item);
        return item;
    };

    UIGridLayoutSection.prototype.addRow = function addRow() {
        var item = new UIGridLayoutRow();
        item.section = this;
        this.rows.push(item);
        return item;
    };

    UIGridLayoutSection.prototype.snapshot = function snapshot() {
        var snapshotSection = new UIGridLayoutSection();
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
    };

    _createClass(UIGridLayoutSection, [{
        key: "itemsCount",
        get: function get() {
            return this.fixedItemSize ? this._itemsCount : this.items.length;
        },
        set: function set(value) {
            this._itemsCount = value;
        }
    }]);

    return UIGridLayoutSection;
}();

var UIGridLayoutItem = function UIGridLayoutItem() {
    _classCallCheck(this, UIGridLayoutItem);

    this.section = undefined;
    this.rowObject = undefined;
    this.itemFrame = { x: 0.0, y: 0.0, width: 0.0, height: 0.0 };
};

var UIGridLayoutRow = function () {
    function UIGridLayoutRow() {
        _classCallCheck(this, UIGridLayoutRow);

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

    UIGridLayoutRow.prototype.addItem = function addItem(item) {
        this.items.push(item);
        item.rowObject = this;
        this.invalidate();
    };

    UIGridLayoutRow.prototype.layoutRow = function layoutRow() {
        this.layoutRowAndGenerateRectArray(false);
    };

    UIGridLayoutRow.prototype.itemRects = function itemRects() {
        return this.layoutRowAndGenerateRectArray(true) || [];
    };

    UIGridLayoutRow.prototype.invalidate = function invalidate() {
        this._isValid = false;
        this.rowSize = UISize_1.UISizeZero;
        this.rowFrame = { x: 0.0, y: 0.0, width: 0.0, height: 0.0 };
    };

    UIGridLayoutRow.prototype.snapshot = function snapshot() {
        var snapshotRow = new UIGridLayoutRow();
        snapshotRow.section = this.section;
        snapshotRow.items = this.items;
        snapshotRow.rowSize = Object.assign({}, this.rowSize);
        snapshotRow.rowFrame = Object.assign({}, this.rowFrame);
        snapshotRow.index = this.index;
        snapshotRow.complete = this.complete;
        snapshotRow.fixedItemSize = this.fixedItemSize;
        snapshotRow.itemCount = this.itemCount;
        return snapshotRow;
    };

    UIGridLayoutRow.prototype.layoutRowAndGenerateRectArray = function layoutRowAndGenerateRectArray(generateRectArray) {
        var rects = generateRectArray ? [] : undefined;
        if (!this._isValid || generateRectArray) {
            var section = this.section;
            if (section === undefined) {
                return undefined;
            }
            var isHorizontal = section.layoutInfo && section.layoutInfo.horizontal ? true : false;
            var isLastRow = section.indexOfImcompleteRow == this.index;
            var horizontalAlignment = section.rowAlignmentOptions[isLastRow ? UIFlowLayoutLastRowHorizontalAlignmentKey : UIFlowLayoutCommonRowHorizontalAlignmentKey];
            if (horizontalAlignment === undefined) {
                return undefined;
            }
            var leftOverSpace = section.layoutInfo && section.layoutInfo.dimension || 0.0;
            if (isHorizontal) {
                leftOverSpace -= section.sectionMargins.top + section.sectionMargins.bottom;
            } else {
                leftOverSpace -= section.sectionMargins.left + section.sectionMargins.right;
            }
            var usedItemCount = 0;
            var itemIndex = 0;
            var spacing = isHorizontal ? section.verticalInterstice : section.horizontalInterstice;
            while (itemIndex < this.itemCount || isLastRow) {
                var nextItemSize;
                if (!this.fixedItemSize) {
                    var _item = this.items[Math.min(itemIndex, this.itemCount - 1)];
                    nextItemSize = isHorizontal ? _item.itemFrame.height : _item.itemFrame.width;
                } else {
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
            } else if (horizontalAlignment == UIFlowLayoutHorizontalAlignment.center || horizontalAlignment == UIFlowLayoutHorizontalAlignment.justify && usedItemCount == 1) {
                itemOffset.x += leftOverSpace / 2.0;
            }
            var interSpacing = usedItemCount <= 1 ? 0.0 : leftOverSpace / (usedItemCount - 1);
            var frame = { x: 0.0, y: 0.0, width: 0.0, height: 0.0 };
            var itemFrame = { x: 0.0, y: 0.0, width: section.itemSize.width, height: section.itemSize.height };
            for (var _itemIndex = 0; _itemIndex < this.itemCount; _itemIndex++) {
                var item = undefined;
                if (!this.fixedItemSize) {
                    item = this.items[_itemIndex];
                    itemFrame = Object.assign({}, item.itemFrame);
                }
                if (isHorizontal) {
                    itemFrame.y = itemOffset.y;
                    itemOffset.y += itemFrame.height + section.verticalInterstice;
                    if (horizontalAlignment == UIFlowLayoutHorizontalAlignment.justify) {
                        itemOffset.y += interSpacing;
                    }
                } else {
                    itemFrame.x = itemOffset.x;
                    itemOffset.x += itemFrame.width + section.horizontalInterstice;
                    if (horizontalAlignment == UIFlowLayoutHorizontalAlignment.justify) {
                        itemOffset.x += interSpacing;
                    }
                }
                var iFrame = { x: itemFrame.x, y: itemFrame.y, width: itemFrame.width, height: itemFrame.height };
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
    };

    _createClass(UIGridLayoutRow, [{
        key: "itemCount",
        get: function get() {
            return this.fixedItemSize ? this._itemCount : this.items.length;
        },
        set: function set(value) {
            this._itemCount = value;
        }
    }]);

    return UIGridLayoutRow;
}();

var UICollectionViewFlowLayout = function (_UICollectionView_1$U) {
    _inherits(UICollectionViewFlowLayout, _UICollectionView_1$U);

    function UICollectionViewFlowLayout() {
        var _this$rowAlignmentOpt;

        _classCallCheck(this, UICollectionViewFlowLayout);

        var _this = _possibleConstructorReturn(this, _UICollectionView_1$U.apply(this, arguments));

        _this._data = undefined;
        _this.minimumLineSpacing = 10.0;
        _this.minimumInteritemSpacing = 10.0;
        _this.itemSize = { width: 50.0, height: 50.0 };
        _this.headerReferenceSize = UISize_1.UISizeZero;
        _this.footerReferenceSize = UISize_1.UISizeZero;
        _this._sectionInset = UIEdgeInsets_1.UIEdgeInsetsZero;
        _this.scrollDirection = UICollectionViewScrollDirection.vertical;
        _this.rowAlignmentOptions = (_this$rowAlignmentOpt = {}, _this$rowAlignmentOpt[UIFlowLayoutCommonRowHorizontalAlignmentKey] = UIFlowLayoutHorizontalAlignment.justify, _this$rowAlignmentOpt[UIFlowLayoutLastRowHorizontalAlignmentKey] = UIFlowLayoutHorizontalAlignment.justify, _this$rowAlignmentOpt[UIFlowLayoutRowVerticalAlignmentKey] = 1, _this$rowAlignmentOpt);
        _this._visibleBounds = UIRect_1.UIRectZero;
        _this.rectCache = [];
        return _this;
    }

    UICollectionViewFlowLayout.prototype.prepareLayout = function prepareLayout() {
        _UICollectionView_1$U.prototype.prepareLayout.call(this);
        var data = new UIGridLayoutInfo();
        data.horizontal = this.scrollDirection == UICollectionViewScrollDirection.horizontal;
        this._visibleBounds = this.collectionView ? this.collectionView.visibleBoundRects : UIRect_1.UIRectZero;
        data.dimension = data.horizontal ? this._visibleBounds.height : this._visibleBounds.width;
        data.rowAlignmentOptions = this.rowAlignmentOptions;
        this._data = data;
        this.fetchItemsInfo();
    };

    UICollectionViewFlowLayout.prototype.layoutAttributesForElementsInRect = function layoutAttributesForElementsInRect(rect) {
        var _this2 = this;

        if (this._data == undefined) {
            this.prepareLayout();
        }
        var layoutAttributesArray = [];
        var _data = this._data;
        if (_data === undefined) {
            return [];
        }
        _data.sections.forEach(function (section, sectionIndex) {
            if (true) {
                var rectCache = _this2.rectCache;
                var normalizedHeaderFrame = { x: section.headerFrame.x + section.frame.x, y: section.headerFrame.y + section.frame.y, width: section.headerFrame.width, height: section.headerFrame.height };
                if (!UIRect_1.UIRectIsEmpty(normalizedHeaderFrame) && UIRect_1.UIRectIntersectsRect(normalizedHeaderFrame, rect)) {
                    var layoutAttributes = new _this2.layoutAttributesClass(new UIIndexPath_1.UIIndexPath(0, sectionIndex), UICollectionElementKindSectionHeader, UICollectionView_1.ItemType.supplementaryView);
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
                section.rows.forEach(function (row) {
                    var normalizedRowFrame = { x: row.rowFrame.x + section.frame.x, y: row.rowFrame.y + section.frame.y, width: row.rowFrame.width, height: row.rowFrame.height };
                    if (UIRect_1.UIRectIntersectsRect(normalizedRowFrame, rect)) {
                        for (var itemIndex = 0; itemIndex < row.itemCount; itemIndex++) {
                            var _layoutAttributes = void 0;
                            var sectionItemIndex = void 0;
                            var itemFrame = void 0;
                            if (row.fixedItemSize) {
                                itemFrame = itemRects[itemIndex] || UIRect_1.UIRectZero;
                                sectionItemIndex = row.index * section.itemsByRowCount + itemIndex;
                            } else {
                                var item = row.items[itemIndex];
                                sectionItemIndex = section.items.indexOf(item);
                                itemFrame = item.itemFrame;
                            }
                            var normalizedItemFrame = { x: normalizedRowFrame.x + itemFrame.x, y: normalizedRowFrame.y + itemFrame.y, width: itemFrame.width, height: itemFrame.height };
                            if (UIRect_1.UIRectIntersectsRect(normalizedItemFrame, rect)) {
                                _layoutAttributes = new _this2.layoutAttributesClass(new UIIndexPath_1.UIIndexPath(sectionItemIndex, sectionIndex), UICollectionView_1.UICollectionElementKindCell, UICollectionView_1.ItemType.cell);
                                _layoutAttributes.frame = normalizedItemFrame;
                                layoutAttributesArray.push(_layoutAttributes);
                            }
                        }
                    }
                });
                var normalizedFooterFrame = { x: section.footerFrame.x + section.frame.x, y: section.footerFrame.y + section.frame.y, width: section.footerFrame.width, height: section.footerFrame.height };
                if (!UIRect_1.UIRectIsEmpty(normalizedFooterFrame) && UIRect_1.UIRectIntersectsRect(normalizedFooterFrame, rect)) {
                    var _layoutAttributes2 = new _this2.layoutAttributesClass(new UIIndexPath_1.UIIndexPath(0, sectionIndex), UICollectionElementKindSectionFooter, UICollectionView_1.ItemType.supplementaryView);
                    _layoutAttributes2.frame = normalizedFooterFrame;
                    layoutAttributesArray.push(_layoutAttributes2);
                }
            }
        });
        return layoutAttributesArray;
    };

    UICollectionViewFlowLayout.prototype.layoutAttributesForItemAtIndexPath = function layoutAttributesForItemAtIndexPath(indexPath) {
        if (this._data === undefined) {
            this.prepareLayout();
        }
        var _data = this._data;
        if (_data === undefined) {
            return undefined;
        }
        var section = _data.sections[indexPath.section];
        var row = undefined;
        var itemFrame = { x: 0.0, y: 0.0, width: 0.0, height: 0.0 };
        if (section.fixedItemSize && section.itemsByRowCount > 0 && indexPath.row / section.itemsByRowCount < section.rows.length) {
            row = section.rows[indexPath.row / section.itemsByRowCount];
            var itemIndex = indexPath.row % section.itemsByRowCount;
            var itemRects = row.itemRects();
            itemFrame = itemRects[itemIndex];
        } else if (indexPath.row < section.items.length) {
            var item = section.items[indexPath.row];
            row = item.rowObject;
            itemFrame = item.itemFrame;
        }
        var layoutAttributes = new this.layoutAttributesClass(indexPath, UICollectionView_1.UICollectionElementKindCell, UICollectionView_1.ItemType.cell);
        if (row) {
            var normalizedRowFrame = { x: row.rowFrame.x + section.frame.x, y: row.rowFrame.y + section.frame.y, width: row.rowFrame.width, height: row.rowFrame.height };
            layoutAttributes.frame = { x: normalizedRowFrame.x + itemFrame.x, y: normalizedRowFrame.y + itemFrame.y, width: itemFrame.width, height: itemFrame.height };
        }
        return layoutAttributes;
    };

    UICollectionViewFlowLayout.prototype.layoutAttributesForSupplementaryViewOfKind = function layoutAttributesForSupplementaryViewOfKind(kind, indexPath) {
        if (this._data === undefined) {
            this.prepareLayout();
        }
        var _data = this._data;
        if (_data === undefined) {
            return undefined;
        }
        var sectionIndex = indexPath.section;
        var layoutAttributes = undefined;
        if (sectionIndex < _data.sections.length) {
            var section = _data.sections[sectionIndex];
            var normalizedFrame = { x: 0.0, y: 0.0, width: 0.0, height: 0.0 };
            if (kind == UICollectionElementKindSectionHeader) {
                normalizedFrame = section.headerFrame;
            } else if (kind == UICollectionElementKindSectionFooter) {
                normalizedFrame = section.footerFrame;
            }
            if (!UIRect_1.UIRectIsEmpty(normalizedFrame)) {
                normalizedFrame = { x: normalizedFrame.x + section.frame.x, y: normalizedFrame.y + section.frame.y, width: normalizedFrame.width, height: normalizedFrame.height };
                layoutAttributes = new this.layoutAttributesClass(new UIIndexPath_1.UIIndexPath(0, sectionIndex), kind, UICollectionView_1.ItemType.supplementaryView);
                layoutAttributes.frame = normalizedFrame;
            }
        }
        return layoutAttributes;
    };

    UICollectionViewFlowLayout.prototype.layoutAttributesForDecorationViewOfKind = function layoutAttributesForDecorationViewOfKind(kind, indexPath) {
        return undefined;
    };

    UICollectionViewFlowLayout.prototype.collectionViewContentSize = function collectionViewContentSize() {
        if (this._data === undefined) {
            this.prepareLayout();
        }
        var _data = this._data;
        if (_data === undefined) {
            return _UICollectionView_1$U.prototype.collectionViewContentSize.call(this);
        }
        return _data.contentSize;
    };

    UICollectionViewFlowLayout.prototype.invalidateLayout = function invalidateLayout() {
        _UICollectionView_1$U.prototype.invalidateLayout.call(this);
        this.rectCache = [];
        this._data = undefined;
    };

    UICollectionViewFlowLayout.prototype.__sizeForItem = function __sizeForItem(indexPath) {
        return this.val("sizeForItem", indexPath) || this.itemSize;
    };

    UICollectionViewFlowLayout.prototype.__insetForSection = function __insetForSection(inSection) {
        return this.val("insetForSection", inSection) || this.sectionInset;
    };

    UICollectionViewFlowLayout.prototype.__minimumLineSpacing = function __minimumLineSpacing(inSection) {
        var value = this.val("minimumLineSpacing", inSection);
        return typeof value === "number" ? value : this.minimumLineSpacing;
    };

    UICollectionViewFlowLayout.prototype.__minimumInteritemSpacing = function __minimumInteritemSpacing(inSection) {
        var value = this.val("minimumInteritemSpacing", inSection);
        return typeof value === "number" ? value : this.minimumInteritemSpacing;
    };

    UICollectionViewFlowLayout.prototype.__referenceSizeForHeader = function __referenceSizeForHeader(inSection) {
        return this.headerReferenceSize;
    };

    UICollectionViewFlowLayout.prototype.__referenceSizeForFooter = function __referenceSizeForFooter(inSection) {
        return this.footerReferenceSize;
    };

    UICollectionViewFlowLayout.prototype.fetchItemsInfo = function fetchItemsInfo() {
        this.getSizingInfos();
        this.updateItemsLayout();
    };

    UICollectionViewFlowLayout.prototype.getSizingInfos = function getSizingInfos() {
        var _data = this._data;
        if (_data === undefined) {
            return;
        }
        var collectionView = this.collectionView;
        if (collectionView === undefined) {
            return;
        }
        var numberOfSections = collectionView.numberOfSections();
        for (var section = 0; section < numberOfSections; section++) {
            var layoutSection = _data.addSection();
            layoutSection.verticalInterstice = _data.horizontal ? this.__minimumInteritemSpacing(section) : this.__minimumLineSpacing(section);
            layoutSection.horizontalInterstice = !_data.horizontal ? this.__minimumInteritemSpacing(section) : this.__minimumLineSpacing(section);
            layoutSection.sectionMargins = this.__insetForSection(section);
            layoutSection.headerDimension = _data.horizontal ? this.__referenceSizeForHeader(section).width : this.__referenceSizeForHeader(section).height;
            layoutSection.footerDimension = _data.horizontal ? this.__referenceSizeForFooter(section).width : this.__referenceSizeForFooter(section).height;
            var numberOfItems = collectionView.numberOfItemsInSection(section);
            for (var item = 0; item < numberOfItems; item++) {
                var indexPath = new UIIndexPath_1.UIIndexPath(item, section);
                var itemSize = this.__sizeForItem(indexPath);
                var layoutItem = layoutSection.addItem();
                layoutItem.itemFrame = { x: 0.0, y: 0.0, width: itemSize.width, height: itemSize.height };
            }
        }
    };

    UICollectionViewFlowLayout.prototype.updateItemsLayout = function updateItemsLayout() {
        var _data = this._data;
        if (_data === undefined) {
            return;
        }
        var contentSize = { width: 0, height: 0 };
        _data.sections.forEach(function (section) {
            section.computeLayout();
            var sectionFrame = Object.assign({}, section.frame);
            if (_data.horizontal) {
                sectionFrame.x += contentSize.width;
                contentSize.width += section.frame.width + section.frame.x;
                contentSize.height = Math.max(contentSize.height, sectionFrame.height + section.frame.y + section.sectionMargins.top + section.sectionMargins.bottom);
            } else {
                sectionFrame.y += contentSize.height;
                contentSize.height += sectionFrame.height + section.frame.y;
                contentSize.width = Math.max(contentSize.width, sectionFrame.width + section.frame.x + section.sectionMargins.left + section.sectionMargins.right);
            }
            section.frame = { x: sectionFrame.x, y: sectionFrame.y, width: sectionFrame.width, height: sectionFrame.height };
        });
        _data.contentSize = { width: contentSize.width, height: contentSize.height };
    };

    _createClass(UICollectionViewFlowLayout, [{
        key: "sectionInset",
        get: function get() {
            return this._sectionInset;
        },
        set: function set(value) {
            this._sectionInset = value;
            this.invalidateLayout();
        }
    }]);

    return UICollectionViewFlowLayout;
}(UICollectionView_1.UICollectionViewLayout);

exports.UICollectionViewFlowLayout = UICollectionViewFlowLayout;

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });

var UIConfirm = function () {
    function UIConfirm(message) {
        _classCallCheck(this, UIConfirm);

        this.message = message;
        this.confirmTitle = "Yes";
        this.cancelTitle = "No";
    }

    UIConfirm.prototype.show = function show(completed, cancelled) {
        wx.showModal({
            title: "",
            content: this.message,
            cancelText: this.cancelTitle,
            confirmText: this.confirmTitle,
            success: function success(res) {
                if (res.confirm) {
                    if (completed) {
                        completed();
                    }
                } else if (res.cancel) {
                    if (cancelled) {
                        cancelled();
                    }
                }
            }
        });
    };

    return UIConfirm;
}();

exports.UIConfirm = UIConfirm;

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var UUID_1 = __webpack_require__(31);

var UIDevice = function UIDevice() {
    _classCallCheck(this, UIDevice);

    this.name = "Browser";
    this.model = "Browser";
    this.systemName = "WeChat";
    this.systemVersion = "1.0.0";
    var systemInfo = wx.getSystemInfoSync();
    this.name = systemInfo.brand;
    this.model = systemInfo.model;
    this.systemName = "WeChat";
    this.systemVersion = systemInfo.SDKVersion;
    var idfv = wx.getStorageSync("com.xt.identifierForVendor");
    if (typeof idfv === "string" && idfv.length > 0) {
        this.identifierForVendor = new UUID_1.UUID(idfv);
    } else {
        this.identifierForVendor = new UUID_1.UUID();
        wx.setStorageSync("com.xt.identifierForVendor", this.identifierForVendor.UUIDString);
    }
};

UIDevice.current = new UIDevice();
exports.UIDevice = UIDevice;

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var UIViewController_1 = __webpack_require__(15);

var UINavigationBarViewController = function (_UIViewController_1$U) {
    _inherits(UINavigationBarViewController, _UIViewController_1$U);

    function UINavigationBarViewController() {
        _classCallCheck(this, UINavigationBarViewController);

        var _this = _possibleConstructorReturn(this, _UIViewController_1$U.call(this));

        _this.clazz = "UINavigationBarViewController";
        console.warn("暂时不支持 UINavigationBarViewController 在小程序中使用。");
        return _this;
    }

    return UINavigationBarViewController;
}(UIViewController_1.UIViewController);

exports.UINavigationBarViewController = UINavigationBarViewController;

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var UIEdgeInsets_1 = __webpack_require__(8);

var UITabBarItem = function () {
    function UITabBarItem() {
        _classCallCheck(this, UITabBarItem);

        this._title = undefined;
        this._image = undefined;
        this._selectedImage = undefined;
        this._imageInsets = UIEdgeInsets_1.UIEdgeInsetsZero;
        // Implementation
        this.barButton = undefined;
    }

    _createClass(UITabBarItem, [{
        key: "title",
        get: function get() {
            return this._title;
        },
        set: function set(value) {
            this._title = value;
            if (this.barButton) {
                this.barButton.setNeedUpdate();
            }
        }
    }, {
        key: "image",
        get: function get() {
            return this._image;
        },
        set: function set(value) {
            this._image = value;
            if (this.barButton) {
                this.barButton.setNeedUpdate();
            }
        }
    }, {
        key: "selectedImage",
        get: function get() {
            return this._selectedImage;
        },
        set: function set(value) {
            this._selectedImage = value;
            if (this.barButton) {
                this.barButton.setNeedUpdate();
            }
        }
    }, {
        key: "imageInsets",
        get: function get() {
            return this._imageInsets;
        },
        set: function set(value) {
            this._imageInsets = value;
            if (this.barButton) {
                this.barButton.setNeedUpdate();
            }
        }
    }]);

    return UITabBarItem;
}();

exports.UITabBarItem = UITabBarItem;

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var UIViewController_1 = __webpack_require__(15);
var UINavigationBar_1 = __webpack_require__(27);
var UIAnimator_1 = __webpack_require__(7);
var UIColor_1 = __webpack_require__(5);

var UINavigationController = function (_UIViewController_1$U) {
    _inherits(UINavigationController, _UIViewController_1$U);

    function UINavigationController(rootViewController) {
        _classCallCheck(this, UINavigationController);

        var _this = _possibleConstructorReturn(this, _UIViewController_1$U.call(this));

        _this.rootViewController = rootViewController;
        _this.clazz = "UINavigationController";
        _this.navigationBar = new UINavigationBar_1.UINavigationBar();
        _this.attachBlock = undefined;
        return _this;
    }

    UINavigationController.prototype.attach = function attach(dataOwner, dataField) {
        var _this2 = this;

        var idx = dataOwner.options && parseInt(dataOwner.options.idx);
        if (isNaN(idx)) {
            idx = 0;
        }
        this.attachBlock = function () {
            if (idx < _this2.childViewControllers.length) {
                _this2.childViewControllers[idx].iView.attach(dataOwner, dataField);
            }
        };
        this.attachBlock();
        this.loadViewIfNeed();
        dataOwner.onShow = this._onShow.bind(this);
        this.updateBrowserTitle();
        this.updateBrowserBar();
    };

    UINavigationController.prototype._onShow = function _onShow() {
        var currentIdx = getCurrentPages().length - 1;
        if (currentIdx < this.childViewControllers.length) {
            this.popToViewController(this.childViewControllers[currentIdx]);
        }
    };

    UINavigationController.prototype.viewDidLoad = function viewDidLoad() {
        if (this.rootViewController) {
            this.pushViewController(this.rootViewController, false);
        }
        this.navigationBar.navigationController = this;
        _UIViewController_1$U.prototype.viewDidLoad.call(this);
        this.updateBrowserBar();
    };

    UINavigationController.prototype.pushViewController = function pushViewController(viewController) {
        var animated = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        this.addChildViewController(viewController);
        if (this.childViewControllers.length === 1) {
            if (this.attachBlock) {
                this.attachBlock();
            } else if (this.childViewControllers[0].iView.superview === undefined) {
                this.view.addSubview(this.childViewControllers[0].iView);
            }
        } else {
            if (this.tabBarController) {
                this.tabBarController.activedNavigationController = this;
            }
            wx.navigateTo({ url: "index?idx=" + (this.childViewControllers.length - 1) });
        }
        this.updateBrowserTitle();
        this.updateBrowserBar();
    };

    UINavigationController.prototype.popViewController = function popViewController() {
        var animated = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

        var fromViewController = this.childViewControllers[this.childViewControllers.length - 1];
        var toViewController = this.childViewControllers[this.childViewControllers.length - 2];
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
    };

    UINavigationController.prototype.popToViewController = function popToViewController(viewController) {
        var animated = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        if (this.childViewControllers.indexOf(viewController) < 0) {
            return [];
        }
        var targetIndex = this.childViewControllers.indexOf(viewController);
        var fromViewControllers = this.childViewControllers.filter(function (_, index) {
            return index > targetIndex;
        });
        if (fromViewControllers.length == 0) {
            return [];
        }
        var toViewController = viewController;
        toViewController.iView.hidden = false;
        fromViewControllers.forEach(function (it) {
            it.viewWillDisappear(animated);
        });
        toViewController.viewWillAppear(animated);
        if (getCurrentPages().length !== this.childViewControllers.length - fromViewControllers.length) {
            wx.navigateBack({ delta: fromViewControllers.length });
        }
        fromViewControllers.forEach(function (it) {
            it.removeFromParentViewController();
        });
        fromViewControllers.forEach(function (it) {
            it.iView.removeFromSuperview();
        });
        fromViewControllers.forEach(function (it) {
            it.viewDidDisappear(false);
        });
        toViewController.viewDidAppear(false);
        this.updateBrowserTitle();
        this.updateBrowserBar();
        return fromViewControllers;
    };

    UINavigationController.prototype.popToRootViewController = function popToRootViewController() {
        var animated = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

        var rootViewController = this.childViewControllers[0];
        if (rootViewController === undefined) {
            return [];
        }
        return this.popToViewController(rootViewController, animated);
    };

    UINavigationController.prototype.viewWillLayoutSubviews = function viewWillLayoutSubviews() {
        _UIViewController_1$U.prototype.viewWillLayoutSubviews.call(this);
        if (this.childViewControllers[0]) {
            this.childViewControllers[0].iView.frame = this.view.bounds;
        }
    };

    UINavigationController.prototype.updateBrowserTitle = function updateBrowserTitle() {
        if (this.tabBarController && this.tabBarController.selectedViewController !== this) {
            return;
        }
        if (this.parentViewController === undefined && this.window === undefined && this.attachBlock === undefined) {
            return;
        }
        if (this.childViewControllers.length > 0) {
            var title = this.childViewControllers[this.childViewControllers.length - 1].title;
            if (title) {
                wx.setNavigationBarTitle({ title: title });
            }
        }
    };

    UINavigationController.prototype.updateBrowserBar = function updateBrowserBar() {
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
                    timingFunc: UIAnimator_1.UIAnimator.activeAnimator ? UIAnimator_1.UIAnimator.activeAnimator.animationProps.timingFunction : undefined
                }
            });
        } else {
            wx.setNavigationBarColor({
                backgroundColor: '#ffffff',
                frontColor: this.navigationBar.tintColor.toStyle() === UIColor_1.UIColor.white.toStyle() ? '#ffffff' : '#000000',
                animation: {
                    duration: UIAnimator_1.UIAnimator.activeAnimator ? UIAnimator_1.UIAnimator.activeAnimator.animationProps.duration : 0.0,
                    timingFunc: UIAnimator_1.UIAnimator.activeAnimator ? UIAnimator_1.UIAnimator.activeAnimator.animationProps.timingFunction : undefined
                }
            });
        }
    };

    return UINavigationController;
}(UIViewController_1.UIViewController);

exports.UINavigationController = UINavigationController;

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var UIViewController_1 = __webpack_require__(15);
var UIScrollView_1 = __webpack_require__(20);
var UIPoint_1 = __webpack_require__(11);
var UIAnimator_1 = __webpack_require__(7);

var UIPageViewController = function (_UIViewController_1$U) {
    _inherits(UIPageViewController, _UIViewController_1$U);

    function UIPageViewController() {
        var isVertical = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        _classCallCheck(this, UIPageViewController);

        var _this = _possibleConstructorReturn(this, _UIViewController_1$U.call(this));

        _this.isVertical = isVertical;
        _this.loops = false;
        _this._pageItems = undefined;
        _this._currentPage = undefined;
        // Implementation
        _this.scrollView = new UIScrollView_1.UIScrollView().on("didScroll", function () {
            _this.scrollView.subviews.forEach(function (it) {
                return it.hidden = false;
            });
        }).on("didEndScrollingAnimation", function () {
            _this.changeContents();
        });
        return _this;
    }

    UIPageViewController.prototype.scrollToNextPage = function scrollToNextPage() {
        var animated = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

        if (this.isVertical == true) {
            if (this.scrollView.contentInset.bottom > 0.0) {
                this.scrollView.setContentOffset({ x: 0.0, y: this.scrollView.contentInset.bottom }, animated);
                if (animated == false) {
                    this.changeContents();
                }
            }
        } else {
            if (this.scrollView.contentInset.right > 0.0) {
                this.scrollView.setContentOffset({ x: this.scrollView.contentInset.right, y: 0.0 }, animated);
                if (animated == false) {
                    this.changeContents();
                }
            }
        }
    };

    UIPageViewController.prototype.scrollToPreviousPage = function scrollToPreviousPage() {
        var animated = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

        if (this.isVertical == true) {
            if (this.scrollView.contentInset.top > 0.0) {
                this.scrollView.setContentOffset({ x: 0.0, y: -this.scrollView.contentInset.top }, animated);
                if (animated == false) {
                    this.changeContents();
                }
            }
        } else {
            if (this.scrollView.contentInset.left > 0.0) {
                this.scrollView.setContentOffset({ x: -this.scrollView.contentInset.left, y: 0.0 }, animated);
                if (animated == false) {
                    this.changeContents();
                }
            }
        }
    };

    UIPageViewController.prototype.beforeViewController = function beforeViewController(currentPage) {
        if (this.pageItems !== undefined) {
            var currentIndex = this.pageItems.indexOf(currentPage);
            if (currentIndex >= 0) {
                if (currentIndex > 0) {
                    return this.pageItems[currentIndex - 1];
                } else if (this.loops && this.pageItems.length > 1) {
                    return this.pageItems[this.pageItems.length - 1];
                }
            } else {
                return undefined;
            }
        }
        return this.val("beforeViewController", currentPage);
    };

    UIPageViewController.prototype.afterViewController = function afterViewController(currentPage) {
        if (this.pageItems !== undefined) {
            var currentIndex = this.pageItems.indexOf(currentPage);
            if (currentIndex >= 0) {
                if (currentIndex + 1 < this.pageItems.length) {
                    return this.pageItems[currentIndex + 1];
                } else if (this.loops && this.pageItems.length > 1) {
                    return this.pageItems[0];
                }
            } else {
                return undefined;
            }
        }
        return this.val("afterViewController", currentPage);
    };

    UIPageViewController.prototype.didFinishAnimating = function didFinishAnimating(currentPage, previousPage) {
        this.emit("didFinishAnimating", currentPage, previousPage);
    };

    UIPageViewController.prototype.viewDidLoad = function viewDidLoad() {
        this.scrollView.pagingEnabled = true;
        this.scrollView.bounces = false;
        this.scrollView.showsHorizontalScrollIndicator = false;
        this.scrollView.showsVerticalScrollIndicator = false;
        this.iView.addSubview(this.scrollView);
        _UIViewController_1$U.prototype.viewDidLoad.call(this);
    };

    UIPageViewController.prototype.viewWillLayoutSubviews = function viewWillLayoutSubviews() {
        this.scrollView.frame = this.iView.bounds;
        this.scrollView.contentSize = { width: this.iView.bounds.width, height: this.iView.bounds.height };
        this.resetContents();
        _UIViewController_1$U.prototype.viewWillLayoutSubviews.call(this);
    };

    UIPageViewController.prototype.changeContents = function changeContents() {
        if (this.isVertical == true) {
            if (Math.abs(this.scrollView.contentOffset.y - -this.scrollView.bounds.height) < 4.0) {
                var currentPage = this.currentPage;
                if (currentPage === undefined) {
                    return;
                }
                var beforePage = this.beforeViewController(currentPage);
                if (beforePage === undefined) {
                    return;
                }
                this.currentPage = beforePage;
                this.resetContents();
                this.didFinishAnimating(beforePage, currentPage);
            } else if (Math.abs(this.scrollView.contentOffset.y - this.scrollView.bounds.height) < 4.0) {
                var _currentPage = this.currentPage;
                if (_currentPage === undefined) {
                    return;
                }
                var afterPage = this.afterViewController(_currentPage);
                if (afterPage === undefined) {
                    return;
                }
                this.currentPage = afterPage;
                this.resetContents();
                this.didFinishAnimating(afterPage, _currentPage);
            }
        } else {
            if (Math.abs(this.scrollView.contentOffset.x - -this.scrollView.bounds.width) < 4.0) {
                var _currentPage2 = this.currentPage;
                if (_currentPage2 === undefined) {
                    return;
                }
                var _beforePage = this.beforeViewController(_currentPage2);
                if (_beforePage === undefined) {
                    return;
                }
                this.currentPage = _beforePage;
                this.resetContents();
                this.didFinishAnimating(_beforePage, _currentPage2);
            } else if (Math.abs(this.scrollView.contentOffset.x - this.scrollView.bounds.width) < 4.0) {
                var _currentPage3 = this.currentPage;
                if (_currentPage3 === undefined) {
                    return;
                }
                var _afterPage = this.afterViewController(_currentPage3);
                if (_afterPage === undefined) {
                    return;
                }
                this.currentPage = _afterPage;
                this.resetContents();
                this.didFinishAnimating(_afterPage, _currentPage3);
            }
        }
    };

    UIPageViewController.prototype.resetContents = function resetContents() {
        var _this2 = this;

        this.scrollView.alpha = 0.0;
        this.scrollView.setDataForce({ alpha: 0.0 }, function () {
            setTimeout(function () {
                var currentPage = _this2.currentPage;
                if (currentPage === undefined) {
                    return;
                }
                var beforePage = _this2.beforeViewController(currentPage);
                var afterPage = _this2.afterViewController(currentPage);
                _this2.scrollView.subviews.forEach(function (it) {
                    if (it != currentPage.iView && (beforePage === undefined || it != beforePage.iView) && (afterPage === undefined || it != afterPage.iView)) {
                        it.removeFromSuperview();
                    }
                });
                currentPage.iView.frame = _this2.iView.bounds;
                _this2.scrollView.addSubview(currentPage.iView);
                if (beforePage) {
                    _this2.addChildViewController(beforePage);
                    beforePage.iView.alpha = 0.0;
                    beforePage.iView.setDataForce({ alpha: 0.0 });
                    _this2.scrollView.addSubview(beforePage.iView);
                    if (_this2.isVertical == true) {
                        beforePage.iView.frame = { x: 0.0, y: -_this2.iView.bounds.height, width: _this2.iView.bounds.width, height: _this2.iView.bounds.height };
                    } else {
                        beforePage.iView.frame = { x: -_this2.iView.bounds.width, y: 0.0, width: _this2.iView.bounds.width, height: _this2.iView.bounds.height };
                    }
                }
                if (afterPage) {
                    _this2.addChildViewController(afterPage);
                    afterPage.iView.alpha = 0.0;
                    afterPage.iView.setDataForce({ alpha: 0.0 });
                    _this2.scrollView.addSubview(afterPage.iView);
                    if (_this2.isVertical == true) {
                        afterPage.iView.frame = { x: 0.0, y: _this2.iView.bounds.height, width: _this2.iView.bounds.width, height: _this2.iView.bounds.height };
                    } else {
                        afterPage.iView.frame = { x: _this2.iView.bounds.width, y: 0.0, width: _this2.iView.bounds.width, height: _this2.iView.bounds.height };
                    }
                }
                if (_this2.isVertical == true) {
                    _this2.scrollView.contentInset = {
                        top: beforePage !== undefined ? Math.ceil(_this2.iView.bounds.height) : 0.0,
                        left: 0.0,
                        bottom: afterPage !== undefined ? Math.ceil(_this2.iView.bounds.height) : 0.0,
                        right: 0.0
                    };
                } else {
                    _this2.scrollView.contentInset = {
                        top: 0.0,
                        left: beforePage !== undefined ? Math.ceil(_this2.iView.bounds.width) : 0.0,
                        bottom: 0.0,
                        right: afterPage !== undefined ? Math.ceil(_this2.iView.bounds.width) : 0.0
                    };
                }
                _this2.scrollView.contentOffset = UIPoint_1.UIPointZero;
                setTimeout(function () {
                    UIAnimator_1.UIAnimator.linear(0.30, function () {
                        currentPage.iView.alpha = 1.0;
                        _this2.scrollView.alpha = 1.0;
                    }, undefined);
                }, 50);
                _this2.childViewControllers.forEach(function (it) {
                    if (it !== _this2.currentPage && it !== beforePage && it !== afterPage) {
                        it.iView.removeFromSuperview();
                        it.removeFromParentViewController();
                    }
                    it.iView.hidden = it !== _this2.currentPage;
                });
                _this2.scrollView.markFlagDirty("pagingItems");
            }, 50);
        });
    };

    _createClass(UIPageViewController, [{
        key: "pageItems",
        get: function get() {
            return this._pageItems;
        },
        set: function set(value) {
            this._pageItems = value;
            if (value && value.length > 0) {
                this.currentPage = value[0];
                this.resetContents();
            }
        }
    }, {
        key: "currentPage",
        get: function get() {
            return this._currentPage;
        },
        set: function set(value) {
            this._currentPage = value;
            if (value) {
                if (value.parentViewController != this) {
                    this.addChildViewController(value);
                }
            }
            this.resetContents();
        }
    }]);

    return UIPageViewController;
}(UIViewController_1.UIViewController);

exports.UIPageViewController = UIPageViewController;

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var UIGestureRecognizer_1 = __webpack_require__(14);

var UIPinchGestureRecognizer = function (_UIGestureRecognizer_) {
    _inherits(UIPinchGestureRecognizer, _UIGestureRecognizer_);

    function UIPinchGestureRecognizer() {
        _classCallCheck(this, UIPinchGestureRecognizer);

        var _this = _possibleConstructorReturn(this, _UIGestureRecognizer_.apply(this, arguments));

        _this.scale = 1.0;
        _this.velocity = 0.0;
        return _this;
    }

    UIPinchGestureRecognizer.prototype.handleTouch = function handleTouch(touches) {
        _UIGestureRecognizer_.prototype.handleTouch.call(this, touches);
    };

    return UIPinchGestureRecognizer;
}(UIGestureRecognizer_1.UIGestureRecognizer);

exports.UIPinchGestureRecognizer = UIPinchGestureRecognizer;

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var UIView_1 = __webpack_require__(1);
var UIAnimator_1 = __webpack_require__(7);

var UIProgressView = function (_UIView_1$UIView) {
    _inherits(UIProgressView, _UIView_1$UIView);

    function UIProgressView() {
        _classCallCheck(this, UIProgressView);

        var _this = _possibleConstructorReturn(this, _UIView_1$UIView.call(this));

        _this._progress = 0.0;
        _this._progressTintColor = undefined;
        _this._trackTintColor = undefined;
        // Implementation
        _this.trackView = new UIView_1.UIView();
        _this.progressView = new UIView_1.UIView();
        _this.userInteractionEnabled = false;
        _this.progressTintColor = _this.tintColor;
        _this.trackTintColor = _this.tintColor.colorWithAlphaComponent(0.35);
        _this.addSubview(_this.trackView);
        _this.addSubview(_this.progressView);
        return _this;
    }
    /**
     * Getter progress
     * @return {number }
     */


    UIProgressView.prototype.setProgress = function setProgress(value, animated) {
        var _this2 = this;

        if (animated) {
            UIAnimator_1.UIAnimator.curve(0.30, function () {
                _this2.progress = value;
                _this2.layoutIfNeeded();
            }, undefined);
        } else {
            this.progress = value;
            this.layoutIfNeeded();
        }
    };
    /**
     * Getter progressTintColor
     * @return {UIColor }
     */


    UIProgressView.prototype.layoutSubviews = function layoutSubviews() {
        _UIView_1$UIView.prototype.layoutSubviews.call(this);
        this.trackView.frame = this.bounds;
        this.progressView.frame = { x: 0.0, y: 0.0, width: this.bounds.width * this.progress, height: this.bounds.height };
    };

    _createClass(UIProgressView, [{
        key: "progress",
        get: function get() {
            return this._progress;
        }
        /**
         * Setter progress
         * @param {number } value
         */
        ,
        set: function set(value) {
            this._progress = value;
            this.layoutIfNeeded();
        }
    }, {
        key: "progressTintColor",
        get: function get() {
            return this._progressTintColor;
        }
        /**
         * Setter progressTintColor
         * @param {UIColor } value
         */
        ,
        set: function set(value) {
            this._progressTintColor = value;
            this.progressView.backgroundColor = value;
        }
        /**
         * Getter trackTintColor
         * @return {UIColor }
         */

    }, {
        key: "trackTintColor",
        get: function get() {
            return this._trackTintColor;
        }
        /**
         * Setter trackTintColor
         * @param {UIColor } value
         */
        ,
        set: function set(value) {
            this._trackTintColor = value;
            this.trackView.backgroundColor = value;
        }
    }]);

    return UIProgressView;
}(UIView_1.UIView);

exports.UIProgressView = UIProgressView;

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var UIGestureRecognizer_1 = __webpack_require__(14);

var UIRotationGestureRecognizer = function (_UIGestureRecognizer_) {
    _inherits(UIRotationGestureRecognizer, _UIGestureRecognizer_);

    function UIRotationGestureRecognizer() {
        _classCallCheck(this, UIRotationGestureRecognizer);

        var _this = _possibleConstructorReturn(this, _UIGestureRecognizer_.apply(this, arguments));

        _this.rotation = 1.0;
        _this.velocity = 0.0;
        return _this;
    }

    return UIRotationGestureRecognizer;
}(UIGestureRecognizer_1.UIGestureRecognizer);

exports.UIRotationGestureRecognizer = UIRotationGestureRecognizer;

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });

var UIScreen = function UIScreen() {
    _classCallCheck(this, UIScreen);

    this.bounds = { x: 0, y: 0, width: parseInt(wx.getSystemInfoSync().screenWidth), height: parseInt(wx.getSystemInfoSync().screenHeight) };
    this.scale = parseInt(wx.getSystemInfoSync().pixelRatio);
};

UIScreen.main = new UIScreen();
exports.UIScreen = UIScreen;

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var UIView_1 = __webpack_require__(1);
var UIAnimator_1 = __webpack_require__(7);
var UILongPressGestureRecognizer_1 = __webpack_require__(19);

var ThumbView = function (_UIView_1$UIView) {
    _inherits(ThumbView, _UIView_1$UIView);

    function ThumbView() {
        _classCallCheck(this, ThumbView);

        return _possibleConstructorReturn(this, _UIView_1$UIView.apply(this, arguments));
    }

    ThumbView.prototype.pointInside = function pointInside(point) {
        return point.x >= -22.0 && point.y >= -22.0 && point.x <= this.frame.width + 22.0 && point.y <= this.frame.height + 22.0;
    };

    return ThumbView;
}(UIView_1.UIView);

var UISlider = function (_UIView_1$UIView2) {
    _inherits(UISlider, _UIView_1$UIView2);

    function UISlider() {
        _classCallCheck(this, UISlider);

        var _this2 = _possibleConstructorReturn(this, _UIView_1$UIView2.call(this));

        _this2.value = 0.5;
        _this2.minimumValue = 0.0;
        _this2.maximumValue = 1.0;
        _this2._minimumTrackTintColor = undefined;
        _this2._maximumTrackTintColor = undefined;
        _this2._thumbTintColor = undefined;
        // Implementation
        _this2.minimumTrackView = new UIView_1.UIView();
        _this2.maximumTrackView = new UIView_1.UIView();
        _this2.thumbView = new ThumbView();
        _this2.thumbOutLightView = new UIView_1.UIView();
        _this2._tracking = false;
        _this2.previousLocation = undefined;
        if (_this2.tintColor) {
            _this2.minimumTrackTintColor = _this2.tintColor;
            _this2.maximumTrackTintColor = _this2.tintColor.colorWithAlphaComponent(0.3);
            _this2.thumbTintColor = _this2.tintColor;
        }
        _this2.maximumTrackView.userInteractionEnabled = false;
        _this2.addSubview(_this2.maximumTrackView);
        _this2.minimumTrackView.userInteractionEnabled = false;
        _this2.addSubview(_this2.minimumTrackView);
        _this2.thumbOutLightView.userInteractionEnabled = false;
        _this2.addSubview(_this2.thumbOutLightView);
        _this2.addSubview(_this2.thumbView);
        _this2.setupTouches();
        return _this2;
    }

    UISlider.prototype.setValue = function setValue(value, animated) {
        var _this3 = this;

        if (animated) {
            this.value = value;
            UIAnimator_1.UIAnimator.curve(0.5, function () {
                _this3.layoutSubviews();
            }, undefined);
        } else {
            this.value = value;
            this.layoutSubviews();
        }
    };

    UISlider.prototype.setupTouches = function setupTouches() {
        var _this4 = this;

        var longPressGesture = new UILongPressGestureRecognizer_1.UILongPressGestureRecognizer();
        longPressGesture.on("began", function (sender) {
            _this4.previousLocation = sender.locationInView(_this4);
            _this4.tracking = true;
        });
        longPressGesture.on("changed", function (sender) {
            var previousLocation = _this4.previousLocation;
            if (!previousLocation) {
                return;
            }
            var location = sender.locationInView(_this4);
            if (location.x < 0.0 || location.x > _this4.bounds.width) {
                return;
            }
            var translationX = location.x - previousLocation.x;
            _this4.previousLocation = location;
            var newValue = _this4.value + translationX / _this4.frame.width * (_this4.maximumValue - _this4.minimumValue);
            _this4.value = Math.max(_this4.minimumValue, Math.min(_this4.maximumValue, newValue));
            _this4.emit("valueChanged", _this4);
            _this4.layoutSubviews();
        });
        longPressGesture.on("ended", function () {
            _this4.tracking = false;
        });
        longPressGesture.on("cancelled", function () {
            _this4.tracking = false;
        });
        longPressGesture.minimumPressDuration = 0.0;
        this.thumbView.addGestureRecognizer(longPressGesture);
    };

    UISlider.prototype.layoutSubviews = function layoutSubviews() {
        _UIView_1$UIView2.prototype.layoutSubviews.call(this);
        var progress = Math.max(0.0, Math.min(1.0, (this.value - this.minimumValue) / (this.maximumValue - this.minimumValue)));
        this.maximumTrackView.frame = { x: 0.0, y: (this.bounds.height - 4.0) / 2.0, width: this.bounds.width, height: 4.0 };
        this.minimumTrackView.frame = { x: 0.0, y: (this.bounds.height - 4.0) / 2.0, width: this.bounds.width * progress, height: 4.0 };
        this.thumbOutLightView.frame = { x: -7.5 + this.bounds.width * progress, y: (this.bounds.height - 15.0) / 2.0, width: 15.0, height: 15.0 };
        this.thumbOutLightView.layer.cornerRadius = 7.5;
        this.thumbView.frame = { x: -7.5 + this.bounds.width * progress, y: (this.bounds.height - 15.0) / 2.0, width: 15.0, height: 15.0 };
        this.thumbView.layer.cornerRadius = 7.5;
    };

    UISlider.prototype.pointInside = function pointInside(point) {
        return point.x >= -22.0 && point.y >= -(44.0 - this.frame.height) / 2.0 && point.x <= this.frame.width + 22.0 && point.y <= this.frame.height + (44.0 - this.frame.height) / 2.0;
    };

    _createClass(UISlider, [{
        key: "minimumTrackTintColor",
        get: function get() {
            return this._minimumTrackTintColor;
        },
        set: function set(value) {
            this._minimumTrackTintColor = value;
            this.minimumTrackView.backgroundColor = value;
        }
    }, {
        key: "maximumTrackTintColor",
        get: function get() {
            return this._maximumTrackTintColor;
        },
        set: function set(value) {
            this._maximumTrackTintColor = value;
            this.maximumTrackView.backgroundColor = value;
        }
    }, {
        key: "thumbTintColor",
        get: function get() {
            return this._thumbTintColor;
        },
        set: function set(value) {
            this._thumbTintColor = value;
            if (value) {
                this.thumbView.backgroundColor = value;
                this.thumbOutLightView.backgroundColor = value.colorWithAlphaComponent(0.2);
            }
        }
    }, {
        key: "tracking",
        get: function get() {
            return this._tracking;
        },
        set: function set(value) {
            var _this5 = this;

            if (this._tracking === value) {
                return;
            }
            this._tracking = value;
            UIAnimator_1.UIAnimator.linear(0.15, function () {
                if (value) {
                    _this5.thumbView.transform = { a: 1.4, b: 0.0, c: 0.0, d: 1.4, tx: 0.0, ty: 0.0 };
                    _this5.thumbOutLightView.transform = { a: 2.4, b: 0.0, c: 0.0, d: 2.4, tx: 0.0, ty: 0.0 };
                } else {
                    _this5.thumbView.transform = { a: 1.0, b: 0.0, c: 0.0, d: 1.0, tx: 0.0, ty: 0.0 };
                    _this5.thumbOutLightView.transform = { a: 1.0, b: 0.0, c: 0.0, d: 1.0, tx: 0.0, ty: 0.0 };
                }
            }, undefined);
        }
    }]);

    return UISlider;
}(UIView_1.UIView);

exports.UISlider = UISlider;

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var UIEnums_1 = __webpack_require__(6);
var UIView_1 = __webpack_require__(1);

var UIStackView = function (_UIView_1$UIView) {
    _inherits(UIStackView, _UIView_1$UIView);

    function UIStackView() {
        var arrangedSubviews = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

        _classCallCheck(this, UIStackView);

        var _this = _possibleConstructorReturn(this, _UIView_1$UIView.call(this));

        _this.arrangedSubviews = [];
        _this._axis = UIEnums_1.UILayoutConstraintAxis.horizontal;
        _this._distribution = UIEnums_1.UIStackViewDistribution.fill;
        _this._alignment = UIEnums_1.UIStackViewAlignment.fill;
        _this._spacing = 0.0;
        // Implementation
        _this.allLayoutWidths = new Map();
        _this.allLayoutHeights = new Map();
        _this.arrangedSubviews = arrangedSubviews || [];
        _this.arrangedSubviews.forEach(function (it) {
            _this.addSubview(it);
        });
        setTimeout(function () {
            _this._layoutArrangeSubviews();
        }, 0);
        return _this;
    }

    UIStackView.prototype.addArrangedSubview = function addArrangedSubview(view) {
        this.arrangedSubviews.push(view);
        this.addSubview(view);
        this._layoutArrangeSubviews();
    };

    UIStackView.prototype.removeArrangedSubview = function removeArrangedSubview(view) {
        var idx = this.arrangedSubviews.indexOf(view);
        if (idx >= 0) {
            this.arrangedSubviews.splice(idx, 1);
            view.removeFromSuperview();
            this._layoutArrangeSubviews();
        }
    };

    UIStackView.prototype.insertArrangedSubview = function insertArrangedSubview(view, atIndex) {
        this.arrangedSubviews.splice(atIndex, 0, view);
        this.addSubview(view);
        this._layoutArrangeSubviews();
    };

    UIStackView.prototype.layoutArrangedSubview = function layoutArrangedSubview(subview, size) {
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
    };

    UIStackView.prototype.layoutSubviews = function layoutSubviews() {
        _UIView_1$UIView.prototype.layoutSubviews.call(this);
        this._layoutArrangeSubviews();
    };

    UIStackView.prototype._layoutArrangeSubviews = function _layoutArrangeSubviews() {
        var _this2 = this;

        if (this.arrangedSubviews.length == 0) {
            return;
        }
        var x = [];
        var y = [];
        var width = [];
        var height = [];
        var axisLocation = void 0;
        var axisLength = void 0;
        var alignLocation = void 0;
        var alignLength = void 0;
        var axisValues = void 0;
        var alignValues = void 0;
        var boundsAxisLength = void 0;
        var boundsAlignLength = void 0;
        if (this.axis == UIEnums_1.UILayoutConstraintAxis.horizontal) {
            axisLocation = x;
            axisLength = width;
            alignLocation = y;
            alignLength = height;
            axisValues = this.allLayoutWidths;
            alignValues = this.allLayoutHeights;
            boundsAxisLength = this.bounds.width;
            boundsAlignLength = this.bounds.height;
        } else {
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
            case UIEnums_1.UIStackViewDistribution.fill:
                {
                    var axisValuesSum = 0;
                    axisValues.forEach(function (it) {
                        axisValuesSum += it;
                    });
                    var leftSpace = boundsAxisLength - axisValuesSum;
                    var location = 0.0;
                    this.arrangedSubviews.forEach(function (view, index) {
                        var space = 0.0;
                        var target = axisValues.get(view);
                        if (target !== undefined) {
                            space = target;
                        } else {
                            space = leftSpace;
                            leftSpace = 0.0;
                        }
                        axisLocation.push(location);
                        axisLength.push(space);
                        location += space;
                    });
                    break;
                }
            case UIEnums_1.UIStackViewDistribution.fillEqually:
                {
                    this.arrangedSubviews.forEach(function (_, index) {
                        axisLocation.push(boundsAxisLength / _this2.arrangedSubviews.length * index);
                        axisLength.push(boundsAxisLength / _this2.arrangedSubviews.length);
                    });
                    break;
                }
            case UIEnums_1.UIStackViewDistribution.fillProportionally:
                {
                    if (this.arrangedSubviews.length == 1) {
                        axisLocation.push(0.0);
                        axisLength.push(this.bounds.width);
                    } else {
                        var everyWidth = (boundsAxisLength - (this.arrangedSubviews.length - 1) * this.spacing) / this.arrangedSubviews.length;
                        this.arrangedSubviews.forEach(function (_, index) {
                            axisLocation.push((everyWidth + _this2.spacing) * index);
                            axisLength.push(everyWidth);
                        });
                    }
                    break;
                }
            case UIEnums_1.UIStackViewDistribution.equalSpacing:
                {
                    if (this.arrangedSubviews.length == 1) {
                        axisLocation.push(0.0);
                        axisLength.push(boundsAxisLength);
                    } else {
                        var _axisValuesSum = 0;
                        axisValues.forEach(function (it) {
                            _axisValuesSum += it;
                        });
                        var spacing = (boundsAxisLength - _axisValuesSum) / (this.arrangedSubviews.length - 1);
                        var location = 0.0;
                        this.arrangedSubviews.forEach(function (view) {
                            axisLocation.push(location);
                            var space = axisValues.get(view) || 0.0;
                            axisLength.push(space);
                            location += space + spacing;
                        });
                    }
                    break;
                }
            case UIEnums_1.UIStackViewDistribution.equalCentering:
                {
                    if (this.arrangedSubviews.length > 2) {
                        var firstViewCenterX = (axisValues.get(this.arrangedSubviews[0]) || 0.0) / 2.0;
                        var lastViewCenterX = boundsAxisLength - (axisValues.get(this.arrangedSubviews[this.arrangedSubviews.length - 1]) || 0.0) / 2.0;
                        var everyCenterSpace = (lastViewCenterX - firstViewCenterX) / (this.arrangedSubviews.length - 1);
                        var location = 0.0;
                        this.arrangedSubviews.forEach(function (it, index) {
                            var space = axisValues.get(it) || 0.0;
                            axisLength.push(space);
                            if (index > 0) {
                                location -= space / 2.0;
                            }
                            axisLocation.push(location);
                            location += space / 2.0 + everyCenterSpace;
                        });
                    } else if (this.arrangedSubviews.length == 2) {
                        var leftSpace = boundsAxisLength;
                        var location = 0.0;
                        axisLocation.push(location);
                        var firstSpace = axisValues.get(this.arrangedSubviews[0]) || 0.0;
                        axisLength.push(firstSpace);
                        leftSpace -= firstSpace;
                        location += firstSpace;
                        var secondSpace = axisValues.get(this.arrangedSubviews[1]) !== undefined ? axisValues.get(this.arrangedSubviews[1]) : leftSpace;
                        axisLocation.push(boundsAxisLength - (secondSpace || 0.0));
                        axisLength.push(secondSpace || 0.0);
                    } else if (this.arrangedSubviews.length == 1) {
                        axisLocation.push(0.0);
                        axisLength.push(boundsAxisLength);
                    }
                    break;
                }
        }
        switch (this.alignment) {
            case UIEnums_1.UIStackViewAlignment.fill:
                {
                    this.arrangedSubviews.forEach(function (_) {
                        alignLocation.push(0.0);
                        alignLength.push(boundsAlignLength);
                    });
                    break;
                }
            case UIEnums_1.UIStackViewAlignment.leading:
                {
                    this.arrangedSubviews.forEach(function (it) {
                        alignLocation.push(0.0);
                        alignLength.push(alignValues.get(it) || 0.0);
                    });
                    break;
                }
            case UIEnums_1.UIStackViewAlignment.center:
                {
                    this.arrangedSubviews.forEach(function (it) {
                        var space = alignValues.get(it) || 0.0;
                        alignLocation.push((boundsAlignLength - space) / 2.0);
                        alignLength.push(space);
                    });
                    break;
                }
            case UIEnums_1.UIStackViewAlignment.trailing:
                {
                    this.arrangedSubviews.forEach(function (it) {
                        var space = alignValues.get(it) || 0.0;
                        alignLocation.push(boundsAlignLength - space);
                        alignLength.push(space);
                    });
                    break;
                }
        }
        if (this.axis == UIEnums_1.UILayoutConstraintAxis.horizontal) {
            this.arrangedSubviews.forEach(function (view, index) {
                view.frame = { x: axisLocation[index], y: alignLocation[index], width: axisLength[index], height: alignLength[index] };
            });
        } else {
            this.arrangedSubviews.forEach(function (view, index) {
                view.frame = { x: alignLocation[index], y: axisLocation[index], width: alignLength[index], height: axisLength[index] };
            });
        }
    };

    _createClass(UIStackView, [{
        key: "axis",
        get: function get() {
            return this._axis;
        },
        set: function set(value) {
            this._axis = value;
            this._layoutArrangeSubviews();
        }
    }, {
        key: "distribution",
        get: function get() {
            return this._distribution;
        },
        set: function set(value) {
            this._distribution = value;
            this._layoutArrangeSubviews();
        }
    }, {
        key: "alignment",
        get: function get() {
            return this._alignment;
        },
        set: function set(value) {
            this._alignment = value;
            this._layoutArrangeSubviews();
        }
    }, {
        key: "spacing",
        get: function get() {
            return this._spacing;
        },
        set: function set(value) {
            this._spacing = value;
            this._layoutArrangeSubviews();
        }
    }]);

    return UIStackView;
}(UIView_1.UIView);

exports.UIStackView = UIStackView;

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var UIView_1 = __webpack_require__(1);
var UIColor_1 = __webpack_require__(5);
var UIAnimator_1 = __webpack_require__(7);
var UILongPressGestureRecognizer_1 = __webpack_require__(19);

var ThumbView = function (_UIView_1$UIView) {
    _inherits(ThumbView, _UIView_1$UIView);

    function ThumbView() {
        _classCallCheck(this, ThumbView);

        return _possibleConstructorReturn(this, _UIView_1$UIView.apply(this, arguments));
    }

    ThumbView.prototype.pointInside = function pointInside(point) {
        return point.x >= -22.0 && point.y >= -22.0 && point.x <= this.frame.width + 22.0 && point.y <= this.frame.height + 22.0;
    };

    return ThumbView;
}(UIView_1.UIView);

var UISwitch = function (_UIView_1$UIView2) {
    _inherits(UISwitch, _UIView_1$UIView2);

    function UISwitch() {
        _classCallCheck(this, UISwitch);

        var _this2 = _possibleConstructorReturn(this, _UIView_1$UIView2.call(this));

        _this2.onTintColor = _this2.tintColor;
        _this2.thumbTintColor = UIColor_1.UIColor.white;
        _this2._isOn = false;
        // Implementation
        _this2.tintView = new UIView_1.UIView();
        _this2.thumbView = new ThumbView();
        _this2.thumbOutLightView = new UIView_1.UIView();
        _this2._tracking = false;
        _this2.touchChanged = false;
        _this2.tintView.userInteractionEnabled = false;
        _this2.addSubview(_this2.tintView);
        _this2.thumbOutLightView.userInteractionEnabled = false;
        _this2.addSubview(_this2.thumbOutLightView);
        _this2.thumbView.layer.shadowColor = new UIColor_1.UIColor(0.0, 0.0, 0.0, 1.0);
        _this2.thumbView.layer.shadowRadius = 2.0;
        _this2.thumbView.layer.shadowOffset = { width: 0.0, height: 3.0 };
        _this2.thumbView.layer.shadowOpacity = 0.2;
        _this2.addSubview(_this2.thumbView);
        _this2.setupTouches();
        return _this2;
    }

    UISwitch.prototype.setOn = function setOn(on, animated) {
        var _this3 = this;

        if (animated) {
            UIAnimator_1.UIAnimator.curve(0.20, function () {
                _this3.isOn = on;
            }, undefined);
        } else {
            this.isOn = on;
        }
    };

    UISwitch.prototype.setupTouches = function setupTouches() {
        var _this4 = this;

        var longPressGesture = new UILongPressGestureRecognizer_1.UILongPressGestureRecognizer();
        longPressGesture.on("began", function () {
            _this4.touchChanged = false;
            _this4.tracking = true;
        }).on("changed", function (sender) {
            var location = sender.locationInView(_this4);
            var isOn = location.x > _this4.bounds.width / 2.0;
            if (_this4.isOn != isOn) {
                _this4.touchChanged = true;
                UIAnimator_1.UIAnimator.curve(0.20, function () {
                    _this4.isOn = isOn;
                }, undefined);
            }
        }).on("ended", function (sender) {
            if (!_this4.touchChanged) {
                var location = sender.locationInView(_this4);
                if (_this4.pointInside(location)) {
                    UIAnimator_1.UIAnimator.curve(0.20, function () {
                        _this4.isOn = !_this4.isOn;
                    }, function () {
                        _this4.emit("valueChanged", _this4);
                    });
                }
            } else {
                _this4.emit("valueChanged", _this4);
            }
            _this4.tracking = false;
        }).on("cancelled", function () {
            if (_this4.touchChanged) {
                _this4.emit("valueChanged", _this4);
            }
            _this4.tracking = false;
        });
        longPressGesture.minimumPressDuration = 0.0;
        this.thumbView.addGestureRecognizer(longPressGesture);
    };

    UISwitch.prototype.layoutSubviews = function layoutSubviews() {
        _UIView_1$UIView2.prototype.layoutSubviews.call(this);
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
        } else {
            this.thumbView.frame = { x: this.tintView.frame.x, y: (this.bounds.height - 20.0) / 2.0, width: 20.0, height: 20.0 };
            this.thumbView.layer.cornerRadius = 10.0;
            this.thumbView.backgroundColor = this.thumbTintColor;
            this.tintView.backgroundColor = new UIColor_1.UIColor(0x84 / 255.0, 0x84 / 255.0, 0x84 / 255.0, 1.0);
            this.thumbOutLightView.frame = { x: this.tintView.frame.x, y: (this.bounds.height - 20.0) / 2.0, width: 20.0, height: 20.0 };
            this.thumbOutLightView.layer.cornerRadius = 10.0;
            this.thumbOutLightView.backgroundColor = new UIColor_1.UIColor(0x84 / 255.0, 0x84 / 255.0, 0x84 / 255.0, 0.2);
        }
    };

    UISwitch.prototype.pointInside = function pointInside(point) {
        return point.x >= 0.0 && point.y >= -(44.0 - this.frame.height) / 2.0 && point.x <= this.frame.width && point.y <= this.frame.height + (44.0 - this.frame.height) / 2.0;
    };

    _createClass(UISwitch, [{
        key: "isOn",
        get: function get() {
            return this._isOn;
        },
        set: function set(value) {
            this._isOn = value;
            this.layoutSubviews();
        }
    }, {
        key: "tracking",
        get: function get() {
            return this._tracking;
        },
        set: function set(value) {
            var _this5 = this;

            if (this._tracking == value) {
                return;
            }
            this._tracking = value;
            UIAnimator_1.UIAnimator.linear(0.15, function () {
                if (value) {
                    _this5.thumbOutLightView.transform = { a: 1.6, b: 0.0, c: 0.0, d: 1.6, tx: 0.0, ty: 0.0 };
                } else {
                    _this5.thumbOutLightView.transform = { a: 1.0, b: 0.0, c: 0.0, d: 1.0, tx: 0.0, ty: 0.0 };
                }
            }, undefined);
        }
    }]);

    return UISwitch;
}(UIView_1.UIView);

exports.UISwitch = UISwitch;

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var UIViewController_1 = __webpack_require__(15);
var UITabBar_1 = __webpack_require__(75);

var UITabBarController = function (_UIViewController_1$U) {
    _inherits(UITabBarController, _UIViewController_1$U);

    function UITabBarController() {
        _classCallCheck(this, UITabBarController);

        var _this = _possibleConstructorReturn(this, _UIViewController_1$U.apply(this, arguments));

        _this.clazz = "UITabBarController";
        _this.itemControllers = [];
        _this._selectedIndex = -1;
        _this.tabBar = new UITabBar_1.UITabBar();
        _this.activedNavigationController = undefined;
        return _this;
    }

    UITabBarController.prototype.attach = function attach(dataOwner, dataField) {
        var _this2 = this;

        if (this.activedNavigationController !== undefined) {
            this.activedNavigationController.attach(dataOwner, dataField);
            return;
        }
        this.iView.attach(dataOwner, dataField);
        dataOwner.onShow = function () {
            if (_this2.activedNavigationController) {
                _this2.activedNavigationController.popToRootViewController();
                _this2.activedNavigationController = undefined;
            }
        };
    };

    UITabBarController.prototype.setViewControllers = function setViewControllers(viewControllers) {
        var _this3 = this;

        var animated = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        this.childViewControllers.forEach(function (it) {
            it.removeFromParentViewController();
            it.iView.removeFromSuperview();
        });
        this.itemControllers = viewControllers;
        viewControllers.forEach(function (it, index) {
            if (index == 0) {
                _this3.addChildViewController(it);
                _this3.iView.addSubview(it.iView);
            }
        });
        this.iView.bringSubviewToFront(this.tabBar);
        this.tabBar.resetItems();
        this.selectedIndex = 0;
        this.viewWillLayoutSubviews();
        this.updateBrowserTitle();
        this.updateBrowserBar();
    };
    // Implementation


    // private get hidesBottomBarContentFrame(): UIRect {
    //     return { x: 0.0, y: 0.0, width: this.iView.bounds.width, height: this.iView.bounds.height }
    // }
    UITabBarController.prototype.viewDidLoad = function viewDidLoad() {
        this.tabBar.tabBarController = this;
        this.iView.addSubview(this.tabBar);
        _UIViewController_1$U.prototype.viewDidLoad.call(this);
    };

    UITabBarController.prototype.viewWillLayoutSubviews = function viewWillLayoutSubviews() {
        var _this4 = this;

        this.tabBar.frame = this.barFrame;
        this.childViewControllers.forEach(function (it) {
            if (it.clazz === "UINavigationController") {
                it.iView.frame = _this4.navigationControllerFrame;
            } else {
                it.iView.frame = _this4.contentFrame;
            }
        });
        _UIViewController_1$U.prototype.viewWillLayoutSubviews.call(this);
    };

    UITabBarController.prototype.updateBrowserTitle = function updateBrowserTitle() {
        if (this.selectedViewController) {
            if (this.selectedViewController.clazz === "UINavigationController") {
                this.selectedViewController.updateBrowserTitle();
            } else {
                wx.setNavigationBarTitle({
                    title: this.selectedViewController.title
                });
            }
        }
    };

    UITabBarController.prototype.updateBrowserBar = function updateBrowserBar() {
        if (this.selectedViewController) {
            if (this.selectedViewController.clazz === "UINavigationController") {
                this.selectedViewController.updateBrowserBar();
            } else {
                wx.setNavigationBarColor({
                    backgroundColor: "#ffffff",
                    frontColor: "#000000"
                });
            }
        }
    };

    _createClass(UITabBarController, [{
        key: "selectedIndex",
        get: function get() {
            return this._selectedIndex;
        },
        set: function set(value) {
            var _this5 = this;

            if (this._selectedIndex == value) {
                this.emit("onSelectedViewController", this, true);
                return;
            }
            if (value < 0) {
                this._selectedIndex = value;
                return;
            }
            var oldIndex = this._selectedIndex;
            if (this.itemControllers[value]) {
                var it = this.itemControllers[value];
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
            this.childViewControllers.forEach(function (it) {
                it.iView.hidden = _this5.itemControllers.indexOf(it) != value;
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
    }, {
        key: "selectedViewController",
        get: function get() {
            return this.itemControllers[this.selectedIndex];
        },
        set: function set(value) {
            this.selectedIndex = Math.max(0, this.itemControllers.indexOf(value));
        }
    }, {
        key: "barFrame",
        get: function get() {
            if (this.tabBar.hidden) {
                return { x: 0.0, y: this.iView.bounds.height, width: this.iView.bounds.width, height: 0.0 };
            }
            return { x: 0.0, y: this.iView.bounds.height - this.tabBar.barHeight, width: this.iView.bounds.width, height: this.tabBar.barHeight };
        }
    }, {
        key: "contentFrame",
        get: function get() {
            return { x: 0.0, y: 0.0, width: this.iView.bounds.width, height: this.iView.bounds.height - this.barFrame.height };
        }
    }, {
        key: "navigationControllerFrame",
        get: function get() {
            return { x: 0.0, y: 0.0, width: this.iView.bounds.width, height: this.iView.bounds.height - this.barFrame.height };
        }
    }]);

    return UITabBarController;
}(UIViewController_1.UIViewController);

exports.UITabBarController = UITabBarController;

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var UIView_1 = __webpack_require__(1);
var UIColor_1 = __webpack_require__(5);
var UIImageView_1 = __webpack_require__(25);
var UILabel_1 = __webpack_require__(24);
var UIFont_1 = __webpack_require__(18);
var UIEnums_1 = __webpack_require__(6);
var UITapGestureRecognizer_1 = __webpack_require__(23);
var UIEdgeInsets_1 = __webpack_require__(8);

var UITabBar = function (_UIView_1$UIView) {
    _inherits(UITabBar, _UIView_1$UIView);

    function UITabBar() {
        _classCallCheck(this, UITabBar);

        var _this = _possibleConstructorReturn(this, _UIView_1$UIView.call(this));

        _this.translucent = false;
        _this.barHeight = 50.0;
        _this._barTintColor = undefined;
        _this.unselectedItemTintColor = new UIColor_1.UIColor(0x73 / 255.0, 0x73 / 255.0, 0x73 / 255.0, 1.0);
        // Implementation
        _this.tabBarController = undefined;
        _this.barButtons = [];
        _this.barTintColor = UIColor_1.UIColor.white;
        _this.tintColor = UIColor_1.UIColor.black;
        _this.extraStyles = "\n        border-top: solid;\n        border-top-width: 1rpx;\n        border-top-color: rgba(152, 150, 155, 0.5);\n        ";
        return _this;
    }

    UITabBar.prototype.resetItems = function resetItems() {
        var _this2 = this;

        this.barButtons.forEach(function (it) {
            it.removeFromSuperview();
            if (it.barItem) {
                it.barItem.barButton = undefined;
                it.barItem = undefined;
            }
        });
        if (this.tabBarController) {
            this.barButtons = this.tabBarController.itemControllers.map(function (it) {
                var tabBarButton = new UITabBarButton();
                tabBarButton.barItem = it.tabBarItem;
                it.tabBarItem.barButton = tabBarButton;
                return tabBarButton;
            });
            this.barButtons.forEach(function (it, index) {
                it.addGestureRecognizer(new UITapGestureRecognizer_1.UITapGestureRecognizer().on("touch", function () {
                    if (_this2.tabBarController) {
                        _this2.tabBarController.selectedIndex = index;
                    }
                }));
                _this2.addSubview(it);
            });
        }
        this.setNeedsLayout(true);
    };

    UITabBar.prototype.setSelectedIndex = function setSelectedIndex(selectedIndex) {
        var _this3 = this;

        this.barButtons.forEach(function (barButton, index) {
            barButton.itemSelected = index == selectedIndex;
            barButton.tintColor = index == selectedIndex ? _this3.tintColor : _this3.unselectedItemTintColor;
        });
    };

    UITabBar.prototype.layoutSubviews = function layoutSubviews() {
        var _this4 = this;

        _UIView_1$UIView.prototype.layoutSubviews.call(this);
        if (this.barButtons.length > 0) {
            var eachWidth = this.bounds.width / this.barButtons.length;
            this.barButtons.forEach(function (barButton, index) {
                barButton.frame = { x: index * eachWidth, y: 0.0, width: eachWidth, height: _this4.bounds.height };
            });
        }
    };

    _createClass(UITabBar, [{
        key: "hidden",
        get: function get() {
            return this._hidden;
        },
        set: function set(value) {
            this._hidden = value;
            this.invalidate();
            if (this.tabBarController) {
                this.tabBarController.iView.setNeedsDisplay();
            }
        }
    }, {
        key: "barTintColor",
        get: function get() {
            return this._barTintColor;
        },
        set: function set(value) {
            this._barTintColor = value;
            this.backgroundColor = value;
        }
    }]);

    return UITabBar;
}(UIView_1.UIView);

exports.UITabBar = UITabBar;

var UITabBarButton = function (_UIView_1$UIView2) {
    _inherits(UITabBarButton, _UIView_1$UIView2);

    function UITabBarButton() {
        _classCallCheck(this, UITabBarButton);

        var _this5 = _possibleConstructorReturn(this, _UIView_1$UIView2.call(this));

        _this5._barItem = undefined;
        _this5._itemSelected = false;
        _this5.iconImageView = new UIImageView_1.UIImageView();
        _this5.titleLabel = new UILabel_1.UILabel();
        _this5.iconImageView.contentMode = UIEnums_1.UIViewContentMode.scaleAspectFit;
        _this5.addSubview(_this5.iconImageView);
        _this5.titleLabel.font = new UIFont_1.UIFont(11.0);
        _this5.titleLabel.textAlignment = UIEnums_1.UITextAlignment.center;
        _this5.addSubview(_this5.titleLabel);
        return _this5;
    }

    UITabBarButton.prototype.setNeedUpdate = function setNeedUpdate() {
        var _this6 = this;

        if (this.barItem) {
            this.iconImageView.image = this.itemSelected ? this.barItem.selectedImage || this.barItem.image : this.barItem.image;
            if (this.iconImageView.image && this.iconImageView.image.size.width === 0) {
                this.iconImageView.image.on("load", function () {
                    _this6.setNeedsLayout(true);
                });
            }
            this.titleLabel.text = this.barItem.title;
        }
        this.setNeedsLayout(true);
    };

    UITabBarButton.prototype.tintColorDidChange = function tintColorDidChange() {
        _UIView_1$UIView2.prototype.tintColorDidChange.call(this);
        this.titleLabel.textColor = this.tintColor;
    };

    UITabBarButton.prototype.layoutSubviews = function layoutSubviews() {
        _UIView_1$UIView2.prototype.layoutSubviews.call(this);
        var iconSize = { width: 26, height: 26 };
        var titleSize = { width: 120, height: 18 };
        var imageInsets = this.barItem ? this.barItem.imageInsets : UIEdgeInsets_1.UIEdgeInsetsZero;
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
    };

    _createClass(UITabBarButton, [{
        key: "barItem",
        get: function get() {
            return this._barItem;
        },
        set: function set(value) {
            this._barItem = value;
            this.setNeedUpdate();
        }
    }, {
        key: "itemSelected",
        get: function get() {
            return this._itemSelected;
        },
        set: function set(value) {
            this._itemSelected = value;
            this.setNeedUpdate();
        }
    }]);

    return UITabBarButton;
}(UIView_1.UIView);

exports.UITabBarButton = UITabBarButton;

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var UIView_1 = __webpack_require__(1);
var UIScrollView_1 = __webpack_require__(20);
var UIColor_1 = __webpack_require__(5);
var UIIndexPath_1 = __webpack_require__(26);
var UIRect_1 = __webpack_require__(9);
var UIAnimator_1 = __webpack_require__(7);
var UITouch_1 = __webpack_require__(10);
// @Reference https://github.com/BigZaphod/Chameleon/blob/master/UIKit/Classes/UITableView.m

var UITableView = function (_UIScrollView_1$UIScr) {
    _inherits(UITableView, _UIScrollView_1$UIScr);

    function UITableView() {
        _classCallCheck(this, UITableView);

        var _this = _possibleConstructorReturn(this, _UIScrollView_1$UIScr.call(this));

        _this.rowHeight = 44.0;
        _this._tableHeaderView = undefined;
        _this._tableFooterView = undefined;
        _this.separatorColor = new UIColor_1.UIColor(0xbc / 255.0, 0xba / 255.0, 0xc1 / 255.0, 0.75);
        _this.separatorInset = { top: 0, left: 15, bottom: 0, right: 0 };
        _this.allowsSelection = true;
        _this.allowsMultipleSelection = false;
        _this._registeredCells = {};
        _this._reusableCells = [];
        _this._cachedCells = {};
        _this._selectedRows = [];
        _this._highlightedRow = undefined;
        _this._sections = [];
        _this.firstTouchPoint = undefined;
        _this.firstTouchCell = undefined;
        _this.alwaysBounceVertical = true;
        return _this;
    }

    UITableView.prototype.register = function register(initializer, reuseIdentifier) {
        this._registeredCells[reuseIdentifier] = initializer;
    };

    UITableView.prototype.dequeueReusableCell = function dequeueReusableCell(reuseIdentifier, indexPath) {
        for (var index = 0; index < this._reusableCells.length; index++) {
            if (this._reusableCells[index].reuseIdentifier == reuseIdentifier) {
                var _cell = this._reusableCells[index];
                this._reusableCells.splice(index, 1);
                return _cell;
            }
        }
        var cell = this._registeredCells[reuseIdentifier] ? this._registeredCells[reuseIdentifier]() : new UITableViewCell();
        cell.reuseIdentifier = reuseIdentifier;
        return cell;
    };

    UITableView.prototype.reloadData = function reloadData() {
        var _this2 = this;

        if (this.fetchMoreControl && this.fetchMoreControl.fetching) {
            this._updateSectionsCache();
            this._setContentSize();
            this._layoutTableView();
            return;
        }
        Object.keys(this._cachedCells).forEach(function (it) {
            _this2._cachedCells[it].removeFromSuperview();
        });
        this._reusableCells.forEach(function (it) {
            return it.removeFromSuperview();
        });
        this._reusableCells = [];
        this._cachedCells = {};
        this._updateSectionsCache();
        this._setContentSize();
        this._layoutTableView();
    };

    UITableView.prototype.selectRow = function selectRow(indexPath, animated) {
        var _this3 = this;

        if (!this.allowsMultipleSelection) {
            this._selectedRows.forEach(function (indexPathKey) {
                var values = Object.keys(_this3._cachedCells).map(function (it) {
                    return _this3._cachedCells[it];
                });
                for (var index = 0; index < values.length; index++) {
                    var element = values[index];
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
        var values = Object.keys(this._cachedCells).map(function (it) {
            return _this3._cachedCells[it];
        });

        var _loop = function _loop(index) {
            var element = values[index];
            if (element.currentIndexPath && element.currentIndexPath.mapKey() === indexPath.mapKey()) {
                if (animated) {
                    UIAnimator_1.UIAnimator.linear(0.30, function () {
                        element.selected = true;
                    }, undefined);
                } else {
                    element.selected = true;
                }
                element.emit("selected", element, true, animated);
                return "break";
            }
        };

        for (var index = 0; index < values.length; index++) {
            var _ret = _loop(index);

            if (_ret === "break") break;
        }
    };

    UITableView.prototype.deselectRow = function deselectRow(indexPath, animated) {
        var _this4 = this;

        var idx = this._selectedRows.indexOf(indexPath.mapKey());
        if (idx >= 0) {
            this._selectedRows.splice(idx, 1);
        }
        var values = Object.keys(this._cachedCells).map(function (it) {
            return _this4._cachedCells[it];
        });

        var _loop2 = function _loop2(index) {
            var element = values[index];
            if (element.currentIndexPath && element.currentIndexPath.mapKey() === indexPath.mapKey()) {
                if (animated) {
                    UIAnimator_1.UIAnimator.linear(0.30, function () {
                        element.selected = false;
                    }, undefined);
                } else {
                    element.selected = false;
                }
                element.emit("selected", element, false, false);
                return "break";
            }
        };

        for (var index = 0; index < values.length; index++) {
            var _ret2 = _loop2(index);

            if (_ret2 === "break") break;
        }
    };
    // DataSource & Delegate


    UITableView.prototype.numberOfSections = function numberOfSections() {
        var value = this.val("numberOfSections");
        return typeof value === "number" ? value : 1;
    };

    UITableView.prototype.numberOfRows = function numberOfRows(inSection) {
        var value = this.val("numberOfRows", inSection);
        return typeof value === "number" ? value : 0;
    };

    UITableView.prototype.heightForRow = function heightForRow(indexPath) {
        var value = this.val("heightForRow", indexPath);
        return typeof value === "number" ? value : this.rowHeight;
    };

    UITableView.prototype.cellForRow = function cellForRow(indexPath) {
        var value = this.val("cellForRow", indexPath);
        return value || new UITableViewCell();
    };

    UITableView.prototype.viewForHeader = function viewForHeader(inSection) {
        return this.val("viewForHeader", inSection);
    };

    UITableView.prototype.heightForHeader = function heightForHeader(inSection) {
        var value = this.val("heightForHeader", inSection);
        return typeof value === "number" ? value : 0.0;
    };

    UITableView.prototype.viewForFooter = function viewForFooter(inSection) {
        return this.val("viewForFooter", inSection);
    };

    UITableView.prototype.heightForFooter = function heightForFooter(inSection) {
        var value = this.val("heightForFooter", inSection);
        return typeof value === "number" ? value : 0.0;
    };

    UITableView.prototype.didSelectRow = function didSelectRow(indexPath) {};

    UITableView.prototype.didDeselectRow = function didDeselectRow(indexPath) {};

    UITableView.prototype.contentOffsetDidChanged = function contentOffsetDidChanged() {
        this.touchesMoved([]);
    };

    UITableView.prototype.layoutSubviews = function layoutSubviews() {
        _UIScrollView_1$UIScr.prototype.layoutSubviews.call(this);
        this._layoutTableView();
    };

    UITableView.prototype._updateSectionsCache = function _updateSectionsCache() {
        var _this5 = this;

        this._sections.forEach(function (it) {
            it.headerView && it.headerView.removeFromSuperview();
            it.footerView && it.footerView.removeFromSuperview();
        });
        this._sections = [];
        var numberOfSections = this.numberOfSections();

        var _loop3 = function _loop3(section) {
            var numberOfRowsInSection = _this5.numberOfRows(section);
            var sectionRecord = new UITableViewSection();
            var rowHeights = Array(numberOfRowsInSection).fill(0).map(function (_, row) {
                return _this5.heightForRow(new UIIndexPath_1.UIIndexPath(row, section));
            });
            var totalRowsHeight = rowHeights.length > 0 ? rowHeights.reduce(function (a, b) {
                return a + b;
            }) : 0.0;
            var headerView = _this5.viewForHeader(section);
            if (headerView) {
                _this5.addSubview(headerView);
                sectionRecord.headerView = headerView;
                sectionRecord.headerHeight = _this5.heightForHeader(section);
            } else {
                sectionRecord.headerHeight = 0.0;
            }
            var footerView = _this5.viewForFooter(section);
            if (footerView) {
                _this5.addSubview(footerView);
                sectionRecord.footerView = footerView;
                sectionRecord.footerHeight = _this5.heightForFooter(section);
            } else {
                sectionRecord.footerHeight = 0.0;
            }
            sectionRecord.rowsHeight = totalRowsHeight;
            sectionRecord.setNumberOfRows(numberOfRowsInSection, rowHeights);
            _this5._sections.push(sectionRecord);
        };

        for (var section = 0; section < numberOfSections; section++) {
            _loop3(section);
        }
    };

    UITableView.prototype._updateSectionsCacheIfNeeded = function _updateSectionsCacheIfNeeded() {
        if (this._sections.length == 0) {
            this._updateSectionsCache();
        }
    };

    UITableView.prototype._setContentSize = function _setContentSize() {
        this._updateSectionsCacheIfNeeded();
        var headerHeight = this.tableHeaderView ? this.tableHeaderView.frame.height : 0.0;
        var sectionsHeight = this._sections.length > 0 ? this._sections.map(function (it) {
            return it.sectionHeight();
        }).reduce(function (a, b) {
            return a + b;
        }) : 0.0;
        var footerHeight = this.tableFooterView ? this.tableFooterView.frame.height : 0.0;
        this.contentSize = {
            width: 0.0,
            height: headerHeight + sectionsHeight + footerHeight
        };
    };

    UITableView.prototype._layoutTableView = function _layoutTableView() {
        var boundsSize = { width: this.bounds.width, height: this.bounds.height };
        var contentOffsetY = 0.0;
        var visibleBounds = { x: 0.0, y: contentOffsetY, width: boundsSize.width, height: this.contentSize.height };
        var tableHeight = 0.0;
        if (this.tableHeaderView) {
            this.tableHeaderView.frame = { x: 0.0, y: 0.0, width: boundsSize.width, height: this.tableHeaderView.frame.height };
            tableHeight += this.tableHeaderView.frame.height;
        }
        var numberOfSections = this._sections.length;
        for (var section = 0; section < numberOfSections; section++) {
            var sectionRect = this._rectForSection(section);
            tableHeight += sectionRect.height;
            if (UIRect_1.UIRectIntersectsRect(sectionRect, visibleBounds)) {
                var headerRect = this._rectForHeaderInSection(section);
                var footerRect = this._rectForFooterInSection(section);
                var _sectionRecord = this._sections[section];
                var numberOfRows = _sectionRecord.numberOfRows;
                if (_sectionRecord.headerView) {
                    _sectionRecord.headerView.frame = headerRect;
                }
                if (_sectionRecord.footerView) {
                    _sectionRecord.footerView.frame = footerRect;
                }
                var startIndex;
                var left = 0;
                var right = Math.max(0, _sectionRecord.numberOfRows - 1);
                while (true) {
                    if (Math.abs(right - left) <= 1) {
                        startIndex = left;
                        break;
                    }
                    var mid = Math.ceil((right + left) / 2.0);
                    var indexPath = new UIIndexPath_1.UIIndexPath(mid, section);
                    var rowRect = this._rectForRowAtIndexPath(indexPath);
                    if (rowRect.y <= contentOffsetY && rowRect.y + rowRect.height >= contentOffsetY) {
                        startIndex = mid;
                        break;
                    } else if (rowRect.y + rowRect.height < contentOffsetY) {
                        left = mid;
                    } else if (rowRect.y > contentOffsetY) {
                        right = mid;
                    }
                }
                var renderCount = 0;
                for (var row = startIndex; row < numberOfRows; row++) {
                    renderCount++;
                    var _indexPath = new UIIndexPath_1.UIIndexPath(row, section);
                    var _rowRect = this._rectForRowAtIndexPath(_indexPath);
                    if (UIRect_1.UIRectIntersectsRect(_rowRect, visibleBounds) && _rowRect.height > 0) {
                        var cell = this._cachedCells[_indexPath.mapKey()] || this.cellForRow(_indexPath);
                        if (this.fetchMoreControl && this.fetchMoreControl.fetching && cell.currentIndexPath && cell.currentIndexPath.mapKey() === _indexPath.mapKey()) {
                            cell.setSeparator(row === numberOfRows - 1, this.separatorColor, this.separatorInset);
                            continue;
                        }
                        cell.currentIndexPath = _indexPath;
                        cell.currentSectionRecord = _sectionRecord;
                        this._cachedCells[_indexPath.mapKey()] = cell;
                        cell.highlighted = this._highlightedRow == _indexPath.mapKey();
                        cell.emit("highlighted", cell, cell.highlighted, false);
                        cell.selected = this._selectedRows.indexOf(_indexPath.mapKey()) >= 0;
                        cell.emit("selected", cell, cell.selected, false);
                        cell.frame = _rowRect;
                        cell.backgroundColor = this.backgroundColor;
                        if (cell.superview == undefined) {
                            this.addSubview(cell);
                        }
                        cell.setSeparator(row === numberOfRows - 1, this.separatorColor, this.separatorInset);
                    } else if (renderCount > 100) {
                        break;
                    }
                }
            }
        }
        if (this.tableFooterView) {
            this.tableFooterView.frame = { x: 0.0, y: tableHeight, width: boundsSize.width, height: this.tableFooterView.frame.height };
        }
    };

    UITableView.prototype._rectForSection = function _rectForSection(section) {
        this._updateSectionsCacheIfNeeded();
        return this._UIRectFromVerticalOffset(this._offsetForSection(section), this._sections[section].sectionHeight());
    };

    UITableView.prototype._rectForHeaderInSection = function _rectForHeaderInSection(section) {
        this._updateSectionsCacheIfNeeded();
        return this._UIRectFromVerticalOffset(this._offsetForSection(section), this._sections[section].headerHeight);
    };

    UITableView.prototype._rectForFooterInSection = function _rectForFooterInSection(section) {
        this._updateSectionsCacheIfNeeded();
        var sectionRecord = this._sections[section];
        var offset = this._offsetForSection(section);
        offset += sectionRecord.headerHeight;
        offset += sectionRecord.rowsHeight;
        return this._UIRectFromVerticalOffset(offset, this._sections[section].footerHeight);
    };

    UITableView.prototype._rectForRowAtIndexPath = function _rectForRowAtIndexPath(indexPath) {
        this._updateSectionsCacheIfNeeded();
        if (indexPath.section < this._sections.length) {
            var _sectionRecord2 = this._sections[indexPath.section];
            if (indexPath.row < _sectionRecord2.numberOfRows) {
                var offset = this._offsetForSection(indexPath.section);
                offset += _sectionRecord2.headerHeight;
                offset += _sectionRecord2.rowOriginYs[indexPath.row];
                return this._UIRectFromVerticalOffset(offset, _sectionRecord2.rowHeights[indexPath.row]);
            }
        }
        return UIRect_1.UIRectZero;
    };

    UITableView.prototype._offsetForSection = function _offsetForSection(section) {
        var offset = this.tableHeaderView ? this.tableHeaderView.frame.height : 0.0;
        for (var it = 0; it < section; it++) {
            offset += this._sections[it].sectionHeight();
        }
        return offset;
    };

    UITableView.prototype._cellForRow = function _cellForRow(indexPath) {
        return this._cachedCells[indexPath.mapKey()];
    };

    UITableView.prototype._UIRectFromVerticalOffset = function _UIRectFromVerticalOffset(offset, height) {
        return { x: 0.0, y: offset, width: this.bounds.width, height: height };
    };
    // Touches


    UITableView.prototype.touchesBegan = function touchesBegan(touches) {
        _UIScrollView_1$UIScr.prototype.touchesBegan.call(this, touches);
        var firstTouch = touches[0];
        if (firstTouch === undefined) {
            return;
        }
        this.handleTouch(UITouch_1.UITouchPhase.began, firstTouch);
    };

    UITableView.prototype.touchesMoved = function touchesMoved(touches) {
        _UIScrollView_1$UIScr.prototype.touchesMoved.call(this, touches);
        this.handleTouch(UITouch_1.UITouchPhase.moved, undefined);
    };

    UITableView.prototype.touchesEnded = function touchesEnded(touches) {
        _UIScrollView_1$UIScr.prototype.touchesEnded.call(this, touches);
        var firstTouch = touches[0];
        if (firstTouch === undefined) {
            return;
        }
        this.handleTouch(UITouch_1.UITouchPhase.ended, firstTouch);
    };

    UITableView.prototype.touchesCancelled = function touchesCancelled(touches) {
        _UIScrollView_1$UIScr.prototype.touchesCancelled.call(this, touches);
        var firstTouch = touches[0];
        if (firstTouch === undefined) {
            return;
        }
        this.handleTouch(UITouch_1.UITouchPhase.cancelled, firstTouch);
    };

    UITableView.prototype.handleTouch = function handleTouch(phase, currentTouch) {
        var _this6 = this;

        if (!this.allowsSelection) {
            return;
        }
        switch (phase) {
            case UITouch_1.UITouchPhase.began:
                {
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
                                setTimeout(function () {
                                    if (!(hitTestView instanceof UITableViewCell) || _this6.firstTouchPoint === undefined) {
                                        return;
                                    }
                                    if (hitTestView.currentIndexPath) {
                                        _this6._highlightedRow = hitTestView.currentIndexPath.mapKey();
                                    }
                                    hitTestView.highlighted = true;
                                    hitTestView.emit("highlighted", hitTestView, true, false);
                                }, 150);
                            }
                        }
                    }
                    break;
                }
            case UITouch_1.UITouchPhase.moved:
                {
                    if (this.firstTouchPoint !== undefined) {
                        this._highlightedRow = undefined;
                        Object.keys(this._cachedCells).map(function (it) {
                            return _this6._cachedCells[it];
                        }).forEach(function (it) {
                            it.highlighted = false;
                            it.emit("highlighted", it, true, false);
                        });
                        this.firstTouchPoint = undefined;
                        this.firstTouchCell = undefined;
                    }
                    break;
                }
            case UITouch_1.UITouchPhase.ended:
                {
                    setTimeout(function () {
                        if (_this6.firstTouchCell) {
                            var cell = _this6.firstTouchCell;
                            _this6._highlightedRow = undefined;
                            if (!_this6.allowsMultipleSelection) {
                                _this6._selectedRows.forEach(function (indexPathKey) {
                                    Object.keys(_this6._cachedCells).map(function (it) {
                                        return _this6._cachedCells[it];
                                    }).forEach(function (it) {
                                        if (it.currentIndexPath && it.currentIndexPath.mapKey() === indexPathKey) {
                                            it.selected = false;
                                            it.emit("selected", it, false, false);
                                            _this6.emit("didDeselectRow", it.currentIndexPath, it);
                                        }
                                    });
                                });
                                _this6._selectedRows = [];
                            }
                            _this6.firstTouchPoint = undefined;
                            _this6.firstTouchCell = undefined;
                            _this6._highlightedRow = undefined;
                            Object.keys(_this6._cachedCells).map(function (it) {
                                return _this6._cachedCells[it];
                            }).forEach(function (it) {
                                it.highlighted = false;
                                it.emit("highlighted", it, false, false);
                            });
                            if (cell.currentIndexPath) {
                                var it = cell.currentIndexPath.mapKey();
                                var idx = _this6._selectedRows.indexOf(it);
                                if (idx >= 0) {
                                    _this6._selectedRows.splice(idx, 1);
                                } else {
                                    _this6._selectedRows.push(it);
                                }
                            }
                            cell.selected = !cell.selected;
                            cell.emit("selected", cell, cell.selected, false);
                            if (cell.selected) {
                                if (cell.currentIndexPath) {
                                    _this6.didSelectRow(cell.currentIndexPath);
                                }
                                _this6.emit("didSelectRow", cell.currentIndexPath, cell);
                            } else {
                                if (cell.currentIndexPath) {
                                    _this6.didDeselectRow(cell.currentIndexPath);
                                }
                                _this6.emit("didDeselectRow", cell.currentIndexPath, cell);
                            }
                        } else {
                            _this6.firstTouchPoint = undefined;
                            _this6.firstTouchCell = undefined;
                            _this6._highlightedRow = undefined;
                            Object.keys(_this6._cachedCells).map(function (it) {
                                return _this6._cachedCells[it];
                            }).forEach(function (it) {
                                it.highlighted = false;
                                it.emit("highlighted", it, false, false);
                            });
                        }
                    }, 50);
                    break;
                }
            case UITouch_1.UITouchPhase.cancelled:
                {
                    this.firstTouchPoint = undefined;
                    this.firstTouchCell = undefined;
                    this._highlightedRow = undefined;
                    Object.keys(this._cachedCells).map(function (it) {
                        return _this6._cachedCells[it];
                    }).forEach(function (it) {
                        it.highlighted = false;
                        it.emit("highlighted", it, false, false);
                    });
                    break;
                }
        }
    };

    _createClass(UITableView, [{
        key: "tableHeaderView",
        get: function get() {
            return this._tableHeaderView;
        },
        set: function set(value) {
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
    }, {
        key: "tableFooterView",
        get: function get() {
            return this._tableFooterView;
        },
        set: function set(value) {
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
    }]);

    return UITableView;
}(UIScrollView_1.UIScrollView);

exports.UITableView = UITableView;

var UITableViewSection = function () {
    function UITableViewSection() {
        _classCallCheck(this, UITableViewSection);

        this.rowsHeight = 0.0;
        this.headerHeight = 0.0;
        this.footerHeight = 0.0;
        this.numberOfRows = 0;
        this.rowHeights = [];
        this.rowOriginYs = [];
        this.headerView = undefined;
        this.footerView = undefined;
    }

    UITableViewSection.prototype.sectionHeight = function sectionHeight() {
        return this.headerHeight + this.rowsHeight + this.footerHeight;
    };

    UITableViewSection.prototype.setNumberOfRows = function setNumberOfRows(rows, rowHeights) {
        this.numberOfRows = rows;
        this.rowHeights = rowHeights;
        this.rowOriginYs = [];
        var currentY = 0.0;
        for (var rowIndex = 0; rowIndex < rows; rowIndex++) {
            this.rowOriginYs.push(currentY);
            currentY += rowHeights[rowIndex];
        }
    };

    return UITableViewSection;
}();

var UITableViewCell = function (_UIView_1$UIView) {
    _inherits(UITableViewCell, _UIView_1$UIView);

    function UITableViewCell() {
        _classCallCheck(this, UITableViewCell);

        var _this7 = _possibleConstructorReturn(this, _UIView_1$UIView.call(this));

        _this7.selectionView = new UIView_1.UIView();
        _this7.contentView = new UIView_1.UIView();
        _this7.reuseIdentifier = undefined;
        _this7.hasSelectionStyle = true;
        _this7._selected = false;
        _this7._highlighted = false;
        _this7.currentIndexPath = undefined;
        _this7.currentSectionRecord = undefined;
        _this7.restoringContentViewBackgroundColor = undefined;
        _this7.separatorStyle = undefined;
        _this7.selectionView.alpha = 0.0;
        _this7.selectionView.backgroundColor = new UIColor_1.UIColor(0xd0 / 255.0, 0xd0 / 255.0, 0xd0 / 255.0, 1.0);
        _this7.contentView.backgroundColor = UIColor_1.UIColor.white;
        _this7.addSubview(_this7.selectionView);
        _this7.addSubview(_this7.contentView);
        // this.domElement.appendChild(this.separatorElement)
        return _this7;
    }

    UITableViewCell.prototype.onStateChanged = function onStateChanged() {
        if (this.hasSelectionStyle) {
            if (this.selected || this.highlighted) {
                if (this.restoringContentViewBackgroundColor == undefined) {
                    this.restoringContentViewBackgroundColor = this.contentView.backgroundColor;
                }
                this.selectionView.alpha = 1.0;
                this.contentView.backgroundColor = UIColor_1.UIColor.clear;
            } else {
                this.selectionView.alpha = 0.0;
                if (this.restoringContentViewBackgroundColor != undefined) {
                    this.contentView.backgroundColor = this.restoringContentViewBackgroundColor;
                    this.restoringContentViewBackgroundColor = undefined;
                }
            }
        }
    };

    UITableViewCell.prototype.setSeparator = function setSeparator(hidden, color, insets) {
        if (hidden || color === undefined) {
            this.separatorStyle = undefined;
        } else {
            this.separatorStyle = "\n            position: absolute;\n            left: " + insets.left + "px;\n            right: " + insets.right + "px;\n            bottom: 0rpx;\n            border-bottom-width: 1rpx;\n            border-bottom-color: " + color.toStyle() + ";\n            border-bottom-style: solid;\n            ";
        }
        this.markFlagDirty("hasDecorView", "decorStyle");
    };

    UITableViewCell.prototype.buildData = function buildData() {
        var data = _UIView_1$UIView.prototype.buildData.call(this);
        data.hasDecorView = this.separatorStyle !== undefined;
        if (this.separatorStyle) {
            data.decorStyle = this.separatorStyle;
        }
        return data;
    };

    UITableViewCell.prototype.layoutSubviews = function layoutSubviews() {
        _UIView_1$UIView.prototype.layoutSubviews.call(this);
        this.selectionView.frame = this.bounds;
        this.contentView.frame = this.bounds;
    };

    _createClass(UITableViewCell, [{
        key: "selected",
        get: function get() {
            return this._selected;
        },
        set: function set(value) {
            this._selected = value;
            this.onStateChanged();
        }
    }, {
        key: "highlighted",
        get: function get() {
            return this._highlighted;
        },
        set: function set(value) {
            this._highlighted = value;
            this.onStateChanged();
        }
    }]);

    return UITableViewCell;
}(UIView_1.UIView);

exports.UITableViewCell = UITableViewCell;

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var UIView_1 = __webpack_require__(1);
var UIColor_1 = __webpack_require__(5);
var UIEnums_1 = __webpack_require__(6);
var UIButton_1 = __webpack_require__(33);
var UIImage_1 = __webpack_require__(38);
var clearButtonImage = new UIImage_1.UIImage({ base64: "iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAC0UExURUxpcY+NlKqqqo+PlI+OlI6Nk4+OlI6Nk4+OlH9/f39//46NlI+PlY6NlY6Nk5+fn4+OlJGOlpCQlY6OlI+OlJGOlI2NkY+Nk4+Ok46Ok1VVVQAAAI+OlJGOlY6OlY+Pk4+Pk4+PlJCOlJCOlY+OlI+Nk46NlI+OlI+PlI6Olo6Ok4+Nk4+Nk46OlI+Nk4+OlJCPlZGQlpKRl5OSmJaVnJWUmpeWnJSSmZCOlJSTmZCOlZOSmb7cF6QAAAAvdFJOUwD+A2X9/Pv+/gIC6Cnz2AjHZmhdul0/cPu+AwHkRkaAcL1/aOXm9/Y+Zvu7/rqAXZkdXwAAAYZJREFUKM91U4d2wjAMVMCOnQBhBMIoe7R0Sk4gQPv//1U5Zpail5fk6eyTdD4D2AgA6uv5LKrVotl8XS8SpyhB0GnoPDNEJst1Iw44dYwAqu10i1IpRKUkbtN29bQ3gHFloyUjLpTUm8rYoSUYPe98jVfh+buXsWVmzsrO5/XCOyKCOfxdpWAO2xvGNGVYECvMiGn8zafl7aTaQ4/81bcRiMLgsMeo1mnM8zW2EhW9xaUpGSEMdcPYJ4Vy26hDoplJZEMmaSIRNrnFVSY4qROY5JIrIna5fjlNy/yZ7m1C5l/Qz2wfytAr12+1+NUkU6SyPkTFn22kDE/ATxltY3Z9BDVy4wlKWzAYQCsl4TJUuwYXd2BkPh7TnhviGWBx09DMjeLdjNItEjKfQ+IVIizDiwjh8CTCUb5eHHadfNNS3DvJZ4Vnnak3RCf8fnkUvsP1w/f/j6wdPDzsH3fY1iaHvzY5OJvYvaN7g40u9ntsTcsc3pi6E15M7a5DMunb69CfJOfr8AsJs0zEPPGMHwAAAABJRU5ErkJggg==", renderingMode: UIImage_1.UIImageRenderingMode.alwaysOriginal });

var UITextField = function (_UIView_1$UIView) {
    _inherits(UITextField, _UIView_1$UIView);

    function UITextField() {
        _classCallCheck(this, UITextField);

        var _this = _possibleConstructorReturn(this, _UIView_1$UIView.call(this));

        _this.clazz = "UITextField";
        _this._text = "";
        _this._textColor = undefined;
        _this._font = undefined;
        _this._textAlignment = UIEnums_1.UITextAlignment.left;
        _this._placeholder = undefined;
        _this.clearsOnBeginEditing = false;
        _this._editing = false;
        _this._clearButtonMode = UIEnums_1.UITextFieldViewMode.never;
        _this._leftView = undefined;
        _this._leftViewMode = UIEnums_1.UITextFieldViewMode.never;
        _this._rightView = undefined;
        _this._rightViewMode = UIEnums_1.UITextFieldViewMode.never;
        _this._keyboardType = UIEnums_1.UIKeyboardType.default;
        _this._returnKeyType = UIEnums_1.UIReturnKeyType.default;
        _this._secureTextEntry = false;
        _this.clearButtonView = new UIButton_1.UIButton().on("touchUpInside", function () {
            if (_this.val("shouldClear") !== false) {
                _this.text = "";
            }
            _this.focus();
        });
        _this.leftPadding = 0;
        _this.rightPadding = 0;
        _this.clearButtonView.hidden = true;
        _this.clearButtonView.setImage(clearButtonImage, UIEnums_1.UIControlState.normal);
        _this.addSubview(_this.clearButtonView);
        return _this;
    }

    UITextField.prototype.textDidChanged = function textDidChanged() {
        this.reloadExtraContents();
    };

    // clearsOnInsertion: boolean = false
    UITextField.prototype.focus = function focus() {
        if (this.val("shouldBeginEditing", this) === false) {
            return;
        }
        this.editing = true;
        this.markFlagDirty("requireFocus");
    };

    UITextField.prototype.blur = function blur() {
        if (this.val("shouldEndEditing", this) === false) {
            return;
        }
        this.editing = false;
        this.markFlagDirty("requireFocus");
    };

    UITextField.prototype.onReturn = function onReturn() {
        this.emit("shouldReturn", this);
    };

    UITextField.prototype.layoutSubviews = function layoutSubviews() {
        _UIView_1$UIView.prototype.layoutSubviews.call(this);
        this.reloadExtraContents();
    };

    UITextField.prototype.reloadExtraContents = function reloadExtraContents() {
        var _this2 = this;

        var displayClearButton = function () {
            if (_this2.clearButtonMode == UIEnums_1.UITextFieldViewMode.always) {
                return true;
            } else if (!_this2.editing && _this2.clearButtonMode == UIEnums_1.UITextFieldViewMode.unlessEditing) {
                return true;
            } else if (_this2.editing && _this2.clearButtonMode == UIEnums_1.UITextFieldViewMode.whileEditing && _this2.text && _this2.text.length > 0) {
                return true;
            }
            return false;
        }();
        var displayRightView = function () {
            if (displayClearButton) {
                return false;
            }
            if (_this2.rightView == null) {
                return false;
            }
            if (_this2.rightViewMode == UIEnums_1.UITextFieldViewMode.always) {
                return true;
            } else if (!_this2.editing && _this2.rightViewMode == UIEnums_1.UITextFieldViewMode.unlessEditing) {
                return true;
            } else if (_this2.editing && _this2.rightViewMode == UIEnums_1.UITextFieldViewMode.whileEditing) {
                return true;
            }
            return false;
        }();
        var displayLeftView = function () {
            if (_this2.leftView == null) {
                return false;
            }
            if (_this2.leftViewMode == UIEnums_1.UITextFieldViewMode.always) {
                return true;
            } else if (!_this2.editing && _this2.leftViewMode == UIEnums_1.UITextFieldViewMode.unlessEditing) {
                return true;
            } else if (_this2.editing && _this2.leftViewMode == UIEnums_1.UITextFieldViewMode.whileEditing) {
                return true;
            }
            return false;
        }();
        this.clearButtonView.hidden = !displayClearButton;
        this.clearButtonView.frame = { x: this.bounds.width - 36.0, y: (this.bounds.height - 44.0) / 2.0, width: 36.0, height: 44.0 };
        if (displayLeftView) {
            if (this.leftView) {
                this.addSubview(this.leftView);
                this.leftView.frame = { x: 0.0, y: (this.bounds.height - this.leftView.frame.height) / 2.0, width: this.leftView.frame.width, height: this.leftView.frame.height };
            }
        } else {
            if (this.leftView) {
                this.leftView.removeFromSuperview();
            }
        }
        if (displayRightView) {
            if (this.rightView) {
                this.addSubview(this.rightView);
                this.rightView.frame = { x: this.bounds.width - this.rightView.frame.width, y: (this.bounds.height - this.rightView.frame.height) / 2.0, width: this.rightView.frame.width, height: this.rightView.frame.height };
            }
        } else {
            if (this.rightView) {
                this.rightView.removeFromSuperview();
            }
        }
        this.leftPadding = displayLeftView && this.leftView !== undefined ? this.leftView.frame.width + 1 : 0.0;
        this.rightPadding = (displayRightView && this.rightView ? this.rightView.frame.width + 1 : 0.0) + (displayClearButton ? 36.0 : 0.0);
        this.markFlagDirty("leftPadding");
        this.markFlagDirty("rightPadding");
    };

    UITextField.prototype.buildData = function buildData() {
        var _this3 = this;

        var data = _UIView_1$UIView.prototype.buildData.call(this);
        data.text = this.text;
        data.placeholder = this.placeholder;
        data.textStyle = "\n        color: " + (this._textColor !== undefined ? UIColor_1.UIColor.toStyle(this._textColor) : "black") + ";\n        font-size: " + (this._font !== undefined ? this._font.pointSize : 14) + "px;\n        font-family: " + (this._font !== undefined ? this._font.fontName : "") + "; \n        font-weight: " + (this._font !== undefined ? this._font.fontStyle : "") + "; \n        font-style: " + (this._font !== undefined ? this._font.fontStyle : "") + "; \n        text-align: " + function () {
            switch (_this3._textAlignment) {
                case UIEnums_1.UITextAlignment.left:
                    return "left";
                case UIEnums_1.UITextAlignment.center:
                    return "center";
                case UIEnums_1.UITextAlignment.right:
                    return "right";
            }
            return "left";
        }() + ";\n        ";
        data.requireFocus = this.editing;
        data.secureTextEntry = this.secureTextEntry;
        data.keyboardType = function () {
            switch (_this3.keyboardType) {
                case UIEnums_1.UIKeyboardType.numberPad:
                    return "number";
                case UIEnums_1.UIKeyboardType.decimalPad:
                    return "digit";
            }
            return "text";
        }();
        data.returnKeyType = function () {
            switch (_this3.returnKeyType) {
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
        };
        data.leftPadding = this.leftPadding;
        data.rightPadding = this.rightPadding;
        return data;
    };

    _createClass(UITextField, [{
        key: "text",
        get: function get() {
            return this._text;
        },
        set: function set(value) {
            this._text = value;
            this.markFlagDirty("text");
        }
    }, {
        key: "textColor",
        get: function get() {
            return this._textColor;
        },
        set: function set(value) {
            this._textColor = value;
            this.markFlagDirty("textStyle");
        }
    }, {
        key: "font",
        get: function get() {
            return this._font;
        },
        set: function set(value) {
            this._font = value;
            this.markFlagDirty("textStyle");
        }
    }, {
        key: "textAlignment",
        get: function get() {
            return this._textAlignment;
        },
        set: function set(value) {
            this._textAlignment = value;
            this.markFlagDirty("textStyle");
        }
    }, {
        key: "placeholder",
        get: function get() {
            return this._placeholder;
        },
        set: function set(value) {
            this._placeholder = value;
            this.markFlagDirty("placeholder");
        }
    }, {
        key: "editing",
        get: function get() {
            return this._editing;
        },
        set: function set(value) {
            if (value && this.val("shouldBeginEditing", this) === false) {
                this.blur();
                return;
            } else if (!value && this.val("shouldEndEditing", this) === false) {
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
            } else {
                this.emit("didEndEditing", this);
            }
        }
    }, {
        key: "clearButtonMode",
        get: function get() {
            return this._clearButtonMode;
        },
        set: function set(value) {
            this._clearButtonMode = value;
            this.reloadExtraContents();
        }
    }, {
        key: "leftView",
        get: function get() {
            return this._leftView;
        },
        set: function set(value) {
            if (this._leftView) {
                this._leftView.removeFromSuperview();
            }
            this._leftView = value;
            this.reloadExtraContents();
        }
    }, {
        key: "leftViewMode",
        get: function get() {
            return this._leftViewMode;
        },
        set: function set(value) {
            this._leftViewMode = value;
            this.reloadExtraContents();
        }
    }, {
        key: "rightView",
        get: function get() {
            return this._rightView;
        },
        set: function set(value) {
            if (this._rightView) {
                this._rightView.removeFromSuperview();
            }
            this._rightView = value;
            this.reloadExtraContents();
        }
    }, {
        key: "rightViewMode",
        get: function get() {
            return this._rightViewMode;
        },
        set: function set(value) {
            this._rightViewMode = value;
            this.reloadExtraContents();
        }
    }, {
        key: "keyboardType",
        get: function get() {
            return this._keyboardType;
        },
        set: function set(value) {
            this._keyboardType = value;
            this.markFlagDirty("keyboardType");
        }
    }, {
        key: "returnKeyType",
        get: function get() {
            return this._returnKeyType;
        },
        set: function set(value) {
            this._returnKeyType = value;
            this.markFlagDirty("returnKeyType");
        }
    }, {
        key: "secureTextEntry",
        get: function get() {
            return this._secureTextEntry;
        },
        set: function set(value) {
            this._secureTextEntry = value;
            this.markFlagDirty("secureTextEntry");
        }
    }]);

    return UITextField;
}(UIView_1.UIView);

exports.UITextField = UITextField;

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var UIView_1 = __webpack_require__(1);
var UIColor_1 = __webpack_require__(5);
var UIEnums_1 = __webpack_require__(6);

var UITextView = function (_UIView_1$UIView) {
    _inherits(UITextView, _UIView_1$UIView);

    function UITextView() {
        _classCallCheck(this, UITextView);

        var _this = _possibleConstructorReturn(this, _UIView_1$UIView.apply(this, arguments));

        _this.clazz = "UITextField";
        _this._text = "";
        _this._textColor = undefined;
        _this._font = undefined;
        _this._textAlignment = UIEnums_1.UITextAlignment.left;
        _this._editable = true;
        _this._editing = false;
        _this._keyboardType = UIEnums_1.UIKeyboardType.default;
        _this._returnKeyType = UIEnums_1.UIReturnKeyType.default;
        _this._secureTextEntry = false;
        return _this;
    }

    UITextView.prototype.textDidChanged = function textDidChanged() {};

    UITextView.prototype.focus = function focus() {
        if (this.val("shouldBeginEditing", this) === false) {
            return;
        }
        this.editing = true;
        this.markFlagDirty("requireFocus");
    };

    UITextView.prototype.blur = function blur() {
        if (this.val("shouldEndEditing", this) === false) {
            return;
        }
        this.editing = false;
        this.markFlagDirty("requireFocus");
    };

    UITextView.prototype.buildData = function buildData() {
        var _this2 = this;

        var data = _UIView_1$UIView.prototype.buildData.call(this);
        data.isTextView = true;
        data.text = this.text;
        data.textStyle = "\n        color: " + (this._textColor !== undefined ? UIColor_1.UIColor.toStyle(this._textColor) : "black") + ";\n        font-size: " + (this._font !== undefined ? this._font.pointSize : 14) + "px;\n        font-family: " + (this._font !== undefined ? this._font.fontName : "") + "; \n        font-weight: " + (this._font !== undefined ? this._font.fontStyle : "") + "; \n        font-style: " + (this._font !== undefined ? this._font.fontStyle : "") + "; \n        text-align: " + function () {
            switch (_this2._textAlignment) {
                case UIEnums_1.UITextAlignment.left:
                    return "left";
                case UIEnums_1.UITextAlignment.center:
                    return "center";
                case UIEnums_1.UITextAlignment.right:
                    return "right";
            }
            return "left";
        }() + ";\n        ";
        data.requireFocus = this.editing;
        data.secureTextEntry = this.secureTextEntry;
        data.keyboardType = function () {
            switch (_this2.keyboardType) {
                case UIEnums_1.UIKeyboardType.numberPad:
                    return "number";
                case UIEnums_1.UIKeyboardType.decimalPad:
                    return "digit";
            }
            return "text";
        }();
        data.returnKeyType = function () {
            switch (_this2.returnKeyType) {
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
        };
        return data;
    };

    _createClass(UITextView, [{
        key: "text",
        get: function get() {
            return this._text;
        },
        set: function set(value) {
            this._text = value;
            this.markFlagDirty("text");
        }
    }, {
        key: "textColor",
        get: function get() {
            return this._textColor;
        },
        set: function set(value) {
            this._textColor = value;
            this.markFlagDirty("textStyle");
        }
    }, {
        key: "font",
        get: function get() {
            return this._font;
        },
        set: function set(value) {
            this._font = value;
            this.markFlagDirty("textStyle");
        }
    }, {
        key: "textAlignment",
        get: function get() {
            return this._textAlignment;
        },
        set: function set(value) {
            this._textAlignment = value;
            this.markFlagDirty("textStyle");
        }
    }, {
        key: "editable",
        get: function get() {
            return this._editable;
        },
        set: function set(value) {
            this._editable = value;
        }
    }, {
        key: "editing",
        get: function get() {
            return this._editing;
        },
        set: function set(value) {
            if (value && this.val("shouldBeginEditing", this) === false) {
                this.blur();
                return;
            } else if (!value && this.val("shouldEndEditing", this) === false) {
                this.focus();
                return;
            }
            this._editing = value;
            if (value) {
                this.emit("didBeginEditing", this);
            } else {
                this.emit("didEndEditing", this);
            }
        }
    }, {
        key: "keyboardType",
        get: function get() {
            return this._keyboardType;
        },
        set: function set(value) {
            this._keyboardType = value;
            this.markFlagDirty("keyboardType");
        }
    }, {
        key: "returnKeyType",
        get: function get() {
            return this._returnKeyType;
        },
        set: function set(value) {
            this._returnKeyType = value;
            this.markFlagDirty("returnKeyType");
        }
    }, {
        key: "secureTextEntry",
        get: function get() {
            return this._secureTextEntry;
        },
        set: function set(value) {
            this._secureTextEntry = value;
            this.markFlagDirty("secureTextEntry");
        }
    }]);

    return UITextView;
}(UIView_1.UIView);

exports.UITextView = UITextView;

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var UIView_1 = __webpack_require__(1);

var UIWebView = function (_UIView_1$UIView) {
    _inherits(UIWebView, _UIView_1$UIView);

    function UIWebView() {
        _classCallCheck(this, UIWebView);

        var _this = _possibleConstructorReturn(this, _UIView_1$UIView.apply(this, arguments));

        _this.clazz = "UIWebView";
        _this.title = undefined;
        _this.URL = undefined;
        _this.loading = false;
        return _this;
    }

    UIWebView.prototype.loadRequest = function loadRequest(request) {
        this.URL = request.URL;
        this.markFlagDirty("src");
    };

    UIWebView.prototype.loadHTMLString = function loadHTMLString(HTMLString, baseURL) {
        console.warn("小程序内不支持加载 HTMLString。");
    };

    UIWebView.prototype.goBack = function goBack() {
        console.warn("暂不支持该方法");
    };

    UIWebView.prototype.goForward = function goForward() {
        console.warn("暂不支持该方法");
    };

    UIWebView.prototype.reload = function reload() {
        console.warn("暂不支持该方法");
    };

    UIWebView.prototype.stopLoading = function stopLoading() {
        console.warn("暂不支持该方法");
    };

    UIWebView.prototype.evaluateJavaScript = function evaluateJavaScript(script, completed) {
        console.warn("暂不支持该方法");
    };

    UIWebView.prototype.buildData = function buildData() {
        var data = _UIView_1$UIView.prototype.buildData.call(this);
        if (this.URL) {
            data.src = this.URL.absoluteString;
        }
        return data;
    };

    return UIWebView;
}(UIView_1.UIView);

exports.UIWebView = UIWebView;

/***/ })
/******/ ]);