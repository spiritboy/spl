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
                            <input v-model="term.name" class="form-control" @change="nameChanged"/>
                        </div>

                        <div v-if="term.classModel!=null && term.extendeds.length > 0">
                            <div v-for="(property,i) in term.classModel.properties" class="form-group">
                                <div v-if="property._dataType === 'string'">
                                    <label class="control-label">
                                        <span>{{property.name}} </span>
                                        <sup v-if="property.isRequired" class="fa fa-asterisk"></sup>
                                    </label>
                                    <input v-model="term.extendeds[i].id" type="text" class="form-control"/>
                                </div>
                                <div v-else-if="property.dataType === 'number'">
                                    <label class="control-label">
                                        <span>{{property.name}} </span>
                                        <sup v-if="property.isRequired" class="fa fa-asterisk"></sup>
                                    </label>
                                    <input v-model="term.extendeds[i].id" type="number" class="form-control"/>
                                </div>
                                <div v-else-if="property.dataType === 'date'">
                                    <label class="control-label">
                                        <span>{{property.name}} </span>
                                        <sup v-if="property.isRequired" class="fa fa-asterisk"></sup>
                                    </label>
                                    <input v-model="term.extendeds[i].id" type="date" class="form-control"/>
                                </div>
                                <div v-else-if="property.dataType === 'lookup'">
                                    <label class="control-label">
                                        <span>{{property.name}} </span>
                                        <sup v-if="property.isRequired" class="fa fa-asterisk"></sup>
                                    </label>
                                    <Select2 v-model="term.extendeds[i].id" class="form-control"
                                             :multiple="term.extendeds[i].classExtModel.isMultiSelect"
                                             :options="[{id:term.extendeds[i].id,text:term.extendeds[i].name}]"
                                             :api="doSearchTerms"
                                             :apiState="term.extendeds[i].classExtModel.clsId"/>
                                </div>
                            </div>
                        </div>
                        <div v-if="errors.length" class="validation-error">
                            <ul>
                                <li v-for="error in errors">{{ error }}</li>
                            </ul>
                        </div>
                    </form>
                    <div v-if="similarProperties.length > 0" class="similar">
                        <hr/>
                        <span>موارد مشابه:</span>
                        <ul>
                            <li v-for="(similar,i) in similarProperties" :class="{'active':selectedSimilar === similar}" @click="onSimilarClicked(similar)">
                                <span style="margin: 5px;">
                                    {{similar.clsName}} <i class="fa fa-chevron-left small"></i>
                                </span>

                                <span v-for="val in similar.propertyValues" class="badge badge-warning">
                                    {{val.ClassExName}}: {{val.PropertyValues[0].Name}}
                                </span>
                            </li>
                        </ul>
                    </div>
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
    import Select2 from "../../../shared/Select2";
    import {term} from "../../../../api/term";
    import {similarModel} from "../model/similarModel";

    export default {
        name: "termEditComponent",
        components: {Select2},
        props: ["term"],
        data() {
            return {
                errors: [],
                similarProperties: [],
                selectedSimilar : null
            }
        },
        methods: {
            async nameChanged() {
                this.similarProperties = (await term.TermSelectSimilarTerm(this.term.classModel.id, this.term.name)).data.map(v=>new similarModel().deserialize(v));
            },
            show() {
                this.similarProperties = [];
                //this.selectedSimilar = null
                $(this.$refs.modal).modal('show');
                if(this.term.name)
                    this.nameChanged();
            },
            async doSearchTerms(q, pp, pn, state) {
                return term.TermSelect(state, q, pp, pn);
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
            },
            onSimilarClicked(similar){
                this.selectedSimilar = similar;
                for (let value of similar.propertyValues) {
                    let ext = this.term.extendeds.filter(v=>v.classExtModel.id === value.ClassExID);
                    if(ext.length > 0) ext[0].id = value.PropertyValues[0].ID;
                    if(ext.length > 0) ext[0].name = value.PropertyValues[0].Name;
                }
            }
        }
    }
</script>

<style scoped>
    .similar li{
        cursor: pointer;
        list-style: none;
    }
    .similar li.active{
        background-color: rgb(231, 231, 231);
    }
    .similar li:hover{
        background-color: rgba(155, 154, 255, 0.41);
    }
</style>