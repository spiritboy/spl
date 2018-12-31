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
                    <!--<form class="form form-horizontal" v-if="term!=null">-->
                    <!--<div class="form-group">-->
                    <!--<label class="control-label">نام خصوصیت</label>-->
                    <!--<input v-model="term.name" class="form-control"/>-->
                    <!--</div>-->
                    <!--<div class="form-group">-->
                    <!--<label class="control-label">نوع داده</label>-->
                    <!--<select v-model="term.dataType" class="form-control" :key="1">-->
                    <!--<option value="string">رشته</option>-->
                    <!--<option value="number">عدد</option>-->
                    <!--<option value="date">تاریخ</option>-->
                    <!--<option value="class">شیئ</option>-->
                    <!--</select>-->
                    <!--</div>-->
                    <!--<div v-if="term.dataType === 'class'" class="form-group">-->
                    <!--<label class="control-label">کلاس</label>-->
                    <!--<Select2 :key="2"-->
                    <!--:tterm="term.classRefName"-->
                    <!--v-model="term.clsId"-->
                    <!--:options="[{id:term.clsId,tterm:term.classRefName}]"-->
                    <!--@input="onChange"-->
                    <!--:api="apiCall">-->
                    <!--</Select2>-->
                    <!--</div>-->
                    <!--<div class="form-group">-->
                    <!--{{term.dataType}}-->
                    <!--{{term.clsId}}-->
                    <!--</div>-->
                    <!--</form>-->
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
        methods: {
            show(){
                $(this.$refs.modal).modal('show');
            }
        }
    }
</script>

<style scoped>

</style>