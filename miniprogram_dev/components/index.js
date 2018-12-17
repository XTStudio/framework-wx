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
/******/ 	return __webpack_require__(__webpack_require__.s = 21);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var UIPoint_1 = __webpack_require__(5);
var EventEmitter_1 = __webpack_require__(14);
var MagicObject_1 = __webpack_require__(9);
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
        _this._touches = new MagicObject_1.MagicObject([]);
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

    _createClass(UIGestureRecognizer, [{
        key: "touches",
        get: function get() {
            return this._touches.get();
        },
        set: function set(value) {
            this._touches.set(value);
        }
    }]);

    return UIGestureRecognizer;
}(EventEmitter_1.EventEmitter);

exports.UIGestureRecognizer = UIGestureRecognizer;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var UIRect_1 = __webpack_require__(15);
var UIAffineTransform_1 = __webpack_require__(10);
var Matrix_1 = __webpack_require__(11);
var UIColor_1 = __webpack_require__(13);
var UIWindowManager_1 = __webpack_require__(7);
var UITouch_1 = __webpack_require__(4);
var UIEdgeInsets_1 = __webpack_require__(8);
var MagicObject_1 = __webpack_require__(9);
var UIAnimator_1 = __webpack_require__(12);
var UIViewManager_1 = __webpack_require__(6);
var EventEmitter_1 = __webpack_require__(14);
exports.dirtyItems = [];

