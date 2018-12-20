"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UIComponentManager_1 = require("./UIComponentManager");
const UIViewManager_1 = require("./UIViewManager");
// xt-framework/uiview.js
class UIViewComponent {
    constructor() {
        this.properties = {
            // props: {
            //     type: Object,
            //     value: {},
            //     observer: function (newVal: any) {
            //         if (newVal === undefined || newVal === null) { return }
            //         if (newVal.viewID) {
            //             if ((this as any).viewID !== newVal.viewID) {
            //                 UIComponentManager.shared.addComponent(this, newVal.viewID)
            //                 const newView = UIViewManager.shared.fetchView(newVal.viewID)
            //                 if (newView) {
            //                     newView.markAllFlagsDirty()
            //                 }
            //             }
            //         }
            //     }
            // },
            viewid: {
                type: String,
                value: undefined,
                observer: function (viewID) {
                    if (viewID === undefined || viewID === null) {
                        return;
                    }
                    if (this.viewID !== viewID) {
                        UIComponentManager_1.UIComponentManager.shared.addComponent(this, viewID);
                        const newView = UIViewManager_1.UIViewManager.shared.fetchView(viewID);
                        if (newView) {
                            newView.markAllFlagsDirty();
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
