"use strict";
/*
** fetch total result style **
    {
    Sheet1: [
        { A: 'Id', B: 'Country', C: 'City', D: 'ZipCode' },
        { A: 123, B: 'US', C: 'Washington', D: 123123 },
        { A: 333, B: 'UK', C: 'London', D: 123123 },
        { A: 1112, B: 'Canada', C: 'Ottawa', D: 123123 },
        { A: 3312, B: 'Russia', C: 'Moscow', D: 123123 }
    ]
    }
    
** fetch one column result style: **
    { '1': 123, '2': 333, '3': 1112, '4': 3312 }
*/
exports.__esModule = true;
// module import
var http = require('http');
var fs = require('fs');
var CSV2JSON_1 = require("./CSV2JSON");
var port = process.env.PORT || 3001;
// example usage of Excel2JSON class
var converter = new CSV2JSON_1["default"]();
converter.setFileName('./myInputFile.csv');
var result = converter.convert();
console.log(result);
// fetch one column
console.log(converter.fetchOneColumn('first_name'));
