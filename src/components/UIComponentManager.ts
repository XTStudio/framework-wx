import { randomUUID } from "../uikit/helpers/UUID";

export class UIComponentManager {

    static get keyWindowComponent(): any {
        return getApp().UIComponentManagerKeyWindowComponent
    }

    static set keyWindowComponent(value: any) {
        getApp().UIComponentManagerKeyWindowComponent = value
    }

    static get shared(): UIComponentManager {
        if (getApp().UIComponentManagerShared === undefined) {
            getApp().UIComponentManagerShared = new UIComponentManager
        }
        return getApp().UIComponentManagerShared
    }

    private components: { [key: string]: any } = {}

    addComponent(component: any, viewID: string) {
        this.components[viewID] = component
    }

    fetchComponent(viewID: string): any {
        return this.components[viewID]
    }

    deleteComponent(viewID: string) {
        delete this.components[viewID]
    }

}