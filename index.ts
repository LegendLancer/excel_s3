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

// module import
const http = require('http');
const fs = require('fs');
import Excel2JSON from './Excel2Json';
const port = process.env.PORT || 3001;

// example usage of Excel2JSON class
let converter = new Excel2JSON();
converter.setFileName('./example.xls');
const result = converter.convert();
console.log(result);

// fetch one column
console.log(converter.fetchOneColumn('A'));