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

describe('DbAddUser Usecase', () => {
	test('Should call CheckUserByEmailRepository with correct email', async () => {
		const checkUserByEmailRepositorySpy = new CheckUserByEmailRepositorySpy()
		const sut = new DbAddUser(checkUserByEmailRepositorySpy)
		await sut.add({
			email: 'any_email',
			name: 'any_name',
			password: 'any_password'
		})
		expect(checkUserByEmailRepositorySpy.email).toEqual('any_email')
	})
})
