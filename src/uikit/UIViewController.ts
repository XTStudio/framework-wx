import { EventEmitter } from "../kimi/EventEmitter";
import { UIView } from "./UIView";
import { UIEdgeInsets, UIEdgeInsetsZero } from "./UIEdgeInsets";
import { UIColor } from "./UIColor";

export class UIViewController extends EventEmitter {

    private _title: string | undefined = undefined

    public get title(): string | undefined {
        return this._title;
    }

    public set title(value: string | undefined) {
        this._title = value;
        // this.navigationItem.viewController = this
        // this.navigationItem.setNeedsUpdate()
        // if (this.navigationController) {
        //     this.navigationController.updateBrowserTitle()
        // }
    }

    protected _view: any = undefined

    public set view(value: UIView) {
        if (this._view !== undefined) { return }
        this._view = value
    }

    public get view(): UIView {
        return this.iView
    }

    public get iView(): UIView {
        this.loadViewIfNeed()
        return this._view
    }

    loadViewIfNeed() {
        if (this._view === undefined) {
            this.loadView()
            if (this._view) {
                this._view.viewDelegate = this
            }
            this.viewDidLoad()
        }
    }

    safeAreaInsets: UIEdgeInsets = UIEdgeInsetsZero

    attach(dataOwner: any, dataField: string) {
        this.iView.attach(dataOwner, dataField)
    }

    loadView() {
        this.view = new UIView
        this.iView.backgroundColor = UIColor.white
    }

    viewDidLoad() {

    }

    viewWillAppear(animated: boolean) {
        this.childViewControllers.forEach(it => it.viewWillAppear(animated))
    }

    viewDidAppear(animated: boolean) {
        this.childViewControllers.forEach(it => it.viewDidAppear(animated))
    }

    viewWillDisappear(animated: boolean) {
        this.childViewControllers.forEach(it => it.viewWillDisappear(animated))
    }

    viewDidDisappear(animated: boolean) {
        this.childViewControllers.forEach(it => it.viewDidDisappear(animated))
    }

    viewWillLayoutSubviews() {
        this.emit("viewWillLayoutSubviews", this)
    }

    viewDidLayoutSubviews() { }

    parentViewController: UIViewController | undefined = undefined

    childViewControllers: UIViewController[] = []

    addChildViewController(viewController: UIViewController) {
        if (viewController == this) { return }
        if (viewController.parentViewController) {
            if (viewController.parentViewController == this) { return }
            viewController.parentViewController.removeFromParentViewController()
        }
        viewController.willMoveToParentViewController(this)
        this.childViewControllers.push(viewController)
        viewController.parentViewController = this
        viewController.didMoveToParentViewController(this)
    }

    removeFromParentViewController() {
        if (this.parentViewController) {
            const it = this.parentViewController
            this.willMoveToParentViewController(undefined)
            const idx = it.childViewControllers.indexOf(this)
            if (idx >= 0) {
                it.childViewControllers.splice(idx, 1)
            }
            this.parentViewController = undefined
            this.didMoveToParentViewController(undefined)
        }
    }

    willMoveToParentViewController(parent: UIViewController | undefined) { }

    didMoveToParentViewController(parent: UIViewController | undefined) { }

    didAddSubview(subview: UIView) { }

    // Helpers

    nextResponder(): UIView | undefined {
        if (this.parentViewController) {
            return this.parentViewController.view
        }
        else if (this._view && this._view.superview) {
            return this._view.superview
        }
        return undefined
    }

    invalidate(dirty: boolean = true, force: boolean = false) {
        let nextResponder = this.nextResponder()
        if (nextResponder !== undefined) {
            nextResponder.invalidate(true, force)
        }
    }

}