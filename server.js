import express from 'express';
import cors from 'cors';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const MONGODB_URI = 'mongodb+srv://kolrtawwe2009_db_user:ECHqJUic7NcK4H5o@tech.jtpr2yt.mongodb.net/?retryWrites=true&w=majority&appName=Tech';

app.use(cors());
app.use(express.json());

let db;

// Connect to MongoDB
MongoClient.connect(MONGODB_URI)
  .then(client => {
    console.log('Connected to MongoDB');
    db = client.db();
  })
  .catch(error => console.error('MongoDB connection error:', error));

// Service Requests Routes
app.get('/api/service-requests', async (req, res) => {
  try {
    const requests = await db.collection('serviceRequests').find().toArray();
    const formattedRequests = requests.map(req => ({
      ...req,
      id: req._id.toString()
    }));
    res.json(formattedRequests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/service-requests', async (req, res) => {
  try {
    const result = await db.collection('serviceRequests').insertOne({
      ...req.body,
      createdAt: new Date(),
      status: req.body.status || 'Pending'
    });
    res.json({ id: result.insertedId.toString() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/service-requests/:id', async (req, res) => {
  try {
    await db.collection('serviceRequests').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { ...req.body, updatedAt: new Date() } }
    );
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/service-requests/:id', async (req, res) => {
  try {
    const result = await db.collection('serviceRequests').deleteOne(
      { _id: new ObjectId(req.params.id) }
    );
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.json({ success: true, deletedCount: result.deletedCount });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Contact Messages Routes
app.get('/api/contact-messages', async (req, res) => {
  try {
    const messages = await db.collection('contactMessages').find().toArray();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/contact-messages', async (req, res) => {
  try {
    const result = await db.collection('contactMessages').insertOne({
      ...req.body,
      createdAt: new Date(),
      read: false
    });
    res.json({ id: result.insertedId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});