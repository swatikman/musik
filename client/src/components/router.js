import Vue from 'vue';
import VueRouter from 'vue-router';
import SignIn from './SignIn';
import MainPage from "./MainPage";
import Playlists from "./Playlists";
import MyMusic from "./MyMusic/MyMusic";
import NewPlaylist from "./MyMusic/NewPlaylist";

Vue.use(VueRouter);

const vueRouter = new VueRouter({
    routes: [
        {
            path: '/sign-in',
            name: 'sign-in',
            component: SignIn,
            meta: {
                guest: true
            }
        }, {
            path: '/',
            name: 'main',
            component: MainPage
        }, {
            path: '/playlists',
            name: 'playlists',
            component: Playlists
        },{
            path: '/my-music',
            name: 'my-music',
            component: MyMusic,
            meta: {
                requiresAuth: true
            }
        },{
            path: '/new-playlist',
            name: '/new-playlist',
            component: NewPlaylist,
            meta: {
                requiresAuth: true
            }
        },
    ]
});

vueRouter.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (localStorage.getItem("token")) {
            next()
        } else {
            next({
                name : 'sign-in'
            })
        }
    } else {
        next();
    }
});

export default vueRouter
