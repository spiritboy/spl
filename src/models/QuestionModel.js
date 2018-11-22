import {FieldInfoModel} from "@/models/FieldInfo/FieldInfoModel";
import {DelegateModel} from "@/models/DelegateModel";
import {TextFieldInfoModel} from "@/models/FieldInfo/TextFieldInfoModel";
import {SelectFieldInfoModel} from "@/models/FieldInfo/SelectFieldInfoModel";
import {DateFieldInfoModel} from "@/models/FieldInfo/DateFieldInfoModel";

export class QuestionModel {
    constructor() {
        this.title = '';
        this.fieldInfo = null;//FieldInfoModel
        this.validation = null;//DelegateModel
        this.exitted = null;//DelegateModel
        this.exitting = null;//DelegateModel
        this.entered = null;//DelegateModel
        this.entering = null;//DelegateModel
        this.changed = null;//DelegateModel
        this.changing = null;//DelegateModel
    }
    deserialize(input){
        this.title = input.title;
        if(input.fieldInfo.name === 'text')
            this.fieldInfo = new TextFieldInfoModel().deserialize(input.fieldInfo);
        else if(input.fieldInfo.name === 'date')
            this.fieldInfo = new DateFieldInfoModel().deserialize(input.fieldInfo);
        else if(input.fieldInfo.name === 'select')
            this.fieldInfo = new SelectFieldInfoModel().deserialize(input.fieldInfo);
        this.validation = new DelegateModel().deserialize(input.validation);
        this.exitted = new DelegateModel().deserialize(input.exitted);
        this.exitting = new DelegateModel().deserialize(input.exitting);
        this.entered = new DelegateModel().deserialize(input.entered);
        this.entering = new DelegateModel().deserialize(input.entering);
        this.changed = new DelegateModel().deserialize(input.changed);
        this.changing = new DelegateModel().deserialize(input.changing);
        return this;
    }
}