"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserDefaults {
    constructor(suiteName = undefined) {
        this.suiteName = suiteName;
    }
    valueForKey(forKey) {
        const value = wx.getStorageSync(this.buildKey(forKey));
        if (value !== undefined && typeof value === "string") {
            try {
                return JSON.parse(value).value;
            }
            catch (error) { }
        }
        return undefined;
    }
    setValue(value, forKey) {
        if (value === undefined) {
            wx.removeStorageSync(this.buildKey(forKey));
        }
        else {
            wx.setStorageSync(this.buildKey(forKey), JSON.stringify({ value: value }));
        }
    }
    reset() {
        const storageInfo = wx.getStorageInfoSync();
        storageInfo.keys.forEach(key => {
            if (typeof key === "string" && key.indexOf(`com.xt.${(this.suiteName || "standard")}.`) === 0) {
                wx.removeStorageSync(key);
            }
        });
    }
    buildKey(aKey) {
        return `com.xt.${(this.suiteName || "standard")}.${aKey}`;
    }
}
UserDefaults.standard = new UserDefaults;
exports.UserDefaults = UserDefaults;
