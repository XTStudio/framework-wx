"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UIView_1 = require("./UIView");
const UIWindowManager_1 = require("./UIWindowManager");
// xt-framework/uiview.js
class UIWindowElement extends UIView_1.UIViewElement {
    buildStyle() {
        let style = super.buildStyle();
        style += `
        width: 100%;
        height: 100%;
        `;
        return style;
    }
    buildProps() {
        const props = this.getProps();
        return Object.assign({}, super.buildProps(), { windowID: props.windowID });
    }
}
exports.UIWindowElement = UIWindowElement;
class UIWindowComponent {
    constructor() {
        this.properties = {
            props: {
                type: Object,
                value: {},
                observer: function (newVal, oldVal) {
                    UIView_1.UIViewElement.componentPropsChanged(this, UIWindowElement, newVal);
                }
            }
        };
        this.methods = {
            onTouchStarted: function (e) {
                if (e.currentTarget && e.currentTarget.dataset && e.currentTarget.dataset.windowid) {
                    const window = UIWindowManager_1.UIWindowManager.shared.fetchWindow(e.currentTarget.dataset.windowid);
                    if (window) {
                        window.handleTouchStart(e);
                    }
                }
            },
            onTouchMoved: function (e) {
                if (e.currentTarget && e.currentTarget.dataset && e.currentTarget.dataset.windowid) {
                    const window = UIWindowManager_1.UIWindowManager.shared.fetchWindow(e.currentTarget.dataset.windowid);
                    if (window) {
                        window.handleTouchMove(e);
                    }
                }
            },
            onTouchEnded: function (e) {
                if (e.currentTarget && e.currentTarget.dataset && e.currentTarget.dataset.windowid) {
                    const window = UIWindowManager_1.UIWindowManager.shared.fetchWindow(e.currentTarget.dataset.windowid);
                    if (window) {
                        window.handleTouchEnd(e);
                    }
                }
            },
            onTouchCancelled: function (e) {
                if (e.currentTarget && e.currentTarget.dataset && e.currentTarget.dataset.windowid) {
                    const window = UIWindowManager_1.UIWindowManager.shared.fetchWindow(e.currentTarget.dataset.windowid);
                    if (window) {
                        window.handleTouchCancel(e);
                    }
                }
            },
        };
    }
}
exports.UIWindowComponent = UIWindowComponent;
Component(new UIWindowComponent());
