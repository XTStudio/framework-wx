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
/******/ 	return __webpack_require__(__webpack_require__.s = 35);
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

/***/ 19:
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

/***/ 35:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var UIView_1 = __webpack_require__(4);
var UIViewManager_1 = __webpack_require__(0);
var Ticker_1 = __webpack_require__(19);

var UIScrollViewComponent = function (_UIView_1$UIViewCompo) {
    _inherits(UIScrollViewComponent, _UIView_1$UIViewCompo);

    function UIScrollViewComponent() {
        _classCallCheck(this, UIScrollViewComponent);

        var _this = _possibleConstructorReturn(this, _UIView_1$UIViewCompo.apply(this, arguments));

        _this.methods = {
            onScroll: function onScroll(e) {
                var _this2 = this;

                var view = UIViewManager_1.UIViewManager.shared.fetchView(this.data.viewID);
                if (view) {
                    var deltaX = e.detail.deltaX;
                    var deltaY = e.detail.deltaY;
                    view._contentOffset = {
                        x: e.detail.scrollLeft - view._contentInset.left,
                        y: e.detail.scrollTop - view._contentInset.top
                    };
                    view.didScroll();
                    if (view._touchStarted === true) {
                        if (view.tracking === false && view.dragging === false) {
                            view.willBeginDragging();
                        }
                    }
                    if (typeof view._lastScrollTimeStamp === "number") {
                        view._velocity = {
                            x: deltaX === 0.0 ? 0.0 : (e.timeStamp - view._lastScrollTimeStamp) / deltaX * 1000,
                            y: deltaY === 0.0 ? 0.0 : (e.timeStamp - view._lastScrollTimeStamp) / deltaY * 1000
                        };
                    }
                    view._lastScrollTimeStamp = e.timeStamp;
                    Ticker_1.Ticker.shared.addTask("scroll-view.onScroll", function () {
                        var query = wx.createSelectorQuery().in(_this2);
                        query.select('#scroll-view').scrollOffset(function (res) {
                            view._contentOffset = {
                                x: res.scrollLeft - view._contentInset.left,
                                y: res.scrollTop - view._contentInset.top
                            };
                            view.didScroll();
                        }).exec();
                    });
                }
            },
            onPagingScroll: function onPagingScroll(e) {
                var view = UIViewManager_1.UIViewManager.shared.fetchView(this.data.viewID);
                if (view && view._touchStartContentOffset) {
                    view._contentOffset = {
                        x: view._touchStartContentOffset.x + e.detail.dx,
                        y: view._touchStartContentOffset.y + e.detail.dy
                    };
                    view.didScroll();
                    if (view._touchStarted === true) {
                        if (view.tracking === false && view.dragging === false) {
                            view.willBeginDragging();
                        }
                    }
                }
            },
            onPagingChange: function onPagingChange(e) {
                var view = UIViewManager_1.UIViewManager.shared.fetchView(this.data.viewID);
                if (view) {
                    view._contentOffset = {
                        x: view.contentSize.width > view.bounds.width ? e.detail.current * view.bounds.width : 0.0,
                        y: view.contentSize.height > view.bounds.height ? e.detail.current * view.bounds.height : 0.0
                    };
                    view.didScroll();
                    if (e.type === "animationfinish") {
                        view.didEndScrollingAnimation();
                    }
                }
            },
            onTouchStarted: function onTouchStarted(e) {
                var view = UIViewManager_1.UIViewManager.shared.fetchView(this.data.viewID);
                if (view) {
                    view._touchStartContentOffset = view.contentOffset;
                    view._lastScrollTimeStamp = undefined;
                    view._touchStarted = true;
                }
            },
            onTouchEnded: function onTouchEnded(e) {
                var view = UIViewManager_1.UIViewManager.shared.fetchView(this.data.viewID);
                if (view) {
                    if (view._touchStarted === true && view.tracking === true && view.dragging === true) {
                        view.willEndDragging(view._velocity);
                        view.didEndDragging(false);
                        view.willBeginDecelerating();
                        view.didEndDecelerating();
                    }
                    view._touchStartContentOffset = undefined;
                    view._touchStarted = false;
                }
            },
            onTouchCancelled: function onTouchCancelled(e) {
                var view = UIViewManager_1.UIViewManager.shared.fetchView(this.data.viewID);
                if (view) {
                    view._touchStarted = false;
                }
            },
            onScrollToLower: function onScrollToLower(e) {
                var view = UIViewManager_1.UIViewManager.shared.fetchView(this.data.viewID);
                if (view) {
                    view.createFetchMoreEffect();
                }
            }
        };
        return _this;
    }

    return UIScrollViewComponent;
}(UIView_1.UIViewComponent);

exports.UIScrollViewComponent = UIScrollViewComponent;
Component(new UIScrollViewComponent());

/***/ }),

/***/ 4:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var UIComponentManager_1 = __webpack_require__(1);
var UIViewManager_1 = __webpack_require__(0);
// xt-framework/uiview.js
var nextTick = function nextTick(cb) {
    return wx.nextTick !== undefined ? wx.nextTick(cb) : setTimeout(cb, 0);
};

var UIViewComponent = function UIViewComponent() {
    _classCallCheck(this, UIViewComponent);

    this.properties = {
        viewID: {
            type: String,
            value: undefined,
            observer: function observer(viewID, oldValue) {
                if (viewID === undefined || viewID === null) {
                    return;
                }
                var self = this;
                UIComponentManager_1.UIComponentManager.shared.addComponent(self, viewID);
                var newView = UIViewManager_1.UIViewManager.shared.fetchView(viewID);
                var viewData = newView.buildData();
                if (viewData.subviews.length > 50) {
                    self.setData(Object.assign({}, viewData, { subviews: [] }));

                    var _loop = function _loop(index) {
                        nextTick(function () {
                            self.setData({
                                subviews: viewData.subviews.slice(0, index)
                            });
                        });
                    };

                    for (var index = 0; index <= viewData.subviews.length; index += 50) {
                        _loop(index);
                    }
                } else {
                    self.setData(newView.buildData());
                }
            }
        }
    };
    this.lifetimes = {
        detached: function detached() {
            var self = this;
            if (self.properties && self.properties.viewID) {
                UIComponentManager_1.UIComponentManager.shared.deleteComponent(self.properties.viewID);
            }
        }
    };
};

exports.UIViewComponent = UIViewComponent;
Component(new UIViewComponent());

/***/ })

/******/ });