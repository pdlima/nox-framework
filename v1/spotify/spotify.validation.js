import { celebrate, Joi } from 'celebrate'

const toFindMe = celebrate({
	body: Joi.object({
		token: Joi.string().required(),
	}),
})

export default {
	toFindMe,
}
