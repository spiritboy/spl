import {classExtModel} from "../../termRoute/model/classExtModel";
import {fieldInfoModel} from "../fields/fieldModels/fieldInfoModel";

export class entityExtModel {
    constructor() {
        this.id = null;
        this.classExtModel = null;
        this.name = null;
        this.fieldInfo = null;
    }

    deserialize(inp, clsModel) {
        this.id = inp.ID;
        this.name = inp.Name;
        this.classExtModel = clsModel;
        if (this.classExtModel.dataType === 'fieldInfo') {
            this.fieldInfo = new fieldInfoModel().deserialize(JSON.parse(inp.Value));
            console.log(JSON.parse(inp.Value))
        }

        return this;
    }
}