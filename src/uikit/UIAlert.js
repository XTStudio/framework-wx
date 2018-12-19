"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UIAlert {
    constructor(message, buttonText = "OK") {
        this.message = message;
        this.buttonText = buttonText;
    }
    show(callback) {
        wx.showModal({
            title: "",
            content: this.message,
            showCancel: false,
            confirmText: this.buttonText,
            success(res) {
                if (callback) {
                    if (res.confirm) {
                        callback();
                    }
                    else if (res.cancel) {
                        callback();
                    }
                }
            }
        });
    }
}
exports.UIAlert = UIAlert;
