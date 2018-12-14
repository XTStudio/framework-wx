"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UIView_1 = require("./UIView");
const UIViewManager_1 = require("./UIViewManager");
class UIScrollViewElement extends UIView_1.UIViewElement {
}
exports.UIScrollViewElement = UIScrollViewElement;
class UIScrollViewComponent {
    constructor() {
        this.properties = {
            props: {
                type: Object,
                value: {},
                observer: function (newVal, oldVal) {
                    if (newVal === undefined || newVal === null) {
                        return;
                    }
                    var self = this;
                    if (newVal.isDirty !== true && self.el !== undefined) {
                        return;
                    }
                    if (self.el === undefined) {
                        self.el = new UIScrollViewElement(self);
                    }
                    if (newVal._contentOffsetAnimated) {
                        self.setData({
                            scrollWithAnimation: newVal._contentOffsetAnimated,
                        });
                    }
                    self.setData({
                        style: self.el.buildStyle(),
                        viewID: newVal.viewID,
                        placeholderLocation: {
                            x: newVal._bounces === true && newVal._alwaysBounceHorizontal === true ? Math.max(newVal.bounds.width, Math.max(0, newVal._contentSize.width - 1)) : Math.max(0, newVal._contentSize.width - 1),
                            y: newVal._bounces === true && newVal._alwaysBounceVertical === true ? Math.max(newVal.bounds.height, Math.max(0, newVal._contentSize.height - 1)) : Math.max(0, newVal._contentSize.height - 1),
                        },
                        scrollX: newVal._scrollEnabled && (newVal._contentSize.width > newVal.bounds.width || (newVal._bounces === true && newVal._alwaysBounceHorizontal === true)),
                        scrollY: newVal._scrollEnabled && (newVal._contentSize.height > newVal.bounds.height || (newVal._bounces === true && newVal._alwaysBounceVertical === true)),
                        scrollWithAnimation: newVal._contentOffsetAnimated,
                        scrollLeft: newVal._contentOffset.x,
                        scrollTop: newVal._contentOffset.y,
                        scrollsToTop: newVal._scrollsToTop,
                        pointerEvents: newVal._scrollDisabledTemporary === true ? "none" : "auto",
                        subviews: newVal.subviews,
                    });
                }
            }
        };
        this.data = {
            style: ''
        };
        this.methods = {
            onScroll: function (e) {
                const view = UIViewManager_1.UIViewManager.shared.fetchView(e.currentTarget.dataset.viewid);
                if (view) {
                    view._contentOffset = { x: e.detail.scrollLeft, y: e.detail.scrollTop };
                    view.didScroll();
                    if (view._touchStarted === true) {
                        if (view.tracking === false && view.dragging === false) {
                            view.willBeginDragging();
                        }
                    }
                }
                if (typeof view._lastScrollTimeStamp === "number") {
                    view._velocity = {
                        x: e.detail.deltaX === 0.0 ? 0.0 : (e.timeStamp - view._lastScrollTimeStamp) / e.detail.deltaX * 1000,
                        y: e.detail.deltaY === 0.0 ? 0.0 : (e.timeStamp - view._lastScrollTimeStamp) / e.detail.deltaY * 1000,
                    };
                }
                view._lastScrollTimeStamp = e.timeStamp;
            },
            onTouchStarted: function (e) {
                const view = UIViewManager_1.UIViewManager.shared.fetchView(e.currentTarget.dataset.viewid);
                if (view) {
                    view._lastScrollTimeStamp = undefined;
                    view._touchStarted = true;
                }
            },
            onTouchEnded: function (e) {
                const view = UIViewManager_1.UIViewManager.shared.fetchView(e.currentTarget.dataset.viewid);
                if (view) {
                    if (view._touchStarted === true && view.tracking === true && view.dragging === true) {
                        view.willEndDragging(view._velocity);
                        view.didEndDragging(false);
                        view.willBeginDecelerating();
                        view.didEndDecelerating();
                    }
                    view._touchStarted = false;
                }
            },
            onTouchCancelled: function (e) {
                const view = UIViewManager_1.UIViewManager.shared.fetchView(e.currentTarget.dataset.viewid);
                if (view) {
                    view._touchStarted = false;
                }
            },
        };
    }
}
exports.UIScrollViewComponent = UIScrollViewComponent;
Component(new UIScrollViewComponent());
