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

    findQuestionValue(gid, qid, rowid) {
        if (rowid == null) rowid = 0;
        for (let g of this.groups) {
            if (g.id.toString() === gid.toString()) {
                for (let qv of g.groupValues[rowid].questionValues) {
                    if (qv.questionModel.id.toString() === qid.toString())
                        return qv;
                }
            }
        }
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