export class ioModel {
    constructor() {

        this.paramName = null;
        this.paramDisplay = null;
        this.dataType = null;
        this.isArray = false;
        this.defaultValue=null;
        this.valueName = [];
        this.valueDisplay = [];
    }
    addValue(entity){
        if(this.isArray === false) {
            this.valueName = [];
            this.valueDisplay = [];
        }


        this.valueName.push(entity.PathID);
        this.valueDisplay.push(entity.PathName);
    }
    deserialize(inp){
        this.paramDisplay=inp.ParamDisplay;
        this.paramName = inp.ParamName;
        this.dataType = inp.DataType;
        this.valueName = inp.ValueName;
        this.valueDisplay=inp.ValueDisplay;

        return this;
    }
}