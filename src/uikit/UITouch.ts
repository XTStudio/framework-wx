import { UIPoint, UIPointZero } from "./UIPoint";
import { UIView, UIWindow } from "./UIView";
import { MagicObject } from "./helpers/MagicObject";

export enum UITouchPhase {
    began,
    moved,
    stationary,
    ended,
    cancelled,
}

export class UITouch {

    identifier: number = 0

    timestamp: number = 0.0

    phase: UITouchPhase = UITouchPhase.cancelled

    tapCount: number = 0

    _window: MagicObject = new MagicObject()

    get window(): UIWindow | undefined {
        return this._window.get()
    }

    set window(value: UIWindow | undefined) {
        this._window.set(value)
    }

    windowPoint: UIPoint | undefined = undefined

    _view: MagicObject = new MagicObject()

    get view(): UIView | undefined {
        return this._view.get()
    }

    set view(value: UIView | undefined) {
        this._view.set(value)
    }

    gestureRecognizers: any[] = []

    locationInView(view: UIView | undefined): UIPoint {
        const aView = view || this.view
        if (aView === undefined) {
            return UIPointZero
        }
        const windowPoint = this.windowPoint || UIPointZero
        return aView.convertPointFromWindow(windowPoint) || UIPointZero
    }

    previousLocationInView(view: UIView | undefined): UIPoint {
        return UIPointZero
    }

}

export class VelocityTracker {

    private movements: UITouch[] = []
    velocity: UIPoint = { x: 0, y: 0 }

    reset() {
        this.movements = []
        this.velocity = { x: 0, y: 0 }
    }

    addMovement(touch: UITouch) {
        this.movements.push({ ...touch } as UITouch)
    }

    computeCurrentVelocity() {
        for (let index = this.movements.length - 1; index >= 1; index--) {
            const current = this.movements[index]
            const last = this.movements[index - 1]
            if (!current.windowPoint || !last.windowPoint) {
                continue
            }
            if (current.phase == UITouchPhase.ended && last.phase == UITouchPhase.moved && current.timestamp - last.timestamp > 0.024) {
                this.velocity = { x: 0, y: 0 }
                break
            }
            if (current.phase != UITouchPhase.moved || last.phase != UITouchPhase.moved) {
                continue
            }
            const timeDiff = current.timestamp - last.timestamp
            if (timeDiff > 0.002) {
                this.velocity = {
                    x: (current.windowPoint.x - last.windowPoint.x) / timeDiff,
                    y: (current.windowPoint.y - last.windowPoint.y) / timeDiff,
                }
                break
            }
        }
    }

}