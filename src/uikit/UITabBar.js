"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UIView_1 = require("./UIView");
const UIColor_1 = require("./UIColor");
class UITabBar extends UIView_1.UIView {
    constructor() {
        super();
        this.barHeight = 50.0;
        this.backgroundColor = UIColor_1.UIColor.yellow;
    }
}
exports.UITabBar = UITabBar;
