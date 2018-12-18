"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UIComponentManager_1 = require("./UIComponentManager");
const UIViewManager_1 = require("./UIViewManager");
// xt-framework/uiview.js
class UIViewComponent {
    constructor() {
        this.properties = {
            props: {
                type: Object,
                value: {},
                observer: function (newVal) {
                    if (newVal === undefined || newVal === null) {
                        return;
                    }
                    if (newVal.viewID) {
                        if (this.viewID !== newVal.viewID) {
                            UIComponentManager_1.UIComponentManager.shared.addComponent(this, newVal.viewID);
                            const newView = UIViewManager_1.UIViewManager.shared.fetchView(newVal.viewID);
                            if (newView) {
                                newView.markAllFlagsDirty();
                            }
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
