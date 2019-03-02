export class textFieldInfoModel{
    constructor(){
        this.mask = '';
        this.includeLiteralsInValue = false;
    }
    deserialize(inp){
        this.mask = inp.mask;
        this.includeLiteralsInValue = inp.includeLiteralsInValue;
    }
}