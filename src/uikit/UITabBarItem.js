"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UIEdgeInsets_1 = require("./UIEdgeInsets");
const MagicObject_1 = require("./helpers/MagicObject");
class UITabBarItem {
    constructor() {
        this._title = undefined;
        this._image = undefined;
        this._selectedImage = undefined;
        this._imageInsets = UIEdgeInsets_1.UIEdgeInsetsZero;
        // Implementation
        this._barButton = new MagicObject_1.MagicObject;
    }
    get title() {
        return this._title;
    }
    set title(value) {
        this._title = value;
        if (this.barButton) {
            this.barButton.setNeedUpdate();
        }
    }
    get image() {
        return this._image;
    }
    set image(value) {
        this._image = value;
        if (this.barButton) {
            this.barButton.setNeedUpdate();
        }
    }
    get selectedImage() {
        return this._selectedImage;
    }
    set selectedImage(value) {
        this._selectedImage = value;
        if (this.barButton) {
            this.barButton.setNeedUpdate();
        }
    }
    get imageInsets() {
        return this._imageInsets;
    }
    set imageInsets(value) {
        this._imageInsets = value;
        if (this.barButton) {
            this.barButton.setNeedUpdate();
        }
    }
    get barButton() {
        return this._barButton.get();
    }
    set barButton(value) {
        this._barButton.set(value);
    }
}
exports.UITabBarItem = UITabBarItem;
