const departmentService = require('../services/departmentService');
const { sendResponse } = require('../utils/responseHelper');

class DepartmentController {
  async getAllDepartments(req, res, next) {
    try {
      const result = await departmentService.getAllDepartments(req.pagination);
      return sendResponse(res, 200, 'SUCCESS', 'Departments retrieved successfully', result);
    } catch (error) {
      next(error);
    }
  }

  async createDepartment(req, res, next) {
    try {
      const { name } = req.body;
      
      if (!name) {
        return sendResponse(res, 400, 'FAILED', 'Department name is required');
      }

      const existingDept = await departmentService.findByName(name);
      if (existingDept) {
        return sendResponse(res, 400, 'FAILED', 'Department already exists');
      }
      
      const newDept = await departmentService.createDepartment({ name });
      return sendResponse(res, 201, 'SUCCESS', 'Department created successfully', newDept);
    } catch (error) {
      if (error.name === 'ValidationError') {
        return sendResponse(res, 400, 'FAILED', Object.values(error.errors).map(v => v.message).join(', '));
      }
      if (error.code === 11000) {
        return sendResponse(res, 400, 'FAILED', 'Department already exists');
      }
      next(error);
    }
  }

  async updateDepartment(req, res, next) {
    try {
      const updatedDept = await departmentService.updateDepartment(req.params.id, req.body);
      if (!updatedDept) {
        return sendResponse(res, 404, 'FAILED', 'Department not found');
      }
      
      return sendResponse(res, 200, 'SUCCESS', 'Department updated successfully', updatedDept);
    } catch (error) {
      if (error.name === 'ValidationError') {
        return sendResponse(res, 400, 'FAILED', Object.values(error.errors).map(v => v.message).join(', '));
      }
      if (error.code === 11000) {
        return sendResponse(res, 400, 'FAILED', 'Department name already exists');
      }
      next(error);
    }
  }

  async deleteDepartment(req, res, next) {
    try {
      const deletedDept = await departmentService.softDeleteDepartment(req.params.id);
      if (!deletedDept) {
        return sendResponse(res, 404, 'FAILED', 'Department not found');
      }
      
      return sendResponse(res, 200, 'SUCCESS', 'Department deleted successfully');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new DepartmentController();
