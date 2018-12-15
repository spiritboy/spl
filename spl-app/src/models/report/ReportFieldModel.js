export class ReportFieldModel {
    constructor() {
        this.title = '';
        this.value = '';
        this.row = 0;
        this.column = 0;
    }

    deserialize(inp) {
        this.title = inp.title;
        this.value = inp.value;
        this.row = parseInt(inp.row);
        this.column = parseInt(inp.column);
        return this;
    }
}