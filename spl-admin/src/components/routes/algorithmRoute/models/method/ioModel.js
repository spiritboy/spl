export class ioModel {
    constructor() {
        this.display = null;
        this.paramName = null;
        this.name = null;
        this.dataType = null;
        this.isArray = false;
        this.value = [];
        this.display = [];
    }
    addValue(entity){
        if(this.isArray === false) {
            this.value = [];
            this.display = [];
        }
        this.value.push(entity.PathID);
        this.display.push(entity.PathName);
    }
    deserialize(inp){
        this.display = inp.Display;
        this.paramName = inp.ParamName;
        this.dataType = inp.DataType;
        return this;
    }
}