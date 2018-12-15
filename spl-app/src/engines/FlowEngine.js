import {CommandModel} from "../models/CommandModel";

export class FlowEngine {
    constructor(parentGroup) {
        this.steps = null;
        this.parentGroup = parentGroup;
    }

    /**
     * determines the next step.
     * @param stepId the current step id (step.id). -1 as the starting point
     * @return {stepId, questions, commands}
     */
    process(stepId) {
        let targetStep = null;
        let commands = [];
        //if step id is -1, it is the starting point, return first step
        if (stepId === -1)
            targetStep = this.steps[0];
        else
            for (let stepIndex = 0; stepIndex < this.steps.length; stepIndex++) {
                //1-find step id
                if (stepId === parseInt(this.steps[stepIndex].id) && stepIndex !== this.steps.length - 1) {
                    //2-then execute its commands based on matched conditions.
                    commands = this.processStep(this.steps[stepIndex]);
                    let gotoCommand = commands.filter(cmd => cmd.name === 'GotoStep');
                    let finishCommand = commands.filter(cmd => cmd.name === 'Finish');
                    if (gotoCommand != null && gotoCommand.length > 0) {
                        //if there is goto command, find the destination step
                        targetStep = this.steps.filter(s => {
                            return s.id.toString() === gotoCommand[0].value.toString();
                        })[0];
                        console.log('gotostep: ', targetStep.id)
                    }
                    else if (finishCommand != null && finishCommand.length > 0) {
                        //if there is a finish command, just don't go to any step(target is null)
                        targetStep = null;
                        console.log('finished')
                    }
                    else
                    //if there is no goto or finish, then move on to the next step if available
                        targetStep = stepIndex < this.steps.length - 1 ? this.steps[stepIndex + 1] : null;
                }
            }
        //questions of the next step
        let questions = [];
        //id of the next step, -2 means finished (or no step is available - when target is null)
        let targetStepId = -2;
        if (targetStep != null) {
            //just set the targetStepId and fetch the destination questions
            targetStepId = parseInt(targetStep.id);
            for (let q of this.getQuestionsOfStep(targetStep)) {
                questions.push(q);
            }
        }
        //execute the command list (SetValue, Message , ...)
        CommandModel.execute(commands, this.parentGroup.parentCategory, this.parentGroup, null);

        //output the user what to do
        let res = {stepId: targetStepId, questions: questions, commands: commands};
        return res;
    }

    /**
     * inspect each condition group and returns its command list if the conditions matched
     * @param step
     * @returns {Array} of CommandModel
     */
    processStep(step) {
        let commands = [];
        for (let condGroup of step.conditionGroups) {
            if (this.processConditions(condGroup.conditions, condGroup.logic)) {
                //condition matched ... executing commands
                for (let cmd of condGroup.commands)
                    commands.push(new CommandModel(
                        cmd.name,
                        cmd.question != null ? cmd.question.id : null,
                        cmd.question != null ? cmd.question.groupId : null,
                        cmd.value));
                if (cmd.name === 'GotoStep' || cmd.name === 'Finish')
                //just do not continue, ...
                    break;
            }
        }
        return commands;
    }

    /**
     * evaluate conditions boolean, based on the logic provided
     * @param conditions
     * @param logic
     * @returns {boolean}
     */
    processConditions(conditions, logic) {
        let conditionResults = [];//sth like [true,false,true,false]
        for (let cond of conditions) {
            let qv = this.parentGroup.parentCategory.findQuestionValue(cond.question.groupId, cond.question.id);
            let value = cond.value;
            let condResult = false;
            if (cond.operator === 'eq')
                condResult = qv.value.toString() === value.toString();
            else if (cond.operator === 'neq')
                condResult = qv.value.toString() !== value.toString();
            else if (cond.operator === 'gt')
                condResult = parseFloat(qv.value) > parseFloat(value);
            else if (cond.operator === 'lt')
                condResult = parseFloat(qv.value) < parseFloat(value);
            conditionResults.push(condResult);
        }
        let result = false;
        if (logic == null) {
            for (let c of conditionResults)
                result = c || result;
        }
        else {
            let str = '';
            for (let expression of logic) {
                if ([')', '(', '&&', '||'].indexOf(expression.value) >= 0)
                    str += expression.value;
                else {
                    str += conditionResults[parseInt(expression.value) - 1].toString();
                }
            }
            result = eval(str);
        }
        return result;
    }

    clearNextSteps(stepId) {
        let shouldClear = false;
        for (let stepIndex = 0; stepIndex < this.steps.length; stepIndex++) {
            //1-find step id
            if (stepId === parseInt(this.steps[stepIndex].id) && stepIndex !== this.steps.length - 1) {
                shouldClear = true;
            }
            else if (shouldClear === true) {
                this.clearSingleStep(this.steps[stepIndex]);
            }
        }
    }

    clearSingleStep(step) {
        for (let qv of this.getQuestionsOfStep(step)) {
            qv.clearValue();
        }
    }

    getQuestionsOfStep(step) {
        let questions = [];
        for (let q of step.questions) {
            let found = this.parentGroup.groupValues[0].questionValues.filter(_q => parseInt(_q.questionModel.id) === parseInt(q.id));
            if (found.length > 0)
                questions.push(found[0]);
        }
        return questions;
    }

    gotoStepByQuestion(qid) {
        let targetStep = null;
        for (let stepIndex = 0; stepIndex < this.steps.length; stepIndex++) {
            //1-find step id
            if (this.steps[stepIndex].questions.filter(q => q.id.toString() === qid.toString()).length > 0)
                targetStep = this.steps[stepIndex];
        }
        let questions = [];
        //id of the next step, -2 means finished (or no step is available - when target is null)
        let targetStepId = -2;
        if (targetStep != null) {
            //just set the targetStepId and fetch the destination questions
            targetStepId = parseInt(targetStep.id);
            for (let q of this.getQuestionsOfStep(targetStep)) {
                questions.push(q);
            }
        }
        //output the user what to do
        let res = {stepId: targetStepId, questions: questions, commands: []};
        return res;
    }

    deserialize(inp) {
        if (inp != null)
            this.steps = inp;
        return this;
    }
}