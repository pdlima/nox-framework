import { BaseError } from '../boot/exceptionHandlers.boot'

export class APIError extends BaseError {
	constructor(
		description = 'Ocorreu um erro interno no servidor.',
		status = 500,
		isOperational = true
	) {
		super(description, status, isOperational)
	}
}
