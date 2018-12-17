"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UUID_1 = require("../foundation/UUID");
class UIDevice {
    constructor() {
        this.name = "Browser";
        this.model = "Browser";
        this.systemName = "WeChat";
        this.systemVersion = "1.0.0";
        const systemInfo = wx.getSystemInfoSync();
        this.name = systemInfo.brand;
        this.model = systemInfo.model;
        this.systemName = "WeChat";
        this.systemVersion = systemInfo.SDKVersion;
        const idfv = wx.getStorageSync("com.xt.identifierForVendor");
        if (typeof idfv === "string" && idfv.length > 0) {
            this.identifierForVendor = new UUID_1.UUID(idfv);
        }
        else {
            this.identifierForVendor = new UUID_1.UUID();
            wx.setStorageSync("com.xt.identifierForVendor", this.identifierForVendor.UUIDString);
        }
    }
}
UIDevice.current = new UIDevice;
exports.UIDevice = UIDevice;
