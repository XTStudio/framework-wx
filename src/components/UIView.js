"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UIComponentManager_1 = require("./UIComponentManager");
const UIViewManager_1 = require("./UIViewManager");
// xt-framework/uiview.js
const nextTick = wx.nextTick || setTimeout;
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
                if (this.viewID) {
                    UIComponentManager_1.UIComponentManager.shared.deleteComponent(this.viewID);
                }
            }
        };
    }
}
exports.UIViewComponent = UIViewComponent;
Component(new UIViewComponent);
