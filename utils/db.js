import { db } from './firebase.js';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';

// Service requests
export const addServiceRequest = async (data) => {
  try {
    console.log('Adding service request:', data)
    const docRef = await addDoc(collection(db, 'serviceRequests'), {
      ...data,
      createdAt: serverTimestamp(),
      status: data.status || 'Pending'
    });
    console.log('Service request added with ID:', docRef.id)
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
    console.log('Deleting service request with ID:', id)
    await deleteDoc(doc(db, 'serviceRequests', id));
    console.log('Service request deleted successfully')
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

// Customers collection
export const addCustomer = async (data) => {
  try {
    const docRef = await addDoc(collection(db, 'customers'), {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding customer:', error);
    throw error;
  }
};

export const getCustomers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'customers'));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error getting customers:', error);
    throw error;
  }
};

export const updateCustomer = async (id, data) => {
  try {
    const docRef = doc(db, 'customers', id);
    await updateDoc(docRef, { ...data, updatedAt: serverTimestamp() });
  } catch (error) {
    console.error('Error updating customer:', error);
    throw error;
  }
};

export const deleteCustomer = async (id) => {
  try {
    console.log('Deleting customer with ID:', id)
    await deleteDoc(doc(db, 'customers', id));
    console.log('Customer deleted successfully')
    return { success: true };
  } catch (error) {
    console.error('Error deleting customer:', error);
    throw error;
  }
};

export { db };