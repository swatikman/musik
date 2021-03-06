import Vue from 'vue'
import "@babel/polyfill";
import firebase from 'firebase/app';
import 'firebase/auth';
import App from './App.vue'
import * as firebaseAuth from "./store/firebase-auth";
import router from "./router";
import vSelect from 'vue-select'
import VModal from 'vue-js-modal'
import VueResource from 'vue-resource'
import store from "./store";
require('./font-awesome-icons');

Vue.component('v-select', vSelect);
Vue.use(VModal);
Vue.use(VueResource);

firebase.initializeApp(firebaseAuth.firebaseConfig);

new Vue({
    render: h => h(App),
    store,
    router,
    created() {
        firebaseAuth.startAuthStateChangeListener.call(this);
    }
}).$mount('#app');
