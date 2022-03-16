import { Router } from 'express'
import { asyncRequest } from '../../utils'

import SpotifyService from './spotify.service'
import SpotifyValidation from './spotify.validation'

const router = Router()
const SpotifyDAO = new SpotifyService()

export default (app) => {
	app.use('/spotify', router)

	router.get(
		'/login',
		asyncRequest(async (req, res) => {
			const loginArgs = await SpotifyDAO.createLoginArgs(req)

			res.cookie(loginArgs.state, loginArgs.stateKey)
			res.redirect(loginArgs.to)
		})
	)

	router.get(
		'/callback',
		asyncRequest(async (req, res) => {
			const redirectURL = await SpotifyDAO.createRedirectURL(req)
			console.log(redirectURL)
			res.redirect(redirectURL)
		})
	)
}
