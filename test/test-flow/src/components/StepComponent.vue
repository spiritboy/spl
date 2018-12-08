<template>
    <div style="margin-top: 10px">
        <ExpansionPanelComponent>
            <template slot="header">
                <div class="row">
                    <div class="col-md-8">
                        <h4>
                            مرحله
                            <input @click.stop class="step-title" v-model="step.title">
                        </h4>
                    </div>
                    <div class="col-md-2" itle="ورودی از ">
                        <span class="badge badge-primary enter" v-for="cmd in getEnterPaths">{{cmd}}</span>
                    </div>
                    <div class="col-md-2"  title="خروجی به">
                        <span class="badge badge-danger exit" v-for="cmd in getExitPaths">{{cmd}}</span>
                    </div>
                    <i v-if="isFinish" class="fa fa-circle finish" title="منجر به پایان"></i>
                    <i v-if="isFinish" class="fa fa-arrow-left finish-arrow"></i>
                </div>
            </template>
            <template slot="body">
                <div class="row step">
                    <div class="col-md-4">

                        <div style="min-height: 50px;">
                            <span>سوال ها:</span>
                            <draggable v-model="step.questions" class="draggable"
                                       :options="{group:{name:'people'}}">
                                <div v-for="(question,index) in step.questions" :key="index">{{question.title}}</div>
                            </draggable>
                            <a @click="addQuestion" class="btn-add">
                                +
                                <small>سوال</small>
                            </a>
                        </div>
                    </div>
                    <div class="col-md-8">
                        <div v-for="(conditionGroup,i) in step.conditionGroups">

                            <ConditionGroupComponent v-on:remove="removeConditionGroup"
                                                     :category="category"
                                                     :index="i"
                                                     :conditionGroup="conditionGroup"/>
                        </div>
                        <a class="btn-add" @click="addConditionGroup">+
                            <small>مجموعه شرط</small>
                        </a>
                    </div>
                </div>
            </template>
        </ExpansionPanelComponent>
        <QuestionSelectorComponent v-if="category!=null"
                                   :_category="category"
                                   ref="questionSelector"
                                   @onOk="questionSelectorOk"
                                   :is-multiple="true"
                                   :id-prefix="0"
        />
    </div>
</template>

<script>
    import draggable from 'vuedraggable'
    import ConditionComponent from "./ConditionComponent";
    import ConditionGroupComponent from "./ConditionGroupComponent";
    import ExpansionPanelComponent from "./ExpansionPanelComponent";
    import QuestionSelectorComponent from "./QuestionSelectorComponent";

    export default {
        name: "StepComponent",
        components: {
            ExpansionPanelComponent,
            ConditionGroupComponent,
            ConditionComponent,
            QuestionSelectorComponent,
            draggable
        },
        props: ["step", "index", "category"],
        methods: {
            addConditionGroup() {
                this.step.conditionGroups.push({
                    booleanExpression: '',
                    commands: [],
                    conditions: [],
                    logic: ''
                });
            },
            removeConditionGroup(conditionGroup) {
                this.step.conditionGroups.splice(this.step.conditionGroups.indexOf(conditionGroup), 1);
            },
            addQuestion() {
                this.$refs.questionSelector.selectedQuestions = this.step.questions;
                this.$refs.questionSelector.show();
            },
            questionSelectorOk(selectedQuestions) {
                this.step.questions = [];
                for (let q of selectedQuestions)
                    this.step.questions.push(q)
            }
        },
        computed: {
            getExitPaths() {
                let exitPaths = [];
                this.step.conditionGroups.forEach((cg) => cg.commands.forEach((c) => {
                    if (c.name === 'GotoStep') {
                        exitPaths.push(global.findStep(c.value).title);
                    }
                }));
                return exitPaths;
            },
            getEnterPaths() {
                let enterPaths = [];
                global.data.steps.forEach(step => {
                    step.conditionGroups.forEach(cg => cg.commands.forEach(c => {
                        if (c.name === 'GotoStep' && c.value === this.step.id) {
                            enterPaths.push(step.title);
                        }
                    }))
                });
                return enterPaths;
            },
            isFinish() {
                var finish = false;
                this.step.conditionGroups.forEach((cg) => cg.commands.forEach((c) => {
                    if (c.name === 'Finish') {
                        finish = true;
                    }
                }));
                return finish;
            }
        }
    }
</script>

<style scoped>
    .step {
        border: 1px solid lightgray;
        border-radius: 5px;
        padding: 10px;
        box-shadow: 5px 5px 8px #888888;
        margin-bottom: 15px;
    }

    .draggable {
        min-height: 50px;
        border: 1px dashed lightgray;
        padding: 5px;
    }

    small {
        font-size: 13px;
    }

    input.step-title {
        padding: 0 5px;
        border: 1px dashed gray;
        font-size: smaller;
        border-radius: 5px;
        min-width: 0;
        display: inline;
        background-color: rgba(218, 218, 223, 0.41);
    }

    i.finish {
        position: absolute;
        left: 10px;
        top: 30%;
        font-size: smaller;
        color: #995959;
    }
    i.finish-arrow {
        position: absolute;
        left: -8px;
        top: 25%;
        color: #995959;
        font-size:20px;
    }
    .badge.enter, .badge.exit{
        margin: 1px;
    }
</style>