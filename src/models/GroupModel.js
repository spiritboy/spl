import {QuestionModel} from "@/models/QuestionModel";
import {GroupValue} from "@/models/GroupValue";

export class GroupModel {
    constructor() {
        this.title = '';
        this.questions = [];//Question[]
        this.groupValues = [];//GroupValue[]
    }

    init() {
        let groupValue = new GroupValue(this);
        this.groupValues.push(groupValue)
    }


    deserialize(input) {
        if (input == null)
            return null;
        this.title = input.title;
        for (let q of input.questions)
            this.questions.push(new QuestionModel().deserialize(q));
        return this;
    }
}