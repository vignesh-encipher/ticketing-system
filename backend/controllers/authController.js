const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Department = require('../models/Department');
const { sendResponse } = require('../utils/responseHelper');

// Helper to generate access token (15 mins)
const generateAccessToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '15m' });
};

// Helper to generate refresh token (7 days)
const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET || 'refresh_secret', { expiresIn: '7d' });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, employeeId, department, roleType, password } = req.body;

  if (!name || !email || !employeeId || !department || !roleType || !password) {
    return sendResponse(res, 400, 'FAILED', 'Please provide all required fields');
  }

  // Domain Validation
  if (!email.endsWith('@encipherhealth.com')) {
    return sendResponse(res, 400, 'FAILED', 'Only @encipherhealth.com emails are allowed');
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return sendResponse(res, 400, 'FAILED', 'User already exists');
  }

  const user = await User.create({
    name,
    email,
    employeeId,
    department,
    roleType,
    password
  });

  if (user) {
    return sendResponse(res, 201, 'SUCCESS', 'User registered successfully', {
      id: user._id,
      name: user.name,
      email: user.email,
      roleType: user.roleType
    });
  } else {
    return sendResponse(res, 400, 'FAILED', 'Invalid user data');
  }
});

// @desc    Authenticate user & get tokens
// @route   POST /api/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // Store refresh token in DB
    user.refreshToken = refreshToken;
    await user.save();

    // Set Refresh Token as HttpOnly Cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    // Get full department object
    const department = await Department.findById(user.department);

    return sendResponse(res, 200, 'SUCCESS', 'Login successful', {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        roleType: user.roleType,
        profileImage: user.profileImage,
        department: { name: department.name, id: department._id }
      },
      accessToken
    });
  } else {
    return sendResponse(res, 401, 'FAILED', 'Invalid email or password');
  }
});

// @desc    Refresh access token
// @route   POST /api/auth/refresh
// @access  Public
const refreshAccessToken = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return sendResponse(res, 401, 'FAILED', 'Refresh token not found');
  }

  const user = await User.findOne({ refreshToken });

  if (!user) {
    return sendResponse(res, 401, 'FAILED', 'Invalid refresh token');
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || 'refresh_secret');
    
    if (decoded.id !== user._id.toString()) {
       return sendResponse(res, 401, 'FAILED', 'Token mismatch');
    }

    const accessToken = generateAccessToken(user._id);
    return sendResponse(res, 200, 'SUCCESS', 'Token refreshed', { accessToken });
  } catch (error) {
    return sendResponse(res, 401, 'FAILED', 'Refresh token expired or invalid');
  }
});

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
const logoutUser = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (refreshToken) {
    const user = await User.findOne({ refreshToken });
    if (user) {
      user.refreshToken = null;
      await user.save();
    }
  }

  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict'
  });

  return sendResponse(res, 200, 'SUCCESS', 'Logged out successfully');
});

module.exports = {
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser
};
