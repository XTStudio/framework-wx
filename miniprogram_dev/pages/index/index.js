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
} = require("../../components/index")

const window = new UIWindow

const mainView = new UIScrollView
mainView.backgroundColor = UIColor.white
mainView.clipsToBounds = true
mainView.frame = UIRectMake(0, 0, 375, 568)

{
    const itemView = new UIView
    itemView.backgroundColor = UIColor.blue
    itemView.frame = UIRectMake(0, 0, 375, 568)
    itemView.addGestureRecognizer(new UITapGestureRecognizer().on("touch", () => {
        itemView.backgroundColor = UIColor.red
    }))
    mainView.addSubview(itemView)
}
{
    const itemView = new UIView
    itemView.backgroundColor = UIColor.green
    itemView.frame = UIRectMake(375, 0, 375, 568)
    mainView.addSubview(itemView)
}
{
    const itemView = new UIView
    itemView.backgroundColor = UIColor.red
    itemView.frame = UIRectMake(375 * 2, 0, 375, 568)
    mainView.addSubview(itemView)
}

// mainView.on("didScroll", (sender) => {
//     console.log(sender.contentOffset)
// })
// mainView.alwaysBounceVertical = true
mainView.alpha = 0.4
mainView.bounces = false
mainView.contentSize = { width: 375 * 3, height: 0 }

// setTimeout(() => {
//     mainView.setContentOffset({ x: 150, y: 0 }, true)
// }, 3000)
mainView.pagingEnabled = true
// mainView.on("willBeginDragging", () => {
//     console.log("willBeginDragging")
// })
// mainView.on("didEndDragging", () => {
//     console.log("didEndDragging")
// })
// mainView.scrollsToTop = true
// mainView.contentOffset = { x: 0, y: 22 }
// mainView.scrollEnabled = false

window.addSubview(mainView)

window.backgroundColor = UIColor.gray
// window.addGestureRecognizer(new UITapGestureRecognizer().on("touch", () => {
//     window.backgroundColor = UIColor.yellow
// }))

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Page({
    data: {},
    onLoad: function () {
        window.attach(this, "main")
    },
})
