import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBEZduEyuGV3GBHBdPN77wAVscCUNZSCH0",
  authDomain: "minoblog-e797f.firebaseapp.com",
  projectId: "minoblog-e797f",
  storageBucket: "minoblog-e797f.appspot.com",
  messagingSenderId: "798642692854",
  appId: "1:798642692854:web:85a5128ca71aaba11442d7"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export { db }