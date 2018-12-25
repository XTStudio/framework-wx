"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UIView_1 = require("./UIView");
const UIColor_1 = require("./UIColor");
class UIFetchMoreControl extends UIView_1.UIView {
    constructor() {
        super();
        this.scrollView = undefined;
        this.enabled = true;
        this.fetching = false;
        this.tintColor = UIColor_1.UIColor.gray;
    }
    tintColorDidChange() {
        super.tintColorDidChange();
    }
    beginFetching() {
        this.fetching = true;
        setTimeout(() => {
            this.emit("fetch", this);
        }, 250);
    }
    endFetching() {
        if (this.scrollView) {
            const it = this.scrollView;
            if (it.contentOffset.y > it.contentSize.height + it.contentInset.bottom - it.bounds.height) {
                it.setContentOffset({ x: 0.0, y: it.contentSize.height + it.contentInset.bottom - it.bounds.height }, true);
            }
        }
        this.fetching = false;
    }
}
exports.UIFetchMoreControl = UIFetchMoreControl;
