declare var module: any
declare var require: any

Object.assign(module.exports, require('./foundation/Bundle'))
Object.assign(module.exports, require('./foundation/Data'))
Object.assign(module.exports, require('./foundation/DispatchQueue'))
Object.assign(module.exports, require('./foundation/FileManager'))
Object.assign(module.exports, require('./foundation/Timer'))
Object.assign(module.exports, require('./foundation/URL'))
Object.assign(module.exports, require('./foundation/URLRequest'))
Object.assign(module.exports, require('./foundation/URLResponse'))
Object.assign(module.exports, require('./foundation/URLSession'))
Object.assign(module.exports, require('./foundation/UserDefaults'))
Object.assign(module.exports, require('./foundation/UUID'))

Object.assign(module.exports, require('./uikit/UIActionSheet'))
Object.assign(module.exports, require('./uikit/UIAffineTransform'))
Object.assign(module.exports, require('./uikit/UIAnimator'));
Object.assign(module.exports, require('./uikit/UIColor'))
Object.assign(module.exports, require('./uikit/UIDevice'))
Object.assign(module.exports, require('./uikit/UIEdgeInsets'))
Object.assign(module.exports, require('./uikit/UIEnums'))
Object.assign(module.exports, require('./uikit/UIFont'))
Object.assign(module.exports, require('./uikit/UIGestureRecognizer'))
Object.assign(module.exports, require('./uikit/UIImage'))
Object.assign(module.exports, require('./uikit/UIImageView'))
Object.assign(module.exports, require('./uikit/UILabel'))
Object.assign(module.exports, require('./uikit/UILongPressGestureRecognizer'))
Object.assign(module.exports, require('./uikit/UINavigationController'))
Object.assign(module.exports, require('./uikit/UIPanGestureRecognizer'))
Object.assign(module.exports, require('./uikit/UIPinchGestureRecognizer'))
Object.assign(module.exports, require('./uikit/UIPoint'))
Object.assign(module.exports, require('./uikit/UIRect'))
Object.assign(module.exports, require('./uikit/UIRotationGestureRecognizer'))
Object.assign(module.exports, require('./uikit/UIScrollView'))
Object.assign(module.exports, require('./uikit/UISize'))
Object.assign(module.exports, require('./uikit/UISlider'))
Object.assign(module.exports, require('./uikit/UISwitch'))
Object.assign(module.exports, require('./uikit/UITabBarController'))
Object.assign(module.exports, require('./uikit/UITapGestureRecognizer'))
Object.assign(module.exports, require('./uikit/UITouch'))
Object.assign(module.exports, require('./uikit/UIView'))
Object.assign(module.exports, require('./uikit/UIViewController'))

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
