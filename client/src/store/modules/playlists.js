import {BASE_URL} from "../utils";
import axios from "axios";

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
        addMyPlaylists (state, payload) {
            state.myPlaylists.push(...payload.data);
        }
    },
    actions: {
        fetchMyPlaylists({commit}, payload) {
            axios.get(`${BASE_URL}/api/playlists`, {
                    headers: {
                        token: localStorage.getItem("token")
                    }
                })
                .then(({data}) => {
                    commit('addMyPlaylists', {data});
                })
                .catch(e => {
                    console.log(3, e);
                });
        },
        addTrackToPlaylist({commit}, {playlistId, songId}) {
            return axios.put(`${BASE_URL}/api/playlists/${playlistId}/songs/${songId}`, {
                    headers: {
                        token: localStorage.getItem("token")
                    }
                })
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
