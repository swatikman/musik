import Vuex from "vuex";
import Vue from 'vue'
import songs from "./modules/songs";
import playlists from "./modules/playlists";
import auth from "./modules/auth";
import shared from "./modules/shared";

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        songs,
        playlists,
        auth,
        shared
    }
});

export default store;
