"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UIView_1 = require("./UIView");
class UIActivityIndicatorView extends UIView_1.UIView {
    constructor() {
        super();
        this.clazz = "UIActivityIndicatorView";
        this.color = undefined;
        this._largeStyle = false;
        this.animating = false;
        {
            const size = this.largeStyle ? 88 : 36;
            this.frame = { x: this.frame.x, y: this.frame.y, width: size, height: size };
        }
    }
    get largeStyle() {
        return this._largeStyle;
    }
    set largeStyle(value) {
        this._largeStyle = value;
        this.invalidate();
    }
    startAnimating() {
        this.animating = true;
        this.invalidate();
    }
    stopAnimating() {
        this.animating = false;
        this.invalidate();
    }
    layoutSubviews() {
        super.layoutSubviews();
        this.invalidate();
    }
    buildData() {
        let data = super.buildData();
        data.sizeScale = this.largeStyle ? 3.0 : 1.5;
        data.lineHeight = this.bounds.height;
        data.animating = this.animating;
        return data;
    }
}
exports.UIActivityIndicatorView = UIActivityIndicatorView;
