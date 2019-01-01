import {classModel} from "./classModel";
import {term} from "../../../../api/term";

export class termModel {
    constructor(clsId) {
        this.name = '';
        this.id = 0;
        this.clsId = clsId;
        this.classModel = null;
        this.editting = false;
        this.values = [];
    }

    async initFull() {
        this.classModel = (await classModel.Select(this.clsId, 1, 1))[0];
        await this.classModel.loadProperties();
        this.values = [];
        for (let p of this.classModel.properties)
            this.values.push('');
    }

    getSaveString() {
        let str = [];
        for (let i in this.classModel.properties) {
            str.push(this.classModel.properties[i].id);
            str.push(this.values[i]);
        }
        return str.join(',');
    }

    async insertUpdate() {
        let dbMessage = await term.TermInsertUpdate(this.clsId, this.name, this.getSaveString(), this.id);
        this.id = dbMessage.id;
        return dbMessage;
    }

    isValid() {
        if(!this.name) return false;
        for (let i in this.classModel.properties) {
            if (this.classModel.properties[i].isRequired && !this.values[i])
                return false;
        }
        return true;
    }

    async delete() {
        return await term.TermDelete(this.id);
    }
}