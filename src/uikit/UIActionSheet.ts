enum UIAlertActionStyle {
    normal,
    danger,
    cancel,
}

class UIAlertAction {

    constructor(readonly title: string, readonly style: UIAlertActionStyle, readonly callback: (() => void) | undefined) { }

}

export class UIActionSheet {

    message: string = ""

    actions: UIAlertAction[] = []

    addRegularAction(title: string, actionBlock: () => void) {
        this.actions.push(new UIAlertAction(title, UIAlertActionStyle.normal, actionBlock))
    }

    addDangerAction(title: string, actionBlock: () => void) {
        this.actions.push(new UIAlertAction(title, UIAlertActionStyle.danger, actionBlock))
    }

    addCancelAction(title: string, actionBlock: () => void) {
        this.actions.push(new UIAlertAction(title, UIAlertActionStyle.cancel, actionBlock))
    }

    show() {
        wx.showActionSheet({
            itemList: this.actions.filter(it => it.style !== UIAlertActionStyle.cancel).map(it => {
                return it.title
            }),
            itemColor: this.actions.filter(it => it.style === UIAlertActionStyle.danger).length > 0 ? "#ff0000" : "#000000",
            success: (response) => {
                if (response && this.actions[response.tapIndex]) {
                    const callback = this.actions[response.tapIndex].callback
                    if (callback) {
                        callback()
                    }
                }
            },
            fail: () => {
                this.actions.forEach(it => {
                    if (it.style === UIAlertActionStyle.cancel && it.callback) {
                        it.callback()
                    }
                })
            }
        })
    }

}