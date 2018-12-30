<template>
    <div class="container">
        <div class="row">
            <div class="col-4">
                <TreeView :tree-data="treeData" @onEdit="onEdit"/>
            </div>
            <div class="col-8">
                <editor-menu></editor-menu>
            </div>
        </div>
    </div>
</template>

<script>
    import TreeView from "../../shared/TreeView/TreeView";
    import {ItemModel} from "../../shared/TreeView/ItemModel";
    import EditorMenu from "./editorMenu";

    let d = new ItemModel(0, "منوها");
    d.addItem(new ItemModel(0, "منوی پرسنلی"));
    let sub2 = new ItemModel(0, "منوی انبار");
    d.addItem(sub2);
    sub2.addItem(new ItemModel(0, "اطلاعات کالا"));
    sub2.addItem(new ItemModel(0, "اطلاعات برند"));
    sub2.addItem(new ItemModel(0, "اطلاعات مدل"));
    let sub3 = new ItemModel(0, "منوی شرح حال");
    d.addItem(sub3);
    sub3.addItem(new ItemModel(0, "شکایت اصلی"));
    sub3.addItem(new ItemModel(0, "آلرژی"));
    sub3.addItem(new ItemModel(0, "سوابق فامیلی"));
    export default {
        name: "entityRoute",
        components: {EditorMenu, TreeView},
        data() {
            return {treeData: d}
        },
        methods:{
            onEdit(item){
                alert(item.name)
            }
        }
    }
</script>

<style scoped>

</style>