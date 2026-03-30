const Ticket = require('../models/Ticket');
const ActivityLog = require('../models/ActivityLog');
const User = require('../models/User');
const { sendResponse } = require('../utils/responseHelper');

class TicketController {
  
  // @desc    Get all tickets with formatting pagination and filters
  // @route   GET /api/tickets
  // @access  Private
  async getTickets(req, res, next) {
    try {
      const { skip, limit, page, search, sort } = req.pagination;
      const { status, priority, sourceDept, targetDept, excludeStatus, createdById } = req.query;

      const filter = { isDeleted: false };
      const andFilters = [];

      // Role-based filtering logic
      if (req.user.roleType === 'Member') {
        // Members see only what they created or what is assigned to them
        andFilters.push({
          $or: [
            { assignee: req.user.id },
            { createdBy: req.user.id }
          ]
        });
      } else if (req.user.roleType === 'Lead') {
        // Leads see tickets targeting their department OR tickets they created
        const user = await User.findById(req.user.id).populate('department');
        if (user && user.department) {
          andFilters.push({
            $or: [
              { targetDept: user.department.name },
              { createdBy: req.user.id }
            ]
          });
        }
      }

      // Dynamically attach parameters if valid
      if (status && status !== 'All Status') filter.status = status;
      if (excludeStatus) filter.status = { $ne: excludeStatus };
      if (createdById) andFilters.push({ createdBy: createdById });
      
      if (priority && priority !== 'All Priorities') filter.priority = priority;
      if (sourceDept && sourceDept !== 'All Departments') filter.sourceDept = sourceDept;
      if (targetDept && targetDept !== 'All Departments') filter.targetDept = targetDept;
      
      if (search) {
        andFilters.push({
          $or: [
            { title: { $regex: search, $options: 'i' } },
            { ticketId: { $regex: search, $options: 'i' } }
          ]
        });
      }

      if (andFilters.length > 0) {
        filter.$and = andFilters;
      }

      const tickets = await Ticket.find(filter)
        .populate({
           path: 'assignee',
          select: 'name profileImage email employeeId department',
          populate: {
            path: 'department',
            select: 'name'
          }
        })
        .populate({
           path: 'createdBy',
          select: 'name profileImage email employeeId department',
          populate: {
            path: 'department',
            select: 'name'
          }
        })
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

  // @desc    Get single ticket by ID
  // @route   GET /api/tickets/:id
  // @access  Private
  async getTicketById(req, res, next) {
    try {
      const { id } = req.params;
      const ticket = await Ticket.findById(id)
        .populate({
          path: 'assignee',
          select: 'name profileImage email employeeId department',
          populate: {
            path: 'department',
            select: 'name'
          }
        })
        .populate({
          path: 'createdBy',
          select: 'name profileImage email employeeId department',
          populate: {
            path: 'department',
            select: 'name'
          }
        });

      if (!ticket) {
        return sendResponse(res, 404, 'FAILED', 'Ticket not found');
      }

      return sendResponse(res, 200, 'SUCCESS', 'Ticket details retrieved successfully', ticket);
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

  // @desc    Reassign ticket to another user
  // @route   POST /api/tickets/reassign
  // @access  Private
  async reassignTicket(req, res, next) {
    try {
      const { ticketId, assigneeId, reassignedBy } = req.body;

      if (!ticketId || !assigneeId || !reassignedBy) {
        return sendResponse(res, 400, 'FAILED', 'Missing required fields: ticketId, assigneeId, reassignedBy');
      }

      const ticket = await Ticket.findById(ticketId);
      if (!ticket) {
        return sendResponse(res, 404, 'FAILED', 'Ticket not found');
      }

      const newAssignee = await User.findById(assigneeId);
      if (!newAssignee) {
        return sendResponse(res, 404, 'FAILED', 'New assignee not found');
      }

      const performer = await User.findById(reassignedBy).populate('department');
      if (!performer) {
        return sendResponse(res, 404, 'FAILED', 'Performer user not found');
      }

      ticket.assignee = assigneeId;
      await ticket.save();

      // Create activity log
      const activityLog = new ActivityLog({
        ticketId: ticket._id,
        action: 'REASSIGNED',
        status: 'success',
        userDetails: {
          name: performer.name,
          email: performer.email,
          employeeId: performer.employeeId,
          department: performer.department?.name || '', 
          roleType: performer.roleType,
          profileImage: performer.profileImage,
          id: performer._id.toString()
        }
      });
      await activityLog.save();

      return sendResponse(res, 200, 'SUCCESS', 'Ticket reassigned successfully', ticket);
    } catch (error) {
      next(error);
    }
  }

  // @desc    Update ticket status and priority with activity logging
  // @route   POST /api/tickets/update-status-priority
  // @access  Private
  async updateStatusPriority(req, res, next) {
    try {
      const { ticketId, status, priority, userId } = req.body;

      if (!ticketId || !userId) {
        return sendResponse(res, 400, 'FAILED', 'Missing required fields: ticketId, userId');
      }

      const ticket = await Ticket.findById(ticketId);
      if (!ticket) {
        return sendResponse(res, 404, 'FAILED', 'Ticket not found');
      }

      const performer = await User.findById(userId).populate('department');
      if (!performer) {
        return sendResponse(res, 404, 'FAILED', 'Performer user not found');
      }

      const oldStatus = ticket.status;
      const oldPriority = ticket.priority;

      let statusChanged = false;
      let priorityChanged = false;

      if (status && status !== oldStatus) {
        ticket.status = status;
        statusChanged = true;
      }

      if (priority && priority !== oldPriority) {
        ticket.priority = priority;
        priorityChanged = true;
      }

      if (!statusChanged && !priorityChanged) {
        return sendResponse(res, 200, 'SUCCESS', 'No changes detected', ticket);
      }

      await ticket.save();

      const userDetails = {
        name: performer.name,
        email: performer.email,
        employeeId: performer.employeeId,
        department: performer.department?.name || '',
        roleType: performer.roleType,
        profileImage: performer.profileImage,
        id: performer._id.toString()
      };

      // Create activity logs
      if (statusChanged) {
        const activityLog = new ActivityLog({
          ticketId: ticket._id,
          action: 'STATUS_CHANGED',
          status: 'success',
          userDetails
        });
        await activityLog.save();
      }

      if (priorityChanged) {
        const activityLog = new ActivityLog({
          ticketId: ticket._id,
          action: 'PRIORITY_CHANGED',
          status: 'success',
          userDetails
        });
        await activityLog.save();
      }

      return sendResponse(res, 200, 'SUCCESS', 'Ticket updated successfully', ticket);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new TicketController();
