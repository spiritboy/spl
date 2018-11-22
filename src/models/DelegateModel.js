export class DelegateModel{
    constructor(){
        this.script='';
    }
    exec(){
        return eval(this.script);
    }
    deserialize(input){
        if(input == null)
            return null;
        this.script = input.script;
        return this;
    }
}