import { CALayer } from "./CALayer";
import { UIColor } from "../uikit/UIColor";
import { UIBezierPath } from "../uikit/UIBezierPath";

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

    constructor() {
        super()
        console.log("微信小程序暂时不支持 CAShapeLayer");
    }

}