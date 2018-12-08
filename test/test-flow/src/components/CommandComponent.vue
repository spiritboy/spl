<template>
    <form class="command inline-form">
        <div class="form-row">
            <span class="badge badge-info">{{index+1}}</span>
            <div class="form-group col-md-3">
                <select class="form-control" v-model="command.name" @change="command.question = command.value = null">
                    <option value="GotoStep">برو به</option>
                    <option value="SetValue">مقدار</option>
                    <option value="Finish">پایان</option>
                    <option value="Clear">حذف کن</option>
                </select>
            </div>
            <div v-if="['GotoStep','Finish'].indexOf(this.command.name)===-1" class="form-group col-md-4">
                <input readonly class="form-control" :value="command.question!=null?command.question.title:''"
                       @click="openQuestionSelector">
            </div>
            <div v-if="['Finish','GotoStep'].indexOf(this.command.name)===-1"  class="form-group col-md-5">
                <input class="form-control" v-model="command.value"/>
            </div>
            <div v-if="['GotoStep'].indexOf(this.command.name)===0"  class="form-group col-md-5" >
                <select class="form-control" v-model="command.value">
                    <option v-for="step in steps" :value="step.id">{{step.title}}</option>
                </select>
            </div>
            <a @click="removeCommand" class="btn-remove"><i class="fa fa-times"></i></a>
        </div>
        <QuestionSelectorComponent v-if="category!=null"
                                   :_category="category"
                                   ref="questionSelector"
                                   @onOk="questionSelectorOk"
                                   :is-multiple="false"
                                   :id-prefix="index"
        ></QuestionSelectorComponent>
    </form>
</template>

<script>
    import QuestionSelectorComponent from "./QuestionSelectorComponent";
    export default {
        name: "CommandComponent",
        components: {
            QuestionSelectorComponent
        },
        props: ["command", "index", "category"],
        data(){
            return{
                steps:global.data.steps
            }
        },
        methods: {
            removeCommand() {
                this.$emit('remove-command', this.command)
            },
            openQuestionSelector() {
                this.$refs.questionSelector.show();
            },
            questionSelectorOk(selectedQuestions) {
                if (selectedQuestions != null) {
                    this.command.question = selectedQuestions;
                }
            }
        },
        watch: {
            "command.question": {
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
        margin: 2px 5px;
    }
    .command .form-group {
        margin-bottom: initial;
    }
    .badge{
        position: absolute;
        right: 0px;
        top:18%;

    }
    .btn-remove {
        position: absolute;
        display: none;
        left: 2px;
        top: 25%;
        color: darkred;
    }

    .command {
        padding:0px 20px;
        position: relative;
    }

    .command:hover .btn-remove {
        display: block;
    }
</style>