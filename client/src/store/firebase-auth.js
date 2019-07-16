import firebase from 'firebase/app';
import 'firebase/auth';

let currentUser = null;

export function startAuthStateChangeListener() {
    firebase.auth().onAuthStateChanged((user) => {
        currentUser = user;
    });
}

export const getUserToken = () => {
    return new Promise((resolve, reject) => {
        if (currentUser) {
            resolve(currentUser.getIdToken());
        }
        firebase.auth().onAuthStateChanged((user) => {
            currentUser = user;
            if (currentUser) {
                resolve(currentUser.getIdToken());
            } else {
                reject();
            }
        })
    });
};

export const firebaseConfig = {
  apiKey: "AIzaSyCjXl1AtoIEBSClUwUqQ9Rs-SXsBf0tfJ8",
  authDomain: "musik-e39f5.firebaseapp.com",
  databaseURL: "https://musik-e39f5.firebaseio.com",
  projectId: "musik-e39f5",
  storageBucket: "musik-e39f5.appspot.com",
  messagingSenderId: "926476793568",
  appId: "1:926476793568:web:3375a80808844a64"
};
