<template>
    <div id="app">
        <FlowEditor v-if="category != null" v-bind:group="category.groups[0]" :category="category"/>
    </div>
</template>

<script>
    import FlowEditor from './components/FlowEditor.vue'
    import {spl} from "./api/spl";
    import QuestionSelectorComponent from "./components/QuestionSelectorComponent";
    import ExpansionPanelComponent from "./components/ExpansionPanelComponent";
    let data = {category: null};
    spl.menu(123).then(function (response) {
        data.category = response.data.menu.categories[1];
    });
    export default {
        name: 'app',
        components: {
            ExpansionPanelComponent,
            QuestionSelectorComponent,
            FlowEditor
        },
        data() {
            return data;
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        margin-top: 60px;
    }
    *{
        font-family: "B Koodak";
    }


    .btn-add {
        margin: 15px;
        display: block;
        border: 1px solid #8691ff;
        text-align: center;
        background-color: transparent;
        color: #8691ff;
        opacity: .5;
        cursor: pointer;
        font-size: 25px;
        background-color: rgba(134, 145, 255, 0.21);
    }
    .btn-add:hover {
        opacity: 1;
    }
</style>
