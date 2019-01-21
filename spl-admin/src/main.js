import _ from 'lodash';
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import flowRoute from './components/routes/flowRoute/flowRoute'
import classRoute from './components/routes/termRoute/classRoute'
import termRoute from './components/routes/termRoute/termRoute'
import entityRoute from './components/routes/entityRoute/entityRoute'
import Popover  from 'vue-js-popover'
import './directives/directives'
Vue.config.productionTip = false;

const routes = [
    { path: '/flow', component: flowRoute },
    { path: '/entity', component: entityRoute },
    { path: '/term/term', component: termRoute },
    { path: '/term/class', component: classRoute },
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
