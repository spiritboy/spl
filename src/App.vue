<template>
    <div id="app">
        <input type="checkbox" v-model="isDetails"/>
        <MenuDetailsComponent v-if="isDetails !== true"  v-bind:menu="menu"/>
        <MenuComponent v-else v-bind:menu="menu"/>
    </div>
</template>

<script>
    import MenuComponent from "@/components/menu/MenuComponent";
    import {MenuModel} from "@/models/MenuModel";
    import {spl} from "@/api/spl";
    import MenuDetailsComponent from "@/components/menu/MenuViewComponent";

    let context = {menu: null,isDetails:true};
    spl.menu(1).then(function (response) {
        context.menu = new MenuModel().deserialize(response.data);
        context.menu.init();
    });
    export default {
        name: 'app',
        components: {
            MenuDetailsComponent,
            MenuComponent
        },
        data() {
            return context;
        }
    }
</script>

<style>
    #app {
        font-family: 'b koodak';
        margin-top: 50px;
    }
</style>
