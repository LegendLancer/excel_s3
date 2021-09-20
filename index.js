var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var http = require('http');
var file = require('fs');
var node_xj = require("xls-to-json");
var node_jx = require('excel4node');
var port = process.env.PORT || 3000;
var exampleAPI = function (ids) {
    var populationData = {};
    for (var key in ids) {
        populationData[ids[key]] = "blabla";
    }
    return populationData;
};
var mainData = [], //main data from excel 
popData = {}; //population data
var xls2json = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, node_xj({
                    input: "example.xls",
                    output: "output.json",
                    sheet: "Sheet1",
                    rowsToSkip: 0,
                    allowEmptyKey: false
                }, function (err, result) {
                    if (err) {
                    }
                    else {
                        mainData = result;
                        var ids = {}, index = 0;
                        for (var _i = 0, result_1 = result; _i < result_1.length; _i++) {
                            var obj = result_1[_i];
                            ids[index++] = obj['Id'];
                        }
                        // call your API here
                        var populationData = exampleAPI(ids);
                        // set result
                        popData = populationData;
                    }
                })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var json2xls = function (main, population) { return __awaiter(_this, void 0, void 0, function () {
    var result, _i, main_1, obj, wb, ws, headingColumnNames, headingColumnIndex, rowIndex;
    return __generator(this, function (_a) {
        console.log(main, population);
        result = [];
        for (_i = 0, main_1 = main; _i < main_1.length; _i++) {
            obj = main_1[_i];
            obj['Population'] = population[obj['Id']];
            result.push(obj);
        }
        console.log(result);
        wb = new node_jx.Workbook();
        ws = wb.addWorksheet('Sheet1');
        headingColumnNames = [
            "Id",
            "Country",
            "City",
            "ZipCode",
            "Population",
        ];
        headingColumnIndex = 1;
        headingColumnNames.forEach(function (heading) {
            ws.cell(1, headingColumnIndex++)
                .string(heading);
        });
        rowIndex = 2;
        result.forEach(function (record) {
            var columnIndex = 1;
            Object.keys(record).forEach(function (columnName) {
                ws.cell(rowIndex, columnIndex++)
                    .string(record[columnName]);
            });
            rowIndex++;
        });
        wb.write('TeacherData.xlsx');
        return [2 /*return*/];
    });
}); };
var server = http.createServer(function (req, res) {
    console.log(popData);
    // process goes here
    xls2json();
    json2xls(mainData, popData);
    res.statusCode = 200;
    var msg = JSON.stringify("Hello world!");
    res.end(msg);
});
server.listen(port, function () {
    console.log("Server running on http://localhost:" + port + "/");
});
