import { apiClient } from './mongodb.js';

// Service requests
export const addServiceRequest = async (data) => {
  try {
    const response = await apiClient.post('/service-requests', data);
    return response.id;
  } catch (error) {
    console.error('Error adding service request:', error);
    throw error;
  }
};

export const getServiceRequests = async () => {
  try {
    return await apiClient.get('/service-requests');
  } catch (error) {
    console.error('Error getting service requests:', error);
    throw error;
  }
};

export const updateServiceRequest = async (id, data) => {
  try {
    await apiClient.put(`/service-requests/${id}`, data);
  } catch (error) {
    console.error('Error updating service request:', error);
    throw error;
  }
};

export const deleteServiceRequest = async (id) => {
  try {
    const response = await apiClient.delete(`/service-requests/${id}`);
    return response;
  } catch (error) {
    console.error('Error deleting service request:', error);
    throw error;
  }
};

// Contact messages
export const addContactMessage = async (data) => {
  try {
    const response = await apiClient.post('/contact-messages', data);
    return response.id;
  } catch (error) {
    console.error('Error adding contact message:', error);
    throw error;
  }
};

export const getContactMessages = async () => {
  try {
    return await apiClient.get('/contact-messages');
  } catch (error) {
    console.error('Error getting contact messages:', error);
    throw error;
  }
};

export { apiClient as db };