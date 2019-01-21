import {term} from "../../../../api/term";

export class classExtModel {
    constructor() {
        this.name = '';
        this.id = 0;
        this.clsId = '';
        this.classRefName = '';
        this._dataType = '';
        this.isRequired = true;
        this.isMultiSelect = false;
        this.isId = false;
        this.isSearchable = 0.0;
    }

    get dataType() {
        return this._dataType;
    }

    set dataType(v) {
        this._dataType = v;
    }

    deserialize(inp) {
        this.name = inp.Property;
        this.isRequired = inp.IsRequired;
        this.isMultiSelect = inp.IsMultiSelect;
        this.isId = inp.IsID;
        this.isSearchable = inp.IsSearchable;
        this.dataType = inp.DataType;
        this.classRefName = inp.ClassRefName;
        if (inp.DataType.indexOf('lookup') === 0) {
            this.dataType = 'lookup';
            this.clsId = inp.DataType.replace('lookup', '').replace('(', '').replace(')', '');
        }
        this.id = parseInt(inp.ID);
        return this;
    }

    getDataType() {
        return this.dataType + (this.dataType === 'lookup' && this.clsId ? '(' + this.clsId + ')' : '');
    }

    async update() {
        let dbMsg = await term.ClassUpdateEx({
            ID: this.id,
            Property: this.name,
            IsMultiSelect: this.isMultiSelect,
            IsID: this.isId,
            IsSearchable: this.isSearchable,
            IsRequired: this.isRequired,
            DataType: this.getDataType()
        });
        return dbMsg;
    }
}