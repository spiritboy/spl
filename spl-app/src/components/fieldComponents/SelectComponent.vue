<template>
    <div>
        <label class="control-label" :title="this.questionValue.questionModel.fieldInfo.source.script">{{questionValue.questionModel.title}}</label>
        <sup v-if="validationResults.length > 0"
             :title="validationResults.map(v=>v.message).join(' - ')"
             class="fa fa-star validation-error"></sup>
        <select v-if="!isRadio" v-show="options!=null && options.length > 0" class="form-control"
                v-model="questionValue.value" ref="el"
                v-selecttwo>
            <option v-for="option in options"
                    :value="option.id">{{option.name}}
            </option>
        </select>
        <div v-else class="custom-control custom-radio" v-for="option in options">
            <input class="custom-control-input" type="radio" v-model="questionValue.value"
                   :name="questionValue.questionModel.id"
                   :id="option.id"
                   :value="option.id">
            <label class="custom-control-label" :for="option.id">
                {{option.name}}
            </label>
        </div>
    </div>
</template>Z

<script>
    import BaseFieldInfoComponent from "@/components/fieldComponents/BaseFieldInfoComponent"

    export default {
        name: "SelectComponent",
        extends: BaseFieldInfoComponent,
        props: ["isRadio"],
        data() {
            return {
                options: []
            }
        },
        mounted: function () {
            //convert to select2
            $(this.$refs.el).select2({
                theme: "bootstrap",
                multiple: this.questionValue.questionModel.fieldInfo.isMultiSelect
            });
            //set the initial value
            $(this.$refs.el).val(this.questionValue.value).trigger("change");

            this.questionValue.questionModel.fieldInfo.source.getSources((function (d) {
                this.options = d;
                //this.isRadio = d && d.length <= 3;
            }).bind(this))
        },
        directives: {
            selecttwo: {
                twoWay: true,
                bind: function (el, binding, vnode) {
                    $(el).on('select2:select', function (evt) {
                        // if select2 changes, notify model
                        const event = new Event('change', {bubbles: true, cancelable: true});
                        el.dispatchEvent(event);

                        //now preserve the selection order:
                        var element = evt.params.data.element;
                        var $element = $(element);
                        $element.detach();
                        $(this).append($element);
                        $(this).trigger("change");
                    });

                },
                // if model changes, notify select2
                update: function (el, binding, vnode) {
                    $(el).val(vnode.context.questionValue.value).trigger("change");
                }
            }
        }
    }
</script>

<style scoped>
.custom-control.custom-radio{
    margin: 5px;
    font-size:larger;
}
</style>