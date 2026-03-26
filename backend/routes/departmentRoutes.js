const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');
const paginationMiddleware = require('../middleware/pagination');

// GET /api/departments
router.get('/', paginationMiddleware, departmentController.getAllDepartments);

// POST /api/departments
router.post('/', departmentController.createDepartment);

// PUT /api/departments/:id
router.put('/:id', departmentController.updateDepartment);

// DELETE /api/departments/:id
router.delete('/:id', departmentController.deleteDepartment);

module.exports = router;
