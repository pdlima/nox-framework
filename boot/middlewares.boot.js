import {
	ErrorHandler,
	CelebrateErrorHandler,
	BootError,
} from './exceptionHandlers.boot'

import Logger from './logger.boot'

export default (app) => {
	// -- Catch 404 and forward to error handler
	app.use((req, res, next) => {
		next(new BootError('Não encontrado.', 404))
	})

	// -- Error handlers
	app.use(CelebrateErrorHandler)
	app.use((error, req, res, next) => {
		ErrorHandler.handleError(error)

		Logger.error(
			`${req.method} - ${error.message}  - ${req.originalUrl} - ${req.ip}`
		)

		res.status(error.status).json({
			error: {
				message: error.message,
			},
		})
	})
}
