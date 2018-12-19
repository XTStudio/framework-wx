export class UIConfirm {

    constructor(public message: string) { }

    confirmTitle: string = "Yes"

    cancelTitle: string = "No"

    show(completed?: () => void, cancelled?: () => void): void {
        wx.showModal({
            title: "",
            content: this.message,
            cancelText: this.cancelTitle,
            confirmText: this.confirmTitle,
            success(res: any) {
                if (res.confirm) {
                    if (completed) {
                        completed()
                    }
                } else if (res.cancel) {
                    if (cancelled) {
                        cancelled()
                    }
                }
            }
        })
    }

}