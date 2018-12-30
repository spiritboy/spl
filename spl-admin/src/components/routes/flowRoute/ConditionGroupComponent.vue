<template>
    <div class="condition-group">
        <h4>مجموعه شرط {{index + 1}} </h4>
        <a @click="removeConditionGroup" class="btn-remove"><i class="fa fa-times"></i></a>
        <ExpansionPanelComponent ref="conditionExpansion">
            <template slot="header">
                <div class="row" style="padding: 0px;margin: 0px;position: relative;">
                    <div class="col-sm-2" style="padding: 0px;margin: 0px">
                        <span>شروط</span>
                    </div>
                    <div class="col-sm-10" v-if="briefConditions">
                        <span class="badge badge-info badge-condition" v-for="item in briefConditions"
                              style="margin: 1px">{{item}} </span>
                    </div>
                </div>
                <a @click.stop='editConditionExpressionClicked'
                   style="color:blue;position:absolute;left:5px;top:10px"><i class="fa fa-code"></i></a>

            </template>
            <template slot="body">
                <br>
                <ConditionComponent v-for="(condition,i) in conditionGroup.conditions"
                                    :condition="condition"
                                    :category="category"
                                    :index="i"
                                    v-on:remove-condition="removeCondition"
                />
                <a @click="addCondition" class="btn-add">
                    +
                    <small>شرط</small>
                </a>
            </template>
        </ExpansionPanelComponent>
        <hr>
        <ExpansionPanelComponent ref="commandExpansion">

            <draggable v-model="conditionGroup.commands" class="draggable"
                       :options="{group:{name:'commands'}}">
                <CommandComponent v-for="(command,i) in conditionGroup.commands"
                                  :command="command"
                                  :index="i"
                                  :category="category"
                                  v-on:remove-command="removeCommand"
                />
            </draggable>
            <template slot="header" style="padding: 0px;margin: 0px">
                <div class="row" style="padding: 0px;margin: 0px;position: relative;">
                    <div class="col-sm-2" style="padding: 0px;margin: 0px">
                        <span>دستورات</span>
                    </div>
                    <div class="col-sm-10" v-if="briefCommands">
                        <span class="badge badge-info badge-condition"
                              :class="{'badge-danger':item.cmd.name === 'Finish','badge-warning':item.cmd.name === 'GotoStep'}"
                              v-for="item in briefCommands"
                              style="margin: 1px">{{item.display}} </span>
                    </div>
                </div>
            </template>
            <template slot="body">
                <br>
                <CommandComponent v-for="(command,i) in conditionGroup.commands"
                                  :command="command"
                                  :category="category"
                                  :index="i"
                                  v-on:remove-command="removeCommand"
                />
                <a @click="addCommand" class="btn-add">
                    +
                    <small>دستور</small>
                </a>
            </template>
        </ExpansionPanelComponent>

        <QuestionSelectorComponent v-if="category!=null"
                                   :_category="category"
                                   ref="questionSelector"
                                   @onOk="questionSelectorOk"
                                   :is-multiple="true"
                                   :id-prefix="conditionGroup.conditions.length"
        />


        <div class="modal fade" tabindex="-1" role="dialog" aria-hidden="true" ref="modal">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-body">
                        <div style="text-align:left">
                            <button type="button" class="btn btn-primary" @click="popUpOkClicked"
                                    :disabled="!isOrderValid()"><i
                                    class="fa fa-check"></i></button>
                            <button type="button" class="btn btn-secondary" data-dismiss="modal"><i
                                    class="fa fa-times"></i>
                            </button>

                        </div>

                        <div class="row" style="direction: ltr;text-align: left">
                            <div class="col-md-3">
                                <draggable v-model="briefOrders" class="draggable"
                                           style="border:1px solid lightgray;padding: 3px;"
                                           :options="{group:{name:'operands',  pull:'clone', put:false}}">
                                    <div v-for="(condition,i) in briefOrders">
                                        <span style="cursor: pointer;"
                                              :class="{'badge badge-info':condition.type === 'operator','badge badge-warning':condition.type !== 'operator'}">{{condition.text}}</span>
                                    </div>
                                </draggable>
                            </div>
                            <div class="col-md-9" style="border:1px solid lightgray;padding: 3px;">
                                <draggable v-model="conditionOrder" class="draggable"
                                           :options="{group:{name:'operands' }}" style="height: 100px">
                                    <span v-for="(order,i) in conditionOrder" v-model="conditionOrder[i]"
                                          class="select-order">
                                        {{order.text}}
                                </span>
                                </draggable>
                                <a @click.prevent="removeLastOrder" class="btn btn-warning"><i
                                        class="fa fa-arrow-left"></i></a>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>


    </div>

</template>

<script>
    import draggable from 'vuedraggable'
    import ConditionComponent from "./ConditionComponent";
    import CommandComponent from "./CommandComponent";
    import QuestionSelectorComponent from "./QuestionSelectorComponent";
    import Collapse from 'vue-collapse'
    import ExpansionPanelComponent from "./ExpansionPanelComponent";

    export default {
        components: {
            ExpansionPanelComponent,
            CommandComponent,
            ConditionComponent,
            QuestionSelectorComponent,
            Collapse,
            draggable
        },
        computed: {
            briefConditions: function () {
                let bCond = [];
                for (let condition of this.conditionGroup.conditions) {
                    bCond.push(condition.question.title + ' ' + this.getConditionName(condition) + ' ' + condition.value);
                }
                return bCond;
            },
            briefOrders: function () {
                let briefOrders = this.briefConditions.map((cond, i) => {
                    return {value: i + 1, text: cond}
                });
                briefOrders.push({value: '(', text: '(', type: 'operator'});
                briefOrders.push({value: ')', text: ')', type: 'operator'});
                briefOrders.push({value: '&&', text: '&&', type: 'operator'});
                briefOrders.push({value: '||', text: '||', type: 'operator'});
                return briefOrders;
            },
            briefCommands: function () {
                let bCmd = [];
                for (let cmd of this.conditionGroup.commands) {
                    bCmd.push({
                        display:
                            this.getCommandSentence(cmd),
                        cmd: cmd
                    });
                }
                return bCmd;
            }
        },
        name: "ConditionGroupComponent",
        props: ["conditionGroup", "category", "index"],
        data() {
            return {
                conditionOrder: []
            }
        },
        methods: {
            removeLastOrder() {
                this.conditionOrder.pop();
            },
            isOrderValid() {
                let command = '';
                let conditionIndices = this.conditionGroup.conditions.map((x, i) => i + 1);
                command = this.conditionOrder.map(x => conditionIndices.indexOf(x.value) >= 0 ? "true" : x.value).join('');
                try {
                    return eval(command);
                }
                catch {
                    return false;
                }

            },
            popUpOkClicked() {
                this.isOrderValid();
                let conditionIndices = this.conditionGroup.conditions.map((x, i) => i + 1);
                this.conditionGroup.logic = this.conditionOrder;
                console.log(this.conditionGroup.logic);
                $(this.$refs.modal).modal('hide');
            },
            addCondition() {
                this.$refs.questionSelector.selectedQuestions = [];
                this.$refs.questionSelector.show();
            },
            addCommand() {
                this.conditionGroup.commands.push({
                    name: null,
                    question: null,
                    value: null
                });
                this.$refs.commandExpansion.contentUpdated();

            },
            removeConditionGroup() {
                this.$emit('remove', this.conditionGroup);
                this.$refs.commandExpansion.contentUpdated();

            },
            removeCondition(condition) {
                this.conditionGroup.conditions.splice(this.conditionGroup.conditions.indexOf(condition), 1);
                this.$refs.conditionExpansion.contentUpdated();
            },
            removeCommand(command) {
                this.conditionGroup.commands.splice(this.conditionGroup.commands.indexOf(command), 1);
                this.$refs.commandExpansion.contentUpdated();
            },
            questionSelectorOk(selectedQuestions) {
                for (let q of selectedQuestions) {
                    this.conditionGroup.conditions.push({
                        question: q,
                        operator: '=',
                        value: null
                    });
                }
                this.$refs.conditionExpansion.contentUpdated();

            },
            editConditionExpressionClicked() {
                if (this.conditionGroup.logic != null && this.conditionGroup.logic.length > 0) {
                    this.conditionOrder = this.conditionGroup.logic;
                }
                else {
                    let temp = this.briefConditions.map((cond, i) => {
                        return {value: i + 1, text: cond}
                    });
                    for (let cond of temp) {
                        this.conditionOrder.push(cond);
                        this.conditionOrder.push({text: '||', value: '||'});
                    }
                    this.conditionOrder.pop();

                }
                $(this.$refs.modal).modal('show');
            },
            getCommandName(cmd) {
                switch (cmd.name) {
                    case "SetValue":
                        return '=';
                    case "GotoStep":
                        return 'برو به مرحله';
                    case "Clear":
                        return 'حذف';
                    case "Finish":
                        return 'پایان';
                    case "Message":
                        return 'پیام';
                    default:
                        return '';
                }
            },
            getCommandSentence(cmd) {
                let display = '';
                let questionName = cmd.question != null ? cmd.question.title : '';
                let commandName = this.getCommandName(cmd);
                let step = cmd.value != null && cmd.name === 'GotoStep' ? global.findStep(cmd.value) : null;
                let stepName = step != null ? step.title : '';
                switch (cmd.name) {
                    case "SetValue":
                        return questionName + ' = ' + cmd.value;
                    case "GotoStep":
                        return commandName + ' ' + stepName;
                    case "Clear":
                        return commandName + ' ' + questionName;
                    case "Finish":
                        return commandName;
                    case "Message":
                        return commandName + ' ' + cmd.value;
                    default:
                        return '';
                }
            },
            getConditionName(cond) {
                switch (cond.operator) {
                    case "eq":
                        return 'مساوی';
                    case "neq":
                        return 'مخالف';
                    case "lt":
                        return 'کوچکتر';
                    case "gt":
                        return 'بزرگتر';
                    default:
                        return '';
                }
            }
        }
    }
</script>

<style scoped>
    .modal-btn {
        margin: 2px;
    }

    .modal-btn:hover {
        background-color: indianred;
    }

    .select-order {
        border: 0px;
        border-bottom: 1px solid lightgray;
        margin: 2px;
        -webkit-appearance: none;
        -moz-appearance: none;
        text-indent: 1px;
        text-overflow: '';
        padding: 2px 8px;
        background-color: lightgray;
    }

    select::-ms-expand {
        display: none;
    }

    .condition-group {
        border: 1px solid lightgray;
        padding: 10px;
        margin-bottom: 20px;
        box-shadow: 5px 5px 8px #888888;
        position: relative;
    }

    .btn-remove {
        display: none;
        position: absolute;
        left: 20px;
        top: 10px;
        color: darkred;
    }

    .condition-group:hover .btn-remove {
        display: block;
    }

    small {
        font-size: 13px;
    }

    .badge-condition {
        padding-right: 1px;
        padding-left: 1px;
    }
</style>