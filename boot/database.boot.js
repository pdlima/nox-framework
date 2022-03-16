import mongoose from 'mongoose'
import config from '../config'

import Logger from './logger.boot'

export default async () => {
	await mongoose.connect(config.databaseURL, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	})

	Logger.info('MongoDB Initialized')
}
