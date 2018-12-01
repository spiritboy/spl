export class GroupInfoModel {
    constructor(){
        this.type = 'form';//form -- table
    }
    deserialize(input){
        this.type = input.type;
        return this;
    }
}