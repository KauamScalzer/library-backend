import { InvalidParamError, MissingParamError } from '../errors'
import { badRequest } from '../helpers'
import { SignupController } from './signup-controller'
import type { IEmailValidator } from '../protocols'
import type { IAddUser } from '../../domain/usecases'

class EmailValidatorSpy implements IEmailValidator {
	email: string
	result = false
	validate(email: string): boolean {
		this.email = email
		return this.result
	}
}

class AddUserSpy implements IAddUser {
	params: IAddUser.Params
	result: IAddUser.Result = false
	async add(params: IAddUser.Params): Promise<IAddUser.Result> {
		this.params = params
		return this.result
	}
}

type SutTypes = {
	sut: SignupController
	emailValidatorSpy: EmailValidatorSpy
	addUserSpy: AddUserSpy
}

const makeSut = (): SutTypes => {
	const emailValidatorSpy = new EmailValidatorSpy()
	const addUserSpy = new AddUserSpy()
	const sut = new SignupController(emailValidatorSpy, addUserSpy)
	return {
		sut,
		emailValidatorSpy,
		addUserSpy
	}
}

describe('Signup Controller', () => {
	test('Should return 400 if no name is provided', async () => {
		const { sut } = makeSut()
		const result = await sut.handle({})
		expect(result).toEqual(badRequest(new MissingParamError('name')))
	})

	test('Should return 400 if no email is provided', async () => {
		const { sut } = makeSut()
		const result = await sut.handle({
			name: 'any_name'
		})
		expect(result).toEqual(badRequest(new MissingParamError('email')))
	})

	test('Should return 400 if no password is provided', async () => {
		const { sut } = makeSut()
		const result = await sut.handle({
			name: 'any_name',
			email: 'any_email@mail.com'
		})
		expect(result).toEqual(badRequest(new MissingParamError('password')))
	})

	test('Should return 400 if a invalid email is provided', async () => {
		const { sut, emailValidatorSpy } = makeSut()
		emailValidatorSpy.result = true
		const result = await sut.handle({
			name: 'any_name',
			email: 'invalid_email',
			password: 'any_password'
		})
		expect(result).toEqual(badRequest(new InvalidParamError('email')))
	})

	test('Should call EmailValidator with correct email', async () => {
		const { sut, emailValidatorSpy } = makeSut()
		emailValidatorSpy.result = true
		await sut.handle({
			name: 'any_name',
			email: 'any_email@mail.com',
			password: 'any_password'
		})
		expect(emailValidatorSpy.email).toEqual('any_email@mail.com')
	})

	test('Should call AddUser with correct values', async () => {
		const { sut, addUserSpy } = makeSut()
		await sut.handle({
			name: 'any_name',
			email: 'any_email@mail.com',
			password: 'any_password'
		})
		expect(addUserSpy.params).toEqual({
			name: 'any_name',
			email: 'any_email@mail.com',
			password: 'any_password'
		})
	})
})
