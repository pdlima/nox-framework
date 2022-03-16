import { Router } from 'express'

import { asyncRequest } from '../../utils'
import { protectRoute, normalizeBody } from '../../middlewares'
import multer from 'multer'
import multerConfig from '../../config/multer'

import AuthService from './auth.service'
import AuthValidation from './auth.validation'

const router = Router()
const DAO = new AuthService()

export default (app) => {
	app.use('/auth', router)

	router.get(
		'/signedup',
		protectRoute,
		AuthValidation.toSignUp,
		asyncRequest(async (req, res) => {
			const user = await DAO.SignedUp(req.query.spotify_id)

			res.status(200).json(user)
		})
	)
	
	router.post(
		'/signup',
		protectRoute,
		AuthValidation.toSignUp,
		asyncRequest(async (req, res) => {
			const user = await DAO.SignUp(req.body)

			res.status(200).json(user)
		})
	)

	router.post(
		'/signin',
		AuthValidation.toSignIn,
		asyncRequest(async (req, res) => {
			const { login, password } = req.body

			const token = await DAO.SignIn(login, password)

			res.status(200).json({ token })
		})
	)

	router.post(
		'/changephoto/:id',
		protectRoute,
		AuthValidation.toSignUp,
		multer(multerConfig).single('file'),
		normalizeBody,
		asyncRequest(async (req, res) => {
			const { id } = req.params
			const user = await DAO.ChangePhoto(id, req.body)

			res.status(200).json(user)
		})
	)

	router.post(
		'/opengraph/:id',
		protectRoute,
		AuthValidation.toSignUp,
		asyncRequest(async (req, res) => {
			const { id } = req.params

			const uploadedPhotoCode = await DAO.uploadPhoto(req.body.file)
			
			await DAO.ChangePhoto(id, { uploadedPhotoCode })

			res.status(200).json(uploadedPhotoCode)
		})
	)
}
