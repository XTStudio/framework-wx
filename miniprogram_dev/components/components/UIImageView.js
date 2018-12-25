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
/******/ 	return __webpack_require__(__webpack_require__.s = 38);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
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

/***/ 1:
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

/***/ 3:
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

/***/ 38:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var UIView_1 = __webpack_require__(4);

var UIImageViewComponent = function (_UIView_1$UIViewCompo) {
  _inherits(UIImageViewComponent, _UIView_1$UIViewCompo);

  function UIImageViewComponent() {
    _classCallCheck(this, UIImageViewComponent);

    return _possibleConstructorReturn(this, _UIView_1$UIViewCompo.apply(this, arguments));
  }

  return UIImageViewComponent;
}(UIView_1.UIViewComponent);

exports.UIImageViewComponent = UIImageViewComponent;
Component(new UIImageViewComponent());

/***/ }),

/***/ 4:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var UIComponentManager_1 = __webpack_require__(1);
var UIViewManager_1 = __webpack_require__(0);
// xt-framework/uiview.js
var isDevtools = wx.getSystemInfoSync().platform === "devtools";

var UIViewComponent = function UIViewComponent() {
    _classCallCheck(this, UIViewComponent);

    this.properties = {
        viewID: {
            type: String,
            value: undefined,
            observer: function observer(viewID) {
                var _this = this;

                if (viewID === undefined || viewID === null) {
                    return;
                }
                if (this.viewID !== viewID) {
                    UIComponentManager_1.UIComponentManager.shared.addComponent(this, viewID);
                    var newView = UIViewManager_1.UIViewManager.shared.fetchView(viewID);
                    if (isDevtools) {
                        // prevent vdSync over 1M size.
                        wx.nextTick(function () {
                            _this.setData(newView.buildData());
                        });
                    } else {
                        this.setData(newView.buildData());
                    }
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

/***/ })

/******/ });