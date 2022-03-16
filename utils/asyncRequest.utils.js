import { APIError } from './customErrors.utils'

export const asyncRequest = (handler) => (req, res) =>
	handler(req, res).catch((e) => {
		throw new APIError(e.message, 400)
	})
