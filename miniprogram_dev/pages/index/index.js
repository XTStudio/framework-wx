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
        this.redView.backgroundColor = UIColor.red
        this.redView.addGestureRecognizer(new UITapGestureRecognizer().on("touch", () => {
            this.redView.backgroundColor = UIColor.yellow
            if (this.navigationController) {
                this.navigationController.pushViewController(new SecondViewController)
            }
        }))
        this.view.addSubview(this.redView)
        this.view.backgroundColor = UIColor.gray
        this.imgView.image = UIImage.fromURL('https://avatars0.githubusercontent.com/u/5013664?s=460&v=4')
        this.view.addSubview(this.imgView)
    }

    viewWillLayoutSubviews() {
        super.viewWillLayoutSubviews()
        // this.redView.frame = UIRectMake(44, 44, this.view.bounds.width - 88, 44)
        this.imgView.frame = UIRectMake(44, 44, 180, 180)
    }

}

class SecondViewController extends UIViewController {

    viewDidLoad() {
        super.viewDidLoad()
        this.view.backgroundColor = UIColor.yellow
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

tabBarController.setViewControllers([
    // new FooViewController,
    new UINavigationController(new FooViewController),
])

const main = tabBarController

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Page({
    data: {},
    onLoad: function (options) {
        main.attach(this, "main")
    }
})
