import { UIViewComponent } from "./UIView";

export class UIButtonComponent extends UIViewComponent {

    methods = {
        onImageLoaded: function (e: any) {
            (this as any).setData({
                imageWidth: e.detail.width / 2,
                imageHeight: e.detail.height / 2,
            })
        }
    }

}

Component(new UIButtonComponent)