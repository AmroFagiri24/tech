import { useState, useEffect } from 'react';
import { addServiceRequest, getServiceRequests, addContactMessage, getContactMessages } from './db.js';

export const useServiceRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await getServiceRequests();
        setRequests(data);
      } catch (error) {
        console.error('Error fetching service requests:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const addRequest = async (requestData) => {
    try {
      const id = await addServiceRequest(requestData);
      const newRequest = { id, ...requestData, createdAt: new Date(), status: 'pending' };
      setRequests(prev => [...prev, newRequest]);
      return id;
    } catch (error) {
      console.error('Error adding service request:', error);
      throw error;
    }
  };

  return { requests, loading, addRequest };
};

export const useContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await getContactMessages();
        setMessages(data);
      } catch (error) {
        console.error('Error fetching contact messages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const addMessage = async (messageData) => {
    try {
      const id = await addContactMessage(messageData);
      const newMessage = { id, ...messageData, createdAt: new Date(), read: false };
      setMessages(prev => [...prev, newMessage]);
      return id;
    } catch (error) {
      console.error('Error adding contact message:', error);
      throw error;
    }
  };

  return { messages, loading, addMessage };
};