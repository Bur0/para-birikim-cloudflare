import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDOCAbC123dEf456GhI789jKl012-MnoPQr',
  authDomain: 'parakredim-7c769.firebaseapp.com',
  projectId: 'parakredim-7c769',
  storageBucket: 'parakredim-7c769.appspot.com',
  messagingSenderId: '115956467680422063521',
  appId: '1:115956467680422063521:web:abc123def456',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
