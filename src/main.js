import Vue from 'vue'
import App from './App.vue'
import {QuestionModel} from "@/models/QuestionModel";
import {MenuModel} from "@/models/MenuModel";

Vue.config.productionTip = false





new Vue({
    render: h => h(App),
}).$mount('#app')
