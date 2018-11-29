<template>
    <div v-if="menu!=null" class="container">
        <h1 style="color:gray">{{menu.title}}</h1>
        <div v-for="group in menu.groups">
            <GroupTableDetailsComponent v-if="group.groupInfo.type==='table'" v-bind:group-model="group"/>
            <GroupDetailsComponent v-if="group.groupInfo.type==='form'" v-bind:group-value="group.groupValues[0]"
                                   v-bind:is-details="false"/>
        </div>
    </div>
</template>

<script>
    import GroupTableComponent from "@/components/group/GroupTableComponent";
    import GroupDetailsComponent from "@/components/group/GroupViewComponent";
    import GroupTableDetailsComponent from "@/components/group/GroupTableViewComponent";

    export default {
        name: "MenuDetailsComponent",
        components: {GroupTableDetailsComponent, GroupDetailsComponent, GroupTableComponent},
        props: ['menu'],
        data() {
            return {};
        }
    }
</script>

<style scoped>

</style>