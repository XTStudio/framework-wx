import { UIComponentManager } from "./UIComponentManager";
import { UIViewManager } from "./UIViewManager";
import { UIViewComponent } from "./UIView";

export class UIWindowComponent extends UIViewComponent {

    methods = {
        onTouchStarted: function (e: any) {
            // var q = (wx.createSelectorQuery() as any).in(this)
            // q.select('#_text_measurer').boundingClientRect(function(e: any){ console.log(e) })
            // q.exec()
            if (e.currentTarget && e.currentTarget.dataset && e.currentTarget.dataset.viewid) {
                const window = UIViewManager.shared.fetchView(e.currentTarget.dataset.viewid)
                if (window) {
                    window.handleTouchStart(e)
                }
            }
        },
        onTouchMoved: function (e: any) {
            if (e.currentTarget && e.currentTarget.dataset && e.currentTarget.dataset.viewid) {
                const window = UIViewManager.shared.fetchView(e.currentTarget.dataset.viewid)
                if (window) {
                    window.handleTouchMove(e)
                }
            }
        },
        onTouchEnded: function (e: any) {
            if (e.currentTarget && e.currentTarget.dataset && e.currentTarget.dataset.viewid) {
                const window = UIViewManager.shared.fetchView(e.currentTarget.dataset.viewid)
                if (window) {
                    window.handleTouchEnd(e)
                }
            }
        },
        onTouchCancelled: function (e: any) {
            if (e.currentTarget && e.currentTarget.dataset && e.currentTarget.dataset.viewid) {
                const window = UIViewManager.shared.fetchView(e.currentTarget.dataset.viewid)
                if (window) {
                    window.handleTouchCancel(e)
                }
            }
        },
    }

    pageLifetimes = {
        show: function () {
            UIComponentManager.keyWindowComponent = this
        }
    }

}

Component(new UIWindowComponent())