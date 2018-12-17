import { UIViewElement } from "./UIView";

enum UIViewContentMode {
    scaleToFill,
    scaleAspectFit,
    scaleAspectFill,
}

export class UIImageViewElement extends UIViewElement {

    buildProps() {
        let props = this.getProps()
        return {
            ... super.buildProps(),
            imageSource: props._image !== undefined ? props._image.imageSource : null,
            scaleMode: (() => {
                switch (props._contentMode) {
                    case UIViewContentMode.scaleToFill:
                        return "scaleToFill"
                    case UIViewContentMode.scaleAspectFit:
                        return "aspectFit"
                    case UIViewContentMode.scaleAspectFill:
                        return "aspectFill"
                }
                return "scaleToFill"
            })(),
        }
    }

}

export class UIImageViewComponent {

    properties = {
        props: {
            type: Object,
            value: {},
            observer: function (newVal: any, oldVal: any) {
                UIViewElement.componentPropsChanged(this as any, UIImageViewElement, newVal)
            }
        }
    }

}

Component(new UIImageViewComponent)