"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const URLRequest_1 = require("./URLRequest");
const URL_1 = require("./URL");
const Data_1 = require("./Data");
const URLResponse_1 = require("./URLResponse");
class URLSession {
    fetch(request) {
        return new Promise((resolver, rejector) => {
            this.dataTask(request, (data, response, error) => {
                if (error && data !== undefined) {
                    rejector(error);
                }
                else {
                    resolver(data);
                }
            }).resume();
        });
    }
    dataTask(req, complete) {
        if (req instanceof URLRequest_1.URLRequest) {
            return new URLSessionTask(req, complete);
        }
        else if (req instanceof URL_1.URL) {
            return new URLSessionTask(new URLRequest_1.URLRequest(req), complete);
        }
        else {
            const currentURL = URL_1.URL.URLWithString(req);
            if (currentURL !== undefined) {
                return new URLSessionTask(new URLRequest_1.URLRequest(currentURL), complete);
            }
            else {
                throw Error("invalid url.");
            }
        }
    }
}
URLSession.shared = new URLSession;
exports.URLSession = URLSession;
var URLSessionTaskState;
(function (URLSessionTaskState) {
    URLSessionTaskState[URLSessionTaskState["running"] = 0] = "running";
    URLSessionTaskState[URLSessionTaskState["suspended"] = 1] = "suspended";
    URLSessionTaskState[URLSessionTaskState["cancelling"] = 2] = "cancelling";
    URLSessionTaskState[URLSessionTaskState["completed"] = 3] = "completed";
})(URLSessionTaskState = exports.URLSessionTaskState || (exports.URLSessionTaskState = {}));
class URLSessionTask {
    constructor(request, complete) {
        this.request = request;
        this.complete = complete;
        this.state = URLSessionTaskState.suspended;
        this.countOfBytesExpectedToReceive = 0;
        this.countOfBytesReceived = 0;
        this.countOfBytesExpectedToSend = 0;
        this.countOfBytesSent = 0;
        this._taskHandler = undefined;
    }
    resume() {
        this._taskHandler = wx.request({
            url: this.request.URL.absoluteString,
            data: this.request.HTTPBody,
            header: this.request.allHTTPHeaderFields,
            method: this.request.HTTPMethod || "GET",
            dataType: "",
            responseType: "arraybuffer",
            success: (response) => {
                if (this.complete) {
                    if (response) {
                        const res = new URLResponse_1.URLResponse();
                        res.statusCode = response.statusCode;
                        res.allHeaderFields = response.header || {};
                        this.complete(response.data instanceof ArrayBuffer ? new Data_1.Data(response.data) : undefined, res, undefined);
                    }
                }
            },
            fail: (e) => {
                if (this.complete) {
                    this.complete(undefined, undefined, e || Error("unknown error"));
                }
            }
        });
    }
    cancel() {
        if (this._taskHandler) {
            this._taskHandler.abort();
        }
        this.state = URLSessionTaskState.cancelling;
    }
}
exports.URLSessionTask = URLSessionTask;
