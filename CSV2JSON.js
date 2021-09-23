"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var excelToJson = require('convert-excel-to-json');
var csvToJson = require('convert-csv-to-json');
var CSV2JSON = /** @class */ (function () {
    function CSV2JSON(filename) {
        if (filename === void 0) { filename = ""; }
        this.filename = "";
        this.result = [];
        this.filename = filename;
    }
    CSV2JSON.prototype.setFileName = function (filename) {
        this.filename = filename;
    };
    CSV2JSON.prototype.convert = function () {
        var result = csvToJson.parseSubArray('*', ',').getJsonFromCsv(this.filename);
        this.result = __spreadArray([], result, true);
        return result;
    };
    CSV2JSON.prototype.fetchOneColumn = function (columnName) {
        var result = {};
        var data = __spreadArray([], this.result, true);
        var index = 1;
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var item = data_1[_i];
            result[index] = item[columnName];
            index++;
        }
        return result;
    };
    return CSV2JSON;
}());
exports["default"] = CSV2JSON;
