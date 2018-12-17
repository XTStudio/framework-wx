import { URLRequest } from "./URLRequest";
import { URL } from "./URL";
import { Data } from "./Data";
import { URLResponse } from "./URLResponse";

export class URLSession {

    static readonly shared: URLSession = new URLSession

    fetch(request: string | URL | URLRequest): Promise<Data> {
        return new Promise<Data>((resolver, rejector) => {
            this.dataTask(request, (data, response, error) => {
                if (error && data !== undefined) {
                    rejector(error)
                }
                else {
                    resolver(data)
                }
            }).resume()
        })
    }

    dataTask(req: string | URL | URLRequest, complete: (data?: Data, response?: URLResponse, error?: Error) => void): URLSessionTask {
        if (req instanceof URLRequest) {
            return new URLSessionTask(req, complete)
        }
        else if (req instanceof URL) {
            return new URLSessionTask(new URLRequest(req), complete)
        }
        else {
            const currentURL = URL.URLWithString(req)
            if (currentURL !== undefined) {
                return new URLSessionTask(new URLRequest(currentURL), complete)
            }
            else {
                throw Error("invalid url.")
            }
        }
    }

}

export enum URLSessionTaskState {
    running,
    suspended,
    cancelling,
    completed,
}

export class URLSessionTask {

    constructor(readonly request: URLRequest, readonly complete: (data?: Data, response?: URLResponse, error?: Error) => void) { }

    state: URLSessionTaskState = URLSessionTaskState.suspended

    countOfBytesExpectedToReceive: number = 0

    countOfBytesReceived: number = 0

    countOfBytesExpectedToSend: number = 0

    countOfBytesSent: number = 0

    private _taskHandler: any = undefined

    resume() {
        this._taskHandler = wx.request({
            url: this.request.URL.absoluteString,
            data: this.request.HTTPBody,
            header: this.request.allHTTPHeaderFields,
            method: this.request.HTTPMethod as any || "GET",
            dataType: "",
            responseType: "arraybuffer",
            success: (response) => {
                if (this.complete) {
                    if (response) {
                        const res = new URLResponse()
                        res.statusCode = response.statusCode
                        res.allHeaderFields = response.header || {}
                        this.complete(
                            response.data instanceof ArrayBuffer ? new Data(response.data) : undefined,
                            res,
                            undefined
                        )
                    }
                }
            },
            fail: (e) => {
                if (this.complete) {
                    this.complete(undefined, undefined, e || Error("unknown error"))
                }
            }
        })
    }

    cancel() {
        if (this._taskHandler) {
            this._taskHandler.abort()
        }
        this.state = URLSessionTaskState.cancelling
    }

}