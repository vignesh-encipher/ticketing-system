const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const { sendResponse } = require('../utils/responseHelper');

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from token
            req.user = await User.findById(decoded.id).select('-password');
            
            if (!req.user) {
                return sendResponse(res, 401, 'FAILED', 'Not authorized, user not found');
            }

            next();
        } catch (error) {
            console.error(error);
            return sendResponse(res, 401, 'FAILED', 'Not authorized, token failed');
        }
    }

    if (!token) {
        return sendResponse(res, 401, 'FAILED', 'Not authorized, no token');
    }
});

const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.roleType)) {
            return sendResponse(res, 403, 'FAILED', `User role ${req.user.roleType} is not authorized to access this route`);
        }
        next();
    };
};

module.exports = { protect, authorize };
