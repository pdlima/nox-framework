import { isCelebrateError } from 'celebrate'

export const CelebrateErrorHandler = (err, req, res, next) => {
	if (isCelebrateError(err)) {
		return res.status(400).json({
			error: {
				message: err.details.get('body').message,
			},
		})
	}

	return next(err)
}

class Handler {
	async handleError(err) {
		// -- Send error to third-party
	}

	isTrustedError(error) {
		if (error instanceof BaseError) {
			return error.isOperational
		}
		return false
	}
}

export const ErrorHandler = new Handler()

// -- Error objects
export class BaseError extends Error {
	constructor(description, status, isOperational) {
		super(description)
		Object.setPrototypeOf(this, new.target.prototype)

		this.status = status
		this.isOperational = isOperational

		Error.captureStackTrace(this)
	}
}

export class BootError extends BaseError {
	constructor(
		description = 'Ocorreu um erro interno no servidor.',
		status = 500,
		isOperational = true
	) {
		super(description, status, isOperational)
	}
}
