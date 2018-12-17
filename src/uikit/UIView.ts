import { UIRect, UIRectZero, UIRectEqualToRect } from "./UIRect";
import { UIAffineTransform, UIAffineTransformIdentity, UIAffineTransformIsIdentity, UIAffineTransformEqualToTransform } from "./UIAffineTransform";
import { UIPoint } from "./UIPoint";
import { Matrix } from "./helpers/Matrix";
import { UIColor } from "./UIColor";
import { UIGestureRecognizer } from "./UIGestureRecognizer";
import { UIWindowManager } from "../components/UIWindowManager";
import { UITouch, UITouchPhase, VelocityTracker, } from "./UITouch";
import { UIEdgeInsets, UIEdgeInsetsZero } from "./UIEdgeInsets";
import { UISize } from "./UISize";
import { MagicObject } from "./helpers/MagicObject";
import { UIAnimator } from "./UIAnimator";
import { UIViewManager } from "../components/UIViewManager";
import { EventEmitter } from "../kimi/EventEmitter";
import { UIViewContentMode } from "./UIEnums";

export let dirtyItems: UIView[] = []

export class UIView extends EventEmitter {

    clazz: string = "UIView"
    isDirty: boolean = true
    dataOwner: any = undefined
    dataField: string | undefined = undefined
    animationProps: { [key: string]: any } = {}
    animationValues: { [key: string]: any } = {}

    constructor() {
        super()
        UIViewManager.shared.addView(this)
        dirtyItems.push(this)
    }

    attach(dataOwner: any, dataField: string) {
        if (!(this instanceof UIWindow)) {
            const window = new UIWindow()
            window.attach(dataOwner, dataField, this)
        }
    }

    private _frame: UIRect = UIRectZero

    set frame(value: UIRect) {
        if (UIRectEqualToRect(this._frame, value)) { return }
        if (UIAnimator.activeAnimator !== undefined) {
            this.animationProps = UIAnimator.activeAnimator.animationProps
            if (Math.abs(this._frame.x - value.x) > 0.001) {
                this.animationValues["frame.x"] = value.x;
            }
            if (Math.abs(this._frame.y - value.y) > 0.001) {
                this.animationValues["frame.y"] = value.y;
            }
            if (Math.abs(this._frame.width - value.width) > 0.001) {
                this.animationValues["frame.width"] = value.width;
            }
            if (Math.abs(this._frame.height - value.height) > 0.001) {
                this.animationValues["frame.height"] = value.height;
            }
        }
        const boundsChanged = this._frame.width != value.width || this._frame.height != value.height
        this._frame = value;
        if (boundsChanged) {
            this.bounds = { x: 0, y: 0, width: value.width, height: value.height }
            this.setNeedsLayout(true)
        }
        this.invalidate()
    }

    get frame(): UIRect {
        return this._frame
    }

    public bounds: UIRect = UIRectZero

    get center(): UIPoint {
        return { x: this.frame.x + this.frame.width / 2.0, y: this.frame.y + this.frame.height / 2.0 };
    }

    set center(value: UIPoint) {
        this.frame = { x: value.x - this.frame.width / 2.0, y: value.y - this.frame.height / 2.0, width: this.frame.width, height: this.frame.height }
    }

    touchAreaInsets: UIEdgeInsets = UIEdgeInsetsZero

    private _transform: UIAffineTransform = UIAffineTransformIdentity

    get transform(): UIAffineTransform {
        return this._transform;
    }

    set transform(value: UIAffineTransform) {
        if (UIAffineTransformEqualToTransform(this._transform, value)) {
            return
        }
        if (UIAnimator.activeAnimator !== undefined) {
            this.animationProps = UIAnimator.activeAnimator.animationProps
            this.animationValues["transform"] = value;
        }
        this._transform = value;
        this.invalidate()
    }

    // hierarchy

    public tag: number = 0

    private _viewDelegate: MagicObject = new MagicObject()

    get viewDelegate(): any {
        return this._viewDelegate.get()
    }

