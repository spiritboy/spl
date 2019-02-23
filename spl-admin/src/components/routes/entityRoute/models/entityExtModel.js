import {classExtModel} from "../../termRoute/model/classExtModel";

export class entityExtModel{
    constructor(){
        this.id = [];
        this.classExtModel = null;
        this.name = '';
    }
    deserialize(inp,clsModel){
        this.id = inp.ID;
        this.name = inp.Name;
        this.classExtModel = clsModel;

        return this;
    }
}