var UIView = function (_EventEmitter_1$Event) {
    _inherits(UIView, _EventEmitter_1$Event);

    function UIView() {
        _classCallCheck(this, UIView);

        var _this = _possibleConstructorReturn(this, _EventEmitter_1$Event.call(this));

        _this.clazz = "UIView";
        _this.isDirty = true;
        _this.dataOwner = undefined;
        _this.dataField = undefined;
        _this.animationProps = {};
        _this.animationValues = {};
        _this._frame = UIRect_1.UIRectZero;
        _this.bounds = UIRect_1.UIRectZero;
        _this.touchAreaInsets = UIEdgeInsets_1.UIEdgeInsetsZero;
        _this._transform = UIAffineTransform_1.UIAffineTransformIdentity;
        // hierarchy
        _this.tag = 0;
        _this.viewDelegate = undefined;
        _this._superview = new MagicObject_1.MagicObject();
        _this.subviews = [];
        _this._clipsToBounds = false;
        _this._hidden = false;
        // protected _contentMode: UIViewContentMode = UIViewContentMode.scaleToFill
        _this._tintColor = undefined;
        _this._alpha = 1.0;
        _this._backgroundColor = undefined;
        // GestureRecognizers
        _this._userInteractionEnabled = true;
        _this._gestureRecognizers = new MagicObject_1.MagicObject([]);
        _this.invalidateCallHandler = undefined;
        UIViewManager_1.UIViewManager.shared.addView(_this);
        exports.dirtyItems.push(_this);
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
            superview.invalidate();
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
        this.invalidate();
        view.invalidate();
        view.didMoveToSuperview();
        this.didAddSubview(view);
    };

    UIView.prototype.exchangeSubview = function exchangeSubview(index1, index2) {
        var index2View = this.subviews[index2];
        this.subviews[index2] = this.subviews[index1];
        this.subviews[index1] = index2View;
        this.invalidate();
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
        this.invalidate();
        view.invalidate();
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
            this.invalidate();
        }
    };

    UIView.prototype.sendSubviewToBack = function sendSubviewToBack(view) {
        var index = this.subviews.indexOf(view);
        if (index >= 0) {
            this.subviews.splice(index, 1);
            this.subviews.unshift(view);
            this.invalidate();
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
                currentPoint.x += -current.superview.contentOffset.x;
                currentPoint.y += -current.superview.contentOffset.y;
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
                currentPoint.x -= -it.superview.contentOffset.x;
                currentPoint.y -= -it.superview.contentOffset.y;
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

    UIView.prototype.invalidate = function invalidate() {
        var _this3 = this;

        var dirty = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
        var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        if (dirty) {
            this.isDirty = true;
            exports.dirtyItems.push(this);
        }
        var nextResponder = this.nextResponder();
        if (nextResponder !== undefined) {
            nextResponder.invalidate(true, force);
        } else {
            if (force) {
                if (this.dataOwner && this.dataField) {
                    var _dataOwner$setData;

                    this.dataOwner.setData((_dataOwner$setData = {}, _dataOwner$setData[this.dataField] = this, _dataOwner$setData));
                }
                exports.dirtyItems.forEach(function (it) {
                    it.isDirty = false;
                    it.animationProps = {};
                    it.animationValues = {};
                });
                exports.dirtyItems = [];
                return;
            }
            if (this.invalidateCallHandler === undefined) {
                this.invalidateCallHandler = setTimeout(function () {
                    _this3.invalidateCallHandler = undefined;
                    if (_this3.dataOwner && _this3.dataField) {
                        var _this3$dataOwner$setD;

                        _this3.dataOwner.setData((_this3$dataOwner$setD = {}, _this3$dataOwner$setD[_this3.dataField] = _this3, _this3$dataOwner$setD));
                    }
                    exports.dirtyItems.forEach(function (it) {
                        it.isDirty = false;
                        it.animationProps = {};
                        it.animationValues = {};
                    });
                    exports.dirtyItems = [];
                });
            }
        }
    };

    _createClass(UIView, [{
        key: "frame",
        set: function set(value) {
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
            var boundsChanged = this._frame.width != value.width || this._frame.height != value.height;
            this._frame = value;
            if (boundsChanged) {
                this.bounds = { x: 0, y: 0, width: value.width, height: value.height };
                this.setNeedsLayout(true);
            }
            this.invalidate();
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
                this.animationProps = UIAnimator_1.UIAnimator.activeAnimator.animationProps;
                this.animationValues["transform"] = value;
            }
            this._transform = value;
            this.invalidate();
        }
    }, {
        key: "superview",
        get: function get() {
            return this._superview.get();
        },
        set: function set(value) {
            this._superview.set(value);
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
            this.invalidate();
        }
    }, {
        key: "hidden",
        set: function set(value) {
            if (this._hidden === value) {
                return;
            }
            this._hidden = value;
            this.invalidate();
        },
        get: function get() {
            return this._hidden;
        }
    }, {
        key: "tintColor",
        set: function set(value) {
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
                this.animationProps = UIAnimator_1.UIAnimator.activeAnimator.animationProps;
                this.animationValues["alpha"] = value;
            }
            this._alpha = value;
            this.invalidate();
        },
        get: function get() {
            return this._alpha;
        }
    }, {
        key: "backgroundColor",
        set: function set(value) {
            if (UIAnimator_1.UIAnimator.activeAnimator !== undefined) {
                this.animationProps = UIAnimator_1.UIAnimator.activeAnimator.animationProps;
                this.animationValues["backgroundColor"] = value;
            }
            this._backgroundColor = value;
            this.invalidate();
        },
        get: function get() {
            return this._backgroundColor;
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
    }, {
        key: "gestureRecognizers",
        get: function get() {
            return this._gestureRecognizers.get();
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

        var _this4 = _possibleConstructorReturn(this, _UIView.call(this));

        _this4.clazz = "UIWindow";
        // touches
        _this4.currentTouchesID = [];
        _this4._touches = new MagicObject_1.MagicObject({});
        _this4.upCount = new Map();
        _this4.upTimestamp = new Map();
        UIWindowManager_1.UIWindowManager.shared.addWindow(_this4);
        return _this4;
    }

    UIWindow.prototype.attach = function attach(dataOwner, dataField) {
        var rootView = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

        if (rootView) {
            this.rootView = rootView;
            this.addSubview(rootView);
            this.layoutSubviews();
        }
        this.dataOwner = dataOwner;
        this.dataField = dataField;
        this.invalidate();
    };

    UIWindow.prototype.layoutSubviews = function layoutSubviews() {
        _UIView.prototype.layoutSubviews.call(this);
        if (this.rootView) {
            this.rootView.frame = this.bounds;
        }
    };

    UIWindow.prototype.handleTouchStart = function handleTouchStart(e) {
        var _this5 = this;

        var changedTouches = this.standardlizeTouches(e);

        var _loop = function _loop(index) {
            var pointer = changedTouches[index];
            var pointerIdentifier = _this5.standardlizeTouchIdentifier(pointer);
            _this5.currentTouchesID.push(pointerIdentifier);
            var point = { x: pointer.pageX, y: pointer.pageY };
            var target = _this5.hitTest(point);
            if (target) {
                var touch = new UITouch_1.UITouch();
                _this5.touches[pointerIdentifier] = touch;
                touch.identifier = pointerIdentifier;
                touch.phase = UITouch_1.UITouchPhase.began;
                touch.tapCount = function () {
                    for (var _iterator = _this5.upCount, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
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

                        var timestamp = _this5.upTimestamp.get(key) || 0.0;
                        if (e.timeStamp / 1000 - timestamp < 1.0 && Math.abs(key.x - point.x) < 44.0 && Math.abs(key.y - point.y) < 44.0) {
                            return value + 1;
                        }
                    }
                    return 1;
                }();
                touch.timestamp = e.timeStamp / 1000;
                touch.window = _this5;
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
    }, {
        key: "touches",
        set: function set(value) {
            this._touches.set(value);
        },
        get: function get() {
            return this._touches.get();
        }
    }]);

    return UIWindow;
}(UIView);

exports.UIWindow = UIWindow;
exports.sharedVelocityTracker = new UITouch_1.VelocityTracker();

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var UIPoint_1 = __webpack_require__(5);
var MagicObject_1 = __webpack_require__(9);
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
        this._window = new MagicObject_1.MagicObject();
        this.windowPoint = undefined;
        this._view = new MagicObject_1.MagicObject();
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

    _createClass(UITouch, [{
        key: "window",
        get: function get() {
            return this._window.get();
        },
        set: function set(value) {
            this._window.set(value);
        }
    }, {
        key: "view",
        get: function get() {
            return this._view.get();
        },
        set: function set(value) {
            this._view.set(value);
        }
    }]);

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
/* 5 */
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var UUID_1 = __webpack_require__(1);

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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var UUID_1 = __webpack_require__(1);

var UIWindowManager = function () {
    function UIWindowManager() {
        _classCallCheck(this, UIWindowManager);

        this.windows = {};
    }

    UIWindowManager.prototype.addWindow = function addWindow(window) {
        window.windowID = UUID_1.randomUUID();
        this.windows[window.windowID] = window;
    };

    UIWindowManager.prototype.fetchWindow = function fetchWindow(windowID) {
        return this.windows[windowID];
    };

    _createClass(UIWindowManager, null, [{
        key: "shared",
        get: function get() {
            if (getApp().UIWindowManagerShared === undefined) {
                getApp().UIWindowManagerShared = new UIWindowManager();
            }
            return getApp().UIWindowManagerShared;
        }
    }]);

    return UIWindowManager;
}();

exports.UIWindowManager = UIWindowManager;

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


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });

var MagicObject = function () {
    function MagicObject() {
        var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

        _classCallCheck(this, MagicObject);

        this.value = new Map();
        this.set(value);
    }

    MagicObject.prototype.set = function set(value) {
        this.value.set("1", value);
    };

    MagicObject.prototype.get = function get() {
        return this.value.get("1");
    };

    return MagicObject;
}();

exports.MagicObject = MagicObject;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var Matrix_1 = __webpack_require__(11);
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
/* 11 */
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
/* 12 */
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
/* 13 */
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
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var EventEmitterIMP = __webpack_require__(22);
exports.EventEmitter = EventEmitterIMP.EventEmitter;

/***/ }),
/* 15 */
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
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var UIGestureRecognizer_1 = __webpack_require__(2);
var UIView_1 = __webpack_require__(3);
var UITouch_1 = __webpack_require__(4);

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
/* 17 */
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
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.assign(module.exports, __webpack_require__(10));
Object.assign(module.exports, __webpack_require__(12));
Object.assign(module.exports, __webpack_require__(13));
Object.assign(module.exports, __webpack_require__(8));
Object.assign(module.exports, __webpack_require__(30));
Object.assign(module.exports, __webpack_require__(29));
Object.assign(module.exports, __webpack_require__(2));
Object.assign(module.exports, __webpack_require__(23));
Object.assign(module.exports, __webpack_require__(24));
Object.assign(module.exports, __webpack_require__(16));
Object.assign(module.exports, __webpack_require__(25));
Object.assign(module.exports, __webpack_require__(5));
Object.assign(module.exports, __webpack_require__(15));
Object.assign(module.exports, __webpack_require__(26));
Object.assign(module.exports, __webpack_require__(17));
Object.assign(module.exports, __webpack_require__(27));
Object.assign(module.exports, __webpack_require__(28));
Object.assign(module.exports, __webpack_require__(4));
Object.assign(module.exports, __webpack_require__(3));
Component({
    properties: {
        view: {
            type: Object,
            value: undefined,
            observer: function observer(newVal, oldVal) {
                if (newVal === undefined || newVal === null) {
                    return;
                }
                if (typeof this.data.clazz !== "string" || _typeof(this.data.view) !== newVal) {
                    this.setData({
                        view: newVal,
                        clazz: newVal.clazz
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
/* 22 */
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
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var UIView_1 = __webpack_require__(3);
var UIEnums_1 = __webpack_require__(30);

var UILabel = function (_UIView_1$UIView) {
    _inherits(UILabel, _UIView_1$UIView);

    function UILabel() {
        _classCallCheck(this, UILabel);

        var _this = _possibleConstructorReturn(this, _UIView_1$UIView.apply(this, arguments));

        _this.clazz = "UILabel";
        _this._text = undefined;
        _this._font = undefined;
        _this._textColor = undefined;
        _this._textAlignment = UIEnums_1.UITextAlignment.left;
        _this._numberOfLines = 1;
        return _this;
    }

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
            this.invalidate();
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
            this.invalidate();
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
            this.invalidate();
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
            this.invalidate();
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
            this.invalidate();
        }
    }]);

    return UILabel;
}(UIView_1.UIView);

exports.UILabel = UILabel;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var UIGestureRecognizer_1 = __webpack_require__(2);
var UITouch_1 = __webpack_require__(4);
var UIView_1 = __webpack_require__(3);

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
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var UIGestureRecognizer_1 = __webpack_require__(2);

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
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var UIGestureRecognizer_1 = __webpack_require__(2);

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
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var UIView_1 = __webpack_require__(3);
var UIPoint_1 = __webpack_require__(5);
var UISize_1 = __webpack_require__(17);
var UIEdgeInsets_1 = __webpack_require__(8);
var UIPanGestureRecognizer_1 = __webpack_require__(16);

var UIScrollView = function (_UIView_1$UIView) {
    _inherits(UIScrollView, _UIView_1$UIView);

    function UIScrollView() {
        _classCallCheck(this, UIScrollView);

        var _this = _possibleConstructorReturn(this, _UIView_1$UIView.call(this));

        _this.clazz = "UIScrollView";
        _this._panGesture = new UIPanGestureRecognizer_1.UIPanGestureRecognizer();
        _this._contentOffset = UIPoint_1.UIPointZero;
        _this._contentOffsetAnimated = false;
        _this._contentSize = UISize_1.UISizeZero;
        _this.contentInset = UIEdgeInsets_1.UIEdgeInsetsZero;
        _this.directionalLockEnabled = false;
        _this._bounces = true;
        _this._alwaysBounceVertical = false;
        _this._alwaysBounceHorizontal = false;
        _this._pagingEnabled = false;
        // private _scrollDisabledTemporary: boolean = false
        // public get scrollDisabledTemporary(): boolean {
        //     return this._scrollDisabledTemporary;
        // }
        // public set scrollDisabledTemporary(value: boolean) {
        //     this._scrollDisabledTemporary = value;
        //     this.invalidate(true, true)
        // }
        _this._scrollEnabled = true;
        _this.showsHorizontalScrollIndicator = true; // todo
        _this.showsVerticalScrollIndicator = true; // todo
        _this.tracking = false;
        _this.dragging = false;
        _this.decelerating = false;
        _this._scrollsToTop = false;
        _this._endDraggingVelocity = UIPoint_1.UIPointZero;
        _this._panGesture.enabled = false;
        return _this;
    }

    UIScrollView.prototype.setContentOffset = function setContentOffset(contentOffset, animated) {
        var _this2 = this;

        this.contentOffset = contentOffset;
        this._contentOffsetAnimated = animated;
        if (this._contentOffsetAnimated) {
            setTimeout(function () {
                _this2._contentOffsetAnimated = false;
            }, 32);
        }
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
        if (this.pagingEnabled) {
            if (this.contentSize.width < this.bounds.width) {
                if (this.contentOffset.y <= 0 || this.contentOffset.y >= this.contentSize.height - this.bounds.height) {
                    return;
                }
                var currentPageY = Math.floor(this.contentOffset.y / this.bounds.height) * this.bounds.height;
                var nextPageY = Math.ceil(this.contentOffset.y / this.bounds.height) * this.bounds.height;
                if (this._endDraggingVelocity.y > 200) {
                    this.setContentOffset({ x: 0, y: currentPageY }, true);
                } else if (this._endDraggingVelocity.y < -200 || nextPageY - this.contentOffset.y < this.contentOffset.y - currentPageY) {
                    this.setContentOffset({ x: 0, y: nextPageY }, true);
                } else {
                    this.setContentOffset({ x: 0, y: currentPageY }, true);
                }
                this.invalidate(true, true);
            } else if (this.contentSize.height < this.bounds.height) {
                if (this.contentOffset.x <= 0 || this.contentOffset.x >= this.contentSize.width - this.bounds.width) {
                    return;
                }
                var currentPageX = Math.floor(this.contentOffset.x / this.bounds.width) * this.bounds.width;
                var nextPageX = Math.ceil(this.contentOffset.x / this.bounds.width) * this.bounds.width;
                if (this._endDraggingVelocity.x > 200) {
                    this.setContentOffset({ x: currentPageX, y: 0 }, true);
                } else if (this._endDraggingVelocity.x < -200 || nextPageX - this.contentOffset.x < this.contentOffset.x - currentPageX) {
                    this.setContentOffset({ x: nextPageX, y: 0 }, true);
                } else {
                    this.setContentOffset({ x: currentPageX, y: 0 }, true);
                }
                this.invalidate(true, true);
            }
        }
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

    _createClass(UIScrollView, [{
        key: "contentOffset",
        get: function get() {
            return this._contentOffset;
        },
        set: function set(value) {
            this._contentOffset = value;
            this._contentOffsetAnimated = false;
            this.invalidate();
        }
    }, {
        key: "contentSize",
        get: function get() {
            return this._contentSize;
        },
        set: function set(value) {
            this._contentSize = value;
            this.invalidate();
        }
    }, {
        key: "bounces",
        get: function get() {
            return this._bounces;
        },
        set: function set(value) {
            this._bounces = value;
            this.invalidate();
        }
    }, {
        key: "alwaysBounceVertical",
        get: function get() {
            return this._alwaysBounceVertical;
        },
        set: function set(value) {
            this._alwaysBounceVertical = value;
            this.invalidate();
        }
    }, {
        key: "alwaysBounceHorizontal",
        get: function get() {
            return this._alwaysBounceHorizontal;
        },
        set: function set(value) {
            this._alwaysBounceHorizontal = value;
            this.invalidate();
        }
    }, {
        key: "pagingEnabled",
        get: function get() {
            return this._pagingEnabled;
        },
        set: function set(value) {
            this._pagingEnabled = value;
            this.invalidate();
        }
    }, {
        key: "scrollEnabled",
        get: function get() {
            return this._scrollEnabled;
        },
        set: function set(value) {
            this._scrollEnabled = value;
            this.invalidate();
        }
    }, {
        key: "scrollsToTop",
        get: function get() {
            return this._scrollsToTop;
        },
        set: function set(value) {
            this._scrollsToTop = value;
            this.invalidate();
        }
    }]);

    return UIScrollView;
}(UIView_1.UIView);

exports.UIScrollView = UIScrollView;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var UITouch_1 = __webpack_require__(4);
var UIGestureRecognizer_1 = __webpack_require__(2);
var UIView_1 = __webpack_require__(3);

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
/* 29 */
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
/* 30 */
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

/***/ })
/******/ ]);