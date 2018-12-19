export class UIAlert {

    constructor(public message: string, public buttonText: string = "OK") { }

    show(callback: (() => void) | undefined): void {
        wx.showModal({
            title: "",
            content: this.message,
            showCancel: false,
            confirmText: this.buttonText,
            success(res: any) {
                if (callback) {
                    if (res.confirm) {
                        callback()
                    } else if (res.cancel) {
                        callback()
                    }
                }
            }
        })
    }

}