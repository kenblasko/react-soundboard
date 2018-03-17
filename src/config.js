import firebase from 'firebase'

export const maxFileSize = 1048576

export default firebase.initializeApp({
    apiKey: "AIzaSyB5SsmxWb-8xsOygbwaVRr4ywMAqoSCgW0",
    authDomain: "cbt-soundboard.firebaseapp.com",
    databaseURL: "https://cbt-soundboard.firebaseio.com",
    projectId: "cbt-soundboard",
    storageBucket: "gs://cbt-soundboard.appspot.com/",
    messagingSenderId: "862576314540"
})