<template>
    <div style="border:1px dashed black;padding:10px;">
        <div class="form-group">
            <label class="control-label">
                نوع فیلد <i class="fa fa-i-cursor"></i>
            </label>
            <div style="margin-bottom: 10px;max-width: 400px">
                <select class="form-control" v-model="value.fieldType">
                    <option value="text">متنی</option>
                    <option value="list">انتخابی</option>
                    <option value="date">تاریخ</option>
                    <option value="file">فایل</option>
                    <option value="password">پسورد</option>
                    <option value="anatomy">آناتومی</option>
                </select>
            </div>
        </div>
        <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item">
                <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home"
                   aria-selected="true">اطلاعات عمومی</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab"
                   aria-controls="profile" aria-selected="false">تنظیمات اختصاصی</a>
            </li>

        </ul>
        <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                <generic-field-info :value="value"></generic-field-info>
            </div>
            <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                <text-field-info  v-if="value.fieldType === 'text'"></text-field-info>
                <list-field-info  v-if="value.fieldType === 'list'"></list-field-info>
                <date-field-info  v-if="value.fieldType === 'date'"></date-field-info>
            </div>
        </div>

    </div>

</template>

<script>
    import GenericFieldInfo from "./GenericFieldInfo";
    import SelectFieldInfo from "./SelectFieldInfo";
    import TextFieldInfo from "./TextFieldInfo";
    import DateFieldInfo from "./DateFieldInfo";
    import ListFieldInfo from "./ListFieldInfo";

    export default {
        name: "FieldInfo",
        props: ["value"],
        components: {ListFieldInfo, DateFieldInfo, TextFieldInfo, SelectFieldInfo, GenericFieldInfo}
    }
</script>

<style scoped>

</style>