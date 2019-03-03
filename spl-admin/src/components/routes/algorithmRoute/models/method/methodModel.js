import {ioModel} from "./ioModel";
import {algorithm} from "../../../../../api/algorithm";

export class methodModel {
    constructor() {
        this.id = null;
        this.name = null;
        this.methodValue = null;
        this.methodCategory = null;
        this.input = null;
        this.output = null;
        this.isArray = null;
        this.url = null;
    }

    static methodsCache = null;

    static async getMethods() {
        if (methodModel.methodsCache == null)
            return methodModel.methodsCache = (await algorithm.SelectMethods()).data.map(_method => new methodModel().deserialize(_method));
        else
            return methodModel.methodsCache;
    }

    deserialize(inp) {
        if (!inp) return null;
        this.id = inp.Id;
        this.name = inp.Name;
        this.methodValue = inp.MethodValue;
        this.methodCategory = inp.MethodCategory;
        this.input = JSON.parse(inp.Input).map(d => new ioModel().deserialize(d));
        this.output = JSON.parse(inp.Output).map(d => new ioModel().deserialize(d));
        this.isArray = inp.IsArray;
        this.url = inp.Url;
        return this;
    }
}