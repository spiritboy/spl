import {menuModel} from "./menuModel";
import {categoryModel} from "./categoryModel";
import {groupModel} from "./groupModel";
import {questionModel} from "./questionModel";
import {entity} from "../../../../api/entity";
import {subQuestionModel} from "./subQuestionModel";

export class searchBarModel {
    constructor() {
        this.id = null;
        this.pathIdString = '';
        this.pathNameString = '';
        this.pathEntityNameString = '';

        this.treeLevel = null;
    }

    get PathIDs() {
        return this.pathIdString.split('‰');
    }

    get PathEntityNames() {
        return this.pathEntityNameString.split('‰');
    }
    get PathNames() {
        return this.pathNameString.split('‰');
    }

    get MenuItem() {
        if (this.PathIDs.length <= 0) return null;
        let menu = new menuModel();
        menu.id = this.PathIDs[0];
        menu.name = this.PathNames[0];
        menu.entityName = this.PathEntityNames[0];
        return menu;
    }

    get CategoryItem() {
        if (this.PathIDs.length <= 1) return null;
        let cat = new categoryModel();
        cat.id = this.PathIDs[1];
        cat.name = this.PathNames[1];
        cat.entityName = this.PathEntityNames[1];
        return cat;
    }

    get GroupItem() {
        if (this.PathIDs.length <= 2) return null;
        let group = new groupModel();
        group.id = this.PathIDs[2];
        group.name = this.PathNames[2];
        group.entityName = this.PathEntityNames[2];
        return group;
    }

    get QuestionItem() {
        if (this.PathIDs.length <= 3) return null;
        let question = new questionModel();
        question.id = this.PathIDs[3];
        question.name = this.PathNames[3];
        question.entityName = this.PathEntityNames[3];
        return question;
    }
    get SubQuestionItem() {
        if (this.PathIDs.length <= 4) return null;
        let squestion = new subQuestionModel();
        squestion.id = this.PathIDs[4];
        squestion.name = this.PathNames[4];
        squestion.entityName = this.PathEntityNames[4];
        return squestion;
    }
    get LastItem() {
        if (this.SubQuestionItem != null) return this.SubQuestionItem;
        if (this.QuestionItem != null) return this.QuestionItem;
        if (this.QuestionItem != null) return this.QuestionItem;
        if (this.GroupItem != null) return this.GroupItem;
        if (this.CategoryItem != null) return this.CategoryItem;
        if (this.MenuItem != null) return this.MenuItem;
        return null;
    }

    addChild(id, name,entityName) {
        this.pathEntityNameString += '‰' + entityName;
        this.pathIdString += '‰' + id;
        this.pathNameString += '‰' + name;
    }
    popChild() {
        let pathIds = this.PathIDs;
        pathIds.pop();
        this.pathIdString = pathIds.join('‰');

        let pathNames = this.PathNames;
        pathNames.pop();
        this.pathNameString = pathNames.join('‰');

        let pathEntityNames = this.PathEntityNames;
        pathEntityNames.pop();
        this.pathEntityNameString = pathEntityNames.join('‰');
    }
    deserialize(inp) {
        this.id = inp.BaseID;
        this.pathIdString = inp.PathID;
        this.pathNameString = inp.PathName;
        this.pathEntityNameString = inp.PathEntityName;
        this.treeLevel = inp.TreeLevel;
        return this;
    }

    static async searchTree(name, pp, pn) {
        return (await entity.SearchTree(name, pp, pn)).data.map(d => new searchBarModel().deserialize(d));
    }
}