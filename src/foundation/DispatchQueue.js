"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DispatchQueue {
    constructor(identifier) { }
    async(asyncBlock) {
        setTimeout(asyncBlock, 0);
    }
    asyncAfter(delayInSeconds, asyncBlock) {
        setTimeout(asyncBlock, delayInSeconds * 1000);
    }
    isolate(isolateBlock, ...args) {
        setTimeout(() => {
            isolateBlock.apply(undefined, args);
        }, 0);
    }
}
DispatchQueue.main = new DispatchQueue;
DispatchQueue.global = new DispatchQueue;
exports.DispatchQueue = DispatchQueue;
