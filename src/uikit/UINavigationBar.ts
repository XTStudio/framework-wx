import { UIView } from "./UIView";
import { UIColor } from "./UIColor";
import { EventEmitter } from "../kimi/EventEmitter";

export class UINavigationItem {

    viewController: any = undefined

    navigationBar: UINavigationBar | undefined = undefined

    leftBarButtonItems: UIBarButtonItem[] = []

    rightBarButtonItems: UIBarButtonItem[] = []

    setNeedsUpdate() { }

}

export class UIBarButtonItem extends EventEmitter { }

export class UINavigationBar extends UIView {

    navigationController: any = undefined

    private _barTintColor: UIColor | undefined = undefined

    public get barTintColor(): UIColor | undefined {
        return this._barTintColor;
    }

    public set barTintColor(value: UIColor | undefined) {
        this._barTintColor = value;
        if (this.navigationController) {
            this.navigationController.updateBrowserBar()
        }
    }

    constructor() {
        super()
        this.barTintColor = UIColor.white
        this.tintColor = UIColor.black
    }

    tintColorDidChange() {
        super.tintColorDidChange()
        if (this.navigationController) {
            this.navigationController.updateBrowserBar()
        }
    }

}