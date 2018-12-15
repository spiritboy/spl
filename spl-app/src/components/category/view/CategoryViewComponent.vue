<template>
    <div style="position:relative;">
        <div v-if="category!=null" >
            <ModalComponent ref="modalSearchComponent">
                <SearchComponent/>
            </ModalComponent>
            <div class="category-toolbar">
                <a class="tool-btn app-btn" @click="searchOpen"><i class="fa fa-search"></i></a>
                <a class="tool-btn app-btn" @click="searchOpen"><i class="fa fa-plus"></i></a>
                <a class="tool-btn app-btn" @click="searchOpen"><i class="fa fa-print"></i></a>
                <a class="tool-btn app-btn" @click="searchOpen"><i class="fa fa-cog"></i></a>
            </div>
        </div>
        <div v-if="category!=null">
            <div class="col-md-12" v-for="group in category.groups">
                <GroupViewComponent v-if="group.groupInfo.type === 'form' && group.flowEngine == null"
                                    v-bind:group-value="group.groupValues[0]"></GroupViewComponent>

                <GroupFlowViewComponent v-else-if="group.groupInfo.type === 'form' && group.flowEngine != null"
                                        v-bind:group-value="group.groupValues[0]"></GroupFlowViewComponent>

                <GroupTableViewComponent v-else-if="group.groupInfo.type === 'table'"
                                         v-bind:group-model="group"></GroupTableViewComponent>
            </div>
        </div>
    </div>
</template>

<script>
    import GroupViewComponent from "@/components/group/view/GroupViewComponent";
    import GroupTableViewComponent from "@/components/group/view/GroupTableViewComponent";
    import GroupFlowViewComponent from "@/components/group/view/GroupFlowViewComponent";
    import SearchComponent from "../SearchComponent";
    import ModalComponent from "../../shared/ModalComponent";

    export default {
        name: "CategoryViewComponent",
        props: ['category'],
        components: {ModalComponent, SearchComponent,GroupViewComponent,GroupFlowViewComponent, GroupTableViewComponent},
        data() {
            return {};
        },
        mounted() {
        },
        methods:{
            searchOpen(){
                this.$refs.modalSearchComponent.show()
            }
        }
    }
</script>

<style scoped>
.category-toolbar{
    padding-top: 20px;
    right:-25px;
    width:40px;
    position: absolute;
}
    .tool-btn{
        display: block;
    }
</style>