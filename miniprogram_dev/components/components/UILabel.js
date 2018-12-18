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
/******/ 	return __webpack_require__(__webpack_require__.s = 23);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var UIComponentManager_1 = __webpack_require__(53);
// xt-framework/uiview.js
var emptyAnimation = function () {
    var animation = wx.createAnimation({ duration: 0 });
    animation.step();
    return animation.export();
}();

var UIViewElement = function () {
    UIViewElement.componentPropsChanged = function componentPropsChanged(owner, elementClazz, newProps) {
        if (newProps === undefined || newProps === null) {
            return;
        }
        if (newProps.isDirty !== true && owner.el !== undefined) {
            return;
        }
        if (newProps.viewID) {
            owner.viewID = newProps.viewID;
            UIComponentManager_1.UIComponentManager.shared.addComponent(owner, newProps.viewID);
        }
        if (owner.el === undefined) {
            owner.el = new elementClazz(owner);
        }
        var animation = owner.el.buildAnimation();
        if (animation !== undefined) {
            owner.setData({
                animation: owner.el.buildAnimation()
            });
        } else {
            owner.setData(Object.assign({
                animation: owner.data.animation !== undefined && owner.data.animation !== emptyAnimation ? emptyAnimation : "",
                subviews: newProps.subviews
            }, owner.el.buildProps()));
        }
    };

    function UIViewElement(component) {
        _classCallCheck(this, UIViewElement);

        this.component = component;
    }

    UIViewElement.prototype.getProps = function getProps() {
        return this.component.properties.props || {};
    };

    UIViewElement.prototype.buildProps = function buildProps() {
        return {
            style: this.buildStyle()
        };
    };

    UIViewElement.prototype.buildStyle = function buildStyle() {
        var props = this.getProps();
        var styles = "\n            position: absolute;\n            left: " + props._frame.x + "px;\n            top: " + props._frame.y + "px;\n            width: " + props._frame.width + "px;\n            height: " + props._frame.height + "px; \n        ";
        if (props._backgroundColor !== undefined) {
            styles += "background-color: " + UIColor.toStyle(props._backgroundColor) + ";";
        }
        if (props._alpha < 1.0) {
            styles += "opacity: " + props._alpha + ";";
        }
        if (props._hidden) {
            styles += "display: none;";
        }
        if (props._clipsToBounds) {
            styles += "overflow: hidden;";
        }
        if (!UIAffineTransformIsIdentity(props._transform)) {
            styles += "transform: " + ('matrix(' + props._transform.a + ', ' + props._transform.b + ', ' + props._transform.c + ', ' + props._transform.d + ', ' + props._transform.tx + ', ' + props._transform.ty + ')') + ";";
        }
        if (props._layer) {
            if (props._layer._cornerRadius > 0) {
                styles += "border-radius: " + props._layer._cornerRadius + "px;";
            }
        }
        if (props._extraStyles) {
            styles += props._extraStyles;
        }
        return styles;
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

var UIViewComponent = function UIViewComponent() {
    _classCallCheck(this, UIViewComponent);

    this.properties = {
        props: {
            type: Object,
            value: {},
            observer: function observer(newVal) {
                if (newVal === undefined || newVal === null) {
                    return;
                }
                if (newVal.viewID) {
                    this.viewID = newVal.viewID;
                    UIComponentManager_1.UIComponentManager.shared.addComponent(this, newVal.viewID);
                }
            }
        }
    };
    this.lifetimes = {
        detached: function detached() {
            if (this.viewID) {
                UIComponentManager_1.UIComponentManager.shared.deleteComponent(this.viewID);
            }
        }
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

exports.UIColor = UIColor;
var UIAffineTransformIdentity = { a: 1.0, b: 0.0, c: 0.0, d: 1.0, tx: 0.0, ty: 0.0 };
var UIAffineTransformEqualToTransform = function UIAffineTransformEqualToTransform(t1, t2) {
    return Math.abs(t1.a - t2.a) < 0.001 && Math.abs(t1.b - t2.b) < 0.001 && Math.abs(t1.c - t2.c) < 0.001 && Math.abs(t1.d - t2.d) < 0.001 && Math.abs(t1.tx - t2.tx) < 0.001 && Math.abs(t1.ty - t2.ty) < 0.001;
};
var UIAffineTransformIsIdentity = function UIAffineTransformIsIdentity(transform) {
    return UIAffineTransformEqualToTransform(transform, UIAffineTransformIdentity);
};

/***/ }),

/***/ 23:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var UIView_1 = __webpack_require__(0);

var UILabelElement = function (_UIView_1$UIViewEleme) {
    _inherits(UILabelElement, _UIView_1$UIViewEleme);

    function UILabelElement() {
        _classCallCheck(this, UILabelElement);

        return _possibleConstructorReturn(this, _UIView_1$UIViewEleme.apply(this, arguments));
    }

    UILabelElement.prototype.buildProps = function buildProps() {
        var props = this.getProps();
        return Object.assign({}, _UIView_1$UIViewEleme.prototype.buildProps.call(this), { text: props._text !== undefined ? props._text : "", textStyle: "\n            line-height: 1.0;\n            color: " + (props._textColor !== undefined ? UIView_1.UIColor.toStyle(props._textColor) : "black") + ";\n            font-size: " + (props._font !== undefined ? props._font.pointSize : 14) + "px;\n            font-family: " + (props._font !== undefined ? props._font.fontName : "") + "; \n            font-weight: " + (props._font !== undefined ? props._font.fontStyle : "") + "; \n            font-style: " + (props._font !== undefined ? props._font.fontStyle : "") + "; \n            text-align: " + function () {
                switch (props._textAlignment) {
                    case UITextAlignment.left:
                        return "left";
                    case UITextAlignment.center:
                        return "center";
                    case UITextAlignment.right:
                        return "right";
                }
                return "left";
            }() + ";\n            " + function () {
                if (props._numberOfLines === 1) {
                    return "\n                    overflow: hidden;\n                    text-overflow: ellipsis;\n                    display: inline-block;\n                    white-space: nowrap;\n                    ";
                } else {
                    return "\n                    overflow: hidden;\n                    text-overflow: ellipsis;\n                    display: -webkit-box;\n                    webkit-box-orient: vertical;\n                    ";
                }
            }() + "\n            " });
    };

    return UILabelElement;
}(UIView_1.UIViewElement);

exports.UILabelElement = UILabelElement;

var UILabelComponent = function UILabelComponent() {
    _classCallCheck(this, UILabelComponent);

    this.properties = {
        props: {
            type: Object,
            value: {},
            observer: function observer(newVal, oldVal) {
                UIView_1.UIViewElement.componentPropsChanged(this, UILabelElement, newVal);
            }
        }
    };
};

exports.UILabelComponent = UILabelComponent;
Component(new UILabelComponent());
var UITextAlignment;
(function (UITextAlignment) {
    UITextAlignment[UITextAlignment["left"] = 0] = "left";
    UITextAlignment[UITextAlignment["center"] = 1] = "center";
    UITextAlignment[UITextAlignment["right"] = 2] = "right";
})(UITextAlignment || (UITextAlignment = {}));

/***/ }),

/***/ 53:
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

/***/ })

/******/ });