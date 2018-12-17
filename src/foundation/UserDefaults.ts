export class UserDefaults {

    static readonly standard = new UserDefaults

    constructor(readonly suiteName: string | undefined = undefined) { }

    valueForKey(forKey: string): any | undefined {
        const value = wx.getStorageSync(this.buildKey(forKey))
        if (value !== undefined && typeof value === "string") {
            try {
                return JSON.parse(value).value
            } catch (error) { }
        }
        return undefined
    }

    setValue(value: any, forKey: string): void {
        if (value === undefined) {
            wx.removeStorageSync(this.buildKey(forKey))
        }
        else {
            wx.setStorageSync(this.buildKey(forKey), JSON.stringify({ value: value }))
        }
    }

    reset(): void {
        const storageInfo = wx.getStorageInfoSync()
        storageInfo.keys.forEach(key => {
            if (typeof key === "string" && key.indexOf(`com.xt.${(this.suiteName || "standard")}.`) === 0) {
                wx.removeStorageSync(key)
            }
        })
    }

    private buildKey(aKey: string): string {
        return `com.xt.${(this.suiteName || "standard")}.${aKey}`
    }

}