import {
    UIRectContainsPoint as MUIRectContainsPoint,
    UIRectEqualToRect as MUIRectEqualToRect,
    UIRectContainsRect as MUIRectContainsRect,
    UIRectInset as MUIRectInset,
    UIRectIntersectsRect as MUIRectIntersectsRect,
    UIRectIsEmpty as MUIRectIsEmpty,
    UIRectMake as MUIRectMake,
    UIRectOffset as MUIRectOffset,
    UIRectUnion as MUIRectUnion,
    UIRectZero as MUIRectZero
} from "./UIRect";
export const UIRectContainsPoint = MUIRectContainsPoint
export const UIRectEqualToRect = MUIRectEqualToRect
export const UIRectContainsRect = MUIRectContainsRect
export const UIRectInset = MUIRectInset
export const UIRectIntersectsRect = MUIRectIntersectsRect
export const UIRectIsEmpty = MUIRectIsEmpty
export const UIRectMake = MUIRectMake
export const UIRectOffset = MUIRectOffset
export const UIRectUnion = MUIRectUnion
export const UIRectZero = MUIRectZero

import { UIColor as MUIColor } from "./UIColor";
export const UIColor = MUIColor

import { UIView as MUIView } from "./UIView";
export const UIView = MUIView

Component({
    properties: {
        view: {
            type: Object,
            value: new UIView,
            observer: function (newVal: any, oldVal: any) {
                if (newVal === undefined || newVal === null) { return }
                if (typeof (this as any).data.clazz !== "string" || typeof (this as any).data.view !== newVal) {
                    (this as any).setData({
                        view: newVal,
                        clazz: newVal.clazz,
                    })
                }
            }
        },
    },
    data: {
        view: undefined,
        clazz: "UIView",
    },
    methods: {

    }
})
