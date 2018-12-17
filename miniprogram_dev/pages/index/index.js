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
} = require("../../components/index")

class FooViewController extends UIViewController {

    redView = new UIView
    imgView = new UIImageView

    viewDidLoad() {
        super.viewDidLoad()
        this.redView.backgroundColor = new UIColor(0.0, 1.0, 0.0, 0.5)
        this.redView.addGestureRecognizer(new UITapGestureRecognizer().on("touch", () => {
            this.redView.backgroundColor = UIColor.yellow
            if (this.navigationController) {
                this.navigationController.pushViewController(new SecondViewController)
            }
        }))
        this.view.addSubview(this.redView)
        this.view.backgroundColor = new UIColor(1.0, 0.0, 0.0, 0.5)
        this.imgView.image = UIImage.fromURL('https://avatars0.githubusercontent.com/u/5013664?s=460&v=4')
        this.view.addSubview(this.imgView)
    }

    viewWillLayoutSubviews() {
        super.viewWillLayoutSubviews()
        this.redView.frame = UIRectMake(44, 44, this.view.bounds.width - 88, 44)
        // this.imgView.frame = UIRectMake(44, 44, 180, 180)
    }

}

class SecondViewController extends UIViewController {

    viewDidLoad() {
        super.viewDidLoad()
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
        this.view.backgroundColor = UIColor.green
        this.view.addGestureRecognizer(new UITapGestureRecognizer().on("touch", () => {
            if (this.navigationController) {
                this.navigationController.popViewController()
            }
        }))
    }

}

const tabBarController = new UITabBarController()

const firstViewController = new FooViewController
firstViewController.tabBarItem.title = "首页"

const secondViewController = new SecondViewController
secondViewController.tabBarItem.title = "我的"

tabBarController.setViewControllers([
    firstViewController,
    secondViewController,
])

const main = tabBarController

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Page({
    data: {},
    onLoad: function () {
        main.attach(this, "main")
    }
})
