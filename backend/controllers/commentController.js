const asyncHandler = require('express-async-handler');
const Comment = require('../models/Comment');
const Ticket = require('../models/Ticket');

// @desc    Add comment to a ticket
// @route   POST /api/tickets/:ticketId/comments
// @access  Private
const addComment = asyncHandler(async (req, res) => {
    const ticket = await Ticket.findById(req.params.ticketId);
    if (!ticket) {
        res.status(404);
        throw new Error('Ticket not found');
    }

    if (req.user.role === 'Developer' && ticket.assignedTo?.toString() !== req.user.id && ticket.createdBy?.toString() !== req.user.id) {
        res.status(403);
        throw new Error('Not authorized to comment on this ticket');
    }

    const { text } = req.body;
    if (!text) {
        res.status(400);
        throw new Error('Comment text is required');
    }

    const comment = await Comment.create({
        text,
        ticket: req.params.ticketId,
        user: req.user.id
    });
    
    await comment.populate('user', 'name email');
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

    if (req.user.role === 'Developer' && ticket.assignedTo?.toString() !== req.user.id && ticket.createdBy?.toString() !== req.user.id) {
        res.status(403);
        throw new Error('Not authorized to view comments for this ticket');
    }

    const comments = await Comment.find({ ticket: req.params.ticketId }).populate('user', 'name email');
    res.status(200).json(comments);
});

module.exports = { addComment, getComments };
