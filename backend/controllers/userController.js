const userService = require('../services/userService');
const { sendResponse } = require('../utils/responseHelper');

class UserController {
  async getAllUsers(req, res, next) {
    try {
      const result = await userService.getAllUsers(req.pagination);
      return sendResponse(res, 200, 'SUCCESS', 'Users retrieved successfully', result);
    } catch (error) {
      next(error);
    }
  }

  async createUser(req, res, next) {
    try {
      const { name, email, employeeId, department, roleType, profileImage } = req.body;
      
      if (!name || !email || !employeeId || !department || !roleType) {
        return sendResponse(res, 400, 'FAILED', 'name, email, employeeId, department, and roleType are required');
      }

      // Basic validation for email and employeeId uniqueness
      const [existingEmail, existingEmpId] = await Promise.all([
        userService.findByEmail(email),
        userService.findByEmployeeId(employeeId)
      ]);

      if (existingEmail) return sendResponse(res, 400, 'FAILED', 'Email already exists');
      if (existingEmpId) return sendResponse(res, 400, 'FAILED', 'Employee ID already exists');
      
      const newUser = await userService.createUser({ name, email, employeeId, department, roleType, profileImage });
      return sendResponse(res, 201, 'SUCCESS', 'User created successfully', newUser);
    } catch (error) {
      if (error.name === 'ValidationError') {
        return sendResponse(res, 400, 'FAILED', Object.values(error.errors).map(v => v.message).join(', '));
      }
      next(error);
    }
  }

  async updateUser(req, res, next) {
    try {
      const updatedUser = await userService.updateUser(req.params.id, req.body);
      if (!updatedUser) {
        return sendResponse(res, 404, 'FAILED', 'User not found');
      }
      
      return sendResponse(res, 200, 'SUCCESS', 'User updated successfully', updatedUser);
    } catch (error) {
      if (error.name === 'ValidationError') {
        return sendResponse(res, 400, 'FAILED', Object.values(error.errors).map(v => v.message).join(', '));
      }
      if (error.code === 11000) {
        return sendResponse(res, 400, 'FAILED', 'Unique field (Email or Employee ID) already exists');
      }
      next(error);
    }
  }

  async deleteUser(req, res, next) {
    try {
      const deletedUser = await userService.softDeleteUser(req.params.id);
      if (!deletedUser) {
        return sendResponse(res, 404, 'FAILED', 'User not found');
      }
      
      return sendResponse(res, 200, 'SUCCESS', 'User deleted successfully');
    } catch (error) {
      next(error);
    }
  }

  async getUsersByDepartment(req, res, next) {
    try {
      const { departmentName } = req.params;
      const { role } = req.query;
      const result = await userService.getUsersByDepartment(departmentName, role);
      return sendResponse(res, 200, 'SUCCESS', 'Users retrieved successfully', result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
