import {GroupModel} from "@/models/GroupModel";

export class MenuModel {
    constructor() {
        this.title = "";
        this.groups = []
    }
    init(){
        for(let g of this.groups)
            g.init();
    }
    deserialize(input){
        if(input == null)
            return null;
        this.title = input.title;
        for(let g of input.groups)
            this.groups.push(new GroupModel().deserialize(g));
        return this;
    }
}