import firebase from 'firebase/app';
import 'firebase/auth';

export function startAuthStateChangeListener() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            user.getIdToken()
                .then(token => {
                    localStorage.setItem('token', token)
                })
                .catch(e => {
                })
        } else {
            localStorage.clear();
        }
    });
}

export const firebaseConfig = {
  apiKey: "AIzaSyCjXl1AtoIEBSClUwUqQ9Rs-SXsBf0tfJ8",
  authDomain: "musik-e39f5.firebaseapp.com",
  databaseURL: "https://musik-e39f5.firebaseio.com",
  projectId: "musik-e39f5",
  storageBucket: "musik-e39f5.appspot.com",
  messagingSenderId: "926476793568",
  appId: "1:926476793568:web:3375a80808844a64"
};
