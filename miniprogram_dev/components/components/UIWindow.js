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
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ({

/***/ 12:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var UIView_1 = __webpack_require__(3);
var UIWindowManager_1 = __webpack_require__(4);
// xt-framework/uiview.js

var UIWindowElement = function (_UIView_1$UIViewEleme) {
    _inherits(UIWindowElement, _UIView_1$UIViewEleme);

    function UIWindowElement() {
        _classCallCheck(this, UIWindowElement);

        return _possibleConstructorReturn(this, _UIView_1$UIViewEleme.apply(this, arguments));
    }

    UIWindowElement.prototype.buildStyle = function buildStyle() {
        var style = _UIView_1$UIViewEleme.prototype.buildStyle.call(this);
        style += "\n        width: 100%;\n        height: 100%;\n        background-color: gray;\n        ";
        return style;
    };

    return UIWindowElement;
}(UIView_1.UIViewElement);

exports.UIWindowElement = UIWindowElement;

var UIWindowComponent = function UIWindowComponent() {
    _classCallCheck(this, UIWindowComponent);

    this.properties = {
        props: {
            type: Object,
            value: {},
            observer: function observer(newVal, oldVal) {
                if (newVal === undefined || newVal === null) {
                    return;
                }
                var self = this;
                if (newVal.isDirty !== true && self.el !== undefined) {
                    return;
                }
                if (self.el === undefined) {
                    self.el = new UIWindowElement(self);
                }
                self.setData({
                    style: self.el.buildStyle(),
                    windowID: newVal.windowID || "",
                    subviews: newVal.subviews
                });
            }
        }
    };
    this.data = {
        style: ''
    };
    this.methods = {
        onTouchStarted: function onTouchStarted(e) {
            if (e.currentTarget && e.currentTarget.dataset && e.currentTarget.dataset.windowid) {
                var window = UIWindowManager_1.UIWindowManager.shared.fetchWindow(e.currentTarget.dataset.windowid);
                if (window) {
                    window.handleTouchStart(e);
                }
            }
        },
        onTouchMoved: function onTouchMoved(e) {
            if (e.currentTarget && e.currentTarget.dataset && e.currentTarget.dataset.windowid) {
                var window = UIWindowManager_1.UIWindowManager.shared.fetchWindow(e.currentTarget.dataset.windowid);
                if (window) {
                    window.handleTouchMove(e);
                }
            }
        },
        onTouchEnded: function onTouchEnded(e) {
            if (e.currentTarget && e.currentTarget.dataset && e.currentTarget.dataset.windowid) {
                var window = UIWindowManager_1.UIWindowManager.shared.fetchWindow(e.currentTarget.dataset.windowid);
                if (window) {
                    window.handleTouchEnd(e);
                }
            }
        },
        onTouchCancelled: function onTouchCancelled(e) {
            if (e.currentTarget && e.currentTarget.dataset && e.currentTarget.dataset.windowid) {
                var window = UIWindowManager_1.UIWindowManager.shared.fetchWindow(e.currentTarget.dataset.windowid);
                if (window) {
                    window.handleTouchCancel(e);
                }
            }
        }
    };
};

exports.UIWindowComponent = UIWindowComponent;
Component(new UIWindowComponent());

/***/ }),

/***/ 3:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// xt-framework/uiview.js

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });

var UIViewElement = function () {
    function UIViewElement(component) {
        _classCallCheck(this, UIViewElement);

        this.component = component;
    }

    UIViewElement.prototype.buildStyle = function buildStyle() {
        var props = this.component.properties.props || {};
        return "\n    position: absolute;\n    left: " + props._frame.x + "px;\n    top: " + props._frame.y + "px;\n    width: " + props._frame.width + "px;\n    height: " + props._frame.height + "px; \n    background-color: " + (props._backgroundColor !== undefined ? UIColor.toStyle(props._backgroundColor) : 'transparent') + ";\n    opacity: " + props._alpha + ";\n    display: " + (props._hidden ? "none" : "") + ";\n    overflow: " + (props._clipsToBounds ? "hidden" : "") + ";\n    transform: " + (UIAffineTransformIsIdentity(props._transform) ? "" : 'matrix(' + props._transform.a + ', ' + props._transform.b + ', ' + props._transform.c + ', ' + props._transform.d + ', ' + props._transform.tx + ', ' + props._transform.ty + ')') + ";\n    ";
    };

    return UIViewElement;
}();

exports.UIViewElement = UIViewElement;

var UIViewComponent = function UIViewComponent() {
    _classCallCheck(this, UIViewComponent);

    this.properties = {
        props: {
            type: Object,
            value: {},
            observer: function observer(newVal, oldVal) {
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
                self.setData({
                    style: self.el.buildStyle(),
                    subviews: newVal.subviews
                });
            }
        }
    };
    this.data = {
        style: ''
    };
};

exports.UIViewComponent = UIViewComponent;
Component(new UIViewComponent());
// Helpers

var UIColor = function () {
    function UIColor() {
        _classCallCheck(this, UIColor);
    }

    UIColor.toStyle = function toStyle(color) {
        return 'rgba(' + (color.r * 255).toFixed(0) + ', ' + (color.g * 255).toFixed(0) + ', ' + (color.b * 255).toFixed(0) + ', ' + color.a.toFixed(6) + ')';
    };

    return UIColor;
}();

var UIAffineTransformIdentity = { a: 1.0, b: 0.0, c: 0.0, d: 1.0, tx: 0.0, ty: 0.0 };
var UIAffineTransformEqualToTransform = function UIAffineTransformEqualToTransform(t1, t2) {
    return Math.abs(t1.a - t2.a) < 0.001 && Math.abs(t1.b - t2.b) < 0.001 && Math.abs(t1.c - t2.c) < 0.001 && Math.abs(t1.d - t2.d) < 0.001 && Math.abs(t1.tx - t2.tx) < 0.001 && Math.abs(t1.ty - t2.ty) < 0.001;
};
var UIAffineTransformIsIdentity = function UIAffineTransformIsIdentity(transform) {
    return UIAffineTransformEqualToTransform(transform, UIAffineTransformIdentity);
};

/***/ }),

/***/ 4:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });

var UIWindowManager = function () {
    function UIWindowManager() {
        _classCallCheck(this, UIWindowManager);

        this.windows = {};
    }

    UIWindowManager.prototype.addWindow = function addWindow(window) {
        window.windowID = Math.random().toString();
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

/***/ })

/******/ });