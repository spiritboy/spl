<template>
    <div  style="text-align: center">
        <h1>فرایند تریاژ</h1>
        <FlowEditor v-if="category != null" v-bind:group="category.groups[0]" :category="category"/>
    </div>
</template>

<script>
    import FlowEditor from './FlowEditor.vue'
    import {spl} from "../../../api/spl";
    import QuestionSelectorComponent from "./QuestionSelectorComponent";
    import ExpansionPanelComponent from "./ExpansionPanelComponent";
    let data = {category: null};

    export default {
        name: 'flowRoute',
        components: {
            ExpansionPanelComponent,
            QuestionSelectorComponent,
            FlowEditor
        },
        data() {
            return data;
        },
        created() {
            spl.menu(123).then(function (response) {
                data.category = response.data.menu.categories[1];
            });
        }
    }
</script>

<style scoped>

</style>