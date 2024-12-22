import type { IAddUser } from '../../domain/usecases'
import type { ICheckUserByEmailRepository, IEncrypter } from '../protocols'

export class DbAddUser implements IAddUser {
	constructor(
		private readonly checkUserByEmailRepository: ICheckUserByEmailRepository,
		private readonly encrypter: IEncrypter
	) {}
	async add(params: IAddUser.Params): Promise<IAddUser.Result> {
		const user = await this.checkUserByEmailRepository.check(params.email)
		if (user) {
			return true
		}
		await this.encrypter.encrypt(params.password)
		return
	}
}
