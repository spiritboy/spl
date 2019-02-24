<template>
    <div style="border:1px dashed black;padding:10px;"  class="form-group">
        <div style="margin-bottom: 10px">
            <select class="form-control" v-model="fieldType">
                <option value="date">تاریخ</option>
                <option value="select">انتخابی</option>
                <option value="text">متنی</option>
                <option value="anatomy">آناتومی</option>
            </select>
        </div>
        <text-field-info v-if="fieldType === 'text'"></text-field-info>
        <select-field-info v-if="fieldType === 'select'"></select-field-info>
    </div>
</template>

<script>
    import TextFieldInfo from "./fields/TextFieldInfo";
    import SelectFieldInfo from "./fields/SelectFieldInfo";
    export default {
        name: "FieldInfoComponent",
        components: {SelectFieldInfo, TextFieldInfo},
        data(){
            return{
                fieldType:''
            }
        }
    }
</script>

<style scoped>

</style>