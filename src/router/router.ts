import Vue from 'vue';
import Router from 'vue-router';
import { IonicVueRouter } from '@modus/ionic-vue'
import Dashboard from '../pages/dashboard.vue';
import Edit from '../pages/edit.vue';

Vue.use(IonicVueRouter);


let routes = {
    routes:[
        {
            name:'main',
            path:'/main',
            component:Dashboard,
        },
        {
            name:'edit',
            path:'/edit',
            component:Edit,
        }
    ]
}

export default new IonicVueRouter(routes)