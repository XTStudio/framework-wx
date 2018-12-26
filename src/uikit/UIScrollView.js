"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UIView_1 = require("./UIView");
const UIPoint_1 = require("./UIPoint");
const UISize_1 = require("./UISize");
const UIEdgeInsets_1 = require("./UIEdgeInsets");
const UIPanGestureRecognizer_1 = require("./UIPanGestureRecognizer");
const UIRefreshControl_1 = require("./UIRefreshControl");
const UIFetchMoreControl_1 = require("./UIFetchMoreControl");
const isIOS = wx.getSystemInfoSync().platform === "ios";
class UIScrollView extends UIView_1.UIView {
    constructor() {
        super();
        this.clazz = "UIScrollView";
        this._panGesture = new UIPanGestureRecognizer_1.UIPanGestureRecognizer;
        this._contentOffset = UIPoint_1.UIPointZero;
        this._contentSize = UISize_1.UISizeZero;
        this._contentInset = UIEdgeInsets_1.UIEdgeInsetsZero;
        this.adjustInset = UIEdgeInsets_1.UIEdgeInsetsZero;
        this.directionalLockEnabled = false;
        this._bounces = true;
        this._alwaysBounceVertical = false;
        this._alwaysBounceHorizontal = false;
        this._pagingEnabled = false;
        this._scrollEnabled = true;
        this.showsHorizontalScrollIndicator = true; // todo
        this.showsVerticalScrollIndicator = true; // todo
        this.tracking = false;
        this.dragging = false;
        this.decelerating = false;
        this._scrollsToTop = true;
        this._endDraggingVelocity = UIPoint_1.UIPointZero;
        // RefreshControl
        this._refreshControl = undefined;
        this.touchingRefreshControl = false;
        this.touchingRefreshControlBeganWindowY = 0.0;
        this.touchingRefreshOffsetY = 0.0;
        // FetchMoreControl
        this._fetchMoreControl = undefined;
        // Build Data
        this.isContentOffsetScrollAnimated = false;
        this._panGesture.enabled = false;
    }
    get contentOffset() {
        return this._contentOffset;
    }
    set contentOffset(value) {
        this._contentOffset = value;
        this.markFlagDirty("contentOffsetX", "contentOffsetY", "scrollWithAnimation");
        this.isContentOffsetScrollAnimated = false;
    }
    contentOffsetDidChanged() { }
    get contentSize() {
        return this._contentSize;
    }
    set contentSize(value) {
        this._contentSize = value;
        this.markFlagDirty("contentSize");
    }
    get contentInset() {
        return this._contentInset;
    }
    set contentInset(value) {
        const deltaX = value.left - this._contentInset.left;
        const deltaY = value.top - this._contentInset.top;
        this._contentInset = value;
        this.contentOffset = { x: this.contentOffset.x - deltaX, y: this.contentOffset.y - deltaY };
        this.markFlagDirty("contentInset", "contentSize", "refreshingAnimation");
    }
    get bounces() {
        return this._bounces;
    }
    set bounces(value) {
        this._bounces = value;
    }
    get alwaysBounceVertical() {
        return this._alwaysBounceVertical;
    }
    set alwaysBounceVertical(value) {
        this._alwaysBounceVertical = value;
    }
    get alwaysBounceHorizontal() {
        return this._alwaysBounceHorizontal;
    }
    set alwaysBounceHorizontal(value) {
        this._alwaysBounceHorizontal = value;
    }
    get pagingEnabled() {
        return this._pagingEnabled;
    }
    set pagingEnabled(value) {
        this._pagingEnabled = value;
    }
    get scrollEnabled() {
        return this._scrollEnabled;
    }
    set scrollEnabled(value) {
        this._scrollEnabled = value;
        this.invalidate();
    }
    setContentOffset(contentOffset, animated = false) {
        this.contentOffset = contentOffset;
        this.isContentOffsetScrollAnimated = animated;
    }
    scrollRectToVisible(rect, animated) {
        var targetContentOffset = this.contentOffset;
        if (rect.x < this.contentOffset.x) {
            targetContentOffset = { x: rect.x, y: targetContentOffset.y };
        }
        else if (rect.x + rect.width > this.contentOffset.x + this.bounds.width) {
            targetContentOffset = { x: rect.x + rect.width - this.bounds.width, y: targetContentOffset.y };
        }
        if (rect.y < this.contentOffset.y) {
            targetContentOffset = { x: targetContentOffset.x, y: rect.y };
        }
        else if (rect.y + rect.height > this.contentOffset.y + this.bounds.height) {
            targetContentOffset = { x: targetContentOffset.x, y: rect.y + rect.height - this.bounds.height };
        }
        targetContentOffset = {
            x: Math.max(0.0, Math.min(this.contentSize.width - this.bounds.width, targetContentOffset.x)),
            y: Math.max(0.0, Math.min(this.contentSize.height - this.bounds.height, targetContentOffset.y))
        };
        this.setContentOffset(targetContentOffset, animated);
    }
    get scrollsToTop() {
        return this._scrollsToTop;
    }
    set scrollsToTop(value) {
        this._scrollsToTop = value;
        this.markFlagDirty("scrollsToTop");
    }
    // Delegates
    didScroll() {
        this.emit("didScroll", this);
        this.contentOffsetDidChanged();
    }
    willBeginDragging() {
        UIView_1.UIView.recognizedGesture = this._panGesture;
        this.emit("willBeginDragging", this);
        this.tracking = true;
        this.dragging = true;
    }
    willEndDragging(velocity) {
        this._endDraggingVelocity = velocity;
        this.emit("willEndDragging", this, velocity);
    }
    didEndDragging(decelerate) {
        this.tracking = false;
        this.dragging = false;
        this.emit("didEndDragging", this, decelerate);
        if (this.pagingEnabled) {
            if (this.contentSize.width < this.bounds.width) {
                if (this.contentOffset.y <= 0 || this.contentOffset.y >= this.contentSize.height - this.bounds.height) {
                    return;
                }
                const currentPageY = Math.floor(this.contentOffset.y / this.bounds.height) * this.bounds.height;
                const nextPageY = Math.ceil(this.contentOffset.y / this.bounds.height) * this.bounds.height;
                if (this._endDraggingVelocity.y > 200) {
                    this.setContentOffset({ x: 0, y: currentPageY }, true);
                }
                else if (this._endDraggingVelocity.y < -200 || nextPageY - this.contentOffset.y < this.contentOffset.y - currentPageY) {
                    this.setContentOffset({ x: 0, y: nextPageY }, true);
                }
                else {
                    this.setContentOffset({ x: 0, y: currentPageY }, true);
                }
            }
            else if (this.contentSize.height < this.bounds.height) {
                if (this.contentOffset.x <= 0 || this.contentOffset.x >= this.contentSize.width - this.bounds.width) {
                    return;
                }
                const currentPageX = Math.floor(this.contentOffset.x / this.bounds.width) * this.bounds.width;
                const nextPageX = Math.ceil(this.contentOffset.x / this.bounds.width) * this.bounds.width;
                if (this._endDraggingVelocity.x > 200) {
                    this.setContentOffset({ x: currentPageX, y: 0 }, true);
                }
                else if (this._endDraggingVelocity.x < -200 || nextPageX - this.contentOffset.x < this.contentOffset.x - currentPageX) {
                    this.setContentOffset({ x: nextPageX, y: 0 }, true);
                }
                else {
                    this.setContentOffset({ x: currentPageX, y: 0 }, true);
                }
            }
        }
    }
    willBeginDecelerating() {
        this.emit("willBeginDecelerating", this);
        this.decelerating = true;
    }
    didEndDecelerating() {
        this.decelerating = false;
        this.emit("didEndDecelerating", this);
    }
    didEndScrollingAnimation() {
        this.emit("didEndScrollingAnimation", this);
    }
    didScrollToTop() {
        this.emit("didScrollToTop", this);
    }
    layoutSubviews() {
        super.layoutSubviews();
        if (this.refreshControl) {
            this.refreshControl.animationView.frame = { x: 0.0, y: 0.0, width: this.bounds.width, height: 44.0 };
        }
        this.markFlagDirty("direction");
    }
    addSubview(view) {
        if (view instanceof UIRefreshControl_1.UIRefreshControl) {
            this.refreshControl = view;
            return;
        }
        if (view instanceof UIFetchMoreControl_1.UIFetchMoreControl) {
            this.fetchMoreControl = view;
            return;
        }
        super.addSubview(view);
    }
    get refreshControl() {
        return this._refreshControl;
    }
    set refreshControl(value) {
        this._refreshControl = value;
        if (value) {
            this.markFlagDirty("refreshControlAnimationView");
            value.animationView.frame = { x: 0, y: 0, width: this.bounds.width, height: 44.0 };
            value.scrollView = this;
        }
    }
    createRefreshEffect(translation) {
        if (this.refreshControl && this.refreshControl.enabled && this.contentSize.width <= this.bounds.width) {
            if (isIOS) {
                if (this.contentOffset.y < -this.contentInset.top) {
                    const progress = Math.max(0.0, Math.min(1.0, (-this.contentInset.top - (this.contentOffset.y)) / (88.0)));
                    this.refreshControl.animationView.alpha = progress;
                }
                else {
                    this.refreshControl.animationView.alpha = 0.0;
                }
            }
            else {
                if (this.contentOffset.y - translation.y < -this.contentInset.top) {
                    const progress = Math.max(0.0, Math.min(1.0, (-this.contentInset.top - (this.contentOffset.y - translation.y)) / (88.0 * 2)));
                    this.refreshControl.animationView.alpha = progress;
                    this.touchingRefreshOffsetY = translation.y / 3.0;
                    this.markFlagDirty("refreshOffset", "refreshingAnimation");
                }
            }
        }
        return undefined;
    }
    touchesBegan(touches) {
        super.touchesBegan(touches);
        this.touchingRefreshControl = this.contentOffset.y <= -this.contentInset.top + 8.0;
        if (this.touchingRefreshControl && touches[0] && touches[0].windowPoint) {
            this.touchingRefreshControlBeganWindowY = touches[0].windowPoint.y;
        }
    }
    touchesMoved(touches) {
        super.touchesMoved(touches);
        if (this.refreshControl && this.refreshControl.enabled && this.touchingRefreshControl && touches[0] && touches[0].windowPoint && this.contentOffset.y <= 0.0) {
            const translateY = touches[0].windowPoint.y - this.touchingRefreshControlBeganWindowY;
            this.createRefreshEffect({ x: 0, y: translateY });
        }
    }
    touchesEnded(touches) {
        super.touchesEnded(touches);
        if (this.refreshControl !== undefined && this.refreshControl.animationView.alpha >= 1.0) {
            this.refreshControl.beginRefreshing_callFromScrollView();
        }
        else if (this.refreshControl !== undefined && this.refreshControl.animationView.alpha > 0.0) {
            this.refreshControl.animationView.alpha = 0.0;
        }
        this.touchingRefreshOffsetY = 0.0;
        this.markFlagDirty("refreshOffset");
    }
    touchesCancelled(touches) {
        super.touchesCancelled(touches);
    }
    get fetchMoreControl() {
        return this._fetchMoreControl;
    }
    set fetchMoreControl(value) {
        this._fetchMoreControl = value;
        if (value) {
            value.scrollView = this;
        }
    }
    createFetchMoreEffect() {
        if (this.fetchMoreControl && this.fetchMoreControl.enabled && this.contentSize.width <= this.bounds.width) {
            if (this.fetchMoreControl.fetching) {
                return true;
            }
            else {
                this.fetchMoreControl.beginFetching();
                return true;
            }
        }
        return false;
    }
    buildData() {
        let data = super.buildData();
        const totalContentSize = {
            width: this._contentSize.width + this._contentInset.left + this._contentInset.right,
            height: this._contentSize.height + this._contentInset.top + this._contentInset.bottom
        };
        if (this.dirtyFlags["contentOffsetX"] || this.dirtyFlags["contentOffsetY"]) {
            data.contentOffsetX = this._contentOffset.x + this._contentInset.left;
            data.contentOffsetY = this._contentOffset.y + this._contentInset.top;
            data.scrollWithAnimation = this.isContentOffsetScrollAnimated;
        }
        data.inertia = this._pagingEnabled === true ? false : true;
        data.scrollsToTop = this.scrollsToTop;
        data.direction = (() => {
            if (totalContentSize.width > this.bounds.width && totalContentSize.height > this.bounds.height) {
                return "all";
            }
            else if (totalContentSize.width > this.bounds.width) {
                return "horizontal";
            }
            else if (totalContentSize.height > this.bounds.height) {
                return "vertical";
            }
            else {
                return "none";
            }
        })();
        data.contentSize = totalContentSize;
        data.contentInset = this.contentInset;
        if (!this._scrollEnabled) {
            data.direction = "none";
        }
        if (this.refreshControl) {
            data.refreshControlAnimationView = {
                clazz: "UIView",
                viewID: this.refreshControl.animationView.viewID
            };
            data.refreshing = this.refreshControl.refreshing ? 44 : 0;
            if (isIOS) {
                data.refreshingAnimation = wx.createAnimation({ timingFunction: "linear", duration: this.dirtyFlags["refreshing"] ? 300 : 0 }).matrix(1.0, 0.0, 0.0, 1.0, 0.0, this.contentInset.top + (this.refreshControl.refreshing ? 44 : 0)).step().export();
                this.adjustInset = { top: this.refreshControl.refreshing ? 44 : 0, left: 0, bottom: 0, right: 0 };
            }
            else {
                data.refreshOffset = this.refreshControl.refreshing ? 44 : this.touchingRefreshOffsetY;
                this.adjustInset = { top: this.refreshControl.refreshing ? 44 : 0, left: 0, bottom: 0, right: 0 };
            }
        }
        return data;
    }
}
exports.UIScrollView = UIScrollView;
