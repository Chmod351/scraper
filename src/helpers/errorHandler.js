class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }
}

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = 'BadRequestError';
    this.statusCode = 400;
  }
}

class SomethingWentWrong extends Error {
  constructor(message) {
    super(message);
    this.name = 'SomethingWentWrong';
    this.statusCode = 500;
  }
}

function errorHandler(error, req, res, next) {
  if (error.statusCode) {
    res.status(error.statusCode).json({ error: error.message });
  }
  next();
}

export { errorHandler, BadRequestError, NotFoundError,SomethingWentWrong };
