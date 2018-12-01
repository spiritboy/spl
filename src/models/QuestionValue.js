import {EventEmitter} from "@/models/helper/EventEmitter";

export class QuestionValue {
    constructor(questionModel) {
        this.value = '';
        this.oldValue = '';
        this.questionModel = questionModel;//QuestionModel
        this.events = new EventEmitter();
    }
}