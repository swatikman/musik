import Vuex from "vuex";
import Vue from 'vue'
import songs from "./modules/songs";
import playlists from "./modules/playlists";
import auth from "./modules/auth";
import shared from "./modules/shared";
import search from "./modules/search";

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        songs,
        playlists,
        auth,
        shared,
        search
    }
});

export default store;
