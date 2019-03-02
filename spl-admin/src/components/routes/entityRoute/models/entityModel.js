import {classModel} from "../../termRoute/model/classModel";
import {entity} from "../../../../api/entity";
import {entityExtModel} from "./entityExtModel";
import {term} from "../../../../api/term";
import {dbMessage} from "../../../shared/dbMessage";

export class entityModel {
    constructor(levelId, clsId, parentId) {
        this.name = '';
        this.id = 0;
        this.levelId = levelId;
        this.clsId = clsId;
        this.parentId = parentId;
        this.classModel = null;
        this.extendeds = [];
        this.propertiesString = '';
    }

    static clsIds = null;

    async initFull() {
        this.extendeds = [];
        this.classModel = (await classModel.Select(this.clsId, 1, 1))[0];
        await this.classModel.loadProperties();
        let _dbEntityExts = (await entity.EntitySelectEx(this.id)).data;
        for (let p of this.classModel.properties) {
            let _dbExt = _dbEntityExts.filter(db => db.ClassExID.toString() === p.id.toString())[0];
            let ext = new entityExtModel();
            ext.classExtModel = p;
            if (_dbExt == null) _dbExt = {ID: null, Name: null, Value: null};
            _dbExt.Name = _dbExt.Value;
            ext = new entityExtModel().deserialize(_dbExt, p);
            this.extendeds.push(ext);
        }
    }

    getValueOfProperty(pid) {
        for (let ext of this.extendeds) {
            if (pid.toString() === ext.classExtModel.id.toString()) {
                if (ext.classExtModel.dataType === 'fieldInfo')
                    return ext.fieldInfo;
                else
                    return ext.name;
            }
        }
    }

    get values() {
        let str = [];
        for (let i in this.classModel.properties) {
            str.push(this.classModel.properties[i].id);
            if (this.extendeds[i].classExtModel.dataType === 'fieldInfo')
                str.push(JSON.stringify(this.extendeds[i].fieldInfo));
            else
                str.push(this.extendeds[i].name);
        }
        return str.join('†');
    }

    async insertUpdate() {
        let dbMessage = await entity.EntityInsertUpdate(this.levelId, this.parentId, this.name, this.values, this.id);
        this.id = dbMessage.id;
        if (dbMessage.result === true) {
            this.propertiesString = this.extendeds.map(tExtModel => tExtModel.classExtModel.name + ':' + tExtModel.name).join();
        }
        return dbMessage;
    }

    isValid() {
        if (!this.name) return false;
        for (let i in this.classModel.properties) {
            if (this.classModel.properties[i].dataType !== 'fieldInfo' && this.classModel.properties[i].isRequired && !this.extendeds[i].name)
                return false;
        }
        return true;
    }

    static async deleteEntity(id) {
        return await entity.EntitiyDelete(id);
    }

    static async insertSimilar(id, parentId) {
        let x = await entity.InsertSimilar(id, parentId);
        return x;
    }

    static async getClsIdsByLevel(level) {
        if (this.clsIds == null) {
            this.clsIds = (await term.SelectClassEntity()).data;
        }
        let find = this.clsIds.filter(l => l.LevelID.toString() === level.toString())[0];
        if (find)
            return find.ID;
        else
            return null;
    }
}