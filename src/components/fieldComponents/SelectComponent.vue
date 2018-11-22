<template>
    <div>
        <label class="control-label">{{questionValue.questionModel.title}}</label>
        <select class="form-control" v-model="questionValue.value">
            <option value="1">مقدار 1</option>
            <option value="2">مقدار 2</option>
        </select>
    </div>
</template>

<script>
    export default {
        props:["questionValue"],
        name: "SelectComponent"
    }
</script>

<style scoped>

</style>