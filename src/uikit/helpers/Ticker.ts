export class Ticker {

    static get shared(): Ticker {
        if (getApp().TickerShared === undefined) {
            getApp().TickerShared = new Ticker
        }
        return getApp().TickerShared
    }

    private taskBlocks: { [key: string]: () => void } = {}

    addTask(taskID: string, taskBlock: () => void) {
        this.taskBlocks[taskID] = taskBlock
        this.activeTimer()
    }

    run() {
        if (Object.keys(this.taskBlocks).length > 0) {
            for (const key in this.taskBlocks) {
                try {
                    this.taskBlocks[key]()
                } catch (error) { }
            }
            this.taskBlocks = {}
            this.timerHandler = undefined
        }
    }

    private timerHandler: any = undefined

    private activeTimer() {
        if (this.timerHandler !== undefined) { return }
        this.timerHandler = setTimeout(this.run.bind(this), 0)
    }

}