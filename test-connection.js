import { addCustomer, getCustomers } from './utils/db.js';

async function testConnection() {
  try {
    console.log('Testing Firebase connection...');
    
    // Test adding a customer
    const testData = {
      name: 'Test Customer',
      email: 'test@test.com',
      phone: '123-456-7890',
      service: 'Computer Repair',
      location: 'Test Location',
      status: 'Pending'
    };
    
    const id = await addCustomer(testData);
    console.log('✅ Successfully added customer with ID:', id);
    
    // Test reading customers
    const customers = await getCustomers();
    console.log('✅ Successfully retrieved customers:', customers.length);
    console.log('Latest customer:', customers[customers.length - 1]);
    
  } catch (error) {
    console.error('❌ Firebase connection failed:', error);
  }
}

testConnection();