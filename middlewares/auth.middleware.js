import config from '../config'
import jwt from 'jsonwebtoken'

import { APIError } from '../utils'

const protect = (req, res, next) => {
	const authHeader = req.headers['authorization']
	const token = authHeader && authHeader.split(' ')[1]

	if (token == null) throw new APIError('Token inválido.', 403)

	jwt.verify(token, config.tokenSecret, (err, user) => {
		if (err)
			throw new APIError('Você não tem autorização para fazer esta ação.', 403)

		req.user = user

		next()
	})
}

export const protectHybridRoute = (req, res, next) => {
	if (req.query.representation == 'public') {
		next()
		return
	}

	protect(req, res, next)
}

export const protectRoute = (req, res, next) => {
	protect(req, res, next)
}
