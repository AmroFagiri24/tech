import express from 'express';
import cors from 'cors';
import { getServiceRequests, addServiceRequest, updateServiceRequest, deleteServiceRequest, getContactMessages, addContactMessage } from './utils/db.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Service Requests Routes
app.get('/api/service-requests', async (req, res) => {
  try {
    const requests = await getServiceRequests();
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/service-requests', async (req, res) => {
  try {
    const id = await addServiceRequest(req.body);
    res.json({ id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/service-requests/:id', async (req, res) => {
  try {
    await updateServiceRequest(req.params.id, req.body);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/service-requests/:id', async (req, res) => {
  try {
    await deleteServiceRequest(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Contact Messages Routes
app.get('/api/contact-messages', async (req, res) => {
  try {
    const messages = await getContactMessages();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/contact-messages', async (req, res) => {
  try {
    const id = await addContactMessage(req.body);
    res.json({ id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});