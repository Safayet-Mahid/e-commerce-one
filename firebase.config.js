import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";



const firebaseConfig = {
    apiKey: "AIzaSyAvhYILgOKpdS0gHg3fzEADyT-pb_F3iIc",
    authDomain: "shopmart-ddee1.firebaseapp.com",
    projectId: "shopmart-ddee1",
    storageBucket: "shopmart-ddee1.appspot.com",
    messagingSenderId: "516020161558",
    appId: "1:516020161558:web:6df1fd7d961eae5f093937"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app);
export const storage = getStorage(app)

export default app