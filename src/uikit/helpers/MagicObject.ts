export class MagicObject {

    private value = new Map()

    constructor(value: any = undefined) {
        this.set(value)
    }

    set(value: any) {
        this.value.set("1", value)
    }

    get() {
        return this.value.get("1")
    }

}