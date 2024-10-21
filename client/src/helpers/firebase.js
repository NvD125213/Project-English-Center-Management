// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZ7aE9qiYCcQowE8kJjGq4R7pe-RC-Zcs",
  authDomain: "englishcenter-4ae99.firebaseapp.com",
  projectId: "englishcenter-4ae99",
  storageBucket: "englishcenter-4ae99.appspot.com",
  messagingSenderId: "928381708564",
  appId: "1:928381708564:web:e4e92772a3869848e53a01",
  measurementId: "G-RENQRTRE15"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// Export các hàm cần thiết
export { storage, ref, uploadBytesResumable, getDownloadURL };
