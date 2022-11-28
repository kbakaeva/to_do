import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC9gdwgKS0yT-uRG8AhMwHK9nBhknUnZjU",
    authDomain: "todowomenup.firebaseapp.com",
    projectId: "todowomenup",
    storageBucket: "todowomenup.appspot.com",
    messagingSenderId: "852235687345",
    appId: "1:852235687345:web:a70e2e6d00c60bec719990",
    measurementId: "G-NKSCQNT705"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);