"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UIAlertActionStyle;
(function (UIAlertActionStyle) {
    UIAlertActionStyle[UIAlertActionStyle["normal"] = 0] = "normal";
    UIAlertActionStyle[UIAlertActionStyle["danger"] = 1] = "danger";
    UIAlertActionStyle[UIAlertActionStyle["cancel"] = 2] = "cancel";
})(UIAlertActionStyle || (UIAlertActionStyle = {}));
class UIAlertAction {
    constructor(title, style, callback) {
        this.title = title;
        this.style = style;
        this.callback = callback;
    }
}
class UIActionSheet {
    constructor() {
        this.message = "";
        this.actions = [];
    }
    addRegularAction(title, actionBlock) {
        this.actions.push(new UIAlertAction(title, UIAlertActionStyle.normal, actionBlock));
    }
    addDangerAction(title, actionBlock) {
        this.actions.push(new UIAlertAction(title, UIAlertActionStyle.danger, actionBlock));
    }
    addCancelAction(title, actionBlock) {
        this.actions.push(new UIAlertAction(title, UIAlertActionStyle.cancel, actionBlock));
    }
    show() {
        wx.showActionSheet({
            itemList: this.actions.filter(it => it.style !== UIAlertActionStyle.cancel).map(it => {
                return it.title;
            }),
            itemColor: this.actions.filter(it => it.style === UIAlertActionStyle.danger).length > 0 ? "#ff0000" : "#000000",
            success: (response) => {
                if (response && this.actions[response.tapIndex]) {
                    const callback = this.actions[response.tapIndex].callback;
                    if (callback) {
                        callback();
                    }
                }
            },
            fail: () => {
                this.actions.forEach(it => {
                    if (it.style === UIAlertActionStyle.cancel && it.callback) {
                        it.callback();
                    }
                });
            }
        });
    }
}
exports.UIActionSheet = UIActionSheet;
