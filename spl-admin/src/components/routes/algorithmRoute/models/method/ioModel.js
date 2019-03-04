export class ioModel {
    constructor() {
        this.name = null;
        this.dataType = null;
        this.value = null;
    }
    deserialize(inp){
        this.name = inp.Name;
        this.dataType = inp.DataType;
        return this;
    }
}