import { UIViewElement } from "./UIView";
import { UIViewManager } from "./UIViewManager";
import { UIPoint, UIPointZero } from "../uikit/UIPoint";

export class UIScrollViewElement extends UIViewElement {

}

export class UIScrollViewComponent {

    properties = {
        props: {
            type: Object,
            value: {},
            observer: function (newVal: any, oldVal: any) {
                if (newVal === undefined || newVal === null) { return }
                var self: WeApp.Page = this as any
                if (newVal.isDirty !== true && self.el !== undefined) { return }
                if (self.el === undefined) {
                    self.el = new UIScrollViewElement(self)
                }
                if (newVal._contentOffsetAnimated) {
                    self.setData({
                        scrollWithAnimation: newVal._contentOffsetAnimated,
                    })
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
                })
            }
        }
    }

    data = {
        style: ''
    }

    methods = {
        onScroll: function (e: any) {
            const view = UIViewManager.shared.fetchView(e.currentTarget.dataset.viewid)
            if (view) {
                view._contentOffset = { x: e.detail.scrollLeft, y: e.detail.scrollTop }
                view.didScroll()
                if (view._touchStarted === true) {
                    if (view.tracking === false && view.dragging === false) {
                        view.willBeginDragging()
                    }
                }
            }
            if (typeof view._lastScrollTimeStamp === "number") {
                view._velocity = {
                    x: e.detail.deltaX === 0.0 ? 0.0 : (e.timeStamp - view._lastScrollTimeStamp) / e.detail.deltaX * 1000,
                    y: e.detail.deltaY === 0.0 ? 0.0 : (e.timeStamp - view._lastScrollTimeStamp) / e.detail.deltaY * 1000,
                }
            }
            view._lastScrollTimeStamp = e.timeStamp
        },
        onTouchStarted: function (e: any) {
            const view = UIViewManager.shared.fetchView(e.currentTarget.dataset.viewid)
            if (view) {
                view._lastScrollTimeStamp = undefined
                view._touchStarted = true
            }
        },
        onTouchEnded: function (e: any) {
            const view = UIViewManager.shared.fetchView(e.currentTarget.dataset.viewid)
            if (view) {
                if (view._touchStarted === true && view.tracking === true && view.dragging === true) {
                    view.willEndDragging(view._velocity)
                    view.didEndDragging(false)
                    view.willBeginDecelerating()
                    view.didEndDecelerating()
                }
                view._touchStarted = false
            }
        },
        onTouchCancelled: function (e: any) {
            const view = UIViewManager.shared.fetchView(e.currentTarget.dataset.viewid)
            if (view) {
                view._touchStarted = false
            }
        },
    }

}

Component(new UIScrollViewComponent())