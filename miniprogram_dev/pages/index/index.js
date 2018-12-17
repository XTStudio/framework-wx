const {
    UIView,
    UIRectMake,
    UIColor,
    UITapGestureRecognizer,
    UIViewController,
    UINavigationController,
} = require("../../components/index")

class FooViewController extends UIViewController {

    redView = new UIView

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
    }

    viewWillLayoutSubviews() {
        super.viewWillLayoutSubviews()
        this.redView.frame = UIRectMake(44, 44, this.view.bounds.width - 88, 44)
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

const main = new UINavigationController(new FooViewController)

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Page({
    data: {},
    onLoad: function (options) {
        console.log("load", options)
        main.attach(this, "main")
    }
})
