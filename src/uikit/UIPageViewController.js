"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UIViewController_1 = require("./UIViewController");
const UIScrollView_1 = require("./UIScrollView");
const UIPoint_1 = require("./UIPoint");
const UIAnimator_1 = require("./UIAnimator");
class UIPageViewController extends UIViewController_1.UIViewController {
    constructor(isVertical = false) {
        super();
        this.isVertical = isVertical;
        this.loops = false;
        this._pageItems = undefined;
        this._currentPage = undefined;
        // Implementation
        this.scrollView = new UIScrollView_1.UIScrollView()
            .on("didScroll", () => {
            this.scrollView.subviews.forEach(it => it.hidden = false);
        })
            .on("didEndScrollingAnimation", () => {
            this.changeContents();
        });
    }
    get pageItems() {
        return this._pageItems;
    }
    set pageItems(value) {
        this._pageItems = value;
        if (value && value.length > 0) {
            this.currentPage = value[0];
            this.resetContents();
        }
    }
    get currentPage() {
        return this._currentPage;
    }
    set currentPage(value) {
        this._currentPage = value;
        if (value) {
            if (value.parentViewController != this) {
                this.addChildViewController(value);
            }
        }
        this.resetContents();
    }
    scrollToNextPage(animated = true) {
        if (this.isVertical == true) {
            if (this.scrollView.contentInset.bottom > 0.0) {
                this.scrollView.setContentOffset({ x: 0.0, y: this.scrollView.contentInset.bottom }, animated);
                if (animated == false) {
                    this.changeContents();
                }
            }
        }
        else {
            if (this.scrollView.contentInset.right > 0.0) {
                this.scrollView.setContentOffset({ x: this.scrollView.contentInset.right, y: 0.0 }, animated);
                if (animated == false) {
                    this.changeContents();
                }
            }
        }
    }
    scrollToPreviousPage(animated = true) {
        if (this.isVertical == true) {
            if (this.scrollView.contentInset.top > 0.0) {
                this.scrollView.setContentOffset({ x: 0.0, y: -this.scrollView.contentInset.top }, animated);
                if (animated == false) {
                    this.changeContents();
                }
            }
        }
        else {
            if (this.scrollView.contentInset.left > 0.0) {
                this.scrollView.setContentOffset({ x: -this.scrollView.contentInset.left, y: 0.0 }, animated);
                if (animated == false) {
                    this.changeContents();
                }
            }
        }
    }
    beforeViewController(currentPage) {
        if (this.pageItems !== undefined) {
            const currentIndex = this.pageItems.indexOf(currentPage);
            if (currentIndex >= 0) {
                if (currentIndex > 0) {
                    return this.pageItems[currentIndex - 1];
                }
                else if (this.loops && this.pageItems.length > 1) {
                    return this.pageItems[this.pageItems.length - 1];
                }
            }
            else {
                return undefined;
            }
        }
        return this.val("beforeViewController", currentPage);
    }
    afterViewController(currentPage) {
        if (this.pageItems !== undefined) {
            const currentIndex = this.pageItems.indexOf(currentPage);
            if (currentIndex >= 0) {
                if (currentIndex + 1 < this.pageItems.length) {
                    return this.pageItems[currentIndex + 1];
                }
                else if (this.loops && this.pageItems.length > 1) {
                    return this.pageItems[0];
                }
            }
            else {
                return undefined;
            }
        }
        return this.val("afterViewController", currentPage);
    }
    didFinishAnimating(currentPage, previousPage) {
        this.emit("didFinishAnimating", currentPage, previousPage);
    }
    viewDidLoad() {
        this.scrollView.pagingEnabled = true;
        this.scrollView.bounces = false;
        this.scrollView.showsHorizontalScrollIndicator = false;
        this.scrollView.showsVerticalScrollIndicator = false;
        this.iView.addSubview(this.scrollView);
        super.viewDidLoad();
    }
    viewWillLayoutSubviews() {
        this.scrollView.frame = this.iView.bounds;
        this.scrollView.contentSize = { width: this.iView.bounds.width, height: this.iView.bounds.height };
        this.resetContents();
        super.viewWillLayoutSubviews();
    }
    changeContents() {
        if (this.isVertical == true) {
            if (Math.abs(this.scrollView.contentOffset.y - (-this.scrollView.bounds.height)) < 4.0) {
                const currentPage = this.currentPage;
                if (currentPage === undefined) {
                    return;
                }
                const beforePage = this.beforeViewController(currentPage);
                if (beforePage === undefined) {
                    return;
                }
                this.currentPage = beforePage;
                this.resetContents();
                this.didFinishAnimating(beforePage, currentPage);
            }
            else if (Math.abs(this.scrollView.contentOffset.y - this.scrollView.bounds.height) < 4.0) {
                const currentPage = this.currentPage;
                if (currentPage === undefined) {
                    return;
                }
                const afterPage = this.afterViewController(currentPage);
                if (afterPage === undefined) {
                    return;
                }
                this.currentPage = afterPage;
                this.resetContents();
                this.didFinishAnimating(afterPage, currentPage);
            }
        }
        else {
            if (Math.abs(this.scrollView.contentOffset.x - (-this.scrollView.bounds.width)) < 4.0) {
                const currentPage = this.currentPage;
                if (currentPage === undefined) {
                    return;
                }
                const beforePage = this.beforeViewController(currentPage);
                if (beforePage === undefined) {
                    return;
                }
                this.currentPage = beforePage;
                this.resetContents();
                this.didFinishAnimating(beforePage, currentPage);
            }
            else if (Math.abs(this.scrollView.contentOffset.x - this.scrollView.bounds.width) < 4.0) {
                const currentPage = this.currentPage;
                if (currentPage === undefined) {
                    return;
                }
                const afterPage = this.afterViewController(currentPage);
                if (afterPage === undefined) {
                    return;
                }
                this.currentPage = afterPage;
                this.resetContents();
                this.didFinishAnimating(afterPage, currentPage);
            }
        }
    }
    resetContents() {
        this.scrollView.alpha = 0.0;
        this.scrollView.setDataForce({ alpha: 0.0 }, () => {
            setTimeout(() => {
                const currentPage = this.currentPage;
                if (currentPage === undefined) {
                    return;
                }
                const beforePage = this.beforeViewController(currentPage);
                const afterPage = this.afterViewController(currentPage);
                this.scrollView.subviews.forEach(it => {
                    if (it != currentPage.iView && (beforePage === undefined || it != beforePage.iView) && (afterPage === undefined || it != afterPage.iView)) {
                        it.removeFromSuperview();
                    }
                });
                currentPage.iView.frame = this.iView.bounds;
                this.scrollView.addSubview(currentPage.iView);
                if (beforePage) {
                    this.addChildViewController(beforePage);
                    beforePage.iView.alpha = 0.0;
                    beforePage.iView.setDataForce({ alpha: 0.0 });
                    this.scrollView.addSubview(beforePage.iView);
                    if (this.isVertical == true) {
                        beforePage.iView.frame = { x: 0.0, y: -this.iView.bounds.height, width: this.iView.bounds.width, height: this.iView.bounds.height };
                    }
                    else {
                        beforePage.iView.frame = { x: -this.iView.bounds.width, y: 0.0, width: this.iView.bounds.width, height: this.iView.bounds.height };
                    }
                }
                if (afterPage) {
                    this.addChildViewController(afterPage);
                    afterPage.iView.alpha = 0.0;
                    afterPage.iView.setDataForce({ alpha: 0.0 });
                    this.scrollView.addSubview(afterPage.iView);
                    if (this.isVertical == true) {
                        afterPage.iView.frame = { x: 0.0, y: this.iView.bounds.height, width: this.iView.bounds.width, height: this.iView.bounds.height };
                    }
                    else {
                        afterPage.iView.frame = { x: this.iView.bounds.width, y: 0.0, width: this.iView.bounds.width, height: this.iView.bounds.height };
                    }
                }
                if (this.isVertical == true) {
                    this.scrollView.contentInset = {
                        top: beforePage !== undefined ? Math.ceil(this.iView.bounds.height) : 0.0,
                        left: 0.0,
                        bottom: afterPage !== undefined ? Math.ceil(this.iView.bounds.height) : 0.0,
                        right: 0.0
                    };
                }
                else {
                    this.scrollView.contentInset = {
                        top: 0.0,
                        left: beforePage !== undefined ? Math.ceil(this.iView.bounds.width) : 0.0,
                        bottom: 0.0,
                        right: afterPage !== undefined ? Math.ceil(this.iView.bounds.width) : 0.0
                    };
                }
                this.scrollView.contentOffset = UIPoint_1.UIPointZero;
                setTimeout(() => {
                    UIAnimator_1.UIAnimator.linear(0.30, () => {
                        currentPage.iView.alpha = 1.0;
                        this.scrollView.alpha = 1.0;
                    }, undefined);
                }, 50);
                this.childViewControllers.forEach(it => {
                    if (it !== this.currentPage && it !== beforePage && it !== afterPage) {
                        it.iView.removeFromSuperview();
                        it.removeFromParentViewController();
                    }
                    it.iView.hidden = it !== this.currentPage;
                });
                this.scrollView.markFlagDirty("pagingItems");
            }, 50);
        });
    }
}
exports.UIPageViewController = UIPageViewController;
