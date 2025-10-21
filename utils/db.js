import { db } from './firebase.js';
import { 
  collection, 
  doc, 
  addDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy 
} from 'firebase/firestore';

// Service requests collection
export const addServiceRequest = async (data) => {
  try {
    const docRef = await addDoc(collection(db, 'serviceRequests'), {
      ...data,
      createdAt: new Date(),
      status: 'pending'
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding service request:', error);
    throw error;
  }
};

export const getServiceRequests = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'serviceRequests'));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error getting service requests:', error);
    throw error;
  }
};

export const updateServiceRequest = async (id, data) => {
  try {
    const docRef = doc(db, 'serviceRequests', id);
    await updateDoc(docRef, { ...data, updatedAt: new Date() });
  } catch (error) {
    console.error('Error updating service request:', error);
    throw error;
  }
};

// Contact messages collection
export const addContactMessage = async (data) => {
  try {
    const docRef = await addDoc(collection(db, 'contactMessages'), {
      ...data,
      createdAt: new Date(),
      read: false
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding contact message:', error);
    throw error;
  }
};

export const getContactMessages = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'contactMessages'));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error getting contact messages:', error);
    throw error;
  }
};

export { db };