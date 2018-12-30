<template>
    <div class="row container">
        <div class="col-md-2 question-list" v-if="group!=null">

        </div>

        <div class="col-md-10">
            <draggable v-model="steps"
                       :options="{group:{name:'steps'}}">
                <StepComponent v-for="(step,i) in steps" v-bind:index="i" v-bind:step="step"
                               :category="category"></StepComponent>
            </draggable>
            <button @click="addStep">Add Step</button>
        </div>
        <button @click="save">save</button>
        <button @click="load">load</button>
    </div>
</template>

<script>
    import draggable from 'vuedraggable'

    import StepComponent from "./StepComponent";
    import {spl} from "../../../api/spl";

    global.data = {
        steps: [],
        selectedQuestions: [],
        searchText: ''
    };
    global.findStep = function (id) {
        return global.data.steps.filter(s => s.id === id)[0];
    };
    export default {
        name: 'FlowEditor',
        components: {StepComponent, draggable},
        props: ["group", "category"],
        data() {
            return global.data;
        },
        methods: {
            save() {
                spl.postFlow(this.steps);
            },
            load() {
                spl.getFlow(this.category, d => {
                    this.steps = d.data;
                });
            },
            addStep() {
                this.steps.push({
                    questions: [],
                    conditionGroups: [],
                    title: this.steps.length + 1,
                    id: this.getUniqueStepId()
                });
            },
            getUniqueStepId() {
                let id = 0;

                for (let step of this.steps) {
                    if (step.id && step.id > id) {
                        id = step.id;
                    }
                }
                return id + 1;
            }

        },
        computed: {
            filteredQuestions() {
                return this.group.questions.filter((q) => {
                    return this.searchText === '' || q.title.indexOf(this.searchText) >= 0;
                });
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .question-list .question-item {
        cursor: pointer;
    }
</style>
