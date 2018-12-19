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
} = require("../../components/index")

class FooViewController extends UIViewController {

    scrollView = new UIScrollView

    viewDidLoad() {
        super.viewDidLoad()
        this.title = "我的首页"
        {
            const redView = new UIView
            redView.frame = UIRectMake(0, -44, 22, 22)
            redView.backgroundColor = UIColor.red
            redView.addGestureRecognizer(new UITapGestureRecognizer().on("touch", () => {
                redView.backgroundColor = UIColor.yellow
            }))
            this.scrollView.addSubview(redView)
        }
        {
            const redView = new UIView
            redView.frame = UIRectMake(0, 0, 44, 44)
            redView.layer.cornerRadius = 22
            redView.layer.shadowRadius = 8
            redView.layer.shadowColor = UIColor.black
            redView.layer.shadowOpacity = 0.5
            redView.layer.shadowOffset = { width: 3, height: 3 }
            redView.layer.borderWidth = 10
            redView.layer.borderColor = UIColor.blue
            redView.backgroundColor = UIColor.red
            redView.addGestureRecognizer(new UITapGestureRecognizer().on("touch", () => {
                redView.backgroundColor = UIColor.yellow
            }))
            this.scrollView.addSubview(redView)
        }
        {
            const slider = new UISwitch
            slider.frame = UIRectMake(44, 100, 200, 44)
            this.view.addSubview(slider)
        }
        {
            const redView = new UIView
            redView.frame = UIRectMake(0, 1000 - 44, 44, 44)
            redView.backgroundColor = UIColor.red
            redView.addGestureRecognizer(new UITapGestureRecognizer().on("touch", () => {
                redView.backgroundColor = UIColor.yellow
            }))
            this.scrollView.addSubview(redView)
        }
        this.scrollView.contentSize = { width: 0, height: 1000 }
        this.scrollView.contentInset = { top: 44, left: 0, bottom: 44, right: 0 }
        // this.view.addSubview(this.scrollView)
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
