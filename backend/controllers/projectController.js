const asyncHandler = require('express-async-handler');
const Project = require('../models/Project');

// @desc    Create a project
// @route   POST /api/projects
// @access  Private/Admin,Manager
const createProject = asyncHandler(async (req, res) => {
    const { name, description } = req.body;
    if (!name || !description) {
        res.status(400);
        throw new Error('Please add all fields');
    }
    const project = await Project.create({ name, description });
    res.status(201).json(project);
});

// @desc    Get all projects
// @route   GET /api/projects
// @access  Private
const getProjects = asyncHandler(async (req, res) => {
    const projects = await Project.find();
    res.status(200).json(projects);
});

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Private
const getProject = asyncHandler(async (req, res) => {
    const project = await Project.findById(req.params.id);
    if (!project) {
        res.status(404);
        throw new Error('Project not found');
    }
    res.status(200).json(project);
});

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private/Admin,Manager
const updateProject = asyncHandler(async (req, res) => {
    const project = await Project.findById(req.params.id);
    if (!project) {
        res.status(404);
        throw new Error('Project not found');
    }
    const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedProject);
});

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private/Admin,Manager
const deleteProject = asyncHandler(async (req, res) => {
    const project = await Project.findById(req.params.id);
    if (!project) {
        res.status(404);
        throw new Error('Project not found');
    }
    await project.deleteOne();
    res.status(200).json({ id: req.params.id });
});

module.exports = { createProject, getProjects, getProject, updateProject, deleteProject };
