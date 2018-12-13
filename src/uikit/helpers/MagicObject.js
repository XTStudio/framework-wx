"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MagicObject {
    constructor(value = undefined) {
        this.value = new Map();
        this.set(value);
    }
    set(value) {
        this.value.set("1", value);
    }
    get() {
        return this.value.get("1");
    }
}
exports.MagicObject = MagicObject;
