"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UIComponentManager_1 = require("./UIComponentManager");
const UIViewManager_1 = require("./UIViewManager");
// xt-framework/uiview.js
const nextTick = function (cb) {
    return wx.nextTick !== undefined ? wx.nextTick(cb) : setTimeout(cb, 0);
};
class UIViewComponent {
    constructor() {
        this.properties = {
            viewID: {
                type: String,
                value: undefined,
                observer: function (viewID, oldValue) {
                    if (viewID === undefined || viewID === null) {
                        return;
                    }
                    const self = this;
                    UIComponentManager_1.UIComponentManager.shared.addComponent(self, viewID);
                    const newView = UIViewManager_1.UIViewManager.shared.fetchView(viewID);
                    const viewData = newView.buildData();
                    if (viewData.subviews.length > 50) {
                        self.setData(Object.assign({}, viewData, { subviews: [] }));
                        for (let index = 0; index <= viewData.subviews.length; index += 50) {
                            nextTick(() => {
                                self.setData({
                                    subviews: viewData.subviews.slice(0, index)
                                });
                            });
                        }
                    }
                    else {
                        self.setData(newView.buildData());
                    }
                }
            }
        };
        this.lifetimes = {
            detached: function () {
                const self = this;
                if (self.properties && self.properties.viewID) {
                    UIComponentManager_1.UIComponentManager.shared.deleteComponent(self.properties.viewID);
                }
            }
        };
    }
}
exports.UIViewComponent = UIViewComponent;
Component(new UIViewComponent);
