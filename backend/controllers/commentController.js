const asyncHandler = require('express-async-handler');
const Comment = require('../models/Comment');
const Ticket = require('../models/Ticket');
const ActivityLog = require('../models/ActivityLog');
const { emitToTicket } = require('../utils/socket');

// @desc    Add comment to a ticket
// @route   POST /api/tickets/:ticketId/comments
// @access  Private
const addComment = asyncHandler(async (req, res) => {
    const ticketId = req.params.ticketId;
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
        res.status(404);
        throw new Error('Ticket not found');
    }

    /*
    if (req.user.role === 'Developer' && ticket.assignedTo?.toString() !== req.user.id && ticket.createdBy?.toString() !== req.user.id) {
        res.status(403);
        throw new Error('Not authorized to comment on this ticket');
    }
    */

    const { text } = req.body;
    if (!text) {
        res.status(400);
        throw new Error('Comment text is required');
    }

    const comment = await Comment.create({
        text,
        ticket: ticketId,
        user: req.user.id || '69c4e0367be280666dd26855' // Fallback for now if req.user is missing
    });
    
    await comment.populate('user', 'name email profileImage');

    // Create Activity Log
    const log = new ActivityLog({
        ticket: ticketId,
        performedBy: req.user.id || '69c4e0367be280666dd26855',
        action: 'Comment Added',
        details: { commentId: comment._id }
    });
    await log.save();

    // Broadcast via WebSocket
    emitToTicket(ticketId, 'newComment', comment);
    emitToTicket(ticketId, 'activityLogged', log);

    res.status(201).json(comment);
});

// @desc    Get comments for a ticket
// @route   GET /api/tickets/:ticketId/comments
// @access  Private
const getComments = asyncHandler(async (req, res) => {
    const ticket = await Ticket.findById(req.params.ticketId);
    if (!ticket) {
        res.status(404);
        throw new Error('Ticket not found');
    }

    /*
    if (req.user.role === 'Developer' && ticket.assignedTo?.toString() !== req.user.id && ticket.createdBy?.toString() !== req.user.id) {
        res.status(403);
        throw new Error('Not authorized to view comments for this ticket');
    }
    */

    const comments = await Comment.find({ ticket: req.params.ticketId }).populate('user', 'name email profileImage');
    res.status(200).json(comments);
});

module.exports = { addComment, getComments };
