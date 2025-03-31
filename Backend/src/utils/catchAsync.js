/**
 * A utility function to catch errors in async functions and pass them to the next middleware.
 * @param {Function} fn - The async function to wrap.
 * @returns {Function} - A wrapped function with error handling.
 */
const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default catchAsync;
