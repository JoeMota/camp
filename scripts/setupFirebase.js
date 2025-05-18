import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function setupDatabase() {
  try {
    // Create jobs collection with initial document
    const jobsCollection = collection(db, 'jobs');
    await setDoc(doc(jobsCollection, 'template'), {
      title: 'Template Job',
      description: 'This is a template job',
      type: 'Residential',
      location: 'Template Location',
      date: new Date().toISOString(),
      status: 'open',
      customerId: 'template',
      customerName: 'Template Customer',
      createdAt: new Date(),
      updatedAt: new Date()
    });

    // Create users collection with initial document
    const usersCollection = collection(db, 'users');
    await setDoc(doc(usersCollection, 'template'), {
      displayName: 'Template User',
      email: 'template@example.com',
      role: 'customer',
      createdAt: new Date(),
      updatedAt: new Date()
    });

    console.log('Database setup completed successfully!');
  } catch (error) {
    console.error('Error setting up database:', error);
  }
}

setupDatabase(); 