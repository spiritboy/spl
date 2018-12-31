<template>
    <div class="modal fade"  role="dialog" aria-hidden="true" ref="modal">
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
                            <input v-model="ext.name" class="form-control"/>
                        </div>
                        <div class="form-group">
                            <label class="control-label">نوع داده</label>
                            <select v-model="ext.dataType" class="form-control" :key="1">
                                <option value="string">رشته</option>
                                <option value="number">عدد</option>
                                <option value="date">تاریخ</option>
                                <option value="class">شیئ</option>
                            </select>
                        </div>
                        <div v-if="ext.dataType === 'class'" class="form-group">
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
                            {{ext.dataType}}
                            {{ext.clsId}}
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
    import Select2 from "../../../shared/Select2"
    import {term} from "../../../../api/term";

    export default {
        name: "extComponent",
        components: {Select2},
        props: ["ext","parentClass"],
        methods: {
            apiCall(q, pp, pn) {
                return term.ClassSelect(q, pp, pn)
            },
            onChange(id,text){
                this.ext.classRefName = text;
            },
            show(){
                $(this.$refs.modal).modal('show');
            },
            async popUpOkClicked() {
                $(this.$refs.modal).modal('hide');
                if (this.ext.id === 0) {
                    //add
                    if ((await this.parentClass.insertExt(this.ext)).process())
                        this.parentClass.properties.push(this.ext);
                }
                else {
                    //update ext
                    if ((await this.ext.update()).process()) {

                    }
                }
            }
        }
    }
</script>

<style scoped>

</style>