import { UIComponentManager } from "./UIComponentManager";
import { UIViewManager } from "./UIViewManager";

// xt-framework/uiview.js

const nextTick = function (cb: any) {
    return (wx as any).nextTick !== undefined ? (wx as any).nextTick(cb) : setTimeout(cb, 0)
}

export class UIViewComponent {

    properties = {
        viewID: {
            type: String,
            value: undefined,
            observer: function (viewID: string | undefined, oldValue: string | undefined) {
                if (viewID === undefined || viewID === null) { return }
                const self: any = this
                UIComponentManager.shared.addComponent(self, viewID)
                const newView = UIViewManager.shared.fetchView(viewID);
                const viewData = newView.buildData()
                if (viewData.subviews.length > 50) {
                    self.setData({ ...viewData, subviews: [] });
                    for (let index = 0; index <= viewData.subviews.length; index += 50) {
                        nextTick(() => {
                            self.setData({
                                subviews: viewData.subviews.slice(0, index)
                            });
                        })
                    }
                }
                else {
                    self.setData(newView.buildData());
                }
            }
        }
    }

    lifetimes = {
        detached: function () {
            const self: any = this
            if (self.properties && self.properties.viewID) {
                UIComponentManager.shared.deleteComponent(self.properties.viewID)
            }
        }
    }

}

Component(new UIViewComponent)