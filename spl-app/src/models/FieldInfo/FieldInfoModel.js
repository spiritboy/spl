export class FieldInfoModel {
    constructor(parentQuestion) {
        this.name = '';
        this.parentQuestion = parentQuestion;
        this.style = {};
    }
    deserialize(input){
        if(input == null)
            return null;
        this.name = input.name;
        this.style = input.style;
        return this;
    }
}