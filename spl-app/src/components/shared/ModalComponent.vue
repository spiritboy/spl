<template>
    <div class="modal fade" tabindex="-1" role="dialog" aria-hidden="true" ref="modal">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-body">
                    <div>
                        <slot>

                        </slot>
                    </div>
                </div>
                <div class="modal-footer">
                    <a  class="app-btn" @click="okClicked"><i
                            class="fa fa-check"></i></a>
                    <a class="app-btn" data-dismiss="modal">
                        <i class="fa fa-times"></i>
                    </a>
                </div>
            </div>

        </div>

    </div>

</template>

<script>
    export default {
        name: "ModalComponent",
        methods: {
            show() {
                $(this.$refs.modal).modal('show');
            },
            okClicked() {

            }
        }
    }
</script>

<style scoped>

</style>