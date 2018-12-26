"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UIViewController_1 = require("./UIViewController");
const UINavigationBar_1 = require("./UINavigationBar");
const UIAnimator_1 = require("./UIAnimator");
const UIColor_1 = require("./UIColor");
class UINavigationController extends UIViewController_1.UIViewController {
    constructor(rootViewController) {
        super();
        this.rootViewController = rootViewController;
        this.clazz = "UINavigationController";
        this.navigationBar = new UINavigationBar_1.UINavigationBar;
        this.attachBlock = undefined;
    }
    attach(dataOwner, dataField) {
        let idx = dataOwner.options && parseInt(dataOwner.options.idx);
        if (isNaN(idx)) {
            idx = 0;
        }
        this.attachBlock = () => {
            if (idx < this.childViewControllers.length) {
                this.childViewControllers[idx].iView.attach(dataOwner, dataField);
            }
        };
        this.attachBlock();
        this.loadViewIfNeed();
        dataOwner.onShow = this._onShow.bind(this);
        this.updateBrowserTitle();
        this.updateBrowserBar();
    }
    _onShow() {
        const currentIdx = getCurrentPages().length - 1;
        if (currentIdx < this.childViewControllers.length) {
            this.popToViewController(this.childViewControllers[currentIdx]);
        }
    }
    viewDidLoad() {
        if (this.rootViewController) {
            this.pushViewController(this.rootViewController, false);
        }
        this.navigationBar.navigationController = this;
        super.viewDidLoad();
        this.updateBrowserBar();
    }
    pushViewController(viewController, animated = true) {
        this.addChildViewController(viewController);
        if (this.childViewControllers.length === 1) {
            if (this.attachBlock) {
                this.attachBlock();
            }
            else if (this.childViewControllers[0].iView.superview === undefined) {
                this.view.addSubview(this.childViewControllers[0].iView);
            }
        }
        else {
            if (this.tabBarController) {
                this.tabBarController.activedNavigationController = this;
            }
            wx.navigateTo({ url: "index?idx=" + (this.childViewControllers.length - 1) });
        }
        this.updateBrowserTitle();
        this.updateBrowserBar();
    }
    popViewController(animated = true) {
        const fromViewController = this.childViewControllers[this.childViewControllers.length - 1];
        const toViewController = this.childViewControllers[this.childViewControllers.length - 2];
        fromViewController.viewWillDisappear(animated);
        toViewController.viewWillAppear(animated);
        wx.navigateBack();
        fromViewController.removeFromParentViewController();
        fromViewController.iView.removeFromSuperview();
        fromViewController.viewDidDisappear(true);
        toViewController.viewDidAppear(true);
        this.updateBrowserTitle();
        this.updateBrowserBar();
        return fromViewController;
    }
    popToViewController(viewController, animated = true) {
        if (this.childViewControllers.indexOf(viewController) < 0) {
            return [];
        }
        const targetIndex = this.childViewControllers.indexOf(viewController);
        const fromViewControllers = this.childViewControllers.filter((_, index) => {
            return index > targetIndex;
        });
        if (fromViewControllers.length == 0) {
            return [];
        }
        const toViewController = viewController;
        toViewController.iView.hidden = false;
        fromViewControllers.forEach(it => { it.viewWillDisappear(animated); });
        toViewController.viewWillAppear(animated);
        if (getCurrentPages().length !== this.childViewControllers.length - fromViewControllers.length) {
            wx.navigateBack({ delta: fromViewControllers.length });
        }
        fromViewControllers.forEach(it => { it.removeFromParentViewController(); });
        fromViewControllers.forEach(it => { it.iView.removeFromSuperview(); });
        fromViewControllers.forEach(it => { it.viewDidDisappear(false); });
        toViewController.viewDidAppear(false);
        this.updateBrowserTitle();
        this.updateBrowserBar();
        return fromViewControllers;
    }
    popToRootViewController(animated = true) {
        const rootViewController = this.childViewControllers[0];
        if (rootViewController === undefined) {
            return [];
        }
        return this.popToViewController(rootViewController, animated);
    }
    viewWillLayoutSubviews() {
        super.viewWillLayoutSubviews();
        if (this.childViewControllers[0]) {
            this.childViewControllers[0].iView.frame = this.view.bounds;
        }
    }
    updateBrowserTitle() {
        if (this.tabBarController && this.tabBarController.selectedViewController !== this) {
            return;
        }
        if (this.parentViewController === undefined && this.window === undefined && this.attachBlock === undefined) {
            return;
        }
        if (this.childViewControllers.length > 0) {
            const title = this.childViewControllers[this.childViewControllers.length - 1].title;
            if (title) {
                wx.setNavigationBarTitle({ title });
            }
        }
    }
    updateBrowserBar() {
        if (this.tabBarController && this.tabBarController.selectedViewController !== this) {
            return;
        }
        if (this.parentViewController === undefined && this.window === undefined && this.attachBlock === undefined) {
            return;
        }
        if (this.navigationBar.barTintColor) {
            wx.setNavigationBarColor({
                backgroundColor: this.navigationBar.barTintColor.toHEXStyle(),
                frontColor: this.navigationBar.tintColor.toStyle() === UIColor_1.UIColor.white.toStyle() ? '#ffffff' : '#000000',
                animation: {
                    duration: UIAnimator_1.UIAnimator.activeAnimator ? UIAnimator_1.UIAnimator.activeAnimator.animationProps.duration : 0.0,
                    timingFunc: UIAnimator_1.UIAnimator.activeAnimator ? UIAnimator_1.UIAnimator.activeAnimator.animationProps.timingFunction : undefined,
                },
            });
        }
        else {
            wx.setNavigationBarColor({
                backgroundColor: '#ffffff',
                frontColor: this.navigationBar.tintColor.toStyle() === UIColor_1.UIColor.white.toStyle() ? '#ffffff' : '#000000',
                animation: {
                    duration: UIAnimator_1.UIAnimator.activeAnimator ? UIAnimator_1.UIAnimator.activeAnimator.animationProps.duration : 0.0,
                    timingFunc: UIAnimator_1.UIAnimator.activeAnimator ? UIAnimator_1.UIAnimator.activeAnimator.animationProps.timingFunction : undefined,
                },
            });
        }
    }
}
exports.UINavigationController = UINavigationController;
