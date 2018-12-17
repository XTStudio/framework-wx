"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UIFont {
    constructor(pointSize, fontStyle, fontName) {
        this.pointSize = pointSize;
        this.fontStyle = fontStyle;
        this.fontName = fontName;
        if (fontName === undefined) {
            this.fontName = "-apple-system";
        }
    }
}
exports.UIFont = UIFont;
