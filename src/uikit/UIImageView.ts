import { UIView } from "./UIView";
import { UIImage } from "./UIImage";
import { UIViewContentMode } from "./UIEnums";

export class UIImageView extends UIView {

    clazz = "UIImageView"

    private _image: UIImage | undefined = undefined

    get image(): UIImage | undefined {
        return this._image
    }

    set image(value: UIImage | undefined) {
        if (this._image === value) { return }
        this._image = value
        this.isImageDirty = true
        this.invalidate()
    }

    private isImageDirty = false

    buildExtras() {
        let data = super.buildExtras()
        if (this.isImageDirty) {
            data.imageSource = this._image !== undefined ? this._image.imageSource : null
        }
        if (this.isStyleDirty) {
            data.scaleMode = (() => {
                switch (this._contentMode) {
                    case UIViewContentMode.scaleToFill:
                        return "scaleToFill"
                    case UIViewContentMode.scaleAspectFit:
                        return "aspectFit"
                    case UIViewContentMode.scaleAspectFill:
                        return "aspectFill"
                }
                return "scaleToFill"
            })()
        }
        return data
    }

    markAllFlagsDirty() {
        super.markAllFlagsDirty()
        this.isImageDirty = true
    }

    clearDirtyFlags() {
        super.clearDirtyFlags()
        this.isImageDirty = false
    }

}