"use strict";
Object.assign(module.exports, require('./UIRect'));
Object.assign(module.exports, require('./UIAffineTransform'));
Object.assign(module.exports, require('./UIColor'));
Object.assign(module.exports, require('./UIView'));
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
