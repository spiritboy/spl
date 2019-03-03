export class ioModel {
    constructor() {
        this.name = null;
        this.dataType = null;
    }
    deserialize(inp){
        this.name = inp.Name;
        this.dataType = inp.DataType;
        return this;
    }
}