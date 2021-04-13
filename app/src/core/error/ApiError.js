class ApiError extends Error {
  constructor(e) {
    super();
    if (e && e.message && e.statusCode) {
      this.message = `${e.statusCode} ${e.message}`;
      this.statusCode = e.statusCode;
    } else {
      this.message = 'Er ging iets mis';
      this.statusCode = 500;
    }
  }

  toString() {
    return this.message;
  }

  isUnauthorized() {
    return this.statusCode === 401;
  }
}

export default ApiError;
