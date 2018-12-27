import { UIViewComponent } from "./UIView";
import { UIViewManager } from "./UIViewManager";

export class UIWebViewComponent extends UIViewComponent {

    methods = {
        onLoad: function () {
            const self: any = this
            if (self.data && self.data.viewID) {
                const view = UIViewManager.shared.fetchView(self.data.viewID)
                if (view) {
                    view.emit("didFinish")
                }
            }
        },
        onError: function () {
            const self: any = this
            if (self.data && self.data.viewID) {
                const view = UIViewManager.shared.fetchView(self.data.viewID)
                if (view) {
                    view.emit("didFail", Error("WebView error."))
                }
            }
        },
        onMessage: function (e: any) {
            const self: any = this
            if (self.data && self.data.viewID) {
                const view = UIViewManager.shared.fetchView(self.data.viewID)
                if (view) {
                    view.emit("message", e.detail.data)
                }
            }
        }
    }

}

Component(new UIWebViewComponent)