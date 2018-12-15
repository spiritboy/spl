<template>
    <span :style="style">
        {{questionValue.viewValue}}
    </span>
</template>

<script>
    export default {
        name: "BaseFieldInfoViewComponent",
        props: ["questionValue"],
        computed: {
            style() {
                return this.questionValue.questionModel.fieldInfo.style.style;
            }
        }
    }
</script>

<style scoped>

</style>