declare var module: any
declare var require: any

Object.assign(module.exports, require('./UIRect'))
Object.assign(module.exports, require('./UIAffineTransform'))
Object.assign(module.exports, require('./UIColor'))
Object.assign(module.exports, require('./UIView'))

Component({
    properties: {
        view: {
            type: Object,
            value: undefined,
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
