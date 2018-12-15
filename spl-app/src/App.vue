<template>
    <div id="app">
        <MenuDetailsComponent v-if="isDetails === true"  v-bind:menu="menu"/>
        <MenuComponent v-else v-bind:menu="menu"/>
    </div>
</template>

<script>
    import MenuComponent from "@/components/menu/MenuComponent";
    import {MenuModel} from "@/models/MenuModel";
    import {spl} from "@/api/spl";
    import MenuDetailsComponent from "@/components/menu/view/MenuViewComponent";
    import ReportComponent from "./components/report/ReportComponent";

    let context = {menu: null,isDetails:true};
    spl.menu(1).then(function (response) {
        context.menu = new MenuModel().deserialize(response.data.menu);
        context.menu.init();
    });
    export default {
        name: 'app',
        components: {
            ReportComponent,
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
    }
    .select2.select2-container{
        width: 100%!important;
    }
</style>
