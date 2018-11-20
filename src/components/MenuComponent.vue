<template>
    <div class="container row">
        <div class="col-md-3">
            <h1>{{menu.title}}</h1>
            <ul>
                <li v-on:click="setSelectedGroup(group)" v-bind:class="{active:group === selectedGroup}" v-for="group in menu.groups">{{group.title}}</li>
            </ul>
        </div>
        <div class="col-md-9">
            <GroupComponent v-bind:group-item="selectedGroup"></GroupComponent>
        </div>
    </div>
</template>

<script>
    import GroupComponent from "./GroupComponent";
    import {spl} from "@/api/spl";

    let context = {
        menu: new spl.menu(1),
        selectedGroup: null
    };

    export default {
        name: 'MenuComponent',
        components: {GroupComponent},
        data() {
            return context;
        },
        methods: {
            setSelectedGroup(g) {
                context.selectedGroup = g;
            }
        }
    }
</script>

<style scoped>
li{
    border-radius: 10px;
    padding: 5px;
    margin-bottom: 5px;
    list-style: none;
    cursor: pointer;
}
    li.active{
        background-color: #9aadff;
    }
</style>
