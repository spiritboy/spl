<template>
    <div class="container">
        <variable-edit-component ref="variableEdit"></variable-edit-component>
    </div>
</template>

<script>
    import VariableEditComponent from "./components/variableEditComponent";
    export default {
        name: "algorithmRoute",
        components: {VariableEditComponent},
        methods:{
            onEditVariable(){
                this.$refs.variableEdit.show();
            }
        }
    }
</script>

<style scoped>

</style>