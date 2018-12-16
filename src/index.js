"use strict";
Object.assign(module.exports, require('./uikit/UIAffineTransform'));
Object.assign(module.exports, require('./uikit/UIAnimator'));
Object.assign(module.exports, require('./uikit/UIColor'));
Object.assign(module.exports, require('./uikit/UIEdgeInsets'));
Object.assign(module.exports, require('./uikit/UIGestureRecognizer'));
Object.assign(module.exports, require('./uikit/UILongPressGestureRecognizer'));
Object.assign(module.exports, require('./uikit/UIPanGestureRecognizer'));
Object.assign(module.exports, require('./uikit/UIPinchGestureRecognizer'));
Object.assign(module.exports, require('./uikit/UIPoint'));
Object.assign(module.exports, require('./uikit/UIRect'));
Object.assign(module.exports, require('./uikit/UIRotationGestureRecognizer'));
Object.assign(module.exports, require('./uikit/UISize'));
Object.assign(module.exports, require('./uikit/UIScrollView'));
Object.assign(module.exports, require('./uikit/UITapGestureRecognizer'));
Object.assign(module.exports, require('./uikit/UITouch'));
Object.assign(module.exports, require('./uikit/UIView'));
Component({
    properties: {
        view: {
            type: Object,
            value: undefined,
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
