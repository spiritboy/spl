<template>
    <div>
        <label class="control-label">{{questionValue.questionModel.title}}</label>
        <input style="direction: ltr" class="form-control datepicker" ref="el" type="text" />
    </div>
</template>

<script>
    let dPicker = null;
    export default {
        props: ["questionValue"],
        name: "DateComponent",
        mounted: function () {
            $(this.$refs.el).on('keypress', (function (event) {
                //## we will add '/' character on user keypress, ex: user type: 1397 =>changes to=> 1397/
                let val = $(this.$refs.el).val() + String.fromCharCode(event.which);
                //character is backspace
                if (event.which === 8) return;
                //if 0000 is typed
                if (val.length === 4 && val.replace(/[^/]/g,'').length === 0) {
                    $(this.$refs.el).val(val + '/');
                    event.preventDefault()
                }
                //if 0000/00 is typed
                else if (val.length === 7 && val.replace(/[^/]/g,'').length === 1) {
                    $(this.$refs.el).val(val + '/');
                    event.preventDefault()
                }
            }).bind(this));

            if (dPicker != null) {
                //set the initial value to what it was before
                $(this.$refs.el).attr("value", this.questionValue.value);
            }
            $(this.$refs.el).change((function () {
                this.questionValue.value = $(this.$refs.el).val()
            }).bind(this));
            dPicker = $(this.$refs.el).pDatepicker({
                "inline": false,
                "format": "YYYY/MM/DD",
                "viewMode": "day",
                "initialValue": false,
                "autoClose": true,
                "position": "auto",
                "initialValueType": 'persian',
                "calendarType": "persian",
                "inputDelay": 500,
                "observer": true,
                "calendar": {
                    "persian": {
                        "locale": "fa",
                        "showHint": false,
                        "leapYearMode": "algorithmic"
                    },
                    "gregorian": {
                        "locale": "en",
                        "showHint": false
                    }
                },
                onSelect: (function () {
                    this.questionValue.value = $(this.$refs.el).val()
                }).bind(this)
            });


        }
    }
</script>

<style scoped>

</style>