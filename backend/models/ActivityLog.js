const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema({
  ticketId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ticket',
    required: true
  },
  userDetails: {
    name: String,
    email: String,
    employeeId: String,
    department: String,
    roleType: String,
    profileImage: String,
    id: String
  },
  action: {
    type: String,
    required: true,
    enum: ['COMMENT_ADDED', 'TICKET_CREATED', 'ASSIGNED', 'REASSIGNED', 'STATUS_CHANGED', 'DESCRIPTION_EDIT']
  },
  status: {
    type: String,
    required: true,
    enum: ['success', 'processing', 'error', 'warning'],
    default: 'processing'
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, { 
  timestamps: true 
});

// Configure toJSON to return virtuals and format IDs
activityLogSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
  }
});

const ActivityLog = mongoose.model('ActivityLog', activityLogSchema);

module.exports = ActivityLog;
