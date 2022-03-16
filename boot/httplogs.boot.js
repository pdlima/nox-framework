import morgan from 'morgan'

import Logger from './logger.boot'

export default (app) => {
	// -- Logging requests
	app.use(
		morgan(':method :url :status :res[content-length] - :response-time ms', {
			skip: (req, res) => {
				return process.env.NODE_ENV === 'production'
			},
			stream: {
				write: (message) => Logger.http(message),
			},
		})
	)
}
