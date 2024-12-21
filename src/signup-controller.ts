import { MissingParamError } from './errors'
import { badRequest } from './helpers'
import type { Controller, HttpResponse } from './protocols'

export class SignupController implements Controller {
	async handle(request: any): Promise<HttpResponse> {
		if (!request.name) {
			return badRequest(new MissingParamError('name'))
		}
		if (!request.email) {
			return badRequest(new MissingParamError('email'))
		}
		if (!request.password) {
			return badRequest(new MissingParamError('password'))
		}
		return {
			statusCode: 404,
			body: 'not_implemented'
		}
	}
}
