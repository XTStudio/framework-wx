"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UIEdgeInsets_1 = require("./UIEdgeInsets");
class UITabBarItem {
    constructor() {
        this._title = undefined;
        // private _image: UIImage | undefined = undefined
        // public get image(): UIImage | undefined {
        //     return this._image;
        // }
        // public set image(value: UIImage | undefined) {
        //     this._image = value;
        //     if (this.barButton) {
        //         this.barButton.setNeedUpdate()
        //     }
        // }
        // private _selectedImage: UIImage | undefined = undefined
        // public get selectedImage(): UIImage | undefined {
        //     return this._selectedImage;
        // }
        // public set selectedImage(value: UIImage | undefined) {
        //     this._selectedImage = value;
        //     if (this.barButton) {
        //         this.barButton.setNeedUpdate()
        //     }
        // }
        this._imageInsets = UIEdgeInsets_1.UIEdgeInsetsZero;
        // Implementation
        this.barButton = undefined;
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
    get imageInsets() {
        return this._imageInsets;
    }
    set imageInsets(value) {
        this._imageInsets = value;
        if (this.barButton) {
            this.barButton.setNeedUpdate();
        }
    }
}
exports.UITabBarItem = UITabBarItem;
