import { addServiceRequest, getServiceRequests, deleteServiceRequest } from './utils/db.js';

// Test CRM database connection
async function testCRMConnection() {
  try {
    console.log('🔄 Testing CRM database connection...');
    
    // Test 1: Add a service request
    const testData = {
      name: 'CRM Test Customer',
      email: 'crmtest@test.com',
      phone: '555-123-4567',
      service: 'Computer Repair',
      location: 'Test Location',
      status: 'Pending',
      message: 'This is a CRM connection test'
    };
    
    console.log('📝 Adding test service request...');
    const id = await addServiceRequest(testData);
    console.log('✅ Service request added with ID:', id);
    
    // Test 2: Retrieve all service requests
    console.log('📋 Retrieving all service requests...');
    const records = await getServiceRequests();
    console.log('✅ Retrieved', records.length, 'service requests');
    
    // Find our test record
    const testRecord = records.find(r => r.id === id);
    if (testRecord) {
      console.log('✅ Test record found in database:', testRecord.name);
    } else {
      console.log('❌ Test record not found in database');
    }
    
    // Test 3: Delete the test record
    console.log('🗑️ Deleting test record...');
    await deleteServiceRequest(id);
    console.log('✅ Test record deleted');
    
    // Test 4: Verify deletion
    const recordsAfterDelete = await getServiceRequests();
    const deletedRecord = recordsAfterDelete.find(r => r.id === id);
    if (!deletedRecord) {
      console.log('✅ Test record successfully removed from database');
    } else {
      console.log('❌ Test record still exists after deletion');
    }
    
    console.log('🎉 CRM database connection test completed successfully!');
    
  } catch (error) {
    console.error('❌ CRM database connection test failed:', error);
  }
}

testCRMConnection();