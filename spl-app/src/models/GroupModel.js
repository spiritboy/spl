import {QuestionModel} from "@/models/QuestionModel";
import {GroupValue} from "@/models/GroupValue";
import {GroupInfoModel} from "@/models/GroupInfoModel";
import {FlowEngine} from "../engines/FlowEngine";

export class GroupModel {
    constructor(parentCategory) {
        this.parentCategory = parentCategory;
        this.id = '';
        this.title = '';
        this.flowEngine = null;
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
        this.id = input.id;
        this.title = input.title;
        this.flowEngine = input.flow == null ? null : new FlowEngine(this).deserialize(input.flow);
        this.groupInfo = new GroupInfoModel().deserialize(input.groupInfo);
        for (let q of input.questions)
            this.questions.push(new QuestionModel(this).deserialize(q));
        return this;
    }
}