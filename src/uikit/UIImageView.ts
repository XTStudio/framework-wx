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
        this.markFlagDirty("imageSource")
    }

    protected _contentMode: UIViewContentMode = UIViewContentMode.scaleToFill

    public get contentMode(): UIViewContentMode {
        return this._contentMode;
    }

    public set contentMode(value: UIViewContentMode) {
        if (this._contentMode === value) { return }
        this._contentMode = value;
        this.markFlagDirty("scaleMode")
    }

    buildExtras() {
        let data = super.buildExtras()
        data.imageSource = this._image !== undefined ? this._image.imageSource : null
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
        return data
    }

}