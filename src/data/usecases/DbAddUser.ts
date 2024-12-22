import type { IAddUser } from '../../domain/usecases'
import type { ICheckUserByEmailRepository } from '../protocols'

export class DbAddUser implements IAddUser {
	constructor(private readonly checkUserByEmailRepository: ICheckUserByEmailRepository) {}
	async add(params: IAddUser.Params): Promise<IAddUser.Result> {
		const user = await this.checkUserByEmailRepository.check(params.email)
		if (user) {
			return true
		}
		return
	}
}
