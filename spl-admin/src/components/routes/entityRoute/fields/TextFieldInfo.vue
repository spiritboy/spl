<template>
    <form>
        <div class="form-row align-items-center">
            <div class="col-auto">
                <label for="mask">ماسک</label>
                <input  v-model="value.mask" type="text" class="form-control mb-2" id="mask">
            </div>
            <div class="form-check form-check-inline" style="margin-top: 25px">
                <input v-model="value.includeLiteralsInValue" type="checkbox" class="form-check-input"
                       id="includeLiteralsInValue">
                <label class="form-check-label" for="includeLiteralsInValue">includeLiteralsInValue</label>
            </div>
        </div>
    </form>
</template>

<script>
    export default {
        name: "TextFieldInfo",
        props: ['value']
    }
</script>

<style scoped>

</style>