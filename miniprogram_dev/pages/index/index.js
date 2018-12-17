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
    UIActionSheet,
    UIDevice,
    UserDefaults,
} = require("../../components/index")

class FooViewController extends UIViewController {

    redView = new UIView
    imgView = new UIImageView

    viewDidLoad() {
        super.viewDidLoad()
        // UserDefaults.standard.setValue("dhlkashflds", "testKey")
        // UserDefaults.standard.reset()
        console.log(UserDefaults.standard.valueForKey("testKey"))
        this.title = "我的首页"
        this.redView.backgroundColor = new UIColor(0.0, 1.0, 0.0, 0.5)
        this.redView.addGestureRecognizer(new UITapGestureRecognizer().on("touch", () => {
            const actionSheet = new UIActionSheet
            actionSheet.addDangerAction("退出登录", () => {
                this.redView.backgroundColor = UIColor.red
            })
            actionSheet.addCancelAction("取消", () => {
                this.redView.backgroundColor = UIColor.gray
            })
            actionSheet.show()
            // this.redView.backgroundColor = UIColor.yellow
            // if (this.navigationController) {
            //     this.navigationController.pushViewController(new SecondViewController)
            // }

        }))
        this.view.addSubview(this.redView)
        // this.view.backgroundColor = new UIColor(1.0, 0.0, 0.0, 0.5)
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

const main = tabBarController

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Page({
    data: {},
    onLoad: function () {
        main.attach(this, "main")
    }
})
