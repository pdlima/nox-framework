import multer from 'multer'
import config from '../config/multer'

export const doSingleUpload = multer(config).single('file')
