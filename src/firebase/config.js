import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCJSIYjlnfMtKwhmCqiMbLVf-o37DQw1_w",
  authDomain: "my-chat-app-3d940.firebaseapp.com",
  projectId: "my-chat-app-3d940",
  storageBucket: "my-chat-app-3d940.appspot.com",
  messagingSenderId: "663861583074",
  appId: "1:663861583074:web:a537210fb369b51c4312bb",
  measurementId: "G-435ZJQ0G8E",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const db = getFirestore(app);

export { db, auth };
