export class UIAnimator {

    static shared = new UIAnimator

    static activeAnimator: UIAnimator | undefined = undefined

    static nextCompletion: (() => void) | undefined = undefined

    animationProps: { [key: string]: any } = {}

    linear(duration: number, isCurve: boolean, animations: () => void, completion: (() => void) | undefined) {
        if (UIAnimator.nextCompletion !== undefined) {
            UIAnimator.nextCompletion()
            UIAnimator.nextCompletion = undefined
        }
        this.animationProps = {
            duration: duration * 1000,
            timingFunction: isCurve ? "ease" : "linear"
        }
        UIAnimator.activeAnimator = this
        animations()
        UIAnimator.activeAnimator = undefined
        if (completion) {
            UIAnimator.nextCompletion = completion
            setTimeout(() => {
                if (UIAnimator.nextCompletion !== completion) { return }
                completion()
                UIAnimator.nextCompletion = undefined
            }, duration * 1000)
        }
    }

    static linear(duration: number, animations: () => void, completion: (() => void) | undefined) {
        UIAnimator.shared.linear(duration, false, animations, completion)
    }

    static curve(duration: number, animations: () => void, completion: (() => void) | undefined) {
        UIAnimator.shared.linear(duration, true, animations, completion)
    }

    static spring(tension: number, friction: number, animations: () => void, completion: (() => void) | undefined) {
        // not support spring animation for wx
        UIAnimator.shared.linear(0.3, false, animations, completion)
    }

    static bouncy(bounciness: number, speed: number, animations: () => void, completion: (() => void) | undefined) {
        // not support bouncy animation for wx
        UIAnimator.shared.linear(0.3, false, animations, completion)
    }

}