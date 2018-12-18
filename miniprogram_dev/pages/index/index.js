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
} = require("../../components/index")

class FooViewController extends UIViewController {

    redView = new UIView
    imgView = new UIImageView

    viewDidLoad() {
        super.viewDidLoad()
        this.title = "我的首页"
        const scrollView = new UIScrollView
        scrollView.frame = UIRectMake(0, 0, 300, 300)
        scrollView.contentSize = { width: 0, height: 900 }
        // scrollView.backgroundColor = UIColor.yellow
        // scrollView.clipsToBounds = true
        {
            const view = new UIView
            view.backgroundColor = UIColor.red
            view.frame = UIRectMake(0, 0, 44, 44)
            scrollView.addSubview(view)
        }
        {
            const view = new UIView
            view.backgroundColor = UIColor.red
            view.frame = UIRectMake(0, 300, 44, 44)
            scrollView.addSubview(view)
        }
        {
            const view = new UIView
            view.backgroundColor = UIColor.red
            view.frame = UIRectMake(0, 600, 44, 44)
            view.addGestureRecognizer(new UITapGestureRecognizer().on("touch", () => {
                view.backgroundColor = UIColor.yellow
            }))
            scrollView.addSubview(view)
        }
        this.view.addSubview(scrollView)

        // this.redView.layer.cornerRadius = 22.0
        // this.redView.backgroundColor = new UIColor(0.0, 1.0, 0.0, 0.5)
        // this.redView.addGestureRecognizer(new UITapGestureRecognizer().on("touch", () => {
        //     this.redView.backgroundColor = UIColor.red
        //     // URLSession.shared.fetch('https://api.github.com/').then((data) => {
        //     //     console.log(data.json())
        //     // })
        // }))
        // this.view.addSubview(this.redView)
        // // this.view.backgroundColor = new UIColor(1.0, 0.0, 0.0, 0.5)
        // this.imgView.layer.cornerRadius = 20.0
        // this.imgView.clipsToBounds = true
        // this.imgView.image = UIImage.fromURL('https://avatars0.githubusercontent.com/u/5013664?s=460&v=4')
        // this.view.addSubview(this.imgView)
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

// const tabBarController = new UITabBarController()
// tabBarController.tabBar.tintColor = new UIColor(0xf2 / 255.0, 0x30 / 255.0, 0xa4 / 255.0, 1.0)
// tabBarController.tabBar.unselectedItemTintColor = new UIColor(0xa9 / 255.0, 0xa9 / 255.0, 0xa9 / 255.0, 1.0)

// const firstViewController = new UINavigationController(new FooViewController)
// firstViewController.tabBarItem.image = new UIImage({ name: "tabbar_timeline_normal" })
// firstViewController.tabBarItem.selectedImage = new UIImage({ name: "tabbar_timeline_selected" })
// firstViewController.tabBarItem.title = "首页"

// const secondViewController = new UINavigationController(new SecondViewController)
// secondViewController.tabBarItem.image = new UIImage({ name: "tabbar_me_normal" })
// secondViewController.tabBarItem.selectedImage = new UIImage({ name: "tabbar_me_selected" })
// secondViewController.tabBarItem.title = "我的"

// tabBarController.setViewControllers([
//     firstViewController,
//     secondViewController,
// ])

// const main = tabBarController

const main = new FooViewController

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Page({
    data: {},
    onLoad: function () {
        main.attach(this, "main")
    }
})
