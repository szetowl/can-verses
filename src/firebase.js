// firebase version 9 @9.5.0
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

// Your web app's Firebase configuration
  //Project Name : InstaApp / CanVerse 福音粵曲
const firebaseConfig = {
    apiKey: "AIzaSyCjSsR7NHgAEnnb8E4bEQqafHLd63BddTs",
    authDomain: "instaapp-6d08b.firebaseapp.com",
    databaseURL: "https://instaapp-6d08b.firebaseio.com",
    projectId: "instaapp-6d08b",
    storageBucket: "instaapp-6d08b.appspot.com",
    messagingSenderId: "38860074911",
    appId: "1:38860074911:web:3dbe00b70b3ef539d997aa"
  };
  // Initialize Firebase
 const app=firebase.initializeApp(firebaseConfig);

 export const songsDB = app.firestore();

 export const storage = app.storage();

//  export default firebase;
 