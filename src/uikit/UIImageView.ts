import { UIView } from "./UIView";
import { UIImage } from "./UIImage";

export class UIImageView extends UIView {

    clazz = "UIImageView"

    private _image: UIImage | undefined = undefined

    get image(): UIImage | undefined {
        return this._image
    }

    set image(value: UIImage | undefined) {
        this._image = value
        this.invalidate()
    }

}