import { UIView } from "./UIView";
import { UIFont } from "./UIFont";
import { UIControlContentVerticalAlignment, UIControlContentHorizontalAlignment, UIControlState } from "./UIEnums";
import { UIColor } from "./UIColor";
import { UIImage } from "./UIImage";
import { UIEdgeInsetsZero, UIEdgeInsets, UIEdgeInsetsEqualToEdgeInsets } from "./UIEdgeInsets";
import { UITapGestureRecognizer } from "./UITapGestureRecognizer";
import { UILongPressGestureRecognizer } from "./UILongPressGestureRecognizer";
import { UIAnimator } from "./UIAnimator";
import { UISizeZero } from "./UISize";
import { UIPoint } from "./UIPoint";
import { UILabel } from "./UILabel";
import { UIImageView } from "./UIImageView";

export class UIButton extends UIView {

    clazz = "UIButton"

    titleLabel: UILabel = new UILabel
    imageView: UIImageView = new UIImageView

    constructor(readonly isCustom: boolean = false) {
        super()
        this.titleLabel.font = new UIFont(17.0)
        this.setupTouches()
    }

    private _enabled: boolean = true

    public get enabled(): boolean {
        return this._enabled;
    }

    public set enabled(value: boolean) {
        if (this._enabled === value) { return }
        this._enabled = value
        this.gestureRecognizers.forEach(it => {
            it.enabled = value
        })
        this.reloadContents()
    }

    private _selected: boolean = false

    public get selected(): boolean {
        return this._selected;
    }

    public set selected(value: boolean) {
        if (this._selected === value) { return }
        this._selected = value;
        this.reloadContents()
    }

    private _highlighted: boolean = false
    private contentAlpha = 1.0

    public get highlighted(): boolean {
        return this._highlighted;
    }

    public set highlighted(value: boolean) {
        if (this._highlighted === value) { return }
        this._highlighted = value;
        this.reloadContents()
        this.markFlagDirty("contentAlphaAnimation")
    }

    private _tracking: boolean = false

    public get tracking(): boolean {
        return this._tracking;
    }

    public set tracking(value: boolean) {
        if (this._tracking === value) { return }
        this._tracking = value;
        this.reloadContents()
    }

    private _touchInside: boolean = false

    public get touchInside(): boolean {
        return this._touchInside;
    }

    public set touchInside(value: boolean) {
        if (this._touchInside === value) { return }
        this._touchInside = value;
        this.reloadContents()
    }

    private _contentVerticalAlignment: UIControlContentVerticalAlignment = UIControlContentVerticalAlignment.center

    public get contentVerticalAlignment(): UIControlContentVerticalAlignment {
        return this._contentVerticalAlignment;
    }

    public set contentVerticalAlignment(value: UIControlContentVerticalAlignment) {
        if (this._contentVerticalAlignment === value) { return }
        this._contentVerticalAlignment = value;
        this.reloadContents()
    }

    private _contentHorizontalAlignment: UIControlContentHorizontalAlignment = UIControlContentHorizontalAlignment.center

    public get contentHorizontalAlignment(): UIControlContentHorizontalAlignment {
        return this._contentHorizontalAlignment;
    }

    public set contentHorizontalAlignment(value: UIControlContentHorizontalAlignment) {
        if (this._contentHorizontalAlignment === value) { return }
        this._contentHorizontalAlignment = value;
        this.reloadContents()
    }

    setTitle(title: string | undefined, state: number) {
        if (this.statedTitles[state] === title) { return }
        if (title) {
            this.statedTitles[state] = title
        }
        else {
            delete this.statedTitles[state]
        }
        this.reloadContents()
    }

    setTitleColor(color: UIColor | undefined, state: number) {
        if (this.statedTitleColors[state] === color) { return }
        if (color) {
            this.statedTitleColors[state] = color
        }
        else {
            delete this.statedTitleColors[state]
        }
        this.reloadContents()
    }

    setTitleFont(font: UIFont) {
        this.titleLabel.font = font
        this.markFlagDirty("textStyle")
    }

