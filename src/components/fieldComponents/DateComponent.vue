<template>
    <div>
        <label class="control-label">{{questionValue.questionModel.title}}</label>
        <input class="form-control" type="date" v-model="questionValue.value"/>
    </div>
</template>

<script>
    export default {
        props:["questionValue"],
        name: "DateComponent"
    }
</script>

<style scoped>

</style>