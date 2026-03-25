const asyncHandler = require('express-async-handler');
const Ticket = require('../models/Ticket');
const Project = require('../models/Project');

// @desc    Create a ticket
// @route   POST /api/tickets
// @access  Private
const createTicket = asyncHandler(async (req, res) => {
    const { title, description, project, priority, status, assignedTo } = req.body;
    
    if (!title || !description || !project) {
        res.status(400);
        throw new Error('Please provide title, description, and project');
    }

    const projectExists = await Project.findById(project);
    if (!projectExists) {
        res.status(404);
        throw new Error('Project not found');
    }

    const ticketData = {
        title,
        description,
        project,
        createdBy: req.user.id
    };

    if (priority) ticketData.priority = priority;
    if (status) ticketData.status = status;
    
    if (assignedTo && (req.user.role === 'Admin' || req.user.role === 'Manager')) {
        ticketData.assignedTo = assignedTo;
    }

    const ticket = await Ticket.create(ticketData);
    res.status(201).json(ticket);
});

// @desc    Get all tickets (optional filter by project)
// @route   GET /api/tickets
// @access  Private
const getTickets = asyncHandler(async (req, res) => {
    const filter = {};
    if (req.query.project) {
        filter.project = req.query.project;
    }
    // Developers only see their own tickets or those they are assigned to
    if (req.user.role === 'Developer') {
        filter.$or = [ { createdBy: req.user.id }, { assignedTo: req.user.id } ];
    }
    
    const tickets = await Ticket.find(filter).populate('assignedTo', 'name email').populate('createdBy', 'name email');
    res.status(200).json(tickets);
});

// @desc    Get single ticket
// @route   GET /api/tickets/:id
// @access  Private
const getTicket = asyncHandler(async (req, res) => {
    const ticket = await Ticket.findById(req.params.id).populate('assignedTo', 'name email').populate('createdBy', 'name email');
    if (!ticket) {
        res.status(404);
        throw new Error('Ticket not found');
    }

    // Checking if developer has access to this particular ticket
    if (req.user.role === 'Developer' && ticket.createdBy.id !== req.user.id && ticket.assignedTo?.id !== req.user.id) {
        res.status(403);
        throw new Error('Not authorized to view this ticket');
    }

    res.status(200).json(ticket);
});

// @desc    Update ticket
// @route   PUT /api/tickets/:id
// @access  Private
const updateTicket = asyncHandler(async (req, res) => {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
        res.status(404);
        throw new Error('Ticket not found');
    }

    // Checking permissions
    if (req.user.role === 'Developer' && ticket.assignedTo?.toString() !== req.user.id) {
        res.status(403);
        throw new Error('Developers can only update tickets assigned to them');
    }

    // if developer, they can only update the status
    if (req.user.role === 'Developer') {
        if (req.body.status) {
            ticket.status = req.body.status;
            await ticket.save();
        }
        return res.status(200).json(ticket);
    }

    // Admins and Managers can update anything
    const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedTicket);
});

// @desc    Assign ticket
// @route   PUT /api/tickets/:id/assign
// @access  Private/Admin,Manager
const assignTicketToUser = asyncHandler(async (req, res) => {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
        res.status(404);
        throw new Error('Ticket not found');
    }

    if (req.user.role !== 'Admin' && req.user.role !== 'Manager') {
        res.status(403);
        throw new Error('Not authorized to assign tickets');
    }

    const { assignedTo } = req.body;
    if (!assignedTo) {
        res.status(400);
        throw new Error('Please specify user to assign');
    }

    ticket.assignedTo = assignedTo;
    await ticket.save();
    
    res.status(200).json(ticket);
});

// @desc    Change ticket status
// @route   PUT /api/tickets/:id/status
// @access  Private
const changeTicketStatus = asyncHandler(async (req, res) => {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
        res.status(404);
        throw new Error('Ticket not found');
    }

    if (req.user.role === 'Developer' && ticket.assignedTo?.toString() !== req.user.id) {
        res.status(403);
        throw new Error('Developers can only update status of assigned tickets');
    }

    const { status } = req.body;
    if (!status) {
        res.status(400);
        throw new Error('Please provide status');
    }

    const validStatuses = ['Todo', 'In Progress', 'Done', 'Blocked'];
    if (!validStatuses.includes(status)) {
        res.status(400);
        throw new Error('Invalid status');
    }

    ticket.status = status;
    await ticket.save();

    res.status(200).json(ticket);
});

// @desc    Delete ticket
// @route   DELETE /api/tickets/:id
// @access  Private/Admin,Manager
const deleteTicket = asyncHandler(async (req, res) => {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
        res.status(404);
        throw new Error('Ticket not found');
    }

    await ticket.deleteOne();
    res.status(200).json({ id: req.params.id });
});

module.exports = { createTicket, getTickets, getTicket, updateTicket, deleteTicket, assignTicketToUser, changeTicketStatus };
