import type { IAddUser } from '../../domain/usecases'
import type { ICheckUserByEmailRepository, IEncrypter, IInsertUserRepository } from '../protocols'

export class DbAddUser implements IAddUser {
	constructor(
		private readonly checkUserByEmailRepository: ICheckUserByEmailRepository,
		private readonly encrypter: IEncrypter,
		private readonly insertUserRepository: IInsertUserRepository
	) {}
	async add(params: IAddUser.Params): Promise<IAddUser.Result> {
		const user = await this.checkUserByEmailRepository.check(params.email)
		if (user) {
			return true
		}
		const hashedPassword = await this.encrypter.encrypt(params.password)
		await this.insertUserRepository.insert({
			...params,
			password: hashedPassword
		})
		return
	}
}
