"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UUID {
    constructor(UUIDString = undefined) {
        this.UUIDString = UUIDString || this.uuidv4();
    }
    uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}
exports.UUID = UUID;
