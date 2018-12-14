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
                            contentOffsetX: -newVal._contentOffset.x,
                            contentOffsetY: -newVal._contentOffset.y,
                            scrollWithAnimation: newVal._contentOffsetAnimated,
                        });
                        return;
                    }
                    self.setData({
                        style: self.el.buildStyle(),
                        viewID: newVal.viewID,
                        inertia: newVal._pagingEnabled === true ? false : true,
                        direction: (() => {
                            if (!newVal._scrollEnabled) {
                                return "none";
                            }
                            else if (newVal._contentSize.width > newVal.bounds.width && newVal._contentSize.height > newVal.bounds.height) {
                                return "all";
                            }
                            else if (newVal._contentSize.width > newVal.bounds.width) {
                                return "horizontal";
                            }
                            else if (newVal._contentSize.height > newVal.bounds.height) {
                                return "vertical";
                            }
                            else {
                                return "none";
                            }
                        })(),
                        bounces: newVal._bounces,
                        contentSize: newVal._contentSize,
                        contentOffsetX: -newVal._contentOffset.x,
                        contentOffsetY: -newVal._contentOffset.y,
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
                    const deltaX = view._contentOffset.x - (-e.detail.x);
                    const deltaY = view._contentOffset.y - (-e.detail.y);
                    view._contentOffset = { x: -e.detail.x, y: -e.detail.y };
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
                }
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
