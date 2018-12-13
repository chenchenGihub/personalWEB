import Vue from 'vue';
import Router from 'vue-router';
import Edit from '../views/edit.vue';

Vue.use(Router);


let routes = {
    routes:[
        {
            name:'main',
            path:'/main',
            component:() => import('../views/dashboard.vue')
        },
        {
            name:'three',
            path:'/threeDemo',
            component:() => import('../views/threedemo.vue')
        },
        {
            name:'edit',
            path:'/',
            component:Edit,
        }
    ]
}

export default new Router(routes)