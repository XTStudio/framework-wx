import { UIViewComponent } from "./UIView";
import { UIViewManager } from "./UIViewManager";
import { Ticker } from "../uikit/helpers/Ticker";

export class UIScrollViewComponent extends UIViewComponent {

    methods = {
        onScroll: function (e: any) {
            const view = UIViewManager.shared.fetchView((this as any).data.viewID)
            if (view) {
                const deltaX = e.detail.deltaX
                const deltaY = e.detail.deltaY
                view._contentOffset = {
                    x: e.detail.scrollLeft - view._contentInset.left,
                    y: e.detail.scrollTop - view._contentInset.top
                }
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
                Ticker.shared.addTask("scroll-view.onScroll", () => {
                    const query = (wx.createSelectorQuery() as any).in(this)
                    query.select('#scroll-view').scrollOffset(function (res: any) {
                        view._contentOffset = {
                            x: res.scrollLeft - view._contentInset.left,
                            y: res.scrollTop - view._contentInset.top
                        }
                        view.didScroll()
                    }).exec()
                })
            }
        },
        onPagingScroll: function (e: any) {
            const view = UIViewManager.shared.fetchView((this as any).data.viewID)
            if (view && view._touchStartContentOffset) {
                view._contentOffset = {
                    x: view._touchStartContentOffset.x + e.detail.dx,
                    y: view._touchStartContentOffset.y + e.detail.dy,
                }
                view.didScroll()
                if (view._touchStarted === true) {
                    if (view.tracking === false && view.dragging === false) {
                        view.willBeginDragging()
                    }
                }
            }
        },
        onPagingChange: function (e: any) {
            const view = UIViewManager.shared.fetchView((this as any).data.viewID)
            if (view) {
                const totalContentSize = {
                    width: view.contentSize.width + view.contentInset.left + view.contentInset.right,
                    height: view.contentSize.height + view.contentInset.top + view.contentInset.bottom
                }
                view._contentOffset = {
                    x: (totalContentSize.width > view.bounds.width ? e.detail.current * view.bounds.width : 0.0) - view.contentInset.left,
                    y: (totalContentSize.height > view.bounds.height ? e.detail.current * view.bounds.height : 0.0) - view.contentInset.top,
                }
                view.didScroll()
                if (e.type === "animationfinish" && e.detail.source === "touch") {
                    view.didEndScrollingAnimation()
                }
            }
        },
        onTouchStarted: function (e: any) {
            const view = UIViewManager.shared.fetchView((this as any).data.viewID)
            if (view) {
                view._touchStartContentOffset = view.contentOffset
                view._lastScrollTimeStamp = undefined
                view._touchStarted = true
            }
        },
        onTouchEnded: function (e: any) {
            const view = UIViewManager.shared.fetchView((this as any).data.viewID)
            if (view) {
                if (view._touchStarted === true && view.tracking === true && view.dragging === true) {
                    view.willEndDragging(view._velocity)
                    view.didEndDragging(false)
                    view.willBeginDecelerating()
                    view.didEndDecelerating()
                }
                view._touchStartContentOffset = undefined
                view._touchStarted = false
            }
        },
        onTouchCancelled: function (e: any) {
            const view = UIViewManager.shared.fetchView((this as any).data.viewID)
            if (view) {
                view._touchStarted = false
            }
        },
        onScrollToLower: function (e: any) {
            const view = UIViewManager.shared.fetchView((this as any).data.viewID)
            if (view) {
                view.createFetchMoreEffect()
            }
        }
    }

}

Component(new UIScrollViewComponent())