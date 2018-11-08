import Vue from 'vue';
import App from './app.vue';
import { Ionic, IonicVueRouter, IonicAPI } from '@modus/ionic-vue'
import Routes from './router/router';

import '../static/css/global.scss'

Ionic.init();

Vue.use(IonicAPI)

Vue.config.productionTip = false

Vue.config.ignoredElements.push(/^ion-/)

new Vue({
    el: '#app',
    router: Routes,
    render: h => h(App)
})


