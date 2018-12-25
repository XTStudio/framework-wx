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
    UITableView,
    UITextAlignment,
    UITableViewCell,
    DispatchQueue,
    UIRefreshControl,
} = require("../../components/index")

class FooCell extends UITableViewCell {

    textLabel = new UILabel

    constructor(context) {
        super(context)
        this.textLabel.text = "Hello."
        this.textLabel.font = new UIFont(24)
        this.textLabel.frame = UIRectMake(0, 0, 200, 44)
        this.contentView.addSubview(this.textLabel)
    }

}

class BarViewController extends UIViewController {

    slider = new UISlider

    viewDidLoad() {
        super.viewDidLoad()
        this.slider.frame = UIRectMake(44, 44, 300, 44)
        this.view.addSubview(this.slider)
    }

    viewWillLayoutSubviews() {
        super.viewWillLayoutSubviews()
        // this.scrollView.frame = this.view.bounds
    }

}

class FooViewController extends UIViewController {

    tableView = new UITableView

    viewDidLoad() {
        super.viewDidLoad()
        this.title = "UITableView"
        this.tableView.addSubview((() => {
            let refreshControl = new UIRefreshControl
            refreshControl.on("refresh", () => {
                setTimeout(() => {
                    this.tableView.reloadData()
                    refreshControl.endRefreshing()
                }, 5000)
            })
            return refreshControl
        })())
        // this.tableView.contentInset = { top: 88, left: 0, bottom: 0, right: 0 }
        this.tableView.register((context) => new FooCell(context), "Cell")
        this.tableView.on("numberOfRows", () => 30)
        this.tableView.on("heightForRow", () => 44)
        this.tableView.on("cellForRow", (indexPath) => {
            const cell = this.tableView.dequeueReusableCell("Cell", indexPath)
            cell.textLabel.text = Math.random().toString()
            return cell
        })
        this.tableView.on("didSelectRow", (indexPath) => {
            if (this.navigationController) {
                this.navigationController.pushViewController(new SecondViewController)
            }
            DispatchQueue.main.asyncAfter(0.3, () => {
                this.tableView.deselectRow(indexPath, true)
            })
        })
        this.tableView.reloadData()
        this.view.addSubview(this.tableView)
    }

    viewWillLayoutSubviews() {
        super.viewWillLayoutSubviews()
        this.tableView.frame = this.view.bounds
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

const window = new UIWindow
window.backgroundColor = UIColor.gray

const main = tabBarController
// const main = new BarViewController

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Page({
    data: {},
    onLoad: function () {
        main.attach(this, "main")
    }
})
