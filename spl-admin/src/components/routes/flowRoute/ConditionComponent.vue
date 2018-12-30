<template>
    <div>
        <form class="condition inline-form">
            <div class="form-row">
                <span class="badge badge-info">{{index+1}}</span>
                <div v-if="category!=null" class="form-group col-md-4">
                    <input readonly class="form-control" :value="condition.question!=null?condition.question.title:''"
                           @click="openQuestionSelector">
                </div>
                <div class="form-group col-md-3">
                    <select class="form-control" v-model="condition.operator">
                        <option value="eq">مساوی</option>
                        <option value="neq">مخالف</option>
                        <option value="gt">بزرگ تر</option>
                        <option value="lt">کوچک تر</option>
                    </select>
                </div>
                <div class="form-group col-md-5">
                    <input v-if="condition.question.source == null" class="form-control" v-model="condition.value"/>
                    <select v-else class="form-control" v-model="condition.value">
                        <option v-for="sourceItem in source" :value="sourceItem.ID">{{sourceItem.Name}}</option>
                    </select>
                </div>
                <a @click="removeCondition" class="btn-remove"><i class="fa fa-times"></i></a>
                <a @click="expressionBuildClick" class="btn-edit"><i class="fa fa-edit"></i></a>
            </div>
        </form>

        <QuestionSelectorComponent v-if="category!=null"
                                   :_category="category"
                                   ref="questionSelector"
                                   @onOk="questionSelectorOk"
                                   :is-multiple="false"
                                   :id-prefix="index"
        ></QuestionSelectorComponent>

    </div>


</template>

<script>
    import QuestionSelectorComponent from "./QuestionSelectorComponent";
    import {spl} from "../../../api/spl";
    import ExpressionBuilderComponent from "./ExpressionBuilderComponent";

    export default {
        name: "ConditionComponent",
        components: {ExpressionBuilderComponent, QuestionSelectorComponent},
        props: ["condition", "index", "category"],
        data() {
            return {
                source: []
            }
        },
        methods: {
            openQuestionSelector() {
                this.$refs.questionSelector.show();
            },
            questionSelectorOk(selectedQuestions) {
                if (selectedQuestions != null) {
                    this.condition.question = selectedQuestions;
                }
            },
            removeCondition() {
                this.$emit('remove-condition', this.condition)
            },
            expressionBuildClick(){
                this.$refs.exporessionBuilder.show();
            }
        },
        watch: {
            "condition.question": {
                immediate: true,
                handler(newQ, oldQ) {
                    if (newQ != null) {
                        this.source = []
                        if (newQ.source != null && newQ.source.startsWith('js:')) {
                            //js
                            let script = "(function(){" + newQ.source.replace('js:', '') + "})()";
                            let array = eval(script);
                            this.source = array;
                        }
                        else if (newQ.source != null) {
                            //sp
                            let script = newQ.source;
                            script = spl.normalize(script,newQ.menuId,newQ.categoryId,newQ.groupId,newQ.id,6462,'fa');
                            let array = spl.exec(script).then((d) => {
                                this.source = d.data;
                            });
                        }

                    }

                }
            }
        }
    }
</script>

<style scoped>
    input, select {
        margin: 1px 5px;
    }
    .condition .form-group {
        margin-bottom: initial;
    }
    input {
        cursor: pointer;
    }

    .badge {
        position: absolute;
        right: 0px;
        top: 20%;

    }

    .btn-remove {
        position: absolute;
        display: none;
        left: 2px;
        top: 20%;
        color: darkred;
    }

    .condition {
        position: relative;
        padding: 0px 20px;
    }

    .condition:hover .btn-remove {
        display: block;
    }
</style>