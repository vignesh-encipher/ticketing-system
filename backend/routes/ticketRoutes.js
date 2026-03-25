const express = require('express');
const router = express.Router();
const { createTicket, getTickets, getTicket, updateTicket, deleteTicket, assignTicketToUser, changeTicketStatus } = require('../controllers/ticketController');
const { protect, authorize } = require('../middleware/auth');

const commentRouter = require('./commentRoutes');
router.use('/:ticketId/comments', commentRouter);

router.route('/')
    .get(protect, getTickets)
    .post(protect, createTicket);

router.route('/:id')
    .get(protect, getTicket)
    .put(protect, updateTicket)
    .delete(protect, authorize('Admin', 'Manager'), deleteTicket);

router.put('/:id/assign', protect, authorize('Admin', 'Manager'), assignTicketToUser);
router.put('/:id/status', protect, changeTicketStatus);

module.exports = router;
