"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UIView_1 = require("./UIView");
const UIViewManager_1 = require("./UIViewManager");
class UIWebViewComponent extends UIView_1.UIViewComponent {
    constructor() {
        super(...arguments);
        this.methods = {
            onLoad: function () {
                const self = this;
                if (self.data && self.data.viewID) {
                    const view = UIViewManager_1.UIViewManager.shared.fetchView(self.data.viewID);
                    if (view) {
                        view.emit("didFinish");
                    }
                }
            },
            onError: function () {
                const self = this;
                if (self.data && self.data.viewID) {
                    const view = UIViewManager_1.UIViewManager.shared.fetchView(self.data.viewID);
                    if (view) {
                        view.emit("didFail", Error("WebView error."));
                    }
                }
            },
            onMessage: function (e) {
                const self = this;
                if (self.data && self.data.viewID) {
                    const view = UIViewManager_1.UIViewManager.shared.fetchView(self.data.viewID);
                    if (view) {
                        view.emit("message", e.detail.data);
                    }
                }
            }
        };
    }
}
exports.UIWebViewComponent = UIWebViewComponent;
Component(new UIWebViewComponent);
