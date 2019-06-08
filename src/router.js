import Vue from 'vue'
import Router from 'vue-router'
import Index from "./views/Index";
import Login from "./views/user/Login";
import Register from "./views/user/Register";
import Detail from "./views/Detail";
import Post from "./views/Post";
import Personal from "./views/Personal";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            component: Index
        },
        {
            path: '/detail/:id',
            name: 'detail',
            component: Detail
        },
        {
            path: '/post',
            name: 'post',
            component: Post
        },
        {
            path: '/personal',
            name: 'personal',
            component: Personal
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        }
    ]
})
