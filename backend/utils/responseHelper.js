/**
 * Standardized Response Helper
 * { "status": "SUCCESS | FAILED | EXCEPTION | USER_DEFINED", "message": "String", "response": <data_or_null> }
 */

const sendResponse = (res, statusCode, status, message, data = null) => {
  return res.status(statusCode).json({
    status: status,
    message: message,
    response: data
  });
};

module.exports = { sendResponse };
