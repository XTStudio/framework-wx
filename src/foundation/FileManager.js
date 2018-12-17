"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Data_1 = require("./Data");
const Bundle_1 = require("./Bundle");
const fs = wx.getFileSystemManager();
class FileManager {
    constructor() {
        this.tmpFiles = {};
    }
    subpaths(atPath, deepSearch) {
        if (atPath.indexOf("xt://") === 0) {
            return Object.keys(Bundle_1.Bundle.js.resources).filter(it => {
                return it.indexOf(atPath.replace("xt://", "")) === 0;
            });
        }
        else if (atPath.indexOf("tmp://") === 0) {
            return Object.keys(this.tmpFiles).filter(it => {
                return it.indexOf(atPath) === 0;
            });
        }
        return [];
    }
    createDirectory(atPath, withIntermediateDirectories) {
        if (withIntermediateDirectories) {
            try {
                let currentPath = FileManager.wxPath;
                atPath.replace(FileManager.wxPath, "").split('/').filter(it => it.length > 0).forEach((it, idx) => {
                    currentPath += '/' + it;
                    try {
                        if (fs.accessSync(currentPath)) {
                            const stat = fs.statSync(currentPath);
                            if (stat.isDirectory() || stat.isFile()) {
                                return;
                            }
                        }
                    }
                    catch (error) {
                        fs.mkdirSync(currentPath, false);
                    }
                });
            }
            catch (error) {
                return error;
            }
        }
        else {
            try {
                fs.mkdirSync(atPath, false);
            }
            catch (error) {
                return error;
            }
        }
    }
    createFile(atPath, data) {
        if (atPath.indexOf("xt://") === 0) {
            return Error("readonly");
        }
        else if (atPath.indexOf("tmp://") === 0) {
            this.tmpFiles[atPath] = data;
            return undefined;
        }
        else {
            try {
                fs.writeFileSync(atPath, data.arrayBuffer());
            }
            catch (error) {
                return error;
            }
        }
    }
    readFile(atPath) {
        if (atPath.indexOf("xt://") === 0) {
            return Bundle_1.Bundle.js.resources[atPath.replace("xt://", "")];
        }
        else if (atPath.indexOf("tmp://") === 0) {
            return this.tmpFiles[atPath];
        }
        else {
            try {
                return new Data_1.Data(fs.readFileSync(atPath));
            }
            catch (error) { }
        }
        return undefined;
    }
    removeItem(atPath) {
        if (atPath.indexOf("xt://") === 0) {
            delete Bundle_1.Bundle.js.resources[atPath.replace("xt://", "")];
            return undefined;
        }
        else if (atPath.indexOf("tmp://") === 0) {
            delete this.tmpFiles[atPath];
            return undefined;
        }
        else {
            try {
                if (fs.statSync(atPath).isDirectory()) {
                    fs.rmdirSync(atPath);
                }
                else {
                    fs.unlinkSync(atPath);
                }
            }
            catch (error) {
                return error;
            }
        }
    }
    copyItem(atPath, toPath) {
        if (toPath.indexOf("xt://") === 0) {
            return Error("readonly");
        }
        else if (toPath.indexOf("tmp://") === 0) {
            const data = this.readFile(atPath);
            if (data) {
                this.createFile(toPath, data);
            }
            else {
                return Error("file not found.");
            }
        }
        else {
            try {
                fs.copyFileSync(atPath, toPath);
            }
            catch (error) {
                return error;
            }
        }
    }
    moveItem(atPath, toPath) {
        if (toPath.indexOf("xt://") === 0) {
            return Error("readonly");
        }
        else if (toPath.indexOf("tmp://") === 0) {
            const data = this.readFile(atPath);
            if (data) {
                this.createFile(toPath, data);
                this.removeItem(atPath);
            }
            else {
                return Error("file not found.");
            }
        }
        else {
            try {
                {
                    let error = this.copyItem(atPath, toPath);
                    if (error instanceof Error) {
                        throw error;
                    }
                }
                {
                    let error = this.removeItem(atPath);
                    if (error instanceof Error) {
                        throw error;
                    }
                }
            }
            catch (error) {
                return error;
            }
        }
    }
    fileExists(atPath) {
        if (atPath.indexOf("xt://") === 0) {
            return Bundle_1.Bundle.js.resources[atPath.replace("xt://", "")] instanceof Data_1.Data;
        }
        else if (atPath.indexOf("tmp://") === 0) {
            return this.tmpFiles[atPath] !== undefined;
        }
        else {
            try {
                return fs.statSync(atPath).isFile();
            }
            catch (error) {
                return false;
            }
        }
    }
    dirExists(atPath) {
        try {
            return fs.statSync(atPath).isDirectory();
        }
        catch (error) {
            return false;
        }
    }
}
FileManager.wxPath = wx.env.USER_DATA_PATH;
FileManager.defaultManager = new FileManager;
FileManager.documentDirectory = `${FileManager.wxPath}/document/`;
FileManager.libraryDirectory = `${FileManager.wxPath}/library/`;
FileManager.cacheDirectory = `${FileManager.wxPath}/cache/`;
FileManager.temporaryDirectory = "tmp://tmp/";
FileManager.jsBundleDirectory = "xt://";
exports.FileManager = FileManager;
