import { DbAddUser } from './DbAddUser'
import type { ICheckUserByEmailRepository, IEncrypter } from '../protocols'
import type { IAddUser } from '../../domain/usecases'

class EncrypterSpy implements IEncrypter {
	value: string
	result = 'encrypted_value'
	async encrypt(value: string): Promise<string> {
		this.value = value
		return this.result
	}
}

class CheckUserByEmailRepositorySpy implements ICheckUserByEmailRepository {
	email: string
	result = false
	async check(email: string): Promise<boolean> {
		this.email = email
		return this.result
	}
}

type SutTypes = {
	checkUserByEmailRepositorySpy: CheckUserByEmailRepositorySpy
	encrypterSpy: EncrypterSpy
	sut: DbAddUser
}

const makeSut = (): SutTypes => {
	const encrypterSpy = new EncrypterSpy()
	const checkUserByEmailRepositorySpy = new CheckUserByEmailRepositorySpy()
	const sut = new DbAddUser(checkUserByEmailRepositorySpy, encrypterSpy)
	return {
		sut,
		checkUserByEmailRepositorySpy,
		encrypterSpy
	}
}

const mockParams = (): IAddUser.Params => ({
	email: 'any_email',
	name: 'any_name',
	password: 'any_password'
})

const throwError = (): never => {
	throw new Error()
}

describe('DbAddUser Usecase', () => {
	test('Should call CheckUserByEmailRepository with correct email', async () => {
		const { sut, checkUserByEmailRepositorySpy } = makeSut()
		const params = mockParams()
		await sut.add(params)
		expect(checkUserByEmailRepositorySpy.email).toEqual(params.email)
	})

	test('Should throw if CheckUserByEmailRepository throws', async () => {
		const { sut, checkUserByEmailRepositorySpy } = makeSut()
		jest.spyOn(checkUserByEmailRepositorySpy, 'check').mockImplementationOnce(throwError)
		const params = mockParams()
		const promise = sut.add(params)
		await expect(promise).rejects.toThrow()
	})

	test('Should return true if CheckUserByEmailRepository returns true', async () => {
		const { sut, checkUserByEmailRepositorySpy } = makeSut()
		checkUserByEmailRepositorySpy.result = true
		const params = mockParams()
		const result = await sut.add(params)
		expect(result).toBeTruthy()
	})

	test('Should call Encrypter with correct password', async () => {
		const { sut, encrypterSpy } = makeSut()
		const params = mockParams()
		await sut.add(params)
		expect(encrypterSpy.value).toEqual(params.password)
	})

	test('Should throw if Encrypter throws', async () => {
		const { sut, encrypterSpy } = makeSut()
		jest.spyOn(encrypterSpy, 'encrypt').mockImplementationOnce(throwError)
		const params = mockParams()
		const promise = sut.add(params)
		await expect(promise).rejects.toThrow()
	})
})
