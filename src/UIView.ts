// xt-framework/uiview.js
import { UIRect, UIRectZero } from "./UIRect";
import { UIColor } from "./UIColor";
import { UIAffineTransform, UIAffineTransformIdentity, UIAffineTransformIsIdentity, UIAffineTransformEqualToTransform } from "./UIAffineTransform";
import { UIPoint } from "./UIPoint";

export class UIViewElement {

  component: WeApp.Page

  constructor(component: WeApp.Page) {
    this.component = component
  }

  buildStyle() {
    const props = this.component.properties.props || {}
    return `
    position: absolute;
    left: ${props._frame.x}px;
    top: ${props._frame.y}px;
    width: ${props._frame.width}px;
    height: ${props._frame.height}px; 
    background-color: ${props._backgroundColor !== undefined ? UIColor.toStyle(props._backgroundColor) : 'transparent'};
    opacity: ${props._alpha};
    display: ${props._hidden ? "none" : ""};
    `
  }

}

export class UIViewComponent {

  properties = {
    props: {
      type: Object,
      value: {},
      observer: function (newVal: any, oldVal: any) {
        if (newVal === undefined || newVal === null) { return }
        if (newVal.isDirty !== true) { return }
        var self: WeApp.Page = this as any
        if (self.el === undefined) {
          self.el = new UIViewElement(self)
        }
        self.setData({
          style: self.el.buildStyle(),
          subviews: newVal.subviews,
        })
      }
    },
  }

  data = {
    style: ''
  }

}

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
    // this.tintColorDidChange()
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

  nextResponder(): UIView | undefined {
    return this.viewDelegate || this.superview || undefined
  }

}

export class UIWindow extends UIView {

}

Component(new UIViewComponent())