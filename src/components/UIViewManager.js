"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UUID_1 = require("../uikit/helpers/UUID");
class UIViewManager {
    constructor() {
        this.views = {};
    }
    static get shared() {
        if (getApp().UIViewManagerManagerShared === undefined) {
            getApp().UIViewManagerManagerShared = new UIViewManager;
        }
        return getApp().UIViewManagerManagerShared;
    }
    addView(view) {
        view.viewID = UUID_1.randomUUID();
        this.views[view.viewID] = view;
    }
    fetchView(viewID) {
        return this.views[viewID];
    }
    fetchViews() {
        return Object.keys(this.views).map(it => this.views[it]);
    }
}
exports.UIViewManager = UIViewManager;
