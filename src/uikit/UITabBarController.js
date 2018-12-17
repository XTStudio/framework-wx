"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UIViewController_1 = require("./UIViewController");
const UITabBar_1 = require("./UITabBar");
class UITabBarController extends UIViewController_1.UIViewController {
    constructor() {
        super(...arguments);
        this.clazz = "UITabBarController";
        this.itemControllers = [];
        this._selectedIndex = -1;
        this.tabBar = new UITabBar_1.UITabBar;
        this.activedNavigationController = undefined;
    }
    attach(dataOwner, dataField) {
        if (this.activedNavigationController !== undefined) {
            this.activedNavigationController.attach(dataOwner, dataField);
            return;
        }
        this.iView.attach(dataOwner, dataField);
        dataOwner.onShow = () => {
            if (this.activedNavigationController) {
                this.activedNavigationController.popToRootViewController();
                this.activedNavigationController = undefined;
            }
        };
    }
    get selectedIndex() {
        return this._selectedIndex;
    }
    set selectedIndex(value) {
        if (this._selectedIndex == value) {
            this.emit("onSelectedViewController", this, true);
            return;
        }
        if (value < 0) {
            this._selectedIndex = value;
            return;
        }
        const oldIndex = this._selectedIndex;
        if (this.itemControllers[value]) {
            const it = this.itemControllers[value];
            if (it.parentViewController === undefined) {
                this.addChildViewController(it);
                this.iView.addSubview(it.iView);
                this.iView.bringSubviewToFront(this.tabBar);
                this.viewWillLayoutSubviews();
            }
        }
        if (this.itemControllers[oldIndex]) {
            this.itemControllers[oldIndex].viewWillDisappear(false);
        }
        if (this.itemControllers[value]) {
            this.itemControllers[value].viewWillAppear(false);
        }
        this._selectedIndex = value;
        this.childViewControllers.forEach(it => {
            it.iView.hidden = this.itemControllers.indexOf(it) != value;
        });
        // this.tabBar.setSelectedIndex(value)
        if (this.itemControllers[oldIndex]) {
            this.itemControllers[oldIndex].viewDidDisappear(false);
        }
        if (this.itemControllers[value]) {
            this.itemControllers[value].viewDidAppear(false);
        }
        this.emit("onSelectedViewController", this, false);
    }
    get selectedViewController() {
        return this.itemControllers[this.selectedIndex];
    }
    set selectedViewController(value) {
        this.selectedIndex = Math.max(0, this.itemControllers.indexOf(value));
    }
    setViewControllers(viewControllers, animated = false) {
        this.childViewControllers.forEach(it => {
            it.removeFromParentViewController();
            it.iView.removeFromSuperview();
        });
        this.itemControllers = viewControllers;
        viewControllers.forEach((it, index) => {
            if (index == 0) {
                this.addChildViewController(it);
                this.iView.addSubview(it.iView);
            }
        });
        this.iView.bringSubviewToFront(this.tabBar);
        // this.tabBar.resetItems()
        this.selectedIndex = 0;
        this.viewWillLayoutSubviews();
    }
    // Implementation
    get barFrame() {
        if (this.tabBar.hidden) {
            return { x: 0.0, y: this.iView.bounds.height, width: this.iView.bounds.width, height: 0.0 };
        }
        return { x: 0.0, y: this.iView.bounds.height - this.tabBar.barHeight, width: this.iView.bounds.width, height: this.tabBar.barHeight };
    }
    get contentFrame() {
        return { x: 0.0, y: 0.0, width: this.iView.bounds.width, height: this.iView.bounds.height - this.barFrame.height };
    }
    get navigationControllerFrame() {
        return { x: 0.0, y: 0.0, width: this.iView.bounds.width, height: this.iView.bounds.height };
    }
    get hidesBottomBarContentFrame() {
        return { x: 0.0, y: 0.0, width: this.iView.bounds.width, height: this.iView.bounds.height };
    }
    viewDidLoad() {
        // this.tabBar.tabBarController = this
        this.iView.addSubview(this.tabBar);
        super.viewDidLoad();
    }
    viewWillLayoutSubviews() {
        this.tabBar.frame = this.barFrame;
        this.childViewControllers.forEach(it => {
            if (it._isUINavigationController === true) {
                it.iView.frame = this.navigationControllerFrame;
            }
            else {
                it.iView.frame = this.contentFrame;
            }
        });
        super.viewWillLayoutSubviews();
    }
}
exports.UITabBarController = UITabBarController;
