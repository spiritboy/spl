<template>
    <select>
        <slot></slot>
    </select>
</template>

<script>
    let selec2Conf = {
        theme: 'bootstrap'
    };
    export default {
        name: "Select2",
        props: ['options', 'value', 'api'],
        mounted() {
            var vm = this;
            selec2Conf.data=this.options;
            if (this.api != null) {
                selec2Conf.ajax = {
                    transport: function (params, success, failure) {
                        console.log(params)
                        let p = 1, pp = 100, q = '';
                        if (params.data.page != null) p = params.data.page;
                        if (params.data.q != null) q = params.data.q;
                        vm.api(params.data.q, pp, p).then(d => {
                            success(d.data);
                        }).catch(() => failure());
                    },
                    processResults: function (data, params) {
                        var items = [];
                        for (var i = 0; i < data.length; ++i) {
                            items.push({id: data[i].ID, text: data[i].Name});
                        }
                        return {
                            pagination: {
                                more: true
                            },
                            results: items,
                            totals: items.length
                        };
                    },
                }
            }
            $(this.$el)
            // init select2
                .select2(selec2Conf)
                .val(this.value)
                .trigger('change')
                // emit event on change.
                .on('change', function () {
                    let txt = $(this).select2('data')[0] == null ? '':$(this).select2('data')[0].text
                    vm.$emit('input', this.value,txt)
                })
                .on('select2:select', function (e) {
                })
        },
        watch: {
            value: function (value) {
                // update value
                $(this.$el)
                    .val(value)
                    .trigger('change')
            },
            options: function (options) {
                // update options
                selec2Conf.data=options;
                //$(this.$el).empty().select2(selec2Conf)
                console.log(this.value)
            }
        },
        destroyed: function () {
            $(this.$el).off().select2('destroy')
        }
    }
</script>

<style scoped>

</style>