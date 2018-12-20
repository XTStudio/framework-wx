import { UIFont } from "../UIFont";
import { UIRect, UIRectZero } from "../UIRect";
import { UISize } from "../UISize";
import { UIComponentManager } from "../../components/UIComponentManager";
import { UIAttributedString } from "../UIAttributedString";

export interface TextMeasureParams {

    font: UIFont;
    inRect: UIRect;
    numberOfLines?: number
    letterSpace?: number

}

export class TextMeasurer {

    static measureAttributedText(text: UIAttributedString, inSize: UISize): Promise<UIRect> {
        return new Promise<UIRect>((resolver, rejector) => {
            let measureBlock = () => {
                const keyWindowComponent = UIComponentManager.keyWindowComponent
                if (keyWindowComponent) {
                    keyWindowComponent.setData({
                        measuringText: '',
                        measuringTextStyle: `
                        width: ${inSize.width}px;
                        height: ${inSize.height}px;
                    }`,
                        measuringRichText: text.toHTMLText(),
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
                    return true
                }
                return false
            }
            if (!measureBlock()) {
                let intervalHandler: any = undefined
                let retryCount = 0
                intervalHandler = setInterval(() => {
                    retryCount++
                    if (!measureBlock() && retryCount >= 10) {
                        clearInterval(intervalHandler)
                        rejector && rejector(Error("UIWindow not ready."))
                    }
                    else {
                        clearInterval(intervalHandler)
                    }
                }, 100)
            }
        })
    }

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