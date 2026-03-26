const User = require('../models/User');

class UserService {
  async getAllUsers(pagination) {
    const { skip, limit, page, search, sort } = pagination;
    
    // Build query object
    const query = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { employeeId: { $regex: search, $options: 'i' } }
      ];
    }

    const users = await User.find(query)
      .populate('department', 'name')
      .sort(sort)
      .skip(skip)
      .limit(limit);
      
    const totalCount = await User.countDocuments(query);

    return {
      users,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page
    };
  }

  async getUserById(id) {
    return await User.findById(id).populate('department', 'name');
  }

  async createUser(userData) {
    const user = new User({
      ...userData,
      status: 'Active',
      isDeleted: false
    });
    return await user.save();
  }

  async updateUser(id, updateData) {
    const allowedUpdates = ['name', 'email', 'employeeId', 'department', 'roleType', 'profileImage', 'status'];
    const validUpdateData = {};
    for (const key of allowedUpdates) {
      if (updateData[key] !== undefined) {
        validUpdateData[key] = updateData[key];
      }
    }
    
    return await User.findByIdAndUpdate(id, validUpdateData, { new: true, runValidators: true });
  }

  async softDeleteUser(id) {
    return await User.findByIdAndUpdate(id, {
      isDeleted: true
    }, { new: true });
  }

  async findByEmail(email) {
    return await User.findOne({ email });
  }

  async findByEmployeeId(employeeId) {
    return await User.findOne({ employeeId });
  }
}

module.exports = new UserService();
