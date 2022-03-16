import mongoose from 'mongoose'

const { Schema } = mongoose

const Spotify = new Schema(
	{
		id: {
			type: String,
		},
		display_name: {
			type: [String],
		},
		email: {
			type: String,
		},
		external_urls: {
			spotify: {
				type: String,
			},
		},
		followers: {
			type: Schema.Types.Mixed,
		},
		images: {
			type: Schema.Types.Mixed,
		},
		product: {
			type: String,
		},
		uri: {
			type: String,
		},
		access_token: {
			type: String,
		},
		refresh_token: {
			type: String,
		},
	},
	{ timestamps: true }
)

export default mongoose.model('Spotify', Spotify)
