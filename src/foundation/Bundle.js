"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const URL_1 = require("./URL");
const Data_1 = require("./Data");
class Bundle {
    constructor(type) {
        this.type = type;
        this.resources = {};
    }
    resourcePath(name, type, inDirectory) {
        if (this.type === "native") {
            if (inDirectory !== undefined) {
                return `${inDirectory}/${name}${type !== undefined ? "." + type : ""}`;
            }
            else {
                return `${name}${type !== undefined ? "." + type : ""}`;
            }
        }
        else if (this.type === "js") {
            if (inDirectory !== undefined && this.resources[`${inDirectory}/${name}${type !== undefined ? "." + type : ""}`] !== undefined) {
                return `xt://${inDirectory}/${name}${type !== undefined ? "." + type : ""}`;
            }
            else if (this.resources[`${name}${type !== undefined ? "." + type : ""}`] !== undefined) {
                return `xt://${name}${type !== undefined ? "." + type : ""}`;
            }
        }
    }
    resourceURL(name, type, inDirectory) {
        const path = this.resourcePath(name, type, inDirectory);
        return path !== undefined ? URL_1.URL.URLWithString(path) : undefined;
    }
    addResource(path, base64String) {
        if (this.type === "js") {
            this.resources[path] = new Data_1.Data({ base64EncodedString: base64String });
        }
    }
}
Bundle.native = new Bundle("native");
Bundle.js = new Bundle("js");
exports.Bundle = Bundle;
