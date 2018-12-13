const {
    UIWindow,
    UIView,
    UIRectMake,
    UIColor,
    UIAffineTransformMakeRotation,
    UITapGestureRecognizer,
    UILongPressGestureRecognizer,
} = require("../../components/index")

const window = new UIWindow

const mainView = new UIView
mainView.backgroundColor = UIColor.blue
mainView.clipsToBounds = true
mainView.frame = UIRectMake(44, 44, 44, 44)

let gesture = new UILongPressGestureRecognizer()
    .on("began", () => {
        mainView.backgroundColor = UIColor.yellow
    })
    .on("changed", () => {
        mainView.backgroundColor = UIColor.green
    })
    .on("ended", () => {
        mainView.backgroundColor = UIColor.red
    })
// .on("touch", () => {
//     mainView.backgroundColor = UIColor.red
// })
mainView.addGestureRecognizer(gesture)
window.addSubview(mainView)

window.backgroundColor = UIColor.gray

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Page({
    data: {},
    onLoad: function () {
        window.attach(this, "main")
    },
})
