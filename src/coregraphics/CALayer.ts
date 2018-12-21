import { UIRect, UIRectZero, UIRectEqualToRect } from "../uikit/UIRect";
import { UIColor } from "../uikit/UIColor";
import { UISize, UISizeEqualToSize } from "../uikit/UISize";
import { UILabel } from "../uikit/UILabel";

export class CALayer {

    private _view: any | undefined = undefined

    public get view(): any | undefined {
        if (this.superlayer) {
            return this.superlayer._view
        }
        return this._view
    }

    public set view(value: any | undefined) {
        this._view = value
    }

    private _frame: UIRect = UIRectZero

    public get frame(): UIRect {
        return this._frame;
    }

    public set frame(value: UIRect) {
        if (UIRectEqualToRect(this._frame, value)) { return }
        this._frame = value;
    }

    private _hidden: boolean = false

    public get hidden(): boolean {
        if (this._view.get()) {
            return this._view.get().hidden
        }
        else {
            return this._hidden;
        }
    }

    public set hidden(value: boolean) {
        if (this.hidden === value) { return }
        this._hidden = value;
        if (this._view.get()) {
            this._view.get().hidden = value
        }
        else {

        }
    }

    _cornerRadius: number = 0.0

    public get cornerRadius(): number {
        return this._cornerRadius;
    }

    public set cornerRadius(value: number) {
        if (this._cornerRadius === value) { return }
        this._cornerRadius = value;
        if (this._view.get()) {
            this._view.get().invalidate()
        }
        else {

        }
    }

    private _borderWidth: number = 0.0

    public get borderWidth(): number {
        return this._borderWidth;
    }

    public set borderWidth(value: number) {
        if (this._borderWidth === value) { return }
        this._borderWidth = value;
        this.resetBorder()
    }

    private _borderColor: UIColor | undefined = undefined

    public get borderColor(): UIColor | undefined {
        return this._borderColor;
    }

    public set borderColor(value: UIColor | undefined) {
        if (this._borderColor === value) { return }
        if (this._borderColor !== undefined && value !== undefined) {
            if (this._borderColor.toStyle() === value.toStyle()) { return }
        }
        this._borderColor = value;
        this.resetBorder()
    }

    private resetBorder() {
        if (this._view.get()) {
            this._view.get().invalidate()
        }
        else {

        }
    }

    private moveBorderElementToFront() {

    }

    superlayer: CALayer | undefined = undefined

    removeFromSuperlayer() {
        if (this.superlayer) {
            const idx = this.superlayer.sublayers.indexOf(this)
            if (idx >= 0) {
                this.superlayer.sublayers.splice(idx, 1)
            }
            this.superlayer = undefined
        }
    }

    sublayers: CALayer[] = []

    addSublayer(layer: CALayer) {
        if (layer.superlayer !== undefined) {
            layer.removeFromSuperlayer()
        }
        this.sublayers.push(layer)
        layer.superlayer = this
        this.createSVGElement()
        layer.createSVGElement()
    }

    protected createSVGElement() {

    }

    private _backgroundColor: UIColor | undefined = undefined

    public get backgroundColor(): UIColor | undefined {
        if (this._view.get()) {
            return this._view.get().backgroundColor
        }
        else {
            return this._backgroundColor;
        }
    }

    public set backgroundColor(value: UIColor | undefined) {
        if (this.backgroundColor === value) { return }
        if (this.backgroundColor !== undefined && value !== undefined) {
            if (this.backgroundColor.toStyle() === value.toStyle()) { return }
        }
        this._backgroundColor = value;
        if (this._view.get()) {
            this._view.get().backgroundColor = value
        }
        else {

        }
    }

    private _opacity: number = 1.0

    public get opacity(): number {
        if (this._view.get()) {
            return this._view.get().alpha
        }
        else {
            return this._opacity;
        }
    }

    public set opacity(value: number) {
        if (this.opacity === value) { return }
        this._opacity = value;
        if (this._view.get()) {
            this._view.get().alpha = value
        }
        else {

        }
    }

    private _masksToBounds: boolean = false

    public get masksToBounds(): boolean {
        return this._masksToBounds;
    }

    public set masksToBounds(value: boolean) {
        if (this.masksToBounds === value) { return }
        this._masksToBounds = value;
        if (this._view.get()) {
            this._view.get().clipsToBounds = value
        }
        else {

        }
    }

    private _shadowColor: UIColor | undefined = undefined;

    public get shadowColor(): UIColor | undefined {
        return this._shadowColor
    }

    public set shadowColor(value: UIColor | undefined) {
        if (this.shadowColor === value) { return }
        if (this.shadowColor !== undefined && value !== undefined) {
            if (this.shadowColor.toStyle() === value.toStyle()) { return }
        }
        this._shadowColor = value;
        this.resetShadow()
    }

    private _shadowOpacity: number = 0.0

    public get shadowOpacity(): number {
        return this._shadowOpacity;
    }

    public set shadowOpacity(value: number) {
        if (this.shadowOpacity === value) { return }
        this._shadowOpacity = value;
        this.resetShadow()
    }

    private _shadowOffset: UISize = { width: 0, height: -3 }

    public get shadowOffset(): UISize {
        return this._shadowOffset;
    }

    public set shadowOffset(value: UISize) {
        if (UISizeEqualToSize(this.shadowOffset, value)) { return }
        this._shadowOffset = value;
        this.resetShadow()
    }

    private _shadowRadius = 3.0

    public get shadowRadius(): number {
        return this._shadowRadius;
    }

    public set shadowRadius(value: number) {
        if (this.shadowRadius === value) { return }
        this._shadowRadius = value;
        this.resetShadow()
    }

    private resetShadow() {
        if (this._view.get()) {
            this._view.get().invalidate()
        }
    }

}