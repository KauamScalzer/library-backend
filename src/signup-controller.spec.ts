import { MissingParamError } from './errors'
import { badRequest } from './helpers'
import { SignupController } from './signup-controller'

describe('Signup Controller', () => {
	test('Should return 400 if no name is provided', async () => {
		const sut = new SignupController()
		const result = await sut.handle({})
		expect(result).toEqual(badRequest(new MissingParamError('name')))
	})

	test('Should return 400 if no email is provided', async () => {
		const sut = new SignupController()
		const result = await sut.handle({
			name: 'any_name'
		})
		expect(result).toEqual(badRequest(new MissingParamError('email')))
	})

	test('Should return 400 if no password is provided', async () => {
		const sut = new SignupController()
		const result = await sut.handle({
			name: 'any_name',
			email: 'any_email@mail.com'
		})
		expect(result).toEqual(badRequest(new MissingParamError('password')))
	})
})
