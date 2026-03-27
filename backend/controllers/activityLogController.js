const ActivityLog = require('../models/ActivityLog');
const { sendResponse } = require('../utils/responseHelper');

class ActivityLogController {
  // @desc    Get all logs for a ticket
  // @route   GET /api/tickets/:id/logs
  // @access  Private
  async getTicketLogs(req, res, next) {
    try {
      const { id } = req.params;
      const logs = await ActivityLog.find({ ticket: id })
        .populate('performedBy', 'name email profileImage')
        .sort({ createdAt: -1 });

      return sendResponse(res, 200, 'SUCCESS', 'Activity logs retrieved successfully', logs);
    } catch (error) {
      next(error);
    }
  }

  // Helper method to log activity (can be used internally)
  async logActivity(ticketId, performedBy, action, details = {}) {
    try {
      const log = new ActivityLog({
        ticket: ticketId,
        performedBy,
        action,
        details
      });
      await log.save();
      return log;
    } catch (error) {
      console.error('Failed to log activity:', error);
    }
  }
}

module.exports = new ActivityLogController();
