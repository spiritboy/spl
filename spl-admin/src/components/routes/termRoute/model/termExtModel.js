import {classExtModel} from "./classExtModel";

export class termExtModel{
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