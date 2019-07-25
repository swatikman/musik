import {BASE_URL, loadingPromise} from "../utils";
import axios from "axios";
import Vue from "vue";

const LOADER_PLAYLIST = 'LOADER_PLAYLSIT';

export default {
    state: {
        myPlaylists: [],
        playlists: [{
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
        playlist: null,
        error: null
    },
    mutations: {
        SET_PLAYLISTS (state, {data}) {
            state.playlists = data;
        },
        SET_MY_PLAYLISTS (state, {data}) {
            state.myPlaylists = data;
        },
        TOGGLE_SONG_IN_PLAYLIST(state, {data}) {
            const index = state.playlists.findIndex(playlist => data.id === playlist.id);
            Vue.set(state.playlists, index, data);
        },
        SET_PLAYLIST (state, playlist) {
            state.playlist = playlist;
        },
        SET_ERROR (state, error) {
            state.error = error;
        }
    },
    actions: {
        fetchPlaylist({dispatch, commit}, {id}) {
            dispatch('clearPlaylist');
            return loadingPromise(commit, LOADER_PLAYLIST, async(resolve, reject) => {
                try {
                    const token = await dispatch('getUserToken');
                    const headers = {};
                    if (token) {
                        headers.token = token;
                    }
                    const {data} = await axios.get(`${BASE_URL}/api/playlists/${id}`, {headers});
                    commit('SET_PLAYLIST', data);
                    resolve(data)
                } catch (e) {
                    const {data, status} = e.response;
                    commit('SET_ERROR', {data, status});
                    // reject(e);
                }
            });
        },

        fetchMyPlaylists({commit, dispatch}, payload) {
            return loadingPromise(commit, LOADER_PLAYLIST,
                async (resolve, reject) => {
                try {
                    const token = await dispatch('getUserToken');
                    const playlists = await axios.get(`${BASE_URL}/api/playlists?type=my`, {headers: {token}});
                    commit('SET_MY_PLAYLISTS', {data: playlists.data});
                    resolve(playlists)
                } catch (e) {
                    reject(e);
                }
            })
        },

        fetchPopularPlaylists({commit}) {
            return loadingPromise(commit, LOADER_PLAYLIST,
                async (resolve, reject) => {
                    try {
                        const playlists = await axios.get(`${BASE_URL}/api/playlists?type=popular`);
                        commit('SET_PLAYLISTS', {data: playlists.data});
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
            return loadingPromise(commit, LOADER_PLAYLIST, async (resolve, reject) => {
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
                    const res = await axios.post(`${BASE_URL}/api/playlists`, data,{headers: {token}});
                    resolve(res.data)
                } catch (e) {
                    reject(e);
                }
            });
        },

        editPlaylist({commit, dispatch}, {id, data}) {
            return loadingPromise(commit, LOADER_PLAYLIST,
                async (resolve, reject) => {
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
            return loadingPromise(commit, LOADER_PLAYLIST,
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
            commit('SET_PLAYLIST', null);
            commit('SET_ERROR', null);
        }
    },
    getters: {
        getPlaylists(state) {
            return () => {
                return state.playlists
            };
        },
        getMyPlaylists(state) {
            return () => {
                return state.myPlaylists
            };
        },
        isPlaylistLoading(state, getters) {
            return () => getters.hasLoader(LOADER_PLAYLIST)
        },
        getPlaylist(state) {
            return () => state.playlist
        },
        getError(state) {
            return () => state.error;
        }
    }
}
