"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UIView_1 = require("./UIView");
const UIColor_1 = require("./UIColor");
class UIRefreshAnimationView extends UIView_1.UIView {
    constructor() {
        super();
        this.leftDot = new UIView_1.UIView;
        this.midDot = new UIView_1.UIView;
        this.rightDot = new UIView_1.UIView;
        this.currentIdx = 0;
        this.leftDot.alpha = 0.5;
        this.leftDot.layer.cornerRadius = 4.0;
        this.midDot.alpha = 0.5;
        this.midDot.layer.cornerRadius = 4.0;
        this.rightDot.alpha = 0.5;
        this.rightDot.layer.cornerRadius = 4.0;
        this.addSubview(this.leftDot);
        this.addSubview(this.midDot);
        this.addSubview(this.rightDot);
    }
    layoutSubviews() {
        super.layoutSubviews();
        this.leftDot.frame = { x: this.bounds.width / 2.0 - 4.0 - 20, y: this.bounds.height / 2.0 - 4.0, width: 8.0, height: 8.0 };
        this.midDot.frame = { x: this.bounds.width / 2.0 - 4.0, y: this.bounds.height / 2.0 - 4.0, width: 8.0, height: 8.0 };
        this.rightDot.frame = { x: this.bounds.width / 2.0 + 4.0 + 12, y: this.bounds.height / 2.0 - 4.0, width: 8.0, height: 8.0 };
    }
    startAnimation() {
        this.stopAnimation();
        this.currentIdx = 0;
        this.doAnimation();
        this.intervalHandler = setInterval(() => {
            this.currentIdx = this.currentIdx + 1;
            if (this.currentIdx == 3) {
                this.currentIdx = 0;
            }
            this.doAnimation();
        }, 1250 / 3);
    }
    doAnimation() {
        this.leftDot.alpha = this.currentIdx == 0 ? 1.0 : 0.5;
        this.midDot.alpha = this.currentIdx == 1 ? 1.0 : 0.5;
        this.rightDot.alpha = this.currentIdx == 2 ? 1.0 : 0.5;
    }
    stopAnimation() {
        this.leftDot.alpha = 0.5;
        this.midDot.alpha = 0.5;
        this.rightDot.alpha = 0.5;
        clearInterval(this.intervalHandler);
    }
    tintColorDidChange() {
        super.tintColorDidChange();
        this.leftDot.backgroundColor = this.tintColor;
        this.midDot.backgroundColor = this.tintColor;
        this.rightDot.backgroundColor = this.tintColor;
    }
}
class UIRefreshControl extends UIView_1.UIView {
    constructor() {
        super();
        this.animationView = new UIRefreshAnimationView();
        this.scrollView = undefined;
        this.enabled = true;
        this.refreshing = false;
        this.animationView.alpha = 0.0;
        this.tintColor = UIColor_1.UIColor.gray;
    }
    tintColorDidChange() {
        super.tintColorDidChange();
        this.animationView.tintColor = this.tintColor;
    }
    beginRefreshing_callFromScrollView() {
        if (this.scrollView === undefined) {
            return;
        }
        this.refreshing = true;
        this.scrollView.touchingRefreshOffsetY = 0.0;
        this.scrollView.markFlagDirty("refreshOffset", "refreshing", "refreshingAnimation");
        this.animationView.startAnimation();
        this.emit("refresh", this);
    }
    beginRefreshing() {
        if (this.scrollView === undefined) {
            return;
        }
        this.refreshing = true;
        this.scrollView.touchingRefreshOffsetY = 0.0;
        this.scrollView.markFlagDirty("refreshOffset", "refreshing", "refreshingAnimation");
        this.animationView.startAnimation();
        setTimeout(() => {
            this.animationView.alpha = 1.0;
            this.emit("refresh", this);
        }, 750);
    }
    endRefreshing() {
        if (this.scrollView === undefined) {
            return;
        }
        this.animationView.alpha = 0.0;
        this.animationView.stopAnimation();
        this.refreshing = false;
        this.scrollView.touchingRefreshOffsetY = 0.0;
        this.scrollView.markFlagDirty("refreshOffset", "refreshing", "refreshingAnimation");
    }
}
exports.UIRefreshControl = UIRefreshControl;
