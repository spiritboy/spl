<template>
    <div v-if="menu!=null" class="container">
        <div>
            <button v-bind:key="category.id" v-for="category in menu.categories" @click="selectedCategory = category"
                    v-bind:class="['tab-button', { active: category === selectedCategory }]">{{category.title}}</button>
        </div>
        <hr>
        <div v-if="selectedCategory!=null">
            <CategoryComponent v-bind:key="selectedCategory.id" v-bind:category="selectedCategory"></CategoryComponent>
        </div>
    </div>
</template>

<script>
    import GroupComponent from "../group/GroupComponent";
    import GroupTableComponent from "../group/GroupTableComponent";
    import CategoryComponent from "@/components/category/CategoryComponent";

    export default {
        name: 'MenuComponent',
        props: ['menu'],
        components: {CategoryComponent, GroupComponent, GroupTableComponent},
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
