const mongoose = require('mongoose');
const Counter = require('./Counter');

const ticketSchema = new mongoose.Schema({
  ticketId: {
    type: String,
    unique: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: ""
  },
  sourceDept: {
    type: String,
    trim: true,
    default: ""
  },
  targetDept: {
    type: String,
    trim: true,
    default: ""
  },
  priority: {
    type: String,
    enum: ['Critical', 'High', 'Medium', 'Low'],
    default: 'Medium'
  },
  status: {
    type: String,
    enum: ['Open','Reopened', 'In Progress', 'On Hold', 'Resolved', 'Closed', 'PENDING_APPROVAL', 'ASSIGNED'],
    default: 'Open'
  },
  assignee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  approvalToken: {
    type: String,
    default: null
  },
  expiresAt: {
    type: Date,
    default: null
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  attachments: [{
    fileName: { type: String },
    fileUrl: { type: String }, // Works for Base64 Strings, AWS S3 URLs, or Mock API Links
    fileSize: { type: Number },
    fileType: { type: String } // e.g., 'image/png', 'application/pdf'
  }],
  isDeleted: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

// Auto-increment ticketId pre-save seamlessly mapping into native async mongoose signatures
ticketSchema.pre('save', async function() {
  const doc = this;
  if (doc.isNew) {
    const counter = await Counter.findOneAndUpdate(
      { id: 'ticketId' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    doc.ticketId = `TK-${counter.seq}`;
  }
});

// Exclude implicitly deleted documents from GET queries
ticketSchema.pre(/^find/, function() {
  this.where({ isDeleted: { $ne: true } });
});

ticketSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
  }
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
