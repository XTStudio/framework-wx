"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const URL_1 = require("./URL");
var URLRequestCachePolicy;
(function (URLRequestCachePolicy) {
    URLRequestCachePolicy[URLRequestCachePolicy["useProtocol"] = 0] = "useProtocol";
    URLRequestCachePolicy[URLRequestCachePolicy["ignoringLocalCache"] = 1] = "ignoringLocalCache";
    URLRequestCachePolicy[URLRequestCachePolicy["returnCacheElseLoad"] = 2] = "returnCacheElseLoad";
    URLRequestCachePolicy[URLRequestCachePolicy["returnCacheDontLoad"] = 3] = "returnCacheDontLoad";
})(URLRequestCachePolicy = exports.URLRequestCachePolicy || (exports.URLRequestCachePolicy = {}));
class URLRequest {
    constructor(aURL, cachePolicy = URLRequestCachePolicy.useProtocol, timeout = 15) {
        this.cachePolicy = cachePolicy;
        this.timeout = timeout;
        this.HTTPMethod = undefined;
        this.allHTTPHeaderFields = undefined;
        this.URL = aURL instanceof URL_1.URL ? aURL : (() => {
            const url = URL_1.URL.URLWithString(aURL);
            if (url === undefined) {
                throw Error("invalid URLString.");
            }
            return url;
        })();
    }
    valueForHTTPHeaderField(field) {
        return undefined;
    }
    mutable() {
        return Object.assign(new MutableURLRequest(this.URL, this.cachePolicy, this.timeout), this);
    }
}
exports.URLRequest = URLRequest;
class MutableURLRequest extends URLRequest {
    constructor() {
        super(...arguments);
        this.HTTPMethod = "GET";
        this.allHTTPHeaderFields = {};
        this.HTTPBody = undefined;
    }
    setValueForHTTPHeaderField(value, field) {
        if (this.allHTTPHeaderFields === undefined) {
            this.allHTTPHeaderFields = {};
        }
        this.allHTTPHeaderFields[field] = value;
    }
    immutable() {
        return Object.assign(new URLRequest(this.URL, this.cachePolicy, this.timeout), this);
    }
}
exports.MutableURLRequest = MutableURLRequest;
