<template>
    <form style="max-width: 600px;">
        <div class="form-row align-items-center">
            <div class="col-sm-12">
                <label for="source">منبع داده</label>
                <input v-model="value.source" type="text" class="form-control mb-2" id="source">
            </div>
            <div class="col-sm-12">
                <label for="View">View</label>
                <input v-model="value.view" type="text" class="form-control mb-2" id="View">
            </div>
            <div class="col-sm-12">
                <label class="control-label">استایل نمایش:</label>
                <select v-model="value.style" class="custom-select input-lg " style="">
                    <option value="grid">جدولی</option>
                    <option value="list">لیستی</option>
                </select>
            </div>
        </div>
        <div class="form-row">
            <div class="form-check form-check-inline">
                <input v-model="value.autoExpand" type="checkbox" class="form-check-input" id="AutoExpand">
                <label class="form-check-label" for="AutoExpand">AutoExpand</label>
            </div>
            <div class="form-check form-check-inline">
                <input v-model="value.limitToList" type="checkbox" class="form-check-input" id="LimitToList">
                <label class="form-check-label" for="LimitToList">LimitToList</label>
            </div>
            <div class="form-check form-check-inline">
                <input v-model="value.showSelectAll" type="checkbox" class="form-check-input" id="ShowSelectAll">
                <label class="form-check-label" for="ShowSelectAll">ShowSelectAll</label>
            </div>
            <div class="form-check form-check-inline">
                <input v-model="value.isLoadOnStartup" type="checkbox" class="form-check-input" id="IsLoadOnStartup">
                <label class="form-check-label" for="IsLoadOnStartup">IsLoadOnStartup</label>
            </div>
        </div>
        <div class="form-row">
            <div >
                <div for="source">ستون ها:</div>
                <table class="table table-sm table-bordered col-lg">
                    <thead>
                    <tr>
                        <th>عنوان</th>
                        <th>نام</th>
                        <th>نمایش</th>
                        <th>عرض</th>
                        <th>رنگ</th>
                        <th>قابل جستجو</th>
                        <th>قابل مرتب سازی</th>
                        <th>نمایش</th>
                        <th>چیدمان</th>
                        <th>سایز فونت</th>
                    </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        </div>
    </form>
</template>

<script>
    export default {
        name: "ListFieldInfo",
        props:["value"]
    }
</script>

<style scoped>
    .form-row {
        margin-top: 20px;
    }

</style>