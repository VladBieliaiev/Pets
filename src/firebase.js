import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);
export const auth = getAuth(app)




// env{
//     REACT_APP_FIREBASE_API_KEY = AIzaSyCCrrnNtOsVB2wmVAdxNIUj-MGKWaDPz40
//     REACT_APP_FIREBASE_AUTH_DOMAIN = my-project-ceaa4.firebaseapp.com
//     REACT_APP_FIREBASE_PROJECT_ID = my-project-ceaa4
//     REACT_APP_FIREBASE_STORAGE_BUCKET = my-project-ceaa4.appspot.com
//     REACT_APP_FIREBASE_MESSAGING_SENDER_ID = 567099212836
//     REACT_APP_FIREBASE_APP_ID = 1:567099212836:web:e43ce1092a499961b304b1
//     REACT_APP_FIREBASE_MEASUREMENT_ID = G-MY2WLKJCR2
// }