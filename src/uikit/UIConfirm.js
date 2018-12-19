"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UIConfirm {
    constructor(message) {
        this.message = message;
        this.confirmTitle = "Yes";
        this.cancelTitle = "No";
    }
    show(completed, cancelled) {
        wx.showModal({
            title: "",
            content: this.message,
            cancelText: this.cancelTitle,
            confirmText: this.confirmTitle,
            success(res) {
                if (res.confirm) {
                    if (completed) {
                        completed();
                    }
                }
                else if (res.cancel) {
                    if (cancelled) {
                        cancelled();
                    }
                }
            }
        });
    }
}
exports.UIConfirm = UIConfirm;
