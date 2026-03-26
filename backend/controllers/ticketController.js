const Ticket = require('../models/Ticket');
const { sendResponse } = require('../utils/responseHelper');

class TicketController {
  
  // @desc    Get all tickets with formatting pagination and filters
  // @route   GET /api/tickets
  // @access  Private
  async getTickets(req, res, next) {
    try {
      const { skip, limit, page, search, sort } = req.pagination;
      const { status, priority, sourceDept, targetDept } = req.query;

      const filter = { isDeleted: false };
      
      // Dynamically attach parameters if valid
      if (status && status !== 'All Status') filter.status = status;
      if (priority && priority !== 'All Priorities') filter.priority = priority;
      if (sourceDept && sourceDept !== 'All Departments') filter.sourceDept = sourceDept;
      if (targetDept && targetDept !== 'All Departments') filter.targetDept = targetDept;
      
      if (search) {
        filter.$or = [
          { title: { $regex: search, $options: 'i' } },
          { ticketId: { $regex: search, $options: 'i' } }
        ];
      }

      const tickets = await Ticket.find(filter)
        .populate('assignee', 'name profileImage email')
        .populate('createdBy', 'name profileImage email')
        .sort(sort || { createdAt: -1 })
        .skip(skip)
        .limit(limit);

      const totalCount = await Ticket.countDocuments(filter);

      return sendResponse(res, 200, 'SUCCESS', 'Tickets retrieved successfully', {
        tickets,
        meta: {
          totalCount,
          totalPages: Math.ceil(totalCount / limit),
          currentPage: page
        }
      });
    } catch (error) {
      next(error);
    }
  }

  // @desc    Create a ticket holding structured nested elements
  // @route   POST /api/tickets
  // @access  Private
  async createTicket(req, res, next) {
    try {
      const { title, description, sourceDept, targetDept, priority, status, assigneeId, createdById, attachments } = req.body;

      if (!title) {
        return sendResponse(res, 400, 'FAILED', 'Ticket title is required');
      }

      // Prevent duplicate tickets having the identical title OR rich-text description
      const existingTicket = await Ticket.findOne({ 
        $or: [{ title }, { description }],
        isDeleted: false 
      });
      
      if (existingTicket) {
        return sendResponse(res, 400, 'FAILED', 'A ticket with this exact title or description already exists in the system.');
      }

      const ticket = new Ticket({
        title,
        description,
        sourceDept,
        targetDept,
        priority,
        status,
        assignee: assigneeId || null,
        createdBy: createdById || req.user.id,
        attachments
      });

      const savedTicket = await ticket.save();
      return sendResponse(res, 201, 'SUCCESS', 'Ticket created successfully', savedTicket);
    } catch (error) {
      if (error.name === 'ValidationError') {
        return sendResponse(res, 400, 'FAILED', Object.values(error.errors).map(v => v.message).join(', '));
      }
      next(error);
    }
  }

  // @desc    Update ticket selectively via parameters
  // @route   PUT /api/tickets/:id
  // @access  Private
  async updateTicket(req, res, next) {
    try {
      const { id } = req.params;
      const updateData = req.body;
      
      // Prevent updating system-generated constant fields globally
      delete updateData.ticketId;
      delete updateData.createdAt;
      delete updateData.isDeleted;

      const ticket = await Ticket.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
      if (!ticket) {
        return sendResponse(res, 404, 'FAILED', 'Ticket not found');
      }

      return sendResponse(res, 200, 'SUCCESS', 'Ticket updated successfully', ticket);
    } catch (error) {
      if (error.name === 'ValidationError') {
        return sendResponse(res, 400, 'FAILED', Object.values(error.errors).map(v => v.message).join(', '));
      }
      next(error);
    }
  }

  // @desc    Delete ticket efficiently by converting into Soft DB wipe
  // @route   DELETE /api/tickets/:id
  // @access  Private
  async deleteTicket(req, res, next) {
    try {
      const { id } = req.params;
      const ticket = await Ticket.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
      
      if (!ticket) {
        return sendResponse(res, 404, 'FAILED', 'Ticket not found');
      }

      return sendResponse(res, 200, 'SUCCESS', 'Ticket deleted successfully', null);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new TicketController();
