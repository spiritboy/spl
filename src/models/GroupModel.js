import {QuestionModel} from "@/models/QuestionModel";
import {GroupValue} from "@/models/GroupValue";
import {GroupInfoModel} from "@/models/GroupInfoModel";

export class GroupModel {
    constructor() {
        this.title = '';
        this.groupInfo = null;//GroupInfoModel
        this.questions = [];//Question[]
        this.groupValues = [];//GroupValue[]
    }

    init() {
        if (this.groupInfo.type === 'form') {
            let groupValue = new GroupValue(this);
            this.groupValues.push(groupValue)
        }
    }

    deserialize(input) {
        if (input == null)
            return null;
        this.title = input.title;
        this.groupInfo = new GroupInfoModel().deserialize(input.groupInfo);
        for (let q of input.questions)
            this.questions.push(new QuestionModel().deserialize(q));
        return this;
    }
}