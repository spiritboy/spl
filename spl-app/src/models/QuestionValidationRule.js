export class QuestionValidationRule {
    constructor() {
        this.name = '';
        this.script = '';
        this.url = '';
        this.message = '';
    }

    validate(qv) {
        if (this.script !== '')
            return this.validateScript(qv);
        else if (this.url !== '')
            return this.validateUrl(qv);
        else if (this.name === 'required') {
            return {valid: !qv.isEmpty(), message: this.message};
        }
        return {valid: true, message: ''};
    }

    validateScript(qv) {
        return {valid: true, message: ''};
    }

    validateUrl(qv) {
        return {valid: true, message: ''};
    }

    deserialize(inp) {
        if (inp == null) return this;
        this.script = inp.script != null ? inp.script : '';
        this.url = inp.url != null ? inp.url : '';
        this.name = inp.name != null ? inp.name : '';
        this.message = inp.message != null ? inp.message : 'خطای بوجود آمده را برطرف کنید';
        return this;
    }
}