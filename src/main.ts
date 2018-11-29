import Vue from 'vue';
import App from './app.vue';
import router from './router/router';
import store from './store/store';

import '../static/css/global.scss'



Vue.config.productionTip = false

Vue.config.ignoredElements.push(/^ion-/);

/**
 * 全局组件注册
 */
Vue.component('Counter');


new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
  


