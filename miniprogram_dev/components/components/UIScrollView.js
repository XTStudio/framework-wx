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
/******/ 	return __webpack_require__(__webpack_require__.s = 40);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
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

/***/ 2:
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

/***/ 21:
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

/***/ 3:
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

/***/ 4:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const UIComponentManager_1 = __webpack_require__(2);
const UIViewManager_1 = __webpack_require__(0);
// xt-framework/uiview.js
const nextTick = function (cb) {
    return wx.nextTick !== undefined ? wx.nextTick(cb) : setTimeout(cb, 0);
};
class UIViewComponent {
    constructor() {
        this.properties = {
            viewID: {
                type: String,
                value: undefined,
                observer: function (viewID, oldValue) {
                    if (viewID === undefined || viewID === null) {
                        return;
                    }
                    const self = this;
                    UIComponentManager_1.UIComponentManager.shared.addComponent(self, viewID);
                    const newView = UIViewManager_1.UIViewManager.shared.fetchView(viewID);
                    const viewData = newView.buildData();
                    if (viewData.subviews.length > 50) {
                        self.setData(Object.assign({}, viewData, { subviews: [] }));
                        for (let index = 0; index <= viewData.subviews.length; index += 50) {
                            nextTick(() => {
                                self.setData({
                                    subviews: viewData.subviews.slice(0, index)
                                });
                            });
                        }
                    }
                    else {
                        self.setData(newView.buildData());
                    }
                }
            }
        };
        this.lifetimes = {
            detached: function () {
                const self = this;
                if (self.properties && self.properties.viewID) {
                    UIComponentManager_1.UIComponentManager.shared.deleteComponent(self.properties.viewID);
                }
            }
        };
    }
}
exports.UIViewComponent = UIViewComponent;
Component(new UIViewComponent);


/***/ }),

/***/ 40:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const UIView_1 = __webpack_require__(4);
const UIViewManager_1 = __webpack_require__(0);
const Ticker_1 = __webpack_require__(21);
class UIScrollViewComponent extends UIView_1.UIViewComponent {
    constructor() {
        super(...arguments);
        this.methods = {
            onScroll: function (e) {
                const view = UIViewManager_1.UIViewManager.shared.fetchView(this.data.viewID);
                if (view) {
                    const deltaX = e.detail.deltaX;
                    const deltaY = e.detail.deltaY;
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
                            y: deltaY === 0.0 ? 0.0 : (e.timeStamp - view._lastScrollTimeStamp) / deltaY * 1000,
                        };
                    }
                    view._lastScrollTimeStamp = e.timeStamp;
                    Ticker_1.Ticker.shared.addTask("scroll-view.onScroll", () => {
                        const query = wx.createSelectorQuery().in(this);
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
            onPagingScroll: function (e) {
                const view = UIViewManager_1.UIViewManager.shared.fetchView(this.data.viewID);
                if (view && view._touchStartContentOffset) {
                    view._contentOffset = {
                        x: view._touchStartContentOffset.x + e.detail.dx,
                        y: view._touchStartContentOffset.y + e.detail.dy,
                    };
                    view.didScroll();
                    if (view._touchStarted === true) {
                        if (view.tracking === false && view.dragging === false) {
                            view.willBeginDragging();
                        }
                    }
                }
            },
            onPagingChange: function (e) {
                const view = UIViewManager_1.UIViewManager.shared.fetchView(this.data.viewID);
                if (view) {
                    const totalContentSize = {
                        width: view.contentSize.width + view.contentInset.left + view.contentInset.right,
                        height: view.contentSize.height + view.contentInset.top + view.contentInset.bottom
                    };
                    view._contentOffset = {
                        x: (totalContentSize.width > view.bounds.width ? e.detail.current * view.bounds.width : 0.0) - view.contentInset.left,
                        y: (totalContentSize.height > view.bounds.height ? e.detail.current * view.bounds.height : 0.0) - view.contentInset.top,
                    };
                    view.didScroll();
                    if (e.type === "animationfinish" && e.detail.source === "touch") {
                        view.didEndScrollingAnimation();
                    }
                }
            },
            onTouchStarted: function (e) {
                const view = UIViewManager_1.UIViewManager.shared.fetchView(this.data.viewID);
                if (view) {
                    view._touchStartContentOffset = view.contentOffset;
                    view._lastScrollTimeStamp = undefined;
                    view._touchStarted = true;
                }
            },
            onTouchEnded: function (e) {
                const view = UIViewManager_1.UIViewManager.shared.fetchView(this.data.viewID);
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
            onTouchCancelled: function (e) {
                const view = UIViewManager_1.UIViewManager.shared.fetchView(this.data.viewID);
                if (view) {
                    view._touchStarted = false;
                }
            },
            onScrollToLower: function (e) {
                const view = UIViewManager_1.UIViewManager.shared.fetchView(this.data.viewID);
                if (view) {
                    view.createFetchMoreEffect();
                }
            }
        };
    }
}
exports.UIScrollViewComponent = UIScrollViewComponent;
Component(new UIScrollViewComponent());


/***/ })

/******/ });