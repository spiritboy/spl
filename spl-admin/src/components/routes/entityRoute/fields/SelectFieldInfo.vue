<template>
    <form>
        <div class="form-row align-items-center">
            <div class="col-auto">
                <label for="source" class="sr-only">منبع داده</label>
                <input type="text" placeholder="منبع داده" class="form-control mb-2" id="source">
            </div>
            <div class="col-auto">
                <label for="selectedCol" class="sr-only">ستون قابل انتخاب</label>
                <input type="text" placeholder="ستون قابل انتخاب" class="form-control mb-2" id="selectedCol">
            </div>
            <div class="col-auto">
                <div class="form-check mb-2">
                    <input class="form-check-input" type="checkbox" id="isMultiSelect">
                    <label class="form-check-label" for="isMultiSelect">
                        چند انتخابی
                    </label>
                </div>
            </div>
        </div>
    </form>
</template>

<script>
    export default {
        name: "SelectFieldInfo"
    }
</script>

<style scoped>

</style>