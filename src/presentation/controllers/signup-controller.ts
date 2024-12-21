import { InvalidParamError, MissingParamError } from '../errors'
import { badRequest } from '../helpers'
import type { Controller, HttpResponse, IEmailValidator } from '../protocols'

export class SignupController implements Controller {
	constructor(private readonly emailValidator: IEmailValidator) {}
	async handle(request: any): Promise<HttpResponse> {
		const requiredFields = ['name', 'email', 'password']
		for (const field of requiredFields) {
			if (!request[field]) {
				return badRequest(new MissingParamError(field))
			}
		}
		const isEmailInvalid = this.emailValidator.validate(request.email)
		if (isEmailInvalid) {
			return badRequest(new InvalidParamError('email'))
		}
		return {
			statusCode: 404,
			body: 'not_implemented'
		}
	}
}
