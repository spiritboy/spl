import {QuestionValidationRule} from "./QuestionValidationRule";

export class QuestionValidationModel {
    constructor(parentQuestion) {
        this.validationRules = [];
        this.parentQuestion = parentQuestion;
    }

    validate(qv) {
        let falseValidations = [];
        for (let rule of this.validationRules) {
            let validation = rule.validate(qv);
            if(validation.valid === false){
                falseValidations.push(validation);
            }
        }
        return falseValidations;
    }

    isRequired() {
        return this.validationRules.some(v => v.name === 'required');
    }

    deserialize(inp) {
        if (inp == null || !Array.isArray(inp))
            return this;
        for (let _rule of inp)
            this.validationRules.push(new QuestionValidationRule().deserialize(_rule));
        return this;
    }
}