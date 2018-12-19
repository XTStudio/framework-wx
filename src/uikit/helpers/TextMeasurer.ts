import { UIFont } from "../UIFont";
import { UIRect, UIRectZero } from "../UIRect";
// import { UIAttributedString } from "../UIAttributedString";
import { UISize } from "../UISize";
import { UIComponentManager } from "../../components/UIComponentManager";

export interface TextMeasureParams {

    font: UIFont;
    inRect: UIRect;
    numberOfLines?: number
    letterSpace?: number

}

export class TextMeasurer {

    // static measureAttributedText(text: UIAttributedString, inSize: UISize): UIRect {
    //     if (!(document.body instanceof HTMLBodyElement)) { return UIRectZero }
    //     if (measureSpan.parentNode === null) {
    //         measureSpan.style.opacity = "0.0"
    //         measureSpan.style.position = "absolute"
    //         measureSpan.style.left = "-10000000px"
    //         measureSpan.style.top = "-10000000px"
    //         document.body.appendChild(measureSpan);
    //     }
    //     else {
    //         measureSpan.innerHTML = ''
    //         measureSpan.setAttribute("style", "")
    //         measureSpan.style.opacity = "0.0"
    //         measureSpan.style.position = "absolute"
    //         measureSpan.style.left = "-10000000px"
    //         measureSpan.style.top = "-10000000px"
    //     }
    //     measureSpan.style.overflow = "hidden"
    //     measureSpan.style.wordWrap = null;
    //     measureSpan.style.wordBreak = null;
    //     measureSpan.style.display = "-webkit-box";
    //     measureSpan.style.webkitBoxOrient = "vertical"
    //     measureSpan.style.maxWidth = inSize.width.toString() + "px";
    //     measureSpan.appendChild(text.toHTMLText())
    //     return { x: 0.0, y: 0.0, width: Math.min(inSize.width, Math.ceil(measureSpan.offsetWidth + 1)), height: Math.min(inSize.height, Math.ceil(measureSpan.offsetHeight)) }
    // }

    static measureText(text: string, params: TextMeasureParams): Promise<UIRect> {
        return new Promise<UIRect>((resolver, rejector) => {
            const keyWindowComponent = UIComponentManager.keyWindowComponent
            if (keyWindowComponent) {
                keyWindowComponent.setData({
                    measuringText: text,
                    measuringTextStyle: `
                    font-size: ${params.font !== undefined ? params.font.pointSize : 14}px;
                    font-family: ${params.font !== undefined ? params.font.fontName : ""}; 
                    font-weight: ${params.font !== undefined ? params.font.fontStyle : ""}; 
                    font-style: ${params.font !== undefined ? params.font.fontStyle : ""}; 
                    ${(() => {
                            if (params.numberOfLines === 1) {
                                return `
                            overflow: hidden;
                            text-overflow: ellipsis;
                            display: inline-block;
                            white-space: nowrap;
                            `
                            }
                            else {
                                return `
                            overflow: hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            webkit-box-orient: vertical;
                            `
                            }
                        })()};
                    width: ${params.inRect.width}px;
                    height: ${params.inRect.height}px;
                }`,
                }, () => {
                    const q = (wx.createSelectorQuery() as any).in(keyWindowComponent)
                    q.select('#_text_measurer').boundingClientRect(function (res: any) {
                        if (res) {
                            resolver({ x: 0, y: 0, width: res.width, height: res.height })
                        }
                        else {
                            rejector(Error("TextMeasurer error."))
                        }
                    })
                    q.exec()
                })
            }
        })
    }

}