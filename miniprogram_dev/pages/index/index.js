const {
    UIWindow,
    UIView,
    UIRectMake,
    UIColor,
    UIAffineTransformMakeRotation,
    UITapGestureRecognizer,
    UIPanGestureRecognizer,
    UILongPressGestureRecognizer,
    UIAnimator,
    UIScrollView,
    UILabel,
    UIFont,
    UITextAlignment,
} = require("../../components/index")

const window = new UIWindow

const mainView = new UIView
mainView.backgroundColor = UIColor.yellow
mainView.clipsToBounds = true
mainView.frame = UIRectMake(0, 0, 300, 300)

const fooLabel = new UILabel
fooLabel.frame = UIRectMake(0, 0, 300, 300)
fooLabel.text = "We continuously monitor the status of github.com and all its related services. If there are any interruptions in service, a note will be posted here."
// fooLabel.textColor = UIColor.red
fooLabel.numberOfLines = 3
fooLabel.font = new UIFont(20)
mainView.addSubview(fooLabel)

window.addSubview(mainView)

window.backgroundColor = UIColor.gray
// window.addGestureRecognizer(new UITapGestureRecognizer().on("touch", () => {
//     window.backgroundColor = UIColor.yellow
// }))

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Page({
    data: {},
    onLoad: function () {
        window.attach(this, "main")
    },
})
