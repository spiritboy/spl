import {EventEmitter} from "@/models/helper/EventEmitter";
import {QuestionValidationModel} from "./QuestionValidationModel";

export class QuestionValue {
    constructor(questionModel) {
        this._value = '';
        this.oldValue = '';
        this.questionModel = questionModel;//QuestionModel
        this.events = new EventEmitter();
        this.viewValue = '';
        this.validationModel = null;
    }

    get value() {
        return this._value;
    }

    set value(_val) {
        this._value = _val;

        //now update view value
        if (this.questionModel.fieldInfo.name === 'select')
            this.questionModel.fieldInfo.source.getById(_val, d => {
                this.viewValue = (d != null ? d.name : _val);
            });
        else
            this.viewValue = _val;


        //notify value change
        this.events.emit('valueChange')
    }
    clearValue(){
        this.value = '';
    }
    isEmpty() {
        return this.value == null || this.value === '';
    }

    get validationResults() {
        return this.questionModel.validation.validate(this);
    }

}