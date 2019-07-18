import {BASE_URL} from "../utils";
import axios from "axios";
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
        }],
        playlist: null
    },
    mutations: {
        SET_MY_PLAYLISTS (state, {data}) {
            state.myPlaylists = data;
        },
        TOGGLE_SONG_IN_PLAYLIST(state, {data}) {
            const index = state.myPlaylists.findIndex(playlist => data.id === playlist.id);
            Vue.set(state.myPlaylists, index, data);
        },
        SET_PLAYLIST (state, playlist) {
            state.playlist = playlist;
        }
    },
    actions: {
        fetchPlaylist({dispatch, commit}, {id}) {
            return new Promise(async(resolve, reject) => {
                try {
                    const token = await dispatch('getUserToken');
                    const {data} = await axios.get(`${BASE_URL}/api/playlists/${id}`, {headers: {token}})
                    commit('SET_PLAYLIST', data);
                    resolve(data)
                } catch (e) {
                    // reject(e);
                }
            });
        },

        fetchMyPlaylists({commit, dispatch}, payload) {
            return new Promise(async (resolve, reject) => {
                try {
                    const token = await dispatch('getUserToken');
                    const playlists = await axios.get(`${BASE_URL}/api/playlists`, {headers: {token}});
                    commit('SET_MY_PLAYLISTS', {data: playlists.data});
                    resolve(playlists)
                } catch (e) {
                    reject(e);
                }

            })
        },

        toggleSongInPlaylist({commit, dispatch}, {playlistId, songId}) {
            return new Promise(async (resolve, reject) => {
                try {
                    const token = await dispatch('getUserToken');
                    const {data} = await axios.put(`${BASE_URL}/api/playlists/${playlistId}/songs/${songId}`,
                        {}, {headers: {token}});
                    commit('TOGGLE_SONG_IN_PLAYLIST', {data});
                    resolve(data);
                } catch (e) {
                    reject(e);
                }
            });
        },

        generateSharePlaylistLink({commit, dispatch}, {playlistId}) {
            return loadingPromise(commit, async (resolve, reject) => {
                try {
                    const token = await dispatch('getUserToken');
                    const {data} = await axios.post(`${BASE_URL}/api/playlists/${playlistId}/sharedLink`,
                        {}, {headers: {token}});
                    resolve(data);
                } catch (e) {
                    reject(e)
                }
            })
        },

        createPlaylist({dispatch, commit}, {data}) {
            return new Promise(async(resolve, reject) => {
                try {
                    const token = await dispatch('getUserToken');
                    // console.log(data)
                    const res = await axios.post(`${BASE_URL}/api/playlists`, data,{headers: {token}});
                    // commit('SET_PLAYLIST', res.data);
                    resolve(res.data)
                } catch (e) {
                    reject(e);
                }
            });
        },

        editPlaylist({commit, dispatch}, {id, data}) {
            return loadingPromise(commit, async (resolve, reject) => {
                try {
                    const token = await dispatch('getUserToken');
                    const res = await axios.put(`${BASE_URL}/api/playlists/${id}`,
                        data, {headers: {token}});
                    commit('SET_PLAYLIST', res.data);
                    resolve(res.data);
                } catch (e) {
                    reject(e)
                }
            })
        },

        deletePlaylist({commit, dispatch}, {id}) {
            return loadingPromise(commit,
                async (resolve, reject) => {
                    try {
                        const token = await dispatch('getUserToken');
                        const res = await axios.delete(`${BASE_URL}/api/playlists/${id}`,{headers: {token}});
                        dispatch('clearPlalist');
                        resolve(res)
                    } catch (e) {
                        reject(e)
                    }
                });
        },

        clearPlaylist({commit}) {
            commit('SET_PLAYLIST', null)
        }
    },
    getters: {
        myPlaylists(state) {
            return () => {
                return state.myPlaylists
            };
        },
        getPlaylist(state) {
            return () => state.playlist
        }
    }
}

const loadingPromise = (commit, promise) => {
    return new Promise(async (resolve, reject) => {
        commit('SET_LOADING', true);
        try {
            const data = await new Promise(promise);
            resolve(data);
        } catch (e) {
            reject(e)
        }
        commit('SET_LOADING', false);
    })
};
