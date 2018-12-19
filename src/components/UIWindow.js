"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UIComponentManager_1 = require("./UIComponentManager");
const UIViewManager_1 = require("./UIViewManager");
const UIView_1 = require("./UIView");
class UIWindowComponent extends UIView_1.UIViewComponent {
    constructor() {
        super(...arguments);
        this.methods = {
            onTouchStarted: function (e) {
                // var q = (wx.createSelectorQuery() as any).in(this)
                // q.select('#_text_measurer').boundingClientRect(function(e: any){ console.log(e) })
                // q.exec()
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
        this.pageLifetimes = {
            show: function () {
                UIComponentManager_1.UIComponentManager.keyWindowComponent = this;
            }
        };
    }
}
exports.UIWindowComponent = UIWindowComponent;
Component(new UIWindowComponent());
