import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBpDiLMeDgtY74-bBVSW-WUs_GctOTpePg",
  authDomain: "tpfproj-6c91b.firebaseapp.com",
  projectId: "tpfproj-6c91b",
  storageBucket: "tpfproj-6c91b.firebasestorage.app",
  messagingSenderId: "541467197383",
  appId: "1:541467197383:web:b3cc72ba6734a401ad63e2",
  measurementId: "G-RRW7HNVXC3",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
