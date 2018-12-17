"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class URLResponse {
    constructor() {
        this.URL = undefined;
        this.expectedContentLength = 0;
        this.MIMEType = undefined;
        this.textEncodingName = undefined;
        this.statusCode = 0;
        this.allHeaderFields = {};
    }
}
exports.URLResponse = URLResponse;
