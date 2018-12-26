import { UIView, emptyAnimation } from "./UIView";
import { UIPoint, UIPointZero } from "./UIPoint";
import { UISize, UISizeZero } from "./UISize";
import { UIEdgeInsets, UIEdgeInsetsZero } from "./UIEdgeInsets";
import { UIRect } from "./UIRect";
import { UIPanGestureRecognizer } from "./UIPanGestureRecognizer";
import { UIRefreshControl } from "./UIRefreshControl";
import { UITouch } from "./UITouch";
import { UIFetchMoreControl } from "./UIFetchMoreControl";

const isIOS = wx.getSystemInfoSync().platform === "ios"

export class UIScrollView extends UIView {

    clazz = "UIScrollView"

    private _panGesture = new UIPanGestureRecognizer

    private _contentOffset: UIPoint = UIPointZero

    constructor() {
        super()
        this._panGesture.enabled = false
    }

    get contentOffset(): UIPoint {
        return this._contentOffset
    }

    set contentOffset(value: UIPoint) {
        this._contentOffset = value
        this.markFlagDirty("contentOffsetX", "contentOffsetY", "scrollWithAnimation")
        this.isContentOffsetScrollAnimated = false
    }

    contentOffsetDidChanged() { }

    private _contentSize: UISize = UISizeZero

    get contentSize(): UISize {
        return this._contentSize
    }

    set contentSize(value: UISize) {
        this._contentSize = value
        this.markFlagDirty("contentSize")
    }

    private _contentInset: UIEdgeInsets = UIEdgeInsetsZero

    public get contentInset(): UIEdgeInsets {
        return this._contentInset;
    }

    public set contentInset(value: UIEdgeInsets) {
        const deltaX = value.left - this._contentInset.left
        const deltaY = value.top - this._contentInset.top
        this._contentInset = value;
        this.contentOffset = { x: this.contentOffset.x - deltaX, y: this.contentOffset.y - deltaY }
        this.markFlagDirty("contentInset", "contentSize", "refreshingAnimation")
    }

    public adjustInset: UIEdgeInsets = UIEdgeInsetsZero

    directionalLockEnabled: boolean = false

    private _bounces: boolean = true

    public get bounces(): boolean {
        return this._bounces;
    }

    public set bounces(value: boolean) {
        this._bounces = value;
    }

    private _alwaysBounceVertical: boolean = false

    public get alwaysBounceVertical(): boolean {
        return this._alwaysBounceVertical;
    }

    public set alwaysBounceVertical(value: boolean) {
        this._alwaysBounceVertical = value;
    }

    private _alwaysBounceHorizontal: boolean = false

    public get alwaysBounceHorizontal(): boolean {
        return this._alwaysBounceHorizontal;
    }

    public set alwaysBounceHorizontal(value: boolean) {
        this._alwaysBounceHorizontal = value;
    }

    private _pagingEnabled: boolean = false

    public get pagingEnabled(): boolean {
        return this._pagingEnabled;
    }

    public set pagingEnabled(value: boolean) {
        this._pagingEnabled = value;
    }

    private _scrollEnabled: boolean = true

    get scrollEnabled(): boolean {
        return this._scrollEnabled;
    }

    set scrollEnabled(value: boolean) {
        this._scrollEnabled = value;
        this.invalidate()
    }

    public showsHorizontalScrollIndicator: boolean = true // todo

    public showsVerticalScrollIndicator: boolean = true // todo

    setContentOffset(contentOffset: UIPoint, animated: boolean = false): void {
        this.contentOffset = contentOffset
        this.isContentOffsetScrollAnimated = animated
    }

    scrollRectToVisible(rect: UIRect, animated: boolean): void {
        var targetContentOffset = this.contentOffset
        if (rect.x < this.contentOffset.x) {
            targetContentOffset = { x: rect.x, y: targetContentOffset.y }
        }
        else if (rect.x + rect.width > this.contentOffset.x + this.bounds.width) {
            targetContentOffset = { x: rect.x + rect.width - this.bounds.width, y: targetContentOffset.y }
        }
        if (rect.y < this.contentOffset.y) {
            targetContentOffset = { x: targetContentOffset.x, y: rect.y }
        }
        else if (rect.y + rect.height > this.contentOffset.y + this.bounds.height) {
            targetContentOffset = { x: targetContentOffset.x, y: rect.y + rect.height - this.bounds.height }
        }
        targetContentOffset = {
            x: Math.max(0.0, Math.min(this.contentSize.width - this.bounds.width, targetContentOffset.x)),
            y: Math.max(0.0, Math.min(this.contentSize.height - this.bounds.height, targetContentOffset.y))
        }
        this.setContentOffset(targetContentOffset, animated)
    }

    tracking: boolean = false

    dragging: boolean = false

    decelerating: boolean = false

    private _scrollsToTop: boolean = true

    public get scrollsToTop(): boolean {
        return this._scrollsToTop;
    }

    public set scrollsToTop(value: boolean) {
        this._scrollsToTop = value;
        this.markFlagDirty("scrollsToTop")
    }

    // Delegates

    didScroll() {
        this.emit("didScroll", this)
        this.contentOffsetDidChanged()
    }

    willBeginDragging() {
        UIView.recognizedGesture = this._panGesture
        this.emit("willBeginDragging", this)
        this.tracking = true
        this.dragging = true
    }

    private _endDraggingVelocity: UIPoint = UIPointZero

    willEndDragging(velocity: UIPoint) {
        this._endDraggingVelocity = velocity
        this.emit("willEndDragging", this, velocity)
    }

    didEndDragging(decelerate: Boolean) {
        this.tracking = false
        this.dragging = false
        this.emit("didEndDragging", this, decelerate)
        if (this.pagingEnabled) {
            if (this.contentSize.width < this.bounds.width) {
                if (this.contentOffset.y <= 0 || this.contentOffset.y >= this.contentSize.height - this.bounds.height) { return }
                const currentPageY = Math.floor(this.contentOffset.y / this.bounds.height) * this.bounds.height
                const nextPageY = Math.ceil(this.contentOffset.y / this.bounds.height) * this.bounds.height
                if (this._endDraggingVelocity.y > 200) {
                    this.setContentOffset({ x: 0, y: currentPageY }, true)
                }
                else if (this._endDraggingVelocity.y < -200 || nextPageY - this.contentOffset.y < this.contentOffset.y - currentPageY) {
                    this.setContentOffset({ x: 0, y: nextPageY }, true)
                }
                else {
                    this.setContentOffset({ x: 0, y: currentPageY }, true)
                }
            }
            else if (this.contentSize.height < this.bounds.height) {
                if (this.contentOffset.x <= 0 || this.contentOffset.x >= this.contentSize.width - this.bounds.width) { return }
                const currentPageX = Math.floor(this.contentOffset.x / this.bounds.width) * this.bounds.width
                const nextPageX = Math.ceil(this.contentOffset.x / this.bounds.width) * this.bounds.width
                if (this._endDraggingVelocity.x > 200) {
                    this.setContentOffset({ x: currentPageX, y: 0 }, true)
                }
                else if (this._endDraggingVelocity.x < -200 || nextPageX - this.contentOffset.x < this.contentOffset.x - currentPageX) {
                    this.setContentOffset({ x: nextPageX, y: 0 }, true)
                }
                else {
                    this.setContentOffset({ x: currentPageX, y: 0 }, true)
                }
            }
        }
    }

    willBeginDecelerating() {
        this.emit("willBeginDecelerating", this)
        this.decelerating = true
    }

    didEndDecelerating() {
        this.decelerating = false
        this.emit("didEndDecelerating", this)
    }

    didEndScrollingAnimation() {
        this.emit("didEndScrollingAnimation", this)
    }

    didScrollToTop() {
        this.emit("didScrollToTop", this)
    }

    layoutSubviews() {
        super.layoutSubviews()
        if (this.refreshControl) {
            this.refreshControl.animationView.frame = { x: 0.0, y: 0.0, width: this.bounds.width, height: 44.0 }
        }
        this.markFlagDirty("direction")
    }

    addSubview(view: UIView) {
        if (view instanceof UIRefreshControl) {
            this.refreshControl = view
            return
        }
        if (view instanceof UIFetchMoreControl) {
            this.fetchMoreControl = view
            return
        }
        super.addSubview(view)
    }

    // RefreshControl

    private _refreshControl: UIRefreshControl | undefined = undefined

    public get refreshControl(): UIRefreshControl | undefined {
        return this._refreshControl;
    }

    public set refreshControl(value: UIRefreshControl | undefined) {
        this._refreshControl = value;
        if (value) {
            this.markFlagDirty("refreshControlAnimationView")
            value.animationView.frame = { x: 0, y: 0, width: this.bounds.width, height: 44.0 }
            value.scrollView = this
        }
    }

    private touchingRefreshControl = false

    private touchingRefreshControlBeganWindowY: number = 0.0

    public touchingRefreshOffsetY = 0.0

    private createRefreshEffect(translation: UIPoint) {
        if (this.refreshControl && this.refreshControl.enabled && this.contentSize.width <= this.bounds.width) {
            if (isIOS) {
                if (this.contentOffset.y < -this.contentInset.top) {
                    const progress = Math.max(0.0, Math.min(1.0, (-this.contentInset.top - (this.contentOffset.y)) / (88.0)))
                    this.refreshControl.animationView.alpha = progress
                }
                else {
                    this.refreshControl.animationView.alpha = 0.0
                }
            }
            else {
                if (this.contentOffset.y - translation.y < -this.contentInset.top) {
                    const progress = Math.max(0.0, Math.min(1.0, (-this.contentInset.top - (this.contentOffset.y - translation.y)) / (88.0 * 2)))
                    this.refreshControl.animationView.alpha = progress
                    this.touchingRefreshOffsetY = translation.y / 3.0
                    this.markFlagDirty("refreshOffset", "refreshingAnimation")
                }
            }
        }
        return undefined
    }

    touchesBegan(touches: UITouch[]) {
        super.touchesBegan(touches)
        this.touchingRefreshControl = this.contentOffset.y <= -this.contentInset.top + 8.0
        if (this.touchingRefreshControl && touches[0] && touches[0].windowPoint) {
            this.touchingRefreshControlBeganWindowY = touches[0].windowPoint.y
        }
    }

    touchesMoved(touches: UITouch[]) {
        super.touchesMoved(touches)
        if (this.refreshControl && this.refreshControl.enabled && this.touchingRefreshControl && touches[0] && touches[0].windowPoint && this.contentOffset.y <= 0.0) {
            const translateY = touches[0].windowPoint.y - this.touchingRefreshControlBeganWindowY
            this.createRefreshEffect({ x: 0, y: translateY })
        }
    }

    touchesEnded(touches: UITouch[]) {
        super.touchesEnded(touches)
        if (this.refreshControl !== undefined && this.refreshControl.animationView.alpha >= 1.0) {
            this.refreshControl.beginRefreshing_callFromScrollView()
        }
        else if (this.refreshControl !== undefined && this.refreshControl.animationView.alpha > 0.0) {
            this.refreshControl.animationView.alpha = 0.0
        }
        this.touchingRefreshOffsetY = 0.0
        this.markFlagDirty("refreshOffset")
    }

    touchesCancelled(touches: UITouch[]) {
        super.touchesCancelled(touches)
    }

    // FetchMoreControl

    private _fetchMoreControl: UIFetchMoreControl | undefined = undefined

    public get fetchMoreControl(): UIFetchMoreControl | undefined {
        return this._fetchMoreControl;
    }

    public set fetchMoreControl(value: UIFetchMoreControl | undefined) {
        this._fetchMoreControl = value;
        if (value) {
            value.scrollView = this
        }
    }

    public createFetchMoreEffect(): boolean {
        if (this.fetchMoreControl && this.fetchMoreControl.enabled && this.contentSize.width <= this.bounds.width) {
            if (this.fetchMoreControl.fetching) {
                return true
            }
            else {
                this.fetchMoreControl.beginFetching()
                return true
            }
        }
        return false
    }

    // Build Data

    private isContentOffsetScrollAnimated = false

    buildData() {
        let data = super.buildData()
        const totalContentSize = {
            width: this._contentSize.width + this._contentInset.left + this._contentInset.right,
            height: this._contentSize.height + this._contentInset.top + this._contentInset.bottom
        }
        if (this.dirtyFlags["contentOffsetX"] || this.dirtyFlags["contentOffsetY"]) {
            data.contentOffsetX = this._contentOffset.x + this._contentInset.left
            data.contentOffsetY = this._contentOffset.y + this._contentInset.top
            data.scrollWithAnimation = this.isContentOffsetScrollAnimated
        }
        data.inertia = this._pagingEnabled === true ? false : true
        data.scrollsToTop = this.scrollsToTop
        data.direction = (() => {
            if (totalContentSize.width > this.bounds.width && totalContentSize.height > this.bounds.height) {
                return "all"
            }
            else if (totalContentSize.width > this.bounds.width) {
                return "horizontal"
            }
            else if (totalContentSize.height > this.bounds.height) {
                return "vertical"
            }
            else {
                return "none"
            }
        })()
        data.contentSize = totalContentSize
        data.contentInset = this.contentInset
        if (!this._scrollEnabled) {
            data.direction = "none"
        }
        if (this.refreshControl) {
            data.refreshControlAnimationView = {
                clazz: "UIView",
                viewID: this.refreshControl.animationView.viewID
            }
            data.refreshing = this.refreshControl.refreshing ? 44 : 0
            if (isIOS) {
                data.refreshingAnimation = (wx.createAnimation({ timingFunction: "linear", duration: this.dirtyFlags["refreshing"] ? 300 : 0 }).matrix(1.0, 0.0, 0.0, 1.0, 0.0, this.contentInset.top + (this.refreshControl.refreshing ? 44 : 0)).step() as any).export()
                this.adjustInset = { top: this.refreshControl.refreshing ? 44 : 0, left: 0, bottom: 0, right: 0 }
            }
            else {
                data.refreshOffset = this.refreshControl.refreshing ? 44 : this.touchingRefreshOffsetY
                this.adjustInset = { top: this.refreshControl.refreshing ? 44 : 0, left: 0, bottom: 0, right: 0 }
            }
        }
        return data
    }

}