<template>
    <div>
        <form class="form-inline">
            <input class="form-control mr-sm-2" type="text" v-model="searchText" @input="doSearch()"  placeholder="تایپ کنید ..." aria-label="Search">
        </form>
        <ul id="demo">
            <TreeItem
                    v-for="tree in treeData.searchItems"
                    @onEdit="onEdit"
                    @onRemove="onRemove"
                    @onAddItem="onAddItem"
                    class="item"
                    :model="tree">
            </TreeItem>
        </ul>

    </div>
</template>

<script>
    import TreeItem from "./TreeItem";

    export default {
        name: "TreeView",
        components: {TreeItem},
        props: ["treeData"],
        data: function () {
            return {
                searchText: ''
            }
        },
        methods: {
            doSearch() {
                this.treeData.search(this.searchText, 1);
            },
            onEdit(item){
                this.$emit('onEdit',item);
            },
            onAddItem(){
                this.$emit('onAddItem');
            },
            onRemove(){
                this.$emit('onRemove');
            }
        },
        computed: {}
    }
</script>

<style scoped>
    body {
        font-family: Menlo, Consolas, monospace;
        color: #444;
    }

    .item {
        cursor: pointer;
    }

    .bold {
        font-weight: bold;
    }
    ul {
        padding-left: 1em;
        line-height: 1.5em;
        list-style-type: dot;
    }
    form{
        margin-bottom: 15px;
    }
</style>