import { UIRect, UIRectZero } from "./UIRect";
import { UIAffineTransform, UIAffineTransformIdentity, UIAffineTransformIsIdentity } from "./UIAffineTransform";
import { UIPoint } from "./UIPoint";
import { Matrix } from "./helpers/Matrix";
import { UIColor } from "./UIColor";
import { UIGestureRecognizer } from "./UIGestureRecognizer";

export let dirtyItems: UIView[] = []

export class UIView {

    clazz: string = "UIView"
    isDirty: boolean = true
    dataResponder: (() => void) | undefined = undefined

    constructor() {
        dirtyItems.push(this)
    }

    attach(dataResponder: () => void) {
        this.dataResponder = dataResponder
        this.dataResponder()
    }

    private _frame: UIRect = UIRectZero

    set frame(value: UIRect) {
        const boundsChanged = this._frame.width != value.width || this._frame.height != value.height
        this._frame = value;
        if (boundsChanged) {
            this.bounds = { x: 0, y: 0, width: value.width, height: value.height }
            this.setNeedsLayout(true)
        }
        this.invalidate()
    }

    get frame(): UIRect {
        return this.frame
    }

    public bounds: UIRect = UIRectZero

    get center(): UIPoint {
        return { x: this.frame.x + this.frame.width / 2.0, y: this.frame.y + this.frame.height / 2.0 };
    }

    set center(value: UIPoint) {
        this.frame = { x: value.x - this.frame.width / 2.0, y: value.y - this.frame.height / 2.0, width: this.frame.width, height: this.frame.height }
    }

    private _transform: UIAffineTransform = UIAffineTransformIdentity

    get transform(): UIAffineTransform {
        return this._transform;
    }

    set transform(value: UIAffineTransform) {
        this._transform = value;
        this.invalidate()
    }

    // hierarchy

    public tag: number = 0

    public viewDelegate: any = undefined

    _superview: WeakMap<UIView, UIView | undefined> = new WeakMap()

    public get superview(): UIView | undefined {
        return this._superview.get(this)
    }

    public set superview(value: UIView | undefined) {
        this._superview.set(this, value)
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
        this._clipsToBounds = value;
        this.invalidate()
    }

    public _hidden: boolean = false

    set hidden(value) {
        this._hidden = value
        this.invalidate()
    }

    get hidden() {
        return this._hidden
    }

    // protected _contentMode: UIViewContentMode = UIViewContentMode.scaleToFill

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
        this._alpha = value;
        this.invalidate();
    }

    get alpha() {
        return this._alpha;
    }

    _backgroundColor: UIColor | undefined = undefined

    set backgroundColor(value: UIColor | undefined) {
        this._backgroundColor = value
        this.invalidate()
    }

    get backgroundColor(): UIColor | undefined {
        return this._backgroundColor
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
            if (current.superview !== undefined && (current.superview as any).isScrollerView === true) {
                currentPoint.x += -(current.superview as any).domElement.scrollLeft
                currentPoint.y += -(current.superview as any).domElement.scrollTop
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
            if (it.superview !== undefined && (it.superview as any).isScrollerView === true) {
                currentPoint.x -= -(it.superview as any).domElement.scrollLeft
                currentPoint.y -= -(it.superview as any).domElement.scrollTop
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
        // this.domElement.style.pointerEvents = value ? "auto" : "none"
    }

    public gestureRecognizers: UIGestureRecognizer[] = []

    public addGestureRecognizer(gestureRecognizer: UIGestureRecognizer): void {
        this.gestureRecognizers.push(gestureRecognizer)
    }

    public removeGestureRecognizer(gestureRecognizer: UIGestureRecognizer): void {
        let index = this.gestureRecognizers.indexOf(gestureRecognizer)
        if (index >= 0) {
            this.gestureRecognizers.splice(index, 1)
        }
    }

    // Helpers



    invalidateCallHandler: any = undefined

    invalidate(dirty: boolean = true) {
        if (dirty) {
            this.isDirty = true
            dirtyItems.push(this)
        }
        let nextResponder = this.nextResponder()
        if (nextResponder !== undefined) {
            nextResponder.invalidate(false)
        }
        else {
            if (this.invalidateCallHandler === undefined) {
                this.invalidateCallHandler = setTimeout(() => {
                    this.invalidateCallHandler = undefined;
                    if (this.dataResponder) {
                        this.dataResponder()
                        dirtyItems.forEach(it => it.isDirty = false)
                        dirtyItems = []
                    }
                })
            }
        }
    }

}

export class UIWindow extends UIView {

}