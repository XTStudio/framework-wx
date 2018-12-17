"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UIView_1 = require("./UIView");
class UIImageView extends UIView_1.UIView {
    constructor() {
        super(...arguments);
        this.clazz = "UIImageView";
        this._image = undefined;
    }
    get image() {
        return this._image;
    }
    set image(value) {
        this._image = value;
        this.invalidate();
    }
}
exports.UIImageView = UIImageView;