    setImage(image: UIImage | undefined, state: number) {
        if (this.statedImages[state] === image) { return }
        if (image) {
            this.statedImages[state] = image
        }
        else {
            delete this.statedImages[state]
        }
        this.reloadContents()
    }

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

    private _contentEdgeInsets: UIEdgeInsets = UIEdgeInsetsZero

    public get contentEdgeInsets(): UIEdgeInsets {
        return this._contentEdgeInsets;
    }

    public set contentEdgeInsets(value: UIEdgeInsets) {
        if (UIEdgeInsetsEqualToEdgeInsets(this._contentEdgeInsets, value)) { return }
        this._contentEdgeInsets = value;
        this.markFlagDirty("titleMargin")
        this.markFlagDirty("imageMargin")
    }

    private _titleEdgeInsets: UIEdgeInsets = UIEdgeInsetsZero

    public get titleEdgeInsets(): UIEdgeInsets {
        return this._titleEdgeInsets;
    }

    public set titleEdgeInsets(value: UIEdgeInsets) {
        if (UIEdgeInsetsEqualToEdgeInsets(this._titleEdgeInsets, value)) { return }
        this._titleEdgeInsets = value;
        this.markFlagDirty("titleMargin")
    }

    private _imageEdgeInsets: UIEdgeInsets = UIEdgeInsetsZero

    public get imageEdgeInsets(): UIEdgeInsets {
        return this._imageEdgeInsets;
    }

    public set imageEdgeInsets(value: UIEdgeInsets) {
        if (UIEdgeInsetsEqualToEdgeInsets(this._imageEdgeInsets, value)) { return }
        this._imageEdgeInsets = value;
        this.markFlagDirty("imageMargin")
    }

    // implements

    private statedTitles: { [key: number]: string } = {}
    // private statedAttributedTitles: { [key: number]: UIAttributedString } = {}
    private statedTitleColors: { [key: number]: UIColor } = {}
    private statedImages: { [key: number]: UIImage } = {}

    private setupTouches() {
        this.addGestureRecognizer(new UITapGestureRecognizer().on("touch", () => {
            this.emit("touchUpInside", this)
        }))
        const longPressGesture = new UILongPressGestureRecognizer()
        longPressGesture.on("began", () => {
            this.tracking = true
            this.highlighted = true
            this.emit("touchDown", this)
        })
        longPressGesture.on("changed", (sender: UILongPressGestureRecognizer) => {
            const location = sender.locationInView(undefined)
            const inside = this.highlightedPointInside(location)
            if (this.touchInside != inside) {
                if (inside) {
                    this.emit("touchDragEnter", this)
                }
                else {
                    this.emit("touchDragExit", this)
                }
            }
            this.touchInside = inside
            this.highlighted = this.touchInside
            if (inside) {
                this.emit("touchDragInside", this)
            }
            else {
                this.emit("touchDragOutside", this)
            }
        })
        longPressGesture.on("ended", (sender: UILongPressGestureRecognizer) => {
            this.highlighted = false
            this.tracking = false
            const location = sender.locationInView(undefined)
            const inside = this.highlightedPointInside(location)
            if (inside) {
                this.emit("touchUpInside", this)
            }
            else {
                this.emit("touchUpOutside", this)
            }
        })
        longPressGesture.on("cancelled", () => {
            this.highlighted = false
            this.tracking = false
            this.emit("touchCancel", this)
        })
        longPressGesture.minimumPressDuration = 0.05
        this.addGestureRecognizer(longPressGesture)
    }

    tintColorDidChange() {
        super.tintColorDidChange()
        this.reloadContents()
    }

    private reloadContents() {
        if (this.titleLabel.text !== this.titleForState(this.currentState())) {
            this.titleLabel.text = this.titleForState(this.currentState())
            this.markFlagDirty("text")
        }
        if (this.titleLabel.textColor !== this.titleColorForState(this.currentState())) {
            this.titleLabel.textColor = this.titleColorForState(this.currentState())
            this.markFlagDirty("textStyle")
        }
        if (this.imageView.image !== this.imageForState(this.currentState())) {
            this.imageView.image = this.imageForState(this.currentState())
            this.markFlagDirty("imageSource")
        }
        if (!this.isCustom) {
            this.contentAlpha = this.highlighted ? 0.3 : 1.0
            this.markFlagDirty("contentAlphaAnimation")
        }
    }

