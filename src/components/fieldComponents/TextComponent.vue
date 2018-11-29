<template>
    <div>
        <label class="control-label">{{questionValue.questionModel.title}}</label>
        <input class="form-control" v-model="questionValue.value" ref="el"/>
    </div>
</template>

<script>
    export default {
        props:["questionValue"],
        name: "TextComponent",
        mounted(){
            this.questionValue.focus = (function(){
                console.log(this.$refs.el)
                this.$refs.el.focus();
            }).bind(this);
        }
    }
</script>

<style scoped>

</style>