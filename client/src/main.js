import Vue from 'vue'
import firebase from 'firebase/app';
import 'firebase/auth';
import App from './App.vue'
import * as firebaseAuth from "./store/firebase-auth";
import router from "./components/router";
require('./font-awesome-icons');

firebase.initializeApp(firebaseAuth.firebaseConfig);
firebaseAuth.startAuthStateChangeListener();

new Vue({
  render: h => h(App),
  router
}).$mount('#app');
