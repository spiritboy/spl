import {classModel} from "./classModel";
import {term} from "../../../../api/term";
import {termExtModel} from "./termExtModel";

export class termModel {
    constructor(clsId) {
        this.name = '';
        this.id = 0;
        this.clsId = clsId;
        this.classModel = null;
        this.extendeds = [];
        this.propertiesString = '';
    }

    async initFull() {
        this.extendeds = [];
        this.classModel = (await classModel.Select(this.clsId, 1, 1))[0];
        await this.classModel.loadProperties();
        let _dbTermExts = (await term.TermSelectEx(this.id)).data;
        for (let p of this.classModel.properties) {
            let _dbExt = _dbTermExts.filter(db => db.ClassExID === p.id)[0];
            let ext = new termExtModel();
            ext.id = _dbExt ? _dbExt.ID : null;
            ext.name = _dbExt ? _dbExt.Name : null;
            ext.classExtModel = p;
            this.extendeds.push(ext);
        }
    }

    get values() {
        let str = [];
        for (let i in this.classModel.properties) {
            str.push(this.classModel.properties[i].id);
            str.push(this.extendeds[i].id);
        }
        return str.join(',');
    }

    async insertUpdate() {
        let dbMessage = await term.TermInsertUpdate(this.clsId, this.name, this.values, this.id);
        this.id = dbMessage.id;
        if (dbMessage.result === true) {
            console.log(this.extendeds)
            this.propertiesString = this.extendeds.map(tExtModel => tExtModel.classExtModel.name + ':' + tExtModel.id).join();
        }
        return dbMessage;
    }

    isValid() {
        if (!this.name) return false;
        for (let i in this.classModel.properties) {
            if (this.classModel.properties[i].isRequired && !this.extendeds[i].id)
                return false;
        }
        return true;
    }

    async delete() {
        return await term.TermDelete(this.id);
    }

    static async SearchClassAndTerms(name, perpage, page) {
        let db_classes = await term.TermSearchClassAndTerm(name, perpage, page);
        let classes = db_classes.data.map(v => {
            let cls = new classModel();
            cls.id = v.ID;
            cls.name = v.Name;
            return {
                cls: cls,
                termId: v.TermID,
                termName: v.TermName,
                oId: v.OID
            }
        });
        return classes;
    }
}