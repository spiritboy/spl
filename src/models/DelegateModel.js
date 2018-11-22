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
(function () {
    if (this.value == null || this.value === '')
        return {result:false,message:'این فیلد اجباری است'};
})()