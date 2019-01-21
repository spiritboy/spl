import {entity} from "../../../../api/entity";

export class searchChildrenModel{
    constructor(){
        this.caption = null;
        this.name = null;
        this.id = null;
    }
    deserialize(inp){
        this.caption = inp.Caption;
        this.name = inp.Name;
        this.id = inp.ID;
        return this;
    }
    static async children(parentId,name,pp,pn){
        return (await entity.Children(parentId,name,pp,pn)).data.map(d=>new searchChildrenModel().deserialize(d));
    }
}