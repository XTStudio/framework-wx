"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UIView_1 = require("./UIView");
const UIFont_1 = require("./UIFont");
const UIEnums_1 = require("./UIEnums");
const UIColor_1 = require("./UIColor");
const UIEdgeInsets_1 = require("./UIEdgeInsets");
const UITapGestureRecognizer_1 = require("./UITapGestureRecognizer");
const UILongPressGestureRecognizer_1 = require("./UILongPressGestureRecognizer");
const UILabel_1 = require("./UILabel");
const UIImageView_1 = require("./UIImageView");
class UIButton extends UIView_1.UIView {
    constructor(isCustom = false) {
        super();
        this.isCustom = isCustom;
        this.clazz = "UIButton";
        this.titleLabel = new UILabel_1.UILabel;
        this.imageView = new UIImageView_1.UIImageView;
        this._enabled = true;
        this._selected = false;
        this._highlighted = false;
        this.contentAlpha = 1.0;
        this._tracking = false;
        this._touchInside = false;
        this._contentVerticalAlignment = UIEnums_1.UIControlContentVerticalAlignment.center;
        this._contentHorizontalAlignment = UIEnums_1.UIControlContentHorizontalAlignment.center;
        // setAttributedTitle(title: UIAttributedString | undefined, state: number) {
        //     if (this.statedAttributedTitles[state] === title) { return }
        //     if (title) {
        //         this.statedAttributedTitles[state] = title
        //     }
        //     else {
        //         delete this.statedAttributedTitles[state]
        //     }
        //     this.reloadContents()
        // }
        this._contentEdgeInsets = UIEdgeInsets_1.UIEdgeInsetsZero;
        this._titleEdgeInsets = UIEdgeInsets_1.UIEdgeInsetsZero;
        this._imageEdgeInsets = UIEdgeInsets_1.UIEdgeInsetsZero;
        // implements
        this.statedTitles = {};
        // private statedAttributedTitles: { [key: number]: UIAttributedString } = {}
        this.statedTitleColors = {};
        this.statedImages = {};
        this.isTextDirty = true;
        this.isImageDirty = true;
        this.isHighlightDirty = true;
        this.isLayoutDirty = true;
        this.titleLabel.font = new UIFont_1.UIFont(17.0);
        this.setupTouches();
    }
    get enabled() {
        return this._enabled;
    }
    set enabled(value) {
        if (this._enabled === value) {
            return;
        }
        this._enabled = value;
        this.gestureRecognizers.forEach(it => {
            it.enabled = value;
        });
        this.reloadContents();
    }
    get selected() {
        return this._selected;
    }
    set selected(value) {
        if (this._selected === value) {
            return;
        }
        this._selected = value;
        this.reloadContents();
    }
    get highlighted() {
        return this._highlighted;
    }
    set highlighted(value) {
        if (this._highlighted === value) {
            return;
        }
        this._highlighted = value;
        this.reloadContents();
        this.invalidateHighlight();
    }
    get tracking() {
        return this._tracking;
    }
    set tracking(value) {
        if (this._tracking === value) {
            return;
        }
        this._tracking = value;
        this.reloadContents();
    }
    get touchInside() {
        return this._touchInside;
    }
    set touchInside(value) {
        if (this._touchInside === value) {
            return;
        }
        this._touchInside = value;
        this.reloadContents();
    }
    get contentVerticalAlignment() {
        return this._contentVerticalAlignment;
    }
    set contentVerticalAlignment(value) {
        if (this._contentVerticalAlignment === value) {
            return;
        }
        this._contentVerticalAlignment = value;
        this.reloadContents();
    }
    get contentHorizontalAlignment() {
        return this._contentHorizontalAlignment;
    }
    set contentHorizontalAlignment(value) {
        if (this._contentHorizontalAlignment === value) {
            return;
        }
        this._contentHorizontalAlignment = value;
        this.reloadContents();
    }
    setTitle(title, state) {
        if (this.statedTitles[state] === title) {
            return;
        }
        if (title) {
            this.statedTitles[state] = title;
        }
        else {
            delete this.statedTitles[state];
        }
        this.reloadContents();
    }
    setTitleColor(color, state) {
        if (this.statedTitleColors[state] === color) {
            return;
        }
        if (color) {
            this.statedTitleColors[state] = color;
        }
        else {
            delete this.statedTitleColors[state];
        }
        this.reloadContents();
    }
    setTitleFont(font) {
        this.titleLabel.font = font;
        this.invalidateText();
    }
    setImage(image, state) {
        if (this.statedImages[state] === image) {
            return;
        }
        if (image) {
            this.statedImages[state] = image;
        }
        else {
            delete this.statedImages[state];
        }
        this.reloadContents();
    }
    get contentEdgeInsets() {
        return this._contentEdgeInsets;
    }
    set contentEdgeInsets(value) {
        if (UIEdgeInsets_1.UIEdgeInsetsEqualToEdgeInsets(this._contentEdgeInsets, value)) {
            return;
        }
        this._contentEdgeInsets = value;
        this.invalidateLayout();
    }
    get titleEdgeInsets() {
        return this._titleEdgeInsets;
    }
    set titleEdgeInsets(value) {
        if (UIEdgeInsets_1.UIEdgeInsetsEqualToEdgeInsets(this._titleEdgeInsets, value)) {
            return;
        }
        this._titleEdgeInsets = value;
        this.invalidateLayout();
    }
    get imageEdgeInsets() {
        return this._imageEdgeInsets;
    }
    set imageEdgeInsets(value) {
        if (UIEdgeInsets_1.UIEdgeInsetsEqualToEdgeInsets(this._imageEdgeInsets, value)) {
            return;
        }
        this._imageEdgeInsets = value;
        this.invalidateLayout();
    }
    setupTouches() {
        this.addGestureRecognizer(new UITapGestureRecognizer_1.UITapGestureRecognizer().on("touch", () => {
            this.emit("touchUpInside", this);
        }));
        const longPressGesture = new UILongPressGestureRecognizer_1.UILongPressGestureRecognizer();
        longPressGesture.on("began", () => {
            this.tracking = true;
            this.highlighted = true;
            this.emit("touchDown", this);
        });
        longPressGesture.on("changed", (sender) => {
            const location = sender.locationInView(undefined);
            const inside = this.highlightedPointInside(location);
            if (this.touchInside != inside) {
                if (inside) {
                    this.emit("touchDragEnter", this);
                }
                else {
                    this.emit("touchDragExit", this);
                }
            }
            this.touchInside = inside;
            this.highlighted = this.touchInside;
            if (inside) {
                this.emit("touchDragInside", this);
            }
            else {
                this.emit("touchDragOutside", this);
            }
        });
        longPressGesture.on("ended", (sender) => {
            this.highlighted = false;
            this.tracking = false;
            const location = sender.locationInView(undefined);
            const inside = this.highlightedPointInside(location);
            if (inside) {
                this.emit("touchUpInside", this);
            }
            else {
                this.emit("touchUpOutside", this);
            }
        });
        longPressGesture.on("cancelled", () => {
            this.highlighted = false;
            this.tracking = false;
            this.emit("touchCancel", this);
        });
        longPressGesture.minimumPressDuration = 0.05;
        this.addGestureRecognizer(longPressGesture);
    }
    tintColorDidChange() {
        super.tintColorDidChange();
        this.reloadContents();
    }
    reloadContents() {
        if (this.titleLabel.text !== this.titleForState(this.currentState())) {
            this.titleLabel.text = this.titleForState(this.currentState());
            this.invalidateText();
        }
        if (this.titleLabel.textColor !== this.titleColorForState(this.currentState())) {
            this.titleLabel.textColor = this.titleColorForState(this.currentState());
            this.invalidateText();
        }
        if (this.imageView.image !== this.imageForState(this.currentState())) {
            this.imageView.image = this.imageForState(this.currentState());
            this.invalidateImgae();
        }
        if (!this.isCustom) {
            this.contentAlpha = this.highlighted ? 0.3 : 1.0;
        }
    }
    currentState() {
        var state = UIEnums_1.UIControlState.normal;
        if (!this.enabled) {
            state = state | UIEnums_1.UIControlState.disabled;
        }
        if (this.selected) {
            state = state | UIEnums_1.UIControlState.selected;
        }
        if (this.highlighted) {
            state = state | UIEnums_1.UIControlState.highlighted;
        }
        return state;
    }
    imageForState(state) {
        if (this.statedImages[state] !== undefined) {
            return this.statedImages[state];
        }
        return this.statedImages[0];
    }
    titleForState(state) {
        if (this.statedTitles[state] !== undefined) {
            return this.statedTitles[state];
        }
        return this.statedTitles[0];
    }
    // private attributedTitleForState(state: number): UIAttributedString | undefined {
    //     if (this.statedAttributedTitles[state] !== undefined) {
    //         return this.statedAttributedTitles[state]
    //     }
    //     return this.statedAttributedTitles[0]
    // }
    titleColorForState(state) {
        if (this.statedTitleColors[state] !== undefined) {
            return this.statedTitleColors[state];
        }
        if (this.statedTitleColors[0] !== undefined) {
            return this.statedTitleColors[0];
        }
        if (state == UIEnums_1.UIControlState.disabled) {
            return UIColor_1.UIColor.gray.colorWithAlphaComponent(0.75);
        }
        else {
            return this.tintColor || UIColor_1.UIColor.black;
        }
    }
    highlightedPointInside(point) {
        return point.x >= -22.0 && point.y >= -22.0 && point.x <= this.frame.width + 22.0 && point.y <= this.frame.height + 22.0;
    }
    invalidateText() {
        this.isTextDirty = true;
        this.invalidate();
    }
    invalidateImgae() {
        this.isImageDirty = true;
        this.invalidate();
    }
    invalidateHighlight() {
        this.isHighlightDirty = true;
        this.invalidate();
    }
    invalidateLayout() {
        this.isLayoutDirty = true;
        this.invalidate();
    }
    buildExtras() {
        let data = super.buildExtras();
        if (this.isTextDirty) {
            data.text = this.titleLabel.text || "";
            data.textStyle = `
            color: ${this.titleLabel.textColor !== undefined ? UIColor_1.UIColor.toStyle(this.titleLabel.textColor) : "black"};
            font-size: ${this.titleLabel.font !== undefined ? this.titleLabel.font.pointSize : 14}px;
            font-family: ${this.titleLabel.font !== undefined ? this.titleLabel.font.fontName : ""}; 
            font-weight: ${this.titleLabel.font !== undefined ? this.titleLabel.font.fontStyle : ""}; 
            font-style: ${this.titleLabel.font !== undefined ? this.titleLabel.font.fontStyle : ""}; 
            `;
            data.textHeight = this.bounds.height;
        }
        if (this.isImageDirty) {
            data.imageSource = this.imageView.image ? this.imageView.image.imageSource : null;
        }
        if (this.isHighlightDirty) {
            if (this.isTextDirty) {
                setTimeout(() => {
                    this.invalidateHighlight();
                }, 0);
            }
            else {
                data.contentAlphaAnimation = wx.createAnimation({ duration: 100, timingFunction: "linear" }).opacity(this.contentAlpha).step().export();
            }
        }
        if (this.isLayoutDirty) {
            data.imageMargin = {
                top: this.imageEdgeInsets.top + this.contentEdgeInsets.top,
                left: this.imageEdgeInsets.left + this.contentEdgeInsets.left,
                bottom: this.imageEdgeInsets.bottom + this.contentEdgeInsets.bottom,
                right: this.imageEdgeInsets.right + this.contentEdgeInsets.right,
            };
            data.titleMargin = {
                top: this.titleEdgeInsets.top + this.contentEdgeInsets.top,
                left: this.titleEdgeInsets.left + this.contentEdgeInsets.left,
                bottom: this.titleEdgeInsets.bottom + this.contentEdgeInsets.bottom,
                right: this.titleEdgeInsets.right + this.contentEdgeInsets.right,
            };
        }
        return data;
    }
    markAllFlagsDirty() {
        super.markAllFlagsDirty();
        this.isTextDirty = true;
        this.isImageDirty = true;
        this.isHighlightDirty = false;
        this.isLayoutDirty = true;
    }
    clearDirtyFlags() {
        super.clearDirtyFlags();
        this.isTextDirty = false;
        this.isImageDirty = false;
        this.isHighlightDirty = false;
        this.isLayoutDirty = false;
    }
    layoutSubviews() {
        super.layoutSubviews();
        this.invalidateText();
    }
}
exports.UIButton = UIButton;
