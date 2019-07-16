import {getUserToken} from "../firebase-auth";
import axios from "axios";
import {BASE_URL} from "../utils";

export default {
    state: {
        mySongs: []
    },
    mutations: {
        ADD_MY_SONGS(state, {data}) {
            state.mySongs.push(...data)
        }
    },
    actions: {
        async fetchMySongs({commit}, payload) {
            const token = await getUserToken();
            const {data} = await axios.get(`${BASE_URL}/api/songs?type=my`, {headers: {token}});
            commit('ADD_MY_SONGS', {data})
        },

        async uploadSong({commit}, {formData}) {
            const token = await getUserToken();
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
