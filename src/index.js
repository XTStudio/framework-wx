"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UIRect_1 = require("./UIRect");
exports.UIRectContainsPoint = UIRect_1.UIRectContainsPoint;
exports.UIRectEqualToRect = UIRect_1.UIRectEqualToRect;
exports.UIRectContainsRect = UIRect_1.UIRectContainsRect;
exports.UIRectInset = UIRect_1.UIRectInset;
exports.UIRectIntersectsRect = UIRect_1.UIRectIntersectsRect;
exports.UIRectIsEmpty = UIRect_1.UIRectIsEmpty;
exports.UIRectMake = UIRect_1.UIRectMake;
exports.UIRectOffset = UIRect_1.UIRectOffset;
exports.UIRectUnion = UIRect_1.UIRectUnion;
exports.UIRectZero = UIRect_1.UIRectZero;
const UIColor_1 = require("./UIColor");
exports.UIColor = UIColor_1.UIColor;
const UIView_1 = require("./UIView");
exports.UIView = UIView_1.UIView;
Component({
    properties: {
        view: {
            type: Object,
            value: new exports.UIView,
            observer: function (newVal, oldVal) {
                if (newVal === undefined || newVal === null) {
                    return;
                }
                if (typeof this.data.clazz !== "string" || typeof this.data.view !== newVal) {
                    this.setData({
                        view: newVal,
                        clazz: newVal.clazz,
                    });
                }
            }
        },
    },
    data: {
        view: undefined,
        clazz: "UIView",
    },
    methods: {}
});
