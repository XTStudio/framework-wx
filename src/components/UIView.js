"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UIComponentManager_1 = require("./UIComponentManager");
const UIViewManager_1 = require("./UIViewManager");
// xt-framework/uiview.js
const isDevtools = wx.getSystemInfoSync().platform === "devtools";
class UIViewComponent {
    constructor() {
        this.properties = {
            viewID: {
                type: String,
                value: undefined,
                observer: function (viewID) {
                    if (viewID === undefined || viewID === null) {
                        return;
                    }
                    if (this.viewID !== viewID) {
                        UIComponentManager_1.UIComponentManager.shared.addComponent(this, viewID);
                        const newView = UIViewManager_1.UIViewManager.shared.fetchView(viewID);
                        if (isDevtools) {
                            // prevent vdSync over 1M size.
                            wx.nextTick(() => {
                                this.setData(newView.buildData());
                            });
                        }
                        else {
                            this.setData(newView.buildData());
                        }
                    }
                }
            }
        };
        this.lifetimes = {
            detached: function () {
                if (this.viewID) {
                    UIComponentManager_1.UIComponentManager.shared.deleteComponent(this.viewID);
                }
            }
        };
    }
}
exports.UIViewComponent = UIViewComponent;
Component(new UIViewComponent);