    set viewDelegate(value: any) {
        this._viewDelegate.set(value)
    }

    private _superview = new MagicObject()

    public get superview(): UIView | undefined {
        return this._superview.get()
    }

    public set superview(value: UIView | undefined) {
        this._superview.set(value)
    }

    public subviews: UIView[] = []

    public get window(): UIWindow | undefined {
        if (this instanceof UIWindow) {
            return this
        }
        else if (this.superview) {
            return this.superview.window
        }
        return undefined
    }

    public get viewController(): any {
        if (this.viewDelegate !== undefined) {
            return this.viewDelegate
        }
        else if (this.superview) {
            return this.superview.viewController
        }
        return undefined
    }

    removeFromSuperview() {
        if (this.superview !== undefined) {
            const superview = this.superview
            superview.willRemoveSubview(this)
            this.willMoveToSuperview(undefined)
            superview.subviews = this.superview.subviews.filter(it => it !== this)
            this.superview = undefined
            superview.invalidate()
            this.didMoveToSuperview()
            this.didRemovedFromWindow()
        }
    }

    didRemovedFromWindow() {
        this.subviews.forEach(it => it.didRemovedFromWindow())
    }

    insertSubviewAtIndex(view: UIView, index: number): void {
        if (view.superview !== undefined) {
            view.removeFromSuperview()
        }
        view.willMoveToSuperview(this)
        view.superview = this
        this.subviews.splice(index, 0, view)
        this.invalidate()
        view.invalidate()
        view.didMoveToSuperview()
        this.didAddSubview(view)
    }

    exchangeSubview(index1: number, index2: number): void {
        const index2View = this.subviews[index2]
        this.subviews[index2] = this.subviews[index1]
        this.subviews[index1] = index2View
        this.invalidate()
    }

    addSubview(view: UIView): void {
        if (view.superview !== undefined) {
            view.removeFromSuperview()
        }
        view.willMoveToSuperview(this)
        if (this.window) {
            view.willMoveToWindow(this.window)
        }
        view.superview = this
        this.subviews.push(view)
        this.invalidate()
        view.invalidate()
        view.didMoveToSuperview()
        this.didAddSubview(view)
        view.didMoveToWindow()
    }

    insertSubviewBelowSubview(view: UIView, belowSubview: UIView): void {
        let index = this.subviews.indexOf(belowSubview)
        if (index >= 0) {
            this.insertSubviewAtIndex(view, index)
        }
    }

    insertSubviewAboveSubview(view: UIView, aboveSubview: UIView): void {
        let index = this.subviews.indexOf(aboveSubview)
        if (index >= 0) {
            this.insertSubviewAtIndex(view, index + 1)
        }
    }

    bringSubviewToFront(view: UIView): void {
        let index = this.subviews.indexOf(view)
        if (index >= 0) {
            this.subviews.splice(index, 1)
            this.subviews.push(view)
            this.invalidate()
        }
    }

    sendSubviewToBack(view: UIView): void {
        let index = this.subviews.indexOf(view)
        if (index >= 0) {
            this.subviews.splice(index, 1)
            this.subviews.unshift(view)
            this.invalidate()
        }
    }

    isDescendantOfView(view: UIView): boolean {
        let current: UIView | undefined = this
        while (current != undefined) {
            if (current == view) {
                return true
            }
            current = current.superview
        }
        return false
    }

    viewWithTag(tag: number): UIView | undefined {
        for (let index = 0; index < this.subviews.length; index++) {
            let element = this.subviews[index];
            if (element.tag === tag) {
                return element
            }
            let target = element.viewWithTag(tag);
            if (target !== undefined) {
                return target
            }
        }
        return undefined
    }

    // Delegates

    didAddSubview(subview: UIView): void {
        if (this.viewDelegate) {
            this.viewDelegate.didAddSubview(subview)
        }
    }

    willRemoveSubview(subview: UIView): void { }

    willMoveToSuperview(newSuperview: UIView | undefined): void { }

    didMoveToSuperview(): void {
        this.tintColorDidChange()
    }

    willMoveToWindow(window: UIWindow | undefined): void {
        this.subviews.forEach(it => it.willMoveToWindow(window))
    }

    didMoveToWindow(): void {
        this.subviews.forEach(it => it.didMoveToWindow())
    }

    setNeedsLayout(layoutSubviews = false): void {
        if (!layoutSubviews) { return }
        this.layoutIfNeeded()
    }

    layoutIfNeeded(): void {
        this.layoutSubviews()
    }

    layoutSubviews(): void {
        if (this.viewDelegate) {
            this.viewDelegate.viewWillLayoutSubviews()
            this.viewDelegate.viewDidLayoutSubviews()
        }
    }

    // Rendering

    setNeedsDisplay(): void { }

    private _clipsToBounds: boolean = false

    public get clipsToBounds(): boolean {
        return this._clipsToBounds;
    }

    public set clipsToBounds(value: boolean) {
        if (this._clipsToBounds === value) { return }
        this._clipsToBounds = value;
        this.invalidate()
    }

    public _hidden: boolean = false

    set hidden(value) {
        if (this._hidden === value) { return }
        this._hidden = value
        this.invalidate()
    }

    get hidden() {
        return this._hidden
    }

    private _contentMode: UIViewContentMode = UIViewContentMode.scaleToFill

    public get contentMode(): UIViewContentMode {
        return this._contentMode;
    }

    public set contentMode(value: UIViewContentMode) {
        this._contentMode = value;
        this.invalidate()
    }

    private _tintColor: UIColor | undefined = undefined

    set tintColor(value: UIColor) {
        this._tintColor = value;
        this.tintColorDidChange()
    }

    get tintColor(): UIColor {
        return this._tintColor || (this.superview && this.superview.tintColor) || new UIColor(0.0, 122.0 / 255.0, 1.0, 1.0);
    }

    tintColorDidChange(): void {
        this.subviews.forEach(it => it.tintColorDidChange())
    }

    private _alpha: number = 1.0

    set alpha(value) {
        if (this._alpha === value) { return }
        if (UIAnimator.activeAnimator !== undefined) {
            this.animationProps = UIAnimator.activeAnimator.animationProps
            this.animationValues["alpha"] = value;
        }
        this._alpha = value;
        this.invalidate();
    }

    get alpha() {
        return this._alpha;
    }

    _backgroundColor: UIColor | undefined = undefined

    set backgroundColor(value: UIColor | undefined) {
        if (UIAnimator.activeAnimator !== undefined) {
            this.animationProps = UIAnimator.activeAnimator.animationProps
            this.animationValues["backgroundColor"] = value;
        }
        this._backgroundColor = value
        this.invalidate()
    }

    get backgroundColor(): UIColor | undefined {
        return this._backgroundColor
    }

    private _extraStyles: string | undefined = undefined

    public get extraStyles(): string | undefined {
        return this._extraStyles;
    }

    public set extraStyles(value: string | undefined) {
        this._extraStyles = value;
        this.invalidate()
    }

    convertPointToView(point: UIPoint, toView: UIView): UIPoint {
        const fromPoint = this.convertPointToWindow(point)
        if (!fromPoint) {
            return point
        }
        if (toView instanceof UIWindow) {
            return fromPoint
        }
        return toView.convertPointFromWindow(fromPoint) || point
    }

    convertPointFromView(point: UIPoint, fromView: UIView): UIPoint {
        return fromView.convertPointToView(point, this)
    }

    convertRectToView(rect: UIRect, toView: UIView): UIRect {
        let lt = this.convertPointToView({ x: rect.x, y: rect.y }, toView)
        let rt = this.convertPointToView({ x: rect.x + rect.width, y: rect.y }, toView)
        let lb = this.convertPointToView({ x: rect.x, y: rect.y + rect.height }, toView)
        let rb = this.convertPointToView({ x: rect.x + rect.width, y: rect.y + rect.height }, toView)
        return {
            x: Math.min(lt.x, rt.x, lb.x, rb.x),
            y: Math.min(lt.y, rt.y, lb.y, rb.y),
            width: Math.max(lt.x, rt.x, lb.x, rb.x) - Math.min(lt.x, rt.x, lb.x, rb.x),
            height: Math.max(lt.y, rt.y, lb.y, rb.y) - Math.min(lt.y, rt.y, lb.y, rb.y),
        }
    }

