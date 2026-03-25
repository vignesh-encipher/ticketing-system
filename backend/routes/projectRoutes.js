const express = require('express');
const router = express.Router();
const { createProject, getProjects, getProject, updateProject, deleteProject } = require('../controllers/projectController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
    .get(protect, getProjects)
    .post(protect, authorize('Admin', 'Manager'), createProject);

router.route('/:id')
    .get(protect, getProject)
    .put(protect, authorize('Admin', 'Manager'), updateProject)
    .delete(protect, authorize('Admin', 'Manager'), deleteProject);

module.exports = router;
