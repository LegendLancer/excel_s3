"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var excelToJson = require('convert-excel-to-json');
var Excel2JSON = /** @class */ (function () {
    function Excel2JSON(filename) {
        if (filename === void 0) { filename = ""; }
        this.filename = "";
        this.result = {};
        this.filename = filename;
    }
    Excel2JSON.prototype.setFileName = function (filename) {
        this.filename = filename;
    };
    Excel2JSON.prototype.convert = function () {
        var result = excelToJson({
            sourceFile: this.filename
        });
        this.result = __assign({}, result);
        return result;
    };
    Excel2JSON.prototype.fetchOneColumn = function (number, sheetNumber) {
        if (sheetNumber === void 0) { sheetNumber = "Sheet1"; }
        var result = {};
        var data = __assign({}, this.result);
        var index = 0;
        for (var _i = 0, _a = data[sheetNumber]; _i < _a.length; _i++) {
            var item = _a[_i];
            if (index == 0) {
                index++;
                continue;
            }
            result[index] = item[number];
            index++;
        }
        return result;
    };
    return Excel2JSON;
}());
exports["default"] = Excel2JSON;
