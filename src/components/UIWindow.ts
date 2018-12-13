import { UIViewElement } from "./UIView";
import { UIWindowManager } from "./UIWindowManager";

// xt-framework/uiview.js

export class UIWindowElement extends UIViewElement {

    buildStyle() {
        let style = super.buildStyle()
        style += `
        width: 100%;
        height: 100%;
        background-color: gray;
        `
        return style
    }

}

export class UIWindowComponent {

    properties = {
        props: {
            type: Object,
            value: {},
            observer: function (newVal: any, oldVal: any) {
                if (newVal === undefined || newVal === null) { return }
                var self: WeApp.Page = this as any
                if (newVal.isDirty !== true && self.el !== undefined) { return }
                if (self.el === undefined) {
                    self.el = new UIWindowElement(self)
                }
                self.setData({
                    style: self.el.buildStyle(),
                    windowID: newVal.windowID || "",
                    subviews: newVal.subviews,
                })
            }
        }
    }

    data = {
        style: ''
    }

    methods = {
        onTouchStarted: function (e: any) {
            if (e.currentTarget && e.currentTarget.dataset && e.currentTarget.dataset.windowid) {
                const window = UIWindowManager.shared.fetchWindow(e.currentTarget.dataset.windowid)
                if (window) {
                    window.handleTouchStart(e)
                }
            }
        },
        onTouchMoved: function (e: any) {
            if (e.currentTarget && e.currentTarget.dataset && e.currentTarget.dataset.windowid) {
                const window = UIWindowManager.shared.fetchWindow(e.currentTarget.dataset.windowid)
                if (window) {
                    window.handleTouchMove(e)
                }
            }
        },
        onTouchEnded: function (e: any) {
            if (e.currentTarget && e.currentTarget.dataset && e.currentTarget.dataset.windowid) {
                const window = UIWindowManager.shared.fetchWindow(e.currentTarget.dataset.windowid)
                if (window) {
                    window.handleTouchEnd(e)
                }
            }
        },
        onTouchCancelled: function (e: any) {
            if (e.currentTarget && e.currentTarget.dataset && e.currentTarget.dataset.windowid) {
                const window = UIWindowManager.shared.fetchWindow(e.currentTarget.dataset.windowid)
                if (window) {
                    window.handleTouchCancel(e)
                }
            }
        },
    }

}

Component(new UIWindowComponent())