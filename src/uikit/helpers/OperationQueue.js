"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OperationQueue {
    constructor() {
        this.locked = false;
        this.operations = [];
    }
    addOperation(operation) {
        this.operations.push(operation);
        this.run();
    }
    reset() {
        this.operations = [];
    }
    run() {
        if (this.locked) {
            return;
        }
        if (this.operations.length > 0) {
            this.locked = true;
            this.operations[0]().then(() => {
                this.operations.shift();
                this.locked = false;
                this.run();
            }).catch((error) => {
                console.error(error);
            });
        }
    }
}
exports.OperationQueue = OperationQueue;
