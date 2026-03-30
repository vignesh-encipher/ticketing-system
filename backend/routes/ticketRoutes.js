const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');
const activityLogController = require('../controllers/activityLogController');
const { protect } = require('../middleware/auth');
const paginationMiddleware = require('../middleware/pagination');

// Ensure native requests are actively intercepted by security middleware natively
router.use(protect);

router.route('/')
  .get(paginationMiddleware, ticketController.getTickets)
  .post(ticketController.createTicket);

router.post('/reassign', ticketController.reassignTicket);
router.post('/update-status-priority', ticketController.updateStatusPriority);

router.get('/:id/logs', activityLogController.getTicketLogs);

router.route('/:id')
  .get(ticketController.getTicketById)
  .put(ticketController.updateTicket)
  .delete(ticketController.deleteTicket);

module.exports = router;
