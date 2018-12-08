import {GroupModel} from "@/models/GroupModel";

export class CategoryModel {
    constructor(parentMenu) {
        this.parentMenu = parentMenu;
        this.id = "";
        this.title = "";
        this.groups = [];
    }

    init() {
        for (let g of this.groups)
            g.init();
    }

    deserialize(input) {
        if (input == null)
            return null;
        this.id = input.id;
        this.title = input.title;
        for (let g of input.groups)
            this.groups.push(new GroupModel(this).deserialize(g));
        return this;
    }
}