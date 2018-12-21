export class OperationQueue {

    private locked = false
    private operations: (() => Promise<any>)[] = []

    addOperation(operation: () => Promise<any>) {
        this.operations.push(operation)
        this.run()
    }

    reset() {
        this.operations = []
    }

    run() {
        if (this.locked) { return }
        if (this.operations.length > 0) {
            this.locked = true
            this.operations[0]().then(() => {
                this.operations.shift()
                this.locked = false
                this.run()
            }).catch((error) => {
                console.error(error)
            })
        }
    }

}