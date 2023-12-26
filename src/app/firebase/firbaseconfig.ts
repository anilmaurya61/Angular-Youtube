import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCXxbRtugVenZXCC_l5i9jQfxrnjFxVnE8",
  authDomain: "fir-ebfc7.firebaseapp.com",
  projectId: "fir-ebfc7",
  storageBucket: "fir-ebfc7.appspot.com",
  messagingSenderId: "1066877393025",
  appId: "1:1066877393025:web:b460884e1271f0f8611580",
  measurementId: "G-YJ4NN97CCL"
};

// const firebaseConfig = {
//   apiKey: "AIzaSyB7LUqGYFGgpjJ4LsngXPNZEhzp8VJI7pg",
//   authDomain: "clone-5c471.firebaseapp.com",
//   projectId: "clone-5c471",
//   storageBucket: "clone-5c471.appspot.com",
//   messagingSenderId: "405552786108",
//   appId: "1:405552786108:web:4b77b2414729e62dbb3eb9",
//   measurementId: "G-7602139PEZ"
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app)

// Export the app object
export { app, db };
