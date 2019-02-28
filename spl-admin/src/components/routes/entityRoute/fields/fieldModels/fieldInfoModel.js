import {fontModel} from "./fontModel";

export class fieldInfoModel {
    constructor() {
        this._fieldType = 'text';
        this.font = new fontModel();
        this.tabStop = true;
        this.lock = false;
        this.visible = true;
        this.align = "right";
        this.direction = "rtl";
        this.numericShape = "farsi";
        this.language = "farsi";
        this.customProperties = null;
    }
    get fieldType(){
        return this._fieldType;
    }
    set fieldType(v){
        this._fieldType = v;
    }
    deserialize(inp) {
        if (inp && inp.tabStop)
            this.tabStop = inp.tabStop;
        if (inp && inp.lock)
            this.lock = inp.lock;
        if (inp && inp.visible)
            this.visible = inp.visible;
        if (inp && inp.align)
            this.align = inp.align;
        if (inp && inp.direction)
            this.direction = inp.direction;
        if (inp && inp.numericShape)
            this.numericShape = inp.numericShape;
        if (inp && inp.language)
            this.language = inp.language;
        if (inp && inp.font)
            this.font = new fontModel().deserialize(inp.font);

        return this;
    }
}