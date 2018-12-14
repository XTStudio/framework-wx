const {
    UIWindow,
    UIView,
    UIRectMake,
    UIColor,
    UIAffineTransformMakeRotation,
    UITapGestureRecognizer,
    UIPanGestureRecognizer,
    UIAnimator,
} = require("../../components/index")

const window = new UIWindow

const mainView = new UIView
mainView.backgroundColor = UIColor.blue
mainView.clipsToBounds = true
mainView.frame = UIRectMake(44, 44, 44, 44)

let gesture = new UITapGestureRecognizer()
    // .on("began", () => {
    //     mainView.backgroundColor = UIColor.yellow
    // })
    // .on("changed", (sender) => {
    //     const location = sender.locationInView(window)
    //     mainView.backgroundColor = UIColor.green
    //     mainView.frame = { x: location.x - 22, y: location.y - 22, width: 44, height: 44 }
    // })
    // .on("ended", () => {
    //     mainView.backgroundColor = UIColor.red
    // })
    .on("touch", () => {
        UIAnimator.curve(0.50, () => {
            mainView.alpha = 0.50
            mainView.frame = UIRectMake(88, 88, 88, 88)
            mainView.transform = UIAffineTransformMakeRotation(-45.0 * Math.PI / 180.0)
            mainView.backgroundColor = UIColor.red
        }, () => {
            mainView.alpha = 1.0
            console.log("finished")
        })
        // mainView.backgroundColor = UIColor.red
    })
mainView.addGestureRecognizer(gesture)
window.addSubview(mainView)
window.addGestureRecognizer(new UITapGestureRecognizer().on("touch", () => {
    window.backgroundColor = UIColor.yellow
}))

window.backgroundColor = UIColor.gray

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Page({
    data: {},
    onLoad: function () {
        window.attach(this, "main")
    },
})
