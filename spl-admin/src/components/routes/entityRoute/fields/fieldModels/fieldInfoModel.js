import {fontModel} from "./fontModel";
import {listInfoModel} from "./listInfoModel";
import {textFieldInfoModel} from "./textFieldInfoModel";

export class fieldInfoModel {
    constructor() {
        this._fieldType = null;
        this.font = new fontModel();
        this.tabStop = true;
        this.lock = false;
        this.visible = true;
        this.align = "right";
        this.direction = "rtl";
        this.numericShape = "farsi";
        this.language = "farsi";
        this.custom = null;
    }
    get fieldType(){
        return this._fieldType;
    }
    set fieldType(v){
        if(v === 'list')
            this.custom = new listInfoModel();
        else if(v === 'text')
            this.custom = new textFieldInfoModel();
        this._fieldType = v;
    }
    deserialize(inp) {
        if (inp && inp._fieldType)
            this.fieldType = inp._fieldType;
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
        if (inp && inp.custom)
            this.custom.deserialize(inp.custom);
        return this;
    }
}