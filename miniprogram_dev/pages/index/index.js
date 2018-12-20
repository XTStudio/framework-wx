const {
    UIView,
    UIRectMake,
    UIColor,
    UITapGestureRecognizer,
    UIViewController,
    UINavigationController,
    UITabBarController,
    UIImageView,
    UIImage,
    UserDefaults,
    URLSession,
    FileManager,
    Data,
    UIWindow,
    UIAnimator,
    UILabel,
    UIFont,
    UIScrollView,
    UISlider,
    UISwitch,
    UIProgressView,
    UIButton,
    UIControlState,
    UIActivityIndicatorView,
    UIScreen,
    UIAlert,
    UIConfirm,
    UIAttributedString,
    UIAttributedStringKey,
    UIMutableAttributedString,
} = require("../../components/index")

class FooViewController extends UIViewController {

    scrollView = new UIScrollView

    viewDidLoad() {
        super.viewDidLoad()
        this.title = "我的首页"
        const label = new UILabel
        label.frame = UIRectMake(0, 0, 300, 300)
        const mutableText = new UIMutableAttributedString("Hello, World!", {
            [UIAttributedStringKey.foregroundColor]: UIColor.blue,
            [UIAttributedStringKey.font]: new UIFont(17),
            [UIAttributedStringKey.kern]: 10,
        })
        mutableText.setAttributes({
            [UIAttributedStringKey.foregroundColor]: UIColor.red,
            [UIAttributedStringKey.font]: new UIFont(36),
        }, { location: 0, length: 5 })
        mutableText.measureAsync({ width: Infinity, height: Infinity }).then((res) => {
            console.log(res);
        })
        label.attributedText = mutableText
        this.view.addSubview(label)
    }

    viewWillLayoutSubviews() {
        super.viewWillLayoutSubviews()
        this.scrollView.frame = this.view.bounds
    }

}

class SecondViewController extends UIViewController {

    viewDidLoad() {
        super.viewDidLoad()
        this.title = "Second"
        this.view.backgroundColor = new UIColor(0.0, 0.0, 1.0, 0.5)
        this.view.addGestureRecognizer(new UITapGestureRecognizer().on("touch", () => {
            if (this.navigationController) {
                this.navigationController.pushViewController(new ThirdViewController)
            }
        }))
    }

}

class ThirdViewController extends UIViewController {

    viewDidLoad() {
        super.viewDidLoad()
        this.title = "Third"
        this.view.backgroundColor = UIColor.green
        this.view.addGestureRecognizer(new UITapGestureRecognizer().on("touch", () => {
            if (this.navigationController) {
                this.navigationController.popViewController()
            }
        }))
    }

}

const tabBarController = new UITabBarController()
tabBarController.tabBar.tintColor = new UIColor(0xf2 / 255.0, 0x30 / 255.0, 0xa4 / 255.0, 1.0)
tabBarController.tabBar.unselectedItemTintColor = new UIColor(0xa9 / 255.0, 0xa9 / 255.0, 0xa9 / 255.0, 1.0)

const firstViewController = new UINavigationController(new FooViewController)
firstViewController.tabBarItem.image = new UIImage({ name: "tabbar_timeline_normal" })
firstViewController.tabBarItem.selectedImage = new UIImage({ name: "tabbar_timeline_selected" })
firstViewController.tabBarItem.title = "首页"

const secondViewController = new UINavigationController(new SecondViewController)
secondViewController.tabBarItem.image = new UIImage({ name: "tabbar_me_normal" })
secondViewController.tabBarItem.selectedImage = new UIImage({ name: "tabbar_me_selected" })
secondViewController.tabBarItem.title = "我的"

tabBarController.setViewControllers([
    firstViewController,
    secondViewController,
])

// const window = new UIWindow
// window.backgroundColor = UIColor.gray

const main = tabBarController

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Page({
    data: {},
    onLoad: function () {
        main.attach(this, "main")
    }
})
