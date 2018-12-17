import { UIViewController } from "./UIViewController";

export class UINavigationController extends UIViewController {

    clazz = "UINavigationController"

    private attachBlock: (() => void) | undefined = undefined

    constructor(readonly rootViewController: UIViewController) {
        super()
    }

    attach(dataOwner: any, dataField: string) {
        let idx = dataOwner.options && parseInt(dataOwner.options.idx)
        if (isNaN(idx)) {
            idx = 0
        }
        this.attachBlock = () => {
            if (idx < this.childViewControllers.length) {
                this.childViewControllers[idx].iView.attach(dataOwner, dataField)
            }
        }
        this.attachBlock()
        this.loadViewIfNeed()
        dataOwner.onShow = this._onShow.bind(this)
    }

    _onShow() {
        const currentIdx = getCurrentPages().length - 1
        if (currentIdx < this.childViewControllers.length) {
            this.popToViewController(this.childViewControllers[currentIdx])
        }
    }

    viewDidLoad() {
        if (this.rootViewController) {
            this.pushViewController(this.rootViewController, false)
        }
        super.viewDidLoad()
    }

    pushViewController(viewController: UIViewController, animated: boolean = true) {
        this.addChildViewController(viewController)
        if (this.childViewControllers.length === 1) {
            if (this.attachBlock) {
                this.attachBlock()
            }
            else if (this.childViewControllers[0].iView.superview === undefined) {
                this.view.addSubview(this.childViewControllers[0].iView)
            }
        }
        else {
            if (this.tabBarController) {
                this.tabBarController.activedNavigationController = this
            }
            wx.navigateTo({ url: "index?idx=" + (this.childViewControllers.length - 1) })
        }
    }

    popViewController(animated: boolean = true): UIViewController | undefined {
        const fromViewController = this.childViewControllers[this.childViewControllers.length - 1]
        const toViewController = this.childViewControllers[this.childViewControllers.length - 2]
        fromViewController.viewWillDisappear(animated)
        toViewController.viewWillAppear(animated)
        wx.navigateBack()
        fromViewController.removeFromParentViewController()
        fromViewController.iView.removeFromSuperview()
        fromViewController.viewDidDisappear(true)
        toViewController.viewDidAppear(true)
        return fromViewController
    }

    popToViewController(viewController: UIViewController, animated: boolean = true): UIViewController[] {
        if (this.childViewControllers.indexOf(viewController) < 0) { return [] }
        const targetIndex = this.childViewControllers.indexOf(viewController)
        const fromViewControllers = this.childViewControllers.filter((_, index) => {
            return index > targetIndex
        })
        if (fromViewControllers.length == 0) {
            return []
        }
        const toViewController = viewController
        toViewController.iView.hidden = false
        fromViewControllers.forEach(it => { it.viewWillDisappear(animated) })
        toViewController.viewWillAppear(animated)
        if (getCurrentPages().length !== this.childViewControllers.length - fromViewControllers.length) {
            wx.navigateBack({ delta: fromViewControllers.length })
        }
        fromViewControllers.forEach(it => { it.removeFromParentViewController() })
        fromViewControllers.forEach(it => { it.iView.removeFromSuperview() })
        fromViewControllers.forEach(it => { it.viewDidDisappear(false) })
        toViewController.viewDidAppear(false)
        return fromViewControllers
    }

    popToRootViewController(animated: boolean = true): UIViewController[] {
        const rootViewController = this.childViewControllers[0]
        if (rootViewController === undefined) {
            return []
        }
        return this.popToViewController(rootViewController, animated)
    }

    viewWillLayoutSubviews() {
        super.viewWillLayoutSubviews()
        if (this.childViewControllers[0]) {
            this.childViewControllers[0].iView.frame = this.view.bounds
        }
    }

}