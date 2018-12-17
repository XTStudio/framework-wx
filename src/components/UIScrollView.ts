import { UIViewElement } from "./UIView";
import { UIViewManager } from "./UIViewManager";

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
                const animation = self.el.buildAnimation()
                if (animation !== undefined) {
                    self.setData({
                        animation: self.el.buildAnimation(),
                    })
                }
                else {
                    if (newVal._contentOffsetAnimated) {
                        self.setData({
                            contentOffsetX: -newVal._contentOffset.x,
                            contentOffsetY: -newVal._contentOffset.y,
                            scrollWithAnimation: newVal._contentOffsetAnimated,
                        })
                        return;
                    }
                    self.setData({
                        style: self.el.buildStyle(),
                        viewID: newVal.viewID,
                        inertia: newVal._pagingEnabled === true ? false : true,
                        direction: (() => {
                            if (!newVal._scrollEnabled) {
                                return "none"
                            }
                            else if (newVal._contentSize.width > newVal.bounds.width && newVal._contentSize.height > newVal.bounds.height) {
                                return "all"
                            }
                            else if (newVal._contentSize.width > newVal.bounds.width) {
                                return "horizontal"
                            }
                            else if (newVal._contentSize.height > newVal.bounds.height) {
                                return "vertical"
                            }
                            else {
                                return "none"
                            }
                        })(),
                        bounces: newVal._bounces,
                        contentSize: newVal._contentSize,
                        contentOffsetX: -newVal._contentOffset.x,
                        contentOffsetY: -newVal._contentOffset.y,
                        pointerEvents: newVal._scrollDisabledTemporary === true ? "none" : "auto",
                        subviews: newVal.subviews,
                    })
                }
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
                const deltaX = view._contentOffset.x - (-e.detail.x)
                const deltaY = view._contentOffset.y - (-e.detail.y)
                view._contentOffset = { x: -e.detail.x, y: -e.detail.y }
                view.didScroll()
                if (view._touchStarted === true) {
                    if (view.tracking === false && view.dragging === false) {
                        view.willBeginDragging()
                    }
                }
                if (typeof view._lastScrollTimeStamp === "number") {
                    view._velocity = {
                        x: deltaX === 0.0 ? 0.0 : (e.timeStamp - view._lastScrollTimeStamp) / deltaX * 1000,
                        y: deltaY === 0.0 ? 0.0 : (e.timeStamp - view._lastScrollTimeStamp) / deltaY * 1000,
                    }
                }
                view._lastScrollTimeStamp = e.timeStamp
            }
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