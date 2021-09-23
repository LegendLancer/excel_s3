const excelToJson = require('convert-excel-to-json');

class Excel2JSON {
    private filename: string = "";
    private result: {} = {};

    constructor(filename: string = "") {
        this.filename = filename;
    }

    setFileName(filename: string): void {
        this.filename = filename;
    }

    convert(): object {
        const result = excelToJson({
            sourceFile: this.filename
        });
        this.result = {...result};
        return result;
    }

    fetchOneColumn(number: string, sheetNumber: string = "Sheet1"): object {
        let result:any = {};
        const data:any = {...this.result};
        let index = 0;
        for(const item of data[sheetNumber]) {
            if(index == 0){
                index ++; continue;
            }
            result[index] = item[number];
            index ++;
        }
        return result;
    }
}

export default Excel2JSON;