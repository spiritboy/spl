<template>
    <div class="container full-width-container" style="margin-top: 10px;">
        <class-component></class-component>
    </div>
</template>

<script>
    import ClassComponent from "./components/classComponent";
    import Select2 from "../../shared/Select2";

    export default {
        name: "classRoute",
        components: {Select2, ClassComponent}
    }
</script>

<style scoped>

</style>