    convertRectFromView(rect: UIRect, fromView: UIView): UIRect {
        return fromView.convertRectToView(rect, this)
    }

    convertPointToWindow(point: UIPoint): UIPoint | undefined {
        if (this.window === undefined) {
            return undefined
        }
        var current: UIView | undefined = this
        let currentPoint = { x: point.x, y: point.y }
        while (current !== undefined) {
            if (current instanceof UIWindow) { break }
            if (!UIAffineTransformIsIdentity(current.transform)) {
                const unmatrix = Matrix.unmatrix(current.transform as Matrix)
                const matrix2 = new Matrix()
                matrix2.postTranslate(-(current.frame.width / 2.0), -(current.frame.height / 2.0))
                matrix2.postRotate(unmatrix.degree / (180.0 / Math.PI))
                matrix2.postScale(unmatrix.scale.x, unmatrix.scale.y)
                matrix2.postTranslate(unmatrix.translate.x, unmatrix.translate.y)
                matrix2.postTranslate((current.frame.width / 2.0), (current.frame.height / 2.0))
                const x = currentPoint.x;
                const y = currentPoint.y;
                currentPoint.x = x * matrix2.a + y * matrix2.c + matrix2.tx;
                currentPoint.y = x * matrix2.b + y * matrix2.d + matrix2.ty;
            }
            if (current.superview !== undefined && current.superview.clazz === "UIScrollView") {
                currentPoint.x += -(current.superview as any).contentOffset.x
                currentPoint.y += -(current.superview as any).contentOffset.y
            }
            currentPoint.x += current.frame.x
            currentPoint.y += current.frame.y
            current = current.superview
        }
        return currentPoint
    }

    convertPointFromWindow(point: UIPoint): UIPoint | undefined {
        if (this.window == undefined) {
            return undefined
        }
        var current: UIView | undefined = this
        var routes: UIView[] = []
        while (current !== undefined) {
            if (current instanceof UIWindow) { break }
            routes.unshift(current)
            current = current.superview
        }
        let currentPoint = { x: point.x, y: point.y }
        routes.forEach((it) => {
            if (it.superview !== undefined && it.superview.clazz === "UIScrollView") {
                currentPoint.x -= -(it.superview as any).contentOffset.x
                currentPoint.y -= -(it.superview as any).contentOffset.y
            }
            currentPoint.x -= it.frame.x
            currentPoint.y -= it.frame.y
            if (!UIAffineTransformIsIdentity(it.transform)) {
                const unmatrix = Matrix.unmatrix(it.transform as Matrix)
                const matrix2 = new Matrix()
                matrix2.postTranslate(-(it.frame.width / 2.0), -(it.frame.height / 2.0))
                matrix2.postRotate(unmatrix.degree / (180.0 / Math.PI))
                matrix2.postScale(unmatrix.scale.x, unmatrix.scale.y)
                matrix2.postTranslate(unmatrix.translate.x, unmatrix.translate.y)
                matrix2.postTranslate((it.frame.width / 2.0), (it.frame.height / 2.0))
                const id = 1 / ((matrix2.a * matrix2.d) + (matrix2.c * -matrix2.b));
                const x = currentPoint.x;
                const y = currentPoint.y;
                currentPoint.x = (matrix2.d * id * x) + (-matrix2.c * id * y) + (((matrix2.ty * matrix2.c) - (matrix2.tx * matrix2.d)) * id);
                currentPoint.y = (matrix2.a * id * y) + (-matrix2.b * id * x) + (((-matrix2.ty * matrix2.a) + (matrix2.tx * matrix2.b)) * id);
            }
        })
        return currentPoint
    }

    nextResponder(): UIView | undefined {
        return this.viewDelegate || this.superview || undefined
    }

    // GestureRecognizers

    private _userInteractionEnabled: boolean = true

    public get userInteractionEnabled(): boolean {
        return this._userInteractionEnabled;
    }

    public set userInteractionEnabled(value: boolean) {
        if (this._userInteractionEnabled === value) { return }
        this._userInteractionEnabled = value;
    }

    private _gestureRecognizers: MagicObject = new MagicObject([])

    public get gestureRecognizers(): UIGestureRecognizer[] {
        return this._gestureRecognizers.get()
    }

    public addGestureRecognizer(gestureRecognizer: UIGestureRecognizer): void {
        this.gestureRecognizers.push(gestureRecognizer)
    }

    public removeGestureRecognizer(gestureRecognizer: UIGestureRecognizer): void {
        let index = this.gestureRecognizers.indexOf(gestureRecognizer)
        if (index >= 0) {
            this.gestureRecognizers.splice(index, 1)
        }
    }

    // Touches

    hitTest(point: UIPoint): UIView | undefined {
        if (this.userInteractionEnabled && this.alpha > 0.0 && !this.hidden && this.pointInside(point)) {
            for (let index = this.subviews.length - 1; index >= 0; index--) {
                const it = this.subviews[index]
                const convertedPoint = it.convertPointFromView(point, this)
                const testedView = it.hitTest(convertedPoint)
                if (testedView !== undefined) {
                    return testedView
                }
            }
            return this
        }
        return undefined
    }

    touchesBegan(touches: UITouch[]) {
        this.gestureRecognizers.filter((it) => it.enabled).forEach((it) => {
            it.handleTouch(touches)
        })
        if (this.superview) {
            this.superview.touchesBegan(touches)
        }
    }

    touchesMoved(touches: UITouch[]) {
        this.gestureRecognizers.filter((it) => it.enabled).forEach((it) => {
            it.handleTouch(touches)
        })
        if (this.superview) {
            this.superview.touchesMoved(touches)
        }
    }

    touchesEnded(touches: UITouch[]) {
        this.gestureRecognizers.filter((it) => it.enabled).forEach((it) => {
            it.handleTouch(touches)
        })
        if (this.superview) {
            this.superview.touchesEnded(touches)
        }
    }

    touchesCancelled(touches: UITouch[]) {
        this.gestureRecognizers.filter((it) => it.enabled).forEach((it) => {
            it.handleTouch(touches)
        })
        if (this.superview) {
            this.superview.touchesCancelled(touches)
        }
    }

    touchesWheel(delta: UIPoint) {
        if (this.superview) {
            this.superview.touchesWheel(delta)
        }
    }

    intrinsicContentSize(): UISize | undefined {
        return undefined
    }

    pointInside(point: UIPoint): boolean {
        return point.x >= 0.0 - this.touchAreaInsets.left &&
            point.y >= 0.0 - this.touchAreaInsets.top &&
            point.x <= this.frame.width + this.touchAreaInsets.right &&
            point.y <= this.frame.height + this.touchAreaInsets.bottom
    }

    // Helpers

    static _recognizedGesture: any

    static get recognizedGesture() {
        return this._recognizedGesture
    }

    static set recognizedGesture(value: any) {
        this._recognizedGesture = value
        // if (value !== undefined) {
        //     if (value.enabled === false) { return }
        //     UIViewManager.shared.fetchViews().filter(it => it.clazz === "UIScrollView").forEach(it => {
        //         it.scrollDisabledTemporary = true
        //     })
        // }
        // else {
        //     UIViewManager.shared.fetchViews().filter(it => it.clazz === "UIScrollView").forEach(it => {
        //         it.scrollDisabledTemporary = false
        //     })
        // }
    }

    invalidateCallHandler: any = undefined

    invalidate(dirty: boolean = true, force: boolean = false) {
        if (dirty) {
            this.isDirty = true
            dirtyItems.push(this)
        }
        let nextResponder = this.nextResponder()
        if (nextResponder !== undefined) {
            nextResponder.invalidate(true, force)
        }
        else {
            if (force) {
                if (this.dataOwner && this.dataField) {
                    this.dataOwner.setData({
                        [this.dataField]: this
                    })
                }
                dirtyItems.forEach(it => {
                    it.isDirty = false
                    it.animationProps = {}
                    it.animationValues = {}
                })
                dirtyItems = []
                return
            }
            if (this.invalidateCallHandler === undefined) {
                this.invalidateCallHandler = setTimeout(() => {
                    this.invalidateCallHandler = undefined;
                    if (this.dataOwner && this.dataField) {
                        this.dataOwner.setData({
                            [this.dataField]: this
                        })
                    }
                    dirtyItems.forEach(it => {
                        it.isDirty = false
                        it.animationProps = {}
                        it.animationValues = {}
                    })
                    dirtyItems = []
                })
            }
        }
    }

}

export class UIWindow extends UIView {

    clazz = "UIWindow"

    rootView: UIView | undefined

    constructor() {
        super()
        UIWindowManager.shared.addWindow(this)
    }

    attach(dataOwner: any, dataField: string, rootView: UIView | undefined = undefined) {
        if (rootView) {
            this.rootView = rootView
            this.addSubview(rootView)
            this.layoutSubviews()
        }
        this.dataOwner = dataOwner
        this.dataField = dataField
        this.invalidate()
    }

    layoutSubviews() {
        super.layoutSubviews()
        if (this.rootView) {
            this.rootView.frame = this.bounds
        }
    }

    set frame(_: UIRect) { }

    get frame(): UIRect {
        const systemInfo = wx.getSystemInfoSync()
        return {
            x: 0,
            y: 0,
            width: parseInt(systemInfo.windowWidth),
            height: parseInt(systemInfo.windowHeight),
        }
    }

    set bounds(_: UIRect) { }

    get bounds(): UIRect {
        const systemInfo = wx.getSystemInfoSync()
        return {
            x: 0,
            y: 0,
            width: parseInt(systemInfo.windowWidth),
            height: parseInt(systemInfo.windowHeight),
        }
    }

    // touches

    private currentTouchesID: number[] = []
    private _touches: MagicObject = new MagicObject({})
    set touches(value: { [key: number]: UITouch }) {
        this._touches.set(value)
    }
    get touches(): { [key: number]: UITouch } {
        return this._touches.get()
    }
    private upCount: Map<UIPoint, number> = new Map()
    private upTimestamp: Map<UIPoint, number> = new Map()

    private handleTouchStart(e: TouchEvent) {
        const changedTouches = this.standardlizeTouches(e)
        for (let index = 0; index < changedTouches.length; index++) {
            const pointer = changedTouches[index];
            const pointerIdentifier = this.standardlizeTouchIdentifier(pointer)
            this.currentTouchesID.push(pointerIdentifier)
            const point: UIPoint = { x: pointer.pageX, y: pointer.pageY }
            const target = this.hitTest(point)
            if (target) {
                const touch = new UITouch()
                this.touches[pointerIdentifier] = touch
                touch.identifier = pointerIdentifier
                touch.phase = UITouchPhase.began
                touch.tapCount = (() => {
                    for (const [key, value] of this.upCount) {
                        const timestamp = this.upTimestamp.get(key) || 0.0
                        if ((e.timeStamp / 1000) - timestamp < 1.0
                            && Math.abs(key.x - point.x) < 44.0 && Math.abs(key.y - point.y) < 44.0) {
                            return value + 1
                        }
                    }
                    return 1
                })()
                touch.timestamp = e.timeStamp / 1000
                touch.window = this
                touch.windowPoint = point
                touch.view = target
                if (touch.identifier == 0) {
                    sharedVelocityTracker.addMovement(touch)
                }
                touch.view.touchesBegan([touch])
            }
        }
    }

