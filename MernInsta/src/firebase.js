import firebase from "firebase"

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyD5K1KQ_5yiTpiV99yE_2Ome74DHuPxfn4",
    authDomain: "message-app-7c3d7.firebaseapp.com",
    projectId: "message-app-7c3d7",
    storageBucket: "message-app-7c3d7.appspot.com",
    messagingSenderId: "463715874217",
    appId: "1:463715874217:web:81774e2a7ba9d6f01dc0b8",
    measurementId: "G-PBFWW0VJH7"

})

const db = firebaseApp.firestore();
const auth =firebase.auth();
const storage=firebase.storage();
export default db;
export{auth,storage};