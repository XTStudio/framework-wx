"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Ticker {
    constructor() {
        this.taskBlocks = {};
        this.timerHandler = undefined;
    }
    static get shared() {
        if (getApp().TickerShared === undefined) {
            getApp().TickerShared = new Ticker;
        }
        return getApp().TickerShared;
    }
    addTask(taskID, taskBlock) {
        this.taskBlocks[taskID] = taskBlock;
        this.activeTimer();
    }
    run() {
        if (Object.keys(this.taskBlocks).length > 0) {
            for (const key in this.taskBlocks) {
                try {
                    this.taskBlocks[key]();
                }
                catch (error) { }
            }
            this.taskBlocks = {};
            this.timerHandler = undefined;
        }
    }
    activeTimer() {
        if (this.timerHandler !== undefined) {
            return;
        }
        this.timerHandler = setTimeout(this.run.bind(this), 0);
    }
}
exports.Ticker = Ticker;
