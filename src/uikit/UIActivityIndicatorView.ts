import { UIView } from "./UIView";
import { UIColor } from "./UIColor";

export class UIActivityIndicatorView extends UIView {

    clazz = "UIActivityIndicatorView"

    color: UIColor | undefined = undefined

    private _largeStyle: boolean = false

    public get largeStyle(): boolean {
        return this._largeStyle;
    }

    public set largeStyle(value: boolean) {
        this._largeStyle = value;
        this.invalidate()
    }

    constructor() {
        super()
        {
            const size = this.largeStyle ? 88 : 36
            this.frame = { x: this.frame.x, y: this.frame.y, width: size, height: size }
        }

    }

    animating: boolean = false

    startAnimating(): void {
        this.animating = true
        this.invalidate()
    }

    stopAnimating(): void {
        this.animating = false
        this.invalidate()
    }

    layoutSubviews() {
        super.layoutSubviews()
        this.invalidate()
    }

    buildExtras() {
        let data = super.buildExtras()
        data.sizeScale = this.largeStyle ? 3.0 : 1.5
        data.lineHeight = this.bounds.height
        data.animating = this.animating
        return data
    }

}