<template>
    <div class="modal fade" role="dialog" aria-hidden="true" ref="modal" v-if="term!=null">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <span>ایجاد ترم از نوع: </span>
                    <span v-if="term.classModel!=null">{{term.classModel.name}}</span>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form class="form form-horizontal">

                        <div class="form-group">
                            <label class="control-label">
                                <span>نام ترم</span>
                                <sup class="fa fa-asterisk"></sup>
                            </label>
                            <input v-model="term.name" class="form-control"/>
                        </div>

                        <div v-if="term.classModel!=null">
                            <div v-for="(property,i) in term.classModel.properties" class="form-group">

                                <div v-if="property._dataType === 'string'">
                                    <label class="control-label">
                                        <span>{{property.name}} </span>
                                        <sup v-if="property.isRequired" class="fa fa-asterisk"></sup>
                                    </label>
                                    <input v-model="term.values[i]" type="text" class="form-control"/>
                                </div>
                                <div v-else-if="property.dataType === 'number'">
                                    <label class="control-label">
                                        <span>{{property.name}} </span>
                                        <sup v-if="property.isRequired" class="fa fa-asterisk"></sup>
                                    </label>
                                    <input v-model="term.values[i]" type="number" class="form-control"/>
                                </div>
                                <div v-else-if="property.dataType === 'date'">
                                    <label class="control-label">
                                        <span>{{property.name}} </span>
                                        <sup v-if="property.isRequired" class="fa fa-asterisk"></sup>
                                    </label>
                                    <input v-model="term.values[i]" type="date" class="form-control"/>
                                </div>
                                <div v-else-if="property.dataType === 'lookup'">
                                    <label class="control-label">
                                        <span>{{property.name}} </span>
                                        <sup v-if="property.isRequired" class="fa fa-asterisk"></sup>
                                    </label>
                                    <input v-model="term.values[i]" type="password" class="form-control"/>
                                </div>
                            </div>
                        </div>
                        <div v-if="errors.length" class="validation-error">
                            <ul>
                                <li v-for="error in errors">{{ error }}</li>
                            </ul>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal"><i class="fa fa-times"></i>
                    </button>
                    <button type="button" class="btn btn-primary"
                            @click="popUpOkClicked">
                        <i class="fa fa-check"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "termEditComponent",
        props: ["term"],
        data() {
            return {
                errors: []
            }
        },
        methods: {
            show() {
                $(this.$refs.modal).modal('show');
            },
            async popUpOkClicked() {
                this.errors = [];
                if (!this.term.isValid())
                    this.errors.push('مقادیر ستاره دار را پر کنید')


                if (this.errors.length > 0)
                    return;
                let isInsert = this.term.id === 0;
                if ((await this.term.insertUpdate()).process()) {
                    this.$emit('termSaved', this.term, isInsert);
                    $(this.$refs.modal).modal('hide');
                }
            }
        }
    }
</script>

<style scoped>
</style>