<template>
    <div>
        <label class="control-label">{{questionValue.questionModel.title}}</label>
        <sup v-if="validationResults.length > 0"
             :title="validationResults.map(v=>v.message).join(' - ')"
             class="fa fa-star validation-error"></sup>
        <input class="form-control" v-model="questionValue.value" ref="el"/>
    </div>
</template>

<script>
    import BaseFieldInfoComponent from "@/components/fieldComponents/BaseFieldInfoComponent"
    export default {
        name: "TextComponent",
        extends:BaseFieldInfoComponent
    }
</script>

<style scoped>

</style>