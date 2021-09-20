const http = require('http');
const node_xj = require("xls-to-json");
const node_jx = require('excel4node');
const port = process.env.PORT || 3000;

const exampleAPI = (ids) => {
    let populationData = {};
    for (let key in ids) {
        populationData[ids[key]] = "blabla";
    }
    return populationData;
}
let mainData = [], //main data from excel 
    popData = {};  //population data

const xls2json = async () => await node_xj(
    {
        input: "example.xls", // input xls
        output: "output.json", // output json
        sheet: "Sheet1", // specific sheetname
        rowsToSkip: 0, // number of rows to skip at the top of the sheet; defaults to 0
        allowEmptyKey: false, // avoids empty keys in the output, example: {"": "something"}; default: true
    },
    function (err, result) {
        if (err) {
        } else {
            mainData = result;
            let ids = {}, index = 0;
            for (let obj of result) {
                ids[index++] = obj['Id'];
            }
            // call your API here
            const populationData = exampleAPI(ids);
            // set result
            popData = populationData;
        }
    }
);

const json2xls = async (main, population) => {
    console.log(main, population);
    const result = [];
    for (let obj of main) {
        obj['Population'] = population[obj['Id']];
        result.push(obj);
    }
    console.log(result);
    const wb = new node_jx.Workbook();
    const ws = wb.addWorksheet('Sheet1');

    const headingColumnNames = [
        "Id",
        "Country",
        "City",
        "ZipCode",
        "Population",
    ]
    //Write Column Title in Excel file
    let headingColumnIndex = 1;
    headingColumnNames.forEach(heading => {
        ws.cell(1, headingColumnIndex++)
            .string(heading)
    });


    //Write Data in Excel file
    let rowIndex = 2;
    result.forEach(record => {
        let columnIndex = 1;
        Object.keys(record).forEach(columnName => {
            ws.cell(rowIndex, columnIndex++)
                .string(record[columnName])
        });
        rowIndex++;
    });
    wb.write('TeacherData.xlsx');
}



const server = http.createServer((req, res) => {
    console.log(popData);
    
    // process goes here
    xls2json();
    json2xls(mainData, popData);

    res.statusCode = 200;
    const msg = JSON.stringify("Hello world!");
    res.end(msg);
});

server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
});