module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });

var MatrixAlgorithm = function () {
    function MatrixAlgorithm() {
        _classCallCheck(this, MatrixAlgorithm);

        this.props = [];
        this.props[0] = 1;
        this.props[1] = 0;
        this.props[2] = 0;
        this.props[3] = 0;
        this.props[4] = 0;
        this.props[5] = 1;
        this.props[6] = 0;
        this.props[7] = 0;
        this.props[8] = 0;
        this.props[9] = 0;
        this.props[10] = 1;
        this.props[11] = 0;
        this.props[12] = 0;
        this.props[13] = 0;
        this.props[14] = 0;
        this.props[15] = 1;
    }

    MatrixAlgorithm.prototype.rotate = function rotate(angle) {
        if (angle === 0) {
            return this;
        }
        var mCos = Math.cos(angle);
        var mSin = Math.sin(angle);
        return this._t(mCos, -mSin, 0, 0, mSin, mCos, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    };

    MatrixAlgorithm.prototype.rotateX = function rotateX(angle) {
        if (angle === 0) {
            return this;
        }
        var mCos = Math.cos(angle);
        var mSin = Math.sin(angle);
        return this._t(1, 0, 0, 0, 0, mCos, -mSin, 0, 0, mSin, mCos, 0, 0, 0, 0, 1);
    };

    MatrixAlgorithm.prototype.rotateY = function rotateY(angle) {
        if (angle === 0) {
            return this;
        }
        var mCos = Math.cos(angle);
        var mSin = Math.sin(angle);
        return this._t(mCos, 0, mSin, 0, 0, 1, 0, 0, -mSin, 0, mCos, 0, 0, 0, 0, 1);
    };

    MatrixAlgorithm.prototype.rotateZ = function rotateZ(angle) {
        if (angle === 0) {
            return this;
        }
        var mCos = Math.cos(angle);
        var mSin = Math.sin(angle);
        return this._t(mCos, -mSin, 0, 0, mSin, mCos, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    };

    MatrixAlgorithm.prototype.shear = function shear(sx, sy) {
        return this._t(1, sy, sx, 1, 0, 0);
    };

    MatrixAlgorithm.prototype.skew = function skew(ax, ay) {
        return this.shear(Math.tan(ax), Math.tan(ay));
    };

    MatrixAlgorithm.prototype.skewFromAxis = function skewFromAxis(ax, angle) {
        var mCos = Math.cos(angle);
        var mSin = Math.sin(angle);
        return this._t(mCos, mSin, 0, 0, -mSin, mCos, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        this._t(1, 0, 0, 0, Math.tan(ax), 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        this._t(mCos, -mSin, 0, 0, mSin, mCos, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        //return this._t(mCos, mSin, -mSin, mCos, 0, 0)._t(1, 0, Math.tan(ax), 1, 0, 0)._t(mCos, -mSin, mSin, mCos, 0, 0);
    };

    MatrixAlgorithm.prototype.scale = function scale(sx, sy, sz) {
        sz = isNaN(sz) ? 1 : sz;
        if (sx == 1 && sy == 1 && sz == 1) {
            return this;
        }
        return this._t(sx, 0, 0, 0, 0, sy, 0, 0, 0, 0, sz, 0, 0, 0, 0, 1);
    };

    MatrixAlgorithm.prototype.setTransform = function setTransform(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
        this.props[0] = a;
        this.props[1] = b;
        this.props[2] = c;
        this.props[3] = d;
        this.props[4] = e;
        this.props[5] = f;
        this.props[6] = g;
        this.props[7] = h;
        this.props[8] = i;
        this.props[9] = j;
        this.props[10] = k;
        this.props[11] = l;
        this.props[12] = m;
        this.props[13] = n;
        this.props[14] = o;
        this.props[15] = p;
        return this;
    };

    MatrixAlgorithm.prototype.translate = function translate(tx, ty, tz) {
        tz = isNaN(tz) ? 0 : tz;
        if (tx !== 0 || ty !== 0 || tz !== 0) {
            return this._t(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, tx, ty, tz, 1);
        }
        return this;
    };

    MatrixAlgorithm.prototype._t = function _t(a2, b2, c2, d2, e2, f2, g2, h2, i2, j2, k2, l2, m2, n2, o2, p2) {
        this.transform(a2, b2, c2, d2, e2, f2, g2, h2, i2, j2, k2, l2, m2, n2, o2, p2);
    };

    MatrixAlgorithm.prototype.transform = function transform(a2, b2, c2, d2, e2, f2, g2, h2, i2, j2, k2, l2, m2, n2, o2, p2) {
        if (a2 === 1 && b2 === 0 && c2 === 0 && d2 === 0 && e2 === 0 && f2 === 1 && g2 === 0 && h2 === 0 && i2 === 0 && j2 === 0 && k2 === 1 && l2 === 0) {
            if (m2 !== 0 || n2 !== 0 || o2 !== 0) {
                this.props[12] = this.props[12] * a2 + this.props[13] * e2 + this.props[14] * i2 + this.props[15] * m2;
                this.props[13] = this.props[12] * b2 + this.props[13] * f2 + this.props[14] * j2 + this.props[15] * n2;
                this.props[14] = this.props[12] * c2 + this.props[13] * g2 + this.props[14] * k2 + this.props[15] * o2;
                this.props[15] = this.props[12] * d2 + this.props[13] * h2 + this.props[14] * l2 + this.props[15] * p2;
            }
            return this;
        }
        var a1 = this.props[0];
        var b1 = this.props[1];
        var c1 = this.props[2];
        var d1 = this.props[3];
        var e1 = this.props[4];
        var f1 = this.props[5];
        var g1 = this.props[6];
        var h1 = this.props[7];
        var i1 = this.props[8];
        var j1 = this.props[9];
        var k1 = this.props[10];
        var l1 = this.props[11];
        var m1 = this.props[12];
        var n1 = this.props[13];
        var o1 = this.props[14];
        var p1 = this.props[15];
        /* matrix order (canvas compatible):
         * ace
         * bdf
         * 001
         */
        this.props[0] = a1 * a2 + b1 * e2 + c1 * i2 + d1 * m2;
        this.props[1] = a1 * b2 + b1 * f2 + c1 * j2 + d1 * n2;
        this.props[2] = a1 * c2 + b1 * g2 + c1 * k2 + d1 * o2;
        this.props[3] = a1 * d2 + b1 * h2 + c1 * l2 + d1 * p2;
        this.props[4] = e1 * a2 + f1 * e2 + g1 * i2 + h1 * m2;
        this.props[5] = e1 * b2 + f1 * f2 + g1 * j2 + h1 * n2;
        this.props[6] = e1 * c2 + f1 * g2 + g1 * k2 + h1 * o2;
        this.props[7] = e1 * d2 + f1 * h2 + g1 * l2 + h1 * p2;
        this.props[8] = i1 * a2 + j1 * e2 + k1 * i2 + l1 * m2;
        this.props[9] = i1 * b2 + j1 * f2 + k1 * j2 + l1 * n2;
        this.props[10] = i1 * c2 + j1 * g2 + k1 * k2 + l1 * o2;
        this.props[11] = i1 * d2 + j1 * h2 + k1 * l2 + l1 * p2;
        this.props[12] = m1 * a2 + n1 * e2 + o1 * i2 + p1 * m2;
        this.props[13] = m1 * b2 + n1 * f2 + o1 * j2 + p1 * n2;
        this.props[14] = m1 * c2 + n1 * g2 + o1 * k2 + p1 * o2;
        this.props[15] = m1 * d2 + n1 * h2 + o1 * l2 + p1 * p2;
        return this;
    };

    MatrixAlgorithm.prototype.clone = function clone(matr) {
        var i;
        for (i = 0; i < 16; i += 1) {
            matr.props[i] = this.props[i];
        }
    };

    MatrixAlgorithm.prototype.cloneFromProps = function cloneFromProps(props) {
        var i;
        for (i = 0; i < 16; i += 1) {
            this.props[i] = props[i];
        }
    };

    MatrixAlgorithm.prototype.applyToPoint = function applyToPoint(x, y, z) {
        return {
            x: x * this.props[0] + y * this.props[4] + z * this.props[8] + this.props[12],
            y: x * this.props[1] + y * this.props[5] + z * this.props[9] + this.props[13],
            z: x * this.props[2] + y * this.props[6] + z * this.props[10] + this.props[14]
        };
        /*return {
         x: x * me.a + y * me.c + me.e,
         y: x * me.b + y * me.d + me.f
         };*/
    };

    MatrixAlgorithm.prototype.applyToX = function applyToX(x, y, z) {
        return x * this.props[0] + y * this.props[4] + z * this.props[8] + this.props[12];
    };

    MatrixAlgorithm.prototype.applyToY = function applyToY(x, y, z) {
        return x * this.props[1] + y * this.props[5] + z * this.props[9] + this.props[13];
    };

    MatrixAlgorithm.prototype.applyToZ = function applyToZ(x, y, z) {
        return x * this.props[2] + y * this.props[6] + z * this.props[10] + this.props[14];
    };

    MatrixAlgorithm.prototype.applyToPointArray = function applyToPointArray(x, y, z) {
        return [x * this.props[0] + y * this.props[4] + z * this.props[8] + this.props[12], x * this.props[1] + y * this.props[5] + z * this.props[9] + this.props[13], x * this.props[2] + y * this.props[6] + z * this.props[10] + this.props[14]];
    };

    MatrixAlgorithm.prototype.applyToPointStringified = function applyToPointStringified(x, y) {
        return Math.round(x * this.props[0] + y * this.props[4] + this.props[12]) + ',' + Math.round(x * this.props[1] + y * this.props[5] + this.props[13]);
    };

    return MatrixAlgorithm;
}();

exports.MatrixAlgorithm = MatrixAlgorithm;

var Matrix = function () {
    function Matrix() {
        var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1.0;
        var b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.0;
        var c = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.0;
        var d = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1.0;
        var tx = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0.0;
        var ty = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0.0;

        _classCallCheck(this, Matrix);

        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.tx = tx;
        this.ty = ty;
    }

    Matrix.unmatrix = function unmatrix(matrix) {
        var A = matrix.a;
        var B = matrix.b;
        var C = matrix.c;
        var D = matrix.d;
        if (A * D == B * C) {
            return { scale: { x: 1.0, y: 1.0 }, degree: 0.0, translate: { x: 0.0, y: 0.0 } };
        }
        // step (3)
        var scaleX = Math.sqrt(A * A + B * B);
        A /= scaleX;
        B /= scaleX;
        // step (4)
        var skew = A * C + B * D;
        C -= A * skew;
        D -= B * skew;
        // step (5)
        var scaleY = Math.sqrt(C * C + D * D);
        C /= scaleY;
        D /= scaleY;
        skew /= scaleY;
        // step (6)
        if (A * D < B * C) {
            A = -A;
            B = -B;
            skew = -skew;
            scaleX = -scaleX;
        }
        return { scale: { x: scaleX, y: scaleY }, degree: Math.atan2(B, A) / (Math.PI / 180), translate: { x: matrix.tx, y: matrix.ty } };
    };

    Matrix.prototype.setValues = function setValues(values) {
        this.a = values.a;
        this.b = values.b;
        this.c = values.c;
        this.d = values.d;
        this.tx = values.tx;
        this.ty = values.ty;
    };

    Matrix.prototype.getValues = function getValues() {
        return {
            a: this.a,
            b: this.b,
            c: this.c,
            d: this.d,
            tx: this.tx,
            ty: this.ty
        };
    };

    Matrix.prototype.isIdentity = function isIdentity() {
        return this.a == 1 && this.b == 0 && this.c == 0 && this.d == 1 && this.tx == 0 && this.ty == 0;
    };

    Matrix.prototype.setScale = function setScale(x, y) {
        var obj = new MatrixAlgorithm();
        var unMatrix = Matrix.unmatrix(this);
        obj.rotate(-(unMatrix.degree * Math.PI / 180));
        obj.scale(x || unMatrix.scale.x, y || unMatrix.scale.y, 1.0);
        obj.translate(unMatrix.translate.x, unMatrix.translate.y, 0.0);
        this.a = obj.props[0];
        this.b = obj.props[1];
        this.c = obj.props[4];
        this.d = obj.props[5];
        this.tx = obj.props[12];
        this.ty = obj.props[13];
    };

    Matrix.prototype.postScale = function postScale(x, y) {
        var obj = new MatrixAlgorithm();
        var unMatrix = Matrix.unmatrix(this);
        obj.rotate(-(unMatrix.degree * Math.PI / 180));
        obj.scale(unMatrix.scale.x, unMatrix.scale.y, 1.0);
        obj.translate(unMatrix.translate.x, unMatrix.translate.y, 0.0);
        obj.scale(x || 1.0, y || 1.0, 1.0);
        this.a = obj.props[0];
        this.b = obj.props[1];
        this.c = obj.props[4];
        this.d = obj.props[5];
        this.tx = obj.props[12];
        this.ty = obj.props[13];
    };

    Matrix.prototype.setTranslate = function setTranslate(x, y) {
        var obj = new MatrixAlgorithm();
        var unMatrix = Matrix.unmatrix(this);
        obj.rotate(-(unMatrix.degree * Math.PI / 180));
        obj.scale(unMatrix.scale.x, unMatrix.scale.y, 1.0);
        obj.translate(x || unMatrix.translate.x, y || unMatrix.translate.y, 0.0);
        this.a = obj.props[0];
        this.b = obj.props[1];
        this.c = obj.props[4];
        this.d = obj.props[5];
        this.tx = obj.props[12];
        this.ty = obj.props[13];
    };

    Matrix.prototype.postTranslate = function postTranslate(x, y) {
        var obj = new MatrixAlgorithm();
        var unMatrix = Matrix.unmatrix(this);
        obj.rotate(-(unMatrix.degree * Math.PI / 180));
        obj.scale(unMatrix.scale.x, unMatrix.scale.y, 1.0);
        obj.translate(unMatrix.translate.x, unMatrix.translate.y, 0.0);
        obj.translate(x || 0.0, y || 0.0, 0.0);
        this.a = obj.props[0];
        this.b = obj.props[1];
        this.c = obj.props[4];
        this.d = obj.props[5];
        this.tx = obj.props[12];
        this.ty = obj.props[13];
    };

    Matrix.prototype.setRotate = function setRotate(angle) {
        var obj = new MatrixAlgorithm();
        var unMatrix = Matrix.unmatrix(this);
        obj.rotate(-angle || -(unMatrix.degree * Math.PI / 180));
        obj.scale(unMatrix.scale.x, unMatrix.scale.y, 1.0);
        obj.translate(unMatrix.translate.x, unMatrix.translate.y, 0.0);
        this.a = obj.props[0];
        this.b = obj.props[1];
        this.c = obj.props[4];
        this.d = obj.props[5];
        this.tx = obj.props[12];
        this.ty = obj.props[13];
    };

    Matrix.prototype.postRotate = function postRotate(angle) {
        var obj = new MatrixAlgorithm();
        var unMatrix = Matrix.unmatrix(this);
        obj.rotate(-(unMatrix.degree * Math.PI / 180));
        obj.scale(unMatrix.scale.x, unMatrix.scale.y, 1.0);
        obj.translate(unMatrix.translate.x, unMatrix.translate.y, 0.0);
        obj.rotate(-angle);
        this.a = obj.props[0];
        this.b = obj.props[1];
        this.c = obj.props[4];
        this.d = obj.props[5];
        this.tx = obj.props[12];
        this.ty = obj.props[13];
    };

    Matrix.prototype.preConcat = function preConcat(preMatrix) {
        var obj = new MatrixAlgorithm();
        obj.props[0] = preMatrix.a;
        obj.props[1] = preMatrix.b;
        obj.props[4] = preMatrix.c;
        obj.props[5] = preMatrix.d;
        obj.props[12] = preMatrix.tx;
        obj.props[13] = preMatrix.ty;
        obj.transform(this.a, this.b, 0, 0, this.c, this.d, 0, 0, 0, 0, 1, 0, this.tx, this.ty, 0, 1);
        this.a = obj.props[0];
        this.b = obj.props[1];
        this.c = obj.props[4];
        this.d = obj.props[5];
        this.tx = obj.props[12];
        this.ty = obj.props[13];
    };

    Matrix.prototype.concat = function concat(postMatrix) {
        var obj = new MatrixAlgorithm();
        obj.props[0] = this.a;
        obj.props[1] = this.b;
        obj.props[4] = this.c;
        obj.props[5] = this.d;
        obj.props[12] = this.tx;
        obj.props[13] = this.ty;
        obj.transform(postMatrix.a, postMatrix.b, 0, 0, postMatrix.c, postMatrix.d, 0, 0, 0, 0, 1, 0, postMatrix.tx, postMatrix.ty, 0, 1);
        this.a = obj.props[0];
        this.b = obj.props[1];
        this.c = obj.props[4];
        this.d = obj.props[5];
        this.tx = obj.props[12];
        this.ty = obj.props[13];
    };

    return Matrix;
}();

exports.Matrix = Matrix;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
exports.UIRectZero = { x: 0, y: 0, width: 0, height: 0 };
exports.UIRectMake = function (x, y, width, height) {
    return { x: x, y: y, width: width, height: height };
};
exports.UIRectEqualToRect = function (a, b) {
    return Math.abs(a.x - b.x) < 0.001 && Math.abs(a.y - b.y) < 0.001 && Math.abs(a.width - b.width) < 0.001 && Math.abs(a.height - b.height) < 0.001;
};
exports.UIRectInset = function (rect, dx, dy) {
    return {
        x: rect.x + dx,
        y: rect.y + dy,
        width: rect.width - 2 * dx,
        height: rect.height - 2 * dy
    };
};
exports.UIRectOffset = function (rect, dx, dy) {
    return {
        x: rect.x + dx,
        y: rect.y + dy,
        width: rect.width,
        height: rect.height
    };
};
exports.UIRectContainsPoint = function (rect, point) {
    return point.x >= rect.x && point.x <= rect.x + rect.width && point.y >= rect.y && point.y <= rect.x + rect.height;
};
exports.UIRectContainsRect = function (rect1, rect2) {
    return exports.UIRectContainsPoint(rect1, { x: rect2.x, y: rect2.y }) && exports.UIRectContainsPoint(rect1, { x: rect2.x + rect2.width, y: rect2.y }) && exports.UIRectContainsPoint(rect1, { x: rect2.x, y: rect2.y + rect2.height }) && exports.UIRectContainsPoint(rect1, { x: rect2.x + rect2.width, y: rect2.y + rect2.height });
};
exports.UIRectIntersectsRect = function (a, b) {
    if (a.x + a.width - 0.1 <= b.x || b.x + b.width - 0.1 <= a.x || a.y + a.height - 0.1 <= b.y || b.y + b.height - 0.1 <= a.y) {
        return false;
    }
    return true;
};
exports.UIRectUnion = function (r1, r2) {
    var x = Math.min(r1.x, r2.x);
    var y = Math.min(r1.y, r2.y);
    var width = Math.max(r1.x + r1.width, r2.x + r2.width);
    var height = Math.max(r1.y + r1.height, r2.y + r2.height);
    return { x: x, y: y, width: width, height: height };
};
exports.UIRectIsEmpty = function (rect) {
    return rect.width == 0.0 || rect.height == 0.0;
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });

var UIColor = function () {
    function UIColor(r, g, b, a) {
        _classCallCheck(this, UIColor);

        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }

    UIColor.hexColor = function hexColor(hexValue) {
        var trimedValue = hexValue.replace('#', '');
        if (trimedValue.length === 6) {
            return new UIColor(parseInt(trimedValue.substr(0, 2), 16) / 255.0, parseInt(trimedValue.substr(2, 2), 16) / 255.0, parseInt(trimedValue.substr(4, 2), 16) / 255.0, 1.0);
        } else if (trimedValue.length === 8) {
            return new UIColor(parseInt(trimedValue.substr(2, 2), 16) / 255.0, parseInt(trimedValue.substr(4, 2), 16) / 255.0, parseInt(trimedValue.substr(6, 2), 16) / 255.0, parseInt(trimedValue.substr(0, 2), 16) / 255.0);
        } else {
            return UIColor.clear;
        }
    };

    UIColor.prototype.colorWithAlphaComponent = function colorWithAlphaComponent(value) {
        return new UIColor(this.r, this.g, this.b, this.a * value);
    };

    UIColor.prototype.toStyle = function toStyle() {
        return 'rgba(' + (this.r * 255).toFixed(0) + ', ' + (this.g * 255).toFixed(0) + ', ' + (this.b * 255).toFixed(0) + ', ' + this.a.toFixed(6) + ')';
    };

    UIColor.toStyle = function toStyle(color) {
        return 'rgba(' + (color.r * 255).toFixed(0) + ', ' + (color.g * 255).toFixed(0) + ', ' + (color.b * 255).toFixed(0) + ', ' + color.a.toFixed(6) + ')';
    };

    return UIColor;
}();

UIColor.black = new UIColor(0.0, 0.0, 0.0, 1.0);
UIColor.clear = new UIColor(0.0, 0.0, 0.0, 0.0);
UIColor.gray = new UIColor(0.5, 0.5, 0.5, 1.0);
UIColor.red = new UIColor(1.0, 0.0, 0.0, 1.0);
UIColor.yellow = new UIColor(1.0, 1.0, 0.0, 1.0);
UIColor.green = new UIColor(0.0, 1.0, 0.0, 1.0);
UIColor.blue = new UIColor(0.0, 0.0, 1.0, 1.0);
UIColor.white = new UIColor(1.0, 1.0, 1.0, 1.0);
exports.UIColor = UIColor;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var Matrix_1 = __webpack_require__(0);
exports.UIAffineTransformIdentity = { a: 1.0, b: 0.0, c: 0.0, d: 1.0, tx: 0.0, ty: 0.0 };
exports.UIAffineTransformMake = function (a, b, c, d, tx, ty) {
    return { a: a, b: b, c: c, d: d, tx: tx, ty: ty };
};
exports.UIAffineTransformMakeTranslation = function (tx, ty) {
    return exports.UIAffineTransformMake(1.0, 0.0, 0.0, 1.0, tx, ty);
};
exports.UIAffineTransformMakeScale = function (sx, sy) {
    return exports.UIAffineTransformMake(sx, 0.0, 0.0, sy, 0.0, 0.0);
};
exports.UIAffineTransformMakeRotation = function (angle) {
    var mCos = Math.cos(angle);
    var mSin = Math.sin(angle);
    return exports.UIAffineTransformMake(mCos, -mSin, mSin, mCos, 0.0, 0.0);
};
exports.UIAffineTransformTranslate = function (t, tx, ty) {
    var matrix = new Matrix_1.Matrix();
    matrix.setValues(t);
    matrix.postTranslate(tx, ty);
    return matrix.getValues();
};
exports.UIAffineTransformScale = function (t, sx, sy) {
    var matrix = new Matrix_1.Matrix();
    matrix.setValues(t);
    matrix.postScale(sx, sx);
    return matrix.getValues();
};
exports.UIAffineTransformRotate = function (t, angle) {
    var matrix = new Matrix_1.Matrix();
    matrix.setValues(t);
    matrix.postRotate(angle);
    return matrix.getValues();
};
exports.UIAffineTransformInvert = function (t) {
    return {
        a: t.a,
        b: t.c,
        c: t.b,
        d: t.d,
        tx: t.tx,
        ty: t.ty
    };
};
exports.UIAffineTransformConcat = function (t1, t2) {
    var matrix1 = new Matrix_1.Matrix();
    matrix1.setValues(t1);
    var matrix2 = new Matrix_1.Matrix();
    matrix2.setValues(t2);
    matrix1.concat(matrix2);
    return matrix1.getValues();
};
exports.UIAffineTransformEqualToTransform = function (t1, t2) {
    return Math.abs(t1.a - t2.a) < 0.001 && Math.abs(t1.b - t2.b) < 0.001 && Math.abs(t1.c - t2.c) < 0.001 && Math.abs(t1.d - t2.d) < 0.001 && Math.abs(t1.tx - t2.tx) < 0.001 && Math.abs(t1.ty - t2.ty) < 0.001;
};
exports.UIAffineTransformIsIdentity = function (transform) {
    return exports.UIAffineTransformEqualToTransform(transform, exports.UIAffineTransformIdentity);
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
// xt-framework/uiview.js
var UIRect_1 = __webpack_require__(1);
var UIColor_1 = __webpack_require__(2);
var UIAffineTransform_1 = __webpack_require__(3);
var Matrix_1 = __webpack_require__(0);

var UIViewElement = function () {
    function UIViewElement(component) {
        _classCallCheck(this, UIViewElement);

        this.component = component;
    }

    UIViewElement.prototype.buildStyle = function buildStyle() {
        var props = this.component.properties.props || {};
        return "\n    position: absolute;\n    left: " + props._frame.x + "px;\n    top: " + props._frame.y + "px;\n    width: " + props._frame.width + "px;\n    height: " + props._frame.height + "px; \n    background-color: " + (props._backgroundColor !== undefined ? UIColor_1.UIColor.toStyle(props._backgroundColor) : 'transparent') + ";\n    opacity: " + props._alpha + ";\n    display: " + (props._hidden ? "none" : "") + ";\n    overflow: " + (props._clipsToBounds ? "hidden" : "") + ";\n    transform: " + (UIAffineTransform_1.UIAffineTransformIsIdentity(props._transform) ? "" : 'matrix(' + props._transform.a + ', ' + props._transform.b + ', ' + props._transform.c + ', ' + props._transform.d + ', ' + props._transform.tx + ', ' + props._transform.ty + ')') + ";\n    ";
    };

    return UIViewElement;
}();

exports.UIViewElement = UIViewElement;

var UIViewComponent = function UIViewComponent() {
    _classCallCheck(this, UIViewComponent);

    this.properties = {
        props: {
            type: Object,
            value: {},
            observer: function observer(newVal, oldVal) {
                if (newVal === undefined || newVal === null) {
                    return;
                }
                if (newVal.isDirty !== true) {
                    return;
                }
                var self = this;
                if (self.el === undefined) {
                    self.el = new UIViewElement(self);
                }
                self.setData({
                    style: self.el.buildStyle(),
                    subviews: newVal.subviews
                });
            }
        }
    };
    this.data = {
        style: ''
    };
};

exports.UIViewComponent = UIViewComponent;
exports.dirtyItems = [];

var UIView = function () {
    function UIView() {
        _classCallCheck(this, UIView);

        this.clazz = "UIView";
        this.isDirty = true;
        this.dataResponder = undefined;
        this._frame = UIRect_1.UIRectZero;
        this.bounds = UIRect_1.UIRectZero;
        this._transform = UIAffineTransform_1.UIAffineTransformIdentity;
        // hierarchy
        this.tag = 0;
        this.viewDelegate = undefined;
        this._superview = new WeakMap();
        this.subviews = [];
        this._clipsToBounds = false;
        this._hidden = false;
        // protected _contentMode: UIViewContentMode = UIViewContentMode.scaleToFill
        this._tintColor = undefined;
        this._alpha = 1.0;
        this._backgroundColor = undefined;
        this.invalidateCallHandler = undefined;
        exports.dirtyItems.push(this);
    }

    UIView.prototype.attach = function attach(dataResponder) {
        this.dataResponder = dataResponder;
        this.dataResponder();
    };

    UIView.prototype.removeFromSuperview = function removeFromSuperview() {
        var _this = this;

        if (this.superview !== undefined) {
            var superview = this.superview;
            superview.willRemoveSubview(this);
            this.willMoveToSuperview(undefined);
            superview.subviews = this.superview.subviews.filter(function (it) {
                return it !== _this;
            });
            this.superview = undefined;
            superview.invalidate();
            this.didMoveToSuperview();
            this.didRemovedFromWindow();
        }
    };

    UIView.prototype.didRemovedFromWindow = function didRemovedFromWindow() {
        this.subviews.forEach(function (it) {
            return it.didRemovedFromWindow();
        });
    };

    UIView.prototype.insertSubviewAtIndex = function insertSubviewAtIndex(view, index) {
        if (view.superview !== undefined) {
            view.removeFromSuperview();
        }
        view.willMoveToSuperview(this);
        view.superview = this;
        this.subviews.splice(index, 0, view);
        this.invalidate();
        view.didMoveToSuperview();
        this.didAddSubview(view);
    };

    UIView.prototype.exchangeSubview = function exchangeSubview(index1, index2) {
        var index2View = this.subviews[index2];
        this.subviews[index2] = this.subviews[index1];
        this.subviews[index1] = index2View;
        this.invalidate();
    };

    UIView.prototype.addSubview = function addSubview(view) {
        if (view.superview !== undefined) {
            view.removeFromSuperview();
        }
        view.willMoveToSuperview(this);
        if (this.window) {
            view.willMoveToWindow(this.window);
        }
        view.superview = this;
        this.subviews.push(view);
        this.invalidate();
        view.didMoveToSuperview();
        this.didAddSubview(view);
        view.didMoveToWindow();
    };

    UIView.prototype.insertSubviewBelowSubview = function insertSubviewBelowSubview(view, belowSubview) {
        var index = this.subviews.indexOf(belowSubview);
        if (index >= 0) {
            this.insertSubviewAtIndex(view, index);
        }
    };

    UIView.prototype.insertSubviewAboveSubview = function insertSubviewAboveSubview(view, aboveSubview) {
        var index = this.subviews.indexOf(aboveSubview);
        if (index >= 0) {
            this.insertSubviewAtIndex(view, index + 1);
        }
    };

    UIView.prototype.bringSubviewToFront = function bringSubviewToFront(view) {
        var index = this.subviews.indexOf(view);
        if (index >= 0) {
            this.subviews.splice(index, 1);
            this.subviews.push(view);
            this.invalidate();
        }
    };

    UIView.prototype.sendSubviewToBack = function sendSubviewToBack(view) {
        var index = this.subviews.indexOf(view);
        if (index >= 0) {
            this.subviews.splice(index, 1);
            this.subviews.unshift(view);
            this.invalidate();
        }
    };

    UIView.prototype.isDescendantOfView = function isDescendantOfView(view) {
        var current = this;
        while (current != undefined) {
            if (current == view) {
                return true;
            }
            current = current.superview;
        }
        return false;
    };

    UIView.prototype.viewWithTag = function viewWithTag(tag) {
        for (var index = 0; index < this.subviews.length; index++) {
            var element = this.subviews[index];
            if (element.tag === tag) {
                return element;
            }
            var target = element.viewWithTag(tag);
            if (target !== undefined) {
                return target;
            }
        }
        return undefined;
    };
    // Delegates


    UIView.prototype.didAddSubview = function didAddSubview(subview) {
        if (this.viewDelegate) {
            this.viewDelegate.didAddSubview(subview);
        }
    };

    UIView.prototype.willRemoveSubview = function willRemoveSubview(subview) {};

    UIView.prototype.willMoveToSuperview = function willMoveToSuperview(newSuperview) {};

    UIView.prototype.didMoveToSuperview = function didMoveToSuperview() {
        this.tintColorDidChange();
    };

    UIView.prototype.willMoveToWindow = function willMoveToWindow(window) {
        this.subviews.forEach(function (it) {
            return it.willMoveToWindow(window);
        });
    };

    UIView.prototype.didMoveToWindow = function didMoveToWindow() {
        this.subviews.forEach(function (it) {
            return it.didMoveToWindow();
        });
    };

    UIView.prototype.setNeedsLayout = function setNeedsLayout() {
        var layoutSubviews = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        if (!layoutSubviews) {
            return;
        }
        this.layoutIfNeeded();
    };

    UIView.prototype.layoutIfNeeded = function layoutIfNeeded() {
        this.layoutSubviews();
    };

    UIView.prototype.layoutSubviews = function layoutSubviews() {
        if (this.viewDelegate) {
            this.viewDelegate.viewWillLayoutSubviews();
            this.viewDelegate.viewDidLayoutSubviews();
        }
    };
    // Rendering


    UIView.prototype.setNeedsDisplay = function setNeedsDisplay() {};

    UIView.prototype.tintColorDidChange = function tintColorDidChange() {
        this.subviews.forEach(function (it) {
            return it.tintColorDidChange();
        });
    };

    UIView.prototype.invalidate = function invalidate() {
        var _this2 = this;

        var dirty = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

        if (dirty) {
            this.isDirty = true;
            exports.dirtyItems.push(this);
        }
        var nextResponder = this.nextResponder();
        if (nextResponder !== undefined) {
            nextResponder.invalidate(false);
        } else {
            if (this.invalidateCallHandler === undefined) {
                this.invalidateCallHandler = setTimeout(function () {
                    _this2.invalidateCallHandler = undefined;
                    if (_this2.dataResponder) {
                        _this2.dataResponder();
                        exports.dirtyItems.forEach(function (it) {
                            return it.isDirty = false;
                        });
                        exports.dirtyItems = [];
                    }
                });
            }
        }
    };

    UIView.prototype.convertPointToView = function convertPointToView(point, toView) {
        var fromPoint = this.convertPointToWindow(point);
        if (!fromPoint) {
            return point;
        }
        if (toView instanceof UIWindow) {
            return fromPoint;
        }
        return toView.convertPointFromWindow(fromPoint) || point;
    };

    UIView.prototype.convertPointFromView = function convertPointFromView(point, fromView) {
        return fromView.convertPointToView(point, this);
    };

    UIView.prototype.convertRectToView = function convertRectToView(rect, toView) {
        var lt = this.convertPointToView({ x: rect.x, y: rect.y }, toView);
        var rt = this.convertPointToView({ x: rect.x + rect.width, y: rect.y }, toView);
        var lb = this.convertPointToView({ x: rect.x, y: rect.y + rect.height }, toView);
        var rb = this.convertPointToView({ x: rect.x + rect.width, y: rect.y + rect.height }, toView);
        return {
            x: Math.min(lt.x, rt.x, lb.x, rb.x),
            y: Math.min(lt.y, rt.y, lb.y, rb.y),
            width: Math.max(lt.x, rt.x, lb.x, rb.x) - Math.min(lt.x, rt.x, lb.x, rb.x),
            height: Math.max(lt.y, rt.y, lb.y, rb.y) - Math.min(lt.y, rt.y, lb.y, rb.y)
        };
    };

    UIView.prototype.convertRectFromView = function convertRectFromView(rect, fromView) {
        return fromView.convertRectToView(rect, this);
    };

    UIView.prototype.convertPointToWindow = function convertPointToWindow(point) {
        if (this.window === undefined) {
            return undefined;
        }
        var current = this;
        var currentPoint = { x: point.x, y: point.y };
        while (current !== undefined) {
            if (current instanceof UIWindow) {
                break;
            }
            if (!UIAffineTransform_1.UIAffineTransformIsIdentity(current.transform)) {
                var unmatrix = Matrix_1.Matrix.unmatrix(current.transform);
                var matrix2 = new Matrix_1.Matrix();
                matrix2.postTranslate(-(current.frame.width / 2.0), -(current.frame.height / 2.0));
                matrix2.postRotate(unmatrix.degree / (180.0 / Math.PI));
                matrix2.postScale(unmatrix.scale.x, unmatrix.scale.y);
                matrix2.postTranslate(unmatrix.translate.x, unmatrix.translate.y);
                matrix2.postTranslate(current.frame.width / 2.0, current.frame.height / 2.0);
                var x = currentPoint.x;
                var y = currentPoint.y;
                currentPoint.x = x * matrix2.a + y * matrix2.c + matrix2.tx;
                currentPoint.y = x * matrix2.b + y * matrix2.d + matrix2.ty;
            }
            if (current.superview !== undefined && current.superview.isScrollerView === true) {
                currentPoint.x += -current.superview.domElement.scrollLeft;
                currentPoint.y += -current.superview.domElement.scrollTop;
            }
            currentPoint.x += current.frame.x;
            currentPoint.y += current.frame.y;
            current = current.superview;
        }
        return currentPoint;
    };

    UIView.prototype.convertPointFromWindow = function convertPointFromWindow(point) {
        if (this.window == undefined) {
            return undefined;
        }
        var current = this;
        var routes = [];
        while (current !== undefined) {
            if (current instanceof UIWindow) {
                break;
            }
            routes.unshift(current);
            current = current.superview;
        }
        var currentPoint = { x: point.x, y: point.y };
        routes.forEach(function (it) {
            if (it.superview !== undefined && it.superview.isScrollerView === true) {
                currentPoint.x -= -it.superview.domElement.scrollLeft;
                currentPoint.y -= -it.superview.domElement.scrollTop;
            }
            currentPoint.x -= it.frame.x;
            currentPoint.y -= it.frame.y;
            if (!UIAffineTransform_1.UIAffineTransformIsIdentity(it.transform)) {
                var unmatrix = Matrix_1.Matrix.unmatrix(it.transform);
                var matrix2 = new Matrix_1.Matrix();
                matrix2.postTranslate(-(it.frame.width / 2.0), -(it.frame.height / 2.0));
                matrix2.postRotate(unmatrix.degree / (180.0 / Math.PI));
                matrix2.postScale(unmatrix.scale.x, unmatrix.scale.y);
                matrix2.postTranslate(unmatrix.translate.x, unmatrix.translate.y);
                matrix2.postTranslate(it.frame.width / 2.0, it.frame.height / 2.0);
                var id = 1 / (matrix2.a * matrix2.d + matrix2.c * -matrix2.b);
                var x = currentPoint.x;
                var y = currentPoint.y;
                currentPoint.x = matrix2.d * id * x + -matrix2.c * id * y + (matrix2.ty * matrix2.c - matrix2.tx * matrix2.d) * id;
                currentPoint.y = matrix2.a * id * y + -matrix2.b * id * x + (-matrix2.ty * matrix2.a + matrix2.tx * matrix2.b) * id;
            }
        });
        return currentPoint;
    };

    UIView.prototype.nextResponder = function nextResponder() {
        return this.viewDelegate || this.superview || undefined;
    };

    _createClass(UIView, [{
        key: "frame",
        set: function set(value) {
            var boundsChanged = this._frame.width != value.width || this._frame.height != value.height;
            this._frame = value;
            if (boundsChanged) {
                this.bounds = { x: 0, y: 0, width: value.width, height: value.height };
                this.setNeedsLayout(true);
            }
            this.invalidate();
        },
        get: function get() {
            return this.frame;
        }
    }, {
        key: "center",
        get: function get() {
            return { x: this.frame.x + this.frame.width / 2.0, y: this.frame.y + this.frame.height / 2.0 };
        },
        set: function set(value) {
            this.frame = { x: value.x - this.frame.width / 2.0, y: value.y - this.frame.height / 2.0, width: this.frame.width, height: this.frame.height };
        }
    }, {
        key: "transform",
        get: function get() {
            return this._transform;
        },
        set: function set(value) {
            this._transform = value;
            this.invalidate();
        }
    }, {
        key: "superview",
        get: function get() {
            return this._superview.get(this);
        },
        set: function set(value) {
            this._superview.set(this, value);
        }
    }, {
        key: "window",
        get: function get() {
            if (this instanceof UIWindow) {
                return this;
            } else if (this.superview) {
                return this.superview.window;
            }
            return undefined;
        }
    }, {
        key: "viewController",
        get: function get() {
            if (this.viewDelegate !== undefined) {
                return this.viewDelegate;
            } else if (this.superview) {
                return this.superview.viewController;
            }
            return undefined;
        }
    }, {
        key: "clipsToBounds",
        get: function get() {
            return this._clipsToBounds;
        },
        set: function set(value) {
            this._clipsToBounds = value;
            this.invalidate();
        }
    }, {
        key: "hidden",
        set: function set(value) {
            this._hidden = value;
            this.invalidate();
        },
        get: function get() {
            return this._hidden;
        }
    }, {
        key: "tintColor",
        set: function set(value) {
            this._tintColor = value;
            this.tintColorDidChange();
        },
        get: function get() {
            return this._tintColor || this.superview && this.superview.tintColor || new UIColor_1.UIColor(0.0, 122.0 / 255.0, 1.0, 1.0);
        }
    }, {
        key: "alpha",
        set: function set(value) {
            this._alpha = value;
            this.invalidate();
        },
        get: function get() {
            return this._alpha;
        }
    }, {
        key: "backgroundColor",
        set: function set(value) {
            this._backgroundColor = value;
            this.invalidate();
        },
        get: function get() {
            return this._backgroundColor;
        }
    }]);

    return UIView;
}();

exports.UIView = UIView;

var UIWindow = function (_UIView) {
    _inherits(UIWindow, _UIView);

    function UIWindow() {
        _classCallCheck(this, UIWindow);

        return _possibleConstructorReturn(this, _UIView.apply(this, arguments));
    }

    return UIWindow;
}(UIView);

exports.UIWindow = UIWindow;
Component(new UIViewComponent());

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.assign(module.exports, __webpack_require__(1));
Object.assign(module.exports, __webpack_require__(3));
Object.assign(module.exports, __webpack_require__(2));
Object.assign(module.exports, __webpack_require__(4));
Component({
    properties: {
        view: {
            type: Object,
            value: undefined,
            observer: function observer(newVal, oldVal) {
                if (newVal === undefined || newVal === null) {
                    return;
                }
                if (typeof this.data.clazz !== "string" || _typeof(this.data.view) !== newVal) {
                    this.setData({
                        view: newVal,
                        clazz: newVal.clazz
                    });
                }
            }
        }
    },
    data: {
        view: undefined,
        clazz: "UIView"
    },
    methods: {}
});

/***/ })
/******/ ]);