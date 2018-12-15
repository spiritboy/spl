export class CommandModel {
    constructor(name, questionId, groupId, value, rowId) {
        this.name = name;
        this.rowId = rowId;
        this.value = value;
        this.questionId = questionId;
        this.groupId = groupId;
    }

    static execute(commands, category, group, question) {
        for (let cmd of commands) {
            //getting the group id for the command
            let gid = null;
            if (cmd.groupId != null)
                gid = cmd.groupId;
            else if (group != null)
                gid = group.id;
            else if (question != null)
                gid = question.parentGroup.id;

            if (cmd.name.toLowerCase() === 'setvalue') {
                let targetQuestionValue = category.findQuestionValue(gid, cmd.questionId, cmd.rowId == null ? 0 : cmd.rowId);
                targetQuestionValue.value = cmd.value;
            }
            else if (cmd.name.toLowerCase() === 'message') {
                alert(cmd.value);
            }
        }
    }
}