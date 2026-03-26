const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address']
  },
  employeeId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: true
  },
  roleType: {
    type: String,
    required: true,
    trim: true
  },
  profileImage: {
    type: String, // Base64 string
    default: null
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  },
  isDeleted: {
    type: Boolean,
    default: false,
  }
}, { timestamps: true });

// Exclude implicitly deleted documents from GET queries
userSchema.pre(/^find/, function() {
  this.where({ isDeleted: { $ne: true } });
});

const User = mongoose.model('User', userSchema);

module.exports = User;
