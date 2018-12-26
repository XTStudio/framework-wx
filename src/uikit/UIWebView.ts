import { UIView } from "./UIView";
import { URL as FoundationURL } from "../foundation/URL";
import { URLRequest } from "../foundation/URLRequest";

export class UIWebView extends UIView {

    clazz = "UIWebView"

    title: string | undefined = undefined

    URL: FoundationURL | undefined = undefined

    loading: boolean = false

    loadRequest(request: URLRequest): void {
        this.URL = request.URL
        this.markFlagDirty("src")
    }

    loadHTMLString(HTMLString: string, baseURL: FoundationURL): void {
        console.warn("小程序内不支持加载 HTMLString。");
    }

    goBack(): void {
        console.warn("暂不支持该方法");
    }

    goForward(): void {
        console.warn("暂不支持该方法");
    }

    reload(): void {
        console.warn("暂不支持该方法");
    }

    stopLoading(): void {
        console.warn("暂不支持该方法");
    }

    evaluateJavaScript(script: string, completed: (result?: any, error?: Error) => void): void {
        console.warn("暂不支持该方法");
    }

    buildData() {
        let data = super.buildData()
        if (this.URL) {
            data.src = this.URL.absoluteString
        }
        return data
    }

}