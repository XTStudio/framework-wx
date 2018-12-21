"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UIView_1 = require("./UIView");
const UIViewManager_1 = require("./UIViewManager");
let onScrollTimer = undefined;
class UIScrollViewComponent extends UIView_1.UIViewComponent {
    constructor() {
        super(...arguments);
        this.methods = {
            onScroll: function (e) {
                const view = UIViewManager_1.UIViewManager.shared.fetchView(e.currentTarget.dataset.viewid);
                if (view) {
                    if (false) {
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
                    else {
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
                    }
                    if (onScrollTimer !== undefined) {
                        clearTimeout(onScrollTimer);
                        onScrollTimer = undefined;
                    }
                    onScrollTimer = setTimeout(() => {
                        const query = wx.createSelectorQuery().in(this);
                        query.select('#scroll-view').scrollOffset(function (res) {
                            view._contentOffset = {
                                x: res.scrollLeft - view._contentInset.left,
                                y: res.scrollTop - view._contentInset.top
                            };
                            view.didScroll();
                            onScrollTimer = undefined;
                        }).exec();
                    }, 32);
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
