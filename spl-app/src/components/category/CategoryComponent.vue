<template>
    <div>

        <div v-if="category!=null" class="row">
            <div class="col-md-2">
                <ul style="padding: 0px">
                    <li v-on:click="setSelectedGroup(group)" v-bind:class="{active:group === selectedGroup}"
                        v-bind:key="group.id"  v-for="group in category.groups">
                        {{group.title}}
                        <span v-if="group.groupValues.length>1" class="badge badge-info">{{group.groupValues.length}}</span>
                    </li>
                </ul>
            </div>
            <div class="col-md-10" v-if="selectedGroup!=null">
                <GroupComponent v-if="selectedGroup.groupInfo.type === 'form' && selectedGroup.flowEngine == null"
                                v-bind:group-value="selectedGroup.groupValues[0]"></GroupComponent>
                <GroupFlowComponent v-else-if="selectedGroup.groupInfo.type === 'form' && selectedGroup.flowEngine != null"
                                    v-bind:group-value="selectedGroup.groupValues[0]"></GroupFlowComponent>
                <GroupTableComponent v-else-if="selectedGroup.groupInfo.type === 'table'"
                                     v-bind:group-model="selectedGroup"></GroupTableComponent>
            </div>
            <div v-else></div>
        </div>
    </div>
</template>

<script>
    import GroupComponent from "../group/GroupComponent";
    import GroupTableComponent from "../group/GroupTableComponent";
    import GroupFlowComponent from "../group/GroupFlowComponent";

    export default {
        name: "CategoryComponent",
        props: ['category'],
        components: { GroupComponent,GroupFlowComponent, GroupTableComponent},
        data() {
            return {selectedGroup: null};
        },
        mounted() {
            this.selectedGroup = this.category.groups[0];
        },
        methods: {
            setSelectedGroup(g) {
                this.selectedGroup = g;
            }
        }
    }
</script>

<style scoped>
    li {
        border-radius: 10px;
        padding: 5px 20px;
        margin-bottom: 5px;
        list-style: none;
        cursor: pointer;
        color: #808080;
    }

    li.active {
        background-color: #9aadff;
        color: white;
    }

</style>