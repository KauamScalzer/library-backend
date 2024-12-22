import { DbAddUser } from './DbAddUser'
import type { ICheckUserByEmailRepository } from '../protocols'

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
	sut: DbAddUser
}

const makeSut = (): SutTypes => {
	const checkUserByEmailRepositorySpy = new CheckUserByEmailRepositorySpy()
	const sut = new DbAddUser(checkUserByEmailRepositorySpy)
	return {
		sut,
		checkUserByEmailRepositorySpy
	}
}

describe('DbAddUser Usecase', () => {
	test('Should call CheckUserByEmailRepository with correct email', async () => {
		const { sut, checkUserByEmailRepositorySpy } = makeSut()
		await sut.add({
			email: 'any_email',
			name: 'any_name',
			password: 'any_password'
		})
		expect(checkUserByEmailRepositorySpy.email).toEqual('any_email')
	})
})
