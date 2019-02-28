import {classExtModel} from "../../termRoute/model/classExtModel";
import {fieldInfoModel} from "../fields/fieldModels/fieldInfoModel";

export class entityExtModel {
    constructor() {
        this.id = null;
        this.classExtModel = null;
        this.name = null;
        this.fieldInfo = new fieldInfoModel();
    }

    deserialize(inp, clsModel) {
        this.id = inp.ID;
        this.name = inp.Name;
        this.classExtModel = clsModel;
        this.fieldInfo = new fieldInfoModel().deserialize(inp.fieldInfo);

        return this;
    }
}