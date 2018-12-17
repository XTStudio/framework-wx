"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Timer {
    constructor(timeInterval, block, repeats) {
        this.repeats = repeats;
        this.cancelled = false;
        if (repeats) {
            this.handler = setInterval(() => {
                if (!this.cancelled && block) {
                    block();
                }
            }, timeInterval * 1000);
        }
        else {
            this.handler = setTimeout(() => {
                if (!this.cancelled && block) {
                    block();
                }
            }, timeInterval * 1000);
        }
    }
    static sleep(timeInterval) {
        return new Promise((resolver) => {
            new Timer(timeInterval, () => {
                resolver();
            }, false);
        });
    }
    invalidate() {
        this.cancelled = true;
        if (this.repeats) {
            clearInterval(this.handler);
        }
        else {
            clearTimeout(this.handler);
        }
    }
}
exports.Timer = Timer;
