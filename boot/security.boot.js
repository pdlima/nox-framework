import lusca from 'lusca'
import session from 'express-session'

export default (app) => {
	// -- Appsec
	app.use(
		session({
			secret: 'NOX',
			resave: true,
			saveUninitialized: true,
		})
	)

	app.use(
		lusca({
			csrf: false,
			xframe: 'SAMEORIGIN',
			p3p: 'NOXNUXT',
			hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
			xssProtection: true,
			nosniff: true,
			referrerPolicy: 'same-origin',
		})
	)
}
