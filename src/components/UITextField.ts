import { UIViewComponent } from "./UIView";
import { UIViewManager } from "./UIViewManager";

export class UITextFieldComponent extends UIViewComponent {

    methods = {
        onChange: function (e: any) {
            const self = this as any
            const view = UIViewManager.shared.fetchView(self.data.viewID)
            if (view) {
                const oldText = view._text
                const newText = e.detail.value.substr(0, e.detail.cursor)
                if (e.detail.cursor == newText.length && view.val("shouldChange", this, { location: 0, length: 0 }, (() => {
                    if (newText.length > oldText.length) {
                        return newText.substr(oldText.length, newText.length)
                    }
                    return ""
                })()) === false) {
                    return view._text
                }
                view._text = e.detail.value
                view.textDidChanged()
            }
        },
        onFocus: function () {
            const self = this as any
            const view = UIViewManager.shared.fetchView(self.data.viewID)
            if (view) {
                view.editing = true
            }
        },
        onBlur: function () {
            const self = this as any
            const view = UIViewManager.shared.fetchView(self.data.viewID)
            if (view) {
                view.editing = false
            }
        },
        onReturn: function () {
            const self = this as any
            const view = UIViewManager.shared.fetchView(self.data.viewID)
            if (view) {
                view.onReturn()
            }
        }
    }

}

Component(new UITextFieldComponent)