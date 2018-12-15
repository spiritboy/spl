import {StyleModel} from "./StyleModel";

export class FieldInfoModel {
    constructor(parentQuestion) {
        this.name = '';
        this.parentQuestion = parentQuestion;
        this.style = null;
    }
    deserialize(input){
        if(input == null)
            return null;
        this.name = input.name;
        this.style = new StyleModel().deserialize(input.style);
        return this;
    }
}