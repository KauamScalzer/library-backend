import { InternalServerError } from '../errors'
import type { HttpResponse } from '../protocols'

export const badRequest = (error: Error): HttpResponse => ({
	statusCode: 400,
	body: error
})

export const forbidden = (error: Error): HttpResponse => ({
	statusCode: 403,
	body: error
})

export const ok = (body: any): HttpResponse => ({
	statusCode: 200,
	body
})

export const serverError = (): HttpResponse => ({
	statusCode: 500,
	body: new InternalServerError()
})
