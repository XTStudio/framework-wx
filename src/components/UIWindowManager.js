"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UIWindowManager {
    constructor() {
        this.windows = {};
    }
    static get shared() {
        if (getApp().UIWindowManagerShared === undefined) {
            getApp().UIWindowManagerShared = new UIWindowManager;
        }
        return getApp().UIWindowManagerShared;
    }
    addWindow(window) {
        window.windowID = Math.random().toString();
        this.windows[window.windowID] = window;
    }
    fetchWindow(windowID) {
        return this.windows[windowID];
    }
}
exports.UIWindowManager = UIWindowManager;
