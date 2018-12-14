import { randomUUID } from "../uikit/helpers/UUID";

export class UIWindowManager {

    static get shared(): UIWindowManager {
        if (getApp().UIWindowManagerShared === undefined) {
            getApp().UIWindowManagerShared = new UIWindowManager
        }
        return getApp().UIWindowManagerShared
    }

    private windows: { [key: string]: any } = {}

    addWindow(window: any) {
        window.windowID = randomUUID()
        this.windows[window.windowID] = window
    }

    fetchWindow(windowID: string): any {
        return this.windows[windowID]
    }

}