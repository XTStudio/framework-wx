import { UIViewController } from "./UIViewController";

export class UINavigationBarViewController extends UIViewController {

    clazz = "UINavigationBarViewController"

    constructor() {
        super()
        console.warn("暂时不支持 UINavigationBarViewController 在小程序中使用。");
    }

}