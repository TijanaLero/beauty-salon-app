import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyDse8O-MCbyLevv9BR5GxlM7FWQGe24xk8",
  authDomain: "beauty-salon-app-f88f8.firebaseapp.com",
  databaseURL: "https://beauty-salon-app-f88f8-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "beauty-salon-app-f88f8",
  storageBucket: "beauty-salon-app-f88f8.firebasestorage.app",
  messagingSenderId: "598597090754",
  appId: "1:598597090754:web:97d0376cb29b15b2a6ea5b"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const DB_URL = firebaseConfig.databaseURL;