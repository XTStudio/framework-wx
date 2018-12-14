import { UIView } from "./UIView";
import { UIPoint, UIPointZero } from "./UIPoint";
import { UISize, UISizeZero } from "./UISize";
import { UIEdgeInsets, UIEdgeInsetsZero } from "./UIEdgeInsets";
import { UIRect } from "./UIRect";
import { UIPanGestureRecognizer } from "./UIPanGestureRecognizer";

export class UIScrollView extends UIView {

    clazz = "UIScrollView"

    private _panGesture = new UIPanGestureRecognizer

    private _contentOffset: UIPoint = UIPointZero

    private _contentOffsetAnimated: boolean = false

    constructor() {
        super()
        this._panGesture.enabled = false
    }

    get contentOffset(): UIPoint {
        return this._contentOffset
    }

    set contentOffset(value: UIPoint) {
        this._contentOffset = value
        this._contentOffsetAnimated = false
        this.invalidate()
    }

    private _contentSize: UISize = UISizeZero

    get contentSize(): UISize {
        return this._contentSize
    }

    set contentSize(value: UISize) {
        this._contentSize = value
        this.invalidate()
    }

    contentInset: UIEdgeInsets = UIEdgeInsetsZero
    directionalLockEnabled: boolean = false
    private _bounces: boolean = true

    public get bounces(): boolean {
        return this._bounces;
    }

    public set bounces(value: boolean) {
        this._bounces = value;
        this.invalidate()
    }

    private _alwaysBounceVertical: boolean = false

    public get alwaysBounceVertical(): boolean {
        return this._alwaysBounceVertical;
    }

    public set alwaysBounceVertical(value: boolean) {
        this._alwaysBounceVertical = value;
        this.invalidate()
    }

    private _alwaysBounceHorizontal: boolean = false

    public get alwaysBounceHorizontal(): boolean {
        return this._alwaysBounceHorizontal;
    }

    public set alwaysBounceHorizontal(value: boolean) {
        this._alwaysBounceHorizontal = value;
        this.invalidate()
    }

    pagingEnabled: boolean = false

    // private _scrollDisabledTemporary: boolean = false

    // public get scrollDisabledTemporary(): boolean {
    //     return this._scrollDisabledTemporary;
    // }

    // public set scrollDisabledTemporary(value: boolean) {
    //     this._scrollDisabledTemporary = value;
    //     this.invalidate(true, true)
    // }

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

    setContentOffset(contentOffset: UIPoint, animated: boolean): void {
        this.contentOffset = contentOffset
        this._contentOffsetAnimated = animated
        if (this._contentOffsetAnimated) {
            setTimeout(() => {
                this._contentOffsetAnimated = false
            }, 32)
        }
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

    private _scrollsToTop: boolean = false

    public get scrollsToTop(): boolean {
        return this._scrollsToTop;
    }

    public set scrollsToTop(value: boolean) {
        this._scrollsToTop = value;
        this.invalidate()
    }

    // Delegates

    didScroll() {
        this.emit("didScroll", this)
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
                this.invalidate(true, true)
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
                this.invalidate(true, true)
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

}