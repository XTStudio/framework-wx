import { UIComponentManager } from "./UIComponentManager";
import { UIViewManager } from "./UIViewManager";

// xt-framework/uiview.js

export class UIViewComponent {

    properties = {
        props: {
            type: Object,
            value: {},
            observer: function (newVal: any) {
                if (newVal === undefined || newVal === null) { return }
                if (newVal.viewID) {
                    if ((this as any).viewID !== newVal.viewID) {
                        UIComponentManager.shared.addComponent(this, newVal.viewID)
                        const newView = UIViewManager.shared.fetchView(newVal.viewID)
                        if (newView) {
                            newView.markAllFlagsDirty()
                        }
                    }
                }
            }
        }
    }

    lifetimes = {
        detached: function () {
            if ((this as any).viewID) {
                UIComponentManager.shared.deleteComponent((this as any).viewID)
            }
        }
    }

}

Component(new UIViewComponent)