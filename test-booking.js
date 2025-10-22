// Test script to verify booking system works
import { addServiceRequest, getServiceRequests } from './utils/db.js';

const testBooking = {
  name: 'Test Customer',
  email: 'test@example.com',
  phone: '514-555-0000',
  location: 'Test Address, Montreal',
  service: 'Computer Repair',
  message: 'Test booking from script',
  status: 'Pending',
  createdAt: new Date().toISOString()
};

async function testBookingSystem() {
  try {
    console.log('Testing booking system...');
    
    // Add a test booking
    console.log('Adding test booking...');
    const result = await addServiceRequest(testBooking);
    console.log('Booking added with ID:', result.id);
    
    // Retrieve all bookings
    console.log('Retrieving all bookings...');
    const bookings = await getServiceRequests();
    console.log('Found bookings:', bookings.length);
    console.log('Latest booking:', bookings[bookings.length - 1]);
    
    console.log('✅ Booking system test completed successfully!');
  } catch (error) {
    console.error('❌ Booking system test failed:', error);
  }
}

testBookingSystem();