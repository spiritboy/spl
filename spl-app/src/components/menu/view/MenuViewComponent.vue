<template>
    <div v-if="menu!=null" class="container">
        <h1 style="color:gray">{{menu.title}}</h1>
        <div>
            <button v-bind:key="category.id" v-for="category in menu.categories" @click="selectedCategory = category"
                    v-bind:class="['tab-button', { active: category === selectedCategory }]">{{category.title}}
            </button>
        </div>
        <hr>
        <CategoryViewComponent v-bind:category="selectedCategory"/>
    </div>
</template>

<script>
    import CategoryViewComponent from "@/components/category/view/CategoryViewComponent";

    export default {
        name: "MenuDetailsComponent",
        components: {CategoryViewComponent},
        props: ['menu'],
        data() {
            return {selectedCategory: null};
        },
        methods: {
            setSelectedGroup(c) {
                this.selectedCategory = c;
            }
        }
    }
</script>

<style scoped>

</style>