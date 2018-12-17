import { URL } from "./URL";
import { Data } from "./Data";

export class Bundle {

    static readonly native: Bundle = new Bundle("native")

    static readonly js: Bundle = new Bundle("js")

    public resources: { [key: string]: Data } = {}

    constructor(readonly type: string) { }

    resourcePath(name: string, type?: string, inDirectory?: string): string | undefined {
        if (this.type === "native") {
            if (inDirectory !== undefined) {
                return `${inDirectory}/${name}${type !== undefined ? "." + type : ""}`
            }
            else {
                return `${name}${type !== undefined ? "." + type : ""}`
            }
        }
        else if (this.type === "js") {
            if (inDirectory !== undefined && this.resources[`${inDirectory}/${name}${type !== undefined ? "." + type : ""}`] !== undefined) {
                return `xt://${inDirectory}/${name}${type !== undefined ? "." + type : ""}`
            }
            else if (this.resources[`${name}${type !== undefined ? "." + type : ""}`] !== undefined) {
                return `xt://${name}${type !== undefined ? "." + type : ""}`
            }
        }
    }

    resourceURL(name: string, type?: string, inDirectory?: string): URL | undefined {
        const path = this.resourcePath(name, type, inDirectory)
        return path !== undefined ? URL.URLWithString(path) : undefined
    }

    addResource(path: string, base64String: string) {
        if (this.type === "js") {
            this.resources[path] = new Data({ base64EncodedString: base64String })
        }
    }

}