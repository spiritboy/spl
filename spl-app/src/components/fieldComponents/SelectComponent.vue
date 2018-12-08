<template>
    <div>
        <label class="control-label" :title="this.questionValue.questionModel.fieldInfo.source.script">{{questionValue.questionModel.title}}</label>
        <select class="form-control" v-model="questionValue.value" ref="el" v-selecttwo>
            <option v-for="option in options"
                    :value="option.id">{{option.name}}
            </option>
        </select>
    </div>
</template>

<script>
    import _BaseComponent from "@/components/fieldComponents/_BaseComponent"
    export default {
        name: "SelectComponent",
        extends:_BaseComponent,
        data(){
            return{
                options:[]
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

            this.questionValue.questionModel.fieldInfo.source.getSources((function(d){
                this.options = d;
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

</style>