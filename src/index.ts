declare var module: any
declare var require: any

Object.assign(module.exports, require('./uikit/UIAffineTransform'))
Object.assign(module.exports, require('./uikit/UIColor'))
Object.assign(module.exports, require('./uikit/UIEdgeInsets'))
Object.assign(module.exports, require('./uikit/UIGestureRecognizer'))
Object.assign(module.exports, require('./uikit/UILongPressGestureRecognizer'))
Object.assign(module.exports, require('./uikit/UIPanGestureRecognizer'))
Object.assign(module.exports, require('./uikit/UIPinchGestureRecognizer'))
Object.assign(module.exports, require('./uikit/UIPoint'))
Object.assign(module.exports, require('./uikit/UIRect'))
Object.assign(module.exports, require('./uikit/UIRotationGestureRecognizer'))
Object.assign(module.exports, require('./uikit/UISize'))
Object.assign(module.exports, require('./uikit/UITapGestureRecognizer'))
Object.assign(module.exports, require('./uikit/UITouch'))
Object.assign(module.exports, require('./uikit/UIView'))

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
