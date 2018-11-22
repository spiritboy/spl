<template>
    <div>
        <label class="control-label">{{questionValue.questionModel.title}}</label>
        <select class="form-control" v-model="questionValue.value">
            <option v-for="option in options"
                    :value="option.id">{{option.name}}</option>
        </select>
    </div>
</template>

<script>
    export default {
        props:["questionValue"],
        name: "SelectComponent",
        computed:{
            options:function(){
                return this.questionValue.questionModel.fieldInfo.source.getSources()
            }
        }
    }
</script>

<style scoped>

</style>