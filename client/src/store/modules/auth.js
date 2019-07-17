import firebase from 'firebase/app';
import 'firebase/auth';
import axios from "axios";
import {BASE_URL} from "../utils";

export default {
    state: {
        user: undefined
    },
    mutations: {
        SET_USER (state, user) {
            state.user = user;
        }
    },
    actions: {
        async signIn({commit}, {email, password}) {
            commit('SET_LOADING', true);
            try {
                const {user} = await firebase.auth().signInWithEmailAndPassword(email, password);
                commit('SET_USER', user);
            } catch(e) {
                console.log(e);
                commit('SET_ERROR', e)
            }
            commit('SET_LOADING', false)
        },
        async signUp({commit}, body) {
            commit('SET_LOADING', true);
            try {
                const result = await axios.post(`${BASE_URL}/api/account/sign-up`, body)
            } catch (e) {
                commit('SET_ERROR', e)
            }
            commit('SET_LOADING', false);
        },

        async autoSignIn({commit}, user) {
            commit('SET_USER', user)
        },
        async getUserToken({state}) {
            return new Promise((resolve, reject) => {
                if (state.user) {
                    resolve(state.user.getIdToken());
                } else {
                    reject(new Error('Not logged in'))
                }
            });
        },
        async logout({commit}) {
            await firebase.auth().signOut();
            commit('SET_USER', null)
        }
    },
    getters: {
        getCurrentUser(state) {
            return () => state.user
        }
    }
}
