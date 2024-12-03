export const STATUS_CODES = {
  SUCCESS: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
  CONFLICT: 409,
};

export const SUCCESS_STATUS_CODES = new Set([
  200, // OK
  201, // Created
  202, // Accepted
  203, // Non-Authoritative Information
  204, // No Content
  205, // Reset Content
  206, // Partial Content
  207, // Multi-Status (for WebDAV)
  208, // Already Reported (for WebDAV)
  226, // IM Used (for WebDAV)
  304, // Not Modified (cache-related success)
  307, // Temporary Redirect
  308, // Permanent Redirect
]);
