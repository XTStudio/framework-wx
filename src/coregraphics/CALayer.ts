import { UIRect, UIRectZero, UIRectEqualToRect } from "../uikit/UIRect";
import { UIColor } from "../uikit/UIColor";
import { UISize, UISizeEqualToSize } from "../uikit/UISize";
import { UILabel } from "../uikit/UILabel";
import { Data } from "../foundation/Data";
import { randomUUID } from "../uikit/helpers/UUID";

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
        this.markDirty()
    }

    private _hidden: boolean = false

    public get hidden(): boolean {
        if (this._view) {
            return this._view.hidden
        }
        else {
            return this._hidden;
        }
    }

    public set hidden(value: boolean) {
        if (this.hidden === value) { return }
        this._hidden = value;
        if (this._view) {
            this._view.hidden = value
        }
        else {
            this.markDirty()
        }
    }

    _cornerRadius: number = 0.0

    public get cornerRadius(): number {
        return this._cornerRadius;
    }

    public set cornerRadius(value: number) {
        if (this._cornerRadius === value) { return }
        this._cornerRadius = value;
        if (this._view) {
            this._view.invalidate()
        }
        else {
            this.markDirty()
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
        if (this._view) {
            this._view.invalidate()
        }
        else {
            this.markDirty()
        }
    }

    superlayer: CALayer | undefined = undefined

    removeFromSuperlayer() {
        if (this.superlayer) {
            const idx = this.superlayer.sublayers.indexOf(this)
            if (idx >= 0) {
                this.superlayer.sublayers.splice(idx, 1)
            }
            this.superlayer = undefined
            this.markDirty()
        }
    }

    sublayers: CALayer[] = []

    addSublayer(layer: CALayer) {
        if (layer.superlayer !== undefined) {
            layer.removeFromSuperlayer()
        }
        this.sublayers.push(layer)
        layer.superlayer = this
        this.markDirty()
    }

    private _backgroundColor: UIColor | undefined = undefined

    public get backgroundColor(): UIColor | undefined {
        if (this._view) {
            return this._view.backgroundColor
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
        if (this._view) {
            this._view.backgroundColor = value
        }
        else {
            this.markDirty()
        }
    }

    private _opacity: number = 1.0

    public get opacity(): number {
        if (this._view) {
            return this._view.alpha
        }
        else {
            return this._opacity;
        }
    }

    public set opacity(value: number) {
        if (this.opacity === value) { return }
        this._opacity = value;
        if (this._view) {
            this._view.alpha = value
        }
        else {
            this.markDirty()
        }
    }

    private _masksToBounds: boolean = false

    public get masksToBounds(): boolean {
        return this._masksToBounds;
    }

    public set masksToBounds(value: boolean) {
        if (this.masksToBounds === value) { return }
        this._masksToBounds = value;
        if (this._view) {
            this._view.clipsToBounds = value
        }
        else {
            this.markDirty()
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
        if (this._view) {
            this._view.invalidate()
        }
    }

    markDirty() {
        if (this.view) {
            this.view.layer.isDirty = true
            this.view.markFlagDirty("renderLayer", "layerSource")
        }
    }

    // SVG Converter

    private isDirty = false
    private svgCache: string | undefined = undefined

    buildSVG(): string {
        if (this.svgCache && !this.isDirty) {
            return this.svgCache
        }
        this.svgCache = new Data({
            utf8String: `<?xml version="1.0" encoding="utf-8"?>
        <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve">
            ${this.sublayers.map(it => it.buildSVGLayer()).join("")}
        </svg>`}).base64EncodedString()
        this.isDirty = false
        return this.svgCache
    }

    buildSVGLayer(): string {
        if (this.hidden) { return "" }
        const uuid = randomUUID()
        return `
        ${this.masksToBounds ? `<clipPath id="clip.${uuid}"><rect rx="${this.cornerRadius}" ry="${this.cornerRadius}" width="${this.frame.width}" height="${this.frame.height}"></rect></clipPath>` : ''}
        <g ${this.masksToBounds ? `clip-path="url(#clip.${uuid})"` : ''} transform="matrix(1,0,0,1,${this.frame.x},${this.frame.y})" style="${this.opacity < 1.0 ? `opacity: ${this.opacity};` : ''}">
            ${this.backgroundColor ? `
            <rect fill="${this.backgroundColor.toStyle()}" rx="${this.cornerRadius}" ry="${this.cornerRadius}" width="${this.frame.width}" height="${this.frame.height}"></rect>
            ` : ''}
            ${this.sublayers.map(it => it.buildSVGLayer()).join("")}
            ${this.borderColor && this.borderWidth > 0 ? `
            <rect fill="transparent" style="stroke-width: ${this.borderWidth}; stroke: ${this.borderColor.toStyle()};" rx="${this.cornerRadius}" ry="${this.cornerRadius}" width="${this.frame.width}" height="${this.frame.height}"></rect>
            ` : ''}
        </g>
        `
    }

}