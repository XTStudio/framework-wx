import { UISize, UISizeZero } from "./UISize";
import { EventEmitter } from "../kimi/EventEmitter";

export enum UIImageRenderingMode {
    automatic,
    alwaysOriginal,
    alwaysTemplate,
}

export class UIImage extends EventEmitter {

    imageSource: string | undefined = undefined

    renderingMode: UIImageRenderingMode = UIImageRenderingMode.alwaysOriginal

    constructor(readonly options: { name?: string, base64?: string, data?: any, renderingMode?: UIImageRenderingMode }, cloner: UIImage | undefined = undefined) {
        super()
        if (options.base64) {
            this.imageSource = "data:image/png;base64," + options.base64
        }
        else if (options.data) {
            this.imageSource = "data:image/png;base64," + options.data.base64EncodedString()
        }
        else if (options.name) {
            this.imageSource = `/assets/images/${options.name}@2x.png`
        }
        if (options.renderingMode !== undefined) {
            this.renderingMode = options.renderingMode
        }
    }

    static fromURL(url: string): UIImage {
        const image = new UIImage({})
        image.imageSource = url
        return image
    }

    static scaleFromName(name: string): number {
        if (name.indexOf("@2x") > 0) {
            return 2.0
        }
        else if (name.indexOf("@3x") > 0) {
            return 3.0
        }
        else if (name.indexOf("@4x") > 0) {
            return 4.0
        }
        return 1.0
    }

    async fetchSize(): Promise<UISize> {
        if (this.loaded) {
            return this.size
        }
        else {
            return await new Promise<UISize>((resolver, rejector) => {
                this.on("load", () => {
                    resolver(this.size)
                })
            })
        }
    }

    loaded = false

    size: UISize = UISizeZero

    scale: number = 1.0

}