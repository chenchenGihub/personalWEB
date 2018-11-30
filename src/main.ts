import Vue from 'vue';

import App from './app.vue';
import router from './router/router';
import store from './store/store';
import '../static/css/global.scss'

import { Button, Select,Switch } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'



Vue.config.productionTip = false

Vue.config.ignoredElements.push(/^ion-/);

/**
 * 全局组件注册
 */
// Vue.component('Counter');

Vue.use(Button)
Vue.use(Select);
Vue.use(Switch);

new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app');
  


