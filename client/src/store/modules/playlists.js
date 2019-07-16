import {BASE_URL} from "../utils";
import axios from "axios";
import {getUserToken} from "../firebase-auth";
import Vue from "vue";

export default {
    state: {
        myPlaylists: [{
            name: 'MY FAVOURITE SONGS',
            username: 'Jacob Peralta99',
            songs: [
                {
                    id: 1,
                    name: '123',
                    singer: '123',
                    length: 180
                }, {
                    id: 2,
                    name: '123',
                    singer: '123',
                    length: 180
                }, {
                    id: 3,
                    name: '123',
                    singer: '123',
                    length: 180
                }, {
                    id: 4,
                    name: '123',
                    singer: '123',
                    length: 180
                }, {
                    id: 5,
                    name: '123',
                    singer: '123',
                    length: 180
                }
            ]
        }]
    },
    mutations: {
        SET_MY_PLAYLISTS (state, {data}) {
            state.myPlaylists = data;
        },
        TOGGLE_SONG_IN_PLAYLIST(state, {data}) {
            const index = state.myPlaylists.findIndex(playlist => data.id === playlist.id);
            Vue.set(state.myPlaylists, index, data);
        }
    },
    actions: {
        fetchPlaylist(context, {id}) {
            return getUserToken()
                .then(token => {
                    return axios.get(`${BASE_URL}/api/playlists/${id}`, {headers: {token}})
                })
        },

        fetchMyPlaylists({commit}, payload) {
            return new Promise(async (resolve, reject) => {
                try {
                    const token = await getUserToken();
                    const playlists = await axios.get(`${BASE_URL}/api/playlists`, {headers: {token}});
                    commit('SET_MY_PLAYLISTS', {data: playlists.data});
                    resolve(playlists)
                } catch (e) {
                    reject(e);
                }

            })
        },

        toggleSongInPlaylist({commit, state}, {playlistId, songId}) {
            return new Promise(async (resolve, reject) => {
                const token = await getUserToken();
                try {
                    const {data} = await axios.put(`${BASE_URL}/api/playlists/${playlistId}/songs/${songId}`,
                        {}, {headers: {token}});
                    commit('TOGGLE_SONG_IN_PLAYLIST', {data});
                    resolve(data);
                } catch (e) {
                    reject(e);
                }
            });
        }
    },
    getters: {
        myPlaylists(state) {
            return () => {
                return state.myPlaylists
            };
        },
        popularPlaylists(state) {
            return {data: 123}
        }
    }
}
