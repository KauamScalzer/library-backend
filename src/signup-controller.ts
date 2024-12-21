import { MissingParamError } from './errors'
import { badRequest } from './helpers'
import type { Controller, HttpResponse } from './protocols'

export class SignupController implements Controller {
	async handle(request: any): Promise<HttpResponse> {
		const requiredFields = ['name', 'email', 'password']
		for (const field of requiredFields) {
			if (!request[field]) {
				return badRequest(new MissingParamError(field))
			}
		}
		return {
			statusCode: 404,
			body: 'not_implemented'
		}
	}
}
