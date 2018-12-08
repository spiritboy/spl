import {FieldInfoModel} from "@/models/FieldInfo/FieldInfoModel";

export class DateFieldInfoModel extends FieldInfoModel {
    constructor(parentQuestion) {
        super(parentQuestion);
        this.format = 'yyy-mm-dd';
    }

    deserialize(input){
        if(input == null)
            return null;
        super.deserialize(input);
        this.format = input.format;
        return this;
    }
}
