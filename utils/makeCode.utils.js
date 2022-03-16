export const makeCode = (length) => {
	var result = ''
	var characters =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	var charactersLength = characters.length
	for (var i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength))
	}
	return result
}

export const decodeBase64Image = (dataString) => {
	var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
		response = {}

	if (matches.length !== 3) {
		return new Error('Invalid input string')
	}

	response.type = matches[1]
	response.data = new Buffer(matches[2], 'base64')

	return response
}
