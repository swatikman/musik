import Vuex from "vuex";
import Vue from 'vue'
import songs from "./modules/songs";
import playlists from "./modules/playlists";

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        songs,
        playlists
    }
});

export default store;
