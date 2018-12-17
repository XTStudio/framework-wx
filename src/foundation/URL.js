"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class URL {
    constructor(URLString) {
        this.URLString = URLString;
    }
    static URLWithString(string, baseURL) {
        // if (baseURL !== undefined) {
        // if (windowURL !== undefined) {
        //     return new URL(new windowURL(string, baseURL.absoluteString).href)
        // }
        // }
        return new URL(string);
    }
    static fileURLWithPath(path) {
        throw Error();
    }
    get absoluteString() {
        return this.URLString;
    }
}
exports.URL = URL;
