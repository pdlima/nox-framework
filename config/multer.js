import path from 'path'
import crypto from 'crypto'
import aws from 'aws-sdk'
import multerS3 from 'multer-s3'

import config from './index'

const MAX_SIZE_TWO_MEGABYTES = 2 * 1024 * 1024

export default {
	dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
	storage: multerS3({
		s3: new aws.S3(),
		bucket: config.aws.bucket,
		contentType: multerS3.AUTO_CONTENT_TYPE,
		acl: 'public-read',
		key: (req, file, cb) => {
			crypto.randomBytes(16, (err, hash) => {
				if (err) cb(err)

				const fileName = `${hash.toString('hex')}-${file.originalname}`

				cb(null, fileName)
			})
		},
	}),
	limits: {
		fileSize: MAX_SIZE_TWO_MEGABYTES,
	},
	fileFilter: (req, file, cb) => {
		const allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png', 'image/gif']

		if (allowedMimes.includes(file.mimetype)) {
			cb(null, true)
		} else {
			cb(new Error('Tipo de arquivo inválido.'))
		}
	},
}
