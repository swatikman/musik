import {getUserToken} from "../firebase-auth";
import axios from "axios";
import {BASE_URL, loadingPromise} from "../utils";

export default {
    state: {
        query: '',
        searchOption: '',
        searchResults: []
    },
    mutations: {
        SET_QUERY(state, query) {
            state.query = query
        },
        SET_SEARCH_OPTION(state, searchOption) {
            state.searchOption = searchOption;
        },
        SET_SEARCH_RESULT(state, data) {
            state.searchResults = data;
        }
    },
    actions: {
        async fetchSearchAll({commit, dispatch, state}) {
            console.log(2);
            return loadingPromise(commit, 'SEARCH_ALL',
                async (resolve, reject) => {
                try  {
                    const token = await dispatch('getUserToken');
                    const {data} = await axios.get(`${BASE_URL}/api/search?q=${state.query}&type=${state.searchOption}`,
                        {headers: {token}});
                    commit('SET_SEARCH_RESULT', data);
                } catch (e) {
                    reject(e);
                }
            })
        },

        async fetchSearchSongs() {

        },

        async fetchSearchPlaylists() {

        },

        async setQuery({commit}, {query}) {
            commit('SET_QUERY', query)
        },

        async setSearchOption({commit}, {searchOption}) {
            console.log(123, searchOption);
            commit('SET_SEARCH_OPTION', searchOption)
        },

        async uploadSong({commit, dispatch}, {formData}) {
        }
    },
    getters: {
        getSearchQuery(state) {
            return () => state.query
        },
        getSearchResults(state) {
            return () => state.searchResults
        },
        getSearchOption(state) {
            return () => state.searchOption
        }
    }
}
