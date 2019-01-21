<template>
    <div class="modal fade" role="dialog" aria-hidden="true" ref="modal">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form class="form form-horizontal" v-if="ext!=null">
                        <div class="form-group">
                            <label class="control-label">نام خصوصیت</label>
                            <!--<input v-model="ext.name" class="form-control" @change="nameChanged" @input="nameInput"/>-->
                            <auto-complete v-model="ext.name" :api="autoComplete" :is-async="true"/>
                        </div>
                        <div class="form-group">
                            <label class="control-label">نوع داده</label>
                            <select v-model="ext.dataType" class="form-control" :key="1" @input="onChangeDataType">
                                <option value="string">رشته</option>
                                <option value="number">عدد</option>
                                <option value="date">تاریخ</option>
                                <option value="lookup">look up</option>
                            </select>
                        </div>
                        <div v-if="ext.dataType === 'lookup'" class="form-group">
                            <label class="control-label">کلاس</label>
                            <Select2 :key="2"
                                     :text="ext.classRefName"
                                     v-model="ext.clsId"
                                     :options="[{id:ext.clsId,text:ext.classRefName}]"
                                     @input="onChange"
                                     :api="apiCall">
                            </Select2>
                        </div>
                        <div class="form-group">
                            <label class="control-label">قابل جستجو</label>
                            <input v-model="ext.isSearchable" class="form-control" type="number"/>
                        </div>
                        <div class="form-check">
                            <input v-model="ext.isRequired" type="checkbox" class="form-check-input" id="isReq">
                            <label class="form-check-label" for="isReq">اجباری</label>
                        </div>
                        <div class="form-check">
                            <input v-model="ext.isMultiSelect" type="checkbox" class="form-check-input"
                                   id="isMultiSelect">
                            <label class="form-check-label" for="isMultiSelect">چند انتخابی</label>
                        </div>
                        <div class="form-check">
                            <input v-model="ext.isId" type="checkbox" class="form-check-input"
                                   id="isId">
                            <label class="form-check-label" for="isId">شناسه</label>
                        </div>
                        <div class="form-group">
                        </div>
                    </form>
                    <hr>
                    <div v-if="selectProperties.length > 0" class="">
                        <span></span><span> {{ext.name}} </span> <span>در سایر کلاس ها:</span>
                        <span class="badge badge-info" style="margin: 5px;" v-for="(v,i) in selectProperties">
                           {{v.Name}}
                        </span>
                    </div>
                </div>
                <div class="modal-footer">
                    <div>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">
                            <i class="fa fa-times"></i>
                        </button>
                        <button type="button" class="btn btn-primary"
                                @click="popUpOkClicked">
                            <i class="fa fa-check"></i>
                        </button>
                    </div>

                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import Select2 from "../../../shared/Select2"
    import {term} from "../../../../api/term";
    import AutoComplete from "../../../shared/autocomplete";

    export default {
        name: "classExtComponent",
        components: {Select2, AutoComplete},
        props: ["ext", "parentClass"],
        data() {
            return {
                selectProperties: []
            }
        },
        methods: {
            apiCall(q, pp, pn) {
                return term.ClassSelect(q, pp, pn)
            },
            async autoComplete(q, pp, pn) {
                return term.ClassSelectPropertyRecommend(q, pp, pn)
            },
            onChange(id, text) {
                this.ext.classRefName = text;
            },
            onChangeDataType() {
                this.ext.classRefName = null;
            },
            async nameInput() {
                if (this.selectProperties.length > 0) {
                    this.selectProperties = [];
                    this.selectProperties = (await term.ClassSelectProperty(this.ext.name, this.parentClass.id)).data;
                }
            },
            async nameChanged() {
                this.selectProperties = [];
                this.selectProperties = (await term.ClassSelectProperty(this.ext.name, this.parentClass.id)).data;
            },
            show() {
                this.selectProperties = [];
                $(this.$refs.modal).modal('show');
            },
            async popUpOkClicked() {
                $(this.$refs.modal).modal('hide');
                if (this.ext.id === 0) {
                    //add
                    if ((await this.parentClass.insertExt(this.ext)).process()) {
                        this.parentClass.properties.push(this.ext);
                        this.$emit('popupClosed', 'insert');
                    }
                    else
                        this.$emit('popupClosed', 'failed');
                }
                else {
                    //update ext
                    if ((await this.ext.update()).process()) {
                        this.$emit('popupClosed', 'update');

                    }
                    else
                        this.$emit('popupClosed', 'failed');
                }
            }
        }
    }
</script>

<style scoped>

</style>