var csvtojson = require("csvtojson");

class CSV2JSON {
    private csv: string = "";
    public result: [] = [];

    constructor(csv: string = "") {
        this.csv = csv;
    }

    setCSV(csv: string): void {
        this.csv = csv;
    }

    async convert(): Promise<any>{
        console.log('before convert: ', this.csv);
        this.result = await csvtojson().fromString(this.csv)
        console.log('convert: ', this.result);
        return 'success';
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