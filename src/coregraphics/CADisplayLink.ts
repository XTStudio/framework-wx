export class CADisplayLink {

    constructor(readonly vsyncBlock: () => void) { }

    active(): void {
        console.log("微信小程序暂时不支持 CADisplayLink。");
    }

    invalidate(): void { }

}