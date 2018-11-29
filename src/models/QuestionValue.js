export class QuestionValue{
    constructor(questionModel){
        this.value = '';
        this.oldValue = '';
        this.questionModel = questionModel;//QuestionModel

        this.focus = null;
    }

}