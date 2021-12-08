class AppError extends Error {
  constructor(message, status, code) {
    super(message)

    this.code = code
    this.status = status
  }

  toJSON() {
    return {
      status: this.status,
      code: this.code,
      message: this.message
    }
  }
}

exports.AppError = AppError

class BadRequestError extends AppError {
  constructor(message) {
    super(message, 400, 'Bad Request')
  }
}

exports.BadRequestError = BadRequestError

class NotFoundError extends AppError {
  constructor(message) {
    super(message, 404, 'Not Found')
  }
}

exports.NotFoundError = NotFoundError

class ConflictError extends AppError {
  constructor(message) {
    super(message, 409, 'Conflict')
  }
}

exports.ConflictError = ConflictError

class InternalServerError extends AppError {
  constructor() {
    super(
      'The server encountered an internal error and was unable to complete your request.', 
      500, 
      'Internal Server Error'
    )
  }
}

exports.InternalServerError = InternalServerError