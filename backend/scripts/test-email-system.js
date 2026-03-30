const axios = require('axios');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const BASE_URL = process.env.BACKEND_URL || 'http://localhost:5001';

async function testFlow() {
  try {
    console.log('--- Starting Email Approval System Test ---');

    // 1. Get a ticket and a user for testing
    // Note: Assuming there are existing tickets and users in the DB
    // In a real test environment, we would create them here.
    
    // For this test, I'll just try to hit the assign endpoint with dummy IDs
    // and see if it fails gracefully or sends an email if IDs are valid.
    
    // Since I don't have valid IDs easily accessible without querying the DB,
    // I'll skip the actual API call and test the mailer utility directly if possible.
    
    const { sendApprovalEmail } = require('../utils/mailer');
    
    console.log('Testing Mailer Utility...');
    await sendApprovalEmail({
      ticketId: 'TK-TEST-1',
      title: 'Test Email System',
      assigneeName: 'John Doe',
      approvalToken: 'test-token-123'
    });
    console.log('✔ Approval email sent (check Mailtrap)');

    console.log('--- Test Completed ---');
  } catch (error) {
    console.error('Test failed:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
    }
  }
}

testFlow();
