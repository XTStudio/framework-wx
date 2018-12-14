import { randomUUID } from "../uikit/helpers/UUID";

export class UIViewManager {

    static get shared(): UIViewManager {
        if (getApp().UIViewManagerManagerShared === undefined) {
            getApp().UIViewManagerManagerShared = new UIViewManager
        }
        return getApp().UIViewManagerManagerShared
    }

    private views: { [key: string]: any } = {}

    addView(view: any) {
        view.viewID = randomUUID()
        this.views[view.viewID] = view
    }

    fetchView(viewID: string): any {
        return this.views[viewID]
    }

    fetchViews(): any[] {
        return Object.keys(this.views).map(it => this.views[it])
    }

}