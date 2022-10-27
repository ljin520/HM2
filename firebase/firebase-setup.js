// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import {apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId} from "react-native-dotenv"
// // Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyB7RStYUVB8O7w6vf5wWJFIOQHxUzNdPYQ",
//     authDomain: "hw2-b4ba2.firebaseapp.com",
//     projectId: "hw2-b4ba2",
//     storageBucket: "hw2-b4ba2.appspot.com",
//     messagingSenderId: "1029084567668",
//     appId: "1:1029084567668:web:c9b3e61be98af7a3f85921",
// };

// let myApp = initializeApp(firebaseConfig);

// export const firestore = getFirestore(myApp);
// console.log(module.exports);


import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { apiKey, authDomain, projectId, storageBucket, messagingSenderId, measurementId, appId } from "react-native-dotenv";

//Your web app's Firebase configuration. 
// Copy this object from Firebase console
const firebaseConfig = {
    apiKey: "AIzaSyB7RStYUVB8O7w6vf5wWJFIOQHxUzNdPYQ",
    authDomain: "hw2-b4ba2.firebaseapp.com",
    projectId: "hw2-b4ba2",
    storageBucket: "hw2-b4ba2.appspot.com",
    messagingSenderId: "1029084567668",
    appId: "1:1029084567668:web:c9b3e61be98af7a3f85921",
    measurementId: 'G-measurement-id',
    appId: appId
  };

const myApp = initializeApp(firebaseConfig);
export const firestore = getFirestore(myApp);