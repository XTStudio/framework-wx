import { UIViewElement, UIViewComponent } from "./UIView";
import { UIViewManager } from "./UIViewManager";

export class UIScrollViewComponent extends UIViewComponent {

    methods = {
        onScroll: function (e: any) {
            const view = UIViewManager.shared.fetchView(e.currentTarget.dataset.viewid)
            if (view) {
                if (false) {
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
                else {
                    const deltaX = e.detail.deltaX
                    const deltaY = e.detail.deltaY
                    view._contentOffset = { x: e.detail.scrollLeft, y: e.detail.scrollTop }
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