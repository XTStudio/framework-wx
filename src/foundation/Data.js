"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Data {
    constructor(value) {
        this._arrayBuffer = new ArrayBuffer(0);
        if (value instanceof ArrayBuffer) {
            this._arrayBuffer = value.slice(0);
        }
        else if (value !== undefined) {
            if (typeof value.utf8String === "string") {
                if (typeof TextEncoder === "function") {
                    return new Data(new TextEncoder().encode(value.utf8String).buffer);
                }
                else {
                    var trimValue = unescape(encodeURIComponent(value.utf8String));
                    var arrayBuffer = new ArrayBuffer(trimValue.length);
                    var bufferView = new Uint8Array(arrayBuffer);
                    for (var i = 0, count = trimValue.length; i < count; i++) {
                        bufferView[i] = trimValue.charCodeAt(i);
                    }
                    this._arrayBuffer = arrayBuffer;
                }
            }
            else if (value.base64EncodedData instanceof Data) {
                var binaryString = window.atob(new Uint8Array(value.base64EncodedData._arrayBuffer).reduce(function (data, byte) {
                    return data + String.fromCharCode(byte);
                }, ''));
                var len = binaryString.length;
                var bytes = new Uint8Array(len);
                for (var i = 0; i < len; i++) {
                    bytes[i] = binaryString.charCodeAt(i);
                }
                this._arrayBuffer = bytes.buffer;
            }
            else if (typeof value.base64EncodedString === "string") {
                var binaryString = window.atob(value.base64EncodedString);
                var len = binaryString.length;
                var bytes = new Uint8Array(len);
                for (var i = 0; i < len; i++) {
                    bytes[i] = binaryString.charCodeAt(i);
                }
                this._arrayBuffer = bytes.buffer;
            }
        }
    }
    arrayBuffer() {
        return this._arrayBuffer;
    }
    json() {
        const utf8String = this.utf8String();
        if (utf8String !== undefined) {
            try {
                return JSON.parse(utf8String);
            }
            catch (error) {
                return undefined;
            }
        }
        return undefined;
    }
    utf8String() {
        if (typeof TextDecoder === "function") {
            return new TextDecoder().decode(this._arrayBuffer);
        }
        return decodeURIComponent(escape(new Uint8Array(this._arrayBuffer).reduce(function (data, byte) {
            return data + String.fromCharCode(byte);
        }, '')));
    }
    base64EncodedData() {
        return new Data({ utf8String: this.base64EncodedString() });
    }
    base64EncodedString() {
        return window.btoa(new Uint8Array(this._arrayBuffer).reduce(function (data, byte) {
            return data + String.fromCharCode(byte);
        }, ''));
    }
    mutable() {
        return new MutableData(this._arrayBuffer);
    }
}
exports.Data = Data;
class MutableData extends Data {
    appendData(data) {
        this._arrayBuffer = new Uint8Array([
            ...new Uint8Array(this._arrayBuffer),
            ...new Uint8Array(data._arrayBuffer),
        ]).buffer;
    }
    appendArrayBuffer(arrayBuffer) {
        this._arrayBuffer = new Uint8Array([
            ...new Uint8Array(this._arrayBuffer),
            ...new Uint8Array(arrayBuffer),
        ]).buffer;
    }
    setData(data) {
        this._arrayBuffer = data._arrayBuffer.slice(0);
    }
    immutable() {
        return new Data(this._arrayBuffer);
    }
}
exports.MutableData = MutableData;
