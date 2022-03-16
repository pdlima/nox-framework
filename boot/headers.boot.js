import cors from 'cors'

export default (app) => {
	// -- Enable CORS
	app.use(cors())
}
