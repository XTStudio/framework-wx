import { UUID } from "../foundation/UUID";

export class UIDevice {

    static readonly current: UIDevice = new UIDevice

    readonly name: string = "Browser"
    readonly model: string = "Browser"
    readonly systemName: string = "WeChat"
    readonly systemVersion: string = "1.0.0"
    readonly identifierForVendor: UUID

    constructor() {
        const systemInfo = wx.getSystemInfoSync()
        this.name = systemInfo.brand
        this.model = systemInfo.model
        this.systemName = "WeChat"
        this.systemVersion = systemInfo.SDKVersion
        const idfv = wx.getStorageSync("com.xt.identifierForVendor")
        if (typeof idfv === "string" && idfv.length > 0) {
            this.identifierForVendor = new UUID(idfv)
        }
        else {
            this.identifierForVendor = new UUID()
            wx.setStorageSync("com.xt.identifierForVendor", this.identifierForVendor.UUIDString)
        }
    }

}