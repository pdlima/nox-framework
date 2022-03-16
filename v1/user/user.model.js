import mongoose from 'mongoose'

const { Schema } = mongoose

const User = new Schema(
	{
		spotify_id: { type: String },
		nome: { type: String },
		code: { type: String },
		email: {
			type: String,
			lowercase: true,
			unique: true,
			index: true,
		},
		winner: { type: Boolean, default: false },
		region: { type: String },
		photo: { type: String },
		data_nasc: { type: String },
		cidade: { type: String },
		uf: { type: String },
		generos: { type: String },
		outros: { type: String },
		optin: { type: Boolean },
	},
	{ timestamps: true }
)

export default mongoose.model('User', User)
