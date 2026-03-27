const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    ticketId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ticket', required: true },
    userDetails: {
        id: { type: String, required: true },
        name: { type: String, required: true },
        email: { type: String, required: true },
        employeeId: { type: String },
        department: { type: String },
        roleType: { type: String },
        profileImage: { type: String }
    },
    message: { type: String, required: true },
    isDeleted: { type: Boolean, default: false }
}, { 
    timestamps: true 
});

module.exports = mongoose.model('Comment', commentSchema);
