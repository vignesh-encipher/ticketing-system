const express = require('express');
const router = express.Router();
const { getUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
    .get(protect, authorize('Admin'), getUsers);

router.route('/:id')
    .get(protect, getUserById)
    .put(protect, authorize('Admin'), updateUser)
    .delete(protect, authorize('Admin'), deleteUser);

module.exports = router;
