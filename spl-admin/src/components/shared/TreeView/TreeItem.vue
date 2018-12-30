<template xmlns:v-popover="http://www.w3.org/1999/xhtml">
    <li v-if="model!=null">
        <div
                :class="[{bold: isFolder,highlight:model.highlight},'level-'+model.level]"
                @click="toggle"
                @dblclick="changeType">
            <span v-if="isFolder">[{{ model.open ? '-' : '+' }}]</span>
            <i :class="'fa fa-'+(model.level === 1?'folder':'info')"></i>
            {{ model.name }}
            <div style="display: inline;position: relative;">
                <i class="fa fa-chevron-down" @click.stop="openMenu"></i>
                <div class="entity-menu" ref="entityMenu">
                    <div class="entity-menu-item" @click.stop="onEditClicked">
                        <i class="fa fa-edit"></i> <span> ویرایش</span>
                    </div>
                    <div class="entity-menu-item" @click.stop="onRemoveClicked">
                        <i class="fa fa-times"></i> حذف
                    </div>
                    <div class="entity-menu-item" @click.stop="onAddItemClicked">
                        <i class="fa fa-plus"></i>  افزودن زیر مجموعه
                    </div>
                </div>
            </div>
        </div>
        <ul v-show="model.open" v-if="isFolder">
            <TreeItem
                    class="item"
                    v-for="(model, index) in model.searchItems"
                    :key="index"
                    :model="model">
            </TreeItem>
        </ul>
    </li>
</template>

<script>
    import {ItemModel} from "./ItemModel";

    export default {
        name: "TreeItem",
        props: {
            model: null
        },
        computed: {
            isFolder: function () {
                return this.model.searchItems &&
                    this.model.searchItems.length
            }
        },
        methods: {
            openMenu() {
                $('.entity-menu.open').removeClass('open');
                $(this.$refs.entityMenu).addClass('open');
            },
            toggle: function () {
                if (this.isFolder) {
                    this.model.open = !this.model.open
                }
            },
            changeType: function () {
                if (!this.isFolder) {
                    Vue.set(this.model, 'items', [])
                    this.addItem()
                    this.model.open = true
                }
            },
            addItem: function () {
                this.model.addItem(new ItemModel(0, 'new stuff'));
            },
            onEditClicked() {
                $('.entity-menu.open').removeClass('open');
                this.$emit('onEdit',this.model);
            },
            onRemoveClicked() {
                $('.entity-menu.open').removeClass('open');
                this.$emit('onRemove',this.model);
            },
            onAddItemClicked() {
                $('.entity-menu.open').removeClass('open');
                this.$emit('onAddItem',this.model);
            }
        },
        mounted() {
        }
    }
</script>

<style scoped>

    .highlight {
        color: #1321ff;
    }

    li {
        list-style: none;
    }

    li .popOver {
        display: none;
    }

    li:hover .popOver {
        display: inline;
    }

    .entity-menu.open {
        display: block;
    }
    .entity-menu {
        background-color: white;
        border: 1px solid lightgray;
        border-radius:5px;
        position: absolute;
        right: -30px;
        top: 20px;
        width: 170px;
        padding: 5px;
        display: none;
        z-index: 1000;
    }

    .entity-menu .entity-menu-item {
        padding: 5px;
        border-bottom: 1px solid lightgray;
    }
    .entity-menu .entity-menu-item:hover {
        background-color: #bfccff;
    }
</style>