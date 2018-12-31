import {term} from "../../../../api/term";
import {classExtModel} from "./classExtModel";
import config from "../../../../api/config";

export class classModel {
    constructor() {
        this.busy = false;
        this.name = '';
        this.id = 0;
        this.properties = [];
    }

    loadProperties() {
        this.busy = true;
        term.ClassSelectExt(this.id).then(d => {
            this.properties = d.data.map(v => new classExtModel().deserialize(v));
        }).finally(() => this.busy = false);
    }

    deserialize(inp) {
        this.name = inp.Name;
        this.id = parseInt(inp.ID);
        return this;
    }
    async insert() {
        let dbMsg = await term.ClassInsert({Name: this.name, UserID: config.userId});
        this.id = dbMsg.id;
        return dbMsg;
    }
    async delete() {
        let dbMsg = await term.ClassDelete(this.id);
        return dbMsg;
    }
    async update() {
        let dbMsg = await term.ClassUpdate({ID:this.id,Name: this.name, UserID: config.userId});
        return dbMsg;
    }
    async insertExt(newProp) {
        let dbMsg = await term.ClassInsertExt({ClassID: this.id, Property: newProp.name, DataType: newProp.dataType});
        newProp.id = dbMsg.id;
        return dbMsg;
    }
    async deleteExt(id) {
        let dbMsg = await term.ClassDeleteExt(id);
        return dbMsg;
    }
    async SelectTerms(name,page,perpage){
        let db_classes = await term.TermSelect(this.id,name, perpage, page);
        let classes = db_classes.data.map(v => {return {id:v.ID,name:v.Name};});
        return classes;
    }
    static async Select(name, page, perpage) {
        let db_classes = await term.ClassSelect(name, perpage, page);
        let classes = db_classes.data.map(v => new classModel().deserialize(v));
        return classes;
    }
}