import Vue from 'vue';

import App from './app.vue';
import router from './router/router';
import store from './store/store';

Vue.config.productionTip = false
Vue.config.ignoredElements.push(/^ion-/);

import '../static/css/global.scss'

import { 
  Button, 
  Select,
  Switch,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Radio,
  RadioGroup,
  RadioButton,
 } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'





/**
 * 全局组件注册
 */
// Vue.component('Counter');

Vue.use(Button)
Vue.use(Select);
Vue.use(Switch);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(RadioButton);


new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app');
  


