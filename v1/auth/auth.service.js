import config from '../../config'

import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt-nodejs'
import fs from 'fs'

import User from '../user/user.model'
import Mission from '../missions/mission.model'


import { APIError, makeCode, decodeBase64Image } from '../../utils'

export default class AuthService {
	constructor() {}

	async SignedUp(spotify_id) {
		return await User.findOne({ spotify_id }).exec()
	}

	async uploadPhoto(file, code) {
		let code = makeCode(9)

		let decodedImg = decodeBase64Image(file)
		let imageBuffer = decodedImg.data
		let type = decodedImg.type
		let extension = 'jpg'
		let fileName = code + '.' + extension

		fs.writeFileSync('./uploads/' + fileName, imageBuffer, 'utf8')

		return code
	}

	async ChangePhoto(spotify_id, payload) {
		const filter = { spotify_id }
		const options = { new: true, upsert: true, setDefaultsOnInsert: true }

		const savedUser = await User.findOneAndUpdate(
			filter,
			payload,
			options
		).exec()

		return savedUser
	}

	async SignUp(payload) {
		const filter = { email: payload.email }
		const options = { new: true, upsert: true, setDefaultsOnInsert: true }

		const savedUser = await User.findOneAndUpdate(
			filter,
			payload,
			options
		).exec()

		if (typeof payload.inviteCode !== 'undefined') {
			let userWhoInvited = await User.findOne({
				code: payload.inviteCode,
			}).exec()

			if (userWhoInvited !== null) {
				const missionFilter = {
					spotify_id: userWhoInvited.spotify_id,
					type: 6,
					score: 1,
				}
				const missionOptions = {
					new: true,
					upsert: true,
					setDefaultsOnInsert: true,
				}

				await Mission.findOneAndUpdate(
					missionFilter,
					payload,
					missionOptions
				).exec()
			}
		}

		return savedUser
	}

	async SignIn(email, password) {
		let user = await User.findOne({ email }).exec()

		if (user == null || !bcrypt.compareSync(password, user.password)) {
			throw new APIError('Dados inválidos!', 400)
		}

		return this.generateAccessToken(email)
	}

	generateAccessToken(login) {
		return jwt.sign({ login }, config.tokenSecret, { expiresIn: '1800s' })
	}

	encryptPassword(password) {
		return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
	}
}
