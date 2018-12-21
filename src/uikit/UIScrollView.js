"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UIView_1 = require("./UIView");
const UIPoint_1 = require("./UIPoint");
const UISize_1 = require("./UISize");
const UIEdgeInsets_1 = require("./UIEdgeInsets");
const UIPanGestureRecognizer_1 = require("./UIPanGestureRecognizer");
class UIScrollView extends UIView_1.UIView {
    constructor() {
        super();
        this.clazz = "UIScrollView";
        this._panGesture = new UIPanGestureRecognizer_1.UIPanGestureRecognizer;
        this._contentOffset = UIPoint_1.UIPointZero;
        this._contentSize = UISize_1.UISizeZero;
        this._contentInset = UIEdgeInsets_1.UIEdgeInsetsZero;
        this.directionalLockEnabled = false;
        this._bounces = true;
        this._alwaysBounceVertical = false;
        this._alwaysBounceHorizontal = false;
        this._pagingEnabled = false;
        // private _scrollDisabledTemporary: boolean = false
        // public get scrollDisabledTemporary(): boolean {
        //     return this._scrollDisabledTemporary;
        // }
        // public set scrollDisabledTemporary(value: boolean) {
        //     this._scrollDisabledTemporary = value;
        //     this.invalidate(true, true)
        // }
        this._scrollEnabled = true;
        this.showsHorizontalScrollIndicator = true; // todo
        this.showsVerticalScrollIndicator = true; // todo
        this.tracking = false;
        this.dragging = false;
        this.decelerating = false;
        this._scrollsToTop = true;
        this._endDraggingVelocity = UIPoint_1.UIPointZero;
        // Build Data
        this.isContentBoundsDirty = false;
        this.isContentOffsetDirty = false;
        this.isContentOffsetScrollAnimatedDirty = false;
        this.isContentOffsetScrollAnimated = false;
        this._panGesture.enabled = false;
    }
    get contentOffset() {
        return this._contentOffset;
    }
    set contentOffset(value) {
        this._contentOffset = value;
        this.isContentOffsetDirty = true;
        this.isContentOffsetScrollAnimatedDirty = true;
        this.isContentOffsetScrollAnimated = false;
        this.contentOffsetDidChanged();
        this.invalidate();
    }
    contentOffsetDidChanged() { }
    get contentSize() {
        return this._contentSize;
    }
    set contentSize(value) {
        this._contentSize = value;
        this.isContentBoundsDirty = true;
        this.invalidate();
    }
    get contentInset() {
        return this._contentInset;
    }
    set contentInset(value) {
        const deltaX = value.left - this._contentInset.left;
        const deltaY = value.top - this._contentInset.top;
        this._contentInset = value;
        this.contentOffset = { x: this.contentOffset.x - deltaX, y: this.contentOffset.y - deltaY };
        this.isContentBoundsDirty = true;
        this.invalidate();
    }
    get bounces() {
        return this._bounces;
    }
    set bounces(value) {
        this._bounces = value;
        this.invalidate();
    }
    get alwaysBounceVertical() {
        return this._alwaysBounceVertical;
    }
    set alwaysBounceVertical(value) {
        this._alwaysBounceVertical = value;
        this.invalidate();
    }
    get alwaysBounceHorizontal() {
        return this._alwaysBounceHorizontal;
    }
    set alwaysBounceHorizontal(value) {
        this._alwaysBounceHorizontal = value;
        this.invalidate();
    }
    get pagingEnabled() {
        return this._pagingEnabled;
    }
    set pagingEnabled(value) {
        this._pagingEnabled = value;
        this.invalidate();
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
        this.invalidate();
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
                this.invalidate();
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
                this.invalidate();
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
        this.isContentBoundsDirty = true;
        this.invalidate();
    }
    buildExtras() {
        let data = super.buildExtras();
        const totalContentSize = {
            width: this._contentSize.width + this._contentInset.left + this._contentInset.right,
            height: this._contentSize.height + this._contentInset.top + this._contentInset.bottom
        };
        if (this.isContentOffsetDirty) {
            if (this.isContentOffsetScrollAnimatedDirty) {
                data.scrollWithAnimation = this.isContentOffsetScrollAnimated;
                const isContentBoundsDirty = this.isContentBoundsDirty;
                setTimeout(() => {
                    this.isContentBoundsDirty = isContentBoundsDirty;
                    this.isContentOffsetDirty = true;
                    this.isContentOffsetScrollAnimatedDirty = false;
                    this.invalidate();
                }, 0);
                return data;
            }
            data.contentOffsetX = this._contentOffset.x + this._contentInset.left;
            data.contentOffsetY = this._contentOffset.y + this._contentInset.top;
        }
        data.inertia = this._pagingEnabled === true ? false : true;
        data.scrollsToTop = this.scrollsToTop;
        if (this.isContentBoundsDirty) {
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
            data.contentInset = this._contentInset;
        }
        if (!this._scrollEnabled) {
            data.direction = "none";
        }
        return data;
    }
    markAllFlagsDirty() {
        super.markAllFlagsDirty();
        this.isContentBoundsDirty = true;
        this.isContentOffsetDirty = true;
    }
    clearDirtyFlags() {
        super.clearDirtyFlags();
        this.isContentBoundsDirty = false;
        this.isContentOffsetDirty = false;
        this.isContentOffsetScrollAnimated = false;
    }
}
exports.UIScrollView = UIScrollView;
