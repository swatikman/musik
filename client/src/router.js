import Vue from 'vue';
import VueRouter from 'vue-router';
import SignIn from './components/SignIn';
import MainPage from "./components/MainPage";
import Playlists from "./components/MyPlaylists";
import MyMusic from "./components/MyMusic/MyMusic";
import NewPlaylist from "./components/MyMusic/NewPlaylist";
import Playlist from "./components/Playlist/Playlist";

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
        }, {
            path: '/playlist/:id',
            name: 'playlist',
            component: Playlist
        }, {
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
