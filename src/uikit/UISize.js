"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UISizeZero = { width: 0, height: 0 };
exports.UISizeMake = function (width, height) {
    return { width, height };
};
exports.UISizeEqualToSize = function (a, b) {
    return Math.abs(a.width - b.width) < 0.001 && Math.abs(a.height - b.height) < 0.001;
};
