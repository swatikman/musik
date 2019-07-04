import Vue from 'vue';
import VueRouter from 'vue-router';
import SignIn from './SignIn';
import MainPage from "./MainPage";
import Playlists from "./Playlists";

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: '/sign-in',
      name: 'sign-in',
      component: SignIn
    }, {
      path: '/',
      name: 'main',
      component: MainPage
    }, {
      path: '/playlists',
      name: 'playlists',
      component: Playlists
    },
  ]
})
