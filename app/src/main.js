import Vue from 'vue'
import App from './App.vue'
import {QuestionModel} from "@/models/QuestionModel";
import {MenuModel} from "@/models/MenuModel";

Vue.config.productionTip = false


// let script1 = '[{id:1,name:"ایران"},{id:2,name:"آسیا"},{id:3,name:"اروپا"}]';
// let script2 = '(function(){return [{id:1,name:"ایران"},{id:2,name:"آسیا"},{id:3,name:"اروپا"}]})()';
// console.log(eval(script2));


new Vue({
    render: h => h(App),
}).$mount('#app')
