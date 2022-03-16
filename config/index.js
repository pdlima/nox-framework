const dotenv = require('dotenv')

dotenv.config()

export default {
	databaseURL: process.env.DATABASE_URI,
	tokenSecret: process.env.TOKEN_SECRET,
	api: {
		versions: ['v1'],
	},
	aws: {
		bucket: process.env.BUCKET_NAME,
		access_key_id: process.env.AWS_ACCESS_KEY_ID,
		secret_access_key: process.env.AWS_SECRET_ACCESS_KEY,
		region: process.env.AWS_DEFAULT_REGION,
	},
	spotify: {
		clientID: process.env.SPOTIFY_CLIENT_ID,
		clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
	},
	deezer: {
		clientID: process.env.DEEZER_CLIENT_ID,
		clientSecret: process.env.DEEZER_CLIENT_SECRET,
	},
}
