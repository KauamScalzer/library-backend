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
	statusCode: 403,
	body
})
