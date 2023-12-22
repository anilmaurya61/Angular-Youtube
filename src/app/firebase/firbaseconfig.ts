import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBBHDfjL4p-CBtC5IVpGvq1vbdR57vVvR8",
  authDomain: "fir-31e4a.firebaseapp.com",
  projectId: "fir-31e4a",
  storageBucket: "fir-31e4a.appspot.com",
  messagingSenderId: "463353127591",
  appId: "1:463353127591:web:1d026557217c37ca387182",
  measurementId: "G-K53CLXPXHN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export the app object
export { app };
