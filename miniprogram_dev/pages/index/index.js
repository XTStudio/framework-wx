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
    UITextField,
    UIKeyboardType,
    UIReturnKeyType,
    UITextFieldViewMode,
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

    scrollView = new UIScrollView
    redView = new UIView
    textField = new UITextField

    viewDidLoad() {
        super.viewDidLoad()
        this.textField.backgroundColor = new UIColor(245.0 / 255.0, 245.0 / 255.0, 245.0 / 255.0, 1.0)
        this.textField.frame = UIRectMake(44, 44, 300, 44)
        // this.textField.text = "Hello."
        this.textField.placeholder = "Input username here."
        // this.textField.textColor = UIColor.red
        // this.textField.textAlignment = UITextAlignment.center
        this.textField.clearButtonMode = UITextFieldViewMode.whileEditing
        // this.textField.keyboardType = UIKeyboardType.numberPad
        this.textField.returnKeyType = UIReturnKeyType.send
        this.textField.on("shouldChange", (sender, range, text) => {
            if (text === "!") { return false }
            return true
        })
        this.textField.on("shouldReturn", () => {
            this.title = this.textField.text
            this.textField.blur()
        })
        {
            let leftView = new UIView
            leftView.frame = UIRectMake(0, 0, 44, 44)
            leftView.backgroundColor = UIColor.red
            this.textField.leftView = leftView
            this.textField.leftViewMode = UITextFieldViewMode.never
        }
        this.textField.font = new UIFont(14)
        {
            this.redView.backgroundColor = UIColor.red
            this.redView.frame = UIRectMake(0, 0, 44, 44)
            this.redView.addGestureRecognizer(new UITapGestureRecognizer().on("touch", () => {
                if (this.textField.text === "1") {
                    this.textField.blur()
                }
                else {
                    this.textField.focus()
                }
            }))
            this.scrollView.addSubview(this.redView)
        }
        this.scrollView.addSubview(this.textField)
        this.scrollView.contentSize = { width: 0, height: 2000 }
        this.view.addSubview(this.scrollView)
    }

    viewWillLayoutSubviews() {
        super.viewWillLayoutSubviews()
        this.scrollView.frame = this.view.bounds
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
            cell.textLabel.text = indexPath.row.toString()
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

// const main = tabBarController
const main = new BarViewController

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Page({
    data: {},
    onLoad: function () {
        main.attach(this, "main")
    }
})
