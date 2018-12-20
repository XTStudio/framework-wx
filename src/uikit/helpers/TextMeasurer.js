"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UIComponentManager_1 = require("../../components/UIComponentManager");
class TextMeasurer {
    static measureAttributedText(text, inSize) {
        return new Promise((resolver, rejector) => {
            let measureBlock = () => {
                const keyWindowComponent = UIComponentManager_1.UIComponentManager.keyWindowComponent;
                if (keyWindowComponent) {
                    keyWindowComponent.setData({
                        measuringText: '',
                        measuringTextStyle: `
                        width: ${inSize.width}px;
                        height: ${inSize.height}px;
                    }`,
                        measuringRichText: text.toHTMLText(),
                    }, () => {
                        const q = wx.createSelectorQuery().in(keyWindowComponent);
                        q.select('#_text_measurer').boundingClientRect(function (res) {
                            if (res) {
                                resolver({ x: 0, y: 0, width: res.width, height: res.height });
                            }
                            else {
                                rejector(Error("TextMeasurer error."));
                            }
                        });
                        q.exec();
                    });
                    return true;
                }
                return false;
            };
            if (!measureBlock()) {
                let intervalHandler = undefined;
                let retryCount = 0;
                intervalHandler = setInterval(() => {
                    retryCount++;
                    if (!measureBlock() && retryCount >= 10) {
                        clearInterval(intervalHandler);
                        rejector && rejector(Error("UIWindow not ready."));
                    }
                    else {
                        clearInterval(intervalHandler);
                    }
                }, 100);
            }
        });
    }
    static measureText(text, params) {
        return new Promise((resolver, rejector) => {
            const keyWindowComponent = UIComponentManager_1.UIComponentManager.keyWindowComponent;
            if (keyWindowComponent) {
                keyWindowComponent.setData({
                    measuringRichText: "",
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
                            `;
                        }
                        else {
                            return `
                            overflow: hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            webkit-box-orient: vertical;
                            `;
                        }
                    })()};
                    width: ${params.inRect.width}px;
                    height: ${params.inRect.height}px;
                }`,
                }, () => {
                    const q = wx.createSelectorQuery().in(keyWindowComponent);
                    q.select('#_text_measurer').boundingClientRect(function (res) {
                        if (res) {
                            resolver({ x: 0, y: 0, width: res.width, height: res.height });
                        }
                        else {
                            rejector(Error("TextMeasurer error."));
                        }
                    });
                    q.exec();
                });
            }
        });
    }
}
exports.TextMeasurer = TextMeasurer;
