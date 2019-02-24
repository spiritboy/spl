<template>
    <form>
        <div class="form-row align-items-center">
            <div class="col-auto">
                <label for="maximuimLength">حداکثر طول</label>
                <input type="number" class="form-control mb-2" id="maximuimLength">
            </div>
            <div class="col-auto">
                <label for="minimumLength">حداقل طول</label>
                <input type="number" class="form-control mb-2" id="minimumLength">
            </div>
            <div class="col-auto">
                <label for="rows">تعداد ردیف</label>
                <input type="number" class="form-control mb-2" id="rows">
            </div>
            <div class="col-auto">
                <label for="placeHolder">placeHolder</label>
                <input type="text" class="form-control mb-2" id="placeHolder">
            </div>
        </div>
    </form>
</template>

<script>
    export default {
        name: "TextFieldInfo"
    }
</script>

<style scoped>

</style>