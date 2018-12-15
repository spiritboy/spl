<template>
    <div v-if="groupValue!=null" class="flow">
        <h2>{{groupValue.groupModel.title}}</h2>
        <div class="metro">
            <div class="item" v-for="qv in groupValue.questionValues.filter(d=>!d.isEmpty())"
                 :class="{'active':questionValues.indexOf(qv)>=0}"
                 @click="goToStepByQuestion(qv.questionModel.id)">
                <div class="title">{{qv.questionModel.title}}</div>
                <div class="value">{{qv.viewValue}}</div>
            </div>
        </div>
        <hr>
        <form class="" v-if="stepId >= 0">
            <div class="row">
                <div class="form-group col-sm-6" v-if="groupValue.groupModel!=null"
                     v-bind:key="groupValue.id" v-for="qv in questionValues">
                    <TextComponent v-if="qv.questionModel.fieldInfo.name === 'text'" v-bind:question-value="qv"
                                   :key="getKey(qv.questionModel)"/>
                    <DateComponent v-else-if="qv.questionModel.fieldInfo.name === 'date'" v-bind:question-value="qv"
                                   :key="getKey(qv.questionModel)"/>
                    <SelectComponent v-else-if="qv.questionModel.fieldInfo.name === 'select'"
                                     v-bind:question-value="qv" :key="getKey(qv.questionModel)"
                                     @valueChange="valueChange"
                                     :isRadio="true"/>
                </div>
            </div>
            <div class="form-row">
                <button class="btn btn-primary" v-on:click.prevent.stop="nextStep()">بعدی</button>
            </div>
        </form>
        <div v-else style="position: relative">
            <div class="jumbotron">
                <h1><i style="font-size: smaller" class="fa fa-cogs"></i> پایان </h1>
                <a href="#" @click="startOver" style="position: absolute;left:10px; bottom:0"><i class="fa fa-sync"></i></a>
                <hr/>
                <GroupViewComponent :hide-empty-questions="true" :group-value="groupValue"/>
            </div>
        </div>
    </div>
</template>

<script>
    import TextComponent from "@/components/fieldComponents/TextComponent";
    import DateComponent from "@/components/fieldComponents/DateComponent";
    import SelectComponent from "@/components/fieldComponents/SelectComponent";
    import GroupViewComponent from "./view/GroupViewComponent";

    export default {
        components: {GroupViewComponent, SelectComponent, DateComponent, TextComponent},
        props: ['groupValue'],
        name: "GroupFlowComponent",
        data() {
            return {
                stepId: -1,
                questionValues: []
            }
        },
        mounted() {
            this.nextStep();
        },
        methods: {
            save() {
                for (let q of this.groupValue.questionValues) {
                    console.log(q.value);
                }
            },
            getKey(question) {
                return question.parentGroup.parentCategory.id +
                    question.parentGroup.id +
                    question.id;
            },
            nextStep() {
                let flowResult = this.groupValue.groupModel.flowEngine.process(this.stepId);
                this.stepId = flowResult.stepId;
                this.questionValues = flowResult.questions;
                if (flowResult.questions.length === 0) {
                    this.$emit('finished');
                }
            },
            startOver() {
                this.stepId = -1;
                this.nextStep();
            },
            valueChange(qv) {
                this.groupValue.groupModel.flowEngine.clearNextSteps(this.stepId);
                this.nextStep()
            },
            goToStepByQuestion(qid){
                let flowResult = this.groupValue.groupModel.flowEngine.gotoStepByQuestion(qid);
                this.stepId = flowResult.stepId;
                this.questionValues = flowResult.questions;
            }
        },
        computed: {}
    }
</script>

<style scoped>
    .flow{
        min-height: 400px;
    }
    .flow .metro {
        margin-bottom: -15px;
        margin-top: 20px;
        min-height: 55px;
    }

    .flow .metro .item {
        padding: 5px 5px 0px 10px;
        background-color: #e8e8e8;
        display: inline-block;
        margin-left: -1px;
        border-radius: 25px 0 0 0;
        box-shadow: 0px 0px 5px #989898;
    }

    .flow .metro .item.active {
        color: #0074ff;
        font-weight: bold;
    }

    .flow .metro .title {
        font-family: "B Yekan";
        font-size: 11px;
        border-bottom: 1px solid lightgray;
        min-width: 60px;
    }

    .flow .metro div.value {
        height: 30px;
    }
</style>
