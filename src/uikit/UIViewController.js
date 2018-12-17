"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EventEmitter_1 = require("../kimi/EventEmitter");
const UIView_1 = require("./UIView");
const UIEdgeInsets_1 = require("./UIEdgeInsets");
const UIColor_1 = require("./UIColor");
const UITabBarItem_1 = require("./UITabBarItem");
class UIViewController extends EventEmitter_1.EventEmitter {
    constructor() {
        super(...arguments);
        this.clazz = "UIViewController";
        this._title = undefined;
        this._view = undefined;
        this.safeAreaInsets = UIEdgeInsets_1.UIEdgeInsetsZero;
        this.parentViewController = undefined;
        this.childViewControllers = [];
        this.tabBarItem = new UITabBarItem_1.UITabBarItem;
    }
    get title() {
        return this._title;
    }
    set title(value) {
        this._title = value;
        // this.navigationItem.viewController = this
        // this.navigationItem.setNeedsUpdate()
        if (this.navigationController) {
            this.navigationController.updateBrowserTitle();
        }
    }
    set view(value) {
        if (this._view !== undefined) {
            return;
        }
        this._view = value;
    }
    get view() {
        return this.iView;
    }
    get iView() {
        this.loadViewIfNeed();
        return this._view;
    }
    loadViewIfNeed() {
        if (this._view === undefined) {
            this.loadView();
            if (this._view) {
                this._view.viewDelegate = this;
            }
            this.viewDidLoad();
        }
    }
    attach(dataOwner, dataField) {
        this.iView.attach(dataOwner, dataField);
    }
    loadView() {
        this.view = new UIView_1.UIView;
        this.iView.backgroundColor = UIColor_1.UIColor.white;
    }
    viewDidLoad() {
    }
    viewWillAppear(animated) {
        this.childViewControllers.forEach(it => it.viewWillAppear(animated));
    }
    viewDidAppear(animated) {
        this.childViewControllers.forEach(it => it.viewDidAppear(animated));
    }
    viewWillDisappear(animated) {
        this.childViewControllers.forEach(it => it.viewWillDisappear(animated));
    }
    viewDidDisappear(animated) {
        this.childViewControllers.forEach(it => it.viewDidDisappear(animated));
    }
    viewWillLayoutSubviews() {
        this.emit("viewWillLayoutSubviews", this);
    }
    viewDidLayoutSubviews() { }
    addChildViewController(viewController) {
        if (viewController == this) {
            return;
        }
        if (viewController.parentViewController) {
            if (viewController.parentViewController == this) {
                return;
            }
            viewController.parentViewController.removeFromParentViewController();
        }
        viewController.willMoveToParentViewController(this);
        this.childViewControllers.push(viewController);
        viewController.parentViewController = this;
        viewController.didMoveToParentViewController(this);
    }
    removeFromParentViewController() {
        if (this.parentViewController) {
            const it = this.parentViewController;
            this.willMoveToParentViewController(undefined);
            const idx = it.childViewControllers.indexOf(this);
            if (idx >= 0) {
                it.childViewControllers.splice(idx, 1);
            }
            this.parentViewController = undefined;
            this.didMoveToParentViewController(undefined);
        }
    }
    willMoveToParentViewController(parent) { }
    didMoveToParentViewController(parent) { }
    didAddSubview(subview) { }
    get navigationController() {
        let current = this;
        while (current != undefined) {
            if (current.clazz === "UINavigationController") {
                return current;
            }
            current = current.parentViewController;
        }
        return undefined;
    }
    // navigationItem = new UINavigationItem
    // hidesBottomBarWhenPushed: boolean = false
    get tabBarController() {
        var current = this;
        while (current != undefined) {
            if (current.clazz === "UITabBarController") {
                return current;
            }
            current = current.parentViewController;
        }
        return undefined;
    }
    get window() {
        let nextResponder = this.nextResponder();
        while (nextResponder !== undefined) {
            if (nextResponder.clazz === "UIWindow") {
                return nextResponder;
            }
            nextResponder = nextResponder.nextResponder();
        }
    }
    get visibleViewController() {
        if (this.window && this.window.presentedViewControllers.length > 0) {
            return this.window.presentedViewControllers[this.window.presentedViewControllers.length - 1];
        }
        else if (this.window) {
            return this.window.rootViewController;
        }
        return undefined;
    }
    // Helpers
    nextResponder() {
        if (this.parentViewController) {
            return this.parentViewController.view;
        }
        else if (this._view && this._view.superview) {
            return this._view.superview;
        }
        return undefined;
    }
    invalidate(dirty = true, force = false) {
        let nextResponder = this.nextResponder();
        if (nextResponder !== undefined) {
            nextResponder.invalidate(true, force);
        }
    }
}
exports.UIViewController = UIViewController;
