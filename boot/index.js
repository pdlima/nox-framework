import express from 'express'

// -- Bootables
import bootDatabase from './database.boot'
import bootHealthCheck from './healthCheck.boot'
import bootHeaders from './headers.boot'
import bootTransforms from './transforms.boot'
import bootSecurity from './security.boot'
import bootHttpLogs from './httplogs.boot'
import bootRoutes from './routes.boot'
import bootMiddlewares from './middlewares.boot'

import { ErrorHandler } from './exceptionHandlers.boot'

import Logger from './logger.boot'

process.on('uncaughtException', (err) => {
	ErrorHandler.handleError(err)

	if (!ErrorHandler.isTrustedError(err)) {
		Logger.error(`UNCAUGHT EXCEPTION! 💥 Shutting down... - ${err.message}`)
		process.exit(1)
	}
})

process.on('unhandledRejection', (err) => {
	ErrorHandler.handleError(err)

	Logger.error(`UNHANDLED REJECTION! 💥 Shutting down... - ${err.message}`)
	process.exit(1)
})

// -- App
const app = express()

bootDatabase()

const bootables = [
	bootHealthCheck,
	bootHeaders,
	bootTransforms,
	bootSecurity,
	bootHttpLogs,
	bootRoutes,
	bootMiddlewares,
]

bootables.forEach((bootable) => {
	bootable(app)
})

export default app
