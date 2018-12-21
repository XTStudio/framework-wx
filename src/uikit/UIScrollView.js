"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UIView_1 = require("./UIView");
const UIPoint_1 = require("./UIPoint");
const UISize_1 = require("./UISize");
const UIEdgeInsets_1 = require("./UIEdgeInsets");
const UIPanGestureRecognizer_1 = require("./UIPanGestureRecognizer");
const UIComponentManager_1 = require("../components/UIComponentManager");
const Scroller_1 = require("./helpers/Scroller");
const RAF = (() => {
    try {
        return requestAnimationFrame;
    }
    catch (error) {
        return function (callback) {
            setTimeout(callback, 4);
        };
    }
})();
class UIScrollView extends UIView_1.UIView {
    constructor() {
        super();
        this.clazz = "UIScrollView";
        this.panGestureRecognizer = new UIPanGestureRecognizer_1.UIPanGestureRecognizer;
        this.refreshControl = undefined;
        this.fetchMoreControl = undefined;
        this.currentLockedDirection = undefined;
        this.scroller = new Scroller_1.Scroller;
        this.deceleratingWasCancelled = false;
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
        this.panGestureRecognizer
            .on("began", (sender) => {
            this.deceleratingWasCancelled = false;
            this.currentLockedDirection = undefined;
            sender.setTranslation({ x: 0, y: 0 }, undefined);
            this.willBeginDragging();
        })
            .on("changed", (sender) => {
            let translation = sender.translationInView(undefined);
            if (this.directionalLockEnabled && this.currentLockedDirection == undefined) {
                if (Math.abs(translation.x) >= 4.0) {
                    this.currentLockedDirection = 0;
                }
                else if (Math.abs(translation.y) >= 4.0) {
                    this.currentLockedDirection = 1;
                }
                return;
            }
            else if (this.directionalLockEnabled && this.currentLockedDirection == 0) {
                translation = { x: translation.x, y: 0.0 };
            }
            else if (this.directionalLockEnabled && this.currentLockedDirection == 1) {
                translation = { x: 0.0, y: translation.y };
            }
            // this.createFetchMoreEffect(translation)
            const refreshOffset = undefined; //this.createRefreshEffect(translation)
            // if (refreshOffset == undefined) {
            //     this.createBounceEffect(translation, this.locationInView(undefined))
            // }
            this.contentOffset = {
                x: Math.max(-this.contentInset.left, Math.min(Math.max(0.0, this.contentSize.width + this.contentInset.right - this.bounds.width), this.contentOffset.x - translation.x)),
                y: Math.max(-this.contentInset.top - (this.refreshControl && this.refreshControl.enabled ? 240.0 : 0.0), Math.min(Math.max(0.0, this.contentSize.height + this.contentInset.bottom - this.bounds.height), this.contentOffset.y - (refreshOffset !== undefined ? refreshOffset : translation.y)))
            };
            sender.setTranslation({ x: 0, y: 0 }, undefined);
            this.didScroll();
        })
            .on("ended", (sender) => {
            // if (!this.edgeVerticalEffect.isFinished || !this.edgeHorizontalEffect.isFinished) {
            //     this.edgeVerticalEffect.onRelease()
            //     this.edgeHorizontalEffect.onRelease()
            //     this.startFinishEdgeAnimation()
            // }
            var velocity = sender.velocityInView(undefined);
            if (this.directionalLockEnabled && this.currentLockedDirection == undefined) {
                velocity = UIPoint_1.UIPointZero;
            }
            else if (this.directionalLockEnabled && this.currentLockedDirection == 0) {
                velocity = { x: velocity.x, y: 0.0 };
            }
            else if (this.directionalLockEnabled && this.currentLockedDirection == 1) {
                velocity = { x: 0.0, y: velocity.y };
            }
            this.willEndDragging(velocity);
            if (this.refreshControl !== undefined && this.refreshControl.animationView.alpha >= 1.0) {
                this.didEndDragging(false);
                this.willBeginDecelerating();
                this.didEndDecelerating();
                this.refreshControl.beginRefreshing_callFromScrollView();
                this.setContentOffset({ x: 0.0, y: -this.contentInset.top - 44.0 }, true);
            }
            else if (this.refreshControl !== undefined && this.refreshControl.animationView.alpha > 0.0) {
                this.didEndDragging(false);
                this.willBeginDecelerating();
                this.didEndDecelerating();
                this.refreshControl.animationView.alpha = 0.0;
                this.setContentOffset({ x: 0.0, y: -this.contentInset.top }, true);
            }
            else if (this.shouldDecelerating(velocity)) {
                this.didEndDragging(true);
                this.willBeginDecelerating();
                this.startDecelerating(velocity);
            }
            else {
                this.didEndDragging(false);
                this.willBeginDecelerating();
                this.didEndDecelerating();
            }
        });
        this.addGestureRecognizer(this.panGestureRecognizer);
        this.clipsToBounds = true;
    }
    resetLockedDirection() {
        const contentWidth = this.contentSize.width + this.contentInset.left + this.contentInset.right;
        const contentHeight = this.contentSize.height + this.contentInset.top + this.contentInset.bottom;
        if (contentWidth <= this.bounds.width && contentHeight <= this.bounds.height) {
            this.panGestureRecognizer.lockedDirection = 0;
        }
        else if (contentWidth <= this.bounds.width) {
            this.panGestureRecognizer.lockedDirection = 1;
        }
        else if (contentHeight <= this.bounds.height) {
            this.panGestureRecognizer.lockedDirection = 2;
        }
    }
    touchesBegan(touches) {
        super.touchesBegan(touches);
        this.deceleratingWasCancelled = false;
        if (!this.scroller.finished) {
            UIView_1.UIView.recognizedGesture = this.panGestureRecognizer;
            this.scroller.abortAnimation();
            this.tracking = true;
            if (this.decelerating) {
                this.deceleratingWasCancelled = true;
                this.didEndDecelerating();
            }
        }
    }
    touchesEnded(touches) {
        super.touchesEnded(touches);
        this.tracking = false;
        if (this.deceleratingWasCancelled && this.pagingEnabled) {
            this.startDecelerating({ x: 0, y: 0 });
        }
        if (this.deceleratingWasCancelled) {
            setTimeout(() => {
                UIView_1.UIView.recognizedGesture = undefined;
            }, 0);
        }
    }
    touchesCancelled(touches) {
        super.touchesCancelled(touches);
        this.tracking = false;
        if (this.deceleratingWasCancelled && this.pagingEnabled) {
            this.startDecelerating({ x: 0, y: 0 });
        }
        if (this.deceleratingWasCancelled) {
            setTimeout(() => {
                UIView_1.UIView.recognizedGesture = undefined;
            }, 0);
        }
    }
    shouldDecelerating(velocity) {
        if (this.pagingEnabled) {
            return true;
        }
        if (velocity.y > 0 && this.contentOffset.y < this.contentSize.height + this.contentInset.bottom - this.bounds.height) {
            return true;
        }
        else if (velocity.y < 0 && this.contentOffset.y > -this.contentInset.top) {
            return true;
        }
        if (velocity.x > 0 && this.contentOffset.x < this.contentSize.width + this.contentInset.right - this.bounds.width) {
            return true;
        }
        else if (velocity.x < 0 && this.contentOffset.x > -this.contentInset.left) {
            return true;
        }
        return false;
    }
    startDecelerating(velocity) {
        this.scroller.fling(this.contentOffset.x, this.contentOffset.y, -velocity.x, -velocity.y, -this.contentInset.left - 1000, (this.contentSize.width + this.contentInset.right - this.bounds.width) + 1000, -this.contentInset.top - 1000, (this.contentSize.height + this.contentInset.bottom - this.bounds.height) + 1000);
        if (this.pagingEnabled) {
            this.scroller.abortAnimation();
            const minY = Math.floor(this.contentOffset.y / this.bounds.height) * this.bounds.height;
            const maxY = Math.ceil(this.contentOffset.y / this.bounds.height) * this.bounds.height;
            const minX = Math.floor(this.contentOffset.x / this.bounds.width) * this.bounds.width;
            const maxX = Math.ceil(this.contentOffset.x / this.bounds.width) * this.bounds.width;
            this.scroller.startScroll(this.contentOffset.x, this.contentOffset.y, Math.ceil(Math.max(minX, Math.min(maxX, (Math.round(this.scroller.finalX / this.bounds.width) * this.bounds.width))) - this.contentOffset.x), Math.ceil(Math.max(minY, Math.min(maxY, (Math.round(this.scroller.finalY / this.bounds.height) * this.bounds.height))) - this.contentOffset.y), 500);
        }
        this.loopScrollAnimation();
    }
    loopScrollAnimation(ignoreBounds = false) {
        const finished = !this.scroller.computeScrollOffset();
        if (!finished) {
            var minY = -this.contentInset.top;
            if (this.refreshControl && this.refreshControl.refreshing === true) {
                minY -= 44.0;
            }
            if (ignoreBounds === true && this.contentSize.height !== 0.0) {
                minY = -Infinity;
            }
            this.contentOffset = {
                x: Math.max(-this.contentInset.left, Math.min(Math.max(-this.contentInset.left, this.contentSize.width + this.contentInset.right - this.bounds.width), this.scroller.currX)),
                y: Math.max(minY, Math.min(Math.max(minY, this.contentSize.height + this.contentInset.bottom - this.bounds.height), this.scroller.currY))
            };
            this.didScroll();
            if (this.contentSize.height > this.bounds.height && Math.abs(this.scroller.currY - this.contentOffset.y) > 0.01) {
                this.scroller.forceFinished(true);
                this.didEndDecelerating();
                return;
            }
            if (this.contentSize.width > this.bounds.width && Math.abs(this.scroller.currX - this.contentOffset.x) > 0.01) {
                this.scroller.forceFinished(true);
                this.didEndDecelerating();
                return;
            }
            RAF(() => {
                this.loopScrollAnimation(ignoreBounds);
            });
        }
        else if (this.decelerating) {
            this.didEndDecelerating();
        }
        else {
            this.didEndScrollingAnimation();
        }
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
        if (this.viewID) {
            const component = UIComponentManager_1.UIComponentManager.shared.fetchComponent(this.viewID);
            if (component) {
                component.setData({
                    contentOffset: {
                        x: -value.x,
                        y: -value.y,
                    }
                });
            }
        }
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
        UIView_1.UIView.recognizedGesture = this.panGestureRecognizer;
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
