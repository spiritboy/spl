<template>
    <select ref="el">
        <slot></slot>
    </select>
</template>

<script>
    let selec2Conf = {
        theme: 'bootstrap'
    };
    export default {
        name: "Select2",
        props: ['options', 'value', 'api','apiState','multiple'],
        async mounted() {
            console.log($(this.$refs.el))
            let vm = this;
            selec2Conf.data = this.options;
            if (this.api != null) {
                console.log('api set');
                //selec2Conf.multiple = this.multiple === true;
                selec2Conf.ajax = {
                    transport: function (params, success, failure) {
                        let p = 1, pp = 100, q = '';
                        if (params.data.page != null) p = params.data.page;
                        if (params.data.q != null) q = params.data.q;
                        vm.api(params.data.q, pp, p,vm.apiState).then(d => {
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
            $(this.$refs.el)
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
                $(this.$refs.el)
                    .val(value)
                    .trigger('change')
            },
            options: function (options) {
                console.log(options);

                // update options
                let vm = this;
                selec2Conf.data=options;
                $(this.$refs.el)
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
                    })}
        },
        destroyed: function () {
            $(this.$refs.el).off().select2('destroy');
        }
    }
</script>

<style scoped>

</style>