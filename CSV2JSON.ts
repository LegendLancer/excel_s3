const excelToJson = require('convert-excel-to-json');
let csvToJson = require('convert-csv-to-json');

class CSV2JSON {
    private filename: string = "";
    private result: [] = [];

    constructor(filename: string = "") {
        this.filename = filename;
    }

    setFileName(filename: string): void {
        this.filename = filename;
    }

    convert(): object {
        const result:[] = csvToJson.parseSubArray('*',',').getJsonFromCsv(this.filename);
        this.result = [...result];
        return result;
    }

    fetchOneColumn(columnName: string): object {
        let result:any = {};
        const data:any = [...this.result];
        let index = 1;
        for(const item of data) {
            result[index] = item[columnName];
            index ++;
        }
        return result;
    }
}

export default CSV2JSON;