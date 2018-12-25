"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const UISize_1 = require("./UISize");
const EventEmitter_1 = require("../kimi/EventEmitter");
var UIImageRenderingMode;
(function (UIImageRenderingMode) {
    UIImageRenderingMode[UIImageRenderingMode["automatic"] = 0] = "automatic";
    UIImageRenderingMode[UIImageRenderingMode["alwaysOriginal"] = 1] = "alwaysOriginal";
    UIImageRenderingMode[UIImageRenderingMode["alwaysTemplate"] = 2] = "alwaysTemplate";
})(UIImageRenderingMode = exports.UIImageRenderingMode || (exports.UIImageRenderingMode = {}));
class UIImage extends EventEmitter_1.EventEmitter {
    constructor(options, cloner = undefined) {
        super();
        this.options = options;
        this.imageSource = undefined;
        this.renderingMode = UIImageRenderingMode.alwaysOriginal;
        this.loaded = false;
        this.size = UISize_1.UISizeZero;
        this.scale = 1.0;
        if (options.base64) {
            this.imageSource = "data:image/png;base64," + options.base64;
        }
        else if (options.data) {
            this.imageSource = "data:image/png;base64," + options.data.base64EncodedString();
        }
        else if (options.name) {
            this.imageSource = `/assets/images/${options.name}@2x.png`;
        }
        if (options.renderingMode !== undefined) {
            this.renderingMode = options.renderingMode;
        }
    }
    static fromURL(url) {
        const image = new UIImage({});
        image.imageSource = url;
        return image;
    }
    static scaleFromName(name) {
        if (name.indexOf("@2x") > 0) {
            return 2.0;
        }
        else if (name.indexOf("@3x") > 0) {
            return 3.0;
        }
        else if (name.indexOf("@4x") > 0) {
            return 4.0;
        }
        return 1.0;
    }
    fetchSize() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.loaded) {
                return this.size;
            }
            else {
                return yield new Promise((resolver, rejector) => {
                    this.on("load", () => {
                        resolver(this.size);
                    });
                });
            }
        });
    }
}
exports.UIImage = UIImage;
