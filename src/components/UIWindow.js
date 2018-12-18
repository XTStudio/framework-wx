"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UIViewManager_1 = require("./UIViewManager");
const UIView_1 = require("./UIView");
class UIWindowComponent extends UIView_1.UIViewComponent {
    constructor() {
        super(...arguments);
        this.methods = {
            onTouchStarted: function (e) {
                if (e.currentTarget && e.currentTarget.dataset && e.currentTarget.dataset.viewid) {
                    const window = UIViewManager_1.UIViewManager.shared.fetchView(e.currentTarget.dataset.viewid);
                    if (window) {
                        window.handleTouchStart(e);
                    }
                }
            },
            onTouchMoved: function (e) {
                if (e.currentTarget && e.currentTarget.dataset && e.currentTarget.dataset.viewid) {
                    const window = UIViewManager_1.UIViewManager.shared.fetchView(e.currentTarget.dataset.viewid);
                    if (window) {
                        window.handleTouchMove(e);
                    }
                }
            },
            onTouchEnded: function (e) {
                if (e.currentTarget && e.currentTarget.dataset && e.currentTarget.dataset.viewid) {
                    const window = UIViewManager_1.UIViewManager.shared.fetchView(e.currentTarget.dataset.viewid);
                    if (window) {
                        window.handleTouchEnd(e);
                    }
                }
            },
            onTouchCancelled: function (e) {
                if (e.currentTarget && e.currentTarget.dataset && e.currentTarget.dataset.viewid) {
                    const window = UIViewManager_1.UIViewManager.shared.fetchView(e.currentTarget.dataset.viewid);
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
