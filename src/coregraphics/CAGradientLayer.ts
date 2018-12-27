import { CALayer } from "./CALayer";
import { UIColor } from "../uikit/UIColor";
import { UIPoint } from "../uikit/UIPoint";
import { randomUUID } from "../uikit/helpers/UUID";

export class CAGradientLayer extends CALayer {

    private _colors: UIColor[] = []

    public get colors(): UIColor[] {
        return this._colors;
    }

    public set colors(value: UIColor[]) {
        this._colors = value;
        this.markDirty()
    }

    private _locations: number[] = []

    public get locations(): number[] {
        return this._locations;
    }

    public set locations(value: number[]) {
        this._locations = value;
        this.markDirty()
    }

    private _startPoint: UIPoint = { x: 0, y: 0 }

    public get startPoint(): UIPoint {
        return this._startPoint;
    }

    public set startPoint(value: UIPoint) {
        this._startPoint = value;
        this.markDirty()
    }

    private _endPoint: UIPoint = { x: 1, y: 0 }

    public get endPoint(): UIPoint {
        return this._endPoint;
    }

    public set endPoint(value: UIPoint) {
        this._endPoint = value;
        this.markDirty()
    }

    buildStops(): string {
        let value = ""
        let colors = this.colors
        let locations = this.locations.length === this.colors.length ? this.locations : undefined
        if (locations === undefined) {
            colors.forEach((it, idx) => {
                value += `<stop offset="${((idx / colors.length) * 100).toString()}%" stop-color="${this.colors[idx].toStyle()}" />`
            })
        }
        else if (colors.length === locations.length) {
            locations.forEach((it, idx) => {
                value += `<stop offset="${(it * 100).toString()}%" stop-color="${this.colors[idx].toStyle()}" />`
            })
        }
        return value
    }

    buildSVGLayer(): string {
        if (this.hidden) { return "" }
        const uuid = randomUUID()
        return `
        ${this.masksToBounds ? `<clipPath id="clip.${uuid}"><rect rx="${this.cornerRadius}" ry="${this.cornerRadius}" width="${this.frame.width}" height="${this.frame.height}"></rect></clipPath>` : ''}
        <linearGradient x1="${this.startPoint.x}" y="${this.startPoint.y}" x2="${this.endPoint.x}" y2="${this.endPoint.y}" id="filter.${uuid}">${this.buildStops()}</linearGradient>
        <g ${this.masksToBounds ? `clip-path="url(#clip.${uuid})"` : ''} transform="matrix(1,0,0,1,${this.frame.x},${this.frame.y})" style="${this.opacity < 1.0 ? `opacity: ${this.opacity};` : ''}">
            <rect fill="url(#filter.${uuid})" rx="${this.cornerRadius}" ry="${this.cornerRadius}" width="${this.frame.width}" height="${this.frame.height}"></rect>
            ${this.sublayers.map(it => it.buildSVGLayer()).join("")}
            ${this.borderColor && this.borderWidth > 0 ? `
            <rect fill="transparent" style="stroke-width: ${this.borderWidth}; stroke: ${this.borderColor.toStyle()};" rx="${this.cornerRadius}" ry="${this.cornerRadius}" width="${this.frame.width}" height="${this.frame.height}"></rect>
            ` : ''}
        </g>
        `
    }

}