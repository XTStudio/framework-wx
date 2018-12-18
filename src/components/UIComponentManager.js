"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UIComponentManager {
    constructor() {
        this.components = {};
    }
    static get shared() {
        if (getApp().UIComponentManagerShared === undefined) {
            getApp().UIComponentManagerShared = new UIComponentManager;
        }
        return getApp().UIComponentManagerShared;
    }
    addComponent(component, viewID) {
        this.components[viewID] = component;
    }
    fetchComponent(viewID) {
        return this.components[viewID];
    }
    deleteComponent(viewID) {
        delete this.components[viewID];
    }
}
exports.UIComponentManager = UIComponentManager;
