const Department = require('../models/Department');

class DepartmentService {
  async getAllDepartments(pagination) {
    const { skip, limit, page, search, sort } = pagination;
    
    const query = {};
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    const departments = await Department.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit);
      
    const totalCount = await Department.countDocuments(query);

    return {
      departments,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page
    };
  }

  async getDepartmentById(id) {
    return await Department.findById(id);
  }

  async createDepartment(departmentData) {
    const department = new Department({
      ...departmentData,
      isDeleted: false
    });
    return await department.save();
  }

  async updateDepartment(id, updateData) {
    const allowedUpdates = ['name'];
    const validUpdateData = {};
    for (const key of allowedUpdates) {
      if (updateData[key] !== undefined) {
        validUpdateData[key] = updateData[key];
      }
    }
    
    return await Department.findByIdAndUpdate(id, validUpdateData, { new: true, runValidators: true });
  }

  async softDeleteDepartment(id) {
    return await Department.findByIdAndUpdate(id, {
      isDeleted: true
    }, { new: true });
  }

  async findByName(name) {
    return await Department.findOne({ name: name.toUpperCase() });
  }
}

module.exports = new DepartmentService();
