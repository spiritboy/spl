import {term} from "../../../../api/term";

export class classExtModel {
    constructor() {
        this.name = '';
        this.id = 0;
        this.clsId = '';
        this.classRefName = '';
        this._dataType = '';
    }
    get dataType(){
        return this._dataType;
    }
    set dataType(v){
        this._dataType= v;
    }
    deserialize(inp) {
        this.name = inp.Property;
        this.dataType = inp.DataType;
        this.classRefName = inp.ClassRefName;
        if (inp.DataType.indexOf('class') === 0) {
            this.dataType = 'class';
            this.clsId = inp.DataType.replace('class', '').replace('(', '').replace(')', '');
        }
        this.id = parseInt(inp.ID);
        return this;
    }

    getDataType() {
        return this.dataType + (this.dataType === 'class' && this.clsId ? '(' + this.clsId + ')' : '');
    }

    async update() {
        let dbMsg = await term.ClassUpdateExt({ID: this.id, Property: this.name, DataType: this.getDataType()});
        return dbMsg;
    }
}