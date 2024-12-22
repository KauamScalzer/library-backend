import type { IAddUser, IAuthenticate } from '../../domain/usecases'
import {
	EmailInUseError,
	InvalidParamError,
	MissingParamError
} from '../errors'
import { badRequest, forbidden } from '../helpers'
import type { Controller, HttpResponse, IEmailValidator } from '../protocols'

export class SignupController implements Controller {
	constructor(
		private readonly emailValidator: IEmailValidator,
		private readonly addUser: IAddUser,
		private readonly authenticate: IAuthenticate
	) {}
	async handle(request: any): Promise<HttpResponse> {
		const requiredFields = ['name', 'email', 'password']
		for (const field of requiredFields) {
			if (!request[field]) {
				return badRequest(new MissingParamError(field))
			}
		}
		const { name, email, password } = request
		const isEmailInvalid = this.emailValidator.validate(email)
		if (isEmailInvalid) {
			return badRequest(new InvalidParamError('email'))
		}
		const user = await this.addUser.add({ name, email, password })
		if (user) {
			return forbidden(new EmailInUseError())
		}
		await this.authenticate.auth({ email, password })
		return {
			statusCode: 404,
			body: 'not_implemented'
		}
	}
}
