<template>
    <div>
        <label class="control-label">{{questionValue.questionModel.title}}</label>
        <input class="form-control" v-model="questionValue.value" ref="el"/>
    </div>
</template>

<script>
    import _BaseComponent from "@/components/fieldComponents/_BaseComponent"
    export default {
        name: "TextComponent",
        extends:_BaseComponent
    }
</script>

<style scoped>

</style>