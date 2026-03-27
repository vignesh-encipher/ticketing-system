const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activityController');

// GET all activity logs for a ticket
router.get('/:ticketId', activityController.getActivityLogs);

// POST a new activity log
router.post('/', activityController.createActivityLog);

module.exports = router;
