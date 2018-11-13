import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from '../views/dashboard.vue';
import Edit from '../views/edit.vue';

Vue.use(Router);


let routes = {
    routes:[
        {
            name:'main',
            path:'/main',
            component:Dashboard,
        },
        {
            name:'edit',
            path:'/',
            component:Edit,
        }
    ]
}

export default new Router(routes)