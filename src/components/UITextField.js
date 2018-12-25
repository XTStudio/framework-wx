"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UIView_1 = require("./UIView");
const UIViewManager_1 = require("./UIViewManager");
class UITextFieldComponent extends UIView_1.UIViewComponent {
    constructor() {
        super(...arguments);
        this.methods = {
            onChange: function (e) {
                const self = this;
                const view = UIViewManager_1.UIViewManager.shared.fetchView(self.data.viewID);
                if (view) {
                    const oldText = view._text;
                    const newText = e.detail.value.substr(0, e.detail.cursor);
                    if (e.detail.cursor == newText.length && view.val("shouldChange", this, { location: 0, length: 0 }, (() => {
                        if (newText.length > oldText.length) {
                            return newText.substr(oldText.length, newText.length);
                        }
                        return "";
                    })()) === false) {
                        return view._text;
                    }
                    view._text = e.detail.value;
                    view.textDidChanged();
                }
            },
            onFocus: function () {
                const self = this;
                const view = UIViewManager_1.UIViewManager.shared.fetchView(self.data.viewID);
                if (view) {
                    view.editing = true;
                }
            },
            onBlur: function () {
                const self = this;
                const view = UIViewManager_1.UIViewManager.shared.fetchView(self.data.viewID);
                if (view) {
                    view.editing = false;
                }
            },
            onReturn: function () {
                const self = this;
                const view = UIViewManager_1.UIViewManager.shared.fetchView(self.data.viewID);
                if (view) {
                    view.onReturn();
                }
            }
        };
    }
}
exports.UITextFieldComponent = UITextFieldComponent;
Component(new UITextFieldComponent);
