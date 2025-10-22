import { db } from './firebase.js';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';

// Service requests
export const addServiceRequest = async (data) => {
  try {
    const docRef = await addDoc(collection(db, 'serviceRequests'), {
      ...data,
      createdAt: serverTimestamp(),
      status: data.status || 'Pending'
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
    await updateDoc(docRef, { ...data, updatedAt: serverTimestamp() });
  } catch (error) {
    console.error('Error updating service request:', error);
    throw error;
  }
};

export const deleteServiceRequest = async (id) => {
  try {
    await deleteDoc(doc(db, 'serviceRequests', id));
    return { success: true };
  } catch (error) {
    console.error('Error deleting service request:', error);
    throw error;
  }
};

// Contact messages
export const addContactMessage = async (data) => {
  try {
    const docRef = await addDoc(collection(db, 'contactMessages'), {
      ...data,
      createdAt: serverTimestamp(),
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