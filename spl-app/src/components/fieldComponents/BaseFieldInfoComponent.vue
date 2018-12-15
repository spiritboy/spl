<template>
</template>

<script>
    export default {
        name: "BaseFieldInfoComponent",
        props: ["questionValue"],
        methods: {
            doFocus() {
                this.$refs.el.focus();
            },
            doValueChange() {
                this.$emit('valueChange',this.questionValue)
            }
        },
        watch: {
            // whenever question value changes, this function will run
            questionValue: {
                immediate: true,
                handler: function (newQuestionValue, oldQuestionValue) {
                    if (newQuestionValue) {
                        newQuestionValue.events.addListener('focus', this.doFocus);
                        newQuestionValue.events.addListener('valueChange', this.doValueChange);
                    }
                    if (oldQuestionValue) {
                        oldQuestionValue.events.removeListener('focus', this.doFocus)
                        oldQuestionValue.events.removeListener('valueChange', this.valueChange)
                    }
                }
            }
        },
        computed:{
            validationResults(){
                return this.questionValue.validationResults;
            }
        }
    }
</script>

<style scoped>

</style>