const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ['Todo', 'In Progress', 'Done', 'Blocked'], default: 'Todo' },
    priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Ticket', ticketSchema);
