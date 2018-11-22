<template>
    <div>
        <label class="control-label">{{questionValue.questionModel.title}}</label>
        <input class="form-control" v-model="questionValue.value"/>
    </div>
</template>

<script>
    export default {
        props:["questionValue"],
        name: "TextComponent"
    }
</script>

<style scoped>

</style>