import { UIRect, UIRectZero } from "./UIRect";
import { UIViewController } from "./UIViewController";
import { UITabBar } from "./UITabBar";
import { UIView } from "./UIView";
import { UIColor } from "./UIColor";

export class UITabBarController extends UIViewController {

    clazz = "UITabBarController"

    itemControllers: UIViewController[] = []

    attach(dataOwner: any, dataField: string) {
        if (this.activedNavigationController !== undefined) {
            this.activedNavigationController.attach(dataOwner, dataField)
            return
        }
        this.iView.attach(dataOwner, dataField)
        dataOwner.onShow = () => {
            if (this.activedNavigationController) {
                this.activedNavigationController.popToRootViewController()
                this.activedNavigationController = undefined
            }
        }
    }

    private _selectedIndex: number = -1

    public get selectedIndex(): number {
        return this._selectedIndex;
    }

    public set selectedIndex(value: number) {
        if (this._selectedIndex == value) {
            this.emit("onSelectedViewController", this, true)
            return
        }
        if (value < 0) {
            this._selectedIndex = value
            return
        }
        const oldIndex = this._selectedIndex
        if (this.itemControllers[value]) {
            const it = this.itemControllers[value]
            if (it.parentViewController === undefined) {
                this.addChildViewController(it)
                this.iView.insertSubviewAtIndex(it.iView, 0)
                this.viewWillLayoutSubviews()
            }
        }
        if (this.itemControllers[oldIndex]) {
            this.itemControllers[oldIndex].viewWillDisappear(false)
        }
        if (this.itemControllers[value]) {
            this.itemControllers[value].viewWillAppear(false)
        }
        this._selectedIndex = value
        this.childViewControllers.forEach(it => {
            it.iView.hidden = this.itemControllers.indexOf(it) != value
        })
        this.tabBar.setSelectedIndex(value)
        if (this.itemControllers[oldIndex]) {
            this.itemControllers[oldIndex].viewDidDisappear(false)
        }
        if (this.itemControllers[value]) {
            this.itemControllers[value].viewDidAppear(false)
        }
        this.emit("onSelectedViewController", this, false)
        this.updateBrowserTitle()
    }

    public get selectedViewController(): UIViewController {
        return this.itemControllers[this.selectedIndex]
    }

    public set selectedViewController(value: UIViewController) {
        this.selectedIndex = Math.max(0, this.itemControllers.indexOf(value))
    }

    setViewControllers(viewControllers: UIViewController[], animated: boolean = false) {
        this.childViewControllers.forEach(it => {
            it.removeFromParentViewController()
            it.iView.removeFromSuperview()
        })
        this.itemControllers = viewControllers
        viewControllers.forEach((it, index) => {
            if (index == 0) {
                this.addChildViewController(it)
                this.iView.addSubview(it.iView)
            }
        })
        this.iView.bringSubviewToFront(this.tabBar)
        this.tabBar.resetItems()
        this.selectedIndex = 0
        this.viewWillLayoutSubviews()
        this.updateBrowserTitle()
    }

    tabBar: UITabBar = new UITabBar

    // Implementation

    private get barFrame(): UIRect {
        if (this.tabBar.hidden) {
            return { x: 0.0, y: this.iView.bounds.height, width: this.iView.bounds.width, height: 0.0 }
        }
        return { x: 0.0, y: this.iView.bounds.height - this.tabBar.barHeight, width: this.iView.bounds.width, height: this.tabBar.barHeight }
    }

    private get contentFrame(): UIRect {
        return { x: 0.0, y: 0.0, width: this.iView.bounds.width, height: this.iView.bounds.height - this.barFrame.height }
    }

    private get navigationControllerFrame(): UIRect {
        return { x: 0.0, y: 0.0, width: this.iView.bounds.width, height: this.iView.bounds.height - this.barFrame.height }
    }

    // private get hidesBottomBarContentFrame(): UIRect {
    //     return { x: 0.0, y: 0.0, width: this.iView.bounds.width, height: this.iView.bounds.height }
    // }

    viewDidLoad() {
        this.tabBar.tabBarController = this
        this.iView.addSubview(this.tabBar)
        super.viewDidLoad()
    }

    viewWillLayoutSubviews() {
        this.tabBar.frame = this.barFrame
        this.childViewControllers.forEach(it => {
            if (it.clazz === "UINavigationController") {
                it.iView.frame = this.navigationControllerFrame
            }
            else {
                it.iView.frame = this.contentFrame
            }
        })
        super.viewWillLayoutSubviews()
    }

    updateBrowserTitle() {
        if (this.selectedViewController) {
            if (this.selectedViewController.clazz === "UINavigationController") {
                (this.selectedViewController as any).updateBrowserTitle()
            }
            else {
                wx.setNavigationBarTitle({
                    title: this.selectedViewController.title
                })
            }
        }
    }

    activedNavigationController: any = undefined

}