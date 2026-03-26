const { sendResponse } = require('../utils/responseHelper');

/**
 * Global Error Handler Middleware
 */
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  
  sendResponse(
    res, 
    500, 
    'EXCEPTION', 
    err.message || 'An unexpected error occurred',
    null
  );
};

module.exports = errorHandler;
