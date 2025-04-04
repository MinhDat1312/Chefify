import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

const firebaseConfig = {
    apiKey: 'AIzaSyB3kxAi4gko28G6bPQjbC4VHeSXEMU4buI',
    authDomain: 'chefify-6fc50.firebaseapp.com',
    projectId: 'chefify-6fc50',
    storageBucket: 'chefify-6fc50.firebasestorage.app',
    messagingSenderId: '779342035101',
    appId: '1:779342035101:web:1da111bd8065d0216e3c74',
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;
