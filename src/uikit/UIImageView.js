"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UIView_1 = require("./UIView");
const UIEnums_1 = require("./UIEnums");
class UIImageView extends UIView_1.UIView {
    constructor() {
        super(...arguments);
        this.clazz = "UIImageView";
        this._image = undefined;
        this._contentMode = UIEnums_1.UIViewContentMode.scaleToFill;
    }
    get image() {
        return this._image;
    }
    set image(value) {
        if (this._image === value) {
            return;
        }
        this._image = value;
        this.markFlagDirty("imageSource");
    }
    get contentMode() {
        return this._contentMode;
    }
    set contentMode(value) {
        if (this._contentMode === value) {
            return;
        }
        this._contentMode = value;
        this.markFlagDirty("scaleMode");
    }
    buildData() {
        let data = super.buildData();
        data.imageSource = this._image !== undefined ? this._image.imageSource : null;
        data.scaleMode = (() => {
            switch (this._contentMode) {
                case UIEnums_1.UIViewContentMode.scaleToFill:
                    return "scaleToFill";
                case UIEnums_1.UIViewContentMode.scaleAspectFit:
                    return "aspectFit";
                case UIEnums_1.UIViewContentMode.scaleAspectFill:
                    return "aspectFill";
            }
            return "scaleToFill";
        })();
        return data;
    }
}
exports.UIImageView = UIImageView;
