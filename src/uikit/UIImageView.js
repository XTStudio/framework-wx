"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UIView_1 = require("./UIView");
const UIEnums_1 = require("./UIEnums");
class UIImageView extends UIView_1.UIView {
    constructor() {
        super(...arguments);
        this.clazz = "UIImageView";
        this._image = undefined;
        this.isImageDirty = false;
    }
    get image() {
        return this._image;
    }
    set image(value) {
        if (this._image === value) {
            return;
        }
        this._image = value;
        this.isImageDirty = true;
        this.invalidate();
    }
    buildExtras() {
        let data = super.buildExtras();
        if (this.isImageDirty) {
            data.imageSource = this._image !== undefined ? this._image.imageSource : null;
        }
        if (this.isStyleDirty) {
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
        }
        return data;
    }
    markAllFlagsDirty() {
        super.markAllFlagsDirty();
        this.isImageDirty = true;
    }
    clearDirtyFlags() {
        super.clearDirtyFlags();
        this.isImageDirty = false;
    }
}
exports.UIImageView = UIImageView;
