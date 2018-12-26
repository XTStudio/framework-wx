"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UIView_1 = require("./UIView");
const UIColor_1 = require("./UIColor");
const EventEmitter_1 = require("../kimi/EventEmitter");
class UINavigationItem {
    constructor() {
        this.viewController = undefined;
        this.navigationBar = undefined;
        this.leftBarButtonItems = [];
        this.rightBarButtonItems = [];
    }
    setNeedsUpdate() { }
}
exports.UINavigationItem = UINavigationItem;
class UIBarButtonItem extends EventEmitter_1.EventEmitter {
}
exports.UIBarButtonItem = UIBarButtonItem;
class UINavigationBar extends UIView_1.UIView {
    constructor() {
        super();
        this.navigationController = undefined;
        this._barTintColor = undefined;
        this.barTintColor = UIColor_1.UIColor.white;
        this.tintColor = UIColor_1.UIColor.black;
    }
    get barTintColor() {
        return this._barTintColor;
    }
    set barTintColor(value) {
        this._barTintColor = value;
        if (this.navigationController) {
            this.navigationController.updateBrowserBar();
        }
    }
    tintColorDidChange() {
        super.tintColorDidChange();
        if (this.navigationController) {
            this.navigationController.updateBrowserBar();
        }
    }
}
exports.UINavigationBar = UINavigationBar;
