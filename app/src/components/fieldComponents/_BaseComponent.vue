<template>

</template>

<script>
    export default {
        name: "_BaseComponent",
        props: ["questionValue"],
        methods: {
            doFocus() {
                this.$refs.el.focus();
            }
        },
        watch: {
            // whenever question value changes, this function will run
            questionValue: {
                immediate: true,
                handler: function (newQuestionValue, oldQuestionValue) {
                    if (newQuestionValue)
                        newQuestionValue.events.addListener('focus', this.doFocus);
                    if (oldQuestionValue)
                        oldQuestionValue.events.removeListener('focus', this.doFocus)
                }
            }
        }
    }
</script>

<style scoped>

</style>