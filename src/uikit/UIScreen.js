"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UIScreen {
    constructor() {
        this.bounds = { x: 0, y: 0, width: parseInt(wx.getSystemInfoSync().screenWidth), height: parseInt(wx.getSystemInfoSync().screenHeight) };
        this.scale = parseInt(wx.getSystemInfoSync().pixelRatio);
    }
}
UIScreen.main = new UIScreen;
exports.UIScreen = UIScreen;
