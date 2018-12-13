"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UIColor {
    constructor(r, g, b, a) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
    static hexColor(hexValue) {
        const trimedValue = hexValue.replace('#', '');
        if (trimedValue.length === 6) {
            return new UIColor(parseInt(trimedValue.substr(0, 2), 16) / 255.0, parseInt(trimedValue.substr(2, 2), 16) / 255.0, parseInt(trimedValue.substr(4, 2), 16) / 255.0, 1.0);
        }
        else if (trimedValue.length === 8) {
            return new UIColor(parseInt(trimedValue.substr(2, 2), 16) / 255.0, parseInt(trimedValue.substr(4, 2), 16) / 255.0, parseInt(trimedValue.substr(6, 2), 16) / 255.0, parseInt(trimedValue.substr(0, 2), 16) / 255.0);
        }
        else {
            return UIColor.clear;
        }
    }
    colorWithAlphaComponent(value) {
        return new UIColor(this.r, this.g, this.b, this.a * value);
    }
    toStyle() {
        return 'rgba(' + (this.r * 255).toFixed(0) + ', ' + (this.g * 255).toFixed(0) + ', ' + (this.b * 255).toFixed(0) + ', ' + this.a.toFixed(6) + ')';
    }
    static toStyle(color) {
        return 'rgba(' + (color.r * 255).toFixed(0) + ', ' + (color.g * 255).toFixed(0) + ', ' + (color.b * 255).toFixed(0) + ', ' + color.a.toFixed(6) + ')';
    }
}
UIColor.black = new UIColor(0.0, 0.0, 0.0, 1.0);
UIColor.clear = new UIColor(0.0, 0.0, 0.0, 0.0);
UIColor.gray = new UIColor(0.5, 0.5, 0.5, 1.0);
UIColor.red = new UIColor(1.0, 0.0, 0.0, 1.0);
UIColor.yellow = new UIColor(1.0, 1.0, 0.0, 1.0);
UIColor.green = new UIColor(0.0, 1.0, 0.0, 1.0);
UIColor.blue = new UIColor(0.0, 0.0, 1.0, 1.0);
UIColor.white = new UIColor(1.0, 1.0, 1.0, 1.0);
exports.UIColor = UIColor;
