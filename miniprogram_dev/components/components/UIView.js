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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ({

/***/ 2:
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
        return "\n    position: absolute;\n    left: " + props._frame.x + "px;\n    top: " + props._frame.y + "px;\n    width: " + props._frame.width + "px;\n    height: " + props._frame.height + "px; \n    background-color: " + (props._backgroundColor !== undefined ? UIColor.toStyle(props._backgroundColor) : 'transparent') + ";\n    opacity: " + props._alpha + ";\n    display: " + (props._hidden ? "none" : "") + ";\n    overflow: " + (props._clipsToBounds ? "hidden" : "") + ";\n    transform: " + (UIAffineTransformIsIdentity(props._transform) ? "matrix()" : 'matrix(' + props._transform.a + ', ' + props._transform.b + ', ' + props._transform.c + ', ' + props._transform.d + ', ' + props._transform.tx + ', ' + props._transform.ty + ')') + ";\n    ";
    };

    UIViewElement.prototype.buildAnimation = function buildAnimation() {
        var props = this.component.properties.props || {};
        if (Object.keys(props.animationValues).length > 0) {
            var animation = wx.createAnimation(props.animationProps);
            for (var animationKey in props.animationValues) {
                var endValue = props.animationValues[animationKey];
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
                    animation.backgroundColor(UIColor.toStyle(props._backgroundColor));
                } else if (animationKey === "transform") {
                    animation.matrix(endValue.a, endValue.b, endValue.c, endValue.d, endValue.tx, endValue.ty);
                }
            }
            if (!UIAffineTransformIsIdentity(props._transform)) {
                animation.matrix(props._transform.a, props._transform.b, props._transform.c, props._transform.d, props._transform.tx, props._transform.ty);
            }
            animation.step();
            return animation.export();
        } else {
            return undefined;
        }
    };

    return UIViewElement;
}();

exports.UIViewElement = UIViewElement;
var emptyAnimation = function () {
    var animation = wx.createAnimation({ duration: 0 });
    animation.step();
    return animation.export();
}();

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
                var animation = self.el.buildAnimation();
                if (animation !== undefined) {
                    self.setData({
                        animation: self.el.buildAnimation()
                    });
                } else {
                    self.setData({
                        style: self.el.buildStyle(),
                        animation: self.data.animation !== undefined && self.data.animation !== emptyAnimation ? emptyAnimation : "",
                        subviews: newVal.subviews
                    });
                }
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
        if (color === undefined) {
            return "transparent";
        }
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

/***/ })

/******/ });