import { MongoClient } from 'mongodb';

const MONGODB_URI = 'mongodb://localhost:27017';
const DB_NAME = 'Emporos-tech-nexus';

let client;
let db;

export async function connectToMongoDB() {
  try {
    if (!client || !client.topology || !client.topology.isConnected()) {
      if (client) {
        await client.close();
      }
      
      client = new MongoClient(MONGODB_URI, {
        serverSelectionTimeoutMS: 5000,
        connectTimeoutMS: 10000,
      });
      
      await client.connect();
      db = client.db(DB_NAME);
      console.log('Connected to MongoDB');
    }
    return db;
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    throw error;
  }
}

export async function getCollection(collectionName) {
  const database = await connectToMongoDB();
  return database.collection(collectionName);
}

export default { connectToMongoDB, getCollection };