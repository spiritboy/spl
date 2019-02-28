<template>
    <div style="max-width: 600px;" v-if="value!=null">
        <div class="form-row">
            <div class="form-check form-check-inline">
                <input v-model="value.tabStop" type="checkbox" class="form-check-input" id="TabStop">
                <label class="form-check-label" for="TabStop">TabStop</label>
            </div>
            <div class="form-check form-check-inline">
                <input v-model="value.lock" type="checkbox" class="form-check-input" id="Lock">
                <label class="form-check-label" for="Lock">Lock</label>
            </div>
            <div class="form-check form-check-inline">
                <input v-model="value.visible" type="checkbox" class="form-check-input" id="Visible">
                <label class="form-check-label" for="Visible">Visible</label>
            </div>
        </div>
        <div class="form-row">
            <div class="col-lg">
                <label class="control-label">نام فونت:</label>
                <select v-model="value.font.name" class="custom-select input-lg " style="">
                    <option value="B Koodak">B Koodak</option>
                    <option value="Tahoma">Tahoma</option>
                    <option value="B Titr">B Titr</option>
                    <option value="Arial">Arial</option>
                </select>
            </div>
            <div class="col-lg">
                <label class="control-label">رنگ فونت:</label>
                <select v-model="value.font.color" class="custom-select input-lg " style="">
                    <option value="black">Black</option>
                    <option value="red">Red</option>
                    <option value="gray">Gray</option>
                    <option value="yellow">Yellow</option>
                </select>
            </div>
            <div class="col-lg">
                <label class="control-label">سایز فونت:</label>
                <input v-model="value.font.size" type="number" class="form-control"/>
            </div>
            <div class="form-check form-check-inline" style="margin-top: 30px">
                <input v-model="value.font.bold" type="checkbox" class="form-check-input" id="Bold">
                <label class="form-check-label" for="Bold" style="font-weight: bold">Bold</label>
            </div>
            <div class="form-check form-check-inline" style="margin-top: 30px">
                <input v-model="value.font.italic" type="checkbox" class="form-check-input" id="Italic">
                <label class="form-check-label" for="Bold" style="font-style: italic">Italic</label>
            </div>
            <div class="form-check form-check-inline" style="margin-top: 30px">
                <input v-model="value.font.underline" type="checkbox" class="form-check-input" id="UnderLine">
                <label class="form-check-label" for="UnderLine" style="text-decoration: underline">Underline</label>
            </div>
        </div>
        <div class="form-row">
            <div class="col-lg">
                <label class="control-label">چیدمان:</label>
                <select v-model="value.align" class="custom-select input-lg " style="">
                    <option value="right">راست</option>
                    <option value="left">چپ</option>
                </select>
            </div>
            <div class="col-lg">
                <label class="control-label">چیدمان زبان:</label>
                <select v-model="value.direction" class="custom-select input-lg " style="">
                    <option value="rtl">راست به چپ</option>
                    <option value="ltr">چپ به راست</option>
                </select>
            </div>
        </div>
        <div class="form-row">
            <div class="col-lg">
                <label class="control-label">نمایش اعداد:</label>
                <select v-model="value.numericShape" class="custom-select input-lg  input-sm" style="">
                    <option value="farsi">فارسی</option>
                    <option value="english">انگلیسی</option>
                    <option value="context">براساس متن</option>
                </select>
            </div>
            <div class="col-lg">
                <label class="control-label">زبان:</label>
                <select v-model="value.language" class="custom-select input-lg " style="">
                    <option value="farsi">فارسی</option>
                    <option value="english">انگلیسی</option>
                </select>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "GenericFieldInfo",
        props:['value']
    }
</script>

<style scoped>
.form-row{
    margin-top: 20px;
}
</style>