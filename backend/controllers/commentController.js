const asyncHandler = require('express-async-handler');
const Comment = require('../models/Comment');
const Ticket = require('../models/Ticket');
const User = require('../models/User');
const ActivityLog = require('../models/ActivityLog');
const { sendResponse } = require('../utils/responseHelper');

// @desc    Add comment to a ticket
// @route   POST /api/comments
// @access  Private
const addComment = asyncHandler(async (req, res) => {
    try {
        const { ticketId, message, userId } = req.body;

        if (!ticketId || !message || !userId) {
            return sendResponse(res, 400, 'FAILED', 'ticketId, message, and userId are required');
        }

        const mongoose = require('mongoose');
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return sendResponse(res, 400, 'FAILED', 'Invalid userId format');
        }

        const ticket = await Ticket.findById(ticketId);
        if (!ticket) {
            return sendResponse(res, 404, 'USER_DEFINED', 'Ticket not found');
        }

        const user = await User.findById(userId).populate('department');
        if (!user) {
            return sendResponse(res, 404, 'FAILED', 'User not found');
        }

        const userDetails = {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            employeeId: user.employeeId,
            department: user.department?.name || 'N/A',
            roleType: user.roleType,
            profileImage: user.profileImage
        };

        const comment = await Comment.create({
            ticketId,
            message,
            userDetails
        });

        // Programmatically create an activity log
        try {
            await ActivityLog.create({
                ticketId,
                action: 'COMMENT_ADDED',
                status: 'success',
                userDetails
            });
        } catch (logError) {
            console.error('Failed to create activity log for comment:', logError);
        }

        return sendResponse(res, 201, 'SUCCESS', 'Comment added successfully', comment);
    } catch (error) {
        return sendResponse(res, 500, 'EXCEPTION', error.message);
    }
});

// @desc    Get comments for a ticket
// @route   GET /api/comments/:ticketId
// @access  Private
const getComments = asyncHandler(async (req, res) => {
    try {
        const { ticketId } = req.params;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;

        const ticket = await Ticket.findById(ticketId);
        if (!ticket) {
            return sendResponse(res, 404, 'USER_DEFINED', 'Ticket not found');
        }

        const filter = { ticketId, isDeleted: false };
        
        const comments = await Comment.find(filter)
            .sort({ createdAt: 1 }) // Oldest to newest (chat style)
            .skip(skip)
            .limit(limit);

        const totalCount = await Comment.countDocuments(filter);

        return sendResponse(res, 200, 'SUCCESS', 'Comments retrieved successfully', {
            comments,
            pagination: {
                totalCount,
                totalPages: Math.ceil(totalCount / limit),
                currentPage: page,
                limit
            }
        });
    } catch (error) {
        return sendResponse(res, 500, 'EXCEPTION', error.message);
    }
});

// @desc    Update a comment
// @route   PUT /api/comments/:id
// @access  Private
const updateComment = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const { message } = req.body;

        if (!message) {
            return sendResponse(res, 400, 'FAILED', 'Message is required');
        }

        const comment = await Comment.findByIdAndUpdate(id, { message }, { new: true });
        if (!comment) {
            return sendResponse(res, 404, 'FAILED', 'Comment not found');
        }

        return sendResponse(res, 200, 'SUCCESS', 'Comment updated successfully', comment);
    } catch (error) {
        return sendResponse(res, 500, 'EXCEPTION', error.message);
    }
});

// @desc    Delete a comment (Soft Delete)
// @route   DELETE /api/comments/:id
// @access  Private
const deleteComment = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await Comment.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
        
        if (!comment) {
            return sendResponse(res, 404, 'FAILED', 'Comment not found');
        }

        return sendResponse(res, 200, 'SUCCESS', 'Comment deleted successfully', null);
    } catch (error) {
        return sendResponse(res, 500, 'EXCEPTION', error.message);
    }
});

module.exports = { addComment, getComments, updateComment, deleteComment };
