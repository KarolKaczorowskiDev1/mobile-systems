// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
    projectId: 'mobile-systems-2697b',
    appId: '1:843364835690:web:21eb5b5f53775589fd0513',
    storageBucket: 'mobile-systems-2697b.appspot.com',
    apiKey: 'AIzaSyCwpMpOWaThsJnHgatNqZuEb9FbRjSq3mE',
    authDomain: 'mobile-systems-2697b.firebaseapp.com',
    messagingSenderId: '843364835690',
    measurementId: 'G-JYEXKER5JZ',
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();