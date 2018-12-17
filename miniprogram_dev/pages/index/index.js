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
    UIViewController,
} = require("../../components/index")

class FooViewController extends UIViewController {

    redView = new UIView

    viewDidLoad() {
        super.viewDidLoad()
        this.redView.backgroundColor = UIColor.red
        this.view.addSubview(this.redView)
        this.view.backgroundColor = UIColor.gray
    }

    viewWillLayoutSubviews() {
        super.viewWillLayoutSubviews()
        this.redView.frame = UIRectMake(44, 44, this.view.bounds.width - 88, 44)
    }

}

const main = new FooViewController

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Page({
    data: {},
    onLoad: function () {
        main.attach(this, "main")
    },
})
