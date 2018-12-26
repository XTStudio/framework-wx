"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UIView_1 = require("./UIView");
class UIWebView extends UIView_1.UIView {
    constructor() {
        super(...arguments);
        this.clazz = "UIWebView";
        this.title = undefined;
        this.URL = undefined;
        this.loading = false;
    }
    loadRequest(request) {
        this.URL = request.URL;
        this.markFlagDirty("src");
    }
    loadHTMLString(HTMLString, baseURL) {
        console.warn("小程序内不支持加载 HTMLString。");
    }
    goBack() {
        console.warn("暂不支持该方法");
    }
    goForward() {
        console.warn("暂不支持该方法");
    }
    reload() {
        console.warn("暂不支持该方法");
    }
    stopLoading() {
        console.warn("暂不支持该方法");
    }
    evaluateJavaScript(script, completed) {
        console.warn("暂不支持该方法");
    }
    buildData() {
        let data = super.buildData();
        if (this.URL) {
            data.src = this.URL.absoluteString;
        }
        return data;
    }
}
exports.UIWebView = UIWebView;
