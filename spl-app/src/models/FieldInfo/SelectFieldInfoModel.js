import {FieldInfoModel} from "@/models/FieldInfo/FieldInfoModel";
import {SourceModel} from "@/models/FieldInfo/SourceModel";

export class SelectFieldInfoModel extends FieldInfoModel {
    constructor() {
        super();
        this.source = null;
        this.isMultiSelect = false;
        this.isFree = false;
    }
    deserialize(input){
        if(input == null)
            return null;
        super.deserialize(input);
        this.isFree = input.isFree;
        this.isMultiSelect = input.isMultiSelect;
        this.source = new SourceModel().deserialize(input.source);
        return this;
    }
}