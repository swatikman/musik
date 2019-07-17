import {getUserToken} from "../firebase-auth";
import axios from "axios";
import {BASE_URL} from "../utils";

export default {
    state: {
        mySongs: []
    },
    mutations: {
        SET_MY_SONGS(state, {data}) {
            state.mySongs = data
        }
    },
    actions: {
        async fetchMySongs({commit, dispatch}, payload) {
            const token = await dispatch('getUserToken');
            const {data} = await axios.get(`${BASE_URL}/api/songs?type=my`, {headers: {token}});
            commit('SET_MY_SONGS', {data})
        },

        async fetchPopularSongs() {
            const {data} = await axios.get(`${BASE_URL}/api/songs?type=popular`);
        },

        async uploadSong({commit, dispatch}, {formData}) {
            const token = await dispatch('getUserToken');
            return axios.post(`${BASE_URL}/api/songs`, formData,
                {headers: {
                    'Content-Type': 'multipart/form-data',
                    token
                }})
        }
    },
    getters: {
        getMySongs (state) {
            return () => state.mySongs
        },
        getPopularSongs () {

        }
    }
}