    private currentState(): number {
        var state = UIControlState.normal
        if (!this.enabled) {
            state = state | UIControlState.disabled
        }
        if (this.selected) {
            state = state | UIControlState.selected
        }
        if (this.highlighted) {
            state = state | UIControlState.highlighted
        }
        return state
    }

    private imageForState(state: number): UIImage | undefined {
        if (this.statedImages[state] !== undefined) {
            return this.statedImages[state]
        }
        return this.statedImages[0]
    }

    private titleForState(state: number): string | undefined {
        if (this.statedTitles[state] !== undefined) {
            return this.statedTitles[state]
        }
        return this.statedTitles[0]
    }

    // private attributedTitleForState(state: number): UIAttributedString | undefined {
    //     if (this.statedAttributedTitles[state] !== undefined) {
    //         return this.statedAttributedTitles[state]
    //     }
    //     return this.statedAttributedTitles[0]
    // }

    private titleColorForState(state: number): UIColor | undefined {
        if (this.statedTitleColors[state] !== undefined) {
            return this.statedTitleColors[state]
        }
        if (this.statedTitleColors[0] !== undefined) {
            return this.statedTitleColors[0]
        }
        if (state == UIControlState.disabled) {
            return UIColor.gray.colorWithAlphaComponent(0.75)
        }
        else {
            return this.tintColor || UIColor.black
        }
    }

    private highlightedPointInside(point: UIPoint): boolean {
        return point.x >= -22.0 && point.y >= -22.0 && point.x <= this.frame.width + 22.0 && point.y <= this.frame.height + 22.0
    }

    buildExtras() {
        let data = super.buildExtras()
        data.text = this.titleLabel.text || ""
        data.textStyle = `
            color: ${this.titleLabel.textColor !== undefined ? UIColor.toStyle(this.titleLabel.textColor) : "black"};
            font-size: ${this.titleLabel.font !== undefined ? this.titleLabel.font.pointSize : 14}px;
            font-family: ${this.titleLabel.font !== undefined ? this.titleLabel.font.fontName : ""}; 
            font-weight: ${this.titleLabel.font !== undefined ? this.titleLabel.font.fontStyle : ""}; 
            font-style: ${this.titleLabel.font !== undefined ? this.titleLabel.font.fontStyle : ""}; 
            `
        data.textHeight = this.bounds.height
        data.imageSource = this.imageView.image ? this.imageView.image.imageSource : null
        if (this.dirtyFlags["contentAlphaAnimation"]) {
            data.contentAlphaAnimation = (wx.createAnimation({ duration: 100, timingFunction: "linear" }).opacity(this.contentAlpha).step() as any).export()
        }
        data.imageMargin = {
            top: this.imageEdgeInsets.top + this.contentEdgeInsets.top,
            left: this.imageEdgeInsets.left + this.contentEdgeInsets.left,
            bottom: this.imageEdgeInsets.bottom + this.contentEdgeInsets.bottom,
            right: this.imageEdgeInsets.right + this.contentEdgeInsets.right,
        }
        data.titleMargin = {
            top: this.titleEdgeInsets.top + this.contentEdgeInsets.top,
            left: this.titleEdgeInsets.left + this.contentEdgeInsets.left,
            bottom: this.titleEdgeInsets.bottom + this.contentEdgeInsets.bottom,
            right: this.titleEdgeInsets.right + this.contentEdgeInsets.right,
        }
        return data
    }

    buildStyle() {
        let style = super.buildStyle()
        style += `
        line-height: ${this.frame.height}px;
        `
        return style
    }

    layoutSubviews() {
        super.layoutSubviews()
        this.markFlagDirty("textHeight")
    }

}