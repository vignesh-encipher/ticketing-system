/**
 * Pagination, Search, and Sorting Middleware
 */
const paginationMiddleware = (req, res, next) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  
  // Search
  const search = req.query.search || '';
  
  // Sorting (default to createdAt desc)
  const sortByField = req.query.sortByField || 'createdAt';
  const sortByType = req.query.sortByType && req.query.sortByType.toLowerCase() === 'asc' ? 1 : -1;
  const department = req.query.department || '';
  const roleType = req.query.roleType || '';
  const status = req.query.status || '';

  const sort = { [sortByField]: sortByType };

  // Ensure non-negative values
  req.pagination = {
    page: page > 0 ? page : 1,
    limit: limit > 0 ? limit : 10,
    skip: (page > 0 ? page - 1 : 0) * (limit > 0 ? limit : 10),
    search,
    sort,
    department,
    roleType,
    status
  };

  next();
};

module.exports = paginationMiddleware;
