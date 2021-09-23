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
        await csvtojson()
        .fromString(this.csv)
        .then((res:any) => {
            this.result = res;
        });        
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