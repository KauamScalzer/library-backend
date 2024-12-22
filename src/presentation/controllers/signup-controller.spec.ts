import {
	EmailInUseError,
	InvalidParamError,
	MissingParamError
} from '../errors'
import { badRequest, forbidden, ok, serverError } from '../helpers'
import { SignupController } from './signup-controller'
import type { IEmailValidator } from '../protocols'
import type { IAddUser, IAuthenticate } from '../../domain/usecases'

class AuthenticateSpy implements IAuthenticate {
	params: IAuthenticate.Params
	result: IAuthenticate.Result = {
		token: 'any_token'
	}
	async auth(params: IAuthenticate.Params): Promise<IAuthenticate.Result> {
		this.params = params
		return this.result
	}
}

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
	authenticateSpy: AuthenticateSpy
}

const makeSut = (): SutTypes => {
	const authenticateSpy = new AuthenticateSpy()
	const emailValidatorSpy = new EmailValidatorSpy()
	const addUserSpy = new AddUserSpy()
	const sut = new SignupController(
		emailValidatorSpy,
		addUserSpy,
		authenticateSpy
	)
	return {
		sut,
		emailValidatorSpy,
		addUserSpy,
		authenticateSpy
	}
}

const throwError = (): never => {
	throw new Error()
}

const mockParams = (): SignupController.Params => ({
	name: 'any_name',
	email: 'any_email@mail.com',
	password: 'any_password'
})

describe('Signup Controller', () => {
	test('Should return 400 if no name is provided', async () => {
		const { sut } = makeSut()
		const params: any = {}
		const result = await sut.handle(params)
		expect(result).toEqual(badRequest(new MissingParamError('name')))
	})

	test('Should return 400 if no email is provided', async () => {
		const { sut } = makeSut()
		const params: any = {
			name: 'any_name'
		}
		const result = await sut.handle(params)
		expect(result).toEqual(badRequest(new MissingParamError('email')))
	})

	test('Should return 400 if no password is provided', async () => {
		const { sut } = makeSut()
		const params: any = {
			name: 'any_name',
			email: 'any_email@mail.com'
		}
		const result = await sut.handle(params)
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
		const params = mockParams()
		await sut.handle(params)
		expect(emailValidatorSpy.email).toEqual(params.email)
	})

	test('Should return 500 if EmailValidator throws', async () => {
		const { sut, emailValidatorSpy } = makeSut()
		jest.spyOn(emailValidatorSpy, 'validate').mockImplementationOnce(throwError)
		const result = await sut.handle(mockParams())
		expect(result).toEqual(serverError())
	})

	test('Should call AddUser with correct values', async () => {
		const { sut, addUserSpy } = makeSut()
		const params = mockParams()
		await sut.handle(params)
		expect(addUserSpy.params).toEqual(params)
	})

	test('Should return 500 if AddUser throws', async () => {
		const { sut, addUserSpy } = makeSut()
		jest.spyOn(addUserSpy, 'add').mockImplementationOnce(throwError)
		const result = await sut.handle(mockParams())
		expect(result).toEqual(serverError())
	})

	test('Should return 403 if AddUser returns true', async () => {
		const { sut, addUserSpy } = makeSut()
		addUserSpy.result = true
		const result = await sut.handle(mockParams())
		expect(result).toEqual(forbidden(new EmailInUseError()))
	})

	test('Should call Authenticate with correct values', async () => {
		const { sut, authenticateSpy } = makeSut()
		const params = mockParams()
		await sut.handle(params)
		expect(authenticateSpy.params).toEqual({
			email: params.email,
			password: params.password
		})
	})

	test('Should return 200 on success', async () => {
		const { sut, authenticateSpy } = makeSut()
		const result = await sut.handle(mockParams())
		expect(result).toEqual(ok(authenticateSpy.result))
	})
})
