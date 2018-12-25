import { UIView } from "./UIView";
import { UIColor } from "./UIColor";
import { UIImageView } from "./UIImageView";
import { UILabel } from "./UILabel";
import { UIFont } from "./UIFont";
import { UITextAlignment, UIViewContentMode } from "./UIEnums";
import { UITabBarItem } from "./UITabBarItem";
import { UITapGestureRecognizer } from "./UITapGestureRecognizer";
import { UISizeZero } from "./UISize";
import { UIEdgeInsetsZero } from "./UIEdgeInsets";

export class UITabBar extends UIView {

    translucent: boolean = false

    public get hidden(): boolean {
        return this._hidden;
    }

    public set hidden(value: boolean) {
        this._hidden = value;
        this.invalidate()
        if (this.tabBarController) {
            this.tabBarController.iView.setNeedsDisplay()
        }
    }

    barHeight: number = 50.0

    private _barTintColor: UIColor | undefined = undefined

    public get barTintColor(): UIColor | undefined {
        return this._barTintColor;
    }

    public set barTintColor(value: UIColor | undefined) {
        this._barTintColor = value;
        this.backgroundColor = value
    }

    unselectedItemTintColor: UIColor = new UIColor(0x73 / 255.0, 0x73 / 255.0, 0x73 / 255.0, 1.0)

    // Implementation

    tabBarController: any = undefined

    private barButtons: UITabBarButton[] = []

    constructor() {
        super()
        this.barTintColor = UIColor.white
        this.tintColor = UIColor.black
        this.extraStyles = `
        border-top: solid;
        border-top-width: 1rpx;
        border-top-color: rgba(152, 150, 155, 0.5);
        `
    }

    resetItems() {
        this.barButtons.forEach(it => {
            it.removeFromSuperview()
            if (it.barItem) {
                it.barItem.barButton = undefined
                it.barItem = undefined
            }
        })
        if (this.tabBarController) {
            this.barButtons = this.tabBarController.itemControllers.map((it: any) => {
                const tabBarButton = new UITabBarButton
                tabBarButton.barItem = it.tabBarItem
                it.tabBarItem.barButton = tabBarButton
                return tabBarButton
            })
            this.barButtons.forEach((it, index) => {
                it.addGestureRecognizer(new UITapGestureRecognizer().on("touch", () => {
                    if (this.tabBarController) {
                        this.tabBarController.selectedIndex = index
                    }
                }))
                this.addSubview(it)
            })
        }
        this.setNeedsLayout(true)
    }

    setSelectedIndex(selectedIndex: number) {
        this.barButtons.forEach((barButton, index) => {
            barButton.itemSelected = index == selectedIndex
            barButton.tintColor = index == selectedIndex ? this.tintColor : this.unselectedItemTintColor
        })
    }

    layoutSubviews() {
        super.layoutSubviews()
        if (this.barButtons.length > 0) {
            const eachWidth = this.bounds.width / this.barButtons.length
            this.barButtons.forEach((barButton, index) => {
                barButton.frame = { x: index * eachWidth, y: 0.0, width: eachWidth, height: this.bounds.height }
            })
        }
    }

}

export class UITabBarButton extends UIView {

    private _barItem: UITabBarItem | undefined = undefined

    public get barItem(): UITabBarItem | undefined {
        return this._barItem
    }

    public set barItem(value: UITabBarItem | undefined) {
        this._barItem = value
        this.setNeedUpdate()
    }

    private _itemSelected: boolean = false

    public get itemSelected(): boolean {
        return this._itemSelected;
    }

    public set itemSelected(value: boolean) {
        this._itemSelected = value;
        this.setNeedUpdate()
    }

    iconImageView = new UIImageView

    titleLabel = new UILabel

    constructor() {
        super()
        this.iconImageView.contentMode = UIViewContentMode.scaleAspectFit
        this.addSubview(this.iconImageView)
        this.titleLabel.font = new UIFont(11.0)
        this.titleLabel.textAlignment = UITextAlignment.center
        this.addSubview(this.titleLabel)
    }

    setNeedUpdate() {
        if (this.barItem) {
            this.iconImageView.image = this.itemSelected ? (this.barItem.selectedImage || this.barItem.image) : this.barItem.image
            if (this.iconImageView.image && this.iconImageView.image.size.width === 0) {
                this.iconImageView.image.on("load", () => {
                    this.setNeedsLayout(true)
                })
            }
            this.titleLabel.text = this.barItem.title
        }
        this.setNeedsLayout(true)
    }

    tintColorDidChange() {
        super.tintColorDidChange()
        this.titleLabel.textColor = this.tintColor
    }

    layoutSubviews() {
        super.layoutSubviews()
        const iconSize = { width: 26, height: 26 }
        const titleSize = { width: 120, height: 18 }
        const imageInsets = this.barItem ? this.barItem.imageInsets : UIEdgeInsetsZero
        this.iconImageView.frame = {
            x: imageInsets.left + (this.bounds.width - iconSize.width) / 2.0 - imageInsets.right,
            y: imageInsets.top + (this.bounds.height - (iconSize.height + titleSize.height)) / 2.0,
            width: iconSize.width,
            height: iconSize.height
        }
        this.titleLabel.frame = {
            x: 0.0,
            y: this.iconImageView.frame.y + this.iconImageView.frame.height + imageInsets.bottom,
            width: this.bounds.width,
            height: titleSize.height
        }
    }

}