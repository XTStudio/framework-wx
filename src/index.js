"use strict";
Object.assign(module.exports, require('./uikit/UIRect'));
Object.assign(module.exports, require('./uikit/UIAffineTransform'));
Object.assign(module.exports, require('./uikit/UIColor'));
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
