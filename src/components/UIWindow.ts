import { UIViewElement } from "./UIView";
import { UIWindowManager } from "./UIWindowManager";

// xt-framework/uiview.js

export class UIWindowElement extends UIViewElement {

    buildStyle() {
        let style = super.buildStyle()
        style += `
        width: 100%;
        height: 100%;
        `
        return style
    }

    buildProps() {
        const props = this.getProps()
        return {
            ... super.buildProps(),
            windowID: props.windowID,
        }
    }

}

export class UIWindowComponent {

    properties = {
        props: {
            type: Object,
            value: {},
            observer: function (newVal: any, oldVal: any) {
                UIViewElement.componentPropsChanged(this as any, UIWindowElement, newVal)
            }
        }
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