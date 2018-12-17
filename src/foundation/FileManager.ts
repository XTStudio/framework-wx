import { Data } from "./Data";
import { Bundle } from "./Bundle";

const fs = (wx as any).getFileSystemManager()

export class FileManager {

    static readonly wxPath: string = (wx as any).env.USER_DATA_PATH
    static readonly defaultManager: FileManager = new FileManager
    static readonly documentDirectory: string = `${FileManager.wxPath}/document/`
    static readonly libraryDirectory: string = `${FileManager.wxPath}/library/`
    static readonly cacheDirectory: string = `${FileManager.wxPath}/cache/`
    static readonly temporaryDirectory: string = "tmp://tmp/"
    static readonly jsBundleDirectory: string = "xt://"

    private tmpFiles: { [key: string]: Data } = {}

    subpaths(atPath: string, deepSearch?: boolean): string[] {
        if (atPath.indexOf("xt://") === 0) {
            return Object.keys(Bundle.js.resources).filter(it => {
                return it.indexOf(atPath.replace("xt://", "")) === 0
            })
        }
        else if (atPath.indexOf("tmp://") === 0) {
            return Object.keys(this.tmpFiles).filter(it => {
                return it.indexOf(atPath) === 0
            })
        }
        return []
    }

    createDirectory(atPath: string, withIntermediateDirectories: boolean): Error | undefined {
        if (withIntermediateDirectories) {
            try {
                let currentPath = FileManager.wxPath
                atPath.replace(FileManager.wxPath, "").split('/').filter(it => it.length > 0).forEach((it, idx) => {
                    currentPath += '/' + it
                    try {
                        if (fs.accessSync(currentPath)) {
                            const stat = fs.statSync(currentPath)
                            if (stat.isDirectory() || stat.isFile()) {
                                return
                            }
                        }
                    } catch (error) {
                        fs.mkdirSync(currentPath, false)
                    }
                })
            } catch (error) {
                return error
            }
        }
        else {
            try {
                fs.mkdirSync(atPath, false)
            } catch (error) {
                return error
            }
        }
    }

    createFile(atPath: string, data: Data): Error | undefined {
        if (atPath.indexOf("xt://") === 0) {
            return Error("readonly")
        }
        else if (atPath.indexOf("tmp://") === 0) {
            this.tmpFiles[atPath] = data
            return undefined
        }
        else {
            try {
                fs.writeFileSync(atPath, data.arrayBuffer())
            } catch (error) {
                return error
            }
        }
    }

    readFile(atPath: string): Data | undefined {
        if (atPath.indexOf("xt://") === 0) {
            return Bundle.js.resources[atPath.replace("xt://", "")]
        }
        else if (atPath.indexOf("tmp://") === 0) {
            return this.tmpFiles[atPath]
        }
        else {
            try {
                return new Data(fs.readFileSync(atPath))
            } catch (error) { }
        }
        return undefined
    }

    removeItem(atPath: string): Error | undefined {
        if (atPath.indexOf("xt://") === 0) {
            delete Bundle.js.resources[atPath.replace("xt://", "")]
            return undefined
        }
        else if (atPath.indexOf("tmp://") === 0) {
            delete this.tmpFiles[atPath]
            return undefined
        }
        else {
            try {
                if (fs.statSync(atPath).isDirectory()) {
                    fs.rmdirSync(atPath)
                }
                else {
                    fs.unlinkSync(atPath)
                }
            } catch (error) {
                return error
            }
        }
    }

    copyItem(atPath: string, toPath: string): Error | undefined {
        if (toPath.indexOf("xt://") === 0) {
            return Error("readonly")
        }
        else if (toPath.indexOf("tmp://") === 0) {
            const data = this.readFile(atPath)
            if (data) {
                this.createFile(toPath, data)
            }
            else {
                return Error("file not found.")
            }
        }
        else {
            try {
                fs.copyFileSync(atPath, toPath)
            } catch (error) {
                return error
            }
        }
    }

    moveItem(atPath: string, toPath: string): Error | undefined {
        if (toPath.indexOf("xt://") === 0) {
            return Error("readonly")
        }
        else if (toPath.indexOf("tmp://") === 0) {
            const data = this.readFile(atPath)
            if (data) {
                this.createFile(toPath, data)
                this.removeItem(atPath)
            }
            else {
                return Error("file not found.")
            }
        }
        else {
            try {
                {
                    let error = this.copyItem(atPath, toPath)
                    if (error instanceof Error) {
                        throw error
                    }
                }
                {
                    let error = this.removeItem(atPath)
                    if (error instanceof Error) {
                        throw error
                    }
                }
            } catch (error) {
                return error
            }
        }
    }

    fileExists(atPath: string): boolean {
        if (atPath.indexOf("xt://") === 0) {
            return Bundle.js.resources[atPath.replace("xt://", "")] instanceof Data
        }
        else if (atPath.indexOf("tmp://") === 0) {
            return this.tmpFiles[atPath] !== undefined
        }
        else {
            try {
                return fs.statSync(atPath).isFile()
            } catch (error) {
                return false
            }
        }
    }

    dirExists(atPath: string): boolean {
        try {
            return fs.statSync(atPath).isDirectory()
        } catch (error) {
            return false
        }
    }

}