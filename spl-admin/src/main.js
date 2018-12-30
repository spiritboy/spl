import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import flowRoute from './components/routes/flowRoute/flowRoute'
import entityRoute from './components/routes/entityRoute/entityRoute'
import termRoute from './components/routes/termRoute/oldTermRoute'
import Popover  from 'vue-js-popover'

Vue.config.productionTip = false;

const routes = [
    { path: '/flow', component: flowRoute },
    { path: '/entity', component: entityRoute },
    { path: '/term', component: termRoute },
];
const router = new VueRouter({
    routes // short for `routes: routes`
});
Vue.use(VueRouter)
Vue.use(Popover)

new Vue({
    router: router,
    render: h => h(App),
}).$mount('#app')