    private handleTouchMove(e: TouchEvent) {
        const changedTouches = this.standardlizeTouches(e)
        for (let index = 0; index < changedTouches.length; index++) {
            const pointer = changedTouches[index];
            const pointerIdentifier = this.standardlizeTouchIdentifier(pointer)
            const point: UIPoint = { x: pointer.pageX, y: pointer.pageY }
            const touch = this.touches[pointerIdentifier]
            if (touch === undefined) {
                return false
            }
            touch.phase = UITouchPhase.moved
            touch.timestamp = e.timeStamp / 1000
            touch.windowPoint = point
            if (touch.identifier == 0) {
                sharedVelocityTracker.addMovement(touch)
            }
            if (touch.view) {
                touch.view.touchesMoved([touch])
            }
        }
    }

    private handleTouchEnd(e: TouchEvent) {
        const changedTouches = this.standardlizeTouches(e)
        for (let index = 0; index < changedTouches.length; index++) {
            const pointer = changedTouches[index];
            const pointerIdentifier = this.standardlizeTouchIdentifier(pointer)
            const point: UIPoint = { x: pointer.pageX, y: pointer.pageY }
            const touch = this.touches[pointerIdentifier]
            if (touch !== undefined) {
                touch.phase = UITouchPhase.ended
                touch.timestamp = e.timeStamp / 1000
                touch.windowPoint = point
                if (touch.identifier == 0) {
                    sharedVelocityTracker.addMovement(touch)
                }
                if (touch.view) {
                    touch.view.touchesEnded([touch])
                }
            }
            const idx = this.currentTouchesID.indexOf(pointerIdentifier)
            if (idx >= 0) {
                this.currentTouchesID.splice(idx, 1)
            }
        }
        if (this.currentTouchesID.length == 0) {
            this.upCount.clear()
            this.upTimestamp.clear()
            for (const key in this.touches) {
                if (this.touches.hasOwnProperty(key)) {
                    const it = this.touches[key];
                    if (it.windowPoint) {
                        this.upCount.set(it.windowPoint, it.tapCount)
                        this.upTimestamp.set(it.windowPoint, it.timestamp)
                    }
                }
            }
            this.touches = {}
            sharedVelocityTracker.reset()
            setTimeout(() => {
                UIView.recognizedGesture = undefined
            }, 0)
        }
    }

    private handleTouchCancel(e: TouchEvent) {
        const changedTouches = this.standardlizeTouches(e)
        for (let index = 0; index < changedTouches.length; index++) {
            const pointer = changedTouches[index];
            const pointerIdentifier = this.standardlizeTouchIdentifier(pointer)
            const point: UIPoint = { x: pointer.pageX, y: pointer.pageY }
            const touch = this.touches[pointerIdentifier]
            if (touch) {
                touch.phase = UITouchPhase.cancelled
                touch.timestamp = e.timeStamp
                touch.windowPoint = point
                if (touch.identifier == 0) {
                    sharedVelocityTracker.addMovement(touch)
                }
                if (touch.view) {
                    touch.view.touchesCancelled([touch])
                }
            }
        }
        this.upCount.clear()
        this.upTimestamp.clear()
        this.touches = {}
    }

    private standardlizeTouches(e: TouchEvent): Touch[] {
        if (e.changedTouches) {
            return new Array(e.changedTouches.length)
                .fill(0)
                .map((_, i) => e.changedTouches[i])
                .map(it => {
                    if (it.identifier < -100 || it.identifier > 100) {
                        (it as any).identifier_2 = (() => {
                            for (let index = 0; index < e.touches.length; index++) {
                                if (e.touches[index].identifier === it.identifier) {
                                    return index
                                }
                            }
                            return 0
                        })()
                        return it
                    }
                    else {
                        return it
                    }
                })
        }
        else {
            return []
        }
    }

    private standardlizeTouchIdentifier(touch: any): number {
        return typeof touch.identifier_2 === "number" ? touch.identifier_2 : touch.identifier
    }

}

export const sharedVelocityTracker = new VelocityTracker