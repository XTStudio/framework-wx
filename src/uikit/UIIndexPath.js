"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UIIndexPath {
    constructor(row, section) {
        this.row = row;
        this.section = section;
    }
    mapKey() {
        return `${this.row}-${this.section}`;
    }
}
exports.UIIndexPath = UIIndexPath;
