const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema({
  ticket: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ticket',
    required: true
  },
  action: {
    type: String,
    required: true,
    enum: ['Ticket Created', 'Status Changed', 'Priority Changed', 'Assigned To', 'Comment Added', 'Attachment Added', 'Ticket Updated']
  },
  performedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  details: {
    type: Object,
    default: {}
  }
}, { timestamps: true });

// Exclude _id and __v from JSON responses, use 'id' instead
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
