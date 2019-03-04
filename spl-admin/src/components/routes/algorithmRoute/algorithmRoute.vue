<template>
    <div class="container">
        <variable-edit-component :variable="variable" ref="variableEdit"></variable-edit-component>
    </div>
</template>

<script>
    import VariableEditComponent from "./components/variableEditComponent";
    import {variableModel} from "./models/variableModel";
    export default {
        name: "algorithmRoute",
        components: {VariableEditComponent},
        data(){
            return {
                variable : new variableModel()
            }
        },
        methods:{
        }
    }
</script>

<style scoped>

</style>