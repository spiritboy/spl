export class similarModel{
    constructor(){
        this.clsName='';
        this.propertyValues=null;
    }
    deserialize(inp){
        this.clsName = inp.ClassName;
        console.log(inp.PropertyValue)
        this.propertyValues = JSON.parse(inp.PropertyValue);
        return this;
    }
}