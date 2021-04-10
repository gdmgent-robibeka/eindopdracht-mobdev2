class NotFoundError extends Error {
  constructor() {
    super();
    this.message = 'Resource not Found';
    this.statusCode = 404;
  }
}

module.exports = NotFoundError;
