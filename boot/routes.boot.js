import { Router } from 'express'

import glob from 'glob'
import config from '../config'

export default (app) => {
	config.api.versions.forEach((version) => {
		const router = Router()

		let routes = []

		glob
			.sync(`**/index.js`, {
				cwd: `api/${version}`,
			})
			.forEach((file) => {
				routes.push(file)
			})

		// -- Adding root file of all subdirectories as router modules
		routes.forEach(async (route) => {
			let { default: routeModule } = await import(`../${version}/${route}`)

			routeModule(router)
		})

		// -- Load API routes
		app.use(`/${version}`, router)
	})
}
