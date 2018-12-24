export class Ticker {

    static get shared(): Ticker {
        if (getApp().TickerShared === undefined) {
            getApp().TickerShared = new Ticker
        }
        return getApp().TickerShared
    }

    private taskBlocks: { [key: string]: () => void } = {}

    hasTask(taskID: string): boolean {
        return this.taskBlocks[taskID] !== undefined
    }

    addTask(taskID: string, taskBlock: () => void) {
        this.taskBlocks[taskID] = taskBlock
        this.activeTimer()
    }

    run() {
        const currentBlocks = this.taskBlocks
        this.taskBlocks = {}
        this.timerHandler = undefined
        if (Object.keys(currentBlocks).length > 0) {
            for (const key in currentBlocks) {
                try {
                    currentBlocks[key]()
                } catch (error) { }
            }
        }
    }

    private timerHandler: any = undefined

    private activeTimer() {
        if (this.timerHandler !== undefined) { return }
        this.timerHandler = setTimeout(this.run.bind(this), 16)
    }

}