import cookieParser from 'cookie-parser'
import compression from 'compression'
import express from 'express'

export default (app) => {
	// -- Transforms the raw string of req.body into json
	app.use(express.json({ limit: '500kb' }))

	// -- Transforms application/x-www-form-urlencoded into json
	app.use(express.urlencoded({ extended: true }))

	// -- Parses cookies
	app.use(cookieParser())

	// -- Compression
	app.use(compression())
}
