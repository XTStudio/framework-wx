import { UIRect, UIRectZero } from "./UIRect";

export class UIScreen {

    static main = new UIScreen

    bounds: UIRect = { x: 0, y: 0, width: parseInt(wx.getSystemInfoSync().screenWidth), height: parseInt(wx.getSystemInfoSync().screenHeight) }

    scale: number = parseInt(wx.getSystemInfoSync().pixelRatio)

}