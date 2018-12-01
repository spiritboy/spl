export class FieldInfoModel {
    constructor() {
        this.name = '';
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