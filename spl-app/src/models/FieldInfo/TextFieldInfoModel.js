import {FieldInfoModel} from "@/models/FieldInfo/FieldInfoModel";

export class TextFieldInfoModel extends FieldInfoModel {
    constructor(parentQuestion) {
        super(parentQuestion);
        this.mask = '';
    }
    deserialize(input){
        if(input == null)
            return null;
        super.deserialize(input);
        this.mask = input.mask;
        return this;
    }
}