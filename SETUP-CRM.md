# CRM Setup Guide

## Problem Fixed
Your booking system was only saving to localStorage (browser storage) instead of your database. Now all customer bookings will go directly to your CRM system.

## What Was Changed

### 1. Booking System (`utils/buttonActions.js`)
- Now saves bookings to database via API
- Falls back to localStorage if database fails
- Connects customer bookings to your CRM

### 2. CRM Component (`components/CRM.jsx`)
- Loads real customer data from database
- Shows loading state while fetching data
- Handles database operations for add/edit customers

### 3. Environment Configuration
- Added MongoDB and API configuration options
- Updated `.env.example` with required variables

## Setup Steps

### 1. Configure Environment
Copy `.env.example` to `.env` and update with your values:
```bash
cp .env.example .env
```

### 2. Start Your Database Server
Make sure MongoDB is running and start your API server:
```bash
node server.js
```

### 3. Test the System
Run the test script to verify everything works:
```bash
node test-booking.js
```

### 4. Start Your App
```bash
npm run dev
```

## How It Works Now

1. **Customer books service** → Data goes to MongoDB database
2. **Admin opens CRM** → Loads real customer data from database
3. **All customer info** → Name, phone, email, location, service, status

## Troubleshooting

If bookings still don't appear:
1. Check if `server.js` is running on port 3001
2. Verify MongoDB connection in server logs
3. Check browser console for API errors
4. Ensure `.env` file has correct database URL

## Testing on Mobile

1. Book a service using your phone
2. Login to admin account
3. Open CRM - you should now see the booking!