import querystring from 'querystring'

import axios from 'axios'

import Spotify from './spotify.model'
import config from '../../config'

import SpotifyWebApi from 'spotify-web-api-node'

import Logger from '../../boot/logger.boot'

export default class SpotifyService {
	constructor() {
		this.prefix = 'sp'
		this.tokenURL = 'https://accounts.spotify.com/api/token'
		this.scopes = [
			'user-read-private',
			'user-read-email',
			'user-read-recently-played',
			'user-read-playback-state',
			'user-library-read',
			'user-library-modify',
			'ugc-image-upload',
			'user-top-read',
			'streaming',
			'user-follow-read',
			'user-follow-modify',
			'playlist-read-private',
			'playlist-modify-public',
			'playlist-modify-private',
		]
		this.stateKey = 'auth_state'
		this.redirectPath = `/api/v1/spotify/callback`
	}

	createLoginArgs(req) {
		const state = this.generateStateRandomString(this.prefix, req.query.to)

		const spotifyApi = new SpotifyWebApi({
			clientId: config.spotify.clientID,
			clientSecret: config.spotify.clientSecret,
			redirectUri: this.makeReqURL(req, this.redirectPath),
		})

		return {
			to: spotifyApi.createAuthorizeURL(this.scopes, state),
			state,
			stateKey: this.stateKey,
		}
	}

	async createRedirectURL(req) {
		const code = req.query.code || null
		const to = this.parseRouteTo(req.query.state)

		//Authorization
		const spotifyApi = new SpotifyWebApi({
			clientId: config.spotify.clientID,
			clientSecret: config.spotify.clientSecret,
			redirectUri: this.makeReqURL(req, this.redirectPath),
		})

		try {
			let params = {
				code,
				redirect_uri: this.makeReqURL(req, this.redirectPath),
				grant_type: 'authorization_code',
				client_id: config.spotify.clientID,
				client_secret: config.spotify.clientSecret,
			}

			let authPayload = await axios({
				method: 'POST',
				url: 'https://accounts.spotify.com/api/token',
				params,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
			})

			if (authPayload.status === 200) {
				const { access_token, refresh_token } = authPayload.data

				const query = querystring.stringify({
					sp_access_token: access_token,
					sp_refresh_token: refresh_token,
				})

				spotifyApi.setAccessToken(access_token)
				spotifyApi.setRefreshToken(refresh_token)

				const me = await spotifyApi.getMe()

				const filter = { id: me.body.id }
				const options = { new: true, upsert: true, setDefaultsOnInsert: true }
				const payload = { ...me.body, access_token, refresh_token }

				await Spotify.findOneAndUpdate(filter, payload, options).exec()

				return `${this.makeReqURL(req, to)}?${query}`
			}
		} catch (e) {
			Logger.error(`💥 Spotify Error... - ${e.message}`)
		}
	}

	makeReqURL(req, uri) {
		if (process.env.WS_URL == 'http://localhost:3000/')
			return `http://${req.get('host')}${uri}`
		return `https://${req.get('host')}${uri}`
	}

	generateRandomString(length) {
		let allowedChars =
			'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
		let result = ''
		for (let i = 0; i < length; i++) {
			result += allowedChars.charAt(
				Math.floor(Math.random() * allowedChars.length)
			)
		}

		return result
	}

	generateStateRandomString(length, redirectTo = '/') {
		return `${this.prefix}_${this.generateRandomString(length)}_${redirectTo}`
	}

	parseRouteTo(state) {
		if (state === null) return ''

		let stateArr = state.split('_')

		return `/${stateArr[stateArr.length - 1]}`
	}
}
