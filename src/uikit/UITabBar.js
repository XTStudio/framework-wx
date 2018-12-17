"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UIView_1 = require("./UIView");
const UIColor_1 = require("./UIColor");
const UITapGestureRecognizer_1 = require("./UITapGestureRecognizer");
class UITabBar extends UIView_1.UIView {
    constructor() {
        super();
        this.translucent = false;
        this.barHeight = 50.0;
        this._barTintColor = undefined;
        this.unselectedItemTintColor = new UIColor_1.UIColor(0x73 / 255.0, 0x73 / 255.0, 0x73 / 255.0, 1.0);
        // Implementation
        this.tabBarController = undefined;
        this.barButtons = [];
        this.barTintColor = UIColor_1.UIColor.white;
        this.tintColor = UIColor_1.UIColor.black;
        // this.domElement.style.borderTop = "solid"
        // this.domElement.style.borderTopWidth = (1.0 / devicePixelRatio).toString() + "px"
        // this.domElement.style.borderTopColor = new UIColor(0x98 / 255.0, 0x96 / 255.0, 0x9b / 255.0, 0.75).toStyle()
    }
    get hidden() {
        return this._hidden;
    }
    set hidden(value) {
        this._hidden = value;
        // this.domElement.style.visibility = value ? 'hidden' : 'inherit'
        if (this.tabBarController) {
            this.tabBarController.iView.setNeedsDisplay();
        }
    }
    get barTintColor() {
        return this._barTintColor;
    }
    set barTintColor(value) {
        this._barTintColor = value;
        this.backgroundColor = value;
    }
    resetItems() {
        this.barButtons.forEach(it => {
            it.removeFromSuperview();
            // if (it.barItem) {
            //     it.barItem.barButton = undefined
            //     it.barItem = undefined
            // }
        });
        if (this.tabBarController) {
            this.barButtons = this.tabBarController.itemControllers.map(it => {
                const tabBarButton = new UITabBarButton;
                // tabBarButton.barItem = it.tabBarItem
                // it.tabBarItem.barButton = tabBarButton
                return tabBarButton;
            });
            this.barButtons.forEach((it, index) => {
                it.addGestureRecognizer(new UITapGestureRecognizer_1.UITapGestureRecognizer().on("touch", () => {
                    if (this.tabBarController) {
                        this.tabBarController.selectedIndex = index;
                    }
                }));
                this.addSubview(it);
            });
        }
        this.setNeedsLayout(true);
    }
    setSelectedIndex(selectedIndex) {
        this.barButtons.forEach((barButton, index) => {
            barButton.itemSelected = index == selectedIndex;
            barButton.tintColor = index == selectedIndex ? this.tintColor : this.unselectedItemTintColor;
        });
    }
    layoutSubviews() {
        super.layoutSubviews();
        if (this.barButtons.length > 0) {
            const eachWidth = this.bounds.width / this.barButtons.length;
            this.barButtons.forEach((barButton, index) => {
                barButton.frame = { x: index * eachWidth, y: 0.0, width: eachWidth, height: this.bounds.height };
            });
        }
    }
}
exports.UITabBar = UITabBar;
class UITabBarButton extends UIView_1.UIView {
    constructor() {
        // private _barItem: UITabBarItem | undefined = undefined
        super(...arguments);
        // public get barItem(): UITabBarItem | undefined {
        //     return this._barItem;
        // }
        // public set barItem(value: UITabBarItem | undefined) {
        //     this._barItem = value;
        //     this.setNeedUpdate()
        // }
        this._itemSelected = false;
        // iconImageView = new UIImageView
        // titleLabel = new UILabel
        // constructor() {
        //     super()
        //     this.addSubview(this.iconImageView)
        //     this.titleLabel.font = new UIFont(11.0)
        //     this.titleLabel.textAlignment = UITextAlignment.center
        //     this.addSubview(this.titleLabel)
        // }
        // setNeedUpdate() {
        //     if (this.barItem) {
        //         this.iconImageView.image = this.itemSelected ? (this.barItem.selectedImage || this.barItem.image) : this.barItem.image
        //         if (this.iconImageView.image && this.iconImageView.image.size.width === 0) {
        //             this.iconImageView.image.on("load", () => {
        //                 this.setNeedsLayout(true)
        //             })
        //         }
        //         this.titleLabel.text = this.barItem.title
        //     }
        //     this.setNeedsLayout(true)
        // }
        // tintColorDidChange() {
        //     super.tintColorDidChange()
        //     this.titleLabel.textColor = this.tintColor
        // }
        // layoutSubviews() {
        //     super.layoutSubviews()
        //     const iconSize = this.iconImageView.intrinsicContentSize() || UISizeZero
        //     const titleSize = this.titleLabel.intrinsicContentSize() || UISizeZero
        //     const imageInsets = this.barItem ? this.barItem.imageInsets : UIEdgeInsetsZero
        //     this.iconImageView.frame = {
        //         x: imageInsets.left + (this.bounds.width - iconSize.width) / 2.0 - imageInsets.right,
        //         y: imageInsets.top + (this.bounds.height - (iconSize.height + titleSize.height)) / 2.0,
        //         width: iconSize.width,
        //         height: iconSize.height
        //     }
        //     this.titleLabel.frame = {
        //         x: 0.0,
        //         y: this.iconImageView.frame.y + this.iconImageView.frame.height + imageInsets.bottom,
        //         width: this.bounds.width,
        //         height: titleSize.height
        //     }
        // }
    }
    get itemSelected() {
        return this._itemSelected;
    }
    set itemSelected(value) {
        this._itemSelected = value;
        // this.setNeedUpdate()
    }
}
exports.UITabBarButton = UITabBarButton;
