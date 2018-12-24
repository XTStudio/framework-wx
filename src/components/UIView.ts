import { UIComponentManager } from "./UIComponentManager";
import { UIViewManager } from "./UIViewManager";

// xt-framework/uiview.js

export class UIViewComponent {

    properties = {
        viewID: {
            type: String,
            value: undefined,
            observer: function (viewID: string | undefined) {
                if (viewID === undefined || viewID === null) { return }
                if ((this as any).viewID !== viewID) {
                    UIComponentManager.shared.addComponent(this, viewID)
                    const newView = UIViewManager.shared.fetchView(viewID);
                    (this as any).setData(newView.buildData());
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