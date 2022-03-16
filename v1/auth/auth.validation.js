import { celebrate, Joi } from 'celebrate'

const toSignUp = celebrate({
	body: Joi.object({
		email: Joi.string().required().email(),
		nome: Joi.string().required(),
		spotify_id: Joi.string().required(),
		cidade: Joi.string().required(),
		uf: Joi.string().required(),
		data_nasc: Joi.string().required(),
		outros: Joi.string().default('Não informado.'),
		optin: Joi.boolean().required(),
	}),
})

const toSignIn = celebrate({
	body: Joi.object({
		login: Joi.string().required().email(),
		password: Joi.string().required(),
	}),
})

export default {
	toSignUp,
	toSignIn,
}
