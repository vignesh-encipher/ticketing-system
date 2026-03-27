const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const paginationMiddleware = require('../middleware/pagination');

// GET /api/users
router.get('/', paginationMiddleware, userController.getAllUsers);

// POST /api/users
router.post('/', userController.createUser);

// PUT /api/users/:id
router.put('/:id', userController.updateUser);

// DELETE /api/users/:id
router.delete('/:id', userController.deleteUser);

// GET /api/users/department/:departmentName
router.get('/department/:departmentName', userController.getUsersByDepartment);

module.exports = router;
