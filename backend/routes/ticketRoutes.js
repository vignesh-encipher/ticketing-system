const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');
const { protect } = require('../middleware/auth');
const paginationMiddleware = require('../middleware/pagination');

// Ensure native requests are actively intercepted by security middleware natively
router.use(protect);

const commentRouter = require('./commentRoutes');
router.use('/:ticketId/comments', commentRouter);

router.route('/')
  .get(paginationMiddleware, ticketController.getTickets)
  .post(ticketController.createTicket);

router.route('/:id')
  .put(ticketController.updateTicket)
  .delete(ticketController.deleteTicket);

module.exports = router;
