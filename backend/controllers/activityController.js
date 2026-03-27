const ActivityLog = require('../models/ActivityLog');
const User = require('../models/User');
const { sendResponse } = require('../utils/responseHelper');
const mongoose = require('mongoose');

/**
 * @desc    Fetch all activity logs for a specific ticket
 * @route   GET /api/activity/:ticketId
 * @access  Private
 */
exports.getActivityLogs = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    if (!mongoose.Types.ObjectId.isValid(ticketId)) {
      return sendResponse(res, 400, 'FAILED', 'Invalid Ticket ID');
    }

    const query = { ticketId, isDeleted: false };
    
    const logs = await ActivityLog.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await ActivityLog.countDocuments(query);

    return sendResponse(res, 200, 'SUCCESS', 'Activity logs fetched successfully', {
      logs,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error in getActivityLogs:', error);
    return sendResponse(res, 500, 'EXCEPTION', 'Error fetching activity logs', error.message);
  }
};

/**
 * @desc    Create a new activity log entry
 * @route   POST /api/activity
 * @access  Private
 */
exports.createActivityLog = async (req, res) => {
  try {
    const { ticketId, action, status, userId } = req.body;

    if (!ticketId || !action || !status || !userId) {
      return sendResponse(res, 400, 'FAILED', 'Missing required fields: ticketId, action, status, userId');
    }

    if (!mongoose.Types.ObjectId.isValid(ticketId)) {
      return sendResponse(res, 400, 'FAILED', 'Invalid Ticket ID');
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return sendResponse(res, 400, 'FAILED', 'Invalid User ID');
    }

    // Fetch user details for denormalization
    const user = await User.findById(userId);
    if (!user) {
      return sendResponse(res, 404, 'FAILED', 'User not found');
    }

    const activityLog = new ActivityLog({
      ticketId,
      action,
      status,
      userDetails: {
        name: user.name,
        email: user.email,
        employeeId: user.employeeId,
        department: user.department,
        roleType: user.roleType,
        profileImage: user.profileImage,
        id: user._id.toString()
      }
    });

    await activityLog.save();

    return sendResponse(res, 201, 'SUCCESS', 'Activity log created successfully', activityLog);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return sendResponse(res, 400, 'FAILED', 'Validation Error', error.message);
    }
    console.error('Error in createActivityLog:', error);
    return sendResponse(res, 500, 'EXCEPTION', 'Error creating activity log', error.message);
  }
};
