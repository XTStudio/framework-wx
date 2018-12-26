"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UIViewController_1 = require("./UIViewController");
class UINavigationBarViewController extends UIViewController_1.UIViewController {
    constructor() {
        super();
        this.clazz = "UINavigationBarViewController";
        console.warn("暂时不支持 UINavigationBarViewController 在小程序中使用。");
    }
}
exports.UINavigationBarViewController = UINavigationBarViewController;
