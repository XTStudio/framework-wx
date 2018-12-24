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
    hasTask(taskID) {
        return this.taskBlocks[taskID] !== undefined;
    }
    addTask(taskID, taskBlock) {
        this.taskBlocks[taskID] = taskBlock;
        this.activeTimer();
    }
    run() {
        const currentBlocks = this.taskBlocks;
        this.taskBlocks = {};
        this.timerHandler = undefined;
        if (Object.keys(currentBlocks).length > 0) {
            for (const key in currentBlocks) {
                try {
                    currentBlocks[key]();
                }
                catch (error) { }
            }
        }
    }
    activeTimer() {
        if (this.timerHandler !== undefined) {
            return;
        }
        this.timerHandler = setTimeout(this.run.bind(this), 16);
    }
}
exports.Ticker = Ticker;
