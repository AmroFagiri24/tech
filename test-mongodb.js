import { connectToMongoDB, getCollection } from './utils/mongodb.js';

async function testConnection() {
  try {
    console.log('Testing MongoDB connection...');
    
    const db = await connectToMongoDB();
    console.log('✅ Connected to MongoDB successfully!');
    
    const testCollection = await getCollection('test');
    console.log('✅ Got test collection');
    
    // Insert a test document
    const result = await testCollection.insertOne({ 
      message: 'Hello MongoDB!', 
      timestamp: new Date() 
    });
    console.log('✅ Inserted test document:', result.insertedId);
    
    // Find the document
    const doc = await testCollection.findOne({ _id: result.insertedId });
    console.log('✅ Retrieved document:', doc);
    
    // Clean up
    await testCollection.deleteOne({ _id: result.insertedId });
    console.log('✅ Cleaned up test document');
    
    console.log('🎉 All tests passed!');
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testConnection();