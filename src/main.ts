import Vue from 'vue';
import App from './app.vue';
import Routes from './router/router';

import '../static/css/global.scss'



Vue.config.productionTip = false

Vue.config.ignoredElements.push(/^ion-/);

/**
 * 全局组件注册
 */
Vue.component('');

new Vue({
    el: '#app',
    router: Routes,
    render: h => h(App)
})


