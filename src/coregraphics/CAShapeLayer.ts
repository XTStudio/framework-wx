import { CALayer } from "./CALayer";
import { UIColor } from "../uikit/UIColor";
import { UIBezierPath } from "../uikit/UIBezierPath";
import { randomUUID } from "../uikit/helpers/UUID";

export enum CAShapeFillRule {
    nonZero,
    evenOdd,
}

export enum CAShapeLineCap {
    butt,
    round,
    square,
}

export enum CAShapeLineJoin {
    miter,
    round,
    bevel,
}

export class CAShapeLayer extends CALayer {

    private _path: UIBezierPath | undefined = undefined

    public get path(): UIBezierPath | undefined {
        return this._path;
    }

    public set path(value: UIBezierPath | undefined) {
        this._path = value;
        this.markDirty()
    }

    private _fillColor: UIColor | undefined = undefined

    public get fillColor(): UIColor | undefined {
        return this._fillColor;
    }

    public set fillColor(value: UIColor | undefined) {
        this._fillColor = value;
        this.markDirty()
    }

    private _fillRule: CAShapeFillRule = CAShapeFillRule.evenOdd

    public get fillRule(): CAShapeFillRule {
        return this._fillRule;
    }

    public set fillRule(value: CAShapeFillRule) {
        this._fillRule = value;
        this.markDirty()
    }

    private _lineCap: CAShapeLineCap = CAShapeLineCap.butt

    public get lineCap(): CAShapeLineCap {
        return this._lineCap;
    }

    public set lineCap(value: CAShapeLineCap) {
        this._lineCap = value;
        this.markDirty()
    }

    private _lineDashPattern: number[] = []

    public get lineDashPattern(): number[] {
        return this._lineDashPattern;
    }

    public set lineDashPattern(value: number[]) {
        this._lineDashPattern = value;
        this.markDirty()
    }

    private _lineDashPhase: number = 0.0

    public get lineDashPhase(): number {
        return this._lineDashPhase;
    }

    public set lineDashPhase(value: number) {
        this._lineDashPhase = value;
        this.markDirty()
    }

    private _lineJoin: CAShapeLineJoin = CAShapeLineJoin.miter

    public get lineJoin(): CAShapeLineJoin {
        return this._lineJoin;
    }

    public set lineJoin(value: CAShapeLineJoin) {
        this._lineJoin = value;
        this.markDirty()
    }

    private _lineWidth: number = 0.0

    public get lineWidth(): number {
        return this._lineWidth;
    }

    public set lineWidth(value: number) {
        this._lineWidth = value;
        this.markDirty()
    }

    private _miterLimit: number = 10.0

    public get miterLimit(): number {
        return this._miterLimit;
    }

    public set miterLimit(value: number) {
        this._miterLimit = value;
        this.markDirty()
    }

    private _strokeColor: UIColor | undefined = undefined

    public get strokeColor(): UIColor | undefined {
        return this._strokeColor;
    }

    public set strokeColor(value: UIColor | undefined) {
        this._strokeColor = value;
        this.markDirty()
    }

    strokeStart: number = 0.0 // todo: not support

    strokeEnd: number = 1.0 // todo: not support

    buildFillRule() {
        if (this.fillRule == CAShapeFillRule.evenOdd) {
            return "evenodd"
        }
        else if (this.fillRule == CAShapeFillRule.nonZero) {
            return "nonzero"
        }
        else {
            return ""
        }
    }

    buildLineCap() {
        switch (this.lineCap) {
            case CAShapeLineCap.butt:
                return "butt"
            case CAShapeLineCap.round:
                return "round"
            case CAShapeLineCap.square:
                return "square"
        }
    }

    buildLineJoin() {
        switch (this.lineJoin) {
            case CAShapeLineJoin.miter:
                return "miter"
            case CAShapeLineJoin.bevel:
                return "bevel"
            case CAShapeLineJoin.round:
                return "round"
        }
    }

    buildSVGLayer(): string {
        if (this.hidden) { return "" }
        const uuid = randomUUID()
        return `
        <g transform="matrix(1,0,0,1,${this.frame.x},${this.frame.y})" style="${this.opacity < 1.0 ? `opacity: ${this.opacity};` : ''}">
            <path ${this.path ? `d="${this.path.d3Paths.map((it: any) => { return it.toString() }).join(" ")}"` : ''} style="fill: ${this.fillColor ? this.fillColor.toStyle() : 'black'}; fill-rule: ${this.buildFillRule()}; stroke-linecap: ${this.buildLineCap()}; stroke-dasharray: ${this.lineDashPattern.join(" ")}; stroke-dashoffset: ${this.lineDashPhase.toString()}; stroke-linejoin: ${this.buildLineJoin()}; stroke-width: ${this.lineWidth}; stroke-miterlimit: ${this.miterLimit}; stroke: ${this.strokeColor ? this.strokeColor.toStyle() : ''};"></path>
            ${this.sublayers.map(it => it.buildSVGLayer()).join("")}
        </g>
        `
    }

}