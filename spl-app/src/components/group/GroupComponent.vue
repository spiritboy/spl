<template>
    <div v-if="groupValue!=null">
        <h2>{{groupValue.groupModel.title}}</h2>
        <hr/>
        <form>
            <div class="row">
                <div class="form-group col-sm-6" v-if="groupValue.groupModel!=null"
                     v-bind:key="groupValue.id" v-for="qv in groupValue.questionValues">
                    <TextComponent v-if="qv.questionModel.fieldInfo.name === 'text'" v-bind:question-value="qv"
                                   :key="getKey(qv.questionModel)"/>
                    <DateComponent v-else-if="qv.questionModel.fieldInfo.name === 'date'" v-bind:question-value="qv"
                                   :key="getKey(qv.questionModel)"/>
                    <SelectComponent v-else-if="qv.questionModel.fieldInfo.name === 'select'"
                                     v-bind:question-value="qv" :key="getKey(qv.questionModel)"/>
                </div>
            </div>
            <div class="form-row">
                <button class="btn btn-primary" v-on:click.prevent="nextStep()">بعدی</button>
            </div>
        </form>
    </div>
</template>

<script>
    import TextComponent from "@/components/fieldComponents/TextComponent";
    import DateComponent from "@/components/fieldComponents/DateComponent";
    import SelectComponent from "@/components/fieldComponents/SelectComponent";

    export default {
        components: {SelectComponent, DateComponent, TextComponent},
        props: ['groupValue'],
        name: "GroupComponent",
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
            }
        }
    }
</script>

<style scoped>

</style>
