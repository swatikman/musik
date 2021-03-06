import Vue from 'vue';
import VueRouter from 'vue-router';
import SignIn from './components/SignIn';
import MainPage from "./components/MainPage/MainPage";
import Playlists from "./components/MyMusic/MyPlaylists";
import MyMusic from "./components/MyMusic/MyMusic";
import NewPlaylist from "./components/MyMusic/ModalNewPlaylist";
import SignUp from "./components/SignUp";
import SearchPage from "./components/Search/SearchPage";
import PlaylistPage from "./components/Playlist/PlaylistPage";
import MyProfile from "./components/MyProfile/MyProfile";

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
            path: '/sign-up',
            name: 'sign-up',
            component: SignUp,
            meta: {
                guest: true
            }
        }, {
            path: '/',
            name: 'main',
            component: MainPage
        }, {
            path: '/my-profile',
            name: 'user',
            component: MyProfile
        }, {
            path: '/search',
            name: 'search',
            component: SearchPage,
        }, {
            path: '/playlist/:id',
            name: 'playlist',
            component: PlaylistPage,
        }, {
            path: '/playlists',
            name: 'playlists',
            component: Playlists
        }, {
            path: '/my-music',
            name: 'my-music',
            component: MyMusic,
            meta: {
                requiresAuth: true
            }
        }, {
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
        if (localStorage.getItem("loggedIn")) {
            next()
        } else {
            next({
                name: 'sign-in'
            })
        }
    } else {
        next();
    }
});

export default vueRouter
