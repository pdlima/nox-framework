export const normalizeBody = (req, res, next) => {
	if (req.file) {
		const { key, location: url = '' } = req.file

		req.body.photo = url
		req.body.aws_key = key
	}

	next()
}
