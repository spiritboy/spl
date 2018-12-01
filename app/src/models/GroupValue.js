import {QuestionValue} from "@/models/QuestionValue";

export class GroupValue{
    constructor(groupModel){
        this.groupModel = groupModel;
        this.questionValues = []; //QuestionValue[]
        for(let q of groupModel.questions){
            let questionValue = new QuestionValue(q);
            this.questionValues.push(questionValue);
        }
    }
}