"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UIEnums_1 = require("./UIEnums");
const UIView_1 = require("./UIView");
class UIStackView extends UIView_1.UIView {
    constructor(arrangedSubviews = undefined) {
        super();
        this.arrangedSubviews = [];
        this._axis = UIEnums_1.UILayoutConstraintAxis.horizontal;
        this._distribution = UIEnums_1.UIStackViewDistribution.fill;
        this._alignment = UIEnums_1.UIStackViewAlignment.fill;
        this._spacing = 0.0;
        // Implementation
        this.allLayoutWidths = new Map();
        this.allLayoutHeights = new Map();
        this.arrangedSubviews = arrangedSubviews || [];
        this.arrangedSubviews.forEach(it => {
            this.addSubview(it);
        });
        setTimeout(() => {
            this._layoutArrangeSubviews();
        }, 0);
    }
    addArrangedSubview(view) {
        this.arrangedSubviews.push(view);
        this.addSubview(view);
        this._layoutArrangeSubviews();
    }
    removeArrangedSubview(view) {
        const idx = this.arrangedSubviews.indexOf(view);
        if (idx >= 0) {
            this.arrangedSubviews.splice(idx, 1);
            view.removeFromSuperview();
            this._layoutArrangeSubviews();
        }
    }
    insertArrangedSubview(view, atIndex) {
        this.arrangedSubviews.splice(atIndex, 0, view);
        this.addSubview(view);
        this._layoutArrangeSubviews();
    }
    layoutArrangedSubview(subview, size) {
        this.allLayoutWidths.delete(subview);
        this.allLayoutHeights.delete(subview);
        if (size) {
            if (size.width !== undefined) {
                this.allLayoutWidths.set(subview, size.width);
            }
            if (size.height !== undefined) {
                this.allLayoutHeights.set(subview, size.height);
            }
        }
        this._layoutArrangeSubviews();
    }
    get axis() {
        return this._axis;
    }
    set axis(value) {
        this._axis = value;
        this._layoutArrangeSubviews();
    }
    get distribution() {
        return this._distribution;
    }
    set distribution(value) {
        this._distribution = value;
        this._layoutArrangeSubviews();
    }
    get alignment() {
        return this._alignment;
    }
    set alignment(value) {
        this._alignment = value;
        this._layoutArrangeSubviews();
    }
    get spacing() {
        return this._spacing;
    }
    set spacing(value) {
        this._spacing = value;
        this._layoutArrangeSubviews();
    }
    layoutSubviews() {
        super.layoutSubviews();
        this._layoutArrangeSubviews();
    }
    _layoutArrangeSubviews() {
        if (this.arrangedSubviews.length == 0) {
            return;
        }
        let x = [];
        let y = [];
        let width = [];
        let height = [];
        let axisLocation;
        let axisLength;
        let alignLocation;
        let alignLength;
        let axisValues;
        let alignValues;
        let boundsAxisLength;
        let boundsAlignLength;
        if (this.axis == UIEnums_1.UILayoutConstraintAxis.horizontal) {
            axisLocation = x;
            axisLength = width;
            alignLocation = y;
            alignLength = height;
            axisValues = this.allLayoutWidths;
            alignValues = this.allLayoutHeights;
            boundsAxisLength = this.bounds.width;
            boundsAlignLength = this.bounds.height;
        }
        else {
            axisLocation = y;
            axisLength = height;
            alignLocation = x;
            alignLength = width;
            axisValues = this.allLayoutHeights;
            alignValues = this.allLayoutWidths;
            boundsAxisLength = this.bounds.height;
            boundsAlignLength = this.bounds.width;
        }
        switch (this.distribution) {
            case UIEnums_1.UIStackViewDistribution.fill: {
                let axisValuesSum = 0;
                axisValues.forEach(it => {
                    axisValuesSum += it;
                });
                var leftSpace = boundsAxisLength - axisValuesSum;
                var location = 0.0;
                this.arrangedSubviews.forEach((view, index) => {
                    var space = 0.0;
                    const target = axisValues.get(view);
                    if (target !== undefined) {
                        space = target;
                    }
                    else {
                        space = leftSpace;
                        leftSpace = 0.0;
                    }
                    axisLocation.push(location);
                    axisLength.push(space);
                    location += space;
                });
                break;
            }
            case UIEnums_1.UIStackViewDistribution.fillEqually: {
                this.arrangedSubviews.forEach((_, index) => {
                    axisLocation.push(boundsAxisLength / this.arrangedSubviews.length * index);
                    axisLength.push(boundsAxisLength / this.arrangedSubviews.length);
                });
                break;
            }
            case UIEnums_1.UIStackViewDistribution.fillProportionally: {
                if (this.arrangedSubviews.length == 1) {
                    axisLocation.push(0.0);
                    axisLength.push(this.bounds.width);
                }
                else {
                    const everyWidth = (boundsAxisLength - ((this.arrangedSubviews.length - 1) * this.spacing)) / this.arrangedSubviews.length;
                    this.arrangedSubviews.forEach((_, index) => {
                        axisLocation.push((everyWidth + this.spacing) * index);
                        axisLength.push(everyWidth);
                    });
                }
                break;
            }
            case UIEnums_1.UIStackViewDistribution.equalSpacing: {
                if (this.arrangedSubviews.length == 1) {
                    axisLocation.push(0.0);
                    axisLength.push(boundsAxisLength);
                }
                else {
                    let axisValuesSum = 0;
                    axisValues.forEach(it => {
                        axisValuesSum += it;
                    });
                    const spacing = (boundsAxisLength - axisValuesSum) / (this.arrangedSubviews.length - 1);
                    var location = 0.0;
                    this.arrangedSubviews.forEach(view => {
                        axisLocation.push(location);
                        var space = axisValues.get(view) || 0.0;
                        axisLength.push(space);
                        location += space + spacing;
                    });
                }
                break;
            }
            case UIEnums_1.UIStackViewDistribution.equalCentering: {
                if (this.arrangedSubviews.length > 2) {
                    const firstViewCenterX = (axisValues.get(this.arrangedSubviews[0]) || 0.0) / 2.0;
                    const lastViewCenterX = boundsAxisLength - (axisValues.get(this.arrangedSubviews[this.arrangedSubviews.length - 1]) || 0.0) / 2.0;
                    const everyCenterSpace = (lastViewCenterX - firstViewCenterX) / (this.arrangedSubviews.length - 1);
                    var location = 0.0;
                    this.arrangedSubviews.forEach((it, index) => {
                        var space = axisValues.get(it) || 0.0;
                        axisLength.push(space);
                        if (index > 0) {
                            location -= space / 2.0;
                        }
                        axisLocation.push(location);
                        location += space / 2.0 + everyCenterSpace;
                    });
                }
                else if (this.arrangedSubviews.length == 2) {
                    var leftSpace = boundsAxisLength;
                    var location = 0.0;
                    axisLocation.push(location);
                    const firstSpace = axisValues.get(this.arrangedSubviews[0]) || 0.0;
                    axisLength.push(firstSpace);
                    leftSpace -= firstSpace;
                    location += firstSpace;
                    const secondSpace = axisValues.get(this.arrangedSubviews[1]) !== undefined ? axisValues.get(this.arrangedSubviews[1]) : leftSpace;
                    axisLocation.push(boundsAxisLength - (secondSpace || 0.0));
                    axisLength.push(secondSpace || 0.0);
                }
                else if (this.arrangedSubviews.length == 1) {
                    axisLocation.push(0.0);
                    axisLength.push(boundsAxisLength);
                }
                break;
            }
        }
        switch (this.alignment) {
            case UIEnums_1.UIStackViewAlignment.fill: {
                this.arrangedSubviews.forEach(_ => {
                    alignLocation.push(0.0);
                    alignLength.push(boundsAlignLength);
                });
                break;
            }
            case UIEnums_1.UIStackViewAlignment.leading: {
                this.arrangedSubviews.forEach(it => {
                    alignLocation.push(0.0);
                    alignLength.push(alignValues.get(it) || 0.0);
                });
                break;
            }
            case UIEnums_1.UIStackViewAlignment.center: {
                this.arrangedSubviews.forEach(it => {
                    const space = alignValues.get(it) || 0.0;
                    alignLocation.push((boundsAlignLength - space) / 2.0);
                    alignLength.push(space);
                });
                break;
            }
            case UIEnums_1.UIStackViewAlignment.trailing: {
                this.arrangedSubviews.forEach(it => {
                    const space = alignValues.get(it) || 0.0;
                    alignLocation.push(boundsAlignLength - space);
                    alignLength.push(space);
                });
                break;
            }
        }
        if (this.axis == UIEnums_1.UILayoutConstraintAxis.horizontal) {
            this.arrangedSubviews.forEach((view, index) => {
                view.frame = { x: axisLocation[index], y: alignLocation[index], width: axisLength[index], height: alignLength[index] };
            });
        }
        else {
            this.arrangedSubviews.forEach((view, index) => {
                view.frame = { x: alignLocation[index], y: axisLocation[index], width: alignLength[index], height: axisLength[index] };
            });
        }
    }
}
exports.UIStackView = UIStackView